# Docs — dofus-db-retro-api
Maj : 2026-09-14. Point d'entrée obligatoire des agents (recherche, dev, conception). ARCHITECTURE.md = carte du code.

| Dossier | Contenu | Quand le consulter |
|---|---|---|
| [adr/](./adr/INDEX.md) | 4 décisions (clean archi, db-migrate, Hono, OTel) | avant tout choix technique / nouvelle lib |
| [business-rules/](./business-rules/INDEX.md) | 3 règles, domaines : AUTH, ITEMS, CRAFTS | avant tout dev/fix sur un domaine |
| [open-api/](./open-api/INDEX.md) | 7 endpoints (auth, items, crafts) | avant de toucher une route / un client |
| [bugs/](./bugs/INDEX.md) | 0 fiches FIX:ULID | avant de modifier une zone marquée FIX: |
| [guides/](./guides/) | setup dev, commandes locales | onboarding, run local |

## Globales (orga-global)
- `J:/Dev/Projects/orga/global/docs/adr/INDEX.md` — ADR globales (règles de code/archi communes)
- `J:/Dev/Projects/orga/global/product-descriptions/dofus.md` — fiche écosystème
