# src/data-access/ — Repositories et adapters BDD
Maj : 2026-09-14

## Contenu
- `repository/` — interfaces + implémentations (AccountsRepository, ItemsRepository, CraftsRepository)
- `database/MySQL/` — driver MySQL, ressources SQL, services requêtes
- `database/MySQL/resources/` — queries brutes par domaine (accounts, items, mobs, crafts, recipes)
- `database/MySQL/services/` — services calculs (stats aggregates)

## Règles du dossier
- **Isolation** : adapte MySQL, valide arguments (jamais faire confiance aux params non validés)
- **Repositories** : interfaces dans `repository/`, implémentations pour MySQL
- **Pas de métier** : zéro logique validation/calcul, juste requêtes + mapping entités
- **Erreurs** : retourner données ou lever exception d'accès (connection, timeout)

## Points d'entrée
- `src/data-access/repository/accounts.repository.ts::AccountsRepository` — CRUD comptes
- `src/data-access/repository/items.repository.ts::ItemsRepository` — recherche items
- `src/data-access/repository/crafts.repository.ts::CraftsRepository` — CRUD recettes
