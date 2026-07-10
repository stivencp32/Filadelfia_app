begin;

alter table public.members
add column if not exists address text,
add column if not exists neighborhood text,
add column if not exists city text,
add column if not exists state text,
add column if not exists zip text,
add column if not exists lat numeric(10, 7),
add column if not exists lng numeric(10, 7);

commit;
