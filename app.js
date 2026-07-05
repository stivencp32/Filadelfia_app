const STORAGE_KEY = "filadelfia_admin_state";
const UI_STORAGE_KEY = "filadelfia_admin_ui";
const MEMBER_SESSION_KEY = "filadelfia_member_session";

const modules = [
  { id: "access", label: "Acessos", icon: "shield-check" },
  { id: "members", label: "Membresia", icon: "users" },
  { id: "pastoral", label: "Área Pastoral", icon: "heart-handshake" },
  { id: "churches", label: "Igrejas", icon: "church" },
  { id: "groups", label: "Pequenos Grupos", icon: "users-round" },
  { id: "ministries", label: "Ministérios", icon: "grid-3x3" },
  { id: "events", label: "Eventos", icon: "calendar-days" },
  { id: "kids", label: "Kids", icon: "baby" },
  { id: "finance", label: "Financeiro", icon: "badge-dollar-sign" },
  { id: "library", label: "Biblioteca", icon: "library" },
  { id: "messages", label: "Comunicados", icon: "messages-square" },
  { id: "mobile", label: "App / Site", icon: "smartphone" },
  { id: "settings", label: "Configurações", icon: "settings" }
];

const roleTemplates = {
  custom: [],
  master: modules.map((module) => module.id),
  pastor_presidente: modules.map((module) => module.id),
  pastor_vice_presidente: modules.map((module) => module.id),
  pastor_auxiliar: [],
  worship: ["ministries", "events", "library", "messages", "mobile"],
  media: ["events", "library", "messages", "mobile"],
  events: ["events", "messages", "members"],
  kids: ["kids", "members", "messages"],
  treasury: ["finance"],
  finance: ["finance"],
};

const roleLabels = {
  master: "Administrador master",
  pastor_presidente: "Pastor Presidente",
  pastor_vice_presidente: "Pastor Vice Presidente",
  pastor_auxiliar: "Pastor Auxiliar",
  custom: "Personalizado",
  worship: "Líder de louvor",
  media: "Equipe de mídia",
  events: "Eventos",
  kids: "Kids",
  treasury: "Tesouraria",
  finance: "Tesouraria",
};

const DEFAULT_ORG_LOGO = "./assets/filadelfia-logo-dark.jpeg";

const departmentRoles = {
  "Louvor": [
    "Líder de Louvor",
    "Vice-líder de Louvor",
    "Ministro de Louvor",
    "Regente",
    "Vocal",
    "Back vocal",
    "Instrumentista",
    "Técnico de som",
    "Escalista"
  ],
  "Mídia": [
    "Líder de Mídia",
    "Operador de câmera",
    "Operador de projeção",
    "Operador de transmissão",
    "Designer",
    "Fotógrafo",
    "Editor de vídeo",
    "Social media"
  ],
  "Eventos": [
    "Líder de Eventos",
    "Coordenador de Eventos",
    "Cerimonial",
    "Recepção",
    "Credenciamento",
    "Apoio de evento",
    "Decoração",
    "Logística"
  ],
  "Kids": [
    "Líder Kids",
    "Professor infantil",
    "Auxiliar Kids",
    "Berçarista",
    "Recepção Kids",
    "Check-in Kids"
  ],
  "Jovens": [
    "Líder de Jovens",
    "Vice-líder de Jovens",
    "Secretário de Jovens",
    "Tesoureiro de Jovens",
    "Coordenador de PG",
    "Conselheiro de Jovens"
  ],
  "Casais": [
    "Líder de Casais",
    "Vice-líder de Casais",
    "Conselheiro de Casais",
    "Coordenador de encontros",
    "Apoio de Casais"
  ],
  "Ação Social": [
    "Líder de Ação Social",
    "Triagem",
    "Distribuição",
    "Visitação",
    "Compras e doações",
    "Apoio social"
  ],
  "Intercessão": [
    "Líder de Intercessão",
    "Intercessor",
    "Coordenador de vigília",
    "Apoio de oração"
  ],
  "Ensino / EBD": [
    "Superintendente EBD",
    "Professor EBD",
    "Secretário EBD",
    "Coordenador de classe",
    "Auxiliar de ensino"
  ],
  "Recepção": [
    "Líder de Recepção",
    "Recepcionista",
    "Anfitrião",
    "Boas-vindas"
  ],
  "Diaconato": [
    "Coordenador de Diaconato",
    "Diácono",
    "Diaconisa",
    "Apoio de culto"
  ],
  "Secretaria": [
    "Secretário",
    "Auxiliar de secretaria",
    "Atendimento",
    "Cadastro"
  ],
  "Tesouraria": [
    "Tesoureiro",
    "Vice-tesoureiro",
    "Auxiliar de tesouraria",
    "Conferente"
  ],
  "Comunicação": [
    "Líder de Comunicação",
    "Redator",
    "Social media",
    "Designer",
    "Fotógrafo"
  ]
};

const financeCategoryGroups = {
  income: [
    ["1.1.01", "Dízimos"],
    ["1.1.02", "Ofertas Gerais"],
    ["1.1.03", "Ofertas de Almas/Missões"],
    ["1.1.04", "Ofertas de Construção/Reforma"],
    ["1.2.01", "Inscrições de Eventos"],
    ["1.2.02", "Cantina/Bazar"],
    ["1.2.03", "Livraria/Materiais"],
    ["1.3.01", "Doações Específicas"],
    ["1.3.02", "Rendimentos de Aplicações"],
    ["1.3.03", "Aluguéis Recebidos"]
  ],
  expense: [
    ["2.1.01", "Prebenda Pastoral / Sustento Pastoral"],
    ["2.1.02", "Salários da Equipe"],
    ["2.1.03", "Encargos Sociais e Impostos"],
    ["2.1.04", "Ajuda de Custo / Benesses"],
    ["2.1.05", "Preletores/Pregadores Visitantes"],
    ["2.2.01", "Aluguel do Imóvel"],
    ["2.2.02", "Contas de Consumo"],
    ["2.2.03", "Limpeza e Conservação"],
    ["2.2.04", "Sistemas e Softwares"],
    ["2.2.05", "Papelaria e Escritório"],
    ["2.2.06", "Taxas Bancárias"],
    ["2.3.01", "Ação Social / Assistência Social"],
    ["2.3.02", "Missões e Campos Missionários"],
    ["2.3.03", "Departamentos Internos"],
    ["2.3.04", "Música e Mídia"],
    ["2.3.05", "Santa Ceia"],
    ["2.4.01", "Reformas e Obras"],
    ["2.4.02", "Equipamentos de Som e Vídeo"],
    ["2.4.03", "Mobiliário"]
  ]
};

const defaultState = {
  session: null,
  admin: null,
  settings: {
    churchName: "Assembleia de Deus Ministério Filadélfia",
    churchSubtitle: "A Noiva",
    shortName: "Filadélfia",
    contactEmail: "",
    contactPhone: "",
    publishApp: "yes",
    mobileHeroTitle: "Bem-vindo",
    mobileHeroSubtitle: "Acompanhe a igreja, eventos e comunicados em um só lugar.",
    mobileVerse: "",
    mobileBanner: "",
    mobileContent: "",
    bibleLink: "",
    pixKey: "",
    publicContact: "",
    primaryColor: "#095c85",
    brandColor: "#07354b",
    accentColor: "#5c8fc9",
    backgroundColor: "#f3f3fb",
    logo: DEFAULT_ORG_LOGO
  },
  users: [],
  invites: [],
  churches: [],
  members: [],
  publicMembers: [],
  events: [],
  pastoralRequests: [],
  financialEntries: [],
  messages: []
};

let state = loadState();
let uiState = loadUiState();
let activeInviteToken = new URLSearchParams(location.search).get("invite") || "";
let memberFilter = "all";
let eventFilter = "all";
let financeEvolutionMode = "month";
let financeReportMode = "dre";
let memberAppView = "home";
let usersPage = 1;
let membersPage = 1;
let financePage = 1;
const TABLE_PAGE_SIZE = 10;
const FINANCE_PAGE_SIZE = 10;
let churchMap = null;
let churchMarkers = null;
const geocodingChurchIds = new Set();
let activeOrganizationId = window.FILADELFIA_SUPABASE?.defaultOrganizationId || "";
let filadelfiaSupabaseClient = null;

const authScreen = document.querySelector("#authScreen");
const publicScreen = document.querySelector("#publicScreen");
const adminApp = document.querySelector("#adminApp");
const memberApp = document.querySelector("#memberApp");
const views = [...document.querySelectorAll(".view")];
const navButtons = [...document.querySelectorAll("[data-view]")];
const menuToggle = document.querySelector("#menuToggle");

function hydrateState(saved = {}) {
  const next = {
    ...structuredClone(defaultState),
    ...saved,
    settings: { ...defaultState.settings, ...(saved.settings || {}) },
    users: saved.users || [],
    invites: saved.invites || [],
    churches: saved.churches || [],
    members: saved.members || [],
    publicMembers: saved.publicMembers || [],
    events: saved.events || [],
    pastoralRequests: saved.pastoralRequests || [],
    financialEntries: saved.financialEntries || [],
    messages: saved.messages || []
  };

  if (next.admin && next.users.length === 0) {
    next.users.push({
      id: crypto.randomUUID(),
      name: next.admin.name || "Administrador",
      email: next.admin.email,
      password: next.admin.password,
      role: "master",
      permissions: roleTemplates.master,
      status: "active",
      createdAt: new Date().toISOString()
    });
  }

  if (next.session?.email && !next.session.userId) {
    const user = next.users.find((item) => item.email === next.session.email);
    if (user) next.session.userId = user.id;
  }

  return next;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return hydrateState(saved);
  } catch {
    return structuredClone(defaultState);
  }
}

function loadUiState() {
  try {
    return { sidebarCollapsed: false, ...JSON.parse(localStorage.getItem(UI_STORAGE_KEY) || "{}") };
  } catch {
    return { sidebarCollapsed: false };
  }
}

function saveUiState() {
  localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(uiState));
}

function applySidebarState() {
  document.body.classList.toggle("sidebar-collapsed", uiState.sidebarCollapsed);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Local save failed:", error.message);
  }
  saveServerState();
}

function serverStatePayload() {
  return { ...state, session: null };
}

function stateHasData(value) {
  return Boolean(
    value?.admin ||
    value?.users?.length ||
    value?.invites?.length ||
    value?.churches?.length ||
    value?.members?.length ||
    value?.publicMembers?.length ||
    value?.events?.length ||
    value?.pastoralRequests?.length ||
    value?.financialEntries?.length ||
    value?.messages?.length
  );
}

function itemKey(item, fields) {
  for (const field of fields) {
    if (item?.[field]) return `${field}:${item[field]}`;
  }
  return JSON.stringify(item);
}

function mergeList(localList, remoteList, fields) {
  const merged = new Map();
  [...(localList || []), ...(remoteList || [])].forEach((item) => {
    merged.set(itemKey(item, fields), item);
  });
  return [...merged.values()];
}

function mergeSyncedState(local, remote) {
  const localSession = local.session;
  const next = hydrateState({
    ...local,
    ...remote,
    session: localSession,
    settings: { ...local.settings, ...(remote.settings || {}) },
    users: mergeList(local.users, remote.users, ["id", "email"]),
    invites: mergeList(local.invites, remote.invites, ["id", "token"]),
    churches: mergeList(local.churches, remote.churches, ["id", "name"]),
    members: mergeList(local.members, remote.members, ["id", "registration", "email", "createdAt"]),
    publicMembers: mergeList(local.publicMembers, remote.publicMembers, ["id", "email", "phone", "createdAt"]),
    events: mergeList(local.events, remote.events, ["id", "title", "createdAt"]),
    pastoralRequests: mergeList(local.pastoralRequests, remote.pastoralRequests, ["id", "createdAt"]),
    financialEntries: mergeList(local.financialEntries, remote.financialEntries, ["id", "createdAt"]),
    messages: mergeList(local.messages, remote.messages, ["id", "createdAt"])
  });
  return next;
}

function nextLocalRegistration() {
  const registrations = [
    ...(state.users || []),
    ...(state.members || []),
    ...(state.publicMembers || [])
  ]
    .map((item) => String(item.registration || ""))
    .filter((value) => /^\d+$/.test(value))
    .map(Number);
  const next = (registrations.length ? Math.max(...registrations) : 0) + 1;
  return String(next).padStart(6, "0");
}

function findMemberForUser(user) {
  if (!user) return null;
  const registration = String(user.registration || "").trim().toLowerCase();
  const email = String(user.email || "").trim().toLowerCase();
  const authUserId = String(user.authUserId || "").trim();
  return [...(state.members || []), ...(state.publicMembers || [])].find((member) => {
    const memberRegistration = String(member.registration || "").trim().toLowerCase();
    const memberEmail = String(member.email || "").trim().toLowerCase();
    const memberAuthUserId = String(member.authUserId || "").trim();
    return (
      (registration && memberRegistration === registration) ||
      (email && memberEmail === email) ||
      (authUserId && memberAuthUserId === authUserId)
    );
  }) || null;
}

function ensurePrivilegedMemberProfile(user) {
  if (!user || user.status === "blocked") return { member: null, changed: false };
  const now = new Date().toISOString();
  const existing = findMemberForUser(user);
  if (existing) {
    let changed = false;
    const updates = {
      authUserId: user.authUserId || existing.authUserId || "",
      name: existing.name || user.name || "",
      email: existing.email || user.email || "",
      password: existing.password || user.password || "",
      registration: existing.registration || user.registration || nextLocalRegistration(),
      department: existing.department || user.department || "",
      ministryRole: existing.ministryRole || user.ministryRole || user.positionTitle || "",
      status: existing.status || "Membro",
      accessType: existing.accessType || "admin",
      source: existing.source || "Admin"
    };
    Object.entries(updates).forEach(([key, value]) => {
      if (existing[key] !== value) {
        existing[key] = value;
        changed = true;
      }
    });
    if (!user.registration && existing.registration) {
      user.registration = existing.registration;
      changed = true;
    }
    if (changed) existing.updatedAt = now;
    return { member: existing, changed };
  }
  const member = {
    id: crypto.randomUUID(),
    authUserId: user.authUserId || "",
    churchId: user.churchId || "",
    name: user.name || "Membro",
    gender: "",
    birthDate: user.birthDate || "",
    email: user.email || "",
    phone: user.phone || "",
    photo: user.photo || "",
    password: user.password || "",
    registration: user.registration || nextLocalRegistration(),
    department: user.department || "",
    ministryRole: user.ministryRole || user.positionTitle || "",
    entryDate: user.entryDate || now.slice(0, 10),
    status: "Membro",
    isLeader: true,
    notes: "Perfil de membro criado automaticamente por acesso com privilégios.",
    accessType: "admin",
    source: "Admin",
    createdAt: now,
    updatedAt: now
  };
  state.members.unshift(member);
  if (!user.registration) user.registration = member.registration;
  return { member, changed: true };
}

async function loadServerState() {
  if (supabaseConfigured()) return loadSupabaseState();
  try {
    const response = await fetch("./api/state", { cache: "no-store" });
    if (!response.ok) return null;
    return hydrateState(await response.json());
  } catch {
    return null;
  }
}

async function saveServerState() {
  if (supabaseConfigured()) return saveSupabaseState();
  return saveLocalServerState();
}

async function saveLocalServerState() {
  try {
    const response = await fetch("./api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serverStatePayload())
    });
    return response.ok;
  } catch {
    // O app continua funcionando localmente quando aberto fora do servidor.
    return false;
  }
}

function supabaseConfigured() {
  const config = window.FILADELFIA_SUPABASE;
  return Boolean(config?.url && config?.anonKey && window.supabase?.createClient);
}

function supabaseClient() {
  if (!supabaseConfigured()) return null;
  if (!filadelfiaSupabaseClient) {
    const config = window.FILADELFIA_SUPABASE;
    filadelfiaSupabaseClient = window.supabase.createClient(config.url, config.anonKey);
  }
  return filadelfiaSupabaseClient;
}

function settingFromOrganization(org = {}) {
  return {
    churchName: org.name || defaultState.settings.churchName,
    churchSubtitle: org.subtitle || "",
    shortName: org.short_name || "",
    contactEmail: org.contact_email || "",
    contactPhone: org.contact_phone || "",
    publishApp: org.publish_app === false ? "no" : "yes",
    mobileHeroTitle: org.mobile_hero_title || "Bem-vindo",
    mobileHeroSubtitle: org.mobile_hero_subtitle || "",
    mobileVerse: org.mobile_verse || "",
    mobileBanner: org.mobile_banner || "",
    mobileContent: org.mobile_content || "",
    bibleLink: org.bible_link || "",
    pixKey: org.pix_key || "",
    publicContact: org.public_contact || "",
    primaryColor: org.primary_color || "#095c85",
    brandColor: org.brand_color || "#07354b",
    accentColor: org.accent_color || "#5c8fc9",
    backgroundColor: org.background_color || "#f3f3fb",
    logo: org.logo_url || DEFAULT_ORG_LOGO
  };
}

function organizationFromSettings(settings = state.settings) {
  return {
    name: settings.churchName,
    subtitle: settings.churchSubtitle,
    short_name: settings.shortName,
    contact_email: settings.contactEmail || null,
    contact_phone: settings.contactPhone || null,
    publish_app: settings.publishApp !== "no",
    mobile_hero_title: settings.mobileHeroTitle,
    mobile_hero_subtitle: settings.mobileHeroSubtitle,
    mobile_verse: settings.mobileVerse,
    mobile_banner: settings.mobileBanner,
    mobile_content: settings.mobileContent,
    bible_link: settings.bibleLink,
    pix_key: settings.pixKey,
    public_contact: settings.publicContact,
    primary_color: settings.primaryColor,
    brand_color: settings.brandColor,
    accent_color: settings.accentColor,
    background_color: settings.backgroundColor,
    logo_url: settings.logo || null
  };
}

