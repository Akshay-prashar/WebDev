# Task Manager

## Tech Stack

- Node.js
- Express.js
- React
- Zod
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Tailwind CSS
- Axios
- bcrypt

## Backend

### Steps to Install Dependencies and Start the Backend Server

```bash
npm install
```

```bash
node index.js
```

## Frontend

### Steps to Run the Frontend Code

```bash
npm install
```

```bash
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Create a new user |
| POST | `/auth/signin` | Sign in an existing user |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| DELETE | `/tasks/:taskId` | Delete a task |
| PUT | `/tasks/:taskId` | Update a task |
