## High-level architecture
                        Browser
                           ↓
                        Next.js
                           ↓
                        Server/API
                        ├── Auth
                        ├── AI
                        ├── Database
                        ├── Tools
                        └── Routines
                               ↓
                            Inngest
                               ↓
                        Background execution

### Request flow

user message → AI → tools → routine → scheduler → execution → result

- User Sends a Message
- The user sends a request to the AI agent describing the task they want to perform.
- AI Understands the Task
- The AI analyzes the user's request and determines the actions required to complete the task.
- AI Identifies Required Tools
- The AI determines which tools or integrations are required to perform the task.
- For example: Gmail, Slack, or other connected services.
- Routine Creation
- If the task needs to be executed at a specific time or on a recurring basis, the AI creates a routine based on the user's request.
- Routine Scheduling
- The routine is scheduled according to the time, date, or recurrence specified by the user.
- Routine Execution
- When the scheduled time arrives, the system automatically executes the routine.
- The AI uses the required tools to complete the task.
- Execution Data Storage
- After execution, the system saves the execution details in the database.
- This includes the execution status, timestamp, results, and relevant metadata.
- Execution History
- The user can view the history of previous routine executions.
- Each execution can show whether the task was successful or failed, along with the relevant details.

flow involves the agent identifying required tools, getting authentication/connections, asking for missing scheduling information, creating a routine, and saving it.


## Main System Components
- Next.js :- Used for both frontend and backend development.
- PostgreSQL :- Used as the primary database.
- Prisma :- Used as the ORM for PostgreSQL.
- AI Layer :- Used to understand user requests and identify the required tools and actions.
- Composio :- Used to connect with multiple applications and execute actions on them.
- Inngest :- Used for scheduling and executing tasks in the background.
- E2B :- Used to provide a virtual browser sandbox for browser-based tasks.
- Auth.js :- Used for user authentication and login.

## Browser automation boundary

    Normal task
    → Composio/API tool

    Website task requiring browser
    → E2B
Only used when necessary

## Architecture decisions
Why Prisma instead of Drizzle?

    I chose Prisma because I have worked with it before and am already familiar with its workflow and ecosystem. Both Prisma and Drizzle provide the core ORM features required for this project, so using Prisma allows me to work more efficiently without sacrificing functionality.

Why Next.js full-stack instead of separate Express backend?

    I chose Next.js for full-stack development because it provides SSR (Server-Side Rendering) and SEO capabilities out of the box. I am also using Auth.js for authentication, which integrates well with Next.js. Using Next.js for both the frontend and backend keeps the architecture simpler and avoids the additional complexity of maintaining a separate Express backend
Why Inngest?

    I chose Inngest because it provides a reliable way to schedule and execute tasks in the background. It is well suited for handling scheduled routines, recurring tasks, and background job execution.
Why Composio?

    I chose Composio because it makes it easier to connect the system with multiple external applications and execute actions on those applications. This allows the AI agents to interact with services such as Gmail, Slack, and other integrations.
Why PostgreSQL?

    I chose PostgreSQL as the primary database because it is a reliable and powerful relational database that is well suited for storing users, agents, routines, schedules, execution history, and other structured application data.

Why E2B?

    I chose E2B because it provides a secure virtual browser sandbox for executing browser-based tasks. This allows agents to perform tasks that require interacting with websites or browser environments in an isolated environment