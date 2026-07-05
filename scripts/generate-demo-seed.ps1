$ErrorActionPreference = "Stop"

$departments = @(
  @{ Name = "Louvor"; Role = "Líder de Louvor"; UserRole = "worship"; Permissions = @("ministries", "events", "library", "messages", "mobile") },
  @{ Name = "Mídia"; Role = "Líder de Mídia"; UserRole = "media"; Permissions = @("events", "library", "messages", "mobile") },
  @{ Name = "Eventos"; Role = "Líder de Eventos"; UserRole = "events"; Permissions = @("events", "messages", "members") },
  @{ Name = "Kids"; Role = "Líder Kids"; UserRole = "kids"; Permissions = @("kids", "members", "messages") },
  @{ Name = "Jovens"; Role = "Líder de Jovens"; UserRole = "custom"; Permissions = @("groups", "events", "messages", "mobile") },
  @{ Name = "Casais"; Role = "Líder de Casais"; UserRole = "custom"; Permissions = @("groups", "events", "messages", "mobile") },
  @{ Name = "Ação Social"; Role = "Líder de Ação Social"; UserRole = "custom"; Permissions = @("members", "messages", "mobile") },
  @{ Name = "Intercessão"; Role = "Líder de Intercessão"; UserRole = "custom"; Permissions = @("pastoral", "messages", "mobile") },
  @{ Name = "Ensino / EBD"; Role = "Superintendente EBD"; UserRole = "custom"; Permissions = @("library", "messages", "mobile") },
  @{ Name = "Recepção"; Role = "Líder de Recepção"; UserRole = "custom"; Permissions = @("members", "events") },
  @{ Name = "Diaconato"; Role = "Coordenador de Diaconato"; UserRole = "custom"; Permissions = @("members", "events", "pastoral") },
  @{ Name = "Secretaria"; Role = "Secretário"; UserRole = "custom"; Permissions = @("members", "churches", "events") },
  @{ Name = "Tesouraria"; Role = "Tesoureiro"; UserRole = "treasury"; Permissions = @("finance") },
  @{ Name = "Comunicação"; Role = "Líder de Comunicação"; UserRole = "media"; Permissions = @("events", "library", "messages", "mobile") }
)

$firstNames = @("Ana","Bruno","Carla","Daniel","Elaine","Felipe","Gabriela","Henrique","Isabela","João","Karen","Lucas","Mariana","Natan","Olívia","Pedro","Quitéria","Rafael","Sara","Tiago","Úrsula","Vinícius","Wanessa","Yasmin","Zaqueu")
$lastNames = @("Almeida","Barros","Cardoso","Dias","Esteves","Ferreira","Gomes","Henriques","Igrejas","Jesus","Lima","Moraes","Nascimento","Oliveira","Pereira","Queiroz","Ribeiro","Silva","Teixeira","Vasconcelos")

function SqlText($value) {
  if ($null -eq $value -or $value -eq "") { return "null" }
  return "'" + ([string]$value).Replace("'", "''") + "'"
}

function PgArray($items) {
  return "array[" + (($items | ForEach-Object { SqlText $_ }) -join ", ") + "]"
}

$adminRows = @(
  @{ Name="Pr. Samuel Presidente"; Email="pastor.presidente@demo.filadelfia.local"; Role="pastor_presidente"; Permissions=@("access","members","pastoral","churches","groups","ministries","events","kids","finance","library","messages","mobile","settings") },
  @{ Name="Pr. Marcos Vice"; Email="pastor.vice@demo.filadelfia.local"; Role="pastor_vice_presidente"; Permissions=@("access","members","pastoral","churches","groups","ministries","events","kids","finance","library","messages","mobile","settings") },
  @{ Name="Pr. Daniel Auxiliar"; Email="pastor.auxiliar@demo.filadelfia.local"; Role="pastor_auxiliar"; Permissions=@("pastoral","members","events","messages","mobile") }
)

foreach ($dept in $departments) {
  $slug = ($dept.Name.Normalize([Text.NormalizationForm]::FormD) -replace "\p{Mn}", "").ToLower() -replace "[^a-z0-9]+", "."; $slug = $slug.Trim(".")
  $adminRows += @{
    Name = "$($dept.Role) Demo"
    Email = "$slug@demo.filadelfia.local"
    Role = $dept.UserRole
    Permissions = $dept.Permissions
  }
}

$memberRows = @()
foreach ($admin in $adminRows) {
  $dept = if ($admin.Name -match "Pastor|Pr\.") { "Pastoral" } else { ($departments | Where-Object { $admin.Name -like "$($_.Role)*" } | Select-Object -First 1).Name }
  if (-not $dept) { $dept = "Administração" }
  $role = if ($admin.Name -match "Pastor|Pr\.") { $admin.Role } else { ($departments | Where-Object { $admin.Name -like "$($_.Role)*" } | Select-Object -First 1).Role }
  $memberRows += @{
    Name=$admin.Name; Email=$admin.Email; Phone="(21) 9$('{0:0000}' -f ($memberRows.Count + 1000))-$('{0:0000}' -f ($memberRows.Count + 2000))"
    Gender= if (($memberRows.Count % 2) -eq 0) { "Masculino" } else { "Feminino" }
    BirthDate=(Get-Date "1980-01-01").AddDays($memberRows.Count * 430).ToString("yyyy-MM-dd")
    Registration="MF-$('{0:0000}' -f ($memberRows.Count + 1))"; Department=$dept; MinistryRole=$role
    EntryDate=(Get-Date).AddDays(-900 + ($memberRows.Count * 11)).ToString("yyyy-MM-dd"); Status="Membro"; Leader=$true; Source="admin"; Notes="[DEMO] Liderança criada para simulação."
  }
}

for ($i = $memberRows.Count; $i -lt 100; $i++) {
  $dept = $departments[$i % $departments.Count]
  $name = "$($firstNames[$i % $firstNames.Count]) $($lastNames[($i * 3) % $lastNames.Count])"
  $memberRows += @{
    Name=$name; Email=("membro{0:000}@demo.filadelfia.local" -f ($i + 1)); Phone="(21) 9$('{0:0000}' -f (3000 + $i))-$('{0:0000}' -f (5000 + $i))"
    Gender= if (($i % 2) -eq 0) { "Feminino" } else { "Masculino" }
    BirthDate=(Get-Date "1965-01-01").AddDays($i * 211).ToString("yyyy-MM-dd")
    Registration="MF-$('{0:0000}' -f ($i + 1))"; Department=$dept.Name; MinistryRole= if (($i % 5) -eq 0) { "Auxiliar" } elseif (($i % 3) -eq 0) { "Voluntário" } else { "Integrante" }
    EntryDate=(Get-Date).AddDays(-720 + ($i * 5)).ToString("yyyy-MM-dd"); Status="Membro"; Leader=$false; Source="admin"; Notes="[DEMO] Membro fictício para teste de telas."
  }
}

for ($i = 0; $i -lt 20; $i++) {
  $name = "$($firstNames[($i + 7) % $firstNames.Count]) Visitante $($lastNames[($i * 2) % $lastNames.Count])"
  $memberRows += @{
    Name=$name; Email=("visitante{0:00}@demo.filadelfia.local" -f ($i + 1)); Phone="(21) 9$('{0:0000}' -f (7000 + $i))-$('{0:0000}' -f (8000 + $i))"
    Gender= if (($i % 2) -eq 0) { "Feminino" } else { "Masculino" }
    BirthDate=(Get-Date "1990-01-01").AddDays($i * 317).ToString("yyyy-MM-dd")
    Registration=$null; Department="Recepção"; MinistryRole="Visitante"
    EntryDate=(Get-Date).AddDays(-1 * ($i % 28)).ToString("yyyy-MM-dd"); Status="Visitante"; Leader=$false; Source="public_link"; Notes="[DEMO] Visitante mensal vindo do link público."
  }
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("-- Demo seed Ministerio Filadelfia")
$lines.Add("-- Execute no SQL Editor do Supabase depois do schema.sql.")
$lines.Add("begin;")
$lines.Add("select set_config('app.demo_org_id', (select id::text from public.organizations order by created_at limit 1), false);")
$lines.Add("")
$lines.Add("-- Limpeza apenas dos dados DEMO.")
$lines.Add("delete from public.financial_entries where organization_id = current_setting('app.demo_org_id')::uuid and (description like '[DEMO]%' or notes like '[DEMO]%');")
$lines.Add("delete from public.pastoral_requests where organization_id = current_setting('app.demo_org_id')::uuid and message like '[DEMO]%';")
$lines.Add("delete from public.messages where organization_id = current_setting('app.demo_org_id')::uuid and title like '[DEMO]%';")
$lines.Add("delete from public.events where organization_id = current_setting('app.demo_org_id')::uuid and title like '[DEMO]%';")
$lines.Add("delete from public.members where organization_id = current_setting('app.demo_org_id')::uuid and (email like '%@demo.filadelfia.local' or notes like '[DEMO]%');")
$lines.Add("delete from public.app_users where organization_id = current_setting('app.demo_org_id')::uuid and email like '%@demo.filadelfia.local';")
$lines.Add("delete from public.church_units where organization_id = current_setting('app.demo_org_id')::uuid and name like '[DEMO]%';")
$lines.Add("")
$lines.Add("insert into public.church_units (organization_id, name, pastor, phone, address, city, state, status, service_time, lat, lng)")
$lines.Add("values (current_setting('app.demo_org_id')::uuid, '[DEMO] Filadélfia - Sede', 'Pr. Samuel Presidente', '(21) 99999-1001', 'Rua da Assembleia, 100 - Centro', 'São Gonçalo', 'RJ', 'Ativa', 'Quinta 19:30 e Domingo 18:45', -22.8268000, -43.0634000);")
$lines.Add("")
$lines.Add("insert into public.app_users (organization_id, name, email, role, permissions, status)")
$lines.Add("values")
$adminValues = @()
foreach ($admin in $adminRows) {
  $adminValues += "  (current_setting('app.demo_org_id')::uuid, $(SqlText $admin.Name), $(SqlText $admin.Email), $(SqlText $admin.Role), $(PgArray $admin.Permissions), 'active')"
}
$lines.Add(($adminValues -join ",`n") + ";")
$lines.Add("")
$lines.Add("insert into public.members (organization_id, church_unit_id, name, gender, birth_date, email, phone, registration, department, ministry_role, entry_date, status, is_leader, source, notes)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, c.id, v.name, v.gender, v.birth_date::date, v.email::citext, v.phone, v.registration, v.department, v.ministry_role, v.entry_date::date, v.status, v.is_leader, v.source, v.notes")
$lines.Add("from public.church_units c")
$lines.Add("cross join (values")
$memberValues = @()
foreach ($m in $memberRows) {
  $leader = if ($m.Leader) { "true" } else { "false" }
  $memberValues += "  ($(SqlText $m.Name), $(SqlText $m.Gender), $(SqlText $m.BirthDate), $(SqlText $m.Email), $(SqlText $m.Phone), $(SqlText $m.Registration), $(SqlText $m.Department), $(SqlText $m.MinistryRole), $(SqlText $m.EntryDate), $(SqlText $m.Status), $leader, $(SqlText $m.Source), $(SqlText $m.Notes))"
}
$lines.Add(($memberValues -join ",`n"))
$lines.Add(") as v(name, gender, birth_date, email, phone, registration, department, ministry_role, entry_date, status, is_leader, source, notes)")
$lines.Add("where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede';")
$lines.Add("")
$lines.Add("-- Cultos fixos das próximas 12 semanas.")
$lines.Add("insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location_church_unit_id, location, audience, capacity, registration_status, owner, contact, description)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, '[DEMO] Culto de Ensino - Quinta', 'Culto especial', 'Ativo', 'Ensino / EBD', d::date, '19:30'::time, 2, 'hours', c.id, c.name, 'Toda igreja', 180, 'closed', 'Pr. Daniel Auxiliar', c.phone, '[DEMO] Culto semanal de quinta-feira.'")
$lines.Add("from public.church_units c, generate_series(current_date, current_date + interval '84 days', interval '1 day') d")
$lines.Add("where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede' and extract(dow from d) = 4;")
$lines.Add("insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location_church_unit_id, location, audience, capacity, registration_status, owner, contact, description)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, '[DEMO] Culto da Família - Domingo', 'Culto especial', 'Ativo', 'Diaconato', d::date, '18:45'::time, 2, 'hours', c.id, c.name, 'Toda igreja', 220, 'closed', 'Pr. Samuel Presidente', c.phone, '[DEMO] Culto semanal de domingo.'")
$lines.Add("from public.church_units c, generate_series(current_date, current_date + interval '84 days', interval '1 day') d")
$lines.Add("where c.organization_id = current_setting('app.demo_org_id')::uuid and c.name = '[DEMO] Filadélfia - Sede' and extract(dow from d) = 0;")
$lines.Add("")
$lines.Add("insert into public.events (organization_id, title, type, status, department, start_date, start_time, duration_value, duration_unit, location, audience, capacity, registration_status, owner, contact, description)")
$lines.Add("values")
$eventValues = @(
  "  (current_setting('app.demo_org_id')::uuid, '[DEMO] Congresso de Jovens', 'Congresso', 'Ativo', 'Jovens', current_date + 18, '18:30', 3, 'hours', '[DEMO] Filadélfia - Sede', 'Jovens', 160, 'open', 'Líder de Jovens Demo', '(21) 99999-1001', '[DEMO] Evento de jovens com inscrição aberta.')",
  "  (current_setting('app.demo_org_id')::uuid, '[DEMO] Encontro de Casais', 'Encontro', 'Ativo', 'Casais', current_date + 31, '19:00', 3, 'hours', '[DEMO] Filadélfia - Sede', 'Casais', 80, 'open', 'Líder de Casais Demo', '(21) 99999-1001', '[DEMO] Encontro mensal de casais.')",
  "  (current_setting('app.demo_org_id')::uuid, '[DEMO] Treinamento Kids', 'Reunião', 'Ativo', 'Kids', current_date + 10, '09:00', 4, 'hours', '[DEMO] Filadélfia - Sede', 'Liderança', 40, 'soon', 'Líder Kids Demo', '(21) 99999-1001', '[DEMO] Capacitação da equipe Kids.')",
  "  (current_setting('app.demo_org_id')::uuid, '[DEMO] Ação Social no Bairro', 'Ação social', 'Ativo', 'Ação Social', current_date + 24, '08:00', 5, 'hours', 'Praça Central', 'Toda igreja', 120, 'open', 'Líder de Ação Social Demo', '(21) 99999-1001', '[DEMO] Atendimento e arrecadação social.')"
)
$lines.Add(($eventValues -join ",`n") + ";")
$lines.Add("")
$lines.Add("insert into public.messages (organization_id, title, audience, message, published)")
$lines.Add("values")
$lines.Add("  (current_setting('app.demo_org_id')::uuid, '[DEMO] Agenda da semana', 'Toda igreja', 'Quinta 19:30 culto de ensino e Domingo 18:45 culto da família.', true),")
$lines.Add("  (current_setting('app.demo_org_id')::uuid, '[DEMO] Escala de voluntários', 'Líderes', 'Departamentos devem confirmar suas escalas até quarta-feira.', true),")
$lines.Add("  (current_setting('app.demo_org_id')::uuid, '[DEMO] Kids em funcionamento', 'Kids', 'Check-in Kids aberto 30 minutos antes dos cultos.', true);")
$lines.Add("")
$lines.Add("insert into public.pastoral_requests (organization_id, requester_name, requester_email, type, urgency, message, confidential, status)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, name, email, case when row_number() over () % 3 = 0 then 'Visita' else 'Oração' end, case when row_number() over () % 5 = 0 then 'Urgente' else 'Normal' end, '[DEMO] Pedido pastoral simulado para teste de fluxo.', true, 'open'")
$lines.Add("from public.members where organization_id = current_setting('app.demo_org_id')::uuid and email like '%@demo.filadelfia.local' limit 12;")
$lines.Add("")
$lines.Add("-- Financeiro: média de 120 pessoas por culto, com dízimos mensais, ofertas por culto e despesas operacionais.")
$lines.Add("insert into public.financial_entries (organization_id, type, date, amount, category, counterparty_name, counterparty_registration, description, notes)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, 'income', (date_trunc('month', current_date) - (m || ' months')::interval + ((row_number() over ()) % 25) * interval '1 day')::date, round((180 + random() * 720)::numeric, 2), '1.1.01 - Dízimos', name, registration, '[DEMO] Dízimo mensal simulado', '[DEMO] Base financeira fictícia.'")
$lines.Add("from generate_series(0, 2) m cross join (select name, registration from public.members where organization_id = current_setting('app.demo_org_id')::uuid and status = 'Membro' and email like '%@demo.filadelfia.local' limit 75) members;")
$lines.Add("insert into public.financial_entries (organization_id, type, date, amount, category, counterparty_name, description, notes)")
$lines.Add("select current_setting('app.demo_org_id')::uuid, 'income', d::date, round((120 * (4.5 + random() * 8.5))::numeric, 2), '1.1.02 - Ofertas Gerais', 'Culto com média de 120 pessoas', '[DEMO] Oferta de culto - média 120 pessoas', '[DEMO] Quinta 19:30 ou Domingo 18:45.'")
$lines.Add("from generate_series(current_date - interval '90 days', current_date, interval '1 day') d where extract(dow from d) in (0, 4);")
$lines.Add("insert into public.financial_entries (organization_id, type, date, amount, category, supplier_name, recipient_name, invoice_code, document_code, description, notes)")
$lines.Add("values")
$expenseRows = @(
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 82, 3200.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-001', 'DOC-DEMO-001', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 55, 3240.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-002', 'DOC-DEMO-002', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 25, 3280.00, '2.2.01 - Aluguel do Imóvel', 'Imobiliária Demo', 'Administração', 'NF-DEMO-003', 'DOC-DEMO-003', '[DEMO] Aluguel mensal', '[DEMO] Despesa operacional fixa.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 72, 890.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-004', 'DOC-DEMO-004', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 42, 935.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-005', 'DOC-DEMO-005', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 12, 910.00, '2.2.02 - Contas de Consumo', 'Concessionária de Energia', 'Administração', 'NF-DEMO-006', 'DOC-DEMO-006', '[DEMO] Energia elétrica', '[DEMO] Despesa mensal.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 20, 1450.00, '2.3.04 - Música e Mídia', 'Loja de Som Demo', 'Louvor e Mídia', 'NF-DEMO-007', 'DOC-DEMO-007', '[DEMO] Manutenção de som e média', '[DEMO] Investimento de departamento.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 9, 760.00, '2.3.01 - Ação Social / Assistência Social', 'Mercado Demo', 'Ação Social', 'NF-DEMO-008', 'DOC-DEMO-008', '[DEMO] Cestas básicas', '[DEMO] Ação social mensal.')",
  "  (current_setting('app.demo_org_id')::uuid, 'expense', current_date - 6, 520.00, '2.3.05 - Santa Ceia', 'Padaria Demo', 'Diaconato', 'NF-DEMO-009', 'DOC-DEMO-009', '[DEMO] Santa Ceia', '[DEMO] Material de ceia.')"
)
$lines.Add(($expenseRows -join ",`n") + ";")
$lines.Add("")
$lines.Add("commit;")

Set-Content -Path "supabase/seed-demo.sql" -Value ($lines -join [Environment]::NewLine) -Encoding UTF8
Write-Host "Gerado supabase/seed-demo.sql com $($memberRows.Count) pessoas, $($adminRows.Count) usuários admin e financeiro simulado."
