import { useEffect, useState } from "react"
import axios from "axios"
type Blog = {
    id: string;
    title: string;
    content: string;
    publishedDate:string;
    author: {
        name: string;
    };
};
export const useBlogHook=()=>{
    const [blogs,setBlogs]=useState<Blog[]>([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const fn=async()=>{
            const token=localStorage.getItem("token")
            const response=await axios.get("https://medium-backend.akshayprashar017.workers.dev/api/v1/blog/bulk",{
                headers:{Authorization:token}
            })
            setBlogs(response.data.blogs)
            setLoading(false)
        }
        fn()
    },[])

    return {
        blogs,
        loading
    }
}