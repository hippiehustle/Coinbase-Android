# kaos-ev-scanner-backend

Production-ready backend for a Coinbase live-data “EV Crypto Scanner” system designed to support a native Android app + widget.

- **Hosting**: Fly.io
- **Cache/store**: Upstash Redis (REST)
- **Realtime market data**: Coinbase Exchange public WebSocket feed (ticker + matches + level2)
- **Fallback/structure**: Coinbase public REST (products, stats, candles)
- **API**: Fastify (TypeScript)
- **Scheduler**: in-process Luxon timezone-safe scheduler (America/Denver)
- **Notifications**: Firebase Cloud Messaging (FCM) push notifications

## What this backend does

- Maintains a **tracked universe** of Coinbase spot `*-USD` products:
  - Always includes `BTC-USD` and `ETH-USD`
  - Keeps WebSocket subscriptions for the **top N by 24h USD volume** (default `80`), refreshed every 30 minutes
- Writes canonical market metrics to Upstash Redis under the **required key schema**
- Runs scans on schedule (09:00 / 12:00 / 16:00 / 20:00 America/Denver) and on-demand via API
- Produces **exactly one** EV-optimized trade plan result per scan:
  - `BUY` (execute)
  - `SETUP FORMING — WAIT` (with readiness score and what’s missing)
  - `NO TRADE`
- Sends FCM push notifications when:
  - `BUY` is issued, or
  - `SETUP FORMING — WAIT` with readiness score **>= 70**

## API

Public:
- `GET /health` -> `{ status, uptime, wsConnected, trackedProductsCount }`
- `GET /scan/latest` -> last scan JSON + formatted text output

Protected (requires `X-API-KEY` header matching `API_KEY` env):
- `POST /scan/run` -> triggers immediate scan and returns result
- `POST /device/register` -> `{ token: string }` adds device token
- `POST /device/unregister` -> `{ token: string }` removes device token

## Environment variables

Required:
- `NODE_ENV`
- `PORT`
- `API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `FCM_SERVER_KEY`

Optional:
- `COINBASE_WS_URL` (default `wss://ws-feed.exchange.coinbase.com`)
- `COINBASE_REST_BASE` (default `https://api.exchange.coinbase.com`)
- `LIQ_SPREAD_BPS_MAX` (default `50`)
- `LIQ_DEPTH_USD_MIN` (default `50000`)
- `TRACK_TOP_N` (default `80`)

Local dev convenience:
- Create `.env` (do not commit) with the above values.

## Setup (local)

1) Install deps

```bash
npm install
```

2) Run in dev mode

```bash
npm run dev
```

3) Run tests

```bash
npm test
```

4) Build + run production

```bash
npm run build
npm start
```

## Upstash + Fly.io setup

1) Create an Upstash Redis database and copy:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

2) Create an FCM legacy server key:
- Firebase Console → Project Settings → Cloud Messaging → **Server key**

3) Set Fly secrets (example)

```bash
fly secrets set API_KEY="..." UPSTASH_REDIS_REST_URL="..." UPSTASH_REDIS_REST_TOKEN="..." FCM_SERVER_KEY="..."
```

4) Deploy

```bash
fly deploy
```

## Android integration notes

- Call `POST /device/register` on app install/login with the FCM device token.
- Fetch the current plan from `GET /scan/latest` to render widget/app state.
- Trigger an on-demand scan from privileged client only via `POST /scan/run` with `X-API-KEY`.

## Redis key schema (canonical)

This backend writes keys exactly as specified in the project requirements, including:
- `m:<PRODUCT_ID>:lastPrice`, `m:<PRODUCT_ID>:spreadBps`, `c:<PRODUCT_ID>:1h`, `scan:latest`, `devices:tokens`, etc.