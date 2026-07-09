begin;

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

drop trigger if exists touch_ministry_activities_updated_at on public.ministry_activities;
create trigger touch_ministry_activities_updated_at before update on public.ministry_activities
for each row execute function public.touch_updated_at();

drop trigger if exists touch_ministry_tasks_updated_at on public.ministry_tasks;
create trigger touch_ministry_tasks_updated_at before update on public.ministry_tasks
for each row execute function public.touch_updated_at();

alter table public.ministry_activities enable row level security;
alter table public.ministry_tasks enable row level security;

drop policy if exists "admins read ministry activities" on public.ministry_activities;
drop policy if exists "ministry managers write ministry activities" on public.ministry_activities;
drop policy if exists "admins read ministry tasks" on public.ministry_tasks;
drop policy if exists "ministry managers write ministry tasks" on public.ministry_tasks;

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

commit;
