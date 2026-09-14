# Items — /items

| Méthode | Route | Description | Handler |
|---|---|---|---|
| GET | /items/search | Chercher items par terme libre | `src/entry-point/routes/items/items.route.ts::router.get('/search')` |

## GET /items/search

Chercher les items dont le nom contient le terme search.

### Query params
```
search: string (required) — terme de recherche libre
```

### Réponses

**200 OK**
```json
[
  {
    "id": "number",
    "name": "string",
    "description": "string",
    "level": "number",
    "rarity": "string"
  }
]
```

**400 Bad Request**
- `VALIDATION_ERROR` — param search manquant ou invalide

### Erreurs métier
- BR-ITEMS-001 : recherche par terme libre (LIKE sur nom)

### Exemple
```bash
curl "http://localhost:3000/items/search?search=sword"
```

### Comportement
- Résultats filtrés : items dont le champ `name` LIKE '%search%'
- Cas insensible selon collation MySQL (par défaut case-insensitive)
- Limite résultats : 100 items max (ou configurable)
