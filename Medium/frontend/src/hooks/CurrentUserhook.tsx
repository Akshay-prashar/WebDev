import axios from "axios"
import { useEffect, useState } from "react"

export const useCurrentUser=()=>{
    const [currentUser,setCurrentUser]=useState("")
    const token=localStorage.getItem("token")
    useEffect(()=>{
        const fn=async()=>{
            const res=await axios.get("https://medium-backend.akshayprashar017.workers.dev/api/v1/user/me",{
                headers:{
                    Authorization:token
                }
            })
            setCurrentUser(res.data.username)
        }
        fn()
    },[])

    return currentUser
}