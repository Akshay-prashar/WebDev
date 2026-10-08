import { prisma } from "@/lib/db"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'

export  const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks:{
    async signIn({user}:any){
      if(!user.email){
        return false
      }
      const existingUser=await prisma.user.findUnique({
        where:{
          email:user.email
        }
      });

      if (!existingUser) {
        await prisma.user.create({
          data:{
            name:user.name,
            email:user.email,
            createdAt:new Date(),
            updatedAt:new Date()
          }
        });
      }
      return true
    }
  }
}