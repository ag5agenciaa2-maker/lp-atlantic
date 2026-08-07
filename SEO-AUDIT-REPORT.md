# Auditoria SEO/GEO — Atlântic Soluções Ambientais

Data: 06/08/2026

## O que foi mudado

### Meta tags e head
- Title reescrito com front-loading (keyword + local no início): "Manutenção Predial em Magé, RJ | Atlântic Soluções Ambientais" (~55 caracteres).
- Meta description reescrita, acionável, ~155 caracteres.
- Adicionado `<link rel="canonical" href="https://atlanticsolucoes.com.br/">` e `<meta name="robots" content="index, follow">`.
- Adicionadas geo tags: `geo.region`, `geo.placename`, `geo.position`, `ICBM`.
- Adicionado Open Graph completo (og:type, og:title, og:description, og:image, og:url, og:locale, og:site_name).
- Adicionado Twitter Card (summary_large_image, title, description, image).
- Adicionado `<link rel="preload">` com `fetchpriority="high"` para a imagem de fundo do hero (Core Web Vitals / LCP).

### H1 e hierarquia
- H1 antigo era só slogan emocional ("Manutenção predial e meio ambiente sob um só contrato no Rio de Janeiro"). Reescrito para conter keyword + localização no início: **"Manutenção Predial em Magé, RJ, e Grande Rio sob um só contrato"**. O parágrafo de apoio (hero__lead) manteve o conteúdo emocional/detalhado.
- H2-H6 já seguiam hierarquia correta e descritiva — não precisaram de correção estrutural.

### Régua de avaliações (Regra AG5)
- Auditado: o site NÃO exibia a nota "4,6" nem "11 avaliações" em nenhum destaque visual — já estava em conformidade com a régua (nota abaixo de 4.7 e contagem abaixo de 30).
- Reforçado com uma tag textual "★★★★★ Avaliações 5 estrelas no Google" acima da seção de depoimentos, sem expor nota numérica ou contagem baixa.
- O `aggregateRating` (ratingValue 4.6, reviewCount 11) foi mantido no JSON-LD, pois é dado verídico e a seção de depoimentos com estrelas está visível na página — conforme permitido pela regra.

### Schema.org (JSON-LD)
- LocalBusiness já existia e foi mantido (NAP completo, geo, horário, sameAs, areaServed, foundingDate, aggregateRating).
- Adicionado um segundo bloco JSON-LD do tipo **FAQPage**, reaproveitando as 6 perguntas e respostas já existentes na seção de FAQ do site (nenhum conteúdo novo/inventado).

### NAP em texto visível
- Adicionado um bloco `<address>` semântico no rodapé com nome da empresa, endereço completo, WhatsApp e horário de funcionamento em texto HTML puro (antes só existia em imagem/seções isoladas, agora reforçado e centralizado no rodapé, presente em toda página).

### robots.txt (criado)
- Libera todos os bots (`User-agent: *`) e explicitamente GPTBot, ChatGPT-User, Claude-Web, ClaudeBot, PerplexityBot e Google-Extended.
- Referencia `Sitemap:` e um comentário `# LLMs:` apontando para o llms.txt.

### sitemap.xml (criado)
- Inclui a home (`/`) e as duas páginas internas (termos e política de privacidade), com `<loc>` sem `.html` (URL limpa).

### llms.txt (criado)
- Seguindo a spec llmstxt.org: H1, blockquote-resumo, bloco de NAP em texto corrido, Serviços, Diferenciais, Regiões atendidas, Dúvidas frequentes e Contato.
- Seção "Equipe" foi omitida propositalmente — o site não tem nomes+cargos explícitos de equipe (apenas "fundador" sem nome citado e fotos de bastidores sem crachá nominal).
- Todo o conteúdo foi extraído literalmente do index.html, nenhum dado inventado.

### Robô de analytics AG5
- Adicionado antes do `</body>`:
  `<script src="https://control-blog.ag5agencia.site/r.js" data-c="atlantic-solucoes" defer></script>`

### Imagens e performance
- Todas as imagens fora do viewport inicial já usavam `loading="lazy"` — confirmado, nenhuma correção necessária.
- Todos os `alt` já eram descritivos (nome do local/serviço + contexto) — nenhuma correção necessária, exceto o logo do rodapé que ganhou um alt levemente mais descritivo ("— logo").
- Todos os `<script>` já usavam `defer` — confirmado, incluindo o novo script de analytics.
- Fonte do Google Fonts já usa `display=swap` — confirmado, nenhuma correção necessária.

### Estrutura semântica
- `<main>`, `<header class="nav">` (funciona como nav global) e `<footer>` já existiam corretamente. Botões só-ícone já tinham `aria-label` (verificado nos botões de menu, WhatsApp, lightbox, modal, player de vídeo).

## Observação importante sobre o domínio
O JSON-LD já existente no site usava `https://atlanticsolucoes.com.br/` como URL oficial — esse foi o domínio usado em todos os lugares novos (canonical, OG, Twitter, sitemap, robots, llms.txt). **Confirme que este é de fato o domínio real de produção antes do deploy.** Se for diferente, será necessário substituir a string `atlanticsolucoes.com.br` em: `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt`, `sitemap.xml` e `llms.txt`.

## Checklist de tarefas externas/off-page (não podem ser feitas por código)

- [ ] **Confirmar o domínio real** de produção e, se diferente do usado (`atlanticsolucoes.com.br`), atualizar todas as URLs absolutas nos arquivos citados acima.
- [ ] **Confirmar o slug do analytics AG5** (`atlantic-solucoes`) no AG5 Content Control antes do deploy — o script já está no código, mas precisa existir/estar cadastrado no painel para coletar dados.
- [ ] **Google Search Console**: cadastrar o domínio, enviar o `sitemap.xml`, verificar propriedade.
- [ ] **Google My Business / Perfil da Empresa no Google**: confirmar que NAP (nome, endereço, telefone, horário) bate exatamente com o que está no site e no JSON-LD; adicionar fotos, categorias de serviço, e continuar coletando avaliações (nota atual 4,6 com 11 avaliações está abaixo da régua de destaque — mais avaliações 5 estrelas ajudam a passar de 30 avaliações e 4,7 de nota, permitindo destacar o número no futuro).
- [ ] **Backlinks locais**: diretórios de empresas (Google Maps, Reclame Aqui, sindicatos de condomínio, associações de síndicos) e parcerias com administradoras de condomínio.
- [ ] **Teste de PageSpeed Insights / Core Web Vitals** em produção (com HTTPS real e CDN), já que testes locais não reflit em rede real, especialmente por causa dos vídeos hospedados externamente (filesafe.space).
- [ ] **HTTPS**: garantir certificado SSL válido no domínio de produção.
- [ ] **Validar Schema.org** no Rich Results Test do Google após o deploy (LocalBusiness + FAQPage).
- [ ] **Redirecionamentos**: se o domínio tiver `www` e não-`www`, ou `http`/`https`, garantir redirect único para a versão canônica (`https://atlanticsolucoes.com.br/`).
- [ ] **Indexação de imagens**: enviar imagens principais para o Google Imagens via Search Console, se relevante para o negócio.
- [ ] Revisar/atualizar a nota e contagem de avaliações do JSON-LD periodicamente conforme dados reais do Google mudam.
