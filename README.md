## Taldo's Front (Front-only)

Este repositório está configurado em modo **front-only**.

### Stack
- Next.js
- React
- Redux Toolkit
- Sass

### Fluxo atual
- Autenticação simulada no cliente (`localStorage`) em `lib/frontEnd/auth.js`.
- Camada de dados local (mock) em `lib/frontEnd/toBack.js`.
- Não há `pages/api` nem backend embutido neste projeto.

### Scripts
- `npm run dev`: ambiente de desenvolvimento
- `npm run build`: build de produção
- `npm run start`: sobe a build
- `npm run lint`: lint
- `npm run typecheck`: validação TypeScript
- `npm run check`: typecheck + lint

### Recomendação de manutenção
- Para estabilidade, depois de validar em CI/produção, substitua versões `latest` por versões fixas.
- Gere sitemap/robots no build usando `next-sitemap`.

