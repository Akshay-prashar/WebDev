import { Qoute } from "../components/Quote"
import { InputForm } from "../components/InputForm"
import {  useState, type ChangeEvent } from "react"
import  type { SigninInput } from "@akshay_prashar/medium-common"

export const SigninComponent=function(){
    const [inputdata,setInputData]=useState<SigninInput>({
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
    const onClickHandler=()=>{
        
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <InputForm heading={"Enter Your details"} subheading={"Not have an account? "} link={"signup"} btnText="Signin" onChange={onChangeHandler} onClick={onClickHandler} />
            <div className="hidden lg:block">
                <Qoute/>
            </div>
        </div>
    )
}