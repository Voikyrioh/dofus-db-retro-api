---
id: ADR-0002
titre: db-migrate pour les migrations MySQL
type: librairie
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: []
---

# ADR-0002 — db-migrate

## Contexte
Besoin de gérer les versions de schéma MySQL en dev et prod. db-migrate (JS) s'intègre nativement dans le workflow Node.js.

## Décision
Utiliser `db-migrate` pour les migrations. Fichiers SQL dans `migrations/`, config `database.json` lue à la fois en dev et prod (env vars automatiques). Commande `npx db-migrate up`.

## Comment l'appliquer
- Nouvelle migration : `npx db-migrate create NomMigration --sql-file` → éditer `migrations/20260914nnn_NomMigration.sql`.
- Dev : `npm run seed` après `up` pour données initiales (idempotent).
- Prod : workflow `migrate-dofus-db.yml` appelle `db-migrate up --env production` avec Vault secrets.

## Quand NE PAS l'appliquer / limites
- Données de test : ne jamais mixer avec migrations (seed.ts séparé).
- Schema_migrations table auto-créée, pas modifiable à la main.

## Alternatives rejetées
- Prisma : trop lourd pour une API simple.
- Knex : migration bien, mais ORM optionnel ici (repositories + mysql2 suffisent).

## Conséquences
- Chaque changement schéma = commit `migrations/` + `src/domain/entities` ensemble.
- Tests intégration → base de test fraîche à chaque run (fixture).

## Références
- `database.json` — doc db-migrate.
- `scripts/seed.ts` — données initiales Dofus (idempotent, vérif COUNT avant insert).
