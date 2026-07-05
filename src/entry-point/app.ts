import { handleHttpErrors, otelHono } from '@Voikyrioh/observability'
import config from '@config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoute from './routes/auth/auth.route'
import craftsRoute from './routes/crafts/crafts.route'
import itemsRoute from './routes/items/items.route'

const app = new Hono()

// Premier middleware : span serveur par requête (SigNoz) + traceparent W3C
app.use(otelHono())
app.use(cors({ origin: config.Server.WebsiteUrl, credentials: true }))

app.route('crafts', craftsRoute)
app.route('items', itemsRoute)
app.route('auth', authRoute)

app.onError(handleHttpErrors)

export default app
