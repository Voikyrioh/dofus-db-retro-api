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
RUN npm install
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

CMD ["node", "./index.js"]
