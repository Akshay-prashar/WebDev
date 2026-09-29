import { Card } from "@repo/ui/AddMoneyCardComponents"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../app/lib/auth"   
import db from "@repo/db";

export async function P2PTransactions(){
    const session=await getServerSession(AuthOptions);
    const userId=session.user.id;
    const transactions=await db.p2pTransfer.findMany({
       where:{
        OR:[
            {
                fromUserId:Number(userId)
            },
            {
                toUserId:Number(userId)
            }
        ]
       },
       orderBy:{
        timestamp:"desc"
       }
    })
    if (!transactions.length) {
        return(
            <Card title="Recent Transactions">
                <div className="text-center py-8">No Recent Transaction</div>
            </Card>
        )
    }
    return(
        <div className="flex justify-center items-center w-full">
            <Card title="Recent Transactions">
                <div className="pt-2"> 
                    {transactions.map((t)=>{
                        const isReceived =t.toUserId===Number(userId)
                        return (
                            <div key={t.id} className="flex justify-between border-b border-gray-300 px-2 py-3 items-center">
                                <div>
                                    <div className="text-sm">{isReceived ?"Received INR" : "Sent INR"}</div>
                                    <div className="text-sm">{t.timestamp.toDateString()}</div>
                                </div>
                                <div className="flex justify-center">
                                    {isReceived? (
                                        <div className="text-green-600">+Rs {t.amount/100}</div>
                                    ): ( 
                                    <div className="text-red-600">-Rs {t.amount/100}</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}