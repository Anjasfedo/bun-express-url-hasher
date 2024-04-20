import z from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
  REDIS_PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
});