function dbUserToState(row) {
  return {
    id: row.id,
    authUserId: row.auth_user_id,
    name: row.name,
    email: row.email,
    registration: row.registration || "",
    password: row.password || "",
    role: row.role,
    permissions: row.permissions || [],
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function stateUserToDb(user) {
  return {
    id: user.id,
    organization_id: activeOrganizationId,
    auth_user_id: user.authUserId || null,
    name: user.name,
    email: user.email,
    registration: user.registration || null,
    password: user.password || null,
    role: user.role || "custom",
    permissions: user.permissions || [],
    status: user.status || "active"
  };
}

function dbInviteToState(row) {
  return {
    id: row.id,
    organizationId: row.organization_id,
    token: row.token,
    name: row.invited_name,
    email: row.invited_email,
    role: row.role,
    permissions: row.permissions || [],
    status: row.status,
    acceptedAt: row.accepted_at,
    createdAt: row.created_at
  };
}

function stateInviteToDb(invite) {
  return {
    id: invite.id,
    organization_id: activeOrganizationId,
    token: invite.token,
    invited_name: invite.name,
    invited_email: invite.email,
    role: invite.role || "custom",
    permissions: invite.permissions || [],
    status: invite.status || "pending",
    accepted_at: invite.acceptedAt || null
  };
}

function dbChurchToState(row) {
  return {
    id: row.id,
    name: row.name,
    pastor: row.pastor || "",
    phone: row.phone || "",
    address: row.address || "",
    city: row.city || "",
    state: row.state || "",
    status: row.status || "Ativa",
    serviceTime: row.service_time || "",
    lat: row.lat ?? "",
    lng: row.lng ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function stateChurchToDb(church) {
  return {
    id: church.id,
    organization_id: activeOrganizationId,
    name: church.name,
    pastor: church.pastor || null,
    phone: church.phone || null,
    address: church.address || null,
    city: church.city || null,
    state: church.state || null,
    status: church.status || "Ativa",
    service_time: church.serviceTime || null,
    lat: church.lat ? Number(church.lat) : null,
    lng: church.lng ? Number(church.lng) : null
  };
}

function dbMemberToState(row) {
  return {
    id: row.id,
    authUserId: row.auth_user_id,
    churchId: row.church_unit_id || "",
    name: row.name,
    gender: row.gender || "",
    birthDate: row.birth_date || "",
    email: row.email || "",
    phone: row.phone || "",
    photo: row.photo || "",
    password: row.password || "",
    registration: row.registration || "",
    department: row.department || "",
    ministryRole: row.ministry_role || "",
    entryDate: row.entry_date || "",
    status: row.status || "Visitante",
    isLeader: row.is_leader,
    notes: row.notes || "",
    accessType: row.source === "public_link" ? "public" : "admin",
    source: row.source === "public_link" ? "Link público" : "Admin",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function stateMemberToDb(member, source = "admin") {
  return {
    id: member.id,
    organization_id: activeOrganizationId,
    auth_user_id: member.authUserId || null,
    church_unit_id: member.churchId || null,
    name: member.name,
    gender: member.gender || null,
    birth_date: member.birthDate || null,
    email: member.email || null,
    phone: member.phone || null,
    photo: member.photo || null,
    password: member.password || null,
    registration: member.registration || null,
    department: member.department || null,
    ministry_role: member.ministryRole || null,
    entry_date: member.entryDate || null,
    status: member.status || "Visitante",
    is_leader: member.isLeader === true || member.isLeader === "on",
    notes: member.notes || null,
    source
  };
}

function dbEventToState(row) {
  return {
    id: row.id,
    title: row.title,
    type: row.type || "",
    status: row.status || "Ativo",
    department: row.department || "",
    startDate: row.start_date || "",
    startTime: row.start_time || "",
    durationValue: row.duration_value || "",
    durationUnit: row.duration_unit || "hours",
    locationChurchId: row.location_church_unit_id || "",
    location: row.location || "",
    audience: row.audience || "",
    capacity: row.capacity || "",
    registrationStatus: row.registration_status || "closed",
    ownerId: row.owner_member_id || "",
    owner: row.owner || "",
    contact: row.contact || "",
    description: row.description || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function stateEventToDb(event) {
  return {
    id: event.id,
    organization_id: activeOrganizationId,
    title: event.title,
    type: event.type || null,
    status: event.status || "Ativo",
    department: event.department || null,
    start_date: event.startDate || null,
    start_time: event.startTime || null,
    duration_value: event.durationValue ? Number(event.durationValue) : null,
    duration_unit: event.durationUnit || null,
    location_church_unit_id: event.locationChurchId && event.locationChurchId !== "custom" ? event.locationChurchId : null,
    location: event.location || null,
    audience: event.audience || null,
    capacity: event.capacity ? Number(event.capacity) : null,
    registration_status: event.registrationStatus || "closed",
    owner_member_id: event.ownerId && event.ownerId !== "manual" ? event.ownerId : null,
    owner: event.owner || null,
    contact: event.contact || null,
    description: event.description || null
  };
}

function dbPastoralToState(row) {
  return {
    id: row.id,
    requesterUserId: row.requester_user_id || "",
    requesterMemberId: row.requester_member_id || "",
    requestTarget: row.request_target || "self",
    requesterName: row.requester_name || "Membro",
    requesterEmail: row.requester_email || "",
    type: row.type || "Oração",
    urgency: row.urgency || "Normal",
    message: row.message || "",
    confidential: row.confidential,
    status: row.status || "open",
    createdAt: row.created_at,
    resolvedAt: row.resolved_at
  };
}

function statePastoralToDb(request) {
  return {
    id: request.id,
    organization_id: activeOrganizationId,
    requester_user_id: request.requesterUserId || null,
    requester_member_id: request.requesterMemberId || null,
    request_target: request.requestTarget || "self",
    requester_name: request.requesterName || "Membro",
    requester_email: request.requesterEmail || null,
    type: request.type || "Oração",
    urgency: request.urgency || "Normal",
    message: request.message,
    confidential: request.confidential === true || request.confidential === "on",
    status: request.status || "open",
    resolved_at: request.resolvedAt || null
  };
}

function dbFinanceToState(row) {
  return {
    id: row.id,
    type: row.type,
    date: row.date,
    amount: Number(row.amount || 0),
    category: row.category || "",
    counterpartyKey: row.counterparty_key || "",
    counterpartyName: row.counterparty_name || "",
    counterpartyRegistration: row.counterparty_registration || "",
    supplierName: row.supplier_name || "",
    recipientName: row.recipient_name || "",
    invoiceCode: row.invoice_code || "",
    documentCode: row.document_code || "",
    description: row.description || "",
    notes: row.notes || "",
    createdAt: row.created_at
  };
}

function stateFinanceToDb(entry) {
  return {
    id: entry.id,
    organization_id: activeOrganizationId,
    type: entry.type,
    date: entry.date,
    amount: Number(entry.amount || 0),
    category: entry.category || null,
    counterparty_key: entry.counterpartyKey || null,
    counterparty_name: entry.counterpartyName || null,
    counterparty_registration: entry.counterpartyRegistration || null,
    supplier_name: entry.supplierName || null,
    recipient_name: entry.recipientName || null,
    invoice_code: entry.invoiceCode || null,
    document_code: entry.documentCode || null,
    description: entry.description || null,
    notes: entry.notes || null
  };
}

function dbMessageToState(row) {
  return {
    id: row.id,
    title: row.title,
    audience: row.audience || "Toda igreja",
    message: row.message || "",
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function stateMessageToDb(message) {
  return {
    id: message.id || crypto.randomUUID(),
    organization_id: activeOrganizationId,
    title: message.title,
    audience: message.audience || "Toda igreja",
    message: message.message || null,
    published: message.published !== false
  };
}

async function resolveOrganizationId(client) {
  if (activeOrganizationId) return activeOrganizationId;
  const { data, error } = await client.from("organizations").select("id").order("created_at", { ascending: true }).limit(1).maybeSingle();
  if (error) throw error;
  activeOrganizationId = data?.id || "";
  return activeOrganizationId;
}

function ignoreSupabaseError(result) {
  if (result?.error) console.warn("Supabase:", result.error.message);
  return result;
}

async function loadSupabaseState() {
  const client = supabaseClient();
  if (!client) return null;
  try {
    const organizationId = await resolveOrganizationId(client);
    if (!organizationId) return null;
    const { data: sessionData } = await client.auth.getSession();
    const isAuthenticated = Boolean(sessionData?.session);
    const params = new URLSearchParams(location.search);

    const baseQueries = [
      client.from("organizations").select("*").eq("id", organizationId).maybeSingle(),
      client.from("church_units").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
      client.from("events").select("*").eq("organization_id", organizationId).order("start_date", { ascending: true }),
      client.from("messages").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false })
    ];
    const [orgResult, churchesResult, eventsResult, messagesResult] = await Promise.all(baseQueries);
    [orgResult, churchesResult, eventsResult, messagesResult].forEach(ignoreSupabaseError);

    const next = hydrateState({
      ...state,
      settings: settingFromOrganization(orgResult.data || {}),
      churches: (churchesResult.data || []).map(dbChurchToState),
      events: (eventsResult.data || []).map(dbEventToState),
      messages: (messagesResult.data || []).map(dbMessageToState)
    });

    if (params.get("invite")) {
      const inviteResult = await client.rpc("get_pending_invite", { invite_token: params.get("invite") }).maybeSingle();
      if (!inviteResult.error && inviteResult.data) next.invites = [dbInviteToState(inviteResult.data)];
    }

    if (isAuthenticated) {
      const [usersResult, invitesResult, membersResult, pastoralResult, financeResult] = await Promise.all([
        client.from("app_users").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
        client.from("admin_invites").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
        client.from("members").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
        client.from("pastoral_requests").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }),
        client.from("financial_entries").select("*").eq("organization_id", organizationId).order("date", { ascending: false })
      ]);
      [usersResult, invitesResult, membersResult, pastoralResult, financeResult].forEach(ignoreSupabaseError);

      const allMembers = (membersResult.data || []).map(dbMemberToState);
      next.users = (usersResult.data || []).map(dbUserToState);
      next.invites = (invitesResult.data || []).map(dbInviteToState);
      next.members = allMembers.filter((member) => member.accessType !== "public");
      next.publicMembers = allMembers.filter((member) => member.accessType === "public");
      next.pastoralRequests = (pastoralResult.data || []).map(dbPastoralToState);
      next.financialEntries = (financeResult.data || []).map(dbFinanceToState);

      const authUser = sessionData.session.user;
      const appUser = next.users.find((user) => user.authUserId === authUser.id || String(user.email).toLowerCase() === String(authUser.email).toLowerCase());
      if (appUser) next.session = { userId: appUser.id, email: appUser.email, signedAt: new Date().toISOString() };
    } else {
      const session = memberSession();
      if (session?.memberId) {
        let memberResult = await client.rpc("get_member_app_profile", { profile_id: session.memberId }).maybeSingle();
        if (memberResult.error) {
          memberResult = await client
            .from("members")
            .select("*")
            .eq("organization_id", organizationId)
            .eq("id", session.memberId)
            .maybeSingle();
        }
        ignoreSupabaseError(memberResult);
        const cachedMember = [...(state.publicMembers || []), ...(state.members || [])].find((member) => member.id === session.memberId);
        const member = memberResult.data ? dbMemberToState(memberResult.data) : cachedMember;
        if (member) {
          if (member.accessType === "public") next.publicMembers = [member];
          else next.members = [member];
        }
      }
    }

    return next;
  } catch (error) {
    console.warn("Supabase load failed:", error.message);
    return null;
  }
}

async function upsertRows(table, rows) {
  if (!rows.length) return true;
  const result = ignoreSupabaseError(await supabaseClient().from(table).upsert(rows, { onConflict: "id" }));
  return !result?.error;
}

async function savePublicMemberProfile(member) {
  const localSaved = await saveLocalServerState();
  if (!supabaseConfigured() || !member?.id) return { supabase: null, local: localSaved };
  if (member.accessType === "admin") {
    const saved = await saveSupabaseState();
    return { supabase: saved, local: localSaved, error: saved ? null : { message: "Sessao administrativa sem permissao para gravar no Supabase." } };
  }
  const client = supabaseClient();
  if (!client) return { supabase: null, local: localSaved };
  const organizationId = await resolveOrganizationId(client);
  if (!organizationId) return { supabase: false, local: localSaved };
  const payload = stateMemberToDb({ ...member, organizationId }, member.accessType === "admin" ? "admin" : "public_link");
  const result = await client.rpc("save_member_app_profile", {
    profile_id: member.id,
    p_organization_id: organizationId,
    p_name: payload.name,
    p_gender: payload.gender,
    p_email: payload.email,
    p_password: payload.password,
    p_phone: payload.phone,
    p_birth_date: payload.birth_date,
    p_church_unit_id: payload.church_unit_id,
    p_photo: payload.photo,
    p_entry_date: payload.entry_date
  });
  const { error } = result;
  if (error) {
    console.warn("Supabase member profile save failed:", error.message);
    return { supabase: false, local: localSaved, error };
  }
  const row = Array.isArray(result.data) ? result.data[0] : result.data;
  const savedMember = row ? dbMemberToState(row) : null;
  if (!savedMember) {
    return { supabase: false, local: localSaved, error: { message: "A função save_member_app_profile não retornou o membro salvo." } };
  }
  if (savedMember) {
    const list = savedMember.accessType === "public" ? state.publicMembers : state.members;
    const index = list.findIndex((item) => item.id === savedMember.id);
    if (index >= 0) list[index] = { ...list[index], ...savedMember };
  }
  return { supabase: true, local: localSaved };
}

async function loadMemberProfileByLogin(identifier, password) {
  const login = String(identifier || "").trim().toLowerCase();
  const localMember = [...(state.members || []), ...(state.publicMembers || [])]
    .find((member) => {
      const email = String(member.email || "").trim().toLowerCase();
      const registration = String(member.registration || "").trim().toLowerCase();
      return (email === login || registration === login) && member.password === password;
    });
  if (localMember) return localMember;
  if (!supabaseConfigured() || !identifier || !password) return null;
  const client = supabaseClient();
  if (!client) return null;
  const result = await client.rpc("get_member_app_profile_by_login", {
    p_email: identifier,
    p_password: password
  }).maybeSingle();
  if (result.error) {
    console.warn("Supabase member login failed:", result.error.message);
    return null;
  }
  if (!result.data) return null;
  return dbMemberToState(result.data);
}

async function resetMemberPassword(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const localMember = [...(state.members || []), ...(state.publicMembers || [])]
    .find((member) => String(member.email || "").trim().toLowerCase() === normalizedEmail);
  if (localMember) {
    localMember.password = password;
    rememberMemberPassword(localMember.email, password);
    saveState();
  }
  if (!supabaseConfigured()) return { ok: Boolean(localMember), source: "local" };
  const client = supabaseClient();
  if (!client) return { ok: Boolean(localMember), source: "local" };
  let result = await client.rpc("reset_member_app_password", {
    p_email: email,
    p_password: password
  }).maybeSingle();
  if (result.error && /schema cache|function .*not find|could not find/i.test(result.error.message || "")) {
    result = await client
      .from("members")
      .update({ password, updated_at: new Date().toISOString() })
      .eq("email", normalizedEmail)
      .in("app_access_status", ["active", "pending"])
      .select("*")
      .maybeSingle();
  }
  if (result.error) {
    console.warn("Supabase member password reset failed:", result.error.message);
    return { ok: Boolean(localMember), source: "local", error: result.error };
  }
  if (!result.data) return { ok: Boolean(localMember), source: "local", error: { message: `Nenhum membro encontrado com este e-mail: ${normalizedEmail}` } };
  const member = dbMemberToState(result.data);
  member.password = password;
  const list = member.accessType === "public" ? state.publicMembers : state.members;
  const index = list.findIndex((item) => item.id === member.id);
  if (index >= 0) list[index] = { ...list[index], ...member };
  else list.unshift(member);
  rememberMemberPassword(member.email, password);
  saveState();
  return { ok: true, source: "supabase", member };
}

async function loadAdminUserByLogin(identifier, password) {
  const login = String(identifier || "").trim().toLowerCase();
  const localUser = (state.users || []).find((user) => {
    const email = String(user.email || "").trim().toLowerCase();
    const registration = String(user.registration || "").trim().toLowerCase();
    return (email === login || registration === login) && user.password === password;
  });
  if (localUser) return localUser;
  if (!supabaseConfigured() || !identifier || !password) return null;
  const client = supabaseClient();
  if (!client) return null;
  const result = await client.rpc("get_app_user_by_login", {
    p_login: identifier,
    p_password: password
  }).maybeSingle();
  if (result.error || !result.data) {
    if (result.error) console.warn("Supabase admin login by registration failed:", result.error.message);
    return null;
  }
  return dbUserToState(result.data);
}

async function deleteSupabaseRow(table, id) {
  if (!supabaseConfigured() || !id) return;
  try {
    ignoreSupabaseError(await supabaseClient().from(table).delete().eq("id", id));
  } catch (error) {
    console.warn("Supabase delete failed:", error.message);
  }
}

async function saveSupabaseState() {
  const client = supabaseClient();
  if (!client) return false;
  try {
    const organizationId = await resolveOrganizationId(client);
    if (!organizationId) return false;
    const { data: sessionData } = await client.auth.getSession();
    const isAuthenticated = Boolean(sessionData?.session);

    if (!isAuthenticated) {
      const publicMembers = (state.publicMembers || []).map((member) => stateMemberToDb(member, "public_link"));
      return upsertRows("members", publicMembers);
    }

    ignoreSupabaseError(await client.from("organizations").update(organizationFromSettings()).eq("id", organizationId));
    await upsertRows("app_users", (state.users || []).map(stateUserToDb));
    await upsertRows("admin_invites", (state.invites || []).map(stateInviteToDb));
    await upsertRows("church_units", (state.churches || []).map(stateChurchToDb));
    await upsertRows("members", [
      ...(state.members || []).map((member) => stateMemberToDb(member, "admin")),
      ...(state.publicMembers || []).map((member) => stateMemberToDb(member, "public_link"))
    ]);
    await upsertRows("events", (state.events || []).map(stateEventToDb));
    await upsertRows("pastoral_requests", (state.pastoralRequests || []).map(statePastoralToDb));
    await upsertRows("financial_entries", (state.financialEntries || []).map(stateFinanceToDb));
    await upsertRows("messages", (state.messages || []).map(stateMessageToDb));
    return true;
  } catch (error) {
    console.warn("Supabase save failed:", error.message);
    return false;
  }
}

async function syncState() {
  const remote = await loadServerState();
  if (!remote) return;
  if (supabaseConfigured()) {
    state = remote;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return;
  }
  if (stateHasData(remote)) {
    state = mergeSyncedState(state, remote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  if (stateHasData(state)) saveServerState();
}

function currentUser() {
  if (!state.session) return null;
  return state.users.find((user) => user.id === state.session.userId || user.email === state.session.email) || null;
}

function isMasterRole(role) {
  return ["master", "pastor_presidente", "pastor_vice_presidente"].includes(role);
}

function isMaster(user = currentUser()) {
  return isMasterRole(user?.role);
}

function isTreasury(user = currentUser()) {
  return ["treasury", "finance"].includes(user?.role);
}

function hasPermission(moduleId, user = currentUser()) {
  if (!moduleId || moduleId === "home") return true;
  if (!user || user.status !== "active") return false;
  if (moduleId === "finance") return isMaster(user) || isTreasury(user);
  if (moduleId === "churches" || moduleId === "members" || moduleId === "pastoral") return true;
  if (isMaster(user)) return true;
  return user.permissions?.includes(moduleId);
}

function canManage(moduleId, user = currentUser()) {
  if (!user || user.status !== "active") return false;
  if (moduleId === "finance") return isMaster(user) || isTreasury(user);
  if (isMaster(user)) return true;
  return user.permissions?.includes(moduleId);
}

function mergeSettings(settings) {
  state.settings = { ...state.settings, ...settings };
  saveState();
  applySettings();
}

function applySettings() {
  const { settings } = state;
  document.documentElement.style.setProperty("--orange", settings.primaryColor);
  document.documentElement.style.setProperty("--orange-2", settings.primaryColor);
  document.documentElement.style.setProperty("--navy", settings.brandColor);
  document.documentElement.style.setProperty("--navy-2", settings.brandColor);
  document.documentElement.style.setProperty("--blue", settings.accentColor);
  document.documentElement.style.setProperty("--wash", settings.backgroundColor);
  document.title = `${settings.shortName || settings.churchName} Admin`;

  document.querySelectorAll("[data-church-name]").forEach((item) => {
    item.textContent = settings.churchName || "Igreja";
  });
  document.querySelectorAll("[data-church-short-name]").forEach((item) => {
    item.textContent = settings.shortName || settings.churchName || "Igreja";
  });

  setText("#authChurchName", settings.churchName || "Administração da igreja");
  setText("#churchSubtitle", settings.churchSubtitle || "Admin");
  setValue("#settingChurchName", settings.churchName);
  setValue("#settingChurchSubtitle", settings.churchSubtitle);
  setValue("#settingShortName", settings.shortName);
  setValue("#settingContactEmail", settings.contactEmail);
  setValue("#settingContactPhone", settings.contactPhone);
  setValue("#settingPublishApp", settings.publishApp);
  setValue("#mobileHeroTitle", settings.mobileHeroTitle);
  setValue("#mobileHeroSubtitle", settings.mobileHeroSubtitle);
  setValue("#mobileVerse", settings.mobileVerse);
  setValue("#mobileBanner", settings.mobileBanner);
  setValue("#mobileContent", settings.mobileContent);
  setValue("#bibleLink", settings.bibleLink);
  setValue("#pixKey", settings.pixKey);
  setValue("#publicContact", settings.publicContact);
  setValue("#primaryColor", settings.primaryColor);
  setValue("#brandColor", settings.brandColor);
  setValue("#accentColor", settings.accentColor);
  setValue("#backgroundColor", settings.backgroundColor);

  updateLogo("#sidebarLogo", "#fallbackLogo", settings.logo);
  updateLogo("#settingsLogoPreview", "#settingsLogoFallback", settings.logo);
  updateLogo("#phoneLogoImage", ".phone-logo-fallback", settings.logo);
  updateLogo("#memberPhoneLogoImage", ".member-phone-logo-fallback", settings.logo);
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function showAppToast(message, type = "success") {
  const toast = document.querySelector("#appToast");
  if (!toast) return;
  toast.textContent = message;
  toast.dataset.type = type;
  toast.hidden = false;
  window.clearTimeout(showAppToast.timer);
  showAppToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, type === "error" ? 6200 : 3600);
}

function setValue(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.value = value || "";
}

function updateLogo(imageSelector, fallbackSelector, logo) {
  const image = document.querySelector(imageSelector);
  const fallback = document.querySelector(fallbackSelector);
  if (!image || !fallback) return;
  if (logo) {
    image.src = logo;
    image.hidden = false;
    fallback.hidden = true;
  } else {
    image.removeAttribute("src");
    image.hidden = true;
    fallback.hidden = false;
  }
}

function showPublicForm() {
  document.body.classList.add("is-auth-screen");
  document.body.classList.remove("is-member-app");
  if (memberApp) memberApp.hidden = true;
  publicScreen.hidden = false;
  authScreen.hidden = true;
  adminApp.hidden = true;
  renderPublicChurchOptions();
}

function showAuth(inviteToken = "") {
  document.body.classList.add("is-auth-screen");
  document.body.classList.remove("is-member-app");
  if (memberApp) memberApp.hidden = true;
  publicScreen.hidden = true;
  authScreen.hidden = false;
  adminApp.hidden = true;

  const registerTab = document.querySelector("[data-auth-tab='register']");
  if (registerTab) registerTab.hidden = state.users.length > 0;
  renderDepartmentOptions("#inviteDepartmentSelect");
  renderMemberFunctionOptions("", "#inviteAcceptForm", "#inviteFunctionSelect");

  if (inviteToken) {
    activeInviteToken = inviteToken;
    const invite = state.invites.find((item) => item.token === inviteToken && item.status === "pending");
    document.querySelectorAll("[data-auth-tab]").forEach((item) => item.classList.remove("is-selected"));
    document.querySelectorAll(".auth-form").forEach((form) => form.classList.remove("is-visible"));
    document.querySelector("#inviteAcceptForm")?.classList.add("is-visible");
    setText("#inviteContext", invite ? `Convite para ${roleLabels[invite.role] || invite.role}.` : "Convite não encontrado ou já utilizado.");
    setValue("#inviteAcceptForm [name='email']", invite?.email || "");
  }
}

function showAdmin() {
  const user = currentUser();
  if (user) ensurePrivilegedMemberProfile(user);
  document.body.classList.remove("is-auth-screen");
  document.body.classList.remove("is-member-app");
  if (memberApp) memberApp.hidden = true;
  publicScreen.hidden = true;
  authScreen.hidden = true;
  adminApp.hidden = false;
  applySidebarState();
  applyAccess();
  activateView(location.hash.replace("#", "") || "home");
}

function activateView(viewId) {
  if (!document.getElementById(viewId)) return;
  if (!hasPermission(viewId)) {
    viewId = "home";
  }
  views.forEach((view) => view.classList.toggle("is-visible", view.id === viewId));
  navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.view === viewId));
  if (location.hash !== `#${viewId}`) history.replaceState(null, "", `${location.pathname}${location.search}#${viewId}`);
  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewId === "churches") window.setTimeout(() => churchMap?.invalidateSize(), 160);
}

function memberSession() {
  try {
    return JSON.parse(localStorage.getItem(MEMBER_SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveMemberSession(session) {
  localStorage.setItem(MEMBER_SESSION_KEY, JSON.stringify(session));
}

function clearMemberSession() {
  localStorage.removeItem(MEMBER_SESSION_KEY);
}

async function signOutEverywhere() {
  if (supabaseConfigured()) await supabaseClient().auth.signOut();
  state.session = null;
  clearMemberSession();
  saveState();
  showAuth();
  showAppToast("Sessao encerrada.", "success");
}

function memberPasswordCacheKey(email) {
  return `filadelfia_member_password:${String(email || "").trim().toLowerCase()}`;
}

function rememberMemberPassword(email, password) {
  if (!email || !password) return;
  try {
    localStorage.setItem(memberPasswordCacheKey(email), password);
  } catch {
    // Senha continua no cadastro atual mesmo se o navegador bloquear cache.
  }
}

function rememberedMemberPassword(email) {
  try {
    return localStorage.getItem(memberPasswordCacheKey(email)) || "";
  } catch {
    return "";
  }
}

function currentMember() {
  const session = memberSession();
  if (session?.type === "admin") {
    const user = currentUser();
    if (!user) return null;
    const { member } = ensurePrivilegedMemberProfile(user);
    if (member) return { ...member, status: member.status || roleLabels[user.role] || "Membro", accessType: "admin" };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      registration: user.registration || "",
      status: roleLabels[user.role] || "Administrativo",
      accessType: "admin"
    };
  }
  if (!session?.memberId) return null;
  return [...(state.publicMembers || []), ...(state.members || [])].find((member) => member.id === session.memberId) || null;
}

function showMemberApp(session = memberSession()) {
  if (!session && currentUser()?.status === "active") {
    session = { type: "admin", userId: currentUser().id, signedAt: new Date().toISOString() };
    saveMemberSession(session);
  }
  if (session) saveMemberSession(session);
  if (session?.type === "admin") ensurePrivilegedMemberProfile(currentUser());
  document.body.classList.remove("is-auth-screen");
  document.body.classList.add("is-member-app");
  publicScreen.hidden = true;
  authScreen.hidden = true;
  adminApp.hidden = true;
  if (memberApp) memberApp.hidden = false;
  memberAppView = "home";
  ensureLiveMemberAppLayout();
  renderMobileApp();
  if (window.lucide) window.lucide.createIcons();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function ensureLiveMemberAppLayout() {
  if (!memberApp || memberApp.dataset.liveLayout === "ready") return;
  memberApp.dataset.liveLayout = "ready";
  memberApp.innerHTML = `
    <div class="member-live-app">
      <header class="member-live-header">
        <strong data-church-short-name>Filad\u00e9lfia</strong>
        <div class="member-live-header-actions">
          <button class="member-menu-button" id="memberAdminButton" type="button" hidden><i data-lucide="layout-dashboard"></i><span>Gest\u00e3o</span></button>
          <button class="member-menu-button member-logout-button" id="memberLogoutButton" type="button"><i data-lucide="log-out"></i><span>Sair</span></button>
        </div>
      </header>
      <main class="member-live-main">
        <section class="member-live-hero-panel">
          <div class="member-greeting">
            <span id="memberWelcomeName">Bem-vindo</span>
            <small>Seu acesso de membro est\u00e1 ativo.</small>
          </div>
          <label class="app-search"><i data-lucide="search"></i><input id="memberAppSearch" value="Assembleia" readonly /></label>
          <div class="app-hero app-hero-empty">
            <img id="memberPhoneLogoImage" alt="" hidden />
            <div class="member-phone-logo-fallback brand-mark"><span>F</span></div>
            <span id="memberPhoneHeroTitle">Bem-vindo</span>
            <small id="memberPhoneHeroSubtitle"></small>
          </div>
        </section>
        <section class="member-live-content-panel">
          <div class="shortcut-row">
            <button type="button" data-member-app-view="agenda"><i data-lucide="calendar"></i><span>Agenda</span></button>
            <button type="button" id="memberBibleButton"><i data-lucide="book-open"></i><span>B\u00edblia</span></button>
            <button type="button" data-member-app-view="offerings"><i data-lucide="hand-heart"></i><span>Ofertas</span></button>
            <button type="button" data-member-app-view="card"><i data-lucide="qr-code"></i><span>Carteirinha</span></button>
          </div>
          <div class="phone-banner" id="memberPhoneBanner" hidden></div>
          <div class="member-live-view-toolbar">
            <button type="button" data-member-app-view="home" hidden><i data-lucide="arrow-left"></i> Voltar</button>
            <h2 id="memberLiveViewTitle">Comunicados</h2>
          </div>
          <div class="member-live-notice" id="memberLiveNotice" role="status" hidden></div>
          <div id="memberLiveView"></div>
        </section>
      </main>
    </div>
  `;
}

function applyAccess() {
  navButtons.forEach((button) => {
    button.hidden = !hasPermission(button.dataset.view);
    if (button.classList.contains("nav-item")) button.title = button.textContent.trim();
  });

  document.querySelectorAll("[data-requires-master]").forEach((item) => {
    item.hidden = !isMaster();
  });

  document.querySelectorAll("[data-requires-manage]").forEach((item) => {
    item.hidden = !canManage(item.dataset.requiresManage);
  });
}

function renderCounts() {
  setText("[data-count='members']", state.members.length + state.publicMembers.length);
  setText("[data-count='messages']", state.messages.length);
  setText("[data-count='events']", (state.events || []).filter((event) => event.status !== "Cancelado").length);
  setText("#notificationCount", state.messages.length + state.publicMembers.length);
}

function renderPermissions(containerSelector, selected = []) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const selectedSet = new Set(selected);
  const visibleModules = modules.filter((module) => module.id !== "finance" || selectedSet.has("finance"));
  container.innerHTML = visibleModules.map((module) => `
    <label class="permission-option">
      <input type="checkbox" name="permissions" value="${module.id}" ${selected.includes(module.id) ? "checked" : ""} />
      <span><i data-lucide="${module.icon}"></i>${module.label}</span>
    </label>
  `).join("");
}

function renderUsers() {
  const table = document.querySelector("#usersTable");
  const pagination = document.querySelector("#usersPagination");
  if (!table) return;
  const totalPages = Math.max(1, Math.ceil(state.users.length / TABLE_PAGE_SIZE));
  if (usersPage > totalPages) usersPage = totalPages;
  const pageUsers = state.users.slice((usersPage - 1) * TABLE_PAGE_SIZE, usersPage * TABLE_PAGE_SIZE);
  table.innerHTML = pageUsers.map((user) => `
    <tr>
      <td data-label="Usuário"><strong>${escapeHtml(user.name)}</strong><br><small>${escapeHtml([user.email, user.registration ? `Mat. ${user.registration}` : ""].filter(Boolean).join(" - "))}</small></td>
      <td data-label="Perfil">
        <strong>${escapeHtml(roleLabels[user.role] || user.role)}</strong>
        ${user.positionTitle || user.department || user.ministryRole ? `<br><small>${escapeHtml([user.positionTitle, user.department, user.ministryRole].filter(Boolean).join(" - "))}</small>` : ""}
      </td>
      <td data-label="Status"><span class="status-badge ${user.status === "blocked" ? "is-blocked" : ""}">${user.status === "blocked" ? "Bloqueado" : "Ativo"}</span></td>
      <td data-label="Ações">
        ${isMaster(user) ? "<span class='muted-text'>Acesso total</span>" : `
          <button class="table-action" data-toggle-user="${user.id}" type="button">${user.status === "blocked" ? "Liberar" : "Bloquear"}</button>
          <button class="table-action secondary" data-promote-user="${user.id}" type="button">Dar master</button>
        `}
      </td>
    </tr>
  `).join("");
  renderTablePagination(pagination, state.users.length, usersPage, totalPages, "users-page");
}

function renderInvites() {
  const empty = document.querySelector("#invitesEmpty");
  const list = document.querySelector("#invitesList");
  if (!empty || !list) return;
  empty.hidden = state.invites.length > 0;
  list.innerHTML = state.invites.map((invite) => {
    const link = inviteLink(invite.token);
    return `
      <div>
        <span>${escapeHtml(invite.name)}<small>${escapeHtml(invite.email)}</small></span>
        <strong>${escapeHtml(roleLabels[invite.role] || invite.role)}</strong>
        <button class="table-action" data-copy="${escapeHtml(link)}" type="button">Copiar</button>
      </div>
    `;
  }).join("");
}

function renderModuleMatrix() {
  const container = document.querySelector("#moduleMatrix");
  if (!container) return;
  container.innerHTML = modules.map((module) => `
    <article>
      <i data-lucide="${module.icon}"></i>
      <strong>${module.label}</strong>
      <span>${permissionLabel(module.id)}</span>
    </article>
  `).join("");
}

function permissionLabel(moduleId) {
  if (isMaster()) return "Master pode configurar";
  if ((moduleId === "churches" || moduleId === "members") && !canManage(moduleId)) return "Somente visualização";
  if (moduleId === "pastoral" && !canManage(moduleId)) return "Somente pedido de oração";
  if (canManage(moduleId)) return "Pode gerenciar";
  return hasPermission(moduleId) ? "Permitido para você" : "Bloqueado para você";
}

function renderPublicLink() {
  const input = document.querySelector("#publicJoinLink");
  if (!input) return;
  const link = publicJoinLink();
  input.value = link;
  drawFallbackQr(link);
  if (window.QRCode) {
    QRCode.toCanvas(document.querySelector("#publicJoinQr"), link, { width: 180, margin: 1 }).catch(() => drawFallbackQr(link));
  }
}

function drawFallbackQr(text) {
  const canvas = document.querySelector("#publicJoinQr");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const cells = 25;
  const cell = size / cells;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#111";

  function finder(x, y) {
    ctx.fillRect(x * cell, y * cell, cell * 7, cell * 7);
    ctx.fillStyle = "#fff";
    ctx.fillRect((x + 1) * cell, (y + 1) * cell, cell * 5, cell * 5);
    ctx.fillStyle = "#111";
    ctx.fillRect((x + 2) * cell, (y + 2) * cell, cell * 3, cell * 3);
  }

  finder(1, 1);
  finder(17, 1);
  finder(1, 17);

  let seed = 0;
  for (const char of text) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const inFinder = (x < 9 && y < 9) || (x > 15 && y < 9) || (x < 9 && y > 15);
      if (inFinder) continue;
      seed = (seed * 1664525 + 1013904223) >>> 0;
      if (seed % 5 < 2) ctx.fillRect(x * cell, y * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
}

function renderMembers() {
  const empty = document.querySelector("#membersEmpty");
  const wrap = document.querySelector("#membersTableWrap");
  const table = document.querySelector("#membersTable");
  const notice = document.querySelector("#membersReadOnlyNotice");
  const summary = document.querySelector("#memberSummaryGrid");
  const ageSummary = document.querySelector("#memberAgeSummary");
  const chart = document.querySelector("#memberChartPanel");
  const detailPanel = document.querySelector("#memberDetailPanel");
  const actionsHead = document.querySelector("#memberActionsHead");
  const openButton = document.querySelector("#openMemberFormButton");
  if (!empty || !wrap || !table || !notice || !summary || !ageSummary || !chart || !openButton) return;

  const mayManage = canManage("members");
  openButton.hidden = !mayManage;
  notice.hidden = mayManage;
  summary.hidden = !mayManage;
  ageSummary.hidden = !mayManage;
  chart.hidden = !mayManage;
  if (!mayManage && detailPanel) detailPanel.hidden = true;
  if (actionsHead) actionsHead.hidden = !mayManage;

  const allMembers = [
    ...state.publicMembers.map((member, index) => ({ ...member, source: "Link público", _sourceType: "public", _sourceIndex: index })),
    ...state.members.map((member, index) => ({ ...member, source: "Admin", _sourceType: "admin", _sourceIndex: index }))
  ].map(normalizeMember);

  renderMemberStats(allMembers);
  const filteredMembers = filterMembers(allMembers, memberFilter);
  empty.hidden = filteredMembers.length > 0;
  wrap.hidden = filteredMembers.length === 0;
  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / TABLE_PAGE_SIZE));
  if (membersPage > totalPages) membersPage = totalPages;
  const start = filteredMembers.length ? (membersPage - 1) * TABLE_PAGE_SIZE + 1 : 0;
  const end = Math.min(membersPage * TABLE_PAGE_SIZE, filteredMembers.length);
  const pageMembers = filteredMembers.slice((membersPage - 1) * TABLE_PAGE_SIZE, membersPage * TABLE_PAGE_SIZE);
  const rangeLabel = filteredMembers.length > TABLE_PAGE_SIZE ? ` • ${start}-${end} na tela` : "";
  setText("#memberFilterStatus", `${filterLabel(memberFilter, filteredMembers.length)}${rangeLabel}`);

  table.innerHTML = pageMembers.map((member) => `
    <tr>
      <td data-label="Membro">${escapeHtml(member.name)}<br><small>${escapeHtml([member.source, member.registration ? `Mat. ${member.registration}` : ""].filter(Boolean).join(" - "))}</small></td>
      <td data-label="Telefone">${escapeHtml(member.phone || "-")}</td>
      <td data-label="Status">${escapeHtml(member.status || "-")}</td>
      <td data-label="Entrada">${escapeHtml(formatDate(member.entryDate) || "-")}${isCurrentMonth(member.entryDate) ? "<br><small>Novo neste mês</small>" : ""}</td>
      <td data-label="Ações" ${mayManage ? "" : "hidden"}>
        <button class="table-action" data-detail-member="${member._key}" type="button">Detalhes</button>
        <button class="table-action secondary" data-edit-member="${member._key}" type="button">Editar</button>
        <button class="table-action secondary" data-remove-member="${member._key}" type="button">Remover</button>
      </td>
    </tr>
  `).join("");
  renderTablePagination(document.querySelector("#membersPagination"), filteredMembers.length, membersPage, totalPages, "members-page");
}

function openMemberModal(title = "Cadastrar membro") {
  const modal = document.querySelector("#memberModal");
  if (!modal) return;
  renderMemberChurchOptions();
  renderDepartmentOptions("#memberDepartmentSelect");
  renderMemberFunctionOptions();
  setText("#memberModalTitle", title);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => document.querySelector("#memberForm [name='name']")?.focus(), 0);
}

function closeMemberModal() {
  const modal = document.querySelector("#memberModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openPrayerModal() {
  const modal = document.querySelector("#prayerModal");
  if (!modal) return;
  syncPrayerTargetFields();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => {
    const target = document.querySelector("#prayerRequestForm [name='requestTarget']:checked")?.value;
    document.querySelector(target === "other" ? "#prayerRequestForm [name='requesterName']" : "#prayerRequestForm [name='message']")?.focus();
  }, 0);
}

function closePrayerModal() {
  const modal = document.querySelector("#prayerModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openChurchModal(title = "Cadastrar igreja") {
  const modal = document.querySelector("#churchModal");
  if (!modal) return;
  setText("#churchModalTitle", title);
  modal.hidden = false;
  modal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
  window.setTimeout(() => document.querySelector("#churchForm [name='name']")?.focus(), 0);
}

function closeChurchModal() {
  const modal = document.querySelector("#churchModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openEventModal(title = "Cadastrar evento") {
  const modal = document.querySelector("#eventModal");
  if (!modal) return;
  renderDepartmentOptions("#eventDepartmentSelect");
  renderEventLocationOptions();
  renderEventOwnerOptions();
  syncEventLocationFields();
  syncEventOwnerFields();
  setText("#eventModalTitle", title);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.setTimeout(() => document.querySelector("#eventForm [name='title']")?.focus(), 0);
}

function closeEventModal() {
  const modal = document.querySelector("#eventModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openFinanceModal() {
  const modal = document.querySelector("#financeModal");
  if (!modal) return;
  renderFinanceCategoryOptions();
  modal.hidden = false;
  document.body.classList.add("modal-open");
  const dateField = document.querySelector("#financeForm [name='date']");
  if (dateField && !dateField.value) dateField.value = new Date().toISOString().slice(0, 10);
  window.setTimeout(() => document.querySelector("#financeForm [name='amount']")?.focus(), 0);
}

function renderFinanceCategoryOptions() {
  const form = document.querySelector("#financeForm");
  const select = document.querySelector("#financeCategorySelect");
  if (!form || !select) return;
  form.querySelectorAll("input[name='category']").forEach((input) => {
    input.disabled = true;
    input.required = false;
  });
  const type = form.elements.type?.value || "income";
  const previous = select.value;
  select.innerHTML = (financeCategoryGroups[type] || []).map(([code, label]) => {
    const value = `${code} - ${label}`;
    return `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`;
  }).join("");
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
  renderFinancePeopleOptions();
  syncFinanceEntryFields();
}

function financePeople() {
  return [
    ...state.publicMembers.map((member, index) => ({ ...member, source: "Link publico", _sourceType: "public", _sourceIndex: index })),
    ...state.members.map((member, index) => ({ ...member, source: "Admin", _sourceType: "admin", _sourceIndex: index }))
  ].map(normalizeMember).sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "pt-BR"));
}

function renderFinancePeopleOptions() {
  const select = document.querySelector("#financePersonSelect");
  if (!select) return;
  const previous = select.value;
  const people = financePeople();
  select.innerHTML = [
    `<option value="anonymous">Anônimo / não identificado</option>`,
    `<option value="manual">Informar manualmente</option>`,
    ...people.map((person) => {
      const detail = [person.registration, person.status, person.phone].filter(Boolean).join(" - ");
      const label = `${person.name || "Sem nome"}${detail ? ` (${detail})` : ""}`;
      return `<option value="${escapeHtml(person._key)}">${escapeHtml(label)}</option>`;
    })
  ].join("");
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function syncFinanceEntryFields() {
  const form = document.querySelector("#financeForm");
  if (!form) return;
  const type = form.elements.type?.value || "income";
  form.querySelectorAll(".finance-income-field").forEach((field) => { field.hidden = type !== "income"; });
  form.querySelectorAll(".finance-expense-field").forEach((field) => { field.hidden = type !== "expense"; });
  if (type === "income") syncFinancePersonFields();
}

function syncFinancePersonFields() {
  const form = document.querySelector("#financeForm");
  const select = document.querySelector("#financePersonSelect");
  if (!form || !select) return;
  const nameField = form.elements.counterpartyName;
  const registrationField = form.elements.counterpartyRegistration;
  const selected = select.value;
  const person = financePeople().find((item) => item._key === selected);
  if (selected === "anonymous") {
    if (nameField) nameField.value = "Anônimo";
    if (registrationField) registrationField.value = "";
    return;
  }
  if (selected === "manual") {
    if (nameField && nameField.value === "Anônimo") nameField.value = "";
    if (registrationField) registrationField.value = "";
    return;
  }
  if (person) {
    if (nameField) nameField.value = person.name || "";
    if (registrationField) registrationField.value = person.registration || "";
  }
}

function renderMemberChurchOptions() {
  const select = document.querySelector("#memberChurchSelect");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = [
    `<option value="">Não informado</option>`,
    ...(state.churches || []).map((church) => `<option value="${escapeHtml(church.id)}">${escapeHtml(church.name || "Igreja sem nome")}</option>`)
  ].join("");
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function departmentNames() {
  return Object.keys(departmentRoles);
}

function renderDepartmentOptions(selector, selected = "") {
  const select = document.querySelector(selector);
  if (!select) return;
  const current = selected || select.value;
  select.innerHTML = [
    `<option value="">Sem departamento</option>`,
    ...departmentNames().map((department) => `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`)
  ].join("");
  if ([...select.options].some((option) => option.value === current)) select.value = current;
}

function renderMemberFunctionOptions(selected = "", formSelector = "#memberForm", selectSelector = "#memberFunctionSelect") {
  const form = document.querySelector(formSelector);
  const select = document.querySelector(selectSelector);
  if (!form || !select) return;
  const department = form.elements.department?.value || "";
  const current = selected || select.value;
  const roles = departmentRoles[department] || [];
  select.innerHTML = roles.length
    ? [
      `<option value="">Selecione uma função</option>`,
      ...roles.map((role) => `<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`)
    ].join("")
    : `<option value="">Selecione o departamento primeiro</option>`;
  select.disabled = !roles.length;
  if ([...select.options].some((option) => option.value === current)) select.value = current;
}

function eventPeople() {
  return financePeople().filter((person) => person.department || person.ministryRole || person.isLeader === "on" || person.isLeader === true);
}

function renderEventLocationOptions() {
  const select = document.querySelector("#eventLocationSelect");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = [
    `<option value="">Selecione uma igreja</option>`,
    ...(state.churches || []).map((church) => `<option value="${escapeHtml(church.id)}">${escapeHtml(church.name || "Igreja sem nome")}</option>`),
    `<option value="custom">+ Adicionar local externo</option>`
  ].join("");
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function renderEventOwnerOptions() {
  const form = document.querySelector("#eventForm");
  const select = document.querySelector("#eventOwnerSelect");
  if (!form || !select) return;
  const previous = select.value;
  const department = String(form.elements.department?.value || "").trim().toLowerCase();
  const people = eventPeople().filter((person) => !department || String(person.department || "").trim().toLowerCase() === department);
  select.innerHTML = [
    `<option value="">Selecione um responsável</option>`,
    ...people.map((person) => {
      const role = [person.department, person.ministryRole, person.isLeader === "on" || person.isLeader === true ? "Liderança" : ""].filter(Boolean).join(" - ");
      const label = `${person.name || "Sem nome"}${role ? ` (${role})` : ""}`;
      return `<option value="${escapeHtml(person._key)}">${escapeHtml(label)}</option>`;
    }),
    `<option value="manual">Informar manualmente</option>`
  ].join("");
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function syncEventLocationFields() {
  const form = document.querySelector("#eventForm");
  const customField = document.querySelector(".event-custom-location");
  if (!form || !customField) return;
  const isCustom = form.elements.locationChurchId?.value === "custom";
  customField.hidden = !isCustom;
}

function syncEventOwnerFields() {
  const form = document.querySelector("#eventForm");
  const manualField = document.querySelector(".event-manual-owner");
  if (!form || !manualField) return;
  manualField.hidden = form.elements.ownerId?.value !== "manual";
}

function selectedChurchName(id) {
  return (state.churches || []).find((church) => church.id === id)?.name || "";
}

function memberChurchOptionsHtml(selected = "") {
  return [
    `<option value="">Não informado</option>`,
    ...(state.churches || []).map((church) => `<option value="${escapeHtml(church.id)}" ${church.id === selected ? "selected" : ""}>${escapeHtml(church.name || "Igreja sem nome")}</option>`)
  ].join("");
}

function renderPublicChurchOptions() {
  const select = document.querySelector("#publicChurchSelect");
  if (!select) return;
  select.innerHTML = memberChurchOptionsHtml(select.value);
}

function selectedEventOwnerName(id) {
  return eventPeople().find((person) => person._key === id)?.name || "";
}

function closeFinanceModal() {
  const modal = document.querySelector("#financeModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openFinanceReportsModal() {
  const modal = document.querySelector("#financeReportsModal");
  if (!modal) return;
  normalizeFinanceReportButtons();
  renderFinanceReportsView();
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeFinanceReportsModal() {
  const modal = document.querySelector("#financeReportsModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function normalizeFinanceReportButtons() {
  const openButton = document.querySelector("#openFinanceReportsButton");
  if (openButton) openButton.lastChild.textContent = " Relatórios";
  const closeButton = document.querySelector("#closeFinanceReportsButton");
  if (closeButton) closeButton.setAttribute("aria-label", "Fechar relatórios");
  const reportEndDate = document.querySelector("#reportEndDate");
  if (reportEndDate?.previousSibling) reportEndDate.previousSibling.textContent = "Até";
  const exportActions = document.querySelector(".report-export-actions");
  if (exportActions) exportActions.setAttribute("aria-label", "Exportar relatório");
  document.querySelectorAll("[data-finance-report='consolidated']").forEach((button) => {
    button.dataset.financeReport = "dre";
    button.textContent = "DRE";
  });
}

window.openChurchFormFromButton = function openChurchFormFromButton(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  document.querySelector("#churchForm")?.reset();
  setValue("#churchId", "");
  openChurchModal("Cadastrar igreja");
};

function syncPrayerTargetFields() {
  const form = document.querySelector("#prayerRequestForm");
  if (!form) return;
  const user = currentUser();
  const target = form.elements.requestTarget?.value || "self";
  const nameField = form.elements.requesterName;
  const label = document.querySelector("#prayerPersonNameField");
  if (!nameField) return;

  if (target === "self") {
    nameField.value = user?.name || "";
    nameField.readOnly = true;
    nameField.placeholder = "Nome do usuário";
    if (label) label.childNodes[0].textContent = "Seu nome";
    return;
  }

  nameField.readOnly = false;
  nameField.value = "";
  nameField.placeholder = "Nome da pessoa";
  if (label) label.childNodes[0].textContent = "Nome da pessoa";
}

function normalizeMember(member, index) {
  const statusMap = {
    "Frequentador": "Visitante",
    "Membro ativo": "Membro",
    "Novo membro": "Membro",
    "Pedido de contato": "Visitante"
  };
  const source = member._sourceType || (member.source === "Link público" ? "public" : "admin");
  const keyValue = source === "admin" && member.id
    ? member.id
    : (Number.isInteger(member._sourceIndex) ? member._sourceIndex : index);
  return {
    ...member,
    _key: `${source}:${keyValue}`,
    entryDate: member.entryDate || (member._sourceType === "public" || member.source === "Link público" ? String(member.createdAt || "").slice(0, 10) : ""),
    status: statusMap[member.status] || member.status || "Visitante"
  };
}

function renderMemberStats(members) {
  const currentMonthEntries = members.filter((member) => isCurrentMonth(member.entryDate));
  setText("#memberTotalCount", members.length);
  setText("#memberNewMonthCount", currentMonthEntries.length);
  setText("#memberFemaleCount", members.filter((member) => member.gender === "Feminino").length);
  setText("#memberMaleCount", members.filter((member) => member.gender === "Masculino").length);
  setText("#newVisitorsCount", members.filter((member) => member.status === "Visitante" && isCurrentMonth(member.entryDate || member.createdAt)).length);
  setText("#activeMembersCount", members.filter((member) => member.status === "Membro").length);
  setText("#congregadosCount", members.filter((member) => member.status === "Congregado").length);
  setText("#ageChildCount", members.filter((member) => inAgeRange(member, 0, 12)).length);
  setText("#ageTeenCount", members.filter((member) => inAgeRange(member, 13, 17)).length);
  setText("#ageAdultCount", members.filter((member) => inAgeRange(member, 18, 59)).length);
  setText("#ageSeniorCount", members.filter((member) => inAgeRange(member, 60, 200)).length);
}

function filterMembers(members, filter) {
  const predicates = {
    all: () => true,
    "new-month": (member) => isCurrentMonth(member.entryDate),
    female: (member) => member.gender === "Feminino",
    male: (member) => member.gender === "Masculino",
    "new-visitors": (member) => member.status === "Visitante" && isCurrentMonth(member.entryDate || member.createdAt),
    member: (member) => member.status === "Membro",
    congregado: (member) => member.status === "Congregado",
    "age-child": (member) => inAgeRange(member, 0, 12),
    "age-teen": (member) => inAgeRange(member, 13, 17),
    "age-adult": (member) => inAgeRange(member, 18, 59),
    "age-senior": (member) => inAgeRange(member, 60, 200)
  };
  return members.filter(predicates[filter] || predicates.all);
}

function filterLabel(filter, count) {
  const labels = {
    all: "Exibindo todos",
    "new-month": "Entraram neste mês",
    female: "Mulheres",
    male: "Homens",
    "new-visitors": "Novos visitantes do mês",
    member: "Membros",
    congregado: "Congregados",
    "age-child": "Até 12 anos",
    "age-teen": "13 a 17 anos",
    "age-adult": "18 a 59 anos",
    "age-senior": "60+ anos"
  };
  return `${labels[filter] || labels.all}: ${count}`;
}

function isCurrentMonth(value) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ageFromBirthDate(value) {
  if (!value) return "-";
  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) return "-";
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const beforeBirthday = now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age >= 0 ? `${age} anos` : "-";
}

function ageNumber(value) {
  const age = ageFromBirthDate(value);
  const numeric = Number.parseInt(age, 10);
  return Number.isNaN(numeric) ? null : numeric;
}

function inAgeRange(member, min, max) {
  const age = ageNumber(member.birthDate);
  return age !== null && age >= min && age <= max;
}

function findMemberByKey(key) {
  const [source, rawValue] = String(key || "").split(":");
  if (source === "public") {
    const index = Number(rawValue);
    const item = state.publicMembers[index];
    return { member: item ? normalizeMember({ ...item, source: "Link público" }, index) : null, source, index };
  }
  let index = state.members.findIndex((member) => member.id === rawValue);
  if (index < 0 && /^\d+$/.test(rawValue || "")) index = Number(rawValue);
  const item = state.members[index];
  return { member: item ? normalizeMember({ ...item, source: "Admin" }, index) : null, source: "admin", index };
}

function renderChurches() {
  const empty = document.querySelector("#churchesEmpty");
  const list = document.querySelector("#churchesList");
  const editor = document.querySelector("#churchEditor");
  const notice = document.querySelector("#churchesReadOnlyNotice");
  if (!empty || !list || !editor || !notice) return;

  const mayManage = canManage("churches");
  editor.hidden = !mayManage;
  notice.hidden = mayManage;
  empty.hidden = state.churches.length > 0;

  list.innerHTML = state.churches.map((church) => `
    <article class="church-card">
      <div>
        <strong>${escapeHtml(church.name)}</strong>
        <span>${escapeHtml([church.address, church.city, church.state].filter(Boolean).join(" - "))}</span>
      </div>
      <dl>
        <div><dt>Pastor</dt><dd>${escapeHtml(church.pastor || "-")}</dd></div>
        <div><dt>Telefone</dt><dd>${escapeHtml(church.phone || "-")}</dd></div>
        <div><dt>Status</dt><dd>${escapeHtml(church.status || "-")}</dd></div>
        <div><dt>Culto</dt><dd>${escapeHtml(church.serviceTime || "-")}</dd></div>
      </dl>
      ${mayManage ? `
        <div class="church-actions">
          <button class="table-action" data-edit-church="${church.id}" type="button">Editar</button>
          <button class="table-action secondary" data-remove-church="${church.id}" type="button">Remover</button>
        </div>
      ` : ""}
    </article>
  `).join("");

  renderChurchMap();
}

function renderChurchMap() {
  const mapNode = document.querySelector("#churchMap");
  const note = document.querySelector("#churchMapNote");
  if (!mapNode) return;
  if (!window.L) {
    if (note) note.textContent = "Carregando mapa...";
    window.setTimeout(renderChurchMap, 500);
    return;
  }

  const defaultCenter = [-22.8268, -43.0634];
  if (!churchMap) {
    churchMap = L.map(mapNode, { scrollWheelZoom: false }).setView(defaultCenter, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(churchMap);
    churchMarkers = L.layerGroup().addTo(churchMap);
  }

  churchMarkers.clearLayers();
  const positioned = state.churches
    .map((church) => ({ church, lat: parseCoordinate(church.lat), lng: parseCoordinate(church.lng) }))
    .filter((item) => Number.isFinite(item.lat) && Number.isFinite(item.lng));

  positioned.forEach(({ church, lat, lng }) => {
    const popup = `
      <strong>${escapeHtml(church.name || "Igreja")}</strong><br>
      ${escapeHtml([church.address, church.city, church.state].filter(Boolean).join(" - "))}<br>
      <small>${escapeHtml(church.serviceTime || "")}</small>
    `;
    L.marker([lat, lng]).addTo(churchMarkers).bindPopup(popup);
  });

  if (positioned.length > 0) {
    const bounds = L.latLngBounds(positioned.map((item) => [item.lat, item.lng]));
    churchMap.fitBounds(bounds.pad(0.22), { maxZoom: 15 });
    if (note) note.textContent = `${positioned.length} igreja(s) posicionada(s) no mapa.`;
  } else {
    churchMap.setView(defaultCenter, 12);
    if (note) note.textContent = state.churches.length ? "Localizando igrejas pelo endereço..." : "Cadastre uma igreja para exibir no mapa.";
  }

  window.setTimeout(() => churchMap.invalidateSize(), 120);
  geocodeMissingChurches();
}

function parseCoordinate(value) {
  if (value === null || value === undefined || value === "") return NaN;
  return Number(String(value).replace(",", "."));
}

function churchAddressQuery(church) {
  return [church.address, church.city, church.state, "Brasil"].filter(Boolean).join(", ");
}

async function geocodeMissingChurches() {
  const candidates = state.churches.filter((church) => {
    const hasCoords = Number.isFinite(parseCoordinate(church.lat)) && Number.isFinite(parseCoordinate(church.lng));
    return !hasCoords && church.address && church.city && !geocodingChurchIds.has(church.id);
  });
  if (candidates.length === 0) return;

  const church = candidates[0];
  geocodingChurchIds.add(church.id);
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(churchAddressQuery(church))}`;
    const response = await fetch(url);
    if (!response.ok) return;
    const [result] = await response.json();
    if (!result) return;
    church.lat = result.lat;
    church.lng = result.lon;
    saveState();
    renderChurches();
  } catch {
    const note = document.querySelector("#churchMapNote");
    if (note) note.textContent = "Não foi possível localizar automaticamente. Informe latitude e longitude no cadastro.";
  } finally {
    geocodingChurchIds.delete(church.id);
  }
}

function renderPastoral() {
  const notice = document.querySelector("#pastoralPrayerOnlyNotice");
  const managePanel = document.querySelector("#pastoralManagePanel");
  const minePanel = document.querySelector("#pastoralMinePanel");
  const list = document.querySelector("#pastoralRequestsList");
  const empty = document.querySelector("#pastoralRequestsEmpty");
  const mineList = document.querySelector("#pastoralMineList");
  const mineEmpty = document.querySelector("#pastoralMineEmpty");
  if (!notice || !managePanel || !minePanel || !list || !empty || !mineList || !mineEmpty) return;

  const user = currentUser();
  const mayManage = canManage("pastoral");
  const requests = state.pastoralRequests || [];
  const ownRequests = requests.filter((request) => request.requesterUserId === user?.id || request.requesterEmail === user?.email);

  notice.hidden = mayManage;
  managePanel.hidden = !mayManage;
  minePanel.hidden = mayManage;

  setText("#pastoralTotalCount", requests.length);
  setText("#pastoralOpenCount", requests.filter((request) => request.status !== "resolved").length);
  setText("#pastoralUrgentCount", requests.filter((request) => request.urgency === "Urgente" && request.status !== "resolved").length);
  setText("#pastoralResolvedCount", requests.filter((request) => request.status === "resolved").length);

  empty.hidden = requests.length > 0;
  list.innerHTML = requests.map((request) => pastoralRequestCard(request, true)).join("");

  mineEmpty.hidden = ownRequests.length > 0;
  mineList.innerHTML = ownRequests.map((request) => pastoralRequestCard(request, false)).join("");
}

function pastoralRequestCard(request, mayManage) {
  const isResolved = request.status === "resolved";
  return `
    <article class="pastoral-card ${isResolved ? "is-resolved" : ""}">
      <header>
        <div>
          <strong>${escapeHtml(request.requesterName || "Pedido sem nome")}</strong>
          <span>${escapeHtml(formatDate(request.createdAt) || "-")} • ${escapeHtml(request.type || "Oração")}</span>
        </div>
        <span class="pastoral-status ${isResolved ? "is-resolved" : ""}">${isResolved ? "Resolvido" : escapeHtml(request.urgency || "Normal")}</span>
      </header>
      <p>${escapeHtml(request.message || "-")}</p>
      <dl>
        <div><dt>Contato</dt><dd>${escapeHtml(request.requesterEmail || "-")}</dd></div>
        <div><dt>Pedido</dt><dd>${request.requestTarget === "other" ? "Para outra pessoa" : "Para mim"}</dd></div>
        <div><dt>Confidencial</dt><dd>${request.confidential ? "Sim" : "Não"}</dd></div>
      </dl>
      ${mayManage ? `
        <footer>
          ${isResolved ? `<button class="table-action" data-reopen-prayer="${request.id}" type="button">Reabrir</button>` : `<button class="table-action" data-resolve-prayer="${request.id}" type="button">Marcar resolvido</button>`}
          <button class="table-action secondary" data-remove-prayer="${request.id}" type="button">Remover</button>
        </footer>
      ` : ""}
    </article>
  `;
}

function renderMessages() {
  const empty = document.querySelector("#messagesEmpty");
  const list = document.querySelector("#messagesList");
  if (!empty || !list) return;
  empty.hidden = state.messages.length > 0;
  list.innerHTML = state.messages.map((message, index) => `
    <div>
      <span>${escapeHtml(message.title)}</span>
      <strong>${escapeHtml(message.audience)}</strong>
      <button class="table-action" data-remove-message="${index}" type="button">Remover</button>
    </div>
  `).join("");
}

function renderMobileApp() {
  const { settings } = state;
  const activeEvents = [...(state.events || [])].filter(isUpcomingEvent).slice(0, 3);
  const latestMessages = [...(state.messages || [])].slice(0, 3);
  const memberCount = (state.members || []).length + (state.publicMembers || []).length;
  const contentItems = [
    ...activeEvents.map((event) => ({
      icon: "calendar-days",
      title: event.title || "Evento sem título",
      meta: [eventDateLabel(event), event.location].filter(Boolean).join(" • ") || "Agenda da igreja"
    })),
    ...latestMessages.map((message) => ({
      icon: "messages-square",
      title: message.title || "Comunicado",
      meta: message.audience || "Toda igreja"
    }))
  ];
  if (settings.mobileVerse) {
    contentItems.unshift({ icon: "book-open", title: "Palavra do dia", meta: settings.mobileVerse });
  }
  if (settings.mobileContent) {
    contentItems.unshift({ icon: "newspaper", title: "Conteúdo publicado", meta: settings.mobileContent });
  }
  if (settings.pixKey) {
    contentItems.push({ icon: "hand-heart", title: "Ofertas e contribuições", meta: `Pix: ${settings.pixKey}` });
  }

  setText("#appEventsCount", activeEvents.length);
  setText("#appMessagesCount", latestMessages.length);
  setText("#appMembersCount", memberCount);
  setText("#appChurchesCount", (state.churches || []).length);
  setText("#phoneHeroTitle", settings.mobileHeroTitle || "Bem-vindo");
  setText("#phoneHeroSubtitle", settings.mobileHeroSubtitle || "");

  const banner = document.querySelector("#phoneBanner");
  if (banner) {
    banner.hidden = !settings.mobileBanner;
    banner.textContent = settings.mobileBanner || "";
  }

  const count = document.querySelector("#phoneContentCount");
  if (count) count.textContent = `${contentItems.length} ${contentItems.length === 1 ? "item" : "itens"}`;

  const list = document.querySelector("#phoneContentList");
  if (!list) return;
  list.innerHTML = contentItems.length
    ? contentItems.slice(0, 6).map((item) => `
      <article class="phone-content-card">
        <i data-lucide="${item.icon}"></i>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.meta)}</span>
        </div>
      </article>
    `).join("")
    : `<div class="empty-phone">Publique conteúdos no admin para exibir aqui.</div>`;
}

function mobileContentItems() {
  const { settings } = state;
  const activeEvents = [...(state.events || [])].filter(isUpcomingEvent).slice(0, 3);
  const latestMessages = [...(state.messages || [])].slice(0, 3);
  const member = currentMember();
  const memberFinanceTotal = (state.financialEntries || [])
    .filter((entry) => entry.type === "income")
    .filter((entry) => {
      const haystack = financeSearchHaystack(entry).toLowerCase();
      return [member?.name, member?.email, member?.registration].filter(Boolean).some((value) => haystack.includes(String(value).toLowerCase()));
    })
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const birthdays = [...(state.members || []), ...(state.publicMembers || [])]
    .filter((person) => person.birthDate)
    .filter((person) => {
      const date = new Date(`${person.birthDate}T00:00:00`);
      const now = new Date();
      return date.getMonth() === now.getMonth();
    })
    .slice(0, 3);
  const contentItems = [
    { icon: "calendar-days", title: "Agenda de eventos", meta: activeEvents.length ? `${activeEvents.length} evento(s) em destaque` : "Nenhum evento publicado no momento" },
    { icon: "hand-heart", title: "Minhas ofertas e dízimos", meta: memberFinanceTotal ? formatCurrency(memberFinanceTotal) : "Suas contribuições aparecerão aqui" },
    { icon: "cake", title: "Aniversariantes", meta: birthdays.length ? birthdays.map((person) => person.name).join(", ") : "Nenhum aniversariante publicado este mes" },
    { icon: "book-open", title: "Bíblia", meta: settings.bibleLink ? "Abrir Bíblia" : "Aguardando integração com API" },
    { icon: "badge-check", title: "Carteirinha", meta: member?.registration ? `Matrícula ${member.registration}` : "Cadastro ativo" },
    ...activeEvents.map((event) => ({
      icon: "calendar-days",
      title: event.title || "Evento sem título",
      meta: [eventDateLabel(event), event.location].filter(Boolean).join(" • ") || "Agenda da igreja"
    })),
    ...latestMessages.map((message) => ({
      icon: "messages-square",
      title: message.title || "Comunicado",
      meta: message.audience || "Toda igreja"
    }))
  ];
  if (settings.mobileVerse) contentItems.unshift({ icon: "book-open", title: "Palavra do dia", meta: settings.mobileVerse });
  if (settings.mobileContent) contentItems.unshift({ icon: "newspaper", title: "Conteúdo publicado", meta: settings.mobileContent });
  if (settings.pixKey) contentItems.push({ icon: "hand-heart", title: "Ofertas e contribuições", meta: `Pix: ${settings.pixKey}` });
  if (settings.publicContact) contentItems.push({ icon: "phone", title: "Contato da igreja", meta: settings.publicContact });
  contentItems.push({ icon: "image", title: "Videos e fotos", meta: "Conteudos da midia ficarao disponiveis aqui" });
  contentItems.push({ icon: "video", title: "Cultos gravados", meta: "Gravações publicadas pela igreja" });
  contentItems.push({ icon: "library", title: "Biblioteca", meta: "Materiais e estudos liberados para membros" });
  return { activeEvents, latestMessages, contentItems };
}

function renderPhoneContent(listSelector, countSelector, items) {
  const count = document.querySelector(countSelector);
  if (count) count.textContent = `${items.length} ${items.length === 1 ? "item" : "itens"}`;

  const list = document.querySelector(listSelector);
  if (!list) return;
  list.innerHTML = items.length
    ? items.slice(0, 10).map((item) => `
      <article class="phone-content-card">
        <i data-lucide="${item.icon}"></i>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.meta)}</span>
        </div>
      </article>
    `).join("")
    : `<div class="empty-phone">Nenhum conteúdo público disponível no momento.</div>`;
}

function renderMobileApp() {
  const { settings } = state;
  const { activeEvents, latestMessages, contentItems } = mobileContentItems();
  const memberCount = (state.members || []).length + (state.publicMembers || []).length;

  setText("#appEventsCount", activeEvents.length);
  setText("#appMessagesCount", latestMessages.length);
  setText("#appMembersCount", memberCount);
  setText("#appChurchesCount", (state.churches || []).length);
  setText("#phoneHeroTitle", settings.mobileHeroTitle || "Bem-vindo");
  setText("#phoneHeroSubtitle", settings.mobileHeroSubtitle || "");
  setText("#memberPhoneHeroTitle", settings.mobileHeroTitle || "Bem-vindo");
  setText("#memberPhoneHeroSubtitle", settings.mobileHeroSubtitle || "");
  setText("#memberApp [data-church-short-name]", settings.shortName || settings.churchName || "Filadelfia");
  setValue("#memberAppSearch", settings.shortName || settings.churchName || "Assembleia");

  const banner = document.querySelector("#phoneBanner");
  if (banner) {
    banner.hidden = !settings.mobileBanner;
    banner.textContent = settings.mobileBanner || "";
  }
  const memberBanner = document.querySelector("#memberPhoneBanner");
  if (memberBanner) {
    memberBanner.hidden = !settings.mobileBanner;
    memberBanner.textContent = settings.mobileBanner || "";
  }

  const member = currentMember();
  setText("#memberWelcomeName", member?.name ? `Ola, ${member.name.split(" ")[0]}` : "Bem-vindo");
  setText("#memberCardName", member?.name || "Membro");
  setText("#memberCardMeta", [member?.status || "Cadastro ativo", member?.registration ? `Mat. ${member.registration}` : ""].filter(Boolean).join(" - "));
  const adminButton = document.querySelector("#memberAdminButton");
  if (adminButton) adminButton.hidden = !currentUser();

  renderPhoneContent("#phoneContentList", "#phoneContentCount", contentItems);
  renderMemberLiveView();
}

function memberFinanceEntries(member = currentMember()) {
  if (!member) return [];
  return (state.financialEntries || [])
    .filter((entry) => entry.type === "income")
    .filter((entry) => {
      const haystack = financeSearchHaystack(entry).toLowerCase();
      return [member.name, member.email, member.registration]
        .filter(Boolean)
        .some((value) => haystack.includes(String(value).toLowerCase()));
    });
}

function memberVisibleMessages(member = currentMember()) {
  const isLeader = member?.isLeader === true || member?.isLeader === "on" || member?.ministryRole || member?.department;
  return [...(state.messages || [])].filter((message) => {
    const audience = String(message.audience || "Toda igreja").toLowerCase();
    if (audience.includes("toda")) return true;
    if (audience.includes("l") && isLeader) return true;
    if (audience.includes("kids") && String(member?.department || "").toLowerCase().includes("kids")) return true;
    return false;
  });
}

function renderMemberLiveView() {
  const container = document.querySelector("#memberLiveView");
  if (!container) return;
  const title = document.querySelector("#memberLiveViewTitle");
  const backButton = document.querySelector(".member-live-view-toolbar [data-member-app-view='home']");
  if (backButton) backButton.hidden = memberAppView === "home";
  const renderers = {
    home: renderMemberHomeView,
    agenda: renderMemberAgendaView,
    offerings: renderMemberOfferingsView,
    card: renderMemberCardView,
    profile: renderMemberProfileEditView
  };
  const labels = {
    home: "Comunicados",
    agenda: "Agenda",
    offerings: "Ofertas e d\u00edzimos",
    card: "Carteirinha",
    profile: "Editar cadastro"
  };
  if (title) title.textContent = labels[memberAppView] || labels.home;
  container.innerHTML = (renderers[memberAppView] || renderers.home)();
  if (memberAppView === "card") renderMemberCardQr();
  if (window.lucide) window.lucide.createIcons();
}

function showMemberNotice(message, type = "success") {
  const notice = document.querySelector("#memberLiveNotice");
  if (!notice) return;
  notice.textContent = message;
  notice.dataset.type = type;
  notice.hidden = false;
  window.clearTimeout(showMemberNotice.timer);
  showMemberNotice.timer = window.setTimeout(() => {
    notice.hidden = true;
  }, 4200);
}

function renderMemberHomeView() {
  const messages = memberVisibleMessages();
  return messages.length
    ? `<div class="member-live-list">${messages.map((message) => `
      <article class="member-live-card">
        <i data-lucide="messages-square"></i>
        <div>
          <strong>${escapeHtml(message.title || "Comunicado")}</strong>
          <span>${escapeHtml(message.message || message.audience || "Toda igreja")}</span>
        </div>
      </article>
    `).join("")}</div>`
    : `<div class="member-live-empty"><i data-lucide="messages-square"></i><strong>Nenhum comunicado publicado</strong><span>Os comunicados da igreja aparecer\u00e3o aqui.</span></div>`;
}

function renderMemberAgendaView() {
  const events = [...(state.events || [])].filter(isUpcomingEvent).slice(0, 20);
  return events.length
    ? `<div class="member-live-list">${events.map((event) => `
      <article class="member-live-card">
        <i data-lucide="calendar-days"></i>
        <div>
          <strong>${escapeHtml(event.title || "Evento")}</strong>
          <span>${escapeHtml([eventDateLabel(event), eventTimeLabel(event.time), event.location].filter(Boolean).join(" - "))}</span>
        </div>
      </article>
    `).join("")}</div>`
    : `<div class="member-live-empty"><i data-lucide="calendar-days"></i><strong>Nenhum evento publicado</strong><span>A agenda da igreja aparecer\u00e1 aqui.</span></div>`;
}

function renderMemberOfferingsView() {
  const member = currentMember();
  const entries = memberFinanceEntries(member);
  const total = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  return `
    <section class="member-live-summary">
      <span>Total registrado</span>
      <strong>${escapeHtml(formatCurrency(total))}</strong>
      <small>Ofertas e d\u00edzimos vinculados ao seu nome, e-mail ou matr\u00edcula.</small>
    </section>
    <section class="member-live-pix">
      <strong>Chave Pix da igreja</strong>
      <span>${escapeHtml(state.settings.pixKey || "Chave Pix ainda n\u00e3o cadastrada")}</span>
      ${state.settings.pixKey ? `<button class="table-action" data-copy="${escapeHtml(state.settings.pixKey)}" type="button">Copiar Pix</button>` : ""}
    </section>
    ${entries.length ? `<div class="member-live-list">${entries.map((entry) => `
      <article class="member-live-card">
        <i data-lucide="receipt"></i>
        <div>
          <strong>${escapeHtml(formatCurrency(entry.amount))}</strong>
          <span>${escapeHtml([formatDate(entry.date), entry.category, entry.description].filter(Boolean).join(" - "))}</span>
        </div>
      </article>
    `).join("")}</div>` : `<div class="member-live-empty"><i data-lucide="receipt"></i><strong>Nenhuma contribui\u00e7\u00e3o vinculada</strong><span>Quando a tesouraria registrar suas ofertas e d\u00edzimos, eles aparecer\u00e3o aqui.</span></div>`}
  `;
}

function renderMemberCardView() {
  const member = currentMember() || {};
  const churchName = selectedChurchName(member.churchId) || "N\u00e3o informado";
  const role = [member.department, member.ministryRole].filter(Boolean).join(" - ");
  return `
    <section class="member-digital-card">
      <div class="member-card-main">
        <div class="member-card-photo">${member.photo ? `<img src="${escapeHtml(member.photo)}" alt="" />` : `<span>${escapeHtml(String(member.name || "M").slice(0, 1).toUpperCase())}</span>`}</div>
        <div>
          <span>Carteirinha</span>
          <strong>${escapeHtml(member.name || "Membro")}</strong>
          <small>${escapeHtml(member.status || "Cadastro ativo")}${member.registration ? ` - Matrícula ${escapeHtml(member.registration)}` : ""}</small>
        </div>
      </div>
      <dl class="member-card-details">
        <div><dt>Matrícula</dt><dd>${escapeHtml(member.registration || "Não informada")}</dd></div>
        <div><dt>Nascimento</dt><dd>${escapeHtml(formatDate(member.birthDate) || "N\u00e3o informado")}</dd></div>
        <div><dt>Igreja</dt><dd>${escapeHtml(churchName)}</dd></div>
        <div><dt>Entrada como membro</dt><dd>${escapeHtml(formatDate(member.entryDate) || "N\u00e3o informado")}</dd></div>
        ${role ? `<div><dt>Cargo / fun\u00e7\u00e3o</dt><dd>${escapeHtml(role)}</dd></div>` : ""}
      </dl>
      <div class="member-card-qr-wrap"><canvas id="memberCardQr" width="132" height="132" aria-label="QR Code da matr\u00edcula"></canvas><small>QR da matr\u00edcula</small></div>
    </section>
    <div class="member-live-actions">
      <button class="outline" type="button" data-member-app-view="profile"><i data-lucide="user-pen"></i> Editar cadastro e foto</button>
      <button class="outline" type="button" id="printMemberCardButton"><i data-lucide="printer"></i> Imprimir carteirinha</button>
    </div>
  `;
}

function renderMemberCardQr() {
  const canvas = document.querySelector("#memberCardQr");
  if (!canvas) return;
  const member = currentMember() || {};
  const payload = member.registration || member.id || member.email || member.name || "membro";
  if (window.QRCode) QRCode.toCanvas(canvas, String(payload), { width: 132, margin: 1 }).catch(() => drawFallbackQr(String(payload)));
}

function renderMemberProfileEditView() {
  const member = currentMember() || {};
  return `
    <form class="member-profile-form" id="memberProfileForm">
      <fieldset>
        <legend>Identificação</legend>
        <label>Matrícula<input value="${escapeHtml(member.registration || "Gerada após salvar")}" readonly /></label>
        <label>Nome<input name="name" value="${escapeHtml(member.name || "")}" required /></label>
        <label>E-mail<input name="email" type="email" value="${escapeHtml(member.email || "")}" /></label>
        <label>Telefone<input name="phone" value="${escapeHtml(member.phone || "")}" /></label>
      </fieldset>
      <fieldset>
        <legend>Dados de membro</legend>
        <label>Data de nascimento<input name="birthDate" type="date" value="${escapeHtml(member.birthDate || "")}" /></label>
        <label>Igreja<select name="churchId">${memberChurchOptionsHtml(member.churchId || "")}</select></label>
        <label>Foto<input name="photoFile" type="file" accept="image/*" /></label>
      </fieldset>
      <p class="form-note">Cargos, fun\u00e7\u00f5es e arrolamento s\u00e3o revisados pela igreja.</p>
      <span class="save-status" id="memberProfileStatus" role="status"></span>
      <button class="save" type="submit"><i data-lucide="save"></i> Salvar cadastro</button>
    </form>
  `;
}

function renderEvents() {
  const empty = document.querySelector("#eventsEmpty");
  const list = document.querySelector("#eventsList");
  const openButton = document.querySelector("#openEventFormButton");
  const notice = document.querySelector("#eventsReadOnlyNotice");
  if (!empty || !list || !openButton || !notice) return;

  const mayManage = canManage("events");
  openButton.hidden = !mayManage;
  notice.hidden = mayManage;

  const events = [...(state.events || [])].sort((a, b) => `${a.startDate || ""} ${a.startTime || ""}`.localeCompare(`${b.startDate || ""} ${b.startTime || ""}`));
  const upcoming = events.filter(isUpcomingEvent);
  const currentMonth = events.filter((event) => isCurrentMonth(event.startDate));
  const openEvents = events.filter((event) => event.registrationStatus === "open");
  setText("#eventTotalCount", events.length);
  setText("#eventUpcomingCount", upcoming.length);
  setText("#eventOpenCount", openEvents.length);
  setText("#eventMonthCount", currentMonth.length);

  document.querySelectorAll("[data-event-filter]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.eventFilter === eventFilter);
  });

  const search = String(document.querySelector("#eventSearchInput")?.value || "").trim().toLowerCase();
  const filtered = events.filter((event) => eventMatchesFilter(event, eventFilter, search));
  empty.hidden = filtered.length > 0;
  list.innerHTML = renderEventAgenda(filtered, mayManage);
}

function eventMatchesFilter(event, filter, search) {
  if (filter === "upcoming" && !isUpcomingEvent(event)) return false;
  if (filter === "open" && event.registrationStatus !== "open") return false;
  if (filter === "past" && !isPastEvent(event)) return false;
  if (!search) return true;
  return [event.title, event.type, event.department, event.location, event.audience, event.owner, event.description, event.status]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function isUpcomingEvent(event) {
  if (event.status === "Cancelado" || event.status === "Encerrado") return false;
  if (!event.startDate) return true;
  return event.startDate >= new Date().toISOString().slice(0, 10);
}

function isPastEvent(event) {
  if (event.status === "Encerrado") return true;
  if (!event.startDate) return false;
  return event.startDate < new Date().toISOString().slice(0, 10);
}

function renderEventAgenda(events, mayManage) {
  const groups = new Map();
  events.forEach((event) => {
    const key = event.startDate || "sem-data";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  });

  return [...groups.entries()].map(([date, items]) => `
    <section class="agenda-day">
      <div class="agenda-date">
        <strong>${escapeHtml(agendaDayNumber(date))}</strong>
        <span>${escapeHtml(agendaMonthLabel(date))}</span>
        <small>${escapeHtml(agendaWeekdayLabel(date))}</small>
      </div>
      <div class="agenda-items">
        ${items.map((event) => eventAgendaItem(event, mayManage)).join("")}
      </div>
    </section>
  `).join("");
}

function eventAgendaItem(event) {
  const registrationLabels = { open: "Inscrições abertas", closed: "Sem inscrição", soon: "Em breve", full: "Esgotadas" };
  return `
    <article class="agenda-event" data-detail-event="${event.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${escapeHtml(event.title || "evento")}">
      <time>${escapeHtml(eventTimeLabel(event.startTime))}</time>
      <div>
        <strong>${escapeHtml(event.title || "Evento sem título")}</strong>
        <span>${escapeHtml([event.type || "Evento", event.location, event.department].filter(Boolean).join(" • "))}</span>
      </div>
      <em class="event-status">${escapeHtml(registrationLabels[event.registrationStatus] || event.status || "Ativo")}</em>
    </article>
  `;
}

function agendaDate(date) {
  if (!date || date === "sem-data") return null;
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function agendaDayNumber(date) {
  const parsed = agendaDate(date);
  return parsed ? parsed.toLocaleDateString("pt-BR", { day: "2-digit" }) : "--";
}

function agendaMonthLabel(date) {
  const parsed = agendaDate(date);
  return parsed ? parsed.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "") : "Sem data";
}

function agendaWeekdayLabel(date) {
  const parsed = agendaDate(date);
  return parsed ? parsed.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "") : "";
}

function openEventDetail(eventId) {
  const event = (state.events || []).find((item) => item.id === eventId);
  const modal = document.querySelector("#eventDetailModal");
  const content = document.querySelector("#eventDetailContent");
  if (!event || !modal || !content) return;
  const mayManage = canManage("events");
  const registrationLabels = { open: "Inscrições abertas", closed: "Sem inscrição", soon: "Em breve", full: "Esgotadas" };
  setText("#eventDetailTitle", event.title || "Detalhes do evento");
  content.innerHTML = `
    <div class="event-detail-hero">
      <div>
        <span>${escapeHtml(event.type || "Evento")}</span>
        <strong>${escapeHtml(eventDateLabel(event))}</strong>
      </div>
      <em class="event-status">${escapeHtml(event.status || "Ativo")}</em>
    </div>
    <div class="detail-grid">
      <div><span>Duração</span><strong>${escapeHtml(eventDurationLabel(event))}</strong></div>
      <div><span>Local</span><strong>${escapeHtml(event.location || "-")}</strong></div>
      <div><span>Departamento</span><strong>${escapeHtml(event.department || "-")}</strong></div>
      <div><span>Público</span><strong>${escapeHtml(event.audience || "-")}</strong></div>
      <div><span>Inscrições</span><strong>${escapeHtml(registrationLabels[event.registrationStatus] || "-")}</strong></div>
      <div><span>Vagas</span><strong>${escapeHtml(event.capacity || "Sem limite")}</strong></div>
      <div><span>Responsável</span><strong>${escapeHtml(event.owner || "-")}</strong></div>
      <div><span>Contato</span><strong>${escapeHtml(event.contact || "-")}</strong></div>
      ${event.description ? `<div class="detail-full"><span>Descrição</span><strong>${escapeHtml(event.description)}</strong></div>` : ""}
    </div>
    ${mayManage ? `
      <footer class="modal-actions">
        <button class="save" data-edit-event="${event.id}" type="button"><i data-lucide="pencil"></i> Editar</button>
        <button class="outline" data-remove-event="${event.id}" type="button"><i data-lucide="trash-2"></i> Remover</button>
      </footer>
    ` : ""}
  `;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  if (window.lucide) window.lucide.createIcons();
}

function closeEventDetail() {
  const modal = document.querySelector("#eventDetailModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function eventDateLabel(event) {
  const start = formatDate(event.startDate) || "-";
  const time = event.startTime ? `, ${eventTimeLabel(event.startTime)}` : "";
  return `${start}${time}`;
}

function eventTimeLabel(time) {
  if (!time) return "--:--";
  return String(time).slice(0, 5);
}

function eventDurationLabel(event) {
  if (!event.durationValue) return "-";
  const labels = { hours: "hora", minutes: "minuto", days: "dia" };
  const unit = labels[event.durationUnit] || "hora";
  const value = Number(event.durationValue);
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

function renderFinance() {
  const empty = document.querySelector("#financeEmpty");
  const wrap = document.querySelector("#financeTableWrap");
  const table = document.querySelector("#financeTable");
  if (!empty || !wrap || !table) return;

  const entries = filteredFinanceEntries();
  const income = entries.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const balance = income - expense;

  setText("#financeIncomeTotal", formatCurrency(income));
  setText("#financeExpenseTotal", formatCurrency(expense));
  setText("#financeBalanceTotal", formatCurrency(balance));

  empty.hidden = entries.length > 0;
  wrap.hidden = entries.length === 0;
  renderFinanceCharts(entries, income, expense);
  const totalPages = Math.max(1, Math.ceil(entries.length / FINANCE_PAGE_SIZE));
  if (financePage > totalPages) financePage = totalPages;
  const pageEntries = entries.slice((financePage - 1) * FINANCE_PAGE_SIZE, financePage * FINANCE_PAGE_SIZE);
  table.innerHTML = pageEntries.map((entry) => `
    <tr>
      <td data-label="Data">${escapeHtml(formatDate(entry.date) || "-")}</td>
      <td>${entry.type === "income" ? "Entrada" : "Saída"}</td>
      <td data-label="Categoria">${escapeHtml(entry.category || "-")}</td>
      <td data-label="Origem/Destino">${escapeHtml(financeEntryParty(entry))}</td>
      <td data-label="Descrição">${escapeHtml(entry.description || entry.notes || "-")}</td>
      <td data-label="Valor"><strong class="${entry.type === "income" ? "money-in" : "money-out"}">${escapeHtml(formatCurrency(Number(entry.amount || 0)))}</strong></td>
      <td data-label="Ações"><button class="table-action secondary" data-remove-finance="${entry.id}" type="button">Remover</button></td>
    </tr>
  `).join("");
  renderFinancePagination(entries.length, totalPages);
}

function renderFinancePagination(totalItems, totalPages) {
  const container = document.querySelector("#financePagination");
  if (!container) return;
  renderTablePagination(container, totalItems, financePage, totalPages, "finance-page");
}

function renderTablePagination(container, totalItems, currentPage, totalPages, dataName) {
  if (!container) return;
  container.hidden = totalItems <= TABLE_PAGE_SIZE;
  if (totalItems <= TABLE_PAGE_SIZE) {
    container.innerHTML = "";
    return;
  }

  const start = (currentPage - 1) * TABLE_PAGE_SIZE + 1;
  const end = Math.min(currentPage * TABLE_PAGE_SIZE, totalItems);
  const pages = paginationPages(currentPage, totalPages);
  container.innerHTML = `
    <span>${start}-${end} de ${totalItems} registros</span>
    <button type="button" data-${dataName}="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="Página anterior">‹</button>
    ${pages.map((page) => page === "..." ? `<span class="pagination-dots">...</span>` : `<button type="button" data-${dataName}="${page}" class="${page === currentPage ? "is-selected" : ""}">${page}</button>`).join("")}
    <button type="button" data-${dataName}="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Próxima página">›</button>
  `;
}

function paginationPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages = [1];
  if (current > 4) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let page = start; page <= end; page++) pages.push(page);
  if (current < total - 3) pages.push("...");
  pages.push(total);
  return pages;
}

function renderFinanceReport(entries, income, expense, balance) {
  const container = document.querySelector("#financeReportContent");
  if (!container) return;
  normalizeFinanceReportButtons();
  document.querySelectorAll("[data-finance-report]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.financeReport === financeReportMode);
  });

  const renderers = {
    dre: renderConsolidatedReport,
    consolidated: renderConsolidatedReport,
    cashflow: renderCashflowReport,
    categories: renderCategoryReport,
    public: renderPublicFinanceReport,
    planning: renderPlanningReport
  };
  container.innerHTML = (renderers[financeReportMode] || renderers.dre)(entries, income, expense, balance);
}

function renderFinanceReportsView() {
  const entries = filteredReportEntries();
  const income = entries.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  renderFinanceReport(entries, income, expense, income - expense);
}

function renderConsolidatedReport(entries, income, expense, balance) {
  const margin = income ? Math.round((balance / income) * 100) : 0;
  const largestIncome = largestFinanceEntry(entries, "income");
  const largestExpense = largestFinanceEntry(entries, "expense");
  const incomeRows = financeDreRows(entries.filter((entry) => entry.type === "income"));
  const expenseGroups = financeDreGroups(entries.filter((entry) => entry.type === "expense"));
  return `
    <div class="public-report">
      <h3>DRE detalhado ${escapeHtml(financePeriodLabel("report"))}</h3>
      <p>Demonstrativo de resultado com receitas, despesas por plano de contas, participação percentual e resultado do período.</p>
    </div>
    <div class="report-grid">
      <article><span>Receita bruta</span><strong class="money-in">${escapeHtml(formatCurrency(income))}</strong></article>
      <article><span>Despesas e investimentos</span><strong class="money-out">${escapeHtml(formatCurrency(expense))}</strong></article>
      <article><span>Resultado do período</span><strong class="${balance >= 0 ? "money-in" : "money-out"}">${escapeHtml(formatCurrency(balance))}</strong></article>
      <article><span>Margem operacional</span><strong>${margin}%</strong></article>
    </div>
    <div class="dre-layout">
      <section class="dre-block">
        <h3>1. Receitas operacionais</h3>
        ${renderDreTable(incomeRows, income, "money-in")}
        <footer><span>Total de receitas</span><strong class="money-in">${escapeHtml(formatCurrency(income))}</strong></footer>
      </section>
      <section class="dre-block">
        <h3>2. Despesas e investimentos</h3>
        ${expenseGroups.map((group) => `
          <div class="dre-group">
            <h4>${escapeHtml(group.label)}</h4>
            ${renderDreTable(group.rows, group.total, "money-out")}
            <footer><span>Subtotal</span><strong class="money-out">${escapeHtml(formatCurrency(group.total))}</strong></footer>
          </div>
        `).join("") || emptyChart("Sem despesas no período")}
        <footer><span>Total de despesas</span><strong class="money-out">${escapeHtml(formatCurrency(expense))}</strong></footer>
      </section>
      <section class="dre-result">
        <div><span>Receita bruta</span><strong class="money-in">${escapeHtml(formatCurrency(income))}</strong></div>
        <div><span>(-) Despesas / investimentos</span><strong class="money-out">${escapeHtml(formatCurrency(expense))}</strong></div>
        <div><span>Resultado líquido do período</span><strong class="${balance >= 0 ? "money-in" : "money-out"}">${escapeHtml(formatCurrency(balance))}</strong></div>
      </section>
    </div>
    <div class="report-notes">
      <p><strong>Maior entrada:</strong> ${escapeHtml(largestIncome?.category || "-")} ${largestIncome ? `(${escapeHtml(formatCurrency(largestIncome.amount))})` : ""}</p>
      <p><strong>Maior saída:</strong> ${escapeHtml(largestExpense?.category || "-")} ${largestExpense ? `(${escapeHtml(formatCurrency(largestExpense.amount))})` : ""}</p>
    </div>
  `;
}

function financeDreRows(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    const code = financeCategoryCode(entry.category);
    const label = financeCategoryName(entry.category);
    const key = `${code}|${label}`;
    if (!map.has(key)) map.set(key, { code, label, total: 0, count: 0 });
    const row = map.get(key);
    row.total += Number(entry.amount || 0);
    row.count += 1;
  });
  return [...map.values()].sort((a, b) => a.code.localeCompare(b.code));
}

function financeDreGroups(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const group = financeAccountGroup(entry.category, entry.type);
    if (!groups.has(group.key)) groups.set(group.key, { ...group, rows: [], total: 0 });
    groups.get(group.key).total += Number(entry.amount || 0);
  });
  const rows = financeDreRows(entries);
  rows.forEach((row) => {
    const group = financeAccountGroup(`${row.code} - ${row.label}`, "expense");
    if (!groups.has(group.key)) groups.set(group.key, { ...group, rows: [], total: 0 });
    groups.get(group.key).rows.push(row);
  });
  return [...groups.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function renderDreTable(rows, total, moneyClass) {
  if (!rows.length) return emptyChart("Sem lançamentos no período");
  const base = total || rows.reduce((sum, row) => sum + row.total, 0) || 1;
  return `
    <div class="report-table-wrap dre-table">
      <table>
        <thead><tr><th>Código</th><th>Conta</th><th>Lançamentos</th><th>%</th><th>Valor</th></tr></thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td data-label="Codigo">${escapeHtml(row.code || "-")}</td>
              <td data-label="Conta">${escapeHtml(row.label || "Sem categoria")}</td>
              <td data-label="Lancamentos">${row.count}</td>
              <td data-label="%">${Math.round((row.total / base) * 100)}%</td>
              <td data-label="Valor"><strong class="${moneyClass}">${escapeHtml(formatCurrency(row.total))}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function financeCategoryCode(category) {
  const match = String(category || "").match(/^(\d+(?:\.\d+)*)/);
  return match ? match[1] : "";
}

function financeCategoryName(category) {
  return String(category || "Sem categoria").replace(/^\d+(?:\.\d+)*\s-\s/, "");
}

function financeAccountGroup(category, type) {
  const code = financeCategoryCode(category);
  if (type === "income") return { key: "1", label: "Receitas" };
  const prefix = code.split(".").slice(0, 2).join(".");
  const labels = {
    "2.1": "Ministério e pessoal",
    "2.2": "Custos operacionais e administrativos",
    "2.3": "Ministério prático, missões e social",
    "2.4": "Investimentos e patrimônio"
  };
  return { key: prefix || "2.9", label: labels[prefix] || "Outras despesas" };
}

function renderCashflowReport(entries) {
  const rows = cashflowRows(entries);
  if (rows.length === 0) return emptyChart("Sem lançamentos no período");
  let running = 0;
  return `
    <div class="report-table-wrap">
      <table>
        <thead><tr><th>Data</th><th>Entradas</th><th>Saídas</th><th>Saldo acumulado</th></tr></thead>
        <tbody>
          ${rows.map((row) => {
            running += row.income - row.expense;
            return `<tr><td>${escapeHtml(formatDate(row.date))}</td><td class="money-in">${escapeHtml(formatCurrency(row.income))}</td><td class="money-out">${escapeHtml(formatCurrency(row.expense))}</td><td><strong>${escapeHtml(formatCurrency(running))}</strong></td></tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCategoryReport(entries) {
  return `
    <div class="report-split">
      <div><h3>Entradas por centro</h3>${categoryReportList(entries.filter((entry) => entry.type === "income"))}</div>
      <div><h3>Saídas por centro</h3>${categoryReportList(entries.filter((entry) => entry.type === "expense"))}</div>
    </div>
  `;
}

function renderPublicFinanceReport(entries, income, expense, balance) {
  const period = financePeriodLabel("report");
  return `
    <div class="public-report">
      <h3>Prestação de contas ${escapeHtml(period)}</h3>
      <p>No período selecionado, a igreja registrou <strong>${escapeHtml(formatCurrency(income))}</strong> em entradas e <strong>${escapeHtml(formatCurrency(expense))}</strong> em saídas.</p>
      <p>O resultado financeiro foi de <strong class="${balance >= 0 ? "money-in" : "money-out"}">${escapeHtml(formatCurrency(balance))}</strong>.</p>
      <p>Este resumo é uma visão simplificada para transparência. Os lançamentos detalhados permanecem na área restrita da tesouraria.</p>
    </div>
  `;
}

function renderPlanningReport(entries, income, expense, balance) {
  const monthlyAverageIncome = averageByMonth(entries.filter((entry) => entry.type === "income"));
  const monthlyAverageExpense = averageByMonth(entries.filter((entry) => entry.type === "expense"));
  return `
    <div class="report-grid">
      <article><span>Média mensal de receita</span><strong class="money-in">${escapeHtml(formatCurrency(monthlyAverageIncome))}</strong></article>
      <article><span>Média mensal de despesa</span><strong class="money-out">${escapeHtml(formatCurrency(monthlyAverageExpense))}</strong></article>
      <article><span>Projeção simples 3 meses</span><strong>${escapeHtml(formatCurrency((monthlyAverageIncome - monthlyAverageExpense) * 3))}</strong></article>
      <article><span>Status</span><strong>${balance >= 0 ? "Superavitário" : "Deficitário"}</strong></article>
    </div>
    <div class="report-notes"><p>Orçado vs. realizado será conectado quando criarmos metas por categoria e orçamento anual.</p></div>
  `;
}

function largestFinanceEntry(entries, type) {
  return entries.filter((entry) => entry.type === type).sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0))[0];
}

function cashflowRows(entries) {
  const map = new Map();
  entries.forEach((entry) => {
    if (!entry.date) return;
    if (!map.has(entry.date)) map.set(entry.date, { date: entry.date, income: 0, expense: 0 });
    map.get(entry.date)[entry.type === "income" ? "income" : "expense"] += Number(entry.amount || 0);
  });
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function categoryReportList(entries) {
  const totals = new Map();
  entries.forEach((entry) => totals.set(entry.category || "Sem categoria", (totals.get(entry.category || "Sem categoria") || 0) + Number(entry.amount || 0)));
  const rows = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const total = rows.reduce((sum, [, value]) => sum + value, 0) || 1;
  if (rows.length === 0) return emptyChart("Sem lançamentos");
  return `<div class="report-list">${rows.map(([label, value]) => `<div><span>${escapeHtml(shortCategory(label))}</span><strong>${escapeHtml(formatCurrency(value))}<small>${Math.round((value / total) * 100)}%</small></strong></div>`).join("")}</div>`;
}

function financePeriodLabel(scope = "finance") {
  const prefix = scope === "report" ? "report" : "finance";
  const start = document.querySelector(`#${prefix}StartDate`)?.value;
  const end = document.querySelector(`#${prefix}EndDate`)?.value;
  if (start && end) return `de ${formatDate(start)} a ${formatDate(end)}`;
  if (start) return `a partir de ${formatDate(start)}`;
  if (end) return `até ${formatDate(end)}`;
  return "geral";
}

function averageByMonth(entries) {
  const buckets = financeEvolutionBuckets(entries, "month");
  if (buckets.length === 0) return 0;
  const total = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  return total / buckets.length;
}

function financeReportRows(entries = filteredReportEntries()) {
  return entries.map((entry) => ({
    Data: formatDate(entry.date) || "-",
    Tipo: entry.type === "income" ? "Entrada" : "Saída",
    Categoria: entry.category || "-",
    OrigemDestino: financeEntryParty(entry),
    Matrícula: entry.counterpartyRegistration || "-",
    Documento: entry.documentCode || "-",
    NotaFiscal: entry.invoiceCode || "-",
    Fornecedor: entry.supplierName || "-",
    Descrição: entry.description || entry.notes || "-",
    Valor: Number(entry.amount || 0)
  }));
}

function financeEntryParty(entry) {
  if (entry.type === "income") return entry.counterpartyName || "Anônimo";
  return entry.supplierName || entry.recipientName || entry.counterpartyName || "-";
}

function financeSearchHaystack(entry) {
  return [
    entry.counterpartyName,
    entry.counterpartyRegistration,
    entry.counterpartyKey,
    entry.supplierName,
    entry.recipientName,
    entry.documentCode,
    entry.invoiceCode,
    entry.description,
    entry.notes,
    entry.category
  ].join(" ").toLowerCase();
}

function exportFinanceReport(format) {
  const entries = filteredReportEntries();
  const rows = financeReportRows(entries);
  const period = financePeriodLabel("report").replace(/\s+/g, "-").replace(/[^\w-]/g, "").toLowerCase() || "geral";
  const filename = `relatorio-financeiro-${financeReportMode}-${period}`;
  if (format === "csv") {
    const headers = Object.keys(rows[0] || { Data: "", Tipo: "", Categoria: "", OrigemDestino: "", Matrícula: "", Documento: "", NotaFiscal: "", Fornecedor: "", Descrição: "", Valor: "" });
    const csvRows = [headers.join(";")].concat(rows.map((row) => headers.map((key) => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(";")));
    downloadBlob(`${filename}.csv`, "text/csv;charset=utf-8", csvRows.join("\n"));
    return;
  }
  if (format === "xlsx") {
    if (!window.XLSX) {
      showAppToast("A biblioteca de XLSX ainda não carregou. Tente novamente em alguns segundos.", "warning");
      return;
    }
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, sheet, "Lançamentos");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    return;
  }
  exportFinanceReportPdf(filename, entries);
}

function exportFinanceReportPdf(filename, entries) {
  const income = entries.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const expense = entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const reportHtml = document.querySelector("#financeReportContent")?.innerHTML || "";
  const rows = financeReportRows(entries);
  const printWindow = window.open("", "_blank", "width=1100,height=800");
  if (!printWindow) return;
  printWindow.document.write(`
    <!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(filename)}</title>
    <style>
      body{font-family:Arial,sans-serif;color:#1f2937;margin:32px} h1{font-size:24px} table{width:100%;border-collapse:collapse;margin-top:18px}
      th,td{border-bottom:1px solid #d8dde8;padding:9px;text-align:left} th{background:#f1f5f9}.money-in{color:#1fbf4f}.money-out{color:#e74d66}
      .summary{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0}.summary div{border:1px solid #d8dde8;padding:12px;border-radius:6px}
      .report-grid,.report-split{display:grid;gap:12px}.report-grid{grid-template-columns:repeat(4,1fr)}.report-grid article,.public-report,.report-notes{border:1px solid #d8dde8;padding:12px;border-radius:6px;margin-bottom:12px}
    </style></head><body>
    <h1>Relatório financeiro</h1><p>Período: ${escapeHtml(financePeriodLabel("report"))}</p>
    <div class="summary"><div><strong>Entradas</strong><br>${escapeHtml(formatCurrency(income))}</div><div><strong>Saídas</strong><br>${escapeHtml(formatCurrency(expense))}</div><div><strong>Resultado</strong><br>${escapeHtml(formatCurrency(income - expense))}</div></div>
    ${reportHtml}
    <h2>Lançamentos</h2><table><thead><tr><th>Data</th><th>Tipo</th><th>Categoria</th><th>Origem/Destino</th><th>Documento</th><th>Descrição</th><th>Valor</th></tr></thead><tbody>
    ${rows.map((row) => `<tr><td>${escapeHtml(row.Data)}</td><td>${escapeHtml(row.Tipo)}</td><td>${escapeHtml(row.Categoria)}</td><td>${escapeHtml(row.OrigemDestino)}</td><td>${escapeHtml(row.Documento)}</td><td>${escapeHtml(row.Descrição)}</td><td>${escapeHtml(formatCurrency(row.Valor))}</td></tr>`).join("")}
    </tbody></table></body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function downloadBlob(filename, type, content) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function filteredFinanceEntries() {
  const start = document.querySelector("#financeStartDate")?.value;
  const end = document.querySelector("#financeEndDate")?.value;
  return (state.financialEntries || []).filter((entry) => {
    if (!entry.date) return true;
    if (start && entry.date < start) return false;
    if (end && entry.date > end) return false;
    return true;
  });
}

function filteredReportEntries() {
  const start = document.querySelector("#reportStartDate")?.value;
  const end = document.querySelector("#reportEndDate")?.value;
  const search = String(document.querySelector("#reportPartySearch")?.value || "").trim().toLowerCase();
  return (state.financialEntries || []).filter((entry) => {
    if (!entry.date) return true;
    if (start && entry.date < start) return false;
    if (end && entry.date > end) return false;
    if (search && !financeSearchHaystack(entry).includes(search)) return false;
    return true;
  });
}

function renderFinanceCharts(entries, income, expense) {
  renderEvolutionLineChart(entries);
  renderWeekdayBarChart(entries);
  renderCategoryBars("#financeIncomeCategoryChart", entries.filter((entry) => entry.type === "income"));
  renderCategoryBars("#financeExpenseCategoryChart", entries.filter((entry) => entry.type === "expense"));
  renderFinanceDonut(income, expense);
}

function renderEvolutionLineChart(entries) {
  const node = document.querySelector("#financeMonthlyChart");
  if (!node) return;
  updateFinanceEvolutionControls();
  const buckets = financeEvolutionBuckets(entries, financeEvolutionMode);
  if (buckets.length === 0) {
    node.innerHTML = emptyChart("Sem lançamentos no período");
    return;
  }

  const width = 680;
  const height = 260;
  const pad = 34;
  const max = Math.max(1, ...buckets.map((item) => Math.max(item.income, item.expense)));
  const x = (index) => buckets.length === 1 ? width / 2 : pad + index * ((width - pad * 2) / (buckets.length - 1));
  const y = (value) => height - pad - (value / max) * (height - pad * 2);
  const points = (key) => buckets.map((item, index) => `${x(index)},${y(item[key])}`).join(" ");
  const labels = buckets.map((item, index) => `<text x="${x(index)}" y="${height - 8}" text-anchor="middle">${item.label}</text>`).join("");

  node.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolução de receitas e despesas">
      <g class="chart-grid">${[0.25, 0.5, 0.75, 1].map((ratio) => `<line x1="${pad}" y1="${y(max * ratio)}" x2="${width - pad}" y2="${y(max * ratio)}"></line>`).join("")}</g>
      <polyline class="line-income" points="${points("income")}"></polyline>
      <polyline class="line-expense" points="${points("expense")}"></polyline>
      ${buckets.map((item, index) => `<circle class="dot-income" cx="${x(index)}" cy="${y(item.income)}" r="4"></circle><circle class="dot-expense" cx="${x(index)}" cy="${y(item.expense)}" r="4"></circle>`).join("")}
      <g class="chart-labels">${labels}</g>
    </svg>
    <div class="chart-legend"><span class="legend-income">Receita</span><span class="legend-expense">Despesa</span></div>
  `;
}

function updateFinanceEvolutionControls() {
  const titles = { day: "Evolução por dia", month: "Evolução por mês", year: "Evolução por ano" };
  const title = document.querySelector("#financeMonthlyChart")?.closest(".finance-chart-card")?.querySelector("h3");
  if (title) title.textContent = titles[financeEvolutionMode] || titles.month;
  document.querySelectorAll("[data-finance-evolution]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.financeEvolution === financeEvolutionMode);
  });
}

function financeEvolutionBuckets(entries, mode) {
  const map = new Map();
  entries.forEach((entry) => {
    if (!entry.date) return;
    const key = financeEvolutionKey(entry.date, mode);
    if (!map.has(key)) map.set(key, { key, label: financeEvolutionLabel(key, mode), income: 0, expense: 0 });
    map.get(key)[entry.type === "income" ? "income" : "expense"] += Number(entry.amount || 0);
  });
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function financeEvolutionKey(date, mode) {
  if (mode === "day") return date;
  if (mode === "year") return date.slice(0, 4);
  return date.slice(0, 7);
}

function financeEvolutionLabel(key, mode) {
  if (mode === "day") {
    const [, month, day] = key.split("-");
    return `${day}/${month}`;
  }
  if (mode === "year") return key;
  const [year, month] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("pt-BR", { month: "short", year: "2-digit", timeZone: "UTC" }).replace(".", "");
}

function renderWeekdayBarChart(entries) {
  const node = document.querySelector("#financeWeekdayChart");
  if (!node) return;
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((label) => ({ label, total: 0 }));
  entries.forEach((entry) => {
    const date = new Date(`${entry.date}T00:00:00`);
    if (!Number.isNaN(date.getTime())) days[date.getDay()].total += Number(entry.amount || 0);
  });
  renderVerticalBars(node, days, "total");
}

function renderCategoryBars(selector, entries) {
  const node = document.querySelector(selector);
  if (!node) return;
  const totals = new Map();
  entries.forEach((entry) => totals.set(entry.category || "Sem categoria", (totals.get(entry.category || "Sem categoria") || 0) + Number(entry.amount || 0)));
  const rows = [...totals.entries()].map(([label, total]) => ({ label, total })).sort((a, b) => b.total - a.total);
  if (rows.length === 0) {
    node.innerHTML = emptyChart("Sem lançamentos");
    return;
  }
  const max = Math.max(...rows.map((row) => row.total), 1);
  const total = rows.reduce((sum, row) => sum + row.total, 0) || 1;
  node.innerHTML = rows.map((row) => `
    <div class="category-bar-row">
      <span>${escapeHtml(shortCategory(row.label))}</span>
      <div><i style="width:${Math.max(4, (row.total / max) * 100)}%"></i></div>
      <strong>${escapeHtml(formatCurrency(row.total))}<small>${Math.round((row.total / total) * 100)}%</small></strong>
    </div>
  `).join("");
}

function shortCategory(value) {
  return String(value || "").replace(/^\d+\.\d+\.\d+\s-\s/, "");
}

function renderVerticalBars(node, rows, key) {
  if (rows.every((row) => row[key] === 0)) {
    node.innerHTML = emptyChart("Sem lançamentos");
    return;
  }
  const max = Math.max(...rows.map((row) => row[key]), 1);
  node.innerHTML = `<div class="weekday-bars">${rows.map((row) => `
    <div>
      <span style="height:${Math.max(4, (row[key] / max) * 100)}%"></span>
      <strong>${escapeHtml(row.label)}</strong>
    </div>
  `).join("")}</div>`;
}

function renderFinanceDonut(income, expense) {
  const node = document.querySelector("#financeDonutChart");
  if (!node) return;
  const total = income + expense;
  const incomePercent = total ? Math.round((income / total) * 100) : 0;
  const expensePercent = total ? 100 - incomePercent : 0;
  node.innerHTML = `
    <div class="donut-money" style="--income:${incomePercent};">
      <strong>${incomePercent}%</strong>
      <span>Entrada</span>
    </div>
    <div class="donut-split">
      <span class="legend-income">Entrada ${incomePercent}%</span>
      <span class="legend-expense">Saída ${expensePercent}%</span>
    </div>
  `;
}

function emptyChart(message) {
  return `<div class="chart-empty">${escapeHtml(message)}</div>`;
}

function renderAll() {
  applySettings();
  renderCounts();
  renderPermissions("#invitePermissions", []);
  renderUsers();
  renderInvites();
  renderModuleMatrix();
  renderPublicLink();
  renderChurches();
  renderMembers();
  renderPastoral();
  renderEvents();
  renderMessages();
  renderFinance();
  renderMobileApp();
  normalizeFinanceReportButtons();
  applyAccess();
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function readImageFile(file) {
  if (!file || !file.type?.startsWith("image/")) return Promise.resolve("");
  return new Promise((resolve) => {
    const image = new Image();
    const reader = new FileReader();
    const cleanup = () => {
      if (image.src) URL.revokeObjectURL(image.src);
    };
    reader.addEventListener("load", () => {
      const fallback = String(reader.result || "");
      image.addEventListener("load", () => {
        try {
          const maxSize = 900;
          const scale = Math.min(1, maxSize / Math.max(image.naturalWidth || 1, image.naturalHeight || 1));
          const width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
          const height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, width, height);
          cleanup();
          resolve(canvas.toDataURL("image/jpeg", 0.78));
        } catch {
          cleanup();
          resolve(fallback);
        }
      }, { once: true });
      image.addEventListener("error", () => {
        cleanup();
        resolve(fallback);
      }, { once: true });
      image.src = fallback;
    });
    reader.addEventListener("error", () => resolve(""));
    reader.readAsDataURL(file);
  });
}

function checkedPermissions(form) {
  const role = form.elements.role?.value;
  return [...form.querySelectorAll("[name='permissions']:checked")]
    .map((input) => input.value)
    .filter((permission) => permission !== "finance" || role === "treasury" || isMasterRole(role));
}

function publicJoinLink() {
  const loopback = ["localhost", "127.0.0.1", "::1", ""].includes(location.hostname);
  const base = loopback && window.FILADELFIA_PUBLIC_BASE_URL ? window.FILADELFIA_PUBLIC_BASE_URL : location.origin;
  const url = new URL(location.pathname || "/", base);
  url.searchParams.set("join", "member");
  url.searchParams.set("public", "1");
  return url.toString();
}

function inviteLink(token) {
  const loopback = ["localhost", "127.0.0.1", "::1", ""].includes(location.hostname);
  const base = loopback && window.FILADELFIA_PUBLIC_BASE_URL ? window.FILADELFIA_PUBLIC_BASE_URL : location.origin;
  const url = new URL(location.pathname || "/", base);
  url.searchParams.set("invite", token);
  return url.toString();
}

function isPublicJoin(params) {
  const values = [params.get("join"), params.get("public"), params.get("cadastro"), params.get("form")];
  return values.some((value) => ["member", "public", "publico", "público", "1", "true", "membro"].includes(String(value || "").toLowerCase()));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("input");
    input.value = text;
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
}

async function signUpOrSignIn(email, password, metadata = {}) {
  const client = supabaseClient();
  if (!client) return { user: null, session: null, error: null };
  let result = await client.auth.signUp({ email, password, options: { data: metadata } });
  if (result.error && /already|registered|exists/i.test(result.error.message)) {
    result = await client.auth.signInWithPassword({ email, password });
  }
  if (!result.data?.session && !result.error) {
    const signIn = await client.auth.signInWithPassword({ email, password });
    if (!signIn.error) result = signIn;
  }
  return { user: result.data?.user || null, session: result.data?.session || null, error: result.error || null };
}

async function signInSupabase(email, password) {
  const client = supabaseClient();
  if (!client) return { user: null, session: null, error: null };
  const result = await client.auth.signInWithPassword({ email, password });
  return { user: result.data?.user || null, session: result.data?.session || null, error: result.error || null };
}

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-auth-tab]").forEach((item) => item.classList.remove("is-selected"));
    document.querySelectorAll(".auth-form").forEach((form) => form.classList.remove("is-visible"));
    button.classList.add("is-selected");
    document.querySelector(`#${button.dataset.authTab}Form`)?.classList.add("is-visible");
  });
});

document.querySelector("#showPasswordResetButton")?.addEventListener("click", () => {
  document.querySelectorAll(".auth-form").forEach((form) => form.classList.remove("is-visible"));
  document.querySelector("#passwordResetForm")?.classList.add("is-visible");
  setText("#passwordResetStatus", "");
});

document.querySelector("#backToLoginButton")?.addEventListener("click", () => {
  document.querySelectorAll(".auth-form").forEach((form) => form.classList.remove("is-visible"));
  document.querySelector("#loginForm")?.classList.add("is-visible");
  setText("#passwordResetStatus", "");
});

document.querySelector("#passwordResetForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = formData(event.currentTarget);
  if (data.password !== data.confirmPassword) {
    setText("#passwordResetStatus", "As senhas não conferem.");
    return;
  }
  setText("#passwordResetStatus", "Alterando senha...");
  const result = await resetMemberPassword(data.email, data.password);
  if (!result.ok) {
    setText("#passwordResetStatus", `Não foi possível alterar: ${result.error?.message || "e-mail não encontrado"}`);
    return;
  }
  setText("#passwordResetStatus", "Senha alterada. Entre usando a nova senha.");
  event.currentTarget.reset();
  window.setTimeout(() => {
    document.querySelectorAll(".auth-form").forEach((form) => form.classList.remove("is-visible"));
    document.querySelector("#loginForm")?.classList.add("is-visible");
  }, 1200);
});

document.querySelector("#registerForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (state.users.length > 0) {
    showAppToast("O administrador master já foi criado. Novos usuários precisam entrar por convite.", "warning");
    return;
  }
  const data = formData(event.currentTarget);
  let authUserId = "";
  if (supabaseConfigured()) {
    const auth = await signUpOrSignIn(data.email, data.password, { name: data.adminName, role: "master" });
    if (auth.error || !auth.user) {
      showAppToast(`Não foi possível criar o acesso no Supabase: ${auth.error?.message || "verifique o Auth do projeto."}`, "error");
      return;
    }
    authUserId = auth.user.id;
    await resolveOrganizationId(supabaseClient());
  }
  const master = {
    id: crypto.randomUUID(),
    authUserId,
    name: data.adminName,
    email: data.email,
    registration: nextLocalRegistration(),
    password: data.password,
    role: "master",
    permissions: roleTemplates.master,
    status: "active",
    createdAt: new Date().toISOString()
  };
  state.admin = { name: master.name, email: master.email, password: master.password };
  state.users = [master];
  state.session = { userId: master.id, email: master.email, signedAt: new Date().toISOString() };
  ensurePrivilegedMemberProfile(master);
  saveMemberSession({ type: "admin", userId: master.id, signedAt: new Date().toISOString() });
  mergeSettings({ churchName: data.churchName, shortName: data.churchName.split(" ").slice(-1)[0] || data.churchName });
  if (supabaseConfigured()) await saveSupabaseState();
  renderAll();
  showAdmin();
});

document.querySelector("#inviteAcceptForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const invite = state.invites.find((item) => item.token === activeInviteToken && item.status === "pending");
  if (!invite) {
    showAppToast("Convite não encontrado ou já utilizado.", "warning");
    return;
  }
  const data = formData(event.currentTarget);
  let authUserId = "";
  if (supabaseConfigured()) {
    activeOrganizationId = invite.organizationId || activeOrganizationId;
    const auth = await signUpOrSignIn(data.email, data.password, { name: data.name, role: invite.role });
    if (auth.error || !auth.user) {
      showAppToast(`Não foi possível ativar o convite no Supabase: ${auth.error?.message || "verifique o Auth do projeto."}`, "error");
      return;
    }
    authUserId = auth.user.id;
  }
  const user = {
    id: crypto.randomUUID(),
    authUserId,
    name: data.name,
    email: data.email,
    registration: nextLocalRegistration(),
    password: data.password,
    role: invite.role,
    permissions: invite.permissions,
    positionTitle: data.positionTitle || roleLabels[invite.role] || invite.role,
    department: data.department || "",
    ministryRole: data.ministryRole || "",
    roleDetails: data.roleDetails || "",
    status: "active",
    createdAt: new Date().toISOString()
  };
  invite.status = "accepted";
  invite.acceptedAt = new Date().toISOString();
  state.users.push(user);
  state.session = { userId: user.id, email: user.email, signedAt: new Date().toISOString() };
  ensurePrivilegedMemberProfile(user);
  saveMemberSession({ type: "admin", userId: user.id, signedAt: new Date().toISOString() });
  saveState();
  if (supabaseConfigured()) await saveSupabaseState();
  history.replaceState(null, "", location.pathname);
  renderAll();
  showAdmin();
});

document.querySelector("#loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = formData(event.currentTarget);
  const adminUserByLogin = await loadAdminUserByLogin(data.email, data.password);
  if (adminUserByLogin) {
    const index = state.users.findIndex((user) => user.id === adminUserByLogin.id);
    if (index >= 0) state.users[index] = { ...state.users[index], ...adminUserByLogin, password: adminUserByLogin.password || data.password };
    else state.users.unshift({ ...adminUserByLogin, password: adminUserByLogin.password || data.password });
    state.session = { userId: adminUserByLogin.id, email: adminUserByLogin.email, signedAt: new Date().toISOString() };
    ensurePrivilegedMemberProfile(currentUser() || adminUserByLogin);
    saveMemberSession({ type: "admin", userId: adminUserByLogin.id, signedAt: new Date().toISOString() });
    saveState();
    renderAll();
    showAdmin();
    return;
  }
  const memberUser = await loadMemberProfileByLogin(data.email, data.password);
  if (memberUser) {
    rememberMemberPassword(data.email, data.password);
    const list = memberUser.accessType === "public" ? state.publicMembers : state.members;
    const index = list.findIndex((member) => member.id === memberUser.id);
    if (index >= 0) list[index] = { ...list[index], ...memberUser };
    else list.unshift(memberUser);
    const session = { type: "member", memberId: memberUser.id, signedAt: new Date().toISOString() };
    saveMemberSession(session);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Local save failed:", error.message);
    }
    showMemberApp(session);
    return;
  }
  if (supabaseConfigured() && String(data.email || "").includes("@")) {
    const auth = await signInSupabase(data.email, data.password);
    if (auth.error || !auth.user) {
      showAppToast("E-mail ou senha inválidos no Supabase.", "error");
      return;
    }
    const remoteState = await loadSupabaseState();
    if (remoteState) state = remoteState;
    const supabaseUser = state.users.find((item) => item.authUserId === auth.user.id || String(item.email).toLowerCase() === String(auth.user.email).toLowerCase());
    if (!supabaseUser) {
      showAppToast("Login autenticado, mas este e-mail ainda não tem perfil administrativo ativo.", "warning");
      return;
    }
    if (supabaseUser.status === "blocked") {
      showAppToast("Este acesso está bloqueado pelo administrador master.", "error");
      return;
    }
    supabaseUser.password = supabaseUser.password || data.password;
    state.session = { userId: supabaseUser.id, email: supabaseUser.email, signedAt: new Date().toISOString() };
    ensurePrivilegedMemberProfile(supabaseUser);
    if (supabaseConfigured()) await saveSupabaseState();
    saveMemberSession({ type: "admin", userId: supabaseUser.id, signedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderAll();
    showAdmin();
    return;
  }
  const user = state.users.find((item) => {
    const login = String(data.email || "").trim().toLowerCase();
    return (String(item.email || "").trim().toLowerCase() === login || String(item.registration || "").trim().toLowerCase() === login) && item.password === data.password;
  });
  if (!user) {
    showAppToast("E-mail ou senha inválidos.", "error");
    return;
  }
  if (user.status === "blocked") {
    showAppToast("Este acesso está bloqueado pelo administrador master.", "error");
    return;
  }
  state.session = { userId: user.id, email: user.email, signedAt: new Date().toISOString() };
  ensurePrivilegedMemberProfile(user);
  saveMemberSession({ type: "admin", userId: user.id, signedAt: new Date().toISOString() });
  saveState();
  renderAll();
  showAdmin();
});

document.querySelector("#settingsForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasPermission("settings")) return;
  mergeSettings(formData(event.currentTarget));
  setText("#saveStatus", "Configurações salvas.");
  showAppToast("Configurações salvas.");
  window.setTimeout(() => setText("#saveStatus", ""), 2200);
});

document.querySelector("#inviteForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasPermission("access")) return;
  const data = formData(event.currentTarget);
  const permissions = isMasterRole(data.role) ? roleTemplates.master : checkedPermissions(event.currentTarget);
  const invite = {
    id: crypto.randomUUID(),
    token: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    role: data.role,
    permissions,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  state.invites.unshift(invite);
  saveState();
  event.currentTarget.reset();
  renderAll();
  copyText(inviteLink(invite.token));
  showAppToast("Convite criado e link copiado.");
});

document.querySelector("#roleTemplate")?.addEventListener("change", (event) => {
  renderPermissions("#invitePermissions", roleTemplates[event.target.value] || []);
  if (window.lucide) window.lucide.createIcons();
});

document.querySelector("#inviteDepartmentSelect")?.addEventListener("change", () => {
  renderMemberFunctionOptions("", "#inviteAcceptForm", "#inviteFunctionSelect");
});

document.querySelector("#publicMemberForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = formData(event.currentTarget);
  const photo = await readImageFile(event.currentTarget.elements.photoFile?.files?.[0]);
  if (photo) data.photo = photo;
  delete data.photoFile;
  const createdAt = new Date().toISOString();
  const member = { id: crypto.randomUUID(), ...data, registration: nextLocalRegistration(), entryDate: data.entryDate || createdAt.slice(0, 10), createdAt, accessType: "public" };
  rememberMemberPassword(member.email, member.password);
  state.publicMembers.unshift(member);
  saveMemberSession({ type: "public", memberId: member.id, signedAt: createdAt });
  saveState();
  event.currentTarget.reset();
  setText("#publicFormStatus", "Cadastro recebido. Abrindo seu app...");
  showMemberApp({ type: "public", memberId: member.id, signedAt: createdAt });
  const saveResult = await savePublicMemberProfile(member);
  renderMobileApp();
  showMemberNotice("Cadastro conclu\u00eddo com sucesso. Bem-vindo ao app.");
  setText(
    "#publicFormStatus",
    saveResult.supabase === false
      ? `Supabase não salvou: ${saveResult.error?.message || "erro sem detalhe retornado"}`
      : "Cadastro enviado. A igreja recebeu suas informa\u00e7\u00f5es."
  );
});

