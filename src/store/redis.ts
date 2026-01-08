import { Redis } from "@upstash/redis";
import type { Logger } from "../utils/log.js";

export type RedisJson = string | number | boolean | null | RedisJson[] | { [k: string]: RedisJson };

export type RedisClient = Redis;

export function createRedis(): RedisClient {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!
  });
}

export class Store {
  constructor(
    private readonly redis: RedisClient,
    private readonly log: Logger
  ) {}

  async ping(): Promise<boolean> {
    try {
      const res = await this.redis.ping();
      return res === "PONG";
    } catch (e) {
      this.log.error({ err: e }, "redis ping failed");
      return false;
    }
  }

  async getString(key: string): Promise<string | null> {
    const v = await this.redis.get<string>(key);
    if (v == null) return null;
    return String(v);
  }

  async getNumber(key: string): Promise<number | null> {
    const v = await this.redis.get<number>(key);
    if (v == null) return null;
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? n : null;
  }

  async set(key: string, value: string | number, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds && ttlSeconds > 0) {
      await this.redis.set(key, value, { ex: ttlSeconds });
      return;
    }
    await this.redis.set(key, value);
  }

  async setJson(key: string, value: RedisJson, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    await this.set(key, payload, ttlSeconds);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      this.log.warn({ err: e, key }, "failed to parse json from redis");
      return null;
    }
  }

  async sadd(key: string, member: string): Promise<number> {
    return this.redis.sadd(key, member);
  }

  async srem(key: string, member: string): Promise<number> {
    return this.redis.srem(key, member);
  }

  async smembers(key: string): Promise<string[]> {
    return this.redis.smembers<string>(key);
  }

  async lpush(key: string, value: string): Promise<number> {
    return this.redis.lpush(key, value);
  }

  async ltrim(key: string, start: number, stop: number): Promise<"OK"> {
    return this.redis.ltrim(key, start, stop);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.redis.lrange<string>(key, start, stop);
  }

  pipeline() {
    return this.redis.pipeline();
  }
}

