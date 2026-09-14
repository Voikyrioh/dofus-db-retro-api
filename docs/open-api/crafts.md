# Crafts — /crafts

| Méthode | Route | Description | Handler |
|---|---|---|---|
| GET | /crafts/list | Lister les recettes paginées | `src/entry-point/routes/crafts/crafts.route.ts::router.get('/list')` |
| GET | /crafts/:id | Récupérer recette d'un item par ID | `src/entry-point/routes/crafts/crafts.route.ts::router.get('/:id')` |
| PUT | /crafts/:id | Créer/mettre à jour recette d'un item | `src/entry-point/routes/crafts/crafts.route.ts::router.put('/:id')` |

## GET /crafts/list

Récupérer la liste paginée des recettes de craft.

### Query params
```
page: number (default 1) — numéro page (0-indexed)
count: number (default 20) — nombre items par page
```

### Réponses

**200 OK**
```json
{
  "data": [
    {
      "itemId": "number",
      "recipe": [
        {
          "item": "number (item ID)",
          "quantity": "number"
        }
      ]
    }
  ],
  "total": "number",
  "page": "number"
}
```

**400 Bad Request**
- `VALIDATION_ERROR` — page ou count invalides

### Exemple
```bash
curl "http://localhost:3000/crafts/list?page=1&count=10"
```

---

## GET /crafts/:id

Récupérer la recette de craft pour un item donné.

### Params
```
id: number — ID de l'item
```

### Réponses

**200 OK**
```json
{
  "itemId": "number",
  "recipe": [
    {
      "item": "number (item ID)",
      "quantity": "number"
    }
  ]
}
```

**400 Bad Request**
- `VALIDATION_ERROR` — id invalide (non numérique)

**404 Not Found**
- Item inexistant ou sans recette de craft

### Exemple
```bash
curl "http://localhost:3000/crafts/42"
```

---

## PUT /crafts/:id

Créer ou mettre à jour la recette de craft pour un item.

### Params
```
id: number — ID de l'item
```

### Body
```json
[
  {
    "item": "number (item ID ingredient)",
    "quantity": "number (quantité requise)"
  }
]
```

### Réponses

**200 OK**
```json
{
  "message": "Recipe saved"
}
```

**400 Bad Request**
- `VALIDATION_ERROR` — id invalide ou body schema invalid

### Exemple
```bash
curl -X PUT http://localhost:3000/crafts/100 \
  -H "Content-Type: application/json" \
  -d '[
    { "item": 42, "quantity": 2 },
    { "item": 50, "quantity": 1 }
  ]'
```
