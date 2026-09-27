"use client"
import { Card , Button , Select ,Center , TextInput } from "@repo/ui/AddMoneyCardComponents"
import { useState } from "react"

const SUPPORTED_BANK=[{
    name:"HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
},{
    name:"Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
}];

export function AddMoneyCard(){
    const [redirectUrl,setRedirectedurl]=useState(SUPPORTED_BANK[0]?.redirectUrl);
    return(
        <Card title="Add money">
            <div className="w-full">
                <TextInput lable="Amount" placeholder="₹ xxxx" onChange={()=>{}}></TextInput>
                <div className="py-4 text-left">Bank</div>
                <Select onSelect={(value)=>{setRedirectedurl(SUPPORTED_BANK.find(x=>x.name===value)?.redirectUrl||"")}} 
                options={SUPPORTED_BANK.map(x=>({key:x.name,value:x.name}))}/>
                <div className="flex justify-center pt-4">
                    <Button onClick={()=>window.location.href=redirectUrl||""}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}