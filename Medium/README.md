# Medium Clone

A full-stack blogging platform inspired by Medium. Users can create an account, sign in, publish blog posts, browse published posts, and open individual posts.

## Features

- User signup and signin with JWT authentication
- Password hashing with `bcryptjs`
- Create, publish, and read blog posts
- Protected API routes for authenticated users
- Responsive React frontend
- PostgreSQL database access through Prisma
- Cloudflare Workers backend deployment
- Vercel deployment support for the frontend

## Project structure

```text
Medium/
├── frontend/   React, TypeScript, Vite, Tailwind CSS
├── backend/    Hono API running on Cloudflare Workers
├── common/     Shared Zod validation package
└── readme.md
```

## Technology stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS, Axios
- Backend: Hono, Cloudflare Workers, Wrangler
- Database: PostgreSQL
- ORM: Prisma with the Neon adapter
- Authentication: JWT and bcryptjs
- Validation: Zod in the shared `common` package

## Requirements

- Node.js 20 or newer
- npm
- A PostgreSQL database
- Cloudflare account for backend deployment
- Vercel account for frontend deployment

## Local setup

Clone the repository and install dependencies in each package:

```bash
cd frontend
npm install

cd ../backend
npm install

cd ../common
npm install
```

Generate the Prisma client from the backend directory:

```bash
cd backend
npx prisma generate
```

## Environment variables

The backend expects these Cloudflare Worker bindings:

```text
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

Configure them as secrets for the Worker rather than committing them to the repository. The frontend currently uses the deployed API URL in its hooks, so no frontend environment variable is required for the existing setup.

## Running locally

Start the frontend:

```bash
cd frontend
npm run dev
```

Start the backend in another terminal:

```bash
cd backend
npm run dev
```

The frontend is normally available at `http://localhost:5173`.

## Available scripts

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and create the production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Backend

```bash
npm run dev          # Start Wrangler locally
npm run deploy       # Deploy the Worker to Cloudflare
npm run cf-typegen   # Generate Cloudflare binding types
```

## API routes

The API is grouped under `/api/v1`:

```text
POST /api/v1/user/signup
POST /api/v1/user/signin
GET  /api/v1/user/me
POST /api/v1/blog
GET  /api/v1/blog/bulk
GET  /api/v1/blog/:id
PUT  /api/v1/blog
```

Authenticated requests should send the JWT in the `Authorization` header.

## Deployment

### Frontend on Vercel

Configure the Vercel project with:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

If `vercel.json` is present in `frontend/`, keep the SPA rewrite so React Router routes continue to work after a page refresh.

### Backend on Cloudflare Workers

From the `backend` directory, configure the `DATABASE_URL` and `JWT_SECRET` Worker secrets, then run:

```bash
npm run deploy
```

## License

This project is intended for learning and personal development.
