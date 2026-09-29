"use client"
import { Card , TextInput ,Button } from "@repo/ui/AddMoneyCardComponents"
import signup from '../app/lib/actions/signup'
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
export default function SignupComponent(){
    const [number,setNumber]=useState("");
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter()
    return(
        <div className="w-full flex justify-center items-center h-[92vh] bg-[#ddd9d9]">
            <div className="w-95">
                <Card title="Signup">
                    <TextInput lable="Number" placeholder="1234567890" onChange={(value)=>{setNumber(value)}}/>
                    <TextInput lable="Name" placeholder="John Doe" onChange={(value)=>{setName(value)}}/>
                    <TextInput lable="Email" placeholder="JohnDoe@email.com" onChange={(value)=>{setEmail(value)}}/>
                    <TextInput lable="Password" placeholder="**********" onChange={(value)=>{setPassword(value)}}/>
                        <div className="text-center pt-3">
                            <Button onClick={async()=>{await signup({email,number,name,password}); router.push('/signin')}}>SignUp</Button>
                        </div>
                        <div className="text-blue-400 text-center">
                            <Link href={'/signin'}>Already have an Account?</Link>
                        </div>
                </Card>
            </div>
        </div>
    )
}