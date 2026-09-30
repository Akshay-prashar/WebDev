"use server"
import { getServerSession } from "next-auth";
import db from '@repo/db'
import { AuthOptions } from "../auth";
import z, { success } from 'zod'
const createOnRampTransactionSchema=z.object({
    amount:z.number(),
    provider:z.string()
})
export async function createOnRampTransaction(amount:number,provider:string){
    const session=await getServerSession(AuthOptions)
    
    if (!session?.user?.id) {
        return {
            success:false,
            message:"User not Loged in"
        }
    }
    const isInputValid= createOnRampTransactionSchema.safeParse({
        amount,
        provider
    })
    if (!isInputValid.success || amount<=0) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    const token=Math.random().toString()
    await db.onRampTransaction.create({
        data:{
            status:"Processing",
            provider:provider,
            token:token,
            amount:amount*100,
            startTime:new Date(),
            userId:Number(session.user.id)
        }
    });
    return{
        success:true,
        message:"On Ramp Transaction is Added"
    }
}