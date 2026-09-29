"use client"
import { Card , TextInput , Button, Center} from "@repo/ui/AddMoneyCardComponents";
import { useState } from "react";
import {p2pTransfer} from "../app/lib/actions/p2pTransfer";
export default function SendMoney(){
    const [number,setNumber]=useState("");
    const [amount,setAmount]=useState(0);
    return(
       <div className="flex justify-center items-center w-full">
            <Card title="Transfer">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} lable="Number" onChange={(value) => {setNumber(value)}} />
                    <TextInput placeholder={"Amount"} lable="Amount" onChange={(value) => {setAmount(Number(value))}} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {p2pTransfer(number,(amount*100))}}>Send</Button>
                    </div>
                </div>
             </Card>
       </div>
    )
}