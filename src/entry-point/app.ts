import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception"
import {ZodError} from 'zod'
import craftsRoute from "./routes/crafts/crafts.route";
import itemsRoute from "./routes/items/items.route";

const app = new Hono()

app.use(cors())

app.route('crafts', craftsRoute )
app.route('items', itemsRoute )

app.onError(err => {
    if ( err instanceof ZodError) {
        console.error(err)
        return new HTTPException(400, { cause: err.issues }).getResponse()
    } else if ( err instanceof HTTPException) {
        return err.getResponse()
    } else {
        console.error(err)
        return new HTTPException(500, { message: 'Internal server error', cause: err }).getResponse()
    }
})

export default app;
