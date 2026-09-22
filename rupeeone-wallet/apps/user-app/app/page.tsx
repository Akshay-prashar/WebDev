import Image from "next/image";
import { Card } from "@repo/ui/card";
import prisma, { PrismaClient } from "@repo/db";

export default async function Page() {
  const user =await prisma.user.findUnique({where:{id:2}})
  return (
    <div>
      <Card></Card>
      {JSON.stringify(user)}
    </div>
  );
}
