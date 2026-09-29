import { Card } from "@repo/ui/AddMoneyCardComponents";
interface BalanceCardprops{
    locked:number;
    amount:number;
}
export function BalanceCard({amount,locked}:BalanceCardprops){
    return(
        <Card title="Balance">
            <div >
                <div className="flex justify-between border-b border-gray-300 py-1">
                    <div>Unlocked balance</div>
                    <div>{amount/100} INR</div>
                </div>
                <div className="flex justify-between border-b border-gray-300 py-1">
                    <div>Total Locked balance</div>
                    <div>{locked/100} INR</div>
                </div>
                <div className="flex justify-between border-b border-gray-300 py-1">
                    <div>Total  balance</div>
                    <div>{(amount+locked)/100} INR</div>
                </div>
            </div>
        </Card>
    )
}