# Setup développement — dofus-db-retro-api

## Prérequis

- Node.js 20 LTS
- Docker Desktop (MySQL local)
- GITHUB_TOKEN en `.npmrc` (pour paquet @Voikyrioh/observability)

## Installation

```bash
npm install
```

### .npmrc GitHub
Créer/éditer `.npmrc` à la racine du projet :
```
@voikyrioh:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Base de données MySQL

### Dev local (Docker)
```bash
# Démarrer MySQL
docker compose -f compose.dev.yml up -d

# Appliquer migrations
npm run migrate

# Seed données initiales (idempotent)
npm run seed
```

### Connexion
- Host : localhost
- Port : 33061 (dev) ou 3306 (prod)
- User : root
- Password : (voir `compose.dev.yml`)
- Database : dofus_retro

## Développement

```bash
# Serveur avec hot-reload
npm run dev

# URL locale : http://localhost:3000
```

### Logs
- Dev : stdout console (pino pretty)
- OTel : `OTEL_SDK_DISABLED=true` par défaut en dev (pas de collector local)

## Build & Tests

```bash
# Compiler TypeScript
npm run build

# Linter
npm run lint

# Tests unitaires
npm test

# Tests intégration (base de test fraîche)
npm run test:integration
```

## Envs requises (dev)

```bash
# .env.local (non commité)
DB_HOST=localhost
DB_PORT=33061
DB_NAME=dofus_retro
DB_USER=root
DB_PASSWORD=dev_password

JWT_PRIVATE_KEY=development-jwt-secret-key-...
JWT_EXPIRES_MS=86400000

NODE_ENV=development
OTEL_SDK_DISABLED=true
```

## Troubleshooting

### "Cannot find module @Voikyrioh/observability"
Vérifier GITHUB_TOKEN dans `.npmrc`.

### MySQL connection refused
Docker container arrêté ou port 33061 occupé. Vérifier `docker ps`.

### Hot-reload ne fonctionne pas
Tuer le process `npm run dev`, relancer `npm run dev`.
