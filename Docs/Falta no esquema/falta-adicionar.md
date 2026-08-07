# Pendências do Schema.org — Atlântic Soluções Ambientais

Gerado em: 06/08/2026

## 🔴 CRÍTICOS

- **Domínio de produção não confirmado**: o site próprio informado (`https://atlanticsolucoes.com.br/`) foi descrito no dossiê Raiz como "Não está funcionando". O JSON-LD, canonical, OG e Twitter Card usam esse domínio (mantido por já ser o padrão adotado na auditoria SEO anterior). **Confirmar com o cliente se este é de fato o domínio real de produção antes do deploy.** Se for diferente, substituir `atlanticsolucoes.com.br` em todas as URLs absolutas do `index.html` (JSON-LD, canonical, og:url, og:image, twitter:image), além de `robots.txt`, `sitemap.xml` e `llms.txt`.
- **E-mail da empresa**: não encontrado em nenhuma fonte (nem no dossiê Raiz, nem no index.html). Campo `email` omitido do bloco `ProfessionalService`. Se a empresa tiver um e-mail comercial, adicionar depois.

## 🟡 IMPORTANTES

- **Logo/imagens em URL absoluta**: como o domínio real ainda não está confirmado (ver item crítico acima), as URLs de `logo` e `image` no JSON-LD foram montadas assumindo `https://atlanticsolucoes.com.br/assets/...` — mesmo domínio já usado no restante do `<head>` (OG/Twitter). Confirmar junto com o domínio de produção.
- **CNPJ**: o dossiê Raiz confirma que a empresa "possui CNPJ, alvará, licenças e afins", mas o número do CNPJ não foi informado em nenhuma fonte. Não incluído no schema (não há propriedade padrão para isso sem o dado, e não deve ser inventado).

## 🔵 COMPLEMENTARES

- **founder**: o site tem uma foto com legenda "Fundador da Atlântic Soluções Ambientais", mas nenhuma fonte (HTML ou dossiê Raiz) traz o nome do fundador. Bloco `founder` omitido do JSON-LD conforme regra da skill.
- **priceRange**: não há indicação de faixa de preço em nenhuma fonte. Omitido.
- **currenciesAccepted**: não fazia sentido incluir para este tipo de negócio B2B por orçamento/vistoria; omitido.
- **Telefone fixo adicional**: o dossiê Raiz lista dois números no campo "Telefone do seu negócio" (2199523-0044 e 2199857-0044), mas o campo "WhatsApp" e todo o index.html usam apenas 2199523-0044 (+5521995230044). Como o segundo número (99857-0044) não aparece em nenhum lugar do site publicado, não foi incluído no schema para não divergir do NAP visível na página. Se a empresa confirmar que ambos os números devem constar publicamente, ajustar `telephone` para array de `ContactPoint`.

## 🟢 FAQ

- As 6 perguntas e respostas da seção de FAQ do site foram incluídas integralmente no bloco `FAQPage` (`@id`: `https://atlanticsolucoes.com.br/#faq`). Nenhuma pendência.

## ✅ Resolvidos Automaticamente

- **Google CID**: `16826208920445134641` — encontrado no dossiê Raiz (extensão PlePer Local). Usado em `identifier` e `hasMap`.
- **Google Place ID**: `ChIJq39fw4ihmQARMSekM92zguk` — encontrado no dossiê Raiz e confirmado no link de avaliação (`writereview?placeid=...`). Usado em `identifier`.
- **sameAs[0]**: URL canônica `https://maps.google.com/?cid=16826208920445134641` usada em vez do link opaco `share.google/...` (que foi descartado por não ser rastreável/canônico).
- **Coordenadas GPS**: `-22.6117938, -43.1829808` — extraídas do iframe do Google Maps já presente na LP (mais precisas que geocodificação do endereço).
- **legalName**: "Atlântic Soluções Ambientais LTDA" — confirmado no dossiê Raiz.
- **foundingDate**: "2020-05" — a partir de "Data da Abertura da empresa: 05/2020" no dossiê Raiz.
- **aggregateRating**: ratingValue 4.6, reviewCount 11 — dado real do Google Business Profile (dossiê Raiz), mantido no schema pois é verídico (a régua de destaque visual não se aplica ao JSON-LD, apenas à UI, conforme já esclarecido na auditoria SEO anterior).
- **areaServed**: Magé (cidade-base) + Rio de Janeiro (estado) + Grande Rio de Janeiro + bairros/cidades geograficamente reais e adjacentes (Vila Carvalho, Piedade, Inhomirim, Guia de Pacobaíba — bairros de Magé/Baixada Fluminense; Duque de Caxias e Guapimirim — municípios vizinhos), consistente com "atuação em toda Grande Rio de Janeiro" mencionada no site e no dossiê Raiz.
- **hasOfferCatalog**: os 10 serviços da lista completa do dossiê Raiz/index.html (limpeza de reservatórios, manutenção predial, controle de pragas, caminhão vácuo, construção civil, impermeabilização, pintura, reforma de telhado, drywall, reformas em geral).
- **alternateName**: `Manutenção Predial Magé RJ - Atlântic Soluções Ambientais | Manutenção Predial | Meio Ambiente` — aplicado também em `WebSite.name` e como base do `OfferCatalog.name`.
- **telephone**: único número real (WhatsApp) em E.164: `+5521995230044`.
- **datePublished/dateModified**: omitidos do bloco `WebPage` por não haver data real de publicação/atualização conhecida (regra: nunca inventar datas).
