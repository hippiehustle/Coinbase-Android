import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  API_KEY: z.string().min(16),

  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(10),

  FCM_SERVER_KEY: z.string().min(20),

  COINBASE_WS_URL: z.string().url().default("wss://ws-feed.exchange.coinbase.com"),
  COINBASE_REST_BASE: z.string().url().default("https://api.exchange.coinbase.com"),

  LIQ_SPREAD_BPS_MAX: z.coerce.number().finite().positive().default(50),
  LIQ_DEPTH_USD_MIN: z.coerce.number().finite().positive().default(50_000),
  TRACK_TOP_N: z.coerce.number().int().min(10).max(300).default(80)
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error("Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

