import pino from "pino";

export function createLogger() {
  const level = process.env.NODE_ENV === "production" ? "info" : "debug";
  return pino({
    level,
    redact: {
      paths: ["req.headers.authorization", "req.headers.x-api-key"],
      remove: true
    }
  });
}

export type Logger = ReturnType<typeof createLogger>;

