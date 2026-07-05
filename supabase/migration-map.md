# Mapa de migracao do estado atual para Supabase

Este app hoje concentra os dados em `state` no `app.js`. A migracao deve seguir este mapa:

| Estado atual | Tabela Supabase | Observacao |
| --- | --- | --- |
| `settings` | `organizations` | Identidade visual, app publico, contatos, cores e logo. |
| `users` | `app_users` | Usuarios administrativos, cargo, status e permissoes. Senha deve sair do app e ir para Supabase Auth. |
| `invites` | `admin_invites` | Convites administrativos por token, status e permissoes. |
| `members` | `members` | Cadastros internos de membresia. |
| `publicMembers` | `members` | Inserir com `source = 'public_link'`. |
| Dados sensiveis futuros de membros | `member_private_details` | Separacao para proteger dados sensiveis. |
| `churches` | `church_units` | Igrejas, congregacoes, endereco, mapa e pastor responsavel. |
| `events` | `events` | Eventos, status, departamento, publico, vagas e inscricoes. |
| Inscricoes futuras | `event_registrations` | Participantes de eventos. |
| `pastoralRequests` | `pastoral_requests` | Pedidos de oracao, visita e acompanhamento. |
| `financialEntries` | `financial_entries` | Lancamentos financeiros. |
| `financeCategoryGroups` | `finance_categories` | Plano de contas inicial ja vai no seed do schema. |
| `messages` | `messages` | Comunicados do admin e app publico. |
| Biblioteca futura | `library_items` | Estudos, documentos, videos e materiais. |
| Pequenos grupos futuros | `small_groups` + auxiliares | Cadastro, membros, reunioes e presenca. |
| Ministerios futuros | `departments`, `ministries` | Departamentos e ministerios com lideranca. |
| Kids futuro | `kids_children`, `kids_checkins` | Criancas e check-in/check-out. |

## Proxima etapa tecnica

1. Adicionar `supabase-js` ao `index.html`.
2. Criar `supabase.config.js` a partir do exemplo.
3. Substituir `loadServerState()` e `saveServerState()` por funcoes que leem/escrevem nas tabelas.
4. Migrar login/cadastro/convite para Supabase Auth.
5. Remover armazenamento de senha do `localStorage`.
