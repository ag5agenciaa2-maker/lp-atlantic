Quero que você crie o Site institucional "Precisão Ambiental" em 3 arquivos (index.html, style.css e script.js), usando APENAS HTML5 semântico, CSS3 (Flexbox, Grid, variáveis CSS) e JavaScript Vanilla ES6, sem qualquer framework ou biblioteca externa.

REGRA: Use imagens genéricas premium (Unsplash) relacionadas ao nicho (manutenção predial, engenharia civil/ambiental, limpeza de reservatórios, controle de pragas, equipes técnicas em campo) caso não haja imagens reais suficientes para completar as seções. Inclua URLs diretas das imagens.

IDENTIDADE VISUAL BASE:

Paleta:

Verde Atlantic (primária, extraída do logo): 
#7ED956
Grafite profundo (fundo escuro/contraste): 
#14181C
Off-white (extraído do fundo do logo): 
#F7F7F7
Verde-folha profundo (detalhes/texto sobre claro): 
#1F3D22
Cinza técnico (textos secundários): 
#6B7280

Tipografia:

Títulos: Space Grotesk (geométrica, técnica, com presença industrial)
Corpo/textos: Inter (alta legibilidade, neutra, confiável)

Estilo: Industrial-editorial com identidade ambiental — grafite e verde vívido contrastados, tipografia técnica geométrica, fotografia documental real da equipe (evitando o stock genérico de "trabalhador de capacete sorrindo"), elementos gráficos de precisão (linhas finas, grades, selos de licenciamento/conformidade).

Sensação: Confiança técnica, transparência regulatória (INEA, IBAMA, Corpo de Bombeiros), força operacional aliada a compromisso ambiental genuíno — não é "empresa verde fofa", é engenharia séria com consciência ambiental.

LAYOUT ESCOLHIDO:

Hero: Opção D — Vídeo loop + texto com máscara de cor. Vídeo institucional da equipe (arquivo _6_.mp4) em loop de fundo, com overlay em gradiente grafite→transparente para legibilidade; título principal em Space Grotesk com leve máscara de cor verde sobre uma palavra-chave (ex: "Soluções" em 
#7ED956); eyebrow label estilo "// DESDE 2020 //" inspirado no padrão do template Manufactt; CTA "Solicitar Vistoria Grátis" em destaque; indicador de scroll inferior.

Serviços: Opção A — Bento Grid com cards de tamanhos variados. Cards maiores para os 5 serviços-âncora (limpeza de reservatórios, manutenção predial, controle de pragas, caminhão vácuo, construção civil/impermeabilização) e cards menores para os serviços complementares (pintura, reforma de telhado, drywall, reformas gerais). Ícone técnico + imagem de fundo sutil por card, hover revela detalhe do serviço.

Depoimentos: Opção E — Carrossel fade + nota Google visível. Selo com nota 4.6/5 e "11 avaliações" em destaque ao lado do carrossel, textos das avaliações reais em fade sequencial.

Sobre/Credenciais: Opção D — Split 50/50 com imagem fixada. Lado fixo com o retrato do fundador (foto disponível) sobreposto ao letreiro "ATLANTIC"; lado que rola traz texto institucional sobre a equipe técnica, engenheiros elétrico e civil, e licenciamentos (INEA, IBAMA, Bombeiro Civil).

ANIMAÇÕES DO PROJETO (baseadas no breakdown Webflow):

Hero video → opacity de 0 para 1 em 900ms, easing: ease-out, trigger: load
Hero título → translateY(24px)→0 + opacity 0→1 em 700ms, easing: cubic-bezier(0.16,1,0.3,1), trigger: load, delay 200ms
Eyebrow label → opacity 0→1 em 400ms, trigger: load, delay 100ms (entra antes do título, padrão observado no Manufactt)
Cards do Bento Grid → translateY(30px)→0 + opacity 0→1 em 500ms, easing: ease-out, trigger: scroll (IntersectionObserver), stagger: sim (90ms entre cards)
Contadores/estatísticas (ex: "6 anos de atuação", "97 fotos no Google") → contagem numérica de 0 até valor final em 1200ms, easing: ease-out, trigger: scroll
Selo de nota Google → scale(0.9)→1 + opacity 0→1 em 400ms, trigger: scroll
Depoimentos (carrossel) → fade cross-dissolve em 600ms entre slides, easing: ease-in-out, trigger: scroll + autoplay 5s
Seção Sobre (split fixado) → imagem com position sticky; texto lateral em fade+translateY(20px) em 500ms por bloco, trigger: scroll, stagger: sim (100ms)
Botões/CTAs → hover: background-color transition 250ms ease, leve translateY(-2px)

SEÇÕES OBRIGATÓRIAS (intercalar, adicionar todas sempre que possível e adicionar novas conforme o nicho):

Navbar
Hero [Vídeo loop + máscara de cor]
Seção de alto impacto: dor e solução do público-alvo (condomínios/indústrias que sofrem com falta de manutenção preventiva, risco sanitário, multas ambientais)
Serviços — Bento Grid
Seção de encantamento com imagens de resultado/segurança/pessoas (fotos reais da equipe em campo)
Sobre/Credenciais — Split 50/50 fixado
Depoimentos — Carrossel + nota Google
FAQ
Localização: endereço + mapa + botão "Como Chegar" + contatos e redes sociais
CTA com formulário ao lado
Rodapé + Créditos

RODAPÉ — coluna de contato (com ícones, todos clicáveis):
Nome → link Google Business: https://share.google/E86CkFjRVnoMuw2y1
Endereço → link Google Maps rota: https://www.google.com/maps/dir//Atlantic+Solu%C3%A7%C3%B5es,+R.+Olivio+de+Matos,+444+-+Vila+Carvalho,+Mag%C3%A9+-+RJ,+25935-730
Telefone/WhatsApp → (21) 99523-0044

CRÉDITOS:
Esquerda: © Atlântic Soluções Ambientais 2026
Direita: Desenvolvido por AG5 Agência (AG5 em destaque em 
#7ED956, link para www.ag5agencia.com.br)

DIRETRIZES ANTI-GENÉRICO: sem hero centralizado com fundo escuro genérico e texto branco; sem fade-up idêntico em todas as seções; sem paleta azul+branco+cinza (cliché do setor de engenharia/manutenção predial); sem grid de 3 colunas ícone+título+texto (padrão visto no template Bixol — evitar reproduzir diretamente).

QUALIDADE DE CÓDIGO: HTML semântico + IDs de ancoragem em todas as seções; variáveis CSS no :root; mobile-first com breakpoints 480/768/1024/1280px; IntersectionObserver para scroll (nunca scroll event direto); will-change: transform; @media (prefers-reduced-motion); lazy loading; JSON-LD LocalBusiness; formulário com validação real e serialização para WhatsApp.

OPCIONAL: Barra animada horizontal com "Atlântic Soluções / Manutenção Predial • Meio Ambiente • Construção Civil / Atendimento em todo o Rio de Janeiro" — reforça posicionamento B2B regional.

1 — MÍDIAS PRINCIPAIS
Categoria	Recebido
Foto da fachada	❌ Ausente
Fotos internas (escritório)	✅ 1 foto (reunião de equipe à mesa, ambiente interno)
Fotos da equipe	✅ 2 fotos (grupo de 4 pessoas em recepção de condomínio; equipe reunida à mesa)
Fotos dos proprietários	✅ 1 foto (fundador em retrato, ao lado do letreiro "ATLANTIC")
Logotipo	✅ 1 arquivo (Logotipo.jpg — ícone "A" verde com folha)
Vídeo institucional	✅ 1 vídeo (equipe falando sobre os serviços prestados)
Print de referência do Instagram	✅ 1 imagem (grid de posts, uso apenas como referência de conteúdo, não como asset de site)

Quantidade declarada vs. recebida: declarado no formulário "10 fotos contando com a logo" e "8 vídeos" → recebidos apenas 3 fotos reais + logo (4 no total) e 1 vídeo. Gap significativo — vai para o checklist de pendências.

2 — INFORMAÇÕES DA EMPRESA

Nome da empresa: Atlântic Soluções Ambientais LTDA
Nicho de atuação: Manutenção predial, meio ambiente e construção civil
Descrição institucional: Empresa que atende condomínios, shoppings, galpões, indústrias e escolas, oferecendo assistência 24h, vistoria gratuita e licenciamento junto aos principais órgãos ambientais e de segurança (INEA, IBAMA, Corpo de Bombeiros Civil), com equipe de engenheiros elétrico e civil.
Proposta de valor: Solução completa em engenharia civil e ambiental para o ciclo de manutenção predial — da prevenção sanitária (limpeza de reservatórios, controle de pragas) à reforma estrutural (construção civil, impermeabilização, reforma de telhado) — com respaldo técnico e conformidade regulatória.
Público-alvo: Síndicos e administradoras de condomínios, gestores de shoppings, indústrias, galpões e instituições de ensino na Grande Rio de Janeiro.
Principais serviços (top 5 declarados): Limpeza de reservatórios de água potável; manutenção predial; controle de pragas; serviços com caminhão vácuo (caixa de gordura, sabão, reuso e retardo); construção civil e impermeabilização.
Lista completa de serviços: Limpeza de reservatórios de água potável, manutenção predial, controle de pragas, serviços com caminhão vácuo, construção civil, impermeabilização, pintura, reforma de telhado, drywall, reformas em geral.
Diferenciais: Assistência 24h; vistoria gratuita; licenciamento formal junto a INEA, IBAMA e Corpo de Bombeiros Civil; equipe própria de engenheiros elétrico e civil; atuação em múltiplos segmentos B2B (condomínios, shoppings, indústrias, escolas).
História: ❌ Não respondida no formulário (campo em aberto, com opção de envio por áudio não utilizada).
Data de abertura: 05/2020 (compatível com "há 6 anos" citado na bio do Instagram).

Contato:

Telefone: 2199523-0044 e 2199857-0044 (⚠️ dois números informados — ver pendência)
WhatsApp: (21) 99523-0044
Email: ❌ Não informado
Endereço: R. Olivio de Matos, 444 - Vila Carvalho, Magé - RJ, 25935-730
Cidade-Estado: Magé - RJ
Horário: Seg. a Sex. 08:00 às 17:00 | Sáb./Dom. (Dia dos Pais) fechado

Links:

Site atual: https://atlanticsolucoes.com.br/ (⚠️ fora do ar, conforme informado)
Instagram: https://www.instagram.com/atlantic_solucoes_/ — @atlantic_solucoes_ (143 posts / 621 seguidores / 866 seguindo, conforme print; formulário indicou 142/619/866 — pequena divergência)
Facebook / LinkedIn: ❌ Não informados
Google Business: https://share.google/E86CkFjRVnoMuw2y1
Avaliação Google: https://search.google.com/local/writereview?placeid=ChIJq39fw4ihmQARMSekM92zguk
Rota Google Maps: link completo fornecido no material
Tour Virtual Google e Mapa embutido: iframes fornecidos no material

Dados do perfil Google (extensão PlePer):

Status: ✅ Verificado
Categorias: Prestador de serviços de construção civil, Obras em grandes alturas, Manutenção predial, Reformas, Serviço de tratamento de água e esgoto, Serviço de pintura de janelas
Avaliações: 11 | Nota: 4.6 | Fotos no perfil: 97
Coordenadas: -22.61179380, -43.18298080

Documentação: CNPJ, alvará sanitário e licenças confirmados como existentes pelo cliente, porém sem números/documentos fornecidos — pendência.

3 — AVALIAÇÕES

Plataforma: Google
Total de avaliações: 11 (segundo perfil PlePer)
Nota média: 4.6

Observação: o material fornecido não trouxe a contagem individual de estrelas por avaliação — apenas a nota agregada (4.6). As avaliações abaixo estão na ordem em que foram fornecidas; nenhuma resposta do proprietário estava presente no material.

Renata Andrade ---- 9 meses atrás — 3 avaliações • 1 foto
"A Atlantic Soluções é uma empresa séria e comprometida, com excelente atuação em Engenharia Civil e Ambiental. Possui equipe técnica qualificada, atendimento ágil e serviços executados com total responsabilidade e conformidade com as normas. Recomendo!"

Manutenção Álamo ---- 7 meses atrás — 1 avaliação
"A Atlantic é uma empresa idônea, com processos bem estruturados e devidamente definidos. Destaca-se pela qualidade técnica de suas entregas, bem como pela agilidade no feedback e nas respostas às demandas apresentadas. Diante da experiência positiva, recomendamos seus serviços."

Walter Texeira ---- 7 meses atrás — 3 avaliações
"Empresa que atende diversas demandas com qualidade e tem funcionários qualificados, além de simpáticos."

Osmar Barbosa ---- 7 meses atrás — 3 avaliações
"Empresa técnica, transparente, com processos e procedimentos bem definidos. Eu recomendo."

Ladjane Rodrigues de Melo ---- 7 meses atrás — 13 avaliações • 2 fotos
"Atendimento imediato e com excelência."

4 — ANÁLISE DE BRANDING

Nicho: Manutenção predial, meio ambiente e construção civil (B2B técnico)
Posicionamento: Médio-premium — empresa de engenharia com licenciamento formal e equipe técnica própria, não é prestador informal; comunicação deve refletir seriedade técnica e transparência regulatória.

Estilo visual predominante recomendado: Industrial-editorial com identidade ambiental (fusão entre estética técnica de engenharia — grids, linhas, dados — e uma identidade "verde" não-clichê, evitando o visual de ONG/paisagismo).

Paleta de cores recomendada:

#7ED956 — verde vívido (extraído diretamente do logo)
#F7F7F7 — off-white (fundo do logo)
#14181C — grafite profundo (contraste técnico)
#1F3D22 — verde-folha escuro (apoio)
#6B7280 — cinza técnico (texto secundário)

Direção estética: Fugir do clichê duplo do setor — nem o "azul corporativo de engenharia" nem o "verde pastel de sustentabilidade genérica". A marca já tem um verde vívido e confiante no logo; a proposta é ancorá-lo em grafite profundo e tipografia técnica geométrica, criando uma identidade que parece mais "escritório de engenharia sério com consciência ambiental" do que "empresa de jardinagem".

Sensação de marca: Técnica, regulada, humana (equipe real em campo), confiável para decisões de grande porte (condomínios, indústrias, escolas).

Referências de empresas premium do mesmo nicho: JLL e CBRE (facilities management corporativo internacional) e ISS Facility Services — usadas aqui apenas como referência de tom visual (grafite + cor de destaque única + fotografia documental real), não como fonte de conteúdo.

⚠️ Base de conhecimento AG5 não disponível nesta sessão — não foi possível checar conflito de paleta/layout com outros projetos do portfólio no mesmo nicho (verificar manualmente antes da publicação).

5 — CHECKLIST DE PENDÊNCIAS

Bloqueantes (produção):

Confirmação de qual telefone é o correto/ativo — dois números informados (2199523-0044 e 2199857-0044); PlePer confirma apenas o primeiro
Email institucional — não informado
CNPJ (número) — cliente afirma ter, mas não enviou
Números de registro/licenças (alvará sanitário, licenciamento INEA/IBAMA/Bombeiro Civil) — cliente afirma ter, mas não enviou
Foto da fachada da empresa — ausente
Gap de mídia: declarado 10 fotos + 8 vídeos vs. recebido 3 fotos + logo + 1 vídeo — seções que dependem de mais imagens (galeria de resultados, equipe ampliada) precisarão de imagens genéricas premium (Unsplash) como complemento

Importantes/desejáveis:

História da empresa (não respondida)
Redes sociais adicionais (Facebook, LinkedIn) — não informadas
Confirmação da divergência de seguidores do Instagram (formulário: 619 / print: 621)
Site institucional atual está fora do ar — não há conteúdo a resgatar dele
Nome/cargo dos profissionais nas fotos de equipe (para eventual crédito na seção Sobre)
BASE_CONHECIMENTO_AG5.md ausente — checagem de diferenciação cross-portfólio pendente
6 — ANÁLISE DE REFERÊNCIAS WEBFLOW
TEMPLATE 1 — Manufactt (https://manufactt-wbs.webflow.io/)

HERO: Fullscreen, vídeo de fundo ocupando 100% da viewport com overlay escuro; título curto e direto sobreposto à esquerda ("From raw material to market-ready"), eyebrow label acima ("Trusted manufacturing partner" / "// SINCE - 2005 //"); elemento diferenciador é um card de citação flutuante do CEO no canto inferior, e um stack de avatares da equipe no canto oposto; CTA "Explore Our Capabilities" abaixo do título; indicador "SCROLL DOWN" no rodapé da hero.
NAV: Nav superior fixa com CTA destacado ("Get a Quote") sempre visível; menu dropdown "Pages" secundário.
TIPOGRAFIA: Título em sans-serif bold condensada (~3.5–4.5rem desktop), eyebrow labels em caixa alta com letter-spacing amplo e tamanho pequeno (~0.75rem), uso criativo de "//" ladeando datas/labels para reforçar tom técnico-industrial.
CORES: Base neutra clara com blocos escuros de contraste no vídeo hero e nas seções de estatística; aplicável ao projeto usando grafite 
#14181C no lugar do escuro do template e 
#7ED956 como cor de destaque nos CTAs e ícones.
SERVIÇOS/CARDS: Grid de 4 colunas, cada card com imagem de serviço + lista de 4 features com ícone check + hover que revela um ícone de seta; cards de mesma largura mas com imagem variável de altura, dando leve efeito "bento".
ANIMAÇÕES (padrão observado): Hero video → fade-in em ~900ms no load; título → translateY+fade em ~700ms com delay de 200ms; contadores numéricos (20+, 100+, 1 milhão+, 4.9/5.0) → contagem incremental ao entrar no viewport, ease-out, ~1200ms; cards de serviço → entrada em stagger ao rolar, ~500ms cada, intervalo de ~90ms entre eles.
MICRO-INTERAÇÕES: Botões com seta que desliza ao hover; cards de serviço com ícone de hover que aparece sobre a imagem.
ELEMENTOS DECORATIVOS: Vetores de contorno atrás dos blocos "Who we are" e "What we do"; imagens circulares sobrepostas na seção Sobre.
RESUMO CONSTRUTIVO: Para recriar esse estilo no projeto Atlântic, usar o vídeo real da equipe como hero fullscreen com overlay grafite, eyebrow label técnico ("// DESDE 2020 //"), e replicar o padrão de contadores animados para estatísticas verificáveis (ex: nota Google, anos de atuação) — sem inventar métricas não confirmadas pelo cliente.

TEMPLATE 2 — Bixol (https://bixol-template.webflow.io/)

HERO: Proporção ~55/45, texto e formulário de contato à esquerda, imagem grande de obra à direita; elemento diferenciador são três mini-cards flutuantes sobre a imagem (telefone, horário, e-mail) sobrepostos à foto principal; ícones sociais verticais alinhados à margem esquerda da hero.
NAV: Nav com dropdown de serviços (seta indicando submenu), campo de busca embutido no header, CTA "Request a Quote" destacado à direita.
TIPOGRAFIA: Títulos serifados/display de grande porte na hero, corpo em sans-serif neutra; uso de labels pequenas em caixa alta antecedendo cada título de seção ("We are leading construction company").
CORES: Paleta neutra com imagens fotográficas fazendo o trabalho de cor — não há um accent vibrante forte, o que reforça por que o verde 
#7ED956 da Atlântic deve ser usado como diferencial ativo (o template Bixol, sem cor de marca forte, resulta genérico).
SERVIÇOS/CARDS: Um serviço em destaque grande (imagem + texto) e os demais em lista vertical compacta de ícone + título + texto curto — padrão de 3 colunas ícone+título+texto explicitamente evitado nas diretrizes anti-genérico do projeto.
ANIMAÇÕES (padrão observado): Setas de navegação de depoimentos com leve translateX no hover; contadores estatísticos (170, 10, 690, 7,1) com incremento numérico ao rolar; cards de equipe com fade sequencial.
MICRO-INTERAÇÕES: Hover em botões com leve escurecimento de fundo; setas de slide de depoimento com estado ativo/inativo.
ELEMENTOS DECORATIVOS: Logos de "marcas parceiras" em escala de cinza na faixa de credibilidade; ícone de seta repetido como separador entre depoimentos.
RESUMO CONSTRUTIVO: Aproveitar do Bixol o padrão de mini-cards de contato flutuantes sobre a imagem da hero (telefone/horário/e-mail) e o formato de ficha por membro de equipe — mas substituir a estrutura genérica de ícone+título+texto dos serviços pelo Bento Grid definido para o projeto, e substituir a paleta neutra por grafite + verde vívido da marca.

7 — SISTEMA DE VARIAÇÃO DE LAYOUT

HERO — escolhido: [X] D) Vídeo loop + texto com máscara de cor
Justificativa: único projeto do portfólio com vídeo institucional real disponível; aproveita o único vídeo recebido de forma central e diferenciadora.

SERVIÇOS — escolhido: [X] A) Bento Grid com cards de tamanhos variados
Justificativa: a empresa tem 5 serviços-âncora e uma lista estendida de 10 serviços — o bento grid permite hierarquizar visualmente sem recorrer ao padrão de 3 colunas ícone+título+texto (visto e evitado no template Bixol).

DEPOIMENTOS — escolhido: [X] E) Carrossel fade + nota Google visível
Justificativa: nota 4.6/11 avaliações é um ativo de confiança forte e verificado — deve ficar visível junto aos depoimentos reais coletados.

SOBRE/CREDENCIAIS — escolhido: [X] D) Split 50/50 com imagem fixada
Justificativa: única foto de retrato individual disponível (fundador ao lado do letreiro "ATLANTIC") funciona bem como imagem fixa ancorando o texto institucional sobre engenheiros e licenciamentos.