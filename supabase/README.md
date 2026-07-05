# Supabase - Ministerio Filadelfia

## Ordem de configuracao

1. Crie um projeto no Supabase.
2. Abra `SQL Editor`.
3. Cole e execute todo o conteudo de `supabase/schema.sql`.
4. Em `Authentication > Providers`, deixe `Email` ativo.
5. Copie `supabase.config.example.js` para `supabase.config.js`.
6. Preencha `url` e `anonKey` com os dados de `Project Settings > API`.
7. Nunca use a `service_role key` no navegador.

## Primeiro administrador

Depois de executar o schema:

1. Crie o usuario master em `Authentication > Users`, ou pelo fluxo de cadastro quando a integracao estiver ligada.
2. Copie o UUID desse usuario em `auth.users`.
3. Rode este SQL, trocando email/nome/UUID:

```sql
with org as (
  select id from public.organizations order by created_at limit 1
)
insert into public.app_users (
  organization_id,
  auth_user_id,
  name,
  email,
  role,
  permissions,
  status
)
select
  org.id,
  'COLE-AQUI-O-UUID-DO-AUTH-USER'::uuid,
  'Administrador',
  'email@dominio.com',
  'master',
  array[
    'access', 'members', 'pastoral', 'churches', 'groups', 'ministries',
    'events', 'kids', 'finance', 'library', 'messages', 'mobile', 'settings'
  ],
  'active'
from org;
```

## Dados ficticios para teste

Depois de executar o schema, rode `supabase/seed-demo.sql` no SQL Editor para popular o banco com uma simulacao completa:

- 100 membros ativos.
- 20 visitantes do mes.
- Pastor Presidente, Pastor Vice Presidente, Pastor Auxiliar.
- Lideres/representantes de todos os departamentos com permissoes por modulo.
- Cultos semanais de quinta-feira as 19:30 e domingo as 18:45.
- Eventos extras por departamento.
- Comunicados e pedidos pastorais.
- Lancamentos financeiros de uma igreja com media de 120 pessoas por culto.

Para regenerar a seed:

```powershell
./scripts/generate-demo-seed.ps1
```

## Como o schema esta dividido

- `organizations`: configuracoes gerais, identidade visual e publicacao do app.
- `app_users`: usuarios administrativos, cargos e permissoes por modulo.
- `admin_invites`: convites administrativos por token.
- `members`: membros, visitantes, congregados e cadastros vindos do link publico.
- `member_private_details`: dados sensiveis de membros, separados da tabela principal.
- `church_units`: igrejas, congregacoes e pontos de atendimento.
- `departments`, `ministries`: departamentos e ministerios.
- `small_groups`, `small_group_members`, `small_group_meetings`, `small_group_attendance`: pequenos grupos e presenca.
- `events`, `event_registrations`: eventos e inscricoes.
- `pastoral_requests`: pedidos pastorais e de oracao.
- `finance_categories`, `financial_entries`: plano de contas e lancamentos financeiros.
- `messages`: comunicados.
- `library_items`: biblioteca/conteudos.
- `kids_children`, `kids_checkins`: kids e check-in/check-out.
- `audit_logs`: trilha de auditoria.

## Politicas de seguranca

O schema ja liga RLS em todas as tabelas.

- Visitantes anonimos podem ler apenas dados publicos do app.
- Visitantes anonimos podem enviar cadastro publico, pedido pastoral e inscricao de evento.
- Usuarios administrativos so acessam a propria organizacao.
- Escrita por modulo depende das permissoes em `app_users.permissions`.
- Financeiro fica restrito ao modulo `finance`.
- Dados privados de membros ficam restritos ao modulo `members`.
- Pedidos pastorais confidenciais ficam restritos ao modulo `pastoral`.

## Observacao importante

O app atual ainda usa `localStorage`/servidor local como camada de dados. Este schema deixa o banco pronto para a proxima etapa: trocar `loadState`/`saveState` por chamadas Supabase, usando `supabase-js`.
