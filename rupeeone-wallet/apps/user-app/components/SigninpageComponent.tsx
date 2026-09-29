"use client"
import { Card , TextInput ,Button } from "@repo/ui/AddMoneyCardComponents"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
export default function SigninpageComponent(){
    const [number,setNumber]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    return(
        <div className="w-full flex justify-center items-center h-[92vh] bg-[#ddd9d9]">
            <div className="w-90">
                <Card title="Signin"> 
                    <TextInput lable="Number" placeholder="1234567890" onChange={(value)=>{setNumber(value)}}/>
                    <TextInput lable="Email" placeholder="Example@Email.com" onChange={(value)=>{setEmail(value)}}/>
                    <TextInput lable="Password" placeholder="**********" onChange={(value)=>{setPassword(value)}}/>
                    <div className="text-center pt-3">
                        <Button onClick={async()=>{await signIn("credentials",{
                            number:number,
                            email:email,
                            password:password,
                            callbackUrl: "/dashboard"
                        })}}>Signin</Button>
                    </div>
                    <div className="text-blue-400 text-center">
                        <Link href={'/signup'}>Not have an Account?</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}