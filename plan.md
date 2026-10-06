# Aya Face — plano de implementação

## Produto e público

Site institucional e de conversão para a Aya Face — Estética Avançada, voltado a pessoas que buscam procedimentos faciais e corporais com tecnologia, atendimento próximo e resultados naturais. O objetivo primário é gerar avaliações agendadas e capturar leads com consentimento claro; o secundário é criar autoridade por meio de conteúdo editorial.

## Direção de design

- **Movimento:** luxo silencioso / editorial de wellness, com atmosfera de clínica boutique e precisão tecnológica.
- **Princípios:** contraste sofisticado, respiro visual, hierarquia tipográfica editorial e conversão sem agressividade.
- **Filosofia de cor:** dourado champanhe como assinatura da marca e sinal de cuidado premium; branco quente para luminosidade; carvão suave para confiança, legibilidade e equilíbrio.
- **Paradigma de layout:** narrativa vertical com blocos assimétricos, sobreposições suaves, cards de tratamento em trilho horizontal no mobile e chamadas de ação sempre próximas do conteúdo relevante.
- **Elementos assinatura:** filetes dourados finos, selo circular inspirado no logo Aya, microtextura de papel claro e botões em dourado com sombra curta.
- **Interação:** foco em microdecisões simples (conhecer, comparar, agendar), feedback de formulário direto e navegação com âncoras claras.
- **Animação:** entradas curtas por fade/slide, hover discreto nos cards e nenhuma animação que impeça leitura ou prejudique performance/responsividade.
- **Tipografia:** Cormorant Garamond para títulos e editorial; DM Sans para interface e texto. Hierarquia com títulos grandes, eyebrow em caixa alta espaçada e corpo confortável.
- **Essência:** estética avançada com olhar humano para quem quer se sentir bem na própria pele — contemporânea, acolhedora, precisa.
- **Voz:** elegante, segura e próxima; evitar promessas absolutas. Exemplos: “Seu cuidado começa com uma avaliação que olha para você.” / “Tecnologia para revelar, não para transformar quem você é.”
- **Wordmark/logo:** preservar o símbolo e a assinatura do logo fornecido como referência da marca; no cabeçalho, usar o nome Aya Face em tipografia editorial acompanhado de selo circular.
- **Cor proprietária:** dourado Aya `#C59A4A`.

## Arquitetura

- `client/src/App.tsx`: shell, rotas Home, Serviços, Blog, artigo e Admin editorial.
- `client/src/index.css`: tokens de cor, tipografia, componentes responsivos e estados de acessibilidade.
- `client/public/`: logo otimizado e imagens estáticas de apoio.
- `server/routers.ts`: procedimentos tRPC públicos para leads e blog, além de operações editoriais para demonstração do CMS.
- `server/db.ts`: queries de leads e posts.
- `drizzle/schema.ts` + `drizzle/migrations/`: tabelas `leads` e `blog_posts` com `publishedAt`, status e timestamps.
- `public/manus-routes.json`: manifesto das rotas navegáveis.
- `app.config.ts`: identidade do projeto para o Webdev.

## Dados e comportamento

O formulário de avaliação valida nome, telefone e email no cliente e no servidor, grava na tabela de leads e retorna confirmação sem expor dados sensíveis. O blog lista apenas materiais com `publishedAt <= now` na área pública; o editor pode criar, editar, excluir e agendar posts por data, mantendo o campo `status` (`draft`, `scheduled`, `published`). A publicação agendada é representada pelos dados persistidos e pela regra temporal, permitindo conectar uma rotina de agendamento posteriormente sem alterar o modelo.

## SEO e publicação

Página inicial e rotas editoriais terão title, description, canonical relativo, Open Graph, Twitter cards, JSON-LD de MedicalBusiness e Article, além de `robots.txt` e `sitemap.xml`. O container existente será usado para publicação gerenciada, com health check `/api/health`, e o manifesto de rotas será mantido sincronizado.
