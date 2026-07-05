# CLAUDE.md — dofus-db-retro-api

## Contexte

API REST pour la base de données Dofus Rétro. Stack : Hono (TypeScript) + MySQL + db-migrate.

- **Repo GitHub** : `voikyrioh/dofus-db-retro-api`
- **Subdomain prod** : `dofus-db-api.voikyrioh.fr`
- **Port** : 8080
- **Image GHCR** : `ghcr.io/voikyrioh/dofus-db-retro-api`

## Stack

- Runtime : Node.js 24 (alpine)
- Framework : Hono
- ORM/migrations : db-migrate + mysql2
- Auth : JWT HS256 (clé symétrique base64)
- Logs & traces : `@Voikyrioh/observability` (pino corrélé OTel + spans SigNoz — GitHub Packages, `.npmrc` requis avec `GITHUB_TOKEN`)

## JWT

La clé JWT est **une chaîne base64** passée directement via variable d'environnement `JWT_PRIVATE_KEY`.

- En dev : valeur par défaut dans `src/config/params/server.config.ts` (`development-jwt-secret-key-...`)
- En prod : stockée dans Vault → `secret/apps/dofus-db-api`, clé `JWT_PRIVATE_KEY`

⚠️ Le code **ne lit plus de fichier** pour la clé JWT — `fs.readFile` a été supprimé.

## Base de données

### Config migrations (`database.json`)

```json
{
  "dev": { "driver": "mysql", "host": "localhost", "port": 33061, ... },
  "production": {
    "driver": "mysql",
    "host": { "ENV": "MYSQL_HOST" },
    "user": { "ENV": "MYSQL_USER" },
    "password": { "ENV": "MYSQL_PASSWORD" },
    "database": { "ENV": "MYSQL_DATABASE" },
    "port": { "ENV": "MYSQL_PORT" }
  }
}
```

La syntaxe `{"ENV": "VAR"}` est supportée nativement par db-migrate pour lire les variables d'environnement.

### Migrations

```bash
# Dev
npx db-migrate up

# Prod (via GitHub Actions workflow migrate-dofus-db.yml)
node node_modules/.bin/db-migrate up --config database.json -e production
```

### Seed (idempotent)

```bash
npm run seed
```

Le script `scripts/seed.ts` vérifie `COUNT(*) FROM item` avant d'insérer. Si des données existent déjà, il s'arrête sans rien faire.

## Développement local

```bash
npm run dev        # serveur avec hot-reload
npm run build      # compile TypeScript
npm run seed       # insère les données initiales
```

MySQL local via Docker ou SSH tunnel (port 33061 en dev).

## CI/CD

Push sur `main` → `ci.yml` → build image → appel `deploy-app.yml` (infra-as-code).

Secrets requis sur le repo (settés par `provision-app.yml` dans infra-as-code) :
- `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_PORT`
- `VAULT_ADDR`, `VAULT_ROLE_ID`, `VAULT_SECRET_ID`

## Observabilité (INFRA-16)

- `src/instrumentation.ts` (init OTel) **doit rester le premier import** de `src/index.ts`.
- Middleware `otelHono()` posé en premier dans `src/entry-point/app.ts`.
- `UseCase.runStep` = 1 span par étape métier dans SigNoz.
- Env : `OTEL_EXPORTER_OTLP_ENDPOINT` (prod `http://otel-collector:4318`, fiche app
  `internal_services: [signoz]`) ; dev sans collector : `OTEL_SDK_DISABLED=true`.
- Logs prod : stdout JSON (Fluent Bit → Loki) — `LOG_FILE` optionnel.
