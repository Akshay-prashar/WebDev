"use server"
import { getServerSession } from "next-auth";
import db from '@repo/db'
import { AuthOptions } from "../auth";
export async function createOnRampTransaction(amount:number,provider:string){
    const session=await getServerSession(AuthOptions)
    const token=Math.random().toString()
    if (!session.user.id) {
        return {
            message:"User not Loged in"
        }
    }
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
        message:"On Ramp Transaction is Added"
    }
}