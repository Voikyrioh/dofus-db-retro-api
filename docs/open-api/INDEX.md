# API endpoints — dofus-db-retro-api

**Total : 7 endpoints** (auth 3, crafts 2, items 1)

| Méthode | Route | Auth | Description | Ressource |
|---|---|---|---|---|
| POST | `/auth/register` | — | Créer un nouveau compte | [auth.md#register](./auth.md#post-authregister) |
| POST | `/auth/login` | — | Connexion (token JWT) | [auth.md#login](./auth.md#post-authlogin) |
| GET | `/auth/logout` | required | Déconnexion (clear cookie) | [auth.md#logout](./auth.md#get-authlogout) |
| GET | `/crafts/list` | — | Lister les recettes de craft paginées | [crafts.md#list](./crafts.md#get-craftslist) |
| GET | `/crafts/:id` | — | Récupérer recette item par ID | [crafts.md#get-by-id](./crafts.md#get-craftsid) |
| PUT | `/crafts/:id` | — | Mettre à jour recette item | [crafts.md#put-by-id](./crafts.md#put-craftsid) |
| GET | `/items/search` | — | Chercher items par terme libre | [items.md#search](./items.md#get-itemssearch) |
