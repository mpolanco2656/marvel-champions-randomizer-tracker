# VPS Docker deployment

This app is deployed as a static Vite build served by Nginx.

## Files

- `docker-compose.yml`: service definition for the VPS.
- `app/Dockerfile`: multi-stage Node build plus Nginx runtime.
- `app/nginx.conf`: static file serving, SPA fallback, cache headers, and security headers.
- `.env.example`: optional local port override.

## First deploy

```bash
git clone <repo-url>
cd marvel-champions-randomizer-tracker
cp .env.example .env
docker compose up -d --build
```

The app is exposed on `APP_PORT`, defaulting to `3000`.

## Update deploy

```bash
git pull
docker compose up -d --build
```

## Operations

```bash
docker compose ps
docker compose logs -f web
docker compose restart web
docker compose down
```

## Reverse proxy

If the VPS already has Nginx, Caddy, Traefik, or a cloud panel in front, point the proxy to:

```text
http://127.0.0.1:3000
```

Change `.env` if the host port needs to be different:

```env
APP_PORT=3010
```
