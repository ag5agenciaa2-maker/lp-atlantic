# Estrutura de páginas — LP Atlântic Soluções Ambientais

## 1. Mapa de páginas

Todas as páginas vivem na **raiz** do projeto (sem subpastas):

| Página | Caminho | Profundidade | Prefixo de caminho |
|---|---|---|---|
| `index.html` | raiz | 0 | nenhum (fonte da verdade do nav/footer) |
| `politica-de-privacidade.html` | raiz | 0 | nenhum |
| `termos-e-condicoes.html` | raiz | 0 | nenhum |

Como todas estão na raiz, nenhum caminho usa `../`. Assets (`assets/`, `style.css`,
`cookie-banner.css`, `cookie-banner.js`, `script.js`) são referenciados diretamente
(ex.: `src="assets/logo-atlantic-solution-mobile.webp"`, `href="style.css"`).

## 2. Ponto de partida para página nova

Toda página nova (secundária ou futura) DEVE partir de
[`docs/_nav-footer-template.html`](./_nav-footer-template.html). Esse arquivo contém,
na ordem correta, os blocos NAV / FOOTER / MOBILE DRAWER / COOKIE LGPD / SCRIPTS,
prontos para copiar e colar.

O template usa o placeholder `{{BASE}}` em todos os caminhos relativos:
- Hoje, com todas as páginas na raiz, `{{BASE}}` = `""` (vazio) — apague o placeholder.
- Se uma página nova for criada dentro de uma subpasta (ex.: `blog/artigo.html`),
  troque `{{BASE}}` por `../` (ou `../../` se for dois níveis de profundidade),
  de acordo com a distância real até a raiz do site.
- No `index.html` especificamente, os links do NAV/DRAWER usam âncoras próprias
  (`#servicos`, `#topo`, etc.) em vez de `{{BASE}}index.html#servicos` — isso está
  documentado em comentários dentro do próprio template.

## 3. Regra de profundidade

- **Raiz (situação atual das 3 páginas):** caminhos diretos, sem prefixo.
  Ex.: `href="index.html"`, `src="assets/logo.webp"`, `href="style.css"`.
- **Subpasta (se o projeto crescer, ex. `/blog/`):** usar `../` para cada nível de
  profundidade até a raiz. Ex.: de `blog/post.html` para a home seria
  `href="../index.html"`.

## 4. Itens obrigatórios em toda página

- [ ] Header/nav idêntico ao `index.html` (mesma marca, mesmos links, mesmo botão hamburger)
- [ ] Footer completo idêntico ao `index.html` (colunas NAVEGAÇÃO / SERVIÇOS / CONTATO + bloco de créditos)
- [ ] Drawer mobile (overlay + menu) com os mesmos ids (`drawerOverlay`, `drawer`, `drawerClose`, `drawerMenu`) que `script.js` espera
- [ ] Cookie banner LGPD completo: HTML do banner (`#ck-banner`) + modal de preferências (`#ck-modal`) + botão flutuante (`#ck-prefs-btn`)
- [ ] `<link rel="stylesheet" href="cookie-banner.css">` no `<head>`
- [ ] `<script src="cookie-banner.js" defer></script>` no final do body
- [ ] `<script src="script.js" defer></script>` no final do body, depois do cookie-banner.js
- [ ] Robô de analytics AG5: `<script src="https://control-blog.ag5agencia.site/r.js" data-c="atlantic-solucoes" defer></script>`, por último, no final do body
- [ ] Widget flutuante do WhatsApp (`.wa-premium-container`) — presente em todas as páginas do site, não só na home
- [ ] Favicon idêntico: `<link rel="icon" href="assets/favicon-atlantic-solution.webp" />`
- [ ] Meta `charset="utf-8"` e `viewport` corretos
- [ ] `<link rel="canonical">` único por página, apontando para a URL própria da página (nunca para a home em páginas secundárias)

## 5. Armadilhas encontradas e corrigidas neste projeto (06/08/2026)

Ao rodar esta skill, as páginas `politica-de-privacidade.html` e `termos-e-condicoes.html`
já tinham nav, footer básico, drawer e cookie banner parcialmente implementados, mas com
os seguintes problemas reais, corrigidos nesta execução:

1. **Footer incompleto** — as duas páginas secundárias tinham apenas a barra inferior de
   créditos (`.creditos`, copyright + links legais), sem o grid principal de 4 colunas
   (logo + endereço, NAVEGAÇÃO, SERVIÇOS, CONTATO) que existe no `index.html`. Corrigido:
   footer completo replicado, com os links de âncora de seção (`#servicos`, `#sobre`, etc.)
   ajustados para `index.html#servicos`, `index.html#sobre` etc., já que essas seções só
   existem na home.
2. **Widget do WhatsApp ausente** — o `.wa-premium-container` (botão flutuante + balão de
   mensagem) existia apenas no `index.html`. As páginas secundárias ficavam sem CTA de
   WhatsApp flutuante. Corrigido: bloco replicado nas duas páginas, antes dos scripts finais.
3. **Robô de analytics AG5 ausente** — o script
   `<script src="https://control-blog.ag5agencia.site/r.js" data-c="atlantic-solucoes" defer></script>`
   só estava no `index.html`. Sem ele, as páginas secundárias não eram rastreadas.
   Corrigido: adicionado como último script, mesma posição relativa do index.html.
4. **Canonical ausente** — nenhuma das duas páginas secundárias tinha
   `<link rel="canonical">`. Corrigido: adicionado apontando para a URL própria de cada
   página (`.../politica-de-privacidade` e `.../termos-e-condicoes`), nunca para a home.
5. **Nav/drawer/cookie banner já estavam corretos** — hrefs, ids e estrutura já batiam
   com o padrão do index.html; nenhuma alteração foi necessária ali além do que consta acima.

## 6. Como verificar (checklist rápido)

Repetir por leitura de código (não há navegador disponível neste ambiente):

1. Abrir a página e comparar visualmente o bloco `<header class="nav">` com o do `index.html` — deve ser idêntico exceto pelos hrefs de âncora (que apontam para `index.html#secao`).
2. Comparar o bloco `<footer class="rodape">` inteiro (grid de 4 colunas + créditos) com o do `index.html`.
3. Conferir que `#drawerOverlay`, `#drawer`, `#drawerClose`, `#drawerMenu` existem e têm a mesma estrutura/ids do `index.html`.
4. Conferir que `#ck-banner`, `#ck-modal` e `#ck-prefs-btn` existem, com todos os ids internos (`ck-accept-all`, `ck-reject`, `ck-customize`, `ck-modal-*`, `ck-functional`, `ck-analytics`, `ck-performance`, `ck-advertising`).
5. Conferir a ordem dos scripts no fim do `<body>`: `cookie-banner.js` → `script.js` → robô AG5 (`control-blog.ag5agencia.site/r.js`) — sem duplicatas.
6. Conferir `.wa-premium-container` presente com os mesmos ids (`wa-message-bubble`, `wa-close-btn`, `wa-main-btn`, `wa-notification`).
7. Conferir favicon, meta charset/viewport, e `<link rel="canonical">` apontando para a URL própria da página.
