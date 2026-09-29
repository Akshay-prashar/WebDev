import { Card } from "@repo/ui/AddMoneyCardComponents";
interface Transactions{
    time:Date;
    amount:number;
    status:string;
    provider:string
}

export function OnRampTransaction({transactions}:{transactions:Transactions[]}){
    if (!transactions.length) {
        return(
            <Card title="Recent Transactions">
                <div className="text-center py-8">No Recent Transaction</div>
            </Card>
        )
    }
    return(
        <Card title="Recent Transactions">
            <div className="pt-2"> 
                {transactions.map(t=>  <div key={t.amount} className="flex justify-between border-b border-gray-300 px-2 ">
                    <div>
                        <div className="text-sm">Received INR</div>
                        <div className="text-slate-600 text-sm">{t.time.toDateString()}</div>
                    </div>
                    <div className="flex  justify-center">
                        + Rs {t.amount/100}
                    </div>
                </div>)}
            </div>
        </Card>
    )
}