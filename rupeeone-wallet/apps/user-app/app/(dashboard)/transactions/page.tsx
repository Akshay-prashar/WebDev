import { P2PTransactions } from "../../../components/p2pTransactions"
import {OnRampTransaction} from "../../../components/OnRampTransaction"
import { getServerSession } from "next-auth"
import { AuthOptions } from "../../lib/auth"
import db from '@repo/db'
async function getOnRampTransactions() {
    const session=await getServerSession(AuthOptions);
    const txns=await db.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    });
    return txns.map(t=>({
        time:t.startTime,
        amount:t.amount,
        provider:t.provider,
        status:t.status
    }))
}
export default async function dashboard(){
    const onrampTransactions =await getOnRampTransactions()
    
    return <div className="grid grid-cols-2 w-full bg-[#ddd9d9]">
        <div className="border border-gray-300 flex flex-col  justify-center p-15">
            <div className="text-center pb-10 font-bold text-3xl text-[#6a51a6]">P2P Transactions</div>
            <P2PTransactions/>
        </div>
        <div className="border border-gray-300 flex flex-col  justify-center p-15">
            <div className="text-center pb-10 font-bold text-3xl text-[#6a51a6]">onRamp Transactions</div>
            <OnRampTransaction transactions={onrampTransactions}/>
        </div>
    </div>
}