---
id: ADR-0004
titre: OpenTelemetry + @Voikyrioh/observability pour traçage
type: librairie
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: [INFRA-16]
---

# ADR-0004 — OTel observabilité

## Contexte
Besoin de tracer requêtes HTTP, appels BDD, et étapes métier pour diagnostiquer lenteurs et erreurs en prod. OTel + SigNoz (collector) = stack standard.

## Décision
Utiliser `@Voikyrioh/observability` (paquet interne) : preload prod pour patcher mysql2 statiques, instrumentation.ts dev, middleware `otelHono()`.

## Comment l'appliquer
- **Prod** : CMD Docker `node --import @Voikyrioh/observability/register ./index.js` (preload avant tout).
- **Dev** : `src/instrumentation.ts` premier import de `index.ts`, OTEL_SDK_DISABLED=true (pas de collector local).
- **Use cases** : appeler `this.runStep('nom', () => { logique })` pour créer span métier.
- **Middleware** : `app.use(otelHono())` premier dans `entry-point/app.ts`.

## Quand NE PAS l'appliquer / limites
- Pas de preload en dev (init in-app arrive tard) : utiliser instrumentation.ts.
- Spans DB morts si preload oublié (mysql2 static links) : tester par HTTP.

## Alternatives rejetées
- Datadog : plus cher, couplage vendor.
- Logs seuls : pas de corrélation, pas de traçage distribué.

## Conséquences
- Nouvelle feature → tests vérifier span présent (SigNoz, ou logs SigNoz locaux).
- Release → vérifier OTEL_EXPORTER_OTLP_ENDPOINT dans secrets Vault.

## Références
- `CLAUDE.md` section Observabilité (INFRA-16).
- Voir orga-global INFRA-16 pour fiche collector + Vault.
