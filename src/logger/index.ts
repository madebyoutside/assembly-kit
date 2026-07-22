import { AsyncLocalStorage } from "node:async_hooks";

import pino from "pino";
import type { Logger, LoggerOptions } from "pino";

export type { Logger, LoggerOptions } from "pino";

// pino-pretty's default transport uses a worker thread that breaks in
// serverless runtimes (Vercel, Cloudflare). Emit plain JSON everywhere.
// The `err`/`error` serializers ensure Error objects log message + stack
// instead of `{}` — the usual serverless footgun. For pretty local output
// use `createPrettyLogger` below (sync stream, no worker thread).
const DEFAULT_OPTIONS: LoggerOptions = {
  level: process.env.LOG_LEVEL ?? "info",
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
  },
};

const buildLogger = (options: LoggerOptions = {}): Logger =>
  pino({ ...DEFAULT_OPTIONS, ...options });

const store: AsyncLocalStorage<Logger> = new AsyncLocalStorage<Logger>();

/**
 * Get or create a request-scoped logger via `AsyncLocalStorage`.
 * Returns the existing instance if one exists. Pass options to customize
 * on first call; subsequent calls in the same async context return the
 * same instance.
 *
 * @example
 * ```ts
 * const logger = createLogger({ level: "debug" });
 * logger.info("hello");
 * logger.warn("careful");
 * logger.error("oops");
 *
 * // Later in the same async context:
 * const same = createLogger(); // returns the same instance
 * ```
 */
export const createLogger = (options: LoggerOptions = {}): Logger => {
  const existing = store.getStore();
  if (existing) {
    return existing;
  }
  const instance = buildLogger(options);
  store.enterWith(instance);
  return instance;
};

/** A default global logger instance for convenience. */
export const logger: Logger = buildLogger();

/**
 * Create a logger with human-readable colorized output for local development.
 *
 * Uses pino-pretty as a **synchronous stream** (`sync: true`) rather than the
 * default worker-thread transport, so it is safe on serverless runtimes that
 * forbid worker threads. Requires `pino-pretty` to be installed (optional peer
 * dependency) — it is imported dynamically so plain-JSON users never bundle it.
 *
 * Gate it to local runs so production stays plain JSON:
 *
 * @example
 * ```ts
 * const log =
 *   process.env.NODE_ENV === "development"
 *     ? await createPrettyLogger()
 *     : createLogger();
 * ```
 */
export const createPrettyLogger = async (options: LoggerOptions = {}): Promise<Logger> => {
  const { default: pretty } = await import("pino-pretty");
  const stream = pretty({ colorize: true, sync: true });
  return pino({ ...DEFAULT_OPTIONS, ...options }, stream);
};
