import { Qoute } from "../components/Quote"
import { InputForm } from "../components/InputForm"
import {  useState, type ChangeEvent } from "react"
import  type { signupInput } from "@akshay_prashar/medium-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const SignupComponent=function(){
    const navigate=useNavigate()
    const [inputdata,setInputData]=useState<signupInput>({
        email:"",
        name:"",
        password:""
    })

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setInputData({
            ...inputdata,
            [e.target.name]:e.target.value
        }); 
    }
    const onClickHandler=async()=>{
        try {
            const res=await axios.post("https://medium-backend.akshayprashar017.workers.dev/api/v1/user/signup",{
                email:inputdata.email,
                name:inputdata.name,
                password:inputdata.password
        })
        const jwt=res.data.token
        localStorage.setItem("token","Bearer "+jwt);
        navigate("/blogs")
        } catch (error) {
            alert("Signup Failed")
        }
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <InputForm heading={"Create an account"} subheading={"Already have an account? "} link={"signin"} btnText="Signup" onChange={onChangeHandler} onClick={onClickHandler} />
            <div className="hidden lg:block">
                <Qoute/>
            </div>
        </div>
    )
}