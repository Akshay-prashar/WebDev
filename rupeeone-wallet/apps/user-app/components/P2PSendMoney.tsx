"use client"
import { Card , TextInput , Button, Center} from "@repo/ui/AddMoneyCardComponents";
import { useState } from "react";
import {p2pTransfer} from "../app/lib/actions/p2pTransfer";
import { useRouter } from "next/navigation";
export default function P2pTransfer(){
    const [number,setNumber]=useState("");
    const [amount,setAmount]=useState(0);
    const [message,setmessage]=useState("");
    const [loading,setLoading]=useState(false);
    const route=useRouter()
    if (loading) {
        return(
            <div>Loading</div>
        )
    }
    return(
       <div className="flex justify-center items-center w-full">
            <Card title="Transfer">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} lable="Number" onChange={(value) => {setNumber(value)}} />
                    <TextInput placeholder={"Amount"} lable="Amount" onChange={(value) => {setAmount(Number(value))}} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {setLoading(true);const res=await p2pTransfer(number,(amount*100)); setmessage(res.message); route.refresh()}}>Send</Button>
                    </div>
                    <div className="text-center pt-4 text-xl font-bold text-blue-500">{message}</div>
                </div>
             </Card>
       </div>
    )
}