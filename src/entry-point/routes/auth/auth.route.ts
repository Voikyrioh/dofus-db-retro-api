import config from "@config";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { setCookie } from "hono/cookie"
import { usecases } from "../../../domain/usecases";
import { loginSchema, registerSchema } from "./auth.dto";
import { AppError } from "@errors/app.error";
import { HTTPException } from "hono/http-exception";
import { HttpCodes } from "@errors/http.error";
import { customValidator } from "@libraries";

const router = new Hono();

router.post("/register", customValidator('json', registerSchema), async (c) => {
    const account = c.req.valid('json');

    return c.json(await usecases.auth.register.Execute(account));
});

router.post("/login", customValidator('json', loginSchema), async (c) => {
    const account = c.req.valid('json');
    try {
        const {token, userInfos} = await usecases.auth.login.Execute(account.username, account.password)

        setCookie(c, 'access-token', token, {
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
