import SendMoney from "../../../components/SendMoney";
import { P2PTransactions } from "../../../components/p2pTransactions";
export default function P2Ptransfer(){
    return(
        <div className="grid grid-cols-2 gap-2 w-full">
            <SendMoney/>
            <P2PTransactions/>
        </div>
    )
}