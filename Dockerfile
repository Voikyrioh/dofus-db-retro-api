FROM node:24-alpine AS BUILDER

LABEL org.opencontainers.image.source=$PROJECT_DOCKER_URL
LABEL org.opencontainers.image.description="Dofus retro api"
LABEL org.opencontainers.image.licenses=MIT

COPY src src/
COPY libraries libraries/
COPY migrations migrations/
COPY scripts scripts/
COPY package.json .
COPY database.json .
COPY build.mjs .

ENV NPM_CONFIG_LOGLEVEL warn
# @Voikyrioh/observability vit sur GitHub Packages : auth requise au npm install.
# GITHUB_TOKEN = build-arg passé par deploy-app.yml (NPM_TOKEN du repo, PAT read:packages).
ARG GITHUB_TOKEN
RUN echo "@Voikyrioh:registry=https://npm.pkg.github.com" > .npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
RUN npm install
RUN rm .npmrc
RUN npm install -g esbuild
RUN node build.mjs

FROM node:24-alpine AS RUNNER

COPY --from=builder dist .
COPY --from=builder node_modules node_modules/
COPY --from=builder migrations migrations/
COPY --from=builder scripts scripts/
COPY --from=builder database.json .
COPY --from=builder package.json .

RUN mkdir -p /data/logs

EXPOSE 8080

# --import register : hook ESM + init SDK dans le preload, AVANT le linking
# du bundle — l'init in-app arrivait trop tard pour patcher les imports
# statiques (mysql2 sans span, cf. CHANGELOG observability 0.4.0).
# OTEL_SERVICE_NAME requis (fiche infra), l'init in-app devient un no-op.
CMD ["node", "--import", "@Voikyrioh/observability/register", "./index.js"]
