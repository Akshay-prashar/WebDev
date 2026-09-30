import db from "@repo/db"
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

type CredentialPropsStructure=Record<string,string>

export const AuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credential",
            credentials:{
                number:{type:"text", placeholder:"1234567890", label:"Phone No.",required:true},
                email:{type:"text", placeholder:"User@Email.com", label:"email",required:true},
                password:{type:"password", placeholder:"**********", label:"password",required:true},
            },
            
            async authorize(credentials,req) {
                if (!credentials?.number || !credentials?.password) {
                    return null;
                }
                const existingUser=await db.user.findUnique({
                    where:{
                        number:credentials.number
                    }
                })

                if(existingUser){
                    if(!existingUser.password) {
                        return null;
                    }
                    const passwordValidation=await bcrypt.compare(credentials.password,existingUser.password)
                    if(passwordValidation){
                        return {
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email
                        }
                        
                    }
                    return null
                }
                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks:{
        async session({token,session}:any){
            session.user.id=token.sub
            return session
        }
    },
    pages:{
        signIn:'/signin'
    },
}