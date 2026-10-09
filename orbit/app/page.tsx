import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
export default async function Home() {
  let session=await getServerSession(authOptions)
  return (
    <div>{JSON.stringify(session?.user)}</div>
  );
}
