import { Hono,Context } from "hono";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

function getPrisma(c:Context) {
  const adapter = new PrismaNeon({
      connectionString: c.env.DATABASE_URL,
    });
  const prisma = new PrismaClient({ adapter });
  return prisma;
}


app.post('/api/v1/signup',async(c)=>{
 
})

app.post('/api/v1/signin',async(c)=>{

})

app.post('/api/v1/blog',async(c)=>{

})

app.put('/api/v1/blog',async(c)=>{

})

app.get('/api/v1/blog/:id',async(c)=>{

})
export default app
