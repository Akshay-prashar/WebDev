import { Hono,Context } from "hono";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import { cors } from "hono/cors";
import { userRouter } from "./router/user";
import { blogRouter } from "./router/blog";

bcrypt.setRandomFallback((length) => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes);
});

const app = new Hono();

app.use(cors());
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

export function getPrisma(c:Context) {
  const adapter = new PrismaNeon({
      connectionString: c.env.DATABASE_URL,
    });
  const prisma = new PrismaClient({ adapter });
  return prisma;
}


export default app
