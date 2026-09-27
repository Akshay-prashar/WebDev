import { getServerSession } from "next-auth"
import { AuthOptions } from "./lib/auth"
import { redirect } from "next/navigation"
export default async function Page(){
  const session=await getServerSession(AuthOptions)
  if (!session?.user) {
    redirect("/dashboard")
  }else{
    redirect("api/auth/signin")
  }
}