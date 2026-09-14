---
id: BR-ITEMS-001
domaine: ITEMS
titre: Recherche items par terme libre
statut: active
invariant: false
source: entry-point/routes/items/items.route.ts
maj: 2026-09-14
---

# BR-ITEMS-001 — Recherche items par terme libre

## Règle
Les requêtes de recherche d'items acceptent une chaîne de caractères libre passée en query param `search`. La recherche est sensible à la casse et filtre les items dont le nom contient la chaîne.

## Application (code)
- `src/entry-point/routes/items/items.route.ts::router.get('/search')` (L7-13) — parse query.search, appelle `repository.items.find(queries.search)`
- `src/data-access/repository/items.repository.ts::find` — query LIKE pour filtrage

## Vérification
- Test : `tests/data-access/repository/items.repository.test.ts::"find('sword') returns filtered items"` (ou équivalent)
- À la main : GET /items/search?search=sword → JSON liste items contenant 'sword'

## Cas limites
- Search vide : retour liste complète (ou vide selon config)
- SQL injection : Zod + paramètres requête liés préviennent (mysql2 escaping)

## Règles liées
- (aucune)

## Historique
- 2026-09-14 — création (session bootstrap doc-init)
