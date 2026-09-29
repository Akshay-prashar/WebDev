"use server"
import db from '@repo/db'
import bcrypt from 'bcrypt'
interface Signupprops{
    name:string;
    email:string;
    password:string;
    number:string
}
export default async function SignupAction(InputData:Signupprops){
     const existingUser=await db.user.findUnique({
        where:{
            number:InputData.number
        }
    });
    if(existingUser){
        return{
            message:"Alredy Registered try Login"
        }
    }
    
    const hashedPassword=await bcrypt.hash(InputData.password,10)
    try {
        const user=await db.user.create({
            data:{
                name:InputData.name,
                email:InputData.email,
                password:hashedPassword,
                number:InputData.number
            }
        })
        await db.balance.create({
            data:{
                userId:user.id,
                amount:0
            }
        });

        return {
            message:"Signup SucessFull"
        }
    } catch (error) {
        return {
            message:"Error Occured! Try Again"
        }
    }
}