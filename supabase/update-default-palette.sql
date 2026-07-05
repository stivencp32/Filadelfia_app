-- Atualiza a paleta padrão da organização atual.
update public.organizations
set
  primary_color = '#095c85',
  brand_color = '#07354b',
  accent_color = '#5c8fc9',
  background_color = '#f3f3fb',
  updated_at = now();
