import { Hono } from "hono";
import { cors } from "hono/cors";
import craftsRoute from "./routes/crafts/crafts.route";
import itemsRoute from "./routes/items/items.route";

const app = new Hono()

app.use(cors())

app.route('crafts', craftsRoute )
app.route('items', itemsRoute )

export default app;
