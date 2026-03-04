import { Hono } from "hono";
import { sign } from "hono/jwt"
import { setCookie } from "hono/cookie"
import { usecases } from "../../../domain/usecases";
import { loginSchema, registerSchema } from "./auth.dto";
import * as fs from "node:fs/promises";
import config from "@config";

const router = new Hono();

router.post("/register", async (c) => {
    const account = registerSchema.parse(await c.req.json());

    return c.json(await usecases.auth.register.Execute(account));
});

router.post("/login", async (c) => {
    const account = loginSchema.parse(await c.req.json());
    const user = await usecases.auth.login.Execute(account.username, account.password)

    setCookie(c, 'token', await sign(
        {id: user.id, role: user.role},
        await fs.readFile(config.Server.JwtSignKey, {encoding: "base64"})
    ), {
        domain: "localhost",
        expires: new Date(365 * 86)
    })
    return c.json(user.getInfo);
});

export default router;
