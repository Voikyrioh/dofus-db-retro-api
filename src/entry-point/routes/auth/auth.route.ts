import config from "@config";
import { Hono } from "hono";
import { setCookie } from "hono/cookie"
import { usecases } from "../../../domain/usecases";
import { loginSchema, registerSchema } from "./auth.dto";
import { AppError } from "@errors/app.error";
import { HTTPException } from "hono/http-exception";
import { HttpCodes } from "@errors/http.error";

const router = new Hono();

router.post("/register", async (c) => {
    const account = registerSchema.parse(await c.req.json());

    return c.json(await usecases.auth.register.Execute(account));
});

router.post("/login", async (c) => {
    const account = loginSchema.parse(await c.req.json());
    try {
        const {token, userInfos} = await usecases.auth.login.Execute(account.username, account.password)

        setCookie(c, 'token', token, {
            domain: config.Server.Domain,
            expires: new Date(Date.now() + config.Server.JwtExpiresMs)
        })

        return c.json(userInfos);
    } catch (e) {
        if ( e instanceof AppError && ['INVALID_PASSWORD', 'NOT_FOUND'].includes(e.type))
            throw new HTTPException(HttpCodes.BAD_REQUEST, {message: 'INVALID_CREDENTIALS'})
        else throw e;
    }
});

export default router;
