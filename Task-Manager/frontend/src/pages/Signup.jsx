import {Heading} from '../components/Heading'
import {Subheading} from '../components/Subheading'
import {Inputbox} from '../components/Inputbox'
import { Button } from '../components/Button'
import { Bottomline } from '../components/Bottomline'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
export function Signup(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    async function onClickHandler() {
        const response = await axios.post("http://localhost:3000/auth/signup",{
            username,
            password
        })
        navigate('/signin')
    }
    return(
        <div className=' flex justify-around'>
        <div className='border-gray-500 border-2 shadow-gray-400 mt-5 flex flex-col w-fit rounded p-5 '>
            <Heading lable={"signup"}/>
            <Subheading lable={"Enter the details to create an account"}/>
            <Inputbox lable={"Name"} placeholder={"John Doe"} onChange={(e)=>{setUsername(e.target.value)}} />
            <Inputbox lable={"Password"} placeholder={"123456789"} onChange={(e)=>{setPassword(e.target.value)}} />
            <Button lable={"Signup"} onClick={onClickHandler} />
            <Bottomline lable={"Already have a account?"} buttonText={"signin"} to={"/Signin"}/>
        </div>
        </div>
    )
}