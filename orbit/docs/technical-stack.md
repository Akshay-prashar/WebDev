# Final Stack + AI Provider

## 1. Final Stack

### Frontend

- **Next.js** — Chosen as the full-stack React framework so the application can share routing, rendering, and server functionality in one codebase.
- **React** — Chosen for building the interactive agent, chat, routine, and tool-management interfaces.
- **TypeScript** — Chosen for type safety across the frontend and backend and to reduce runtime errors as the application grows.
- **Tailwind CSS** — Chosen for fast, consistent styling without maintaining a large custom CSS codebase.
- **shadcn/ui** — Chosen for accessible, customizable UI components that we can own and adapt to the product's design.

### Backend

- **Next.js Server/API** — Chosen so backend APIs and server-side logic can live alongside the frontend while keeping the initial architecture simple.
- **TypeScript** — Chosen so the same type-safe language can be used throughout the application.

### Database

- **PostgreSQL** — Chosen as a reliable relational database that fits our structured entities and relationships such as Users, Agents, Tools, Routines, and Executions.
- **Prisma** — Chosen because I already have experience with Prisma and PostgreSQL, so it reduces unnecessary learning overhead.

### Authentication

- **Auth.js** — Chosen to handle authentication and sessions without building our own authentication system from scratch.

### AI

- **AI SDK** — Chosen to provide a consistent interface for working with LLMs and make switching providers/models easier later.
- **Google Gemini** — Chosen as the initial LLM provider because it provides a free/low-cost starting option for development and experimentation.

### Validation

- **Zod** — Chosen for runtime validation of API requests, AI-generated structured data, tool configurations, and environment/configuration values.

### Background Jobs

- **Inngest** — Chosen for reliable background execution of routines, scheduled tasks, retries, and long-running agent workflows.

### External Integrations

- **Composio** — Chosen to simplify connecting agents to external services such as Gmail, Slack, GitHub, and other third-party tools.

### Browser Automation

- **E2B** — Chosen to provide isolated execution environments for browser/code-based tasks that require a controlled runtime.

### Version Control

- **Git** — Chosen for tracking source-code changes and maintaining a reliable development history.
- **GitHub** — Chosen for remote repository hosting, collaboration, pull requests, and project management.

### Deployment

- **Vercel** — Chosen because it integrates naturally with Next.js and provides a simple deployment workflow for the application.

---

# 2. AI Provider

Our initial AI architecture will be:

Application ↓ AI SDK ↓ Gemini Provider ↓ Gemini Model


### AI Provider

**Google Gemini**

### Model

**Gemini 2.5 Flash**

### Reason

Chosen as the initial model because it is a fast, relatively inexpensive/free-tier-friendly model that is suitable for our agent, chat, tool-calling, and routine workflows during development.

We are **not coupling the application directly to Gemini**.

The application should communicate through the AI SDK abstraction:

Application ↓ AI SDK ↓ Gemini Provider ↓ Gemini 2.5 Flash


Later, changing to another provider should primarily involve changing the provider/model configuration rather than rewriting the agent architecture.

---

# Final Stack

Frontend: Next.js + React + TypeScript Tailwind CSS + shadcn/ui

Backend: Next.js Server/API + TypeScript

Database: PostgreSQL + Prisma

Authentication: Auth.js

AI: AI SDK + Google Gemini Initial model: Gemini 2.5 Flash

Validation: Zod

Background Jobs: Inngest

External Integrations: Composio

Browser Automation: E2B

Version Control: Git + GitHub

Deployment: Vercel


## Development Order
1. Project setup
2. Authentication
3. Database
4. Agent management
5. AI chat
6. Tool system
7. Integrations
8. Routine system
9. Background execution
10. Execution history
11. E2B browser automation
12. Deployment


## File Structure

    orbit/
    │
    ├── app/
    │   ├── (auth)/
    │   ├── (dashboard)/
    │   ├── api/
    │   │
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    │
    ├── components/
    │   ├── ui/
    │   ├── agents/
    │   ├── chat/
    │   ├── routines/
    │   ├── tools/
    │   └── vm/
    │
    ├── lib/
    │   ├── actions/
    │   ├── ai/
    │   ├── auth/
    │   ├── db/
    │   ├── inngest/
    │   ├── routines/
    │   ├── tools/
    │   └── vm/
    │
    ├── types/
    │
    ├── prisma/
    │   └── schema.prisma
    │
    ├── docs/
    │   ├── architecture.md
    │   ├── database.md
    │   └── technical-stack.md
    │
    ├── public/
    │
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    └── README.md