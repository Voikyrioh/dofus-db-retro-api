---
id: ADR-0003
titre: Hono pour le framework HTTP
type: librairie
statut: acceptée
date: 2026-09-14
portee: repo
remplace: —
liens: []
---

# ADR-0003 — Hono

## Contexte
Framework HTTP léger (comparable Express/Fastify) avec middlewares typés, validation intégrée, et support multi-runtime (Node, Cloudflare, Bun).

## Décision
Hono pour les routes. Validation middleware `betterZodValidator`, gestion d'erreurs via `HTTPException`, CORS centralisé.

## Comment l'appliquer
- Route classique : `router.post('/endpoint', validator, handler)` → `c.json(data)` ou `c.notFound()`.
- Middlewares : `app.use(middleware)` en ordre, premier = `otelHono()` (traçage).
- Erreurs métier : lever `FunctionalError` → middleware `handleHttpErrors` mappe sur HTTP codes.
- Cookies : `setCookie(c, 'name', value, options)` avec domaine prod.

## Quand NE PAS l'appliquer / limites
- Streaming volumineux : Hono léger mais pas optimisé cache/compression (à implémenter si besoin).
- WebSocket : Hono supporte, mais API REST suffisante ici.

## Alternatives rejetées
- Express : moins typé, plus verbeux.
- Fastify : plus rapide mais overhead infra ici non justifié.

## Conséquences
- Nouvelles routes → fichier `src/entry-point/routes/{domaine}/{domaine}.route.ts`.
- Validation obligatoire sur tous les inputs (query, params, body).

## Références
- Hono docs : https://hono.dev
- Voir ADR-0001 (clean archi) pour placement routes.
