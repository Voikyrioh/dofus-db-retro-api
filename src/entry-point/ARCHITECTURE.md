# src/entry-point/ — Routes, middlewares, DTOs
Maj : 2026-09-14

## Contenu
- `app.ts` — instance Hono, middlewares globaux (OTel, CORS), enregistrement routes
- `routes/` — modules routes par domaine (auth, items, crafts)
- `routes/{domaine}/{domaine}.route.ts` — router Hono avec handlers
- `routes/{domaine}/{domaine}.dto.ts` — schémas Zod validation query/params/body
- `middlewares/` — auth middleware (JWT validation)

## Règles du dossier
- **Routes** : un fichier par domaine, handlers légers (validation + appel use case/repository)
- **Validation** : middleware `betterZodValidator(type, schema)` obligatoire sur chaque route
- **DTOs** : schémas Zod lisibles, pas d'override post-validation en handler
- **Réponses** : `c.json(data)`, `c.notFound()`, `c.status(code)` — exception HTTP centralisée

## Points d'entrée
- `src/entry-point/app.ts::app` — app Hono + setup
- `src/entry-point/routes/auth/auth.route.ts` — routes auth
- `src/entry-point/routes/items/items.route.ts` — routes items
- `src/entry-point/routes/crafts/crafts.route.ts` — routes crafts
