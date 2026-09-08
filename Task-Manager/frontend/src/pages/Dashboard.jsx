import { useEffect, useState } from "react";
import { DashboardTop } from "../components/DashboardTop";
import { Task } from "../components/Tasks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Dashboard(){
    const navigate=useNavigate()
    const [tasks,setTasks]=useState([])
    const [countdelete,setCountdelete]=useState(0)
    useEffect(()=>{
        async function fetchTasks() {
        try {
            const response=await axios.get("http://localhost:3000/tasks",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            setTasks(response.data.tasks)
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/signin");
            }
        }
        }
        fetchTasks()
    },[countdelete])

    async function onClickHandler2(id){
        const response=await axios.delete("http://localhost:3000/tasks/"+ id,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        setCountdelete(countdelete=>countdelete+1)
    }


    return(
        <>
        <DashboardTop lable={"hddhdg"}/>
        {tasks.map(e=>{
            return <Task key={e.id} task={e.task} onClickHandler1={()=>navigate('/Update/'+e.id, {state: { task: e.task }})} onClickHandler2={() => onClickHandler2(e.id)} />
        })}
        
        </>
    )
}