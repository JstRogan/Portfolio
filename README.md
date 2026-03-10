## Overview
Portfolio app built with Next.js App Router. It includes:
- Admin dashboard with CRUD for projects/experience/messages
- Projects stored in SQLite via Prisma
- i18n via server dictionaries and a `lang` cookie
- Three.js animation via CDN

## Quick Start
```bash
npm install
npm run dev
```

## Environment
Required env vars (see `.env`):
```bash
APP_URL="http://localhost:3000"
ADMIN_PASSWORD="admin"
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://localhost:3000"
```

## Database (Prisma + SQLite)
- Schema: `prisma/schema.prisma`
- DB file: `prisma/dev.db`
- Initialize / sync:
```bash
npx prisma db push
```

Projects are stored in SQLite. `tech` is serialized as JSON string.

## Admin Dashboard
Route:
```
/admin
```
Login uses `ADMIN_PASSWORD` and sets `admin_auth` cookie.

CRUD behavior:
- Create/Update uses `POST`/`PATCH` and refreshes data via `router.refresh()`.
- Delete shows a confirm prompt and then `DELETE`.

### Project Image Fallback
If `image` is empty, the API generates:
```
https://picsum.photos/seed/<title>/800/500
```

## API Endpoints
All endpoints return JSON.

### Projects
```
GET    /api/projects
POST   /api/projects
PATCH  /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

Body (POST/PATCH):
```json
{
  "title": "Project name",
  "description": "Short summary",
  "image": "https://... (optional)",
  "tech": ["Next.js", "TypeScript"],
  "github": "https://... (optional)",
  "external": "https://... (optional)",
  "featured": true
}
```

### Experience
```
GET    /api/experience
POST   /api/experience
PATCH  /api/experience/:id
PUT    /api/experience/:id
DELETE /api/experience/:id
```

### Messages
```
GET    /api/messages
POST   /api/messages
PATCH  /api/messages/:id
DELETE /api/messages/:id
```

## i18n
Locale is controlled by cookie `lang` (`en` or `ru`).
- Dictionaries: `i18n/messages/en.json`, `i18n/messages/ru.json`
- Provider: `components/i18n-provider.tsx`
- Hook: `hooks/use-i18n.ts`

## Three.js
Loaded via CDN:
```
https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js
```
Component: `components/three/hero-orb.tsx`.

## Performance
This setup is fast for a student project:
- SQLite is local file based, low overhead.
- Admin CRUD uses server routes and direct DB access.
- Frontend loads only what it needs.

If you need production-grade performance, move to Postgres and add caching.
