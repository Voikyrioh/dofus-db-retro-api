# Architecture — dofus-db-retro-api
Stack : TypeScript, Hono, Node.js 24 · BDD : MySQL + db-migrate · Style : clean archi · Entrée : `src/index.ts`
Maj : 2026-09-14 (commit 5143f2e)

## Vue d'ensemble
API REST pour la base de données Dofus Rétro. Fournit des endpoints pour consulter et modifier les articles, recettes de craft, et gérer l'authentification. Requêtes HTTP → middleware auth/validation → use cases domaine → repositories MySQL → réponse JSON. Traces et logs centralisés via OTel/SigNoz.

## Carte
```
src/
├── config/           → lecture variables d'env, paramètres serveur (port, JWT, domaine)
├── domain/           → entités et use cases (auth login/register, crafts, items)
├── data-access/      → repositories, adapters BDD MySQL, queries
├── entry-point/      → routes HTTP Hono, middlewares, DTOs, validation
├── instrumentation.ts → init OTel pour dev
└── index.ts          → point d'entrée (preload instrumentation, démarrage serveur)

tests/                → tests unitaires + intégration (miroir src/)
migrations/           → scripts db-migrate SQL
scripts/              → seed idempotent
docs/                 → INDEX.md (open-api, adr, business-rules, bugs)
```

## Flux principaux
- Authentification : `POST /auth/register` → validation email/pwd → création compte MySQL → token JWT
- Consultation items : `GET /items/search` → validation query search → `repository.items.find()` → résultats filtrés
- Gestion crafts : `GET|PUT /crafts/:id` → validation ID → read/update recipe MySQL → réponse

## Conventions locales
- **Clean archi** : domain (entités + usecases), data-access (repositories), entry-point (routes/controllers). Aucune import croisée : domain → application → infrastructure.
- **Validation** : `betterZodValidator('json|param|query', schema)` middleware Hono avant handler.
- **Erreurs** : `FunctionalError` (métier), exceptions HTTP via `HTTPException` ; middleware `handleHttpErrors` centralisé.
- **OTel** : init preload prod (patcher mysql2 static imports), instrumentation.ts dev, middleware `otelHono()` premier, `UseCase.runStep` = span métier.

## Commandes
- Tests : `npm test` (mocha) · Lint : `npm run lint` (biome) · Build : `npm run build` · Dev : `npm run dev` (tsx hot-reload)

## Où chercher
| Je cherche… | Dossier / fichier |
|---|---|
| une règle métier | `docs/business-rules/INDEX.md` puis `src/domain/usecases/…` |
| un endpoint | `docs/open-api/INDEX.md` puis `src/entry-point/routes/…` |
| un modèle de données | `src/domain/entities/…` |
| une requête BDD | `src/data-access/repository/…` |
