import { handleHttpErrors } from '@errors/handle-http-errors'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import craftsRoute from './routes/crafts/crafts.route'
import itemsRoute from './routes/items/items.route'
import authRoute from './routes/auth/auth.route'
import config from "@config";

const app = new Hono()

app.use(cors({ origin: config.Server.WebsiteUrl, credentials: true }))

app.route('crafts', craftsRoute)
app.route('items', itemsRoute)
app.route('auth', authRoute)

app.onError(handleHttpErrors)

export default app
