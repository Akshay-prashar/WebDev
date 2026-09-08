import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Button } from "../components/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Subheading } from "../components/Subheading"
import axios from "axios"
export function Update(){
    const {id}=useParams()
    const [task,setTask]=useState("")
    const location = useLocation;
    const taskToUpdate=(location.state?.task || "")
    const navigate=useNavigate();
    async function onClickHandler(){
        const response=await axios.put("http://localhost:3000/tasks/"+ id,
            {
                task:task
            },{
                headers:{
                    authorization:localStorage.getItem('token')
                },
            }
        )
        navigate('/Dashboard')
    }
    return(
        <div className=' flex justify-around'>
        <div className='border-gray-500 border-2 shadow-gray-400 mt-5 flex flex-col w-fit rounded p-5 '>
            <Heading lable={"Update"}/>
            <Subheading lable={taskToUpdate}/>
            <Inputbox lable={"task"} placeholder={"Enter the updated task"} onChange={(e)=>{setTask(e.target.value)}} />
            <Button lable={"Update"} onClick={onClickHandler} />
        </div>
        </div>
    )
}