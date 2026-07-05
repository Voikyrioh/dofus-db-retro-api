/**
 * Init OpenTelemetry — DOIT rester le premier import de src/index.ts :
 * le patch des modules (mysql/http/fetch) précède leurs imports applicatifs.
 * Endpoint via env OTEL_EXPORTER_OTLP_ENDPOINT (prod : http://otel-collector:4318,
 * réseau docker `signoz`). Kill switch dev : OTEL_SDK_DISABLED=true.
 */
import { initObservability } from '@Voikyrioh/observability'

initObservability({ serviceName: 'dofus-db-api' })
