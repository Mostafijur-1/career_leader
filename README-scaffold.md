# Career Leader — scaffold notes

This workspace contains a minimal scaffold for the Career Leader system.

Included:
- placeholder DB helper: `lib/db.ts`
- recommendation helper: `lib/recommendation.ts`
- sample seed dataset: `data/careers.json`
- API stubs: `app/api/auth/route.ts`, `app/api/assessment/route.ts`, `app/api/recommend/route.ts`

Next steps:
1. Add a real database (Prisma + Postgres or MongoDB) and implement `lib/db.ts`.
2. Integrate authentication (NextAuth or custom JWT) in `app/api/auth/route.ts`.
3. Implement the 16-type assessment scoring in `app/api/assessment/route.ts`.
4. Expand `data/careers.json` and add admin seeding scripts.

To run the Next app locally:

```powershell
npm install
npm run dev
```

Environment variables:
- `MONGODB_URI`: MongoDB connection string (required to use DB features)
- `MONGODB_DB`: optional database name (defaults to `career_leader`)

Example `.env`:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.example.mongodb.net
MONGODB_DB=career_leader
```
