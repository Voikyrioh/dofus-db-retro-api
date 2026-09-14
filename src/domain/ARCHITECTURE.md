# src/domain/ — Entités et use cases métier
Maj : 2026-09-14

## Contenu
- `entities/` — modèles domaine (AccountEntity, ItemEntity, CraftEntity, StatsEntity)
- `usecases/` — orchestration métier (auth login/register, crafts queries)
- `enums/` — énumérations types (ItemsTypes, StatsType, Roles)

## Règles du dossier
- **Isolation** : zéro dépendance vers data-access, interfaces, ou infrastructure
- **Entités** : logique de validation (Zod) + méthodes métier (hashPassword, verifyPassword)
- **Use cases** : classe `XxxUseCase extends UseCase` avec `Execute()` async, chaque étape logique = `this.runStep(name, fn)`
- **Pas d'I/O** : exceptions FunctionalError uniquement, jamais HTTP ou DB directs

## Points d'entrée
- `src/domain/usecases/auth/register.usecase.ts::RegisterAccountUseCase.Execute` — enregistrement compte
- `src/domain/usecases/auth/login.usecase.ts::LoginAccountUseCase.Execute` — authentification
- `src/domain/entities/account.entity.ts::AccountEntity.CreateAccount` — création entité compte
