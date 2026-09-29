import SendMoney from "../../../components/P2PSendMoney";
import { P2PTransactions } from "../../../components/p2pTransactions";
export default function P2Ptransfer(){
    return(
        <div className="flex flex-col w-full bg-[#ddd9d9]">
            <div className="text-4xl font-bold text-[#6a51a6] pl-5 pt-8">P2P Transfer</div>
            <div className="grid grid-cols-2 gap-2 w-full h-full ">
                <SendMoney/>
                <P2PTransactions/>
            </div>
        </div>
    )
}