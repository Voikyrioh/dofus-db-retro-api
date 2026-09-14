---
id: BR-AUTH-001
domaine: AUTH
titre: Username unique par compte
statut: active
invariant: true
source: auth/register.usecase.ts
maj: 2026-09-14
---

# BR-AUTH-001 — Username unique par compte

## Règle
Chaque compte enregistré doit avoir un username unique. Deux comptes ne peuvent pas partager le même username.

## Application (code)
- `src/domain/usecases/auth/register.usecase.ts::Execute` (L11-14) — appel `checkAccountAlreadyExists(username)` qui lève FunctionalError si trouvé
- `src/data-access/repository/accounts.repository.ts` — query SELECT COUNT WHERE username pour vérif

## Vérification
- Test : `tests/domain/usecases/auth/register.test.ts::"should throw when username exists"` (ou équivalent)
- À la main : enregistrer deux comptes même username → erreur 400 BAD_REQUEST

## Cas limites
- Username case-sensitive : `admin` ≠ `ADMIN` (bases MySQL par défaut case-insensitive → à normaliser si besoin)

## Règles liées
- BR-AUTH-002 (validation mot de passe)

## Historique
- 2026-09-14 — création (session bootstrap doc-init)
