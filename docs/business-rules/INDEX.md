# Règles métier — dofus-db-retro-api

## Domaines
- **AUTH** : authentification compte, gestion tokens
- **ITEMS** : articles/objets de la base Dofus
- **CRAFTS** : recettes de craft (composition items → résultat)

| ID | Domaine | Titre | Fonction | Invariant | Statut |
|---|---|---|---|---|---|
| [BR-AUTH-001](./BR-AUTH-001-unique-username.md) | AUTH | Username unique par compte | `register.usecase.ts::Execute` (L15) | ✓ | active |
| [BR-AUTH-002](./BR-AUTH-002-pwd-validation.md) | AUTH | Mot de passe minimum 8 caractères | `register.usecase.ts::validatePassword` (L32) | ✓ | active |
| [BR-ITEMS-001](./BR-ITEMS-001-search-filter.md) | ITEMS | Recherche items par terme libre | `items.repository.ts::find` (L12) | — | active |
