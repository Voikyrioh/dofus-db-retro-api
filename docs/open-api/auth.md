# Auth — /auth

| Méthode | Route | Description | Handler |
|---|---|---|---|
| POST | /auth/register | Créer un nouveau compte | `src/entry-point/routes/auth/auth.route.ts::router.post('/register')` |
| POST | /auth/login | Connexion (générer token JWT) | `src/entry-point/routes/auth/auth.route.ts::router.post('/login')` |
| GET | /auth/logout | Déconnexion (clear cookie) | `src/entry-point/routes/auth/auth.route.ts::router.get('/logout')` |

## POST /auth/register

Créer un nouveau compte utilisateur.

### Body
```json
{
  "username": "string (min 4 chars)",
  "password": "string (min 8 chars)",
  "confirm": "string (min 8 chars, doit matcher password)",
  "email": "string (valid email)"
}
```

### Réponses

**201 Created**
```json
{
  "id": "string (ULID)",
  "username": "string",
  "email": "string",
  "role": "user"
}
```

**400 Bad Request**
- `VALIDATION_ERROR` — schéma invalid (username < 4, password < 8, email invalide, etc.)
- `ACCOUNT_ALREADY_EXISTS` — username ou email déjà utilisés

### Erreurs métier
- BR-AUTH-001 : username unique
- BR-AUTH-002 : password minimum 8 caractères

### Exemple
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "knight_01",
    "password": "SecurePass123",
    "confirm": "SecurePass123",
    "email": "knight@example.com"
  }'
```

---

## POST /auth/login

Authentifier un compte et obtenir un token JWT.

### Body
```json
{
  "username": "string (min 4 chars)",
  "password": "string (min 8 chars)"
}
```

### Réponses

**200 OK** (token set en cookie + body)
```json
{
  "token": "string (JWT)",
  "id": "string (ULID)",
  "username": "string",
  "email": "string",
  "role": "user"
}
```

**400 Bad Request**
- `INVALID_CREDENTIALS` — username not found ou password incorrect

### Cookies
- `access-token` : JWT token, expires en `JWT_EXPIRES_MS` (default 1 jour), domain = config.Server.Domain

### Exemple
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "knight_01",
    "password": "SecurePass123"
  }'
```

---

## GET /auth/logout

Déconnecter l'utilisateur (clear cookie JWT).

### Auth
Requis : JWT valide (Bearer token ou cookie `access-token`)

### Réponses

**200 OK**
```json
{}
```

### Cookies
- `access-token` : cleared (expires past)

### Exemple
```bash
curl -X GET http://localhost:3000/auth/logout \
  -H "Authorization: Bearer eyJ..."
```
