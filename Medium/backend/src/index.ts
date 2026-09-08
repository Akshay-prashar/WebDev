import { Hono,Context } from "hono";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { decode, sign, verify } from 'hono/jwt'
import bcrypt, { genSalt } from "bcryptjs";
import z from 'zod'

bcrypt.setRandomFallback((length) => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes);
});


type Env = {
  DATABASE_URL: string;
  JWT_SECRET:string;
};
type variable={
  user:{
    email:string;
    id:string;
  }
}
const app = new Hono<{ Bindings: Env ,Variables:variable}>();

function getPrisma(c:Context) {
  const adapter = new PrismaNeon({
      connectionString: c.env.DATABASE_URL,
    });
  const prisma = new PrismaClient({ adapter });
  return prisma;
}


app.use('/api/v1/blog',async(c,next)=>{
  const header=c.req.header("authorization") || null
  if (header===null || header===undefined) {
    return c.json({msg:"No token avilable"},404);
  }
  let token=header.split(" ")[1]
  try {
    const decode=await verify(token,c.env.JWT_SECRET,"HS256")
    c.set("user",{
      email:decode.email as string,
      id:decode.id as string
    });
    next()
  } catch (error) {
    return c.json({msg:"Invalid Token"},403)
  }

})
app.post('/api/v1/signup',async(c)=>{
  const body=await c.req.json();
  const prisma=getPrisma(c)
  let hashedPassword=await bcrypt.hash(body.password,10)
  try {
    const res=await prisma.user.create({
      data:{
        email:body.email,
        name:body.name,
        password:hashedPassword
      },
      select:{
        email:true,
        id:true
      }
    })

    const token=await sign({email:res.email,id:res.id},c.env.JWT_SECRET,"HS256")
    return c.json({msg:"Signup Sucessfull",token},200)
  } catch (error) {
    console.log(error);
    return c.json({msg:"Internal database erroe"},500);
  }
})

app.post('/api/v1/signin',async(c)=>{
  const body=await c.req.json();
  const prisma=getPrisma(c)
  try {
    const IsValidUser=await prisma.user.findUnique({
      where:{
        email:body.email
      },
      select:{
        email:true,
        id:true,
        password:true
      }
    });
    if (!IsValidUser) {
      return c.json({msg:"User not Found"},404)
    }
    const hashedPassword=await bcrypt.compare(body.password,IsValidUser.password)
    if (!hashedPassword) {
      return c.json({msg:"user Not found"},404)
    }
    const token=await sign({email:IsValidUser.email,id:IsValidUser.id},c.env.JWT_SECRET,"HS256");
    return c.json({msg:"Signin sucessfull",token},200)

  } catch (error) {
    console.log(error);
    return c.json({msg:"Internal Server error"},500)
  }
})

app.post('/api/v1/blog',async(c)=>{

})

app.put('/api/v1/blog',async(c)=>{

})

app.get('/api/v1/blog/:id',async(c)=>{

})
export default app
