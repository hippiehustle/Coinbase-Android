import { cKey, mKey, REDIS_KEYS } from "./keys.js";

export type TrendState = "FALLING" | "BASING" | "TRENDING";

export type MarketSnapshot = {
  productId: string;
  lastPrice: number;
  change24hPct: number;
  vol24hUsd: number;
  rollVol5mUsd: number;
  rollVol15mUsd: number;
  rollVol1hUsd: number;
  spreadBps: number;
  depthUsdTop: number;
  lastUpdateMs: number;
};

export type Candle = {
  // Coinbase candles: [time, low, high, open, close, volume]
  t: number; // seconds epoch
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
};

export type ScanState = "BUY" | "SETUP FORMING — WAIT" | "NO TRADE";

export type ScanResult = {
  id: string;
  createdAtMs: number;
  state: ScanState;
  productId?: string;
  readinessScore?: number;
  windowDays?: number;
  why?: string;
  missing?: string[];
  confirmPrice?: number;
  invalidatePrice?: number;
  formattedText: string;
  meta?: Record<string, unknown>;
};

export const Keys = {
  REDIS_KEYS,
  mKey,
  cKey
};

