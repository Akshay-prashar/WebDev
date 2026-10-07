# Orbit — AI Agent Automation Platform

## User Flow
                    ┌───────────────┐
                    │    Next.js    │
                    │   Frontend    │
                    └───────┬───────┘
                            │
                     Server / API
                            │
          ┌─────────────────┼────────────────┐
          │                 │                │
       Prisma            AI Agent         Inngest
          │                 │                │
          ↓                 ↓                ↓
      PostgreSQL        Tool Calling     Background Jobs
                            │
                       Composio
                            │
                  ┌─────────┼─────────┐
                  ↓         ↓         ↓
                Gmail     Slack     etc.
                                    
                            │
                            ↓
                           E2B
                      Browser / VM

## Tech Stack
| Layer | Our choice |
|---|---|
| Frontend | Next.js + React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Auth.js / NextAuth |
| AI | AI SDK + LLM provider |
| Validation | Zod |
| Background jobs | Inngest |
| Integrations | Composio |
| Browser/VM | E2B |
| Git | GitHub |
| Deployment | Vercel + suitable backend services |

## MVP Scope
You're right. If you want the **MVP Scope** to match the structure of the Tech Stack table, format it like this:

| Feature | MVP |
| --- | --- |
| Authentication | User sign-up, login, and session management |
| Agent Creation | Create and manage AI agents |
| Agent Configuration | Configure agent name, instructions, model, and tools |
| AI Chat | Chat with agents |
| Tool Calling | Allow agents to invoke connected tools |
| Gmail Integration | Connect and interact with Gmail |
| Slack Integration | Connect and interact with Slack |
| Routine Creation | Create automated routines |
| Routine Scheduling | Schedule routines for recurring execution |
| Manual Execution | Trigger routines manually |
| Execution History | View past routine executions and their status |









# Getting Started

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



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
