---
id: BR-AUTH-002
domaine: AUTH
titre: Mot de passe minimum 8 caractères
statut: active
invariant: true
source: entry-point/routes/auth/auth.dto.ts
maj: 2026-09-14
---

# BR-AUTH-002 — Mot de passe minimum 8 caractères

## Règle
Tout mot de passe de compte doit contenir au minimum 8 caractères. Les mots de passe < 8 chars sont rejetés.

## Application (code)
- `src/entry-point/routes/auth/auth.dto.ts::registerSchema` (L10) — `z.string().min(8)` sur champ password
- `src/entry-point/routes/auth/auth.dto.ts::loginSchema` (L5) — même validation en login
- Validation middleware `betterZodValidator('json', registerSchema)` avant handler

## Vérification
- Test : `tests/entry-point/routes/auth/auth.route.test.ts::"should reject pwd < 8"` (ou intégration)
- À la main : POST /auth/register password=`short` → erreur 400 validation Zod

## Cas limites
- Espace autorisé : `"pass 1234"` valide (8 chars)
- Caractères spéciaux autorisés : pas de restriction regex (hachage argon2 fera le reste)

## Règles liées
- BR-AUTH-001 (unicité username)

## Historique
- 2026-09-14 — création (session bootstrap doc-init)
