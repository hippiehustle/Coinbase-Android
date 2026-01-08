import { DateTime } from "luxon";

export const DENVER_TZ = "America/Denver";

export function nowMs(): number {
  return Date.now();
}

export function dtInDenverNow(): DateTime {
  return DateTime.now().setZone(DENVER_TZ);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