document.querySelector("#prayerRequestForm")?.addEventListener("change", (event) => {
  if (event.target.name === "requestTarget") syncPrayerTargetFields();
});

document.querySelector("#logoInput")?.addEventListener("change", (event) => {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => mergeSettings({ logo: reader.result }));
  reader.readAsDataURL(file);
});

document.querySelector("#removeLogoButton")?.addEventListener("click", () => {
  mergeSettings({ logo: "" });
  const input = document.querySelector("#logoInput");
  if (input) input.value = "";
});

document.querySelectorAll("[data-palette]").forEach((button) => {
  button.addEventListener("click", () => {
    const [primaryColor, brandColor, accentColor, backgroundColor] = button.dataset.palette.split(",");
    mergeSettings({ primaryColor, brandColor, accentColor, backgroundColor });
  });
});

document.querySelector("#memberForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canManage("members")) return;
  const data = formData(event.currentTarget);
  const photo = await readImageFile(event.currentTarget.elements.photoFile?.files?.[0]);
  if (photo) data.photo = photo;
  delete data.photoFile;
  let existingIndex = state.members.findIndex((member) => member.id && member.id === data.id);
  if (existingIndex < 0 && data.id) existingIndex = state.members.findIndex((member) => member.id === data.id);
  if (existingIndex < 0 && !data.id) {
    existingIndex = state.members.findIndex((member) => {
      const sameRegistration = data.registration && member.registration && member.registration === data.registration;
      const sameEmail = data.email && member.email && member.email.toLowerCase() === data.email.toLowerCase();
      const samePhoneAndName = data.phone && member.phone && member.phone === data.phone && String(member.name || "").toLowerCase() === String(data.name || "").toLowerCase();
      return sameRegistration || sameEmail || samePhoneAndName;
    });
  }
  const existingId = existingIndex >= 0 ? state.members[existingIndex].id : "";
  if (!data.registration) data.registration = existingIndex >= 0 ? state.members[existingIndex].registration : nextLocalRegistration();
  const member = { ...data, id: data.id || existingId || crypto.randomUUID(), updatedAt: new Date().toISOString() };
  if (existingIndex >= 0) state.members[existingIndex] = member;
  else state.members.unshift({ ...member, createdAt: new Date().toISOString() });
  if (event.currentTarget.dataset.memberSource === "public") {
    const publicIndex = Number(event.currentTarget.dataset.memberIndex);
    if (Number.isInteger(publicIndex) && state.publicMembers[publicIndex]) state.publicMembers.splice(publicIndex, 1);
  }
  saveState();
  event.currentTarget.reset();
  event.currentTarget.dataset.memberSource = "";
  event.currentTarget.dataset.memberIndex = "";
  setValue("#memberId", "");
  closeMemberModal();
  renderAll();
});

document.querySelector("#churchForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage("churches")) return;
  const data = formData(event.currentTarget);
  const existingIndex = state.churches.findIndex((church) => church.id === data.id);
  const church = {
    ...data,
    id: data.id || crypto.randomUUID(),
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) state.churches[existingIndex] = church;
  else state.churches.unshift({ ...church, createdAt: new Date().toISOString() });

  saveState();
  event.currentTarget.reset();
  setValue("#churchId", "");
  closeChurchModal();
  renderAll();
});

document.querySelector("#eventForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage("events")) return;
  const data = formData(event.currentTarget);
  const churchLocation = data.locationChurchId && data.locationChurchId !== "custom" ? selectedChurchName(data.locationChurchId) : "";
  const ownerFromList = data.ownerId && data.ownerId !== "manual" ? selectedEventOwnerName(data.ownerId) : "";
  const existingIndex = state.events.findIndex((item) => item.id === data.id);
  const item = {
    ...data,
    id: data.id || crypto.randomUUID(),
    capacity: data.capacity ? Number(data.capacity) : "",
    durationValue: data.durationValue ? Number(data.durationValue) : "",
    location: data.locationChurchId === "custom" ? data.location : churchLocation,
    owner: data.ownerId === "manual" ? data.owner : ownerFromList,
    updatedAt: new Date().toISOString()
  };
  if (existingIndex >= 0) state.events[existingIndex] = item;
  else state.events.unshift({ ...item, createdAt: new Date().toISOString() });
  saveState();
  event.currentTarget.reset();
  setValue("#eventId", "");
  closeEventModal();
  renderAll();
});

document.querySelector("#prayerRequestForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasPermission("pastoral")) return;
  const data = formData(event.currentTarget);
  const user = currentUser();
  state.pastoralRequests.unshift({
    id: crypto.randomUUID(),
    requesterUserId: user?.id || "",
    requestTarget: data.requestTarget || "self",
    requesterName: data.requesterName || user?.name || "Membro",
    requesterEmail: user?.email || "",
    type: data.type || "Oração",
    urgency: data.urgency || "Normal",
    message: data.message,
    confidential: data.confidential === "on",
    status: "open",
    createdAt: new Date().toISOString()
  });
  saveState();
  event.currentTarget.reset();
  closePrayerModal();
  setText("#pastoralActionStatus", "Pedido enviado para a equipe pastoral autorizada.");
  setText("#prayerRequestStatus", "Pedido enviado para a equipe pastoral autorizada.");
  window.setTimeout(() => setText("#pastoralActionStatus", ""), 2600);
  window.setTimeout(() => setText("#prayerRequestStatus", ""), 2600);
  renderAll();
});

document.querySelector("#closePrayerFormButton")?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closePrayerModal();
});

document.querySelector("#openChurchFormButton")?.addEventListener("click", (event) => {
  window.openChurchFormFromButton(event);
});

document.querySelector("#closeChurchFormButton")?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  closeChurchModal();
});

document.querySelector("#messageForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!hasPermission("messages")) return;
  const data = formData(event.currentTarget);
  state.messages.unshift({ id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() });
  saveState();
  event.currentTarget.reset();
  renderAll();
});

document.querySelector("#appSiteForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage("mobile")) return;
  mergeSettings(formData(event.currentTarget));
  renderAll();
});

document.querySelector("#clearAppSiteButton")?.addEventListener("click", () => {
  if (!canManage("mobile")) return;
  mergeSettings({
    mobileHeroTitle: "Bem-vindo",
    mobileHeroSubtitle: "",
    mobileVerse: "",
    mobileBanner: "",
    mobileContent: "",
    bibleLink: "",
    pixKey: "",
    publicContact: ""
  });
  renderAll();
});

document.querySelector("#financeForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage("finance")) return;
  renderFinanceCategoryOptions();
  syncFinancePersonFields();
  const data = formData(event.currentTarget);
  data.category = document.querySelector("#financeCategorySelect")?.value || data.category;
  if (data.type === "income") {
    data.supplierName = "";
    data.recipientName = "";
    data.invoiceCode = "";
    if (!data.counterpartyName) data.counterpartyName = data.counterpartyKey === "anonymous" ? "Anônimo" : "";
  } else {
    data.counterpartyKey = "";
    data.counterpartyName = "";
    data.counterpartyRegistration = "";
  }
  state.financialEntries.unshift({
    ...data,
    id: crypto.randomUUID(),
    amount: Number(data.amount || 0),
    createdAt: new Date().toISOString()
  });
  financePage = 1;
  saveState();
  event.currentTarget.reset();
  closeFinanceModal();
  renderAll();
});

document.querySelector("#financeForm")?.addEventListener("change", (event) => {
  if (event.target.name === "type") renderFinanceCategoryOptions();
  if (event.target.name === "counterpartyKey") syncFinancePersonFields();
});

document.querySelector("#financeFilterForm")?.addEventListener("input", () => {
  financePage = 1;
  renderFinance();
  if (window.lucide) window.lucide.createIcons();
});

document.querySelector("#clearFinanceFilterButton")?.addEventListener("click", () => {
  setValue("#financeStartDate", "");
  setValue("#financeEndDate", "");
  financePage = 1;
  renderFinance();
});

document.querySelector("#financeReportFilterForm")?.addEventListener("input", () => {
  renderFinanceReportsView();
  if (window.lucide) window.lucide.createIcons();
});

document.querySelector("#eventSearchInput")?.addEventListener("input", () => {
  renderEvents();
  if (window.lucide) window.lucide.createIcons();
});

document.querySelector("#eventForm")?.addEventListener("input", (event) => {
  if (event.target.name === "department") {
    renderEventOwnerOptions();
    syncEventOwnerFields();
  }
});

document.querySelector("#memberForm")?.addEventListener("change", (event) => {
  if (event.target.name === "department") renderMemberFunctionOptions();
});

document.addEventListener("submit", async (event) => {
  if (event.target.id !== "memberProfileForm") return;
  event.preventDefault();
  const session = memberSession();
  const current = currentMember();
  const memberId = session?.memberId || current?.id;
  if (!memberId) {
    setText("#memberProfileStatus", "Não foi possível identificar este cadastro.");
    return;
  }
  const submitButton = event.target.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = true;
  setText("#memberProfileStatus", "Salvando cadastro...");
  const data = formData(event.target);
  const photo = await readImageFile(event.target.elements.photoFile?.files?.[0]);
  delete data.photoFile;
  const updateAllowedFields = (member) => {
    if (!member) return;
    member.name = data.name || member.name;
    member.email = data.email || "";
    member.phone = data.phone || "";
    member.birthDate = data.birthDate || "";
    member.churchId = data.churchId || "";
    member.password = member.password || rememberedMemberPassword(member.email);
    if (photo) member.photo = photo;
    member.updatedAt = new Date().toISOString();
    return member;
  };
  const updatedAdminMember = updateAllowedFields(state.members.find((member) => member.id === memberId));
  const updatedPublicMember = updateAllowedFields(state.publicMembers.find((member) => member.id === memberId));
  const updatedMember = updatedAdminMember || updatedPublicMember;
  if (!updatedMember) {
    setText("#memberProfileStatus", "Cadastro não encontrado para salvar.");
    if (submitButton) submitButton.disabled = false;
    return;
  }
  const saveResult = await savePublicMemberProfile(updatedMember);
  saveState();
  if (submitButton) submitButton.disabled = false;
  renderMobileApp();
  if (saveResult.supabase === false) {
    memberAppView = "profile";
    renderMemberLiveView();
    showMemberNotice(`Supabase não salvou: ${saveResult.error?.message || "erro sem detalhe retornado"}`, "warning");
  } else {
    memberAppView = "card";
    renderMemberLiveView();
    showMemberNotice(`Cadastro salvo${saveResult.supabase ? " no Supabase" : ""}${updatedMember.photo ? " com foto." : "."}`);
  }
});

document.querySelector("#eventForm")?.addEventListener("change", (event) => {
  if (event.target.name === "department") {
    renderEventOwnerOptions();
    syncEventOwnerFields();
  }
  if (event.target.name === "locationChurchId") syncEventLocationFields();
  if (event.target.name === "ownerId") syncEventOwnerFields();
});

document.addEventListener("click", (event) => {
  const eventFilterButton = event.target.closest("[data-event-filter]");
  if (eventFilterButton) {
    eventFilter = eventFilterButton.dataset.eventFilter || "all";
    renderEvents();
    if (window.lucide) window.lucide.createIcons();
  }
});

document.querySelector("#clearReportFilterButton")?.addEventListener("click", () => {
  setValue("#reportStartDate", "");
  setValue("#reportEndDate", "");
  setValue("#reportPartySearch", "");
  renderFinanceReportsView();
  if (window.lucide) window.lucide.createIcons();
});

document.addEventListener("click", (event) => {
  const evolutionButton = event.target.closest("[data-finance-evolution]");
  if (evolutionButton) {
    financeEvolutionMode = evolutionButton.dataset.financeEvolution || "month";
    renderFinance();
  }

  const financePageButton = event.target.closest("[data-finance-page]");
  if (financePageButton) {
    const nextPage = Number(financePageButton.dataset.financePage);
    if (Number.isFinite(nextPage) && nextPage > 0) {
      financePage = nextPage;
      renderFinance();
    }
  }

  const usersPageButton = event.target.closest("[data-users-page]");
  if (usersPageButton) {
    const nextPage = Number(usersPageButton.dataset.usersPage);
    if (Number.isFinite(nextPage) && nextPage > 0) {
      usersPage = nextPage;
      renderUsers();
    }
  }

  const membersPageButton = event.target.closest("[data-members-page]");
  if (membersPageButton) {
    const nextPage = Number(membersPageButton.dataset.membersPage);
    if (Number.isFinite(nextPage) && nextPage > 0) {
      membersPage = nextPage;
      renderMembers();
    }
  }

  const financeReportButton = event.target.closest("[data-finance-report]");
  if (financeReportButton) {
    financeReportMode = financeReportButton.dataset.financeReport || "dre";
    renderFinanceReportsView();
    if (window.lucide) window.lucide.createIcons();
  }

  const exportReportButton = event.target.closest("[data-export-report]");
  if (exportReportButton) {
    exportFinanceReport(exportReportButton.dataset.exportReport);
  }
});

document.addEventListener("click", (event) => {
  const viewJump = event.target.closest("[data-view-jump]");
  if (viewJump) activateView(viewJump.dataset.viewJump);

  const memberAppButton = event.target.closest("[data-member-app-view]");
  if (memberAppButton && document.body.classList.contains("is-member-app")) {
    memberAppView = memberAppButton.dataset.memberAppView || "home";
    renderMemberLiveView();
    document.querySelector(".member-live-content-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (event.target.closest("#openMemberFormButton") && canManage("members")) {
    const form = document.querySelector("#memberForm");
    form?.reset();
    if (form) {
      form.dataset.memberSource = "";
      form.dataset.memberIndex = "";
    }
    setValue("#memberId", "");
    openMemberModal("Cadastrar membro");
  }

  if (event.target.closest("#openPrayerFormButton")) {
    const form = document.querySelector("#prayerRequestForm");
    form?.reset();
    if (form?.elements.requestTarget) form.elements.requestTarget.value = "self";
    openPrayerModal();
  }

  if (event.target.closest("#openChurchFormButton")) {
    window.openChurchFormFromButton(event);
  }

  if (event.target.closest("#openEventFormButton") && canManage("events")) {
    document.querySelector("#eventForm")?.reset();
    setValue("#eventId", "");
    openEventModal("Cadastrar evento");
  }

  if (event.target.closest("#openFinanceFormButton") && canManage("finance")) {
    document.querySelector("#financeForm")?.reset();
    openFinanceModal();
  }

  if (event.target.closest("#openFinanceReportsButton") && canManage("finance")) {
    openFinanceReportsModal();
    if (window.lucide) window.lucide.createIcons();
  }

  if (event.target.closest("#closeFinanceFormButton")) closeFinanceModal();

  if (event.target.id === "financeModal") closeFinanceModal();

  if (event.target.closest("#closeFinanceReportsButton")) closeFinanceReportsModal();

  if (event.target.id === "financeReportsModal") closeFinanceReportsModal();

  if (event.target.closest("#closeChurchFormButton")) closeChurchModal();

  if (event.target.id === "churchModal") closeChurchModal();

  if (event.target.closest("#closeEventFormButton")) closeEventModal();

  if (event.target.id === "eventModal") closeEventModal();

  if (event.target.closest("#closeEventDetailButton")) closeEventDetail();

  if (event.target.id === "eventDetailModal") closeEventDetail();

  if (event.target.closest("#closePrayerFormButton")) closePrayerModal();

  if (event.target.id === "prayerModal") closePrayerModal();

  if (event.target.closest("#closeMemberFormButton")) closeMemberModal();

  if (event.target.id === "memberModal") closeMemberModal();

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) copyText(copyButton.dataset.copy);

  if (event.target.closest("#copyPublicLinkButton")) copyText(publicJoinLink());
  if (event.target.closest("#openPublicLinkButton")) location.href = publicJoinLink();
  if (event.target.closest("#openMemberAppButton")) showMemberApp({ type: "admin", userId: currentUser()?.id, signedAt: new Date().toISOString() });
  if (event.target.closest("#memberAdminButton") && currentUser()) showAdmin();
  if (event.target.closest("#memberLogoutButton")) signOutEverywhere();
  if (event.target.closest("#memberBibleButton, #memberBibleNavButton") && state.settings.bibleLink) window.open(state.settings.bibleLink, "_blank", "noopener");
  if (event.target.closest("#printMemberCardButton")) window.print();

  const detailEvent = event.target.closest("[data-detail-event]");
  if (detailEvent && !event.target.closest("button")) {
    openEventDetail(detailEvent.dataset.detailEvent);
  }

  const toggleUser = event.target.closest("[data-toggle-user]");
  if (toggleUser && isMaster()) {
    const user = state.users.find((item) => item.id === toggleUser.dataset.toggleUser);
    if (user && !isMaster(user)) user.status = user.status === "blocked" ? "active" : "blocked";
    saveState();
    renderAll();
  }

  const promoteUser = event.target.closest("[data-promote-user]");
  if (promoteUser && isMaster()) {
    const user = state.users.find((item) => item.id === promoteUser.dataset.promoteUser);
    if (user && confirm(`Dar acesso master para ${user.name}?`)) {
      user.role = "master";
      user.permissions = roleTemplates.master;
      saveState();
      renderAll();
    }
  }

  const removeMember = event.target.closest("[data-remove-member]");
  if (removeMember && canManage("members")) {
    const { source, index, member } = findMemberByKey(removeMember.dataset.removeMember);
    if (source === "public") state.publicMembers.splice(index, 1);
    else state.members.splice(index, 1);
    deleteSupabaseRow("members", member?.id);
    saveState();
    renderAll();
  }

  const detailMember = event.target.closest("[data-detail-member]");
  if (detailMember && canManage("members")) {
    const detailKey = detailMember.dataset.detailMember;
    const { member } = findMemberByKey(detailKey);
    const panel = document.querySelector("#memberDetailPanel");
    const content = document.querySelector("#memberDetailContent");
    if (panel && !panel.hidden && panel.dataset.memberKey === detailKey) {
      panel.hidden = true;
      panel.dataset.memberKey = "";
      return;
    }
    if (member && panel && content) {
      const churchName = selectedChurchName(member.churchId) || "Não informado";
      const leaderLabel = member.isLeader === true || member.isLeader === "on" ? "Sim" : "Não";
      content.innerHTML = `
        <div class="detail-grid">
          <div><span>Nome</span><strong>${escapeHtml(member.name || "-")}</strong></div>
          <div><span>Sexo</span><strong>${escapeHtml(member.gender || "Não informado")}</strong></div>
          <div><span>Data de nascimento</span><strong>${escapeHtml(formatDate(member.birthDate) || "-")}</strong></div>
          <div><span>Idade</span><strong>${escapeHtml(ageFromBirthDate(member.birthDate))}</strong></div>
          <div><span>E-mail</span><strong>${escapeHtml(member.email || "-")}</strong></div>
          <div><span>Celular</span><strong>${escapeHtml(member.phone || "-")}</strong></div>
          <div><span>Matrícula</span><strong>${escapeHtml(member.registration || "-")}</strong></div>
          <div><span>Igreja</span><strong>${escapeHtml(churchName)}</strong></div>
          <div><span>Departamento</span><strong>${escapeHtml(member.department || "Sem departamento")}</strong></div>
          <div><span>Função</span><strong>${escapeHtml(member.ministryRole || "-")}</strong></div>
          <div><span>Liderança / responsável</span><strong>${escapeHtml(leaderLabel)}</strong></div>
          <div><span>Arrolamento</span><strong>${escapeHtml(member.status || "-")}</strong></div>
          <div><span>Entrada</span><strong>${escapeHtml(formatDate(member.entryDate) || "-")}</strong></div>
          <div><span>Origem</span><strong>${escapeHtml(member.source || "-")}</strong></div>
          <div class="detail-full"><span>Observações</span><strong>${escapeHtml(member.notes || "-")}</strong></div>
        </div>
      `;
      panel.hidden = false;
      panel.dataset.memberKey = detailKey;
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const editMember = event.target.closest("[data-edit-member]");
  if (editMember && canManage("members")) {
    const { member, source, index } = findMemberByKey(editMember.dataset.editMember);
    const form = document.querySelector("#memberForm");
    if (member && form) {
      if (!member.id && Number.isInteger(index) && state.members[index]) {
        member.id = crypto.randomUUID();
        state.members[index].id = member.id;
        saveState();
      }
      if (!member.id && source === "public" && Number.isInteger(index) && state.publicMembers[index]) {
        member.id = crypto.randomUUID();
        state.publicMembers[index].id = member.id;
        saveState();
      }
      form.dataset.memberSource = source;
      form.dataset.memberIndex = String(index ?? "");
      renderMemberChurchOptions();
      renderDepartmentOptions("#memberDepartmentSelect", member.department || "");
      Object.entries(member).forEach(([key, value]) => {
        const field = form.elements[key];
        if (!field) return;
        if (field.type === "checkbox") field.checked = value === true || value === "on";
        else field.value = value ?? "";
      });
      renderMemberFunctionOptions(member.ministryRole || "");
      openMemberModal(source === "public" ? "Revisar cadastro recebido" : "Editar membro");
    } else if (false) {
      showAppToast("Cadastros vindos do link público podem ser removidos ou consultados. Para editar, recrie como cadastro interno.", "warning");
    }
  }

  const memberFilterButton = event.target.closest("[data-member-filter]");
  if (memberFilterButton) {
    memberFilter = memberFilterButton.dataset.memberFilter;
    membersPage = 1;
    renderMembers();
    if (window.lucide) window.lucide.createIcons();
  }

  const editChurch = event.target.closest("[data-edit-church]");
  if (editChurch && canManage("churches")) {
    const church = state.churches.find((item) => item.id === editChurch.dataset.editChurch);
    const form = document.querySelector("#churchForm");
    if (church && form) {
      Object.entries(church).forEach(([key, value]) => {
        const field = form.elements[key];
        if (field) field.value = value;
      });
      openChurchModal("Editar igreja");
    }
  }

  const removeChurch = event.target.closest("[data-remove-church]");
  if (removeChurch && canManage("churches")) {
    state.churches = state.churches.filter((church) => church.id !== removeChurch.dataset.removeChurch);
    deleteSupabaseRow("church_units", removeChurch.dataset.removeChurch);
    saveState();
    renderAll();
  }

  const resolvePrayer = event.target.closest("[data-resolve-prayer]");
  if (resolvePrayer && canManage("pastoral")) {
    const request = state.pastoralRequests.find((item) => item.id === resolvePrayer.dataset.resolvePrayer);
    if (request) request.status = "resolved";
    saveState();
    renderAll();
  }

  const reopenPrayer = event.target.closest("[data-reopen-prayer]");
  if (reopenPrayer && canManage("pastoral")) {
    const request = state.pastoralRequests.find((item) => item.id === reopenPrayer.dataset.reopenPrayer);
    if (request) request.status = "open";
    saveState();
    renderAll();
  }

  const removePrayer = event.target.closest("[data-remove-prayer]");
  if (removePrayer && canManage("pastoral")) {
    state.pastoralRequests = state.pastoralRequests.filter((request) => request.id !== removePrayer.dataset.removePrayer);
    deleteSupabaseRow("pastoral_requests", removePrayer.dataset.removePrayer);
    saveState();
    renderAll();
  }

  const removeMessage = event.target.closest("[data-remove-message]");
  if (removeMessage && hasPermission("messages")) {
    const [removed] = state.messages.splice(Number(removeMessage.dataset.removeMessage), 1);
    deleteSupabaseRow("messages", removed?.id);
    saveState();
    renderAll();
  }

  const editEvent = event.target.closest("[data-edit-event]");
  if (editEvent && canManage("events")) {
    const item = state.events.find((eventItem) => eventItem.id === editEvent.dataset.editEvent);
    const form = document.querySelector("#eventForm");
    if (item && form) {
      closeEventDetail();
      renderDepartmentOptions("#eventDepartmentSelect", item.department || "");
      renderEventLocationOptions();
      renderEventOwnerOptions();
      Object.entries(item).forEach(([key, value]) => {
        if (form.elements[key]) form.elements[key].value = value ?? "";
      });
      renderEventOwnerOptions();
      if (item.locationChurchId) form.elements.locationChurchId.value = item.locationChurchId;
      if (item.ownerId) form.elements.ownerId.value = item.ownerId;
      syncEventLocationFields();
      syncEventOwnerFields();
      openEventModal("Editar evento");
    }
  }

  const removeEvent = event.target.closest("[data-remove-event]");
  if (removeEvent && canManage("events")) {
    state.events = state.events.filter((eventItem) => eventItem.id !== removeEvent.dataset.removeEvent);
    deleteSupabaseRow("events", removeEvent.dataset.removeEvent);
    closeEventDetail();
    saveState();
    renderAll();
  }

  const removeFinance = event.target.closest("[data-remove-finance]");
  if (removeFinance && canManage("finance")) {
    state.financialEntries = state.financialEntries.filter((entry) => entry.id !== removeFinance.dataset.removeFinance);
    deleteSupabaseRow("financial_entries", removeFinance.dataset.removeFinance);
    financePage = 1;
    saveState();
    renderAll();
  }

  const clearButton = event.target.closest("[data-clear-form]");
  if (clearButton) {
    document.querySelector(`#${clearButton.dataset.clearForm}`)?.reset();
    if (clearButton.dataset.clearForm === "churchForm") setValue("#churchId", "");
    if (clearButton.dataset.clearForm === "memberForm") {
      setValue("#memberId", "");
      renderMemberChurchOptions();
      renderDepartmentOptions("#memberDepartmentSelect");
      renderMemberFunctionOptions();
    }
    if (clearButton.dataset.clearForm === "eventForm") {
      setValue("#eventId", "");
      renderDepartmentOptions("#eventDepartmentSelect");
      renderEventLocationOptions();
      renderEventOwnerOptions();
      syncEventLocationFields();
      syncEventOwnerFields();
    }
    if (clearButton.dataset.clearForm === "financeForm") renderFinanceCategoryOptions();
  }
});

document.addEventListener("keydown", (event) => {
  const agendaItem = event.target.closest?.("[data-detail-event]");
  if (!agendaItem || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  openEventDetail(agendaItem.dataset.detailEvent);
});

navButtons.forEach((button) => button.addEventListener("click", () => activateView(button.dataset.view)));

menuToggle?.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 860px)").matches) {
    document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(document.body.classList.contains("menu-open")));
    return;
  }
  uiState.sidebarCollapsed = !uiState.sidebarCollapsed;
  saveUiState();
  applySidebarState();
});

document.querySelector("#sidebarCloseButton")?.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (event) => {
  if (!document.body.classList.contains("menu-open")) return;
  if (!window.matchMedia("(max-width: 860px)").matches) return;
  if (event.target.closest?.(".sidebar, #menuToggle")) return;
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

document.querySelector("#fullscreenButton")?.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});

document.querySelector("#logoutButton")?.addEventListener("click", async () => {
  await signOutEverywhere();
});

document.querySelector("#resetDemoButton")?.addEventListener("click", () => {
  if (!confirm("Apagar conta, configurações e dados salvos neste navegador?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  renderAll();
  showAuth();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.classList.remove("menu-open");
    closeMemberModal();
    closePrayerModal();
    closeChurchModal();
    closeEventModal();
    closeFinanceModal();
    closeFinanceReportsModal();
  }
});

document.querySelectorAll(".mobile-controls button, .tabs-card > button").forEach((button) => {
  button.addEventListener("click", () => {
    [...button.parentElement.children].forEach((item) => item.classList?.remove("is-selected"));
    button.classList.add("is-selected");
  });
});

window.addEventListener("load", async () => {
  await syncState();
  renderAll();
  applySidebarState();
  const params = new URLSearchParams(location.search);
  if (isPublicJoin(params)) {
    if (memberSession()) {
      showMemberApp();
      return;
    }
    showPublicForm();
    return;
  }
  if (params.get("invite")) {
    showAuth(params.get("invite"));
    return;
  }
  if (state.session && currentUser()?.status === "active") showAdmin();
  else if (memberSession()) showMemberApp();
  else showAuth();
});



