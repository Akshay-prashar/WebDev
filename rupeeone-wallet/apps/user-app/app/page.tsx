import Image from "next/image";
import { Card } from "@repo/ui/card";
import prisma, { PrismaClient } from "@repo/db";

export default async function Page() {
  const user =await prisma.user.findUnique({where:{id:2}})
  const res=await prisma.user.create({
    data:{
      email:"Albus@gmial.com",
      name:"Albus"
    },
    select:{
      id:true
    }
  })
  return (
    <div>
      <Card></Card>
      {JSON.stringify(user)}
      <br />
      {JSON.stringify(res)}
    </div>
  );
}
