import db from "@repo/db"
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export const AuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credential",
            credentials:{
                phone:{type:"text", placeholder:"1234567890", label:"Phone No.",require:true},
                email:{type:"text", placeholder:"User@Email.com", label:"email",require:true},
                password:{type:"password", placeholder:"**********", label:"password",require:true},
            },
            async authorize(credentials:any) {
                const hashedPassword=await bcrypt.hash(credentials.password,10)
                const existingUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                })

                if(existingUser){
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
                
                try {
                    const user=await db.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword,
                            email:credentials.email
                        },
                    })
                    return {
                            id:user.id.toString(),
                            name:user.name,
                            email:user.email
                        }
                } catch (error) {
                    return null
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET || "SEcret",
    callbacks:{
        async session({token,session}:any){
            session.user.id=token.sub
            return session
        }
    }
}