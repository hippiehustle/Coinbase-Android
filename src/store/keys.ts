export const REDIS_KEYS = {
  // Scan outputs
  scanLatest: "scan:latest",
  scanHistory: "scan:history",
  scanBuysLast7d: "scan:buys:last7d",
  devicesTokens: "devices:tokens",

  // Internal metadata
  trackedProducts: "meta:trackedProducts",
  wsConnected: "meta:wsConnected",
  marketAggVolBaseline: "meta:marketAggVol24hUsd:baseline",
  marketAggVolBaselineDate: "meta:marketAggVol24hUsd:baselineDate",
  scannerThresholdAdj: "meta:scanner:thresholdAdj"
} as const;

export function mKey(productId: string, field: string): string {
  return `m:${productId}:${field}`;
}

export function cKey(productId: string, gran: "1h" | "1d"): string {
  return `c:${productId}:${gran}`;
}

