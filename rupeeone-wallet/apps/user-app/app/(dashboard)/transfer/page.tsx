import db from '@repo/db'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '../../lib/auth'
import { AddMoneyCard } from "../../../components/AddMoneyCard"
import { BalanceCard } from "../../../components/BalanceCard"
import { OnRampTransaction } from "../../../components/OnRampTransaction"

async function GetBalance() {
    const session =await getServerSession(AuthOptions)
    const balance=await db.balance.findFirst({
        where:{
            userId:Number(session?.user?.id)
        }
    });
    return{
        amount:balance?.amount,
        locked:balance?.locked
    }
}

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
    const balane=await GetBalance();
    const transactions =await getOnRampTransactions()
    return (
        <div className='w-screen'>
            <div className='text-4xl text-[#6a51a6] pt-8 mb-8 font-bold'>Transfer</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full p-4">
                <div><AddMoneyCard/></div>
                <div>
                    <BalanceCard amount={balane.amount||0} locked={balane.locked||0}/>
                    <div className='pt-4 rounded'>
                        <OnRampTransaction transactions={transactions}/>
                    </div>
                </div>
            </div>
        </div>
    )
}