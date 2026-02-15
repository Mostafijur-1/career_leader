This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Steps

1. **Push to GitHub** – Ensure your code is in a Git repository.
2. **Import on Vercel** – Go to [vercel.com/new](https://vercel.com/new), import the repo, and select it as a Next.js project.
3. **Configure environment variables** – In Project Settings → Environment Variables, add:
   - `MONGODB_URI` (required) – Your MongoDB connection string (e.g. from [MongoDB Atlas](https://www.mongodb.com/atlas))
   - `MONGODB_DB` (optional) – Database name (default: `career_leader`)
4. **Deploy** – Vercel will build and deploy. New commits to your main branch will trigger automatic deployments.

Copy variables from `.env.example` as a reference. Never commit `.env.local` or real secrets.
