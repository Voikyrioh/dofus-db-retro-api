---
id: ADR-0001
titre: Clean architecture (domain/application/infrastructure)
type: architecture
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: []
---

# ADR-0001 — Clean architecture

## Contexte
L'API Dofus doit être maintenable et testable sur plusieurs années. Une architecture en couches isolées prévient les dépendances circulaires et facilite l'évolution sans impact croisé.

## Décision
Le repo suit une clean architecture typée : `domain/` (entités, use cases), `data-access/` (repositories, adapters), `entry-point/` (routes, DTOs, validation). Zéro import croisé hors dépendance unidirectionnelle.

## Comment l'appliquer
- Règles métier pures (validation, calculs) → `src/domain/usecases/`.
- Accès BDD → `src/data-access/repository/` (abstraction sur MySQL).
- Routes HTTP → `src/entry-point/routes/`, DTOs séparés pour chaque endpoint.
- Controllers retournent `repository.method()` directement, ne font pas de logique.

## Quand NE PAS l'appliquer / limites
- Utilitaires transverses mineurs → `src/shared/` (exceptions aux imports).
- Config → `src/config/` (tier séparé, accessible partout).

## Alternatives rejetées
- Hexagonal : surcompliqué pour une API simple.
- MVC (controllers monolithes) : perte d'isolation du domaine.

## Conséquences
- Nouvelle règle métier → nouveau fichier `usecase.ts` + test.
- Requête BDD → method + test sur le repository (jamais SQL inline dans route).

## Références
- Codepropre cleancode Uncle Bob (chapitres architecture).
- Voir orga-global ADR-0006 pour conventions nommage.
