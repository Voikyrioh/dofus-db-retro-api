import { parseEnv } from "znv";
import { z } from "zod";

export const { PORT, HOST, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } = parseEnv(process.env, {
    PORT: z.number().min(1).max(65535).optional().default(8080),
    HOST: z.string().min(1).max(255).optional().nullable().default(null),
    MYSQL_HOST: z.string(),
    MYSQL_USER: z.string(),
    MYSQL_PASSWORD: z.string(),
    MYSQL_DATABASE: z.string(),
    MYSQL_PORT: z.number().min(1).max(65535)
})
