import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type PixPayload = Record<string, unknown>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-pix-secret, x-webhook-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function nested(payload: PixPayload, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, payload);
}

function firstString(payload: PixPayload, paths: string[]): string {
  for (const path of paths) {
    const value = stringValue(nested(payload, path));
    if (value) return value;
  }
  return "";
}

function firstNumber(payload: PixPayload, paths: string[]): number {
  for (const path of paths) {
    const value = numberValue(nested(payload, path));
    if (value > 0) return value;
  }
  return 0;
}

function uuidOrNull(value: string): string | null {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) ? value : null;
}

function normalizePixPayload(payload: PixPayload) {
  const gateway = firstString(payload, ["gateway", "provider", "source"]) || "generic";
  const status = firstString(payload, ["status", "event", "type", "data.status", "payment.status"]).toLowerCase();
  const paid = ["paid", "approved", "confirmed", "received", "pix.received", "pix.recebido"].some((item) => status.includes(item));

  return {
    paid,
    gateway,
    gatewayTransactionId: firstString(payload, [
      "gateway_transaction_id",
      "transactionId",
      "transaction_id",
      "id",
      "data.id",
      "payment.id",
      "charge.id",
    ]),
    endToEndId: firstString(payload, ["end_to_end_id", "endToEndId", "pix.endToEndId", "data.endToEndId"]),
    amount: firstNumber(payload, ["amount", "value", "data.amount", "payment.amount", "charge.value"]),
    memberId: firstString(payload, ["member_id", "metadata.member_id", "external_reference.member_id"]),
    memberName: firstString(payload, ["member_name", "payer.name", "customer.name", "metadata.member_name"]),
    memberRegistration: firstString(payload, ["member_registration", "metadata.member_registration"]),
    category: firstString(payload, ["category", "metadata.category"]) || "1.1.02 - Ofertas Gerais",
    description: firstString(payload, ["description", "metadata.description"]) || "Pagamento PIX recebido automaticamente",
    paidAt: firstString(payload, ["paid_at", "paidAt", "confirmed_at", "data.paid_at"]) || new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const expectedSecret = Deno.env.get("PIX_WEBHOOK_SECRET") || "";
  const receivedSecret = req.headers.get("x-pix-secret") || req.headers.get("x-webhook-secret") || "";
  const bearer = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (expectedSecret && receivedSecret !== expectedSecret && bearer !== expectedSecret) {
    return new Response("Unauthorized", { status: 401, headers: corsHeaders });
  }

  let payload: PixPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
  }

  const normalized = normalizePixPayload(payload);
  if (!normalized.paid) {
    return Response.json({ ok: true, ignored: true, reason: "not_paid" }, { headers: corsHeaders });
  }
  if (!normalized.gatewayTransactionId || normalized.amount <= 0) {
    return Response.json({ ok: false, error: "missing_transaction_or_amount" }, { status: 400, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const organizationId = Deno.env.get("SUPABASE_PIX_ORG_ID");
  if (!supabaseUrl || !serviceRoleKey || !organizationId) {
    return Response.json({ ok: false, error: "missing_environment" }, { status: 500, headers: corsHeaders });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  const { data, error } = await supabase.rpc("record_pix_payment", {
    p_organization_id: organizationId,
    p_gateway: normalized.gateway,
    p_gateway_transaction_id: normalized.gatewayTransactionId,
    p_amount: normalized.amount,
    p_paid_at: normalized.paidAt,
    p_end_to_end_id: normalized.endToEndId || null,
    p_member_id: uuidOrNull(normalized.memberId),
    p_member_name: normalized.memberName || null,
    p_member_registration: normalized.memberRegistration || null,
    p_category: normalized.category,
    p_description: normalized.description,
    p_payload: payload,
  });

  if (error) {
    console.error("pix webhook error", error);
    return Response.json({ ok: false, error: error.message }, { status: 500, headers: corsHeaders });
  }

  return Response.json({ ok: true, financialEntryId: data }, { headers: corsHeaders });
});
