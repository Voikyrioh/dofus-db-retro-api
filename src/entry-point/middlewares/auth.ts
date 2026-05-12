import config from "@config";
import type { MiddlewareHandler } from "hono";
import { bearerAuth } from 'hono/bearer-auth'
import { verify } from 'hono/jwt'
import { type RoleNames, type Roles, rolesMap } from '../../domain/entities/account.entity'

export const authMiddleware = (verifyRoles?: RoleNames[]): MiddlewareHandler<{ Variables: {loggedUser: { role: Roles, id: string }} }> =>
    bearerAuth({
        verifyToken: async (token, c) => {
            const jwt = await verify(token, config.Server.JwtSignKey, "HS256") as { role: Roles, id: string }

            c.set('loggedUser', jwt)

            return !verifyRoles || verifyRoles.includes(rolesMap[jwt.role])
        }
    })
