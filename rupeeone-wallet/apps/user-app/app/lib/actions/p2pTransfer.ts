"use server"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../auth"
import db from '@repo/db'

export async function p2pTransfer(number:string,amount:number) {
    const session=await getServerSession(AuthOptions);
    if (!session?.user?.id) {
        return{
            message:"User not LogedIn"
        }
    }  
    if(amount<=0){
        return{
            message:"Invalid Amount"
        }
    }
    const fromUserId=session.user.id
    const fromUser=session.user.name
    const toUser=await db.user.findFirst({
        where:{
            number:number
        }
    });
    if (!toUser) {
        return{
            message:"User not Found"
        }
    };

    if (fromUserId===toUser.id) {
        return{
            message:"Cannot transfer to yourself"
        }
    }

    try {
        await db.$transaction(async(tx)=>{
    
            // Locked Senders balance Row
            const formBalance=await tx.$queryRaw<{amount:number}[]>`
                SELECT "amount" FROM "Balance" 
                WHERE "userId"=${fromUserId}
                FOR UPDATE`
    
            if (!formBalance[0] || formBalance[0].amount<amount) {
                throw new Error("INSUFFICIENT_BALANCE")
            }
    
            // Deduct From Sender
            await tx.$queryRaw`
                UPDATE "Balance" 
                SET "amount" = "amount" - ${amount}
                WHERE "userId" = ${fromUserId}`
            
            //Add to receiver
            await tx.$queryRaw`
                UPDATE "Balance"
                SET "amount" = "amount" + ${amount}
                WHERE "userId" =${toUser.id}`

            await tx.p2pTransfer.create({
                data:{
                    amount:amount,
                    timestamp:new Date(),
                    fromUserId:Number(fromUserId),
                    toUserId:toUser.id
                }
            });
        },{
            maxWait:10000,
            timeout:20000
        })
        return({
            message:"Transfer Success"
        })
    } catch (error) {
        console.log(error)
        if (error instanceof Error && error.message=="INSUFFICIENT_BALANCE") {
            return{
                message:"INSUFFICIENT_BALANCE"
            }
        }
        return{
            message:"Transfer failed"
        }
    }
}