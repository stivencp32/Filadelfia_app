-- PIX automatico - transacoes e registro idempotente de pagamentos.
-- Execute no SQL Editor do Supabase depois do schema principal.

begin;

create table if not exists public.pix_transactions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  gateway text not null default 'generic',
  gateway_transaction_id text not null,
  end_to_end_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired', 'cancelled', 'failed')),
  amount numeric(14, 2) not null check (amount >= 0),
  member_id uuid references public.members(id) on delete set null,
  member_name text,
  member_registration text,
  category text,
  description text,
  payload jsonb not null default '{}'::jsonb,
  financial_entry_id uuid references public.financial_entries(id) on delete set null,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, gateway, gateway_transaction_id)
);

create index if not exists pix_transactions_organization_status_idx
on public.pix_transactions (organization_id, status, created_at desc);

create index if not exists pix_transactions_member_idx
on public.pix_transactions (member_id, created_at desc);

alter table public.pix_transactions enable row level security;

drop policy if exists "finance managers handle pix transactions" on public.pix_transactions;
create policy "finance managers handle pix transactions" on public.pix_transactions
for all to authenticated using (public.same_org(organization_id) and public.has_module('finance'))
with check (public.same_org(organization_id) and public.has_module('finance'));

create or replace function public.touch_pix_transactions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_pix_transactions_updated_at on public.pix_transactions;
create trigger trg_pix_transactions_updated_at
before update on public.pix_transactions
for each row execute function public.touch_pix_transactions_updated_at();

create or replace function public.record_pix_payment(
  p_organization_id uuid,
  p_gateway text,
  p_gateway_transaction_id text,
  p_amount numeric,
  p_paid_at timestamptz default now(),
  p_end_to_end_id text default null,
  p_member_id uuid default null,
  p_member_name text default null,
  p_member_registration text default null,
  p_category text default '1.1.02 - Ofertas Gerais',
  p_description text default 'Pagamento PIX recebido automaticamente',
  p_payload jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_transaction public.pix_transactions%rowtype;
  v_entry_id uuid;
begin
  if p_organization_id is null then
    raise exception 'organization_id obrigatorio';
  end if;

  if nullif(trim(p_gateway_transaction_id), '') is null then
    raise exception 'gateway_transaction_id obrigatorio';
  end if;

  insert into public.pix_transactions (
    organization_id,
    gateway,
    gateway_transaction_id,
    end_to_end_id,
    status,
    amount,
    member_id,
    member_name,
    member_registration,
    category,
    description,
    payload,
    paid_at
  )
  values (
    p_organization_id,
    coalesce(nullif(trim(p_gateway), ''), 'generic'),
    trim(p_gateway_transaction_id),
    nullif(trim(coalesce(p_end_to_end_id, '')), ''),
    'paid',
    coalesce(p_amount, 0),
    p_member_id,
    nullif(trim(coalesce(p_member_name, '')), ''),
    nullif(trim(coalesce(p_member_registration, '')), ''),
    coalesce(nullif(trim(p_category), ''), '1.1.02 - Ofertas Gerais'),
    coalesce(nullif(trim(p_description), ''), 'Pagamento PIX recebido automaticamente'),
    coalesce(p_payload, '{}'::jsonb),
    coalesce(p_paid_at, now())
  )
  on conflict (organization_id, gateway, gateway_transaction_id)
  do update set
    end_to_end_id = coalesce(excluded.end_to_end_id, public.pix_transactions.end_to_end_id),
    status = 'paid',
    amount = excluded.amount,
    member_id = coalesce(excluded.member_id, public.pix_transactions.member_id),
    member_name = coalesce(excluded.member_name, public.pix_transactions.member_name),
    member_registration = coalesce(excluded.member_registration, public.pix_transactions.member_registration),
    category = excluded.category,
    description = excluded.description,
    payload = public.pix_transactions.payload || excluded.payload,
    paid_at = coalesce(public.pix_transactions.paid_at, excluded.paid_at)
  returning * into v_transaction;

  if v_transaction.financial_entry_id is not null then
    return v_transaction.financial_entry_id;
  end if;

  insert into public.financial_entries (
    organization_id,
    type,
    date,
    amount,
    category,
    counterparty_member_id,
    counterparty_key,
    counterparty_name,
    counterparty_registration,
    document_code,
    description,
    notes
  )
  values (
    v_transaction.organization_id,
    'income',
    coalesce(v_transaction.paid_at, now())::date,
    v_transaction.amount,
    v_transaction.category,
    v_transaction.member_id,
    coalesce(v_transaction.member_id::text, v_transaction.member_registration, 'pix'),
    v_transaction.member_name,
    v_transaction.member_registration,
    coalesce(v_transaction.end_to_end_id, v_transaction.gateway_transaction_id),
    v_transaction.description,
    concat('PIX automatico via ', v_transaction.gateway, '. Transacao: ', v_transaction.gateway_transaction_id)
  )
  returning id into v_entry_id;

  update public.pix_transactions
  set financial_entry_id = v_entry_id
  where id = v_transaction.id;

  return v_entry_id;
end;
$$;

comment on table public.pix_transactions is 'Controle de transacoes PIX recebidas por webhook.';
comment on function public.record_pix_payment(uuid, text, text, numeric, timestamptz, text, uuid, text, text, text, text, jsonb)
is 'Registra pagamento PIX de forma idempotente e cria uma entrada financeira uma unica vez.';

revoke all on function public.record_pix_payment(uuid, text, text, numeric, timestamptz, text, uuid, text, text, text, text, jsonb)
from public, anon, authenticated;

grant execute on function public.record_pix_payment(uuid, text, text, numeric, timestamptz, text, uuid, text, text, text, text, jsonb)
to service_role;

commit;
