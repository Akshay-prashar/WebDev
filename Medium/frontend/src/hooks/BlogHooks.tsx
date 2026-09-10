import axios from "axios"
import { useEffect, useState } from "react"

type blog={
    id:string
    title:string;
    content:string;
    publishedDate:string
    author:{
        name:string;
    };
}
export const useBlogHook=({id}:{id:string})=>{
    const [blog,setBlog]=useState<blog>()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const fn=async()=>{
            const response=await axios.get("https://medium-backend.akshayprashar017.workers.dev/api/v1/blog/"+id,{
                headers:{
                    Authorization:token
                }
            })
            setBlog(response.data.blog)
            setLoading(false)
        }
        fn()
    },[])
    return{
        blog,
        loading
    }
}