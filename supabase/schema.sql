-- Ministerio Filadelfia - Supabase schema
-- Cole este arquivo no SQL Editor do Supabase e execute uma vez.

begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Assembleia de Deus Ministerio Filadelfia',
  subtitle text,
  short_name text,
  contact_email citext,
  contact_phone text,
  publish_app boolean not null default true,
  mobile_hero_title text default 'Bem-vindo',
  mobile_hero_subtitle text,
  mobile_verse text,
  mobile_banner text,
  mobile_content text,
  bible_link text,
  pix_key text,
  public_contact text,
  primary_color text default '#095c85',
  brand_color text default '#07354b',
  accent_color text default '#5c8fc9',
  background_color text default '#f3f3fb',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  name text not null,
  email citext not null,
  registration text,
  password text,
  role text not null default 'custom',
  permissions text[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'blocked', 'pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, email)
);

create table if not exists public.admin_invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  token uuid not null unique default gen_random_uuid(),
  invited_name text not null,
  invited_email citext not null,
  role text not null default 'custom',
  permissions text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'cancelled', 'expired')),
  created_by uuid references public.app_users(id) on delete set null,
  accepted_by uuid references public.app_users(id) on delete set null,
  accepted_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.church_units (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  pastor text,
  phone text,
  address text,
  city text,
  state text,
  status text not null default 'Ativa',
  service_time text,
  lat numeric(10, 7),
  lng numeric(10, 7),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table if not exists public.ministries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  department_id uuid references public.departments(id) on delete set null,
  name text not null,
  leader_member_id uuid,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ministry_activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  department text not null,
  type text not null default 'Reunião',
  title text not null,
  activity_date date,
  activity_time time,
  location_church_unit_id uuid references public.church_units(id) on delete set null,
  location text,
  audience text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ministry_tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  department text not null,
  title text not null,
  owner text,
  due_date date,
  priority text not null default 'Normal',
  notes text,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  auth_user_id uuid unique references auth.users(id) on delete set null,
  church_unit_id uuid references public.church_units(id) on delete set null,
  name text not null,
  gender text,
  birth_date date,
  email citext,
  phone text,
  photo text,
  password text,
  registration text,
  department text,
  ministry_role text,
  entry_date date,
  status text not null default 'Visitante',
  is_leader boolean not null default false,
  notes text,
  source text not null default 'admin' check (source in ('admin', 'public_link', 'import')),
  app_access_status text not null default 'active' check (app_access_status in ('active', 'blocked', 'pending')),
  created_by uuid references public.app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, registration)
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'ministries_leader_member_fk'
      and conrelid = 'public.ministries'::regclass
  ) then
    alter table public.ministries
      add constraint ministries_leader_member_fk
      foreign key (leader_member_id) references public.members(id) on delete set null;
  end if;
end;
$$;

