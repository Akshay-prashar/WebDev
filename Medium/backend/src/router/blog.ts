import { Hono } from "hono";
import { getPrisma } from "../index";
import { verify } from "hono/jwt";
import {createBlogInput,updateBlogInput} from '@akshay_prashar/medium-common'
type Env = {
  DATABASE_URL: string;
  JWT_SECRET:string;
};
type user={
    email:string;
    id:string
}
type Variable={
    user:user
}
export const blogRouter=new Hono<{Bindings:Env,Variables:Variable}>()


blogRouter.use('/*',async(c,next)=>{
  const header=c.req.header("authorization") || ""
  if (header==="") {
    return c.json({msg:"No token avilable"},401);
  }
  let token=header.split(" ")[1]
  try {
    const decode=await verify(token,c.env.JWT_SECRET,"HS256")
    c.set("user",{
      email:decode.email as string,
      id:decode.id as string
    });
    await next()
    return c.json({msg:"You are logged in"})
  } catch (error) {
    return c.json({msg:"Invalid Token"},403)
  }

})

blogRouter.post('/',async(c)=>{
    const body=await c.req.json();
    const {success} =createBlogInput.safeParse(body);
    if(!success){
        return c.json({msg:"invalid input"},413)
    }

    const user=c.get("user")
    const prisma=getPrisma(c);

    try {
        const res=await prisma.blog.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:user.id
            },
            select:{
                id:true,
                title:true,
                authorId:true
            }
        });
        return c.json({msg:"blod added",blog:res},200)
    } catch (error) {
        return c.json({msg:"internal server error"},500)
    }
})

blogRouter.put('/',async(c)=>{
    const body=await c.req.json();
    const {success} =updateBlogInput.safeParse(body);
    if(!success){
        return c.json({msg:"invalid input"},413)
    }
    const user=c.get("user")
    const prisma=getPrisma(c);

    try {
        const res=await prisma.blog.update({
            where:{
                id:body.id,
                authorId:user.id
            },
            data:{
                title:body.title,
                content:body.content
            },
            select:{
                title:true,
                content:true
            }
        });
        return c.json({msg:"blod updated",blog:res},200)
    } catch (error) {
        return c.json({msg:"internal server error"},500)
    }
})


blogRouter.get('/bulk',async(c)=>{
    const authorId=c.get("user").id
    const prisma=getPrisma(c);
    try {
        const res=await prisma.blog.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({blogs:res},200)
    } catch (error) {
        return c.json({msg:"internal server error"},500)
    }
})

blogRouter.get('/:id',async(c)=>{
    const blodId=c.req.param("id")
    const prisma=getPrisma(c);
    try {
        const res=await prisma.blog.findUnique({
            where:{
                id:blodId
            },
            select:{
                id:true,
                title:true,
                content:true
            }
        })
        return c.json({blog:res},200)
    } catch (error) {
        return c.json({msg:"internal server error"},500)
    }
})
