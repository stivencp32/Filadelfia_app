drop policy if exists "public link can read member profile" on public.members;
drop policy if exists "public link can update member profile" on public.members;
drop function if exists public.get_member_app_profile(uuid);
drop function if exists public.get_member_app_profile_by_login(text, text);
drop function if exists public.save_member_app_profile(uuid, uuid, text, text, text, text, text, date, uuid, text, date);
drop function if exists public.reset_member_app_password(text, text);
drop function if exists public.get_app_user_by_login(text, text);
drop function if exists public.update_member_app_profile(uuid, text, text, text, date, uuid, text);

alter table public.members
add column if not exists photo text,
add column if not exists password text;

alter table public.app_users
add column if not exists registration text,
add column if not exists password text;

create unique index if not exists idx_app_users_org_registration_unique
on public.app_users (organization_id, registration)
where registration is not null;

create or replace function public.next_app_registration(p_organization_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  next_number integer;
begin
  perform pg_advisory_xact_lock(hashtext(p_organization_id::text || ':registration'));

  select coalesce(max(registration::integer), 0) + 1
    into next_number
  from (
    select m.registration
    from public.members m
    where m.organization_id = p_organization_id
      and m.registration ~ '^[0-9]+$'
    union all
    select u.registration
    from public.app_users u
    where u.organization_id = p_organization_id
      and u.registration ~ '^[0-9]+$'
  ) registrations;

  return lpad(next_number::text, 6, '0');
end;
$$;

grant execute on function public.next_app_registration(uuid) to anon, authenticated;

create or replace function public.get_app_user_by_login(p_login text, p_password text)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  name text,
  email citext,
  registration text,
  password text,
  role text,
  permissions text[],
  status text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    u.id,
    u.organization_id,
    u.auth_user_id,
    u.name,
    u.email,
    u.registration,
    u.password,
    u.role,
    u.permissions,
    u.status,
    u.created_at,
    u.updated_at
  from public.app_users u
  where (
      lower(u.email::text) = lower(trim(p_login))
      or u.registration = trim(p_login)
    )
    and u.password = p_password
    and u.status = 'active'
  order by u.updated_at desc nulls last, u.created_at desc
  limit 1
$$;

grant execute on function public.get_app_user_by_login(text, text) to anon, authenticated;

do $$
declare
  item record;
begin
  for item in
    select id, organization_id from public.app_users where registration is null order by created_at, id
  loop
    update public.app_users
    set registration = public.next_app_registration(item.organization_id)
    where id = item.id and registration is null;
  end loop;

  for item in
    select id, organization_id from public.members where registration is null order by created_at, id
  loop
    update public.members
    set registration = public.next_app_registration(item.organization_id)
    where id = item.id and registration is null;
  end loop;
end $$;

create policy "public link can read member profile" on public.members
for select to anon, authenticated
using (source = 'public_link' and app_access_status in ('active', 'pending'));

create policy "public link can update member profile" on public.members
for update to anon, authenticated
using (source = 'public_link' and app_access_status in ('active', 'pending'))
with check (source = 'public_link' and app_access_status in ('active', 'pending'));

create or replace function public.get_member_app_profile(profile_id uuid)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  church_unit_id uuid,
  name text,
  gender text,
  birth_date date,
  email citext,
  phone text,
  photo text,
  registration text,
  department text,
  ministry_role text,
  entry_date date,
  status text,
  is_leader boolean,
  notes text,
  source text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    m.id,
    m.organization_id,
    m.auth_user_id,
    m.church_unit_id,
    m.name,
    m.gender,
    m.birth_date,
    m.email,
    m.phone,
    m.photo,
    m.registration,
    m.department,
    m.ministry_role,
    m.entry_date,
    m.status,
    m.is_leader,
    null::text as notes,
    m.source,
    m.created_at,
    m.updated_at
  from public.members m
  where m.id = profile_id
    and m.source = 'public_link'
    and m.app_access_status in ('active', 'pending')
  limit 1
$$;

create or replace function public.update_member_app_profile(
  profile_id uuid,
  p_name text,
  p_email text,
  p_phone text,
  p_birth_date date,
  p_church_unit_id uuid,
  p_photo text
)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  church_unit_id uuid,
  name text,
  gender text,
  birth_date date,
  email citext,
  phone text,
  photo text,
  registration text,
  department text,
  ministry_role text,
  entry_date date,
  status text,
  is_leader boolean,
  notes text,
  source text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  update public.members m
  set
    church_unit_id = p_church_unit_id,
    name = coalesce(nullif(trim(p_name), ''), m.name),
    birth_date = p_birth_date,
    email = nullif(trim(p_email), '')::citext,
    phone = nullif(trim(p_phone), ''),
    photo = coalesce(nullif(p_photo, ''), m.photo),
    updated_at = now()
  where m.id = profile_id
    and m.source = 'public_link'
    and m.app_access_status in ('active', 'pending')
  returning
    m.id,
    m.organization_id,
    m.auth_user_id,
    m.church_unit_id,
    m.name,
    m.gender,
    m.birth_date,
    m.email,
    m.phone,
    m.photo,
    m.registration,
    m.department,
    m.ministry_role,
    m.entry_date,
    m.status,
    m.is_leader,
    null::text as notes,
    m.source,
    m.created_at,
    m.updated_at
$$;

grant execute on function public.get_member_app_profile(uuid) to anon, authenticated;
grant execute on function public.update_member_app_profile(uuid, text, text, text, date, uuid, text) to anon, authenticated;

create or replace function public.get_member_app_profile_by_login(p_email text, p_password text)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  church_unit_id uuid,
  name text,
  gender text,
  birth_date date,
  email citext,
  phone text,
  photo text,
  registration text,
  department text,
  ministry_role text,
  entry_date date,
  status text,
  is_leader boolean,
  notes text,
  source text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    m.id,
    m.organization_id,
    m.auth_user_id,
    m.church_unit_id,
    m.name,
    m.gender,
    m.birth_date,
    m.email,
    m.phone,
    m.photo,
    m.registration,
    m.department,
    m.ministry_role,
    m.entry_date,
    m.status,
    m.is_leader,
    null::text as notes,
    m.source,
    m.created_at,
    m.updated_at
  from public.members m
  where (
      lower(m.email::text) = lower(trim(p_email))
      or m.registration = trim(p_email)
    )
    and m.password = p_password
    and m.app_access_status in ('active', 'pending')
  order by m.updated_at desc nulls last, m.created_at desc
  limit 1
$$;

grant execute on function public.get_member_app_profile_by_login(text, text) to anon, authenticated;

create or replace function public.save_member_app_profile(
  profile_id uuid,
  p_organization_id uuid,
  p_name text,
  p_gender text,
  p_email text,
  p_password text,
  p_phone text,
  p_birth_date date,
  p_church_unit_id uuid,
  p_photo text,
  p_entry_date date
)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  church_unit_id uuid,
  name text,
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
  status text,
  is_leader boolean,
  notes text,
  source text,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.members (
    id,
    organization_id,
    church_unit_id,
    name,
    gender,
    birth_date,
    email,
    password,
    phone,
    photo,
    registration,
    entry_date,
    status,
    source,
    app_access_status
  )
  values (
    profile_id,
    p_organization_id,
    p_church_unit_id,
    coalesce(nullif(trim(p_name), ''), 'Membro'),
    nullif(trim(p_gender), ''),
    p_birth_date,
    nullif(trim(p_email), '')::citext,
    nullif(p_password, ''),
    nullif(trim(p_phone), ''),
    nullif(p_photo, ''),
    public.next_app_registration(p_organization_id),
    coalesce(p_entry_date, current_date),
    'Visitante',
    'public_link',
    'active'
  )
  on conflict on constraint members_pkey do update
  set
    church_unit_id = excluded.church_unit_id,
    name = excluded.name,
    gender = coalesce(excluded.gender, members.gender),
    birth_date = excluded.birth_date,
    email = excluded.email,
    password = coalesce(excluded.password, members.password),
    phone = excluded.phone,
    photo = coalesce(excluded.photo, members.photo),
    registration = coalesce(members.registration, public.next_app_registration(members.organization_id)),
    source = 'public_link',
    app_access_status = case
      when members.app_access_status = 'blocked' then 'blocked'
      else 'active'
    end,
    updated_at = now();

  return query
  select
    m.id,
    m.organization_id,
    m.auth_user_id,
    m.church_unit_id,
    m.name,
    m.gender,
    m.birth_date,
    m.email,
    m.phone,
    m.photo,
    m.password,
    m.registration,
    m.department,
    m.ministry_role,
    m.entry_date,
    m.status,
    m.is_leader,
    null::text as notes,
    m.source,
    m.created_at,
    m.updated_at
  from public.members m
  where m.id = profile_id
  limit 1;
end;
$$;

grant execute on function public.save_member_app_profile(uuid, uuid, text, text, text, text, text, date, uuid, text, date) to anon, authenticated;

create or replace function public.reset_member_app_password(p_email text, p_password text)
returns table (
  id uuid,
  organization_id uuid,
  auth_user_id uuid,
  church_unit_id uuid,
  name text,
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
  status text,
  is_leader boolean,
  notes text,
  source text,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  update public.members m
  set password = p_password,
      updated_at = now()
  where lower(m.email::text) = lower(trim(p_email))
    and m.app_access_status in ('active', 'pending')
  returning
    m.id,
    m.organization_id,
    m.auth_user_id,
    m.church_unit_id,
    m.name,
    m.gender,
    m.birth_date,
    m.email,
    m.phone,
    m.photo,
    m.password,
    m.registration,
    m.department,
    m.ministry_role,
    m.entry_date,
    m.status,
    m.is_leader,
    null::text as notes,
    m.source,
    m.created_at,
    m.updated_at
$$;

grant execute on function public.reset_member_app_password(text, text) to anon, authenticated;