create table if not exists public.member_private_details (
  member_id uuid primary key references public.members(id) on delete cascade,
  document_number text,
  address text,
  marital_status text,
  emergency_contact text,
  extra jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.small_groups (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  leader_member_id uuid references public.members(id) on delete set null,
  church_unit_id uuid references public.church_units(id) on delete set null,
  meeting_day text,
  meeting_time time,
  address text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.small_group_members (
  id uuid primary key default gen_random_uuid(),
  small_group_id uuid not null references public.small_groups(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  role text default 'Participante',
  joined_at date default current_date,
  unique (small_group_id, member_id)
);

create table if not exists public.small_group_meetings (
  id uuid primary key default gen_random_uuid(),
  small_group_id uuid not null references public.small_groups(id) on delete cascade,
  meeting_date date not null,
  theme text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.small_group_attendance (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.small_group_meetings(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  visitor_name text,
  present boolean not null default true,
  unique (meeting_id, member_id)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  type text,
  status text not null default 'Ativo',
  department text,
  start_date date,
  start_time time,
  duration_value integer,
  duration_unit text,
  location_church_unit_id uuid references public.church_units(id) on delete set null,
  location text,
  audience text,
  capacity integer,
  registration_status text not null default 'closed',
  owner_member_id uuid references public.members(id) on delete set null,
  owner text,
  contact text,
  description text,
  created_by uuid references public.app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  name text,
  email citext,
  phone text,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

create table if not exists public.pastoral_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  requester_user_id uuid references public.app_users(id) on delete set null,
  requester_member_id uuid references public.members(id) on delete set null,
  request_target text not null default 'self',
  requester_name text not null,
  requester_email citext,
  type text not null default 'Oracao',
  urgency text not null default 'Normal',
  message text not null,
  confidential boolean not null default false,
  status text not null default 'open' check (status in ('open', 'resolved', 'archived')),
  resolved_by uuid references public.app_users(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.finance_categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  code text,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (organization_id, code, type)
);

create table if not exists public.financial_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  date date not null,
  amount numeric(14, 2) not null check (amount >= 0),
  category_id uuid references public.finance_categories(id) on delete set null,
  category text,
  counterparty_member_id uuid references public.members(id) on delete set null,
  counterparty_key text,
  counterparty_name text,
  counterparty_registration text,
  supplier_name text,
  recipient_name text,
  invoice_code text,
  document_code text,
  description text,
  notes text,
  created_by uuid references public.app_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  audience text not null default 'Toda igreja',
  message text,
  published boolean not null default true,
  created_by uuid references public.app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.library_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  type text default 'material',
  audience text default 'Toda igreja',
  url text,
  description text,
  published boolean not null default true,
  created_by uuid references public.app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kids_children (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  member_id uuid references public.members(id) on delete set null,
  name text not null,
  birth_date date,
  responsible_name text,
  responsible_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kids_checkins (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.kids_children(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  checked_in_by uuid references public.app_users(id) on delete set null,
  checked_out_by uuid references public.app_users(id) on delete set null,
  checkin_at timestamptz not null default now(),
  checkout_at timestamptz,
  notes text
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_user_id uuid references public.app_users(id) on delete set null,
  action text not null,
  table_name text,
  record_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_organizations_updated_at on public.organizations;
create trigger touch_organizations_updated_at before update on public.organizations
for each row execute function public.touch_updated_at();

drop trigger if exists touch_app_users_updated_at on public.app_users;
create trigger touch_app_users_updated_at before update on public.app_users
for each row execute function public.touch_updated_at();

drop trigger if exists touch_church_units_updated_at on public.church_units;
create trigger touch_church_units_updated_at before update on public.church_units
for each row execute function public.touch_updated_at();

drop trigger if exists touch_members_updated_at on public.members;
create trigger touch_members_updated_at before update on public.members
for each row execute function public.touch_updated_at();

drop trigger if exists touch_ministries_updated_at on public.ministries;
create trigger touch_ministries_updated_at before update on public.ministries
for each row execute function public.touch_updated_at();

drop trigger if exists touch_ministry_activities_updated_at on public.ministry_activities;
create trigger touch_ministry_activities_updated_at before update on public.ministry_activities
for each row execute function public.touch_updated_at();

drop trigger if exists touch_ministry_tasks_updated_at on public.ministry_tasks;
create trigger touch_ministry_tasks_updated_at before update on public.ministry_tasks
for each row execute function public.touch_updated_at();

drop trigger if exists touch_small_groups_updated_at on public.small_groups;
create trigger touch_small_groups_updated_at before update on public.small_groups
for each row execute function public.touch_updated_at();

drop trigger if exists touch_events_updated_at on public.events;
create trigger touch_events_updated_at before update on public.events
for each row execute function public.touch_updated_at();

drop trigger if exists touch_messages_updated_at on public.messages;
create trigger touch_messages_updated_at before update on public.messages
for each row execute function public.touch_updated_at();

drop trigger if exists touch_library_items_updated_at on public.library_items;
create trigger touch_library_items_updated_at before update on public.library_items
for each row execute function public.touch_updated_at();

drop trigger if exists touch_kids_children_updated_at on public.kids_children;
create trigger touch_kids_children_updated_at before update on public.kids_children
for each row execute function public.touch_updated_at();

create or replace function public.current_app_user()
returns public.app_users
language sql
stable
security definer
set search_path = public
as $$
  select *
  from public.app_users
  where auth_user_id = auth.uid()
    and status = 'active'
  limit 1
$$;

create or replace function public.current_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id
  from public.app_users
  where auth_user_id = auth.uid()
    and status = 'active'
  limit 1
$$;

create or replace function public.is_master()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users
    where auth_user_id = auth.uid()
      and status = 'active'
      and role in ('master', 'pastor_presidente', 'pastor_vice_presidente')
  )
$$;

create or replace function public.has_module(module_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users
    where auth_user_id = auth.uid()
      and status = 'active'
      and (
        role in ('master', 'pastor_presidente', 'pastor_vice_presidente')
        or module_id = any(permissions)
      )
  )
$$;

create or replace function public.organization_has_app_users(org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users
    where organization_id = org_id
  )
$$;

create or replace function public.same_org(row_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select row_org_id = public.current_organization_id()
$$;

alter table public.organizations enable row level security;
alter table public.app_users enable row level security;
alter table public.admin_invites enable row level security;
alter table public.church_units enable row level security;
alter table public.departments enable row level security;
alter table public.ministries enable row level security;
alter table public.ministry_activities enable row level security;
alter table public.ministry_tasks enable row level security;
alter table public.members enable row level security;
alter table public.member_private_details enable row level security;
alter table public.small_groups enable row level security;
alter table public.small_group_members enable row level security;
alter table public.small_group_meetings enable row level security;
alter table public.small_group_attendance enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.pastoral_requests enable row level security;
alter table public.finance_categories enable row level security;
alter table public.financial_entries enable row level security;
alter table public.messages enable row level security;
alter table public.library_items enable row level security;
alter table public.kids_children enable row level security;
alter table public.kids_checkins enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "public can read published organizations" on public.organizations;
drop policy if exists "public can read active churches" on public.church_units;
drop policy if exists "public can read published events" on public.events;
drop policy if exists "public can read published messages" on public.messages;
drop policy if exists "public can read published library" on public.library_items;
drop policy if exists "public link can read member profile" on public.members;
drop policy if exists "public link can create member" on public.members;
drop policy if exists "public link can update member profile" on public.members;
drop policy if exists "public can create event registrations" on public.event_registrations;
drop policy if exists "public can create pastoral requests" on public.pastoral_requests;
drop policy if exists "admins can read own organization" on public.organizations;
drop policy if exists "masters can update organization" on public.organizations;
drop policy if exists "admins can read app users" on public.app_users;
drop policy if exists "masters manage app users" on public.app_users;
drop policy if exists "first authenticated user can create master" on public.app_users;
drop policy if exists "invited authenticated user can create own admin profile" on public.app_users;
drop policy if exists "admins manage invites" on public.admin_invites;
drop policy if exists "public can read pending invite by token" on public.admin_invites;
drop policy if exists "invited user can accept own invite" on public.admin_invites;
drop policy if exists "admins read churches" on public.church_units;
drop policy if exists "church managers write churches" on public.church_units;
drop policy if exists "admins read departments" on public.departments;
drop policy if exists "module managers write departments" on public.departments;
drop policy if exists "admins read ministries" on public.ministries;
drop policy if exists "ministry managers write ministries" on public.ministries;
drop policy if exists "admins read ministry activities" on public.ministry_activities;
drop policy if exists "ministry managers write ministry activities" on public.ministry_activities;
drop policy if exists "admins read ministry tasks" on public.ministry_tasks;
drop policy if exists "ministry managers write ministry tasks" on public.ministry_tasks;
drop policy if exists "admins read members" on public.members;
drop policy if exists "members managers write members" on public.members;
drop policy if exists "member private details only managers" on public.member_private_details;
drop policy if exists "admins read small groups" on public.small_groups;
drop policy if exists "group managers write small groups" on public.small_groups;
drop policy if exists "group managers handle group members" on public.small_group_members;
drop policy if exists "group managers handle meetings" on public.small_group_meetings;
drop policy if exists "group managers handle attendance" on public.small_group_attendance;
drop policy if exists "admins read events" on public.events;
drop policy if exists "event managers write events" on public.events;
drop policy if exists "admins read event registrations" on public.event_registrations;
drop policy if exists "event managers write registrations" on public.event_registrations;
drop policy if exists "pastoral managers read all requests" on public.pastoral_requests;
drop policy if exists "request owner reads own request" on public.pastoral_requests;
drop policy if exists "authenticated can create pastoral request" on public.pastoral_requests;
drop policy if exists "pastoral managers update requests" on public.pastoral_requests;
drop policy if exists "finance managers handle categories" on public.finance_categories;
drop policy if exists "finance managers handle entries" on public.financial_entries;
drop policy if exists "admins read messages" on public.messages;
drop policy if exists "message managers write messages" on public.messages;
drop policy if exists "admins read library" on public.library_items;
drop policy if exists "library managers write library" on public.library_items;
drop policy if exists "kids managers handle children" on public.kids_children;
drop policy if exists "kids managers handle checkins" on public.kids_checkins;
drop policy if exists "masters read audit logs" on public.audit_logs;

-- Public app: somente informacoes publicas e inserts controlados.
create policy "public can read published organizations" on public.organizations
for select to anon using (publish_app = true);

create policy "public can read active churches" on public.church_units
for select to anon using (
  exists (
    select 1 from public.organizations o
    where o.id = church_units.organization_id
      and o.publish_app = true
  )
);

create policy "public can read published events" on public.events
for select to anon using (
  status = 'Ativo'
  and exists (
    select 1 from public.organizations o
    where o.id = events.organization_id
      and o.publish_app = true
  )
);

create policy "public can read published messages" on public.messages
for select to anon using (
  published = true
  and exists (
    select 1 from public.organizations o
    where o.id = messages.organization_id
      and o.publish_app = true
  )
);

create policy "public can read published library" on public.library_items
for select to anon using (
  published = true
  and exists (
    select 1 from public.organizations o
    where o.id = library_items.organization_id
      and o.publish_app = true
  )
);

create policy "public link can create member" on public.members
for insert to anon, authenticated
with check (source = 'public_link' and app_access_status in ('active', 'pending'));

create policy "public link can read member profile" on public.members
for select to anon, authenticated
using (source = 'public_link' and app_access_status in ('active', 'pending'));

create policy "public link can update member profile" on public.members
for update to anon, authenticated
using (source = 'public_link' and app_access_status in ('active', 'pending'))
with check (source = 'public_link' and app_access_status in ('active', 'pending'));

create policy "public can create event registrations" on public.event_registrations
for insert to anon, authenticated with check (true);

create policy "public can create pastoral requests" on public.pastoral_requests
for insert to anon, authenticated with check (true);

-- Admin base.
create policy "admins can read own organization" on public.organizations
for select to authenticated using (public.same_org(id));

create policy "masters can update organization" on public.organizations
for update to authenticated using (public.same_org(id) and public.has_module('settings'))
with check (public.same_org(id) and public.has_module('settings'));

create policy "admins can read app users" on public.app_users
for select to authenticated using (public.same_org(organization_id));

create policy "masters manage app users" on public.app_users
for all to authenticated using (public.same_org(organization_id) and public.has_module('access'))
with check (public.same_org(organization_id) and public.has_module('access'));

create policy "first authenticated user can create master" on public.app_users
for insert to authenticated with check (
  auth_user_id = auth.uid()
  and role = 'master'
  and not public.organization_has_app_users(organization_id)
);

create policy "invited authenticated user can create own admin profile" on public.app_users
for insert to authenticated with check (
  auth_user_id = auth.uid()
  and email = auth.email()::citext
  and exists (
    select 1
    from public.admin_invites invite
    where invite.organization_id = app_users.organization_id
      and invite.invited_email = auth.email()::citext
      and invite.status = 'pending'
      and invite.role = app_users.role
  )
);

create policy "admins manage invites" on public.admin_invites
for all to authenticated using (public.same_org(organization_id) and public.has_module('access'))
with check (public.same_org(organization_id) and public.has_module('access'));

create policy "invited user can accept own invite" on public.admin_invites
for update to authenticated using (
  invited_email = auth.email()::citext
  and status = 'pending'
)
with check (
  invited_email = auth.email()::citext
  and status in ('pending', 'accepted')
);

create or replace function public.get_pending_invite(invite_token uuid)
returns table (
  id uuid,
  organization_id uuid,
  token uuid,
  invited_name text,
  invited_email citext,
  role text,
  permissions text[],
  status text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    i.id,
    i.organization_id,
    i.token,
    i.invited_name,
    i.invited_email,
    i.role,
    i.permissions,
    i.status,
    i.created_at
  from public.admin_invites i
  where i.token = invite_token
    and i.status = 'pending'
  limit 1
$$;

grant execute on function public.get_pending_invite(uuid) to anon, authenticated;

create policy "admins read churches" on public.church_units
for select to authenticated using (public.same_org(organization_id));

create policy "church managers write churches" on public.church_units
for all to authenticated using (public.same_org(organization_id) and public.has_module('churches'))
with check (public.same_org(organization_id) and public.has_module('churches'));

create policy "admins read departments" on public.departments
for select to authenticated using (public.same_org(organization_id));

create policy "module managers write departments" on public.departments
for all to authenticated using (public.same_org(organization_id) and (public.has_module('ministries') or public.has_module('members')))
with check (public.same_org(organization_id) and (public.has_module('ministries') or public.has_module('members')));

create policy "admins read ministries" on public.ministries
for select to authenticated using (public.same_org(organization_id));

create policy "ministry managers write ministries" on public.ministries
for all to authenticated using (public.same_org(organization_id) and public.has_module('ministries'))
with check (public.same_org(organization_id) and public.has_module('ministries'));

create policy "admins read ministry activities" on public.ministry_activities
for select to authenticated using (public.same_org(organization_id));

create policy "ministry managers write ministry activities" on public.ministry_activities
for all to authenticated using (public.same_org(organization_id) and public.has_module('ministries'))
with check (public.same_org(organization_id) and public.has_module('ministries'));

create policy "admins read ministry tasks" on public.ministry_tasks
for select to authenticated using (public.same_org(organization_id));

create policy "ministry managers write ministry tasks" on public.ministry_tasks
for all to authenticated using (public.same_org(organization_id) and public.has_module('ministries'))
with check (public.same_org(organization_id) and public.has_module('ministries'));

create policy "admins read members" on public.members
for select to authenticated using (public.same_org(organization_id));

create policy "members managers write members" on public.members
for all to authenticated using (public.same_org(organization_id) and public.has_module('members'))
with check (public.same_org(organization_id) and public.has_module('members'));

create policy "member private details only managers" on public.member_private_details
for all to authenticated
using (exists (
  select 1 from public.members m
  where m.id = member_id and public.same_org(m.organization_id) and public.has_module('members')
))
with check (exists (
  select 1 from public.members m
  where m.id = member_id and public.same_org(m.organization_id) and public.has_module('members')
));

create policy "admins read small groups" on public.small_groups
for select to authenticated using (public.same_org(organization_id));

create policy "group managers write small groups" on public.small_groups
for all to authenticated using (public.same_org(organization_id) and public.has_module('groups'))
with check (public.same_org(organization_id) and public.has_module('groups'));

create policy "group managers handle group members" on public.small_group_members
for all to authenticated
using (exists (select 1 from public.small_groups g where g.id = small_group_id and public.same_org(g.organization_id) and public.has_module('groups')))
with check (exists (select 1 from public.small_groups g where g.id = small_group_id and public.same_org(g.organization_id) and public.has_module('groups')));

create policy "group managers handle meetings" on public.small_group_meetings
for all to authenticated
using (exists (select 1 from public.small_groups g where g.id = small_group_id and public.same_org(g.organization_id) and public.has_module('groups')))
with check (exists (select 1 from public.small_groups g where g.id = small_group_id and public.same_org(g.organization_id) and public.has_module('groups')));

create policy "group managers handle attendance" on public.small_group_attendance
for all to authenticated
using (exists (
  select 1 from public.small_group_meetings mt
  join public.small_groups g on g.id = mt.small_group_id
  where mt.id = meeting_id and public.same_org(g.organization_id) and public.has_module('groups')
))
with check (exists (
  select 1 from public.small_group_meetings mt
  join public.small_groups g on g.id = mt.small_group_id
  where mt.id = meeting_id and public.same_org(g.organization_id) and public.has_module('groups')
));

create policy "admins read events" on public.events
for select to authenticated using (public.same_org(organization_id));

create policy "event managers write events" on public.events
for all to authenticated using (public.same_org(organization_id) and public.has_module('events'))
with check (public.same_org(organization_id) and public.has_module('events'));

create policy "admins read event registrations" on public.event_registrations
for select to authenticated
using (exists (select 1 from public.events e where e.id = event_id and public.same_org(e.organization_id)));

create policy "event managers write registrations" on public.event_registrations
for all to authenticated
using (exists (select 1 from public.events e where e.id = event_id and public.same_org(e.organization_id) and public.has_module('events')))
with check (exists (select 1 from public.events e where e.id = event_id and public.same_org(e.organization_id) and public.has_module('events')));

create policy "pastoral managers read all requests" on public.pastoral_requests
for select to authenticated using (public.same_org(organization_id) and public.has_module('pastoral'));

create policy "request owner reads own request" on public.pastoral_requests
for select to authenticated using (
  requester_user_id in (select id from public.app_users where auth_user_id = auth.uid())
);

create policy "authenticated can create pastoral request" on public.pastoral_requests
for insert to authenticated with check (public.same_org(organization_id));

create policy "pastoral managers update requests" on public.pastoral_requests
for update to authenticated using (public.same_org(organization_id) and public.has_module('pastoral'))
with check (public.same_org(organization_id) and public.has_module('pastoral'));

create policy "finance managers handle categories" on public.finance_categories
for all to authenticated using (public.same_org(organization_id) and public.has_module('finance'))
with check (public.same_org(organization_id) and public.has_module('finance'));

create policy "finance managers handle entries" on public.financial_entries
for all to authenticated using (public.same_org(organization_id) and public.has_module('finance'))
with check (public.same_org(organization_id) and public.has_module('finance'));

create policy "admins read messages" on public.messages
for select to authenticated using (public.same_org(organization_id));

create policy "message managers write messages" on public.messages
for all to authenticated using (public.same_org(organization_id) and public.has_module('messages'))
with check (public.same_org(organization_id) and public.has_module('messages'));

create policy "admins read library" on public.library_items
for select to authenticated using (public.same_org(organization_id));

create policy "library managers write library" on public.library_items
for all to authenticated using (public.same_org(organization_id) and public.has_module('library'))
with check (public.same_org(organization_id) and public.has_module('library'));

create policy "kids managers handle children" on public.kids_children
for all to authenticated using (public.same_org(organization_id) and public.has_module('kids'))
with check (public.same_org(organization_id) and public.has_module('kids'));

create policy "kids managers handle checkins" on public.kids_checkins
for all to authenticated
using (exists (select 1 from public.kids_children c where c.id = child_id and public.same_org(c.organization_id) and public.has_module('kids')))
with check (exists (select 1 from public.kids_children c where c.id = child_id and public.same_org(c.organization_id) and public.has_module('kids')));

create policy "masters read audit logs" on public.audit_logs
for select to authenticated using (public.same_org(organization_id) and public.is_master());

create index if not exists idx_app_users_org on public.app_users(organization_id);
create unique index if not exists idx_app_users_org_registration_unique
on public.app_users (organization_id, registration)
where registration is not null;
create index if not exists idx_invites_token on public.admin_invites(token);
create index if not exists idx_members_org on public.members(organization_id);
create index if not exists idx_members_email on public.members(email);
create index if not exists idx_church_units_org on public.church_units(organization_id);
create index if not exists idx_events_org_date on public.events(organization_id, start_date);
create index if not exists idx_pastoral_org_status on public.pastoral_requests(organization_id, status);
create index if not exists idx_financial_org_date on public.financial_entries(organization_id, date);
create index if not exists idx_messages_org_date on public.messages(organization_id, created_at desc);

insert into public.organizations (name, subtitle, short_name)
select 'Assembleia de Deus Ministerio Filadelfia', 'A Noiva', 'Filadelfia'
where not exists (select 1 from public.organizations);

with org as (select id from public.organizations order by created_at limit 1)
insert into public.finance_categories (organization_id, code, name, type)
select org.id, item.code, item.name, item.type
from org
cross join (values
  ('1.1.01', 'Dizimos', 'income'),
  ('1.1.02', 'Ofertas Gerais', 'income'),
  ('1.1.03', 'Ofertas de Almas/Missoes', 'income'),
  ('1.1.04', 'Ofertas de Construcao/Reforma', 'income'),
  ('1.2.01', 'Inscricoes de Eventos', 'income'),
  ('1.2.02', 'Cantina/Bazar', 'income'),
  ('1.2.03', 'Livraria/Materiais', 'income'),
  ('1.3.01', 'Doacoes Especificas', 'income'),
  ('1.3.02', 'Rendimentos de Aplicacoes', 'income'),
  ('1.3.03', 'Alugueis Recebidos', 'income'),
  ('2.1.01', 'Prebenda Pastoral / Sustento Pastoral', 'expense'),
  ('2.1.02', 'Salarios da Equipe', 'expense'),
  ('2.1.03', 'Encargos Sociais e Impostos', 'expense'),
  ('2.1.04', 'Ajuda de Custo / Benesses', 'expense'),
  ('2.1.05', 'Preletores/Pregadores Visitantes', 'expense'),
  ('2.2.01', 'Aluguel do Imovel', 'expense'),
  ('2.2.02', 'Contas de Consumo', 'expense'),
  ('2.2.03', 'Limpeza e Conservacao', 'expense'),
  ('2.2.04', 'Sistemas e Softwares', 'expense'),
  ('2.2.05', 'Papelaria e Escritorio', 'expense'),
  ('2.2.06', 'Taxas Bancarias', 'expense'),
  ('2.3.01', 'Acao Social / Assistencia Social', 'expense'),
  ('2.3.02', 'Missoes e Campos Missionarios', 'expense'),
  ('2.3.03', 'Departamentos Internos', 'expense'),
  ('2.3.04', 'Musica e Midia', 'expense'),
  ('2.3.05', 'Santa Ceia', 'expense'),
  ('2.4.01', 'Reformas e Obras', 'expense'),
  ('2.4.02', 'Equipamentos de Som e Video', 'expense'),
  ('2.4.03', 'Mobiliario', 'expense')
) as item(code, name, type)
on conflict (organization_id, code, type) do nothing;

with org as (select id from public.organizations order by created_at limit 1)
insert into public.departments (organization_id, name)
select org.id, item.name
from org
cross join (values
  ('Louvor'), ('Midia'), ('Eventos'), ('Kids'), ('Jovens'), ('Casais'),
  ('Acao Social'), ('Intercessao'), ('Ensino / EBD'), ('Recepcao'),
  ('Diaconato'), ('Secretaria'), ('Tesouraria'), ('Comunicacao')
) as item(name)
on conflict (organization_id, name) do nothing;

commit;
