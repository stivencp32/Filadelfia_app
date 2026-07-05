# Ministério Filadélfia App

Protótipo web estático inspirado na demonstração em vídeo e adaptado para a identidade visual da Assembleia de Deus Ministério Filadélfia.

## Como abrir

Abra `index.html` diretamente no navegador.

Também é possível servir localmente com Python:

```powershell
python -m http.server 8000
```

## Supabase

O ambiente de banco foi preparado em `supabase/`:

- `supabase/schema.sql`: query completa para criar tabelas, indices, seeds iniciais e politicas RLS.
- `supabase/README.md`: passo a passo para executar no Supabase e criar o primeiro administrador.
- `supabase/migration-map.md`: mapa entre o `state` atual do app e as tabelas novas.
- `supabase.config.example.js`: template de configuracao do front-end. Copie para `supabase.config.js` e preencha com URL e anon key.

O app ainda usa o estado local/servidor local nesta etapa. A proxima etapa e ligar `loadState`/`saveState` ao Supabase.

## Publicacao no GitHub Pages

O app pode ser publicado no GitHub Pages porque a aplicacao principal e estatica:
`index.html`, `styles.css`, `app.js`, `assets/` e os scripts do Supabase rodam direto no navegador.

Pontos importantes antes de publicar:

- O GitHub Pages nao executa `server.py`; em producao os dados devem vir do Supabase.
- O arquivo `supabase.config.js` precisa existir no site publicado, porque ele informa a URL e a anon key publica do Supabase.
- Nunca publique uma `service_role key`. A anon key e esperada em apps de navegador, desde que as politicas RLS estejam corretas.
- Se o repositorio for publico, revise arquivos locais antes do commit. `filadelfia_state.json`, logs do tunnel e `.env` ficam ignorados pelo Git.

Fluxo sugerido:

```powershell
git init
git add .
git add -f supabase.config.js
git commit -m "Publica app Filadelfia"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/filadelfia-app.git
git push -u origin main
```

Depois, no GitHub:

1. Abra o repositorio.
2. Va em `Settings > Pages`.
3. Em `Build and deployment`, escolha `Deploy from a branch`.
4. Selecione `main` e `/root`.
5. Salve.

O link ficara neste formato:

```text
https://SEU_USUARIO.github.io/filadelfia-app/
```

Se usar fluxos de autenticacao por e-mail/reset no Supabase, adicione esse link em
`Authentication > URL Configuration > Site URL` e tambem em `Redirect URLs`.

## Area Pastoral

- Pedido de oracao liberado para usuarios logados
- Solicitacoes pastorais visiveis somente para master ou usuarios com permissao de Area Pastoral
- Pastor Presidente e Pastor Vice Presidente entram com acesso master; Pastor Auxiliar recebe apenas as permissoes concedidas pelo master

Depois acesse `http://localhost:8000`.

## Fluxo atual

- Menu lateral recolhível no desktop para ampliar a área útil da tela
- Tela de login e cadastro do primeiro administrador
- Primeiro administrador criado como usuário `master`
- Convites administrativos por link para novos usuários
- Permissões por módulo para cada cargo ou usuário convidado
- Tela de Igrejas com consulta liberada para usuários logados
- Cadastro/edição/remoção de igrejas restrito ao master ou a usuários com permissão de Igrejas
- Tela de Membresia com consulta liberada para usuários logados
- Cadastro/edição/remoção/detalhes de membros restritos ao master ou a usuários com permissão de Membresia
- Cadastro de membro aberto por botão com ícone em modal
- Resumos clicáveis de membresia por idade, sexo, arrolamento e entradas do mês
- Termo `Frequentador` substituído por `Visitante`
- Bloqueio/liberação de usuários pelo master
- Possibilidade de promover outro usuário para master
- Link público e QR Code para cadastro de membros e visitantes
- Configurações da igreja com nome, subtítulo, contato e publicação do app
- Upload de logo da igreja com prévia no admin e no app
- Escolha de paleta por cores manuais ou presets
- Persistência local no navegador usando `localStorage`
- Estados vazios no lugar dos dados fictícios
- Cadastro inicial funcional de membros e comunicados

- Início com novidades e treinamentos
- Membresia com cadastro completo
- Área pastoral com solicitações
- Igrejas com mapa ilustrado
- Pequenos grupos
- Ministérios
- Eventos com indicadores
- Kids com check-in/check-out
- Financeiro com categorias
- Biblioteca
- Comunicados
- App/Site com prévia mobile
- Configurações
