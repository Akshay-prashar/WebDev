import { Hono } from "hono";
import { getPrisma } from "../index";
import bcrypt from "bcryptjs";
import {sign} from 'hono/jwt'
import { signupInput,signinInput } from "@akshay_prashar/medium-common";
type ENV={
    DATABASE_URL:string;
    JWT_SECRET:string;
}
export const userRouter=new Hono<{Bindings:ENV}>()

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
