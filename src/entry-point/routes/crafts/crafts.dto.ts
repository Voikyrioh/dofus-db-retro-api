import { z } from "zod";

export const idParams = z.coerce.number().int().positive().safe();
