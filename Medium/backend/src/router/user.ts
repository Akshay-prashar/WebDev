import { Hono } from "hono";
import { getPrisma } from "../index";
import bcrypt from "bcryptjs";
import {sign , verify} from 'hono/jwt'
import { signupInput,signinInput } from "@akshay_prashar/medium-common";
type ENV={
    DATABASE_URL:string;
    JWT_SECRET:string;
}
export const userRouter=new Hono<{Bindings:ENV}>()

userRouter.get('/me',async(c)=>{
    const authHeaderInput=c.req.header("authorization") ||""
    let userId=""
    if (authHeaderInput==="") {
      return c.json({msg:"No token avilable"},401);
    }
    let token=authHeaderInput.split(" ")[1]
    try {
      const decode=await verify(token,c.env.JWT_SECRET,"HS256")
      userId=decode.id as string
    } catch (error) {
      return c.json({msg:"Error while authanticating"},403)
    }
    const prisma=getPrisma(c)
    try {
      const res= await prisma.user.findUnique({
        where:{
          id:userId
        },
        select:{
          name:true
        }
      })
      return c.json({username:res?.name})
    } catch (error) {
      return c.json({msg:"internal server error"})
    }

})
userRouter.post('/signup',async(c)=>{
  const body=await c.req.json();
  const {success} =signupInput.safeParse(body);
  if(!success){
    return c.json({msg:"invalid input"},413)
  }
  
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

userRouter.post('/signin',async(c)=>{
  const body=await c.req.json();
  const {success} =signinInput.safeParse(body);
  if(!success){
    return c.json({msg:"invalid input"},413)
  }

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
