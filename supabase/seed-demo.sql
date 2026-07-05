-- Demo seed Ministério Filadélfia
-- Execute no SQL Editor do Supabase depois do schema.sql.
begin;
select set_config('app.demo_org_id', (select id::text from public.organizations order by created_at limit 1), false);

-- Limpeza apenas dos dados DEMO.
delete from public.financial_entries where organization_id = current_setting('app.demo_org_id')::uuid and (description like '[DEMO]%' or notes like '[DEMO]%');
delete from public.pastoral_requests where organization_id = current_setting('app.demo_org_id')::uuid and message like '[DEMO]%';
delete from public.messages where organization_id = current_setting('app.demo_org_id')::uuid and title like '[DEMO]%';
delete from public.events where organization_id = current_setting('app.demo_org_id')::uuid and title like '[DEMO]%';
delete from public.members where organization_id = current_setting('app.demo_org_id')::uuid and (email like '%@demo.filadelfia.local' or notes like '[DEMO]%');
delete from public.app_users where organization_id = current_setting('app.demo_org_id')::uuid and email like '%@demo.filadelfia.local';
delete from public.church_units where organization_id = current_setting('app.demo_org_id')::uuid and name like '[DEMO]%';

insert into public.church_units (organization_id, name, pastor, phone, address, city, state, status, service_time, lat, lng)
values (current_setting('app.demo_org_id')::uuid, '[DEMO] Filadélfia - Sede', 'Pr. Samuel Presidente', '(21) 99999-1001', 'Rua da Assembleia, 100 - Centro', 'São Gonçalo', 'RJ', 'Ativa', 'Quinta 19:30 e Domingo 18:45', -22.8268000, -43.0634000);

insert into public.app_users (organization_id, name, email, role, permissions, status)
values
  (current_setting('app.demo_org_id')::uuid, 'Pr. Samuel Presidente', 'pastor.presidente@demo.filadelfia.local', 'pastor_presidente', array['access', 'members', 'pastoral', 'churches', 'groups', 'ministries', 'events', 'kids', 'finance', 'library', 'messages', 'mobile', 'settings'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Pr. Marcos Vice', 'pastor.vice@demo.filadelfia.local', 'pastor_vice_presidente', array['access', 'members', 'pastoral', 'churches', 'groups', 'ministries', 'events', 'kids', 'finance', 'library', 'messages', 'mobile', 'settings'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Pr. Daniel Auxiliar', 'pastor.auxiliar@demo.filadelfia.local', 'pastor_auxiliar', array['pastoral', 'members', 'events', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Louvor Demo', 'louvor@demo.filadelfia.local', 'worship', array['ministries', 'events', 'library', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Mídia Demo', 'midia@demo.filadelfia.local', 'media', array['events', 'library', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Eventos Demo', 'eventos@demo.filadelfia.local', 'events', array['events', 'messages', 'members'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder Kids Demo', 'kids@demo.filadelfia.local', 'kids', array['kids', 'members', 'messages'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Jovens Demo', 'jovens@demo.filadelfia.local', 'custom', array['groups', 'events', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Casais Demo', 'casais@demo.filadelfia.local', 'custom', array['groups', 'events', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Ação Social Demo', 'acao.social@demo.filadelfia.local', 'custom', array['members', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Intercessão Demo', 'intercessao@demo.filadelfia.local', 'custom', array['pastoral', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Superintendente EBD Demo', 'ensino.ebd@demo.filadelfia.local', 'custom', array['library', 'messages', 'mobile'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Recepção Demo', 'recepcao@demo.filadelfia.local', 'custom', array['members', 'events'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Coordenador de Diaconato Demo', 'diaconato@demo.filadelfia.local', 'custom', array['members', 'events', 'pastoral'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Secretário Demo', 'secretaria@demo.filadelfia.local', 'custom', array['members', 'churches', 'events'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Tesoureiro Demo', 'tesouraria@demo.filadelfia.local', 'treasury', array['finance'], 'active'),
  (current_setting('app.demo_org_id')::uuid, 'Líder de Comunicação Demo', 'comunicacao@demo.filadelfia.local', 'media', array['events', 'library', 'messages', 'mobile'], 'active');

insert into public.members (organization_id, church_unit_id, name, gender, birth_date, email, phone, registration, department, ministry_role, entry_date, status, is_leader, source, notes)
select current_setting('app.demo_org_id')::uuid, c.id, v.name, v.gender, v.birth_date::date, v.email::citext, v.phone, v.registration, v.department, v.ministry_role, v.entry_date::date, v.status, v.is_leader, v.source, v.notes
from public.church_units c
cross join (values
  ('Pr. Samuel Presidente', 'Masculino', '1980-01-01', 'pastor.presidente@demo.filadelfia.local', '(21) 91000-2000', 'MF-0001', 'Pastoral', 'pastor_presidente', '2024-01-12', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Pr. Marcos Vice', 'Feminino', '1981-03-06', 'pastor.vice@demo.filadelfia.local', '(21) 91001-2001', 'MF-0002', 'Pastoral', 'pastor_vice_presidente', '2024-01-23', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Pr. Daniel Auxiliar', 'Masculino', '1982-05-10', 'pastor.auxiliar@demo.filadelfia.local', '(21) 91002-2002', 'MF-0003', 'Pastoral', 'pastor_auxiliar', '2024-02-03', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Louvor Demo', 'Feminino', '1983-07-14', 'louvor@demo.filadelfia.local', '(21) 91003-2003', 'MF-0004', 'Louvor', 'Líder de Louvor', '2024-02-14', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Mídia Demo', 'Masculino', '1984-09-16', 'midia@demo.filadelfia.local', '(21) 91004-2004', 'MF-0005', 'Mídia', 'Líder de Mídia', '2024-02-25', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Eventos Demo', 'Feminino', '1985-11-20', 'eventos@demo.filadelfia.local', '(21) 91005-2005', 'MF-0006', 'Eventos', 'Líder de Eventos', '2024-03-07', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder Kids Demo', 'Masculino', '1987-01-24', 'kids@demo.filadelfia.local', '(21) 91006-2006', 'MF-0007', 'Kids', 'Líder Kids', '2024-03-18', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Jovens Demo', 'Feminino', '1988-03-29', 'jovens@demo.filadelfia.local', '(21) 91007-2007', 'MF-0008', 'Jovens', 'Líder de Jovens', '2024-03-29', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Casais Demo', 'Masculino', '1989-06-02', 'casais@demo.filadelfia.local', '(21) 91008-2008', 'MF-0009', 'Casais', 'Líder de Casais', '2024-04-09', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Ação Social Demo', 'Feminino', '1990-08-06', 'acao.social@demo.filadelfia.local', '(21) 91009-2009', 'MF-0010', 'Ação Social', 'Líder de Ação Social', '2024-04-20', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Intercessão Demo', 'Masculino', '1991-10-10', 'intercessao@demo.filadelfia.local', '(21) 91010-2010', 'MF-0011', 'Intercessão', 'Líder de Intercessão', '2024-05-01', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Superintendente EBD Demo', 'Feminino', '1992-12-13', 'ensino.ebd@demo.filadelfia.local', '(21) 91011-2011', 'MF-0012', 'Ensino / EBD', 'Superintendente EBD', '2024-05-12', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Recepção Demo', 'Masculino', '1994-02-16', 'recepcao@demo.filadelfia.local', '(21) 91012-2012', 'MF-0013', 'Recepção', 'Líder de Recepção', '2024-05-23', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Coordenador de Diaconato Demo', 'Feminino', '1995-04-22', 'diaconato@demo.filadelfia.local', '(21) 91013-2013', 'MF-0014', 'Diaconato', 'Coordenador de Diaconato', '2024-06-03', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Secretário Demo', 'Masculino', '1996-06-25', 'secretaria@demo.filadelfia.local', '(21) 91014-2014', 'MF-0015', 'Secretaria', 'Secretário', '2024-06-14', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Tesoureiro Demo', 'Feminino', '1997-08-29', 'tesouraria@demo.filadelfia.local', '(21) 91015-2015', 'MF-0016', 'Tesouraria', 'Tesoureiro', '2024-06-25', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Líder de Comunicação Demo', 'Masculino', '1998-11-02', 'comunicacao@demo.filadelfia.local', '(21) 91016-2016', 'MF-0017', 'Comunicação', 'Líder de Comunicação', '2024-07-06', 'Membro', true, 'admin', '[DEMO] Liderança criada para simulação.'),
  ('Rafael Moraes', 'Masculino', '1974-10-28', 'membro018@demo.filadelfia.local', '(21) 93017-5017', 'MF-0018', 'Kids', 'Integrante', '2024-10-03', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Sara Pereira', 'Feminino', '1975-05-27', 'membro019@demo.filadelfia.local', '(21) 93018-5018', 'MF-0019', 'Jovens', 'Voluntário', '2024-10-08', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Tiago Silva', 'Masculino', '1975-12-24', 'membro020@demo.filadelfia.local', '(21) 93019-5019', 'MF-0020', 'Casais', 'Integrante', '2024-10-13', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Úrsula Almeida', 'Feminino', '1976-07-22', 'membro021@demo.filadelfia.local', '(21) 93020-5020', 'MF-0021', 'Ação Social', 'Auxiliar', '2024-10-18', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Vinícius Dias', 'Masculino', '1977-02-18', 'membro022@demo.filadelfia.local', '(21) 93021-5021', 'MF-0022', 'Intercessão', 'Voluntário', '2024-10-23', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Wanessa Gomes', 'Feminino', '1977-09-17', 'membro023@demo.filadelfia.local', '(21) 93022-5022', 'MF-0023', 'Ensino / EBD', 'Integrante', '2024-10-28', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Yasmin Jesus', 'Masculino', '1978-04-16', 'membro024@demo.filadelfia.local', '(21) 93023-5023', 'MF-0024', 'Recepção', 'Integrante', '2024-11-02', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Zaqueu Nascimento', 'Feminino', '1978-11-13', 'membro025@demo.filadelfia.local', '(21) 93024-5024', 'MF-0025', 'Diaconato', 'Voluntário', '2024-11-07', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Ana Queiroz', 'Masculino', '1979-06-12', 'membro026@demo.filadelfia.local', '(21) 93025-5025', 'MF-0026', 'Secretaria', 'Auxiliar', '2024-11-12', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Bruno Teixeira', 'Feminino', '1980-01-09', 'membro027@demo.filadelfia.local', '(21) 93026-5026', 'MF-0027', 'Tesouraria', 'Integrante', '2024-11-17', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Carla Barros', 'Masculino', '1980-08-07', 'membro028@demo.filadelfia.local', '(21) 93027-5027', 'MF-0028', 'Comunicação', 'Voluntário', '2024-11-22', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Daniel Esteves', 'Feminino', '1981-03-06', 'membro029@demo.filadelfia.local', '(21) 93028-5028', 'MF-0029', 'Louvor', 'Integrante', '2024-11-27', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Elaine Henriques', 'Masculino', '1981-10-03', 'membro030@demo.filadelfia.local', '(21) 93029-5029', 'MF-0030', 'Mídia', 'Integrante', '2024-12-02', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Felipe Lima', 'Feminino', '1982-05-02', 'membro031@demo.filadelfia.local', '(21) 93030-5030', 'MF-0031', 'Eventos', 'Auxiliar', '2024-12-07', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Gabriela Oliveira', 'Masculino', '1982-11-29', 'membro032@demo.filadelfia.local', '(21) 93031-5031', 'MF-0032', 'Kids', 'Integrante', '2024-12-12', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Henrique Ribeiro', 'Feminino', '1983-06-28', 'membro033@demo.filadelfia.local', '(21) 93032-5032', 'MF-0033', 'Jovens', 'Integrante', '2024-12-17', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Isabela Vasconcelos', 'Masculino', '1984-01-25', 'membro034@demo.filadelfia.local', '(21) 93033-5033', 'MF-0034', 'Casais', 'Voluntário', '2024-12-22', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('João Cardoso', 'Feminino', '1984-08-23', 'membro035@demo.filadelfia.local', '(21) 93034-5034', 'MF-0035', 'Ação Social', 'Integrante', '2024-12-27', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Karen Ferreira', 'Masculino', '1985-03-22', 'membro036@demo.filadelfia.local', '(21) 93035-5035', 'MF-0036', 'Intercessão', 'Auxiliar', '2025-01-01', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Lucas Igrejas', 'Feminino', '1985-10-19', 'membro037@demo.filadelfia.local', '(21) 93036-5036', 'MF-0037', 'Ensino / EBD', 'Voluntário', '2025-01-06', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Mariana Moraes', 'Masculino', '1986-05-18', 'membro038@demo.filadelfia.local', '(21) 93037-5037', 'MF-0038', 'Recepção', 'Integrante', '2025-01-11', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Natan Pereira', 'Feminino', '1986-12-15', 'membro039@demo.filadelfia.local', '(21) 93038-5038', 'MF-0039', 'Diaconato', 'Integrante', '2025-01-16', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Olívia Silva', 'Masculino', '1987-07-14', 'membro040@demo.filadelfia.local', '(21) 93039-5039', 'MF-0040', 'Secretaria', 'Voluntário', '2025-01-21', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Pedro Almeida', 'Feminino', '1988-02-10', 'membro041@demo.filadelfia.local', '(21) 93040-5040', 'MF-0041', 'Tesouraria', 'Auxiliar', '2025-01-26', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Quitéria Dias', 'Masculino', '1988-09-08', 'membro042@demo.filadelfia.local', '(21) 93041-5041', 'MF-0042', 'Comunicação', 'Integrante', '2025-01-31', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Rafael Gomes', 'Feminino', '1989-04-07', 'membro043@demo.filadelfia.local', '(21) 93042-5042', 'MF-0043', 'Louvor', 'Voluntário', '2025-02-05', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Sara Jesus', 'Masculino', '1989-11-04', 'membro044@demo.filadelfia.local', '(21) 93043-5043', 'MF-0044', 'Mídia', 'Integrante', '2025-02-10', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Tiago Nascimento', 'Feminino', '1990-06-03', 'membro045@demo.filadelfia.local', '(21) 93044-5044', 'MF-0045', 'Eventos', 'Integrante', '2025-02-15', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Úrsula Queiroz', 'Masculino', '1990-12-31', 'membro046@demo.filadelfia.local', '(21) 93045-5045', 'MF-0046', 'Kids', 'Auxiliar', '2025-02-20', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Vinícius Teixeira', 'Feminino', '1991-07-30', 'membro047@demo.filadelfia.local', '(21) 93046-5046', 'MF-0047', 'Jovens', 'Integrante', '2025-02-25', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Wanessa Barros', 'Masculino', '1992-02-26', 'membro048@demo.filadelfia.local', '(21) 93047-5047', 'MF-0048', 'Casais', 'Integrante', '2025-03-02', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Yasmin Esteves', 'Feminino', '1992-09-24', 'membro049@demo.filadelfia.local', '(21) 93048-5048', 'MF-0049', 'Ação Social', 'Voluntário', '2025-03-07', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Zaqueu Henriques', 'Masculino', '1993-04-23', 'membro050@demo.filadelfia.local', '(21) 93049-5049', 'MF-0050', 'Intercessão', 'Integrante', '2025-03-12', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Ana Lima', 'Feminino', '1993-11-20', 'membro051@demo.filadelfia.local', '(21) 93050-5050', 'MF-0051', 'Ensino / EBD', 'Auxiliar', '2025-03-17', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Bruno Oliveira', 'Masculino', '1994-06-19', 'membro052@demo.filadelfia.local', '(21) 93051-5051', 'MF-0052', 'Recepção', 'Voluntário', '2025-03-22', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Carla Ribeiro', 'Feminino', '1995-01-16', 'membro053@demo.filadelfia.local', '(21) 93052-5052', 'MF-0053', 'Diaconato', 'Integrante', '2025-03-27', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Daniel Vasconcelos', 'Masculino', '1995-08-15', 'membro054@demo.filadelfia.local', '(21) 93053-5053', 'MF-0054', 'Secretaria', 'Integrante', '2025-04-01', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Elaine Cardoso', 'Feminino', '1996-03-13', 'membro055@demo.filadelfia.local', '(21) 93054-5054', 'MF-0055', 'Tesouraria', 'Voluntário', '2025-04-06', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Felipe Ferreira', 'Masculino', '1996-10-10', 'membro056@demo.filadelfia.local', '(21) 93055-5055', 'MF-0056', 'Comunicação', 'Auxiliar', '2025-04-11', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Gabriela Igrejas', 'Feminino', '1997-05-09', 'membro057@demo.filadelfia.local', '(21) 93056-5056', 'MF-0057', 'Louvor', 'Integrante', '2025-04-16', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Henrique Moraes', 'Masculino', '1997-12-06', 'membro058@demo.filadelfia.local', '(21) 93057-5057', 'MF-0058', 'Mídia', 'Voluntário', '2025-04-21', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Isabela Pereira', 'Feminino', '1998-07-05', 'membro059@demo.filadelfia.local', '(21) 93058-5058', 'MF-0059', 'Eventos', 'Integrante', '2025-04-26', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('João Silva', 'Masculino', '1999-02-01', 'membro060@demo.filadelfia.local', '(21) 93059-5059', 'MF-0060', 'Kids', 'Integrante', '2025-05-01', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Karen Almeida', 'Feminino', '1999-08-31', 'membro061@demo.filadelfia.local', '(21) 93060-5060', 'MF-0061', 'Jovens', 'Auxiliar', '2025-05-06', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Lucas Dias', 'Masculino', '2000-03-29', 'membro062@demo.filadelfia.local', '(21) 93061-5061', 'MF-0062', 'Casais', 'Integrante', '2025-05-11', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Mariana Gomes', 'Feminino', '2000-10-26', 'membro063@demo.filadelfia.local', '(21) 93062-5062', 'MF-0063', 'Ação Social', 'Integrante', '2025-05-16', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Natan Jesus', 'Masculino', '2001-05-25', 'membro064@demo.filadelfia.local', '(21) 93063-5063', 'MF-0064', 'Intercessão', 'Voluntário', '2025-05-21', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Olívia Nascimento', 'Feminino', '2001-12-22', 'membro065@demo.filadelfia.local', '(21) 93064-5064', 'MF-0065', 'Ensino / EBD', 'Integrante', '2025-05-26', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Pedro Queiroz', 'Masculino', '2002-07-21', 'membro066@demo.filadelfia.local', '(21) 93065-5065', 'MF-0066', 'Recepção', 'Auxiliar', '2025-05-31', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Quitéria Teixeira', 'Feminino', '2003-02-17', 'membro067@demo.filadelfia.local', '(21) 93066-5066', 'MF-0067', 'Diaconato', 'Voluntário', '2025-06-05', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Rafael Barros', 'Masculino', '2003-09-16', 'membro068@demo.filadelfia.local', '(21) 93067-5067', 'MF-0068', 'Secretaria', 'Integrante', '2025-06-10', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Sara Esteves', 'Feminino', '2004-04-14', 'membro069@demo.filadelfia.local', '(21) 93068-5068', 'MF-0069', 'Tesouraria', 'Integrante', '2025-06-15', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Tiago Henriques', 'Masculino', '2004-11-11', 'membro070@demo.filadelfia.local', '(21) 93069-5069', 'MF-0070', 'Comunicação', 'Voluntário', '2025-06-20', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Úrsula Lima', 'Feminino', '2005-06-10', 'membro071@demo.filadelfia.local', '(21) 93070-5070', 'MF-0071', 'Louvor', 'Auxiliar', '2025-06-25', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Vinícius Oliveira', 'Masculino', '2006-01-07', 'membro072@demo.filadelfia.local', '(21) 93071-5071', 'MF-0072', 'Mídia', 'Integrante', '2025-06-30', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Wanessa Ribeiro', 'Feminino', '2006-08-06', 'membro073@demo.filadelfia.local', '(21) 93072-5072', 'MF-0073', 'Eventos', 'Voluntário', '2025-07-05', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Yasmin Vasconcelos', 'Masculino', '2007-03-05', 'membro074@demo.filadelfia.local', '(21) 93073-5073', 'MF-0074', 'Kids', 'Integrante', '2025-07-10', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Zaqueu Cardoso', 'Feminino', '2007-10-02', 'membro075@demo.filadelfia.local', '(21) 93074-5074', 'MF-0075', 'Jovens', 'Integrante', '2025-07-15', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Ana Ferreira', 'Masculino', '2008-04-30', 'membro076@demo.filadelfia.local', '(21) 93075-5075', 'MF-0076', 'Casais', 'Auxiliar', '2025-07-20', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Bruno Igrejas', 'Feminino', '2008-11-27', 'membro077@demo.filadelfia.local', '(21) 93076-5076', 'MF-0077', 'Ação Social', 'Integrante', '2025-07-25', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Carla Moraes', 'Masculino', '2009-06-26', 'membro078@demo.filadelfia.local', '(21) 93077-5077', 'MF-0078', 'Intercessão', 'Integrante', '2025-07-30', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Daniel Pereira', 'Feminino', '2010-01-23', 'membro079@demo.filadelfia.local', '(21) 93078-5078', 'MF-0079', 'Ensino / EBD', 'Voluntário', '2025-08-04', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Elaine Silva', 'Masculino', '2010-08-22', 'membro080@demo.filadelfia.local', '(21) 93079-5079', 'MF-0080', 'Recepção', 'Integrante', '2025-08-09', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Felipe Almeida', 'Feminino', '2011-03-21', 'membro081@demo.filadelfia.local', '(21) 93080-5080', 'MF-0081', 'Diaconato', 'Auxiliar', '2025-08-14', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Gabriela Dias', 'Masculino', '2011-10-18', 'membro082@demo.filadelfia.local', '(21) 93081-5081', 'MF-0082', 'Secretaria', 'Voluntário', '2025-08-19', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Henrique Gomes', 'Feminino', '2012-05-16', 'membro083@demo.filadelfia.local', '(21) 93082-5082', 'MF-0083', 'Tesouraria', 'Integrante', '2025-08-24', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Isabela Jesus', 'Masculino', '2012-12-13', 'membro084@demo.filadelfia.local', '(21) 93083-5083', 'MF-0084', 'Comunicação', 'Integrante', '2025-08-29', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('João Nascimento', 'Feminino', '2013-07-12', 'membro085@demo.filadelfia.local', '(21) 93084-5084', 'MF-0085', 'Louvor', 'Voluntário', '2025-09-03', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Karen Queiroz', 'Masculino', '2014-02-08', 'membro086@demo.filadelfia.local', '(21) 93085-5085', 'MF-0086', 'Mídia', 'Auxiliar', '2025-09-08', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Lucas Teixeira', 'Feminino', '2014-09-07', 'membro087@demo.filadelfia.local', '(21) 93086-5086', 'MF-0087', 'Eventos', 'Integrante', '2025-09-13', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Mariana Barros', 'Masculino', '2015-04-06', 'membro088@demo.filadelfia.local', '(21) 93087-5087', 'MF-0088', 'Kids', 'Voluntário', '2025-09-18', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Natan Esteves', 'Feminino', '2015-11-03', 'membro089@demo.filadelfia.local', '(21) 93088-5088', 'MF-0089', 'Jovens', 'Integrante', '2025-09-23', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Olívia Henriques', 'Masculino', '2016-06-01', 'membro090@demo.filadelfia.local', '(21) 93089-5089', 'MF-0090', 'Casais', 'Integrante', '2025-09-28', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Pedro Lima', 'Feminino', '2016-12-29', 'membro091@demo.filadelfia.local', '(21) 93090-5090', 'MF-0091', 'Ação Social', 'Auxiliar', '2025-10-03', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Quitéria Oliveira', 'Masculino', '2017-07-28', 'membro092@demo.filadelfia.local', '(21) 93091-5091', 'MF-0092', 'Intercessão', 'Integrante', '2025-10-08', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Rafael Ribeiro', 'Feminino', '2018-02-24', 'membro093@demo.filadelfia.local', '(21) 93092-5092', 'MF-0093', 'Ensino / EBD', 'Integrante', '2025-10-13', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Sara Vasconcelos', 'Masculino', '2018-09-23', 'membro094@demo.filadelfia.local', '(21) 93093-5093', 'MF-0094', 'Recepção', 'Voluntário', '2025-10-18', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Tiago Cardoso', 'Feminino', '2019-04-22', 'membro095@demo.filadelfia.local', '(21) 93094-5094', 'MF-0095', 'Diaconato', 'Integrante', '2025-10-23', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Úrsula Ferreira', 'Masculino', '2019-11-19', 'membro096@demo.filadelfia.local', '(21) 93095-5095', 'MF-0096', 'Secretaria', 'Auxiliar', '2025-10-28', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Vinícius Igrejas', 'Feminino', '2020-06-17', 'membro097@demo.filadelfia.local', '(21) 93096-5096', 'MF-0097', 'Tesouraria', 'Voluntário', '2025-11-02', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Wanessa Moraes', 'Masculino', '2021-01-14', 'membro098@demo.filadelfia.local', '(21) 93097-5097', 'MF-0098', 'Comunicação', 'Integrante', '2025-11-07', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Yasmin Pereira', 'Feminino', '2021-08-13', 'membro099@demo.filadelfia.local', '(21) 93098-5098', 'MF-0099', 'Louvor', 'Integrante', '2025-11-12', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Zaqueu Silva', 'Masculino', '2022-03-12', 'membro100@demo.filadelfia.local', '(21) 93099-5099', 'MF-0100', 'Mídia', 'Voluntário', '2025-11-17', 'Membro', false, 'admin', '[DEMO] Membro fictício para teste de telas.'),
  ('Henrique Visitante Almeida', 'Feminino', '1990-01-01', 'visitante01@demo.filadelfia.local', '(21) 97000-8000', null, 'Recepção', 'Visitante', '2026-06-30', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Isabela Visitante Cardoso', 'Masculino', '1990-11-14', 'visitante02@demo.filadelfia.local', '(21) 97001-8001', null, 'Recepção', 'Visitante', '2026-06-29', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('João Visitante Esteves', 'Feminino', '1991-09-27', 'visitante03@demo.filadelfia.local', '(21) 97002-8002', null, 'Recepção', 'Visitante', '2026-06-28', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Karen Visitante Gomes', 'Masculino', '1992-08-09', 'visitante04@demo.filadelfia.local', '(21) 97003-8003', null, 'Recepção', 'Visitante', '2026-06-27', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Lucas Visitante Igrejas', 'Feminino', '1993-06-22', 'visitante05@demo.filadelfia.local', '(21) 97004-8004', null, 'Recepção', 'Visitante', '2026-06-26', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Mariana Visitante Lima', 'Masculino', '1994-05-05', 'visitante06@demo.filadelfia.local', '(21) 97005-8005', null, 'Recepção', 'Visitante', '2026-06-25', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Natan Visitante Nascimento', 'Feminino', '1995-03-18', 'visitante07@demo.filadelfia.local', '(21) 97006-8006', null, 'Recepção', 'Visitante', '2026-06-24', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Olívia Visitante Pereira', 'Masculino', '1996-01-29', 'visitante08@demo.filadelfia.local', '(21) 97007-8007', null, 'Recepção', 'Visitante', '2026-06-23', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Pedro Visitante Ribeiro', 'Feminino', '1996-12-11', 'visitante09@demo.filadelfia.local', '(21) 97008-8008', null, 'Recepção', 'Visitante', '2026-06-22', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Quitéria Visitante Teixeira', 'Masculino', '1997-10-24', 'visitante10@demo.filadelfia.local', '(21) 97009-8009', null, 'Recepção', 'Visitante', '2026-06-21', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Rafael Visitante Almeida', 'Feminino', '1998-09-06', 'visitante11@demo.filadelfia.local', '(21) 97010-8010', null, 'Recepção', 'Visitante', '2026-06-20', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Sara Visitante Cardoso', 'Masculino', '1999-07-20', 'visitante12@demo.filadelfia.local', '(21) 97011-8011', null, 'Recepção', 'Visitante', '2026-06-19', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Tiago Visitante Esteves', 'Feminino', '2000-06-01', 'visitante13@demo.filadelfia.local', '(21) 97012-8012', null, 'Recepção', 'Visitante', '2026-06-18', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Úrsula Visitante Gomes', 'Masculino', '2001-04-14', 'visitante14@demo.filadelfia.local', '(21) 97013-8013', null, 'Recepção', 'Visitante', '2026-06-17', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Vinícius Visitante Igrejas', 'Feminino', '2002-02-25', 'visitante15@demo.filadelfia.local', '(21) 97014-8014', null, 'Recepção', 'Visitante', '2026-06-16', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Wanessa Visitante Lima', 'Masculino', '2003-01-08', 'visitante16@demo.filadelfia.local', '(21) 97015-8015', null, 'Recepção', 'Visitante', '2026-06-15', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Yasmin Visitante Nascimento', 'Feminino', '2003-11-21', 'visitante17@demo.filadelfia.local', '(21) 97016-8016', null, 'Recepção', 'Visitante', '2026-06-14', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Zaqueu Visitante Pereira', 'Masculino', '2004-10-03', 'visitante18@demo.filadelfia.local', '(21) 97017-8017', null, 'Recepção', 'Visitante', '2026-06-13', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Ana Visitante Ribeiro', 'Feminino', '2005-08-16', 'visitante19@demo.filadelfia.local', '(21) 97018-8018', null, 'Recepção', 'Visitante', '2026-06-12', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.'),
  ('Bruno Visitante Teixeira', 'Masculino', '2006-06-29', 'visitante20@demo.filadelfia.local', '(21) 97019-8019', null, 'Recepção', 'Visitante', '2026-06-11', 'Visitante', false, 'public_link', '[DEMO] Visitante mensal vindo do link público.')
) as v(name, gender, birth_date, email, phone, registration, department, ministry_role, entry_date, status, is_leader, source, notes)
where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede';

-- Cultos fixos das próximas 12 semanas.
insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location_church_unit_id, location, audience, capacity, registration_status, owner, contact, description)
select current_setting('app.demo_org_id')::uuid, '[DEMO] Culto de Ensino - Quinta', 'Culto especial', 'Ativo', 'Ensino / EBD', d::date, '19:30'::time, 2, 'hours', c.id, c.name, 'Toda igreja', 180, 'closed', 'Pr. Daniel Auxiliar', c.phone, '[DEMO] Culto semanal de quinta-feira.'
from public.church_units c, generate_series(current_date, current_date + interval '84 days', interval '1 day') d
where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede' and extract(dow from d) = 4;
insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location_church_unit_id, location, audience, capacity, registration_status, owner, contact, description)
select current_setting('app.demo_org_id')::uuid, '[DEMO] Culto da Família - Domingo', 'Culto especial', 'Ativo', 'Diaconato', d::date, '18:45'::time, 2, 'hours', c.id, c.name, 'Toda igreja', 220, 'closed', 'Pr. Samuel Presidente', c.phone, '[DEMO] Culto semanal de domingo.'
from public.church_units c, generate_series(current_date, current_date + interval '84 days', interval '1 day') d
where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede' and extract(dow from d) = 0;

insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location, audience, capacity, registration_status, owner, contact, description)
values
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Congresso de Jovens', 'Congresso', 'Ativo', 'Jovens', current_date + 18, '18:30', 3, 'hours', '[DEMO] Filadélfia - Sede', 'Jovens', 160, 'open', 'Líder de Jovens Demo', '(21) 99999-1001', '[DEMO] Evento de jovens com inscrição aberta.'),
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Encontro de Casais', 'Encontro', 'Ativo', 'Casais', current_date + 31, '19:00', 3, 'hours', '[DEMO] Filadélfia - Sede', 'Casais', 80, 'open', 'Líder de Casais Demo', '(21) 99999-1001', '[DEMO] Encontro mensal de casais.'),
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Treinamento Kids', 'Reunião', 'Ativo', 'Kids', current_date + 10, '09:00', 4, 'hours', '[DEMO] Filadélfia - Sede', 'Liderança', 40, 'soon', 'Líder Kids Demo', '(21) 99999-1001', '[DEMO] Capacitação da equipe Kids.'),
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Ação Social no Bairro', 'Ação social', 'Ativo', 'Ação Social', current_date + 24, '08:00', 5, 'hours', 'Praça Central', 'Toda igreja', 120, 'open', 'Líder de Ação Social Demo', '(21) 99999-1001', '[DEMO] Atendimento e arrecadação social.');

insert into public.messages (organization_id, title, audience, message, published)
values
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Agenda da semana', 'Toda igreja', 'Quinta 19:30 culto de ensino e Domingo 18:45 culto da família.', true),
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Escala de voluntários', 'Líderes', 'Departamentos devem confirmar suas escalas até quarta-feira.', true),
  (current_setting('app.demo_org_id')::uuid, '[DEMO] Kids em funcionamento', 'Kids', 'Check-in Kids aberto 30 minutos antes dos cultos.', true);

insert into public.pastoral_requests (organization_id, requester_name, requester_email, type, urgency, message, confidential, status)
select current_setting('app.demo_org_id')::uuid, name, email, case when row_number() over () % 3 = 0 then 'Visita' else 'Oração' end, case when row_number() over () % 5 = 0 then 'Urgente' else 'Normal' end, '[DEMO] Pedido pastoral simulado para teste de fluxo.', true, 'open'
from public.members where organization_id = current_setting('app.demo_org_id')::uuid and email like '%@demo.filadelfia.local' limit 12;

-- Financeiro: média de 120 pessoas por culto, com dízimos mensais, ofertas por culto e despesas operacionais.
insert into public.financial_entries (organization_id, type, date, amount, category, counterparty_name, counterparty_registration, description, notes)
select current_setting('app.demo_org_id')::uuid, 'income', (date_trunc('month', current_date) - (m || ' months')::interval + ((row_number() over ()) % 25) * interval '1 day')::date, round((180 + random() * 720)::numeric, 2), '1.1.01 - Dízimos', name, registration, '[DEMO] Dízimo mensal simulado', '[DEMO] Base financeira fictícia.'
from generate_series(0, 2) m cross join (select name, registration from public.members where organization_id = current_setting('app.demo_org_id')::uuid and status = 'Membro' and email like '%@demo.filadelfia.local' limit 75) members;
insert into public.financial_entries (organization_id, type, date, amount, category, counterparty_name, description, notes)
select current_setting('app.demo_org_id')::uuid, 'income', d::date, round((120 * (4.5 + random() * 8.5))::numeric, 2), '1.1.02 - Ofertas Gerais', 'Culto com média de 120 pessoas', '[DEMO] Oferta de culto - média 120 pessoas', '[DEMO] Quinta 19:30 ou Domingo 18:45.'
from generate_series(current_date - interval '90 days', current_date, interval '1 day') d where extract(dow from d) in (0, 4);
insert into public.financial_entries (organization_id, type, date, amount, category, supplier_name, recipient_name, invoice_code, document_code, description, notes)
values
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 82, 3200.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-001', 'DOC-DEMO-001', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 55, 3240.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-002', 'DOC-DEMO-002', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 25, 3280.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-003', 'DOC-DEMO-003', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 72, 890.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-004', 'DOC-DEMO-004', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 42, 935.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-005', 'DOC-DEMO-005', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 12, 910.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-006', 'DOC-DEMO-006', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 20, 1450.00, '2.3.04 - Música e Mídia', 'Loja de Som Demo', 'Louvor e Mídia', 'NF-DEMO-007', 'DOC-DEMO-007', '[DEMO] Manutenção de som e média', '[DEMO] Investimento de departamento.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 9, 760.00, '2.3.01 - Ação Social / Assistência Social', 'Mercado Demo', 'Ação Social', 'NF-DEMO-008', 'DOC-DEMO-008', '[DEMO] Cestas básicas', '[DEMO] Ação social mensal.'),
  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 6, 520.00, '2.3.05 - Santa Ceia', 'Padaria Demo', 'Diaconato', 'NF-DEMO-009', 'DOC-DEMO-009', '[DEMO] Santa Ceia', '[DEMO] Material de ceia.');

commit;
