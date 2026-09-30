"use server"
import db from '@repo/db'
import bcrypt from 'bcrypt'
import z, { email, success } from 'zod'
interface Signupprops{
    name:string;
    email:string;
    password:string;
    number:string
}
const signupSchema=z.object({
    name:z.string(),
    email:z.email(),
    number:z.number().min(10),
    password:z.string()
})
export default async function SignupAction(InputData:Signupprops){
    const isInputValid=signupSchema.safeParse(InputData)
    if (!isInputValid.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    const existingUser=await db.user.findUnique({
        where:{
            number:InputData.number
        }
    });
    if(existingUser){
        return{
            success: false,
            message:"Alredy Registered try Login"
        }
    }
    
    const hashedPassword=await bcrypt.hash(InputData.password,10)
    try {
        await db.$transaction(async(tx)=>{
            const user=await tx.user.create({
                data:{
                name:InputData.name,
                email:InputData.email,
                password:hashedPassword,
                number:InputData.number
                }
            });
            await tx.balance.create({
                data:{
                    userId:user.id,
                    amount:0
                }
            });
        })
        return {
            success: true,
            message:"Signup SucessFull"
        }
    } catch (error) {
        return {
            success: false,
            message:"Error Occured! Try Again"
        }
    }
}