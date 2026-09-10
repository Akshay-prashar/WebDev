import { useState } from "react";
import { Appbar } from "../components/Appbar"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const PublishComponent=()=>{
    const navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")
    const onClickHandler=async()=>{
        const token=localStorage.getItem("token");
        try {
            const res=await axios.post("https://medium-backend.akshayprashar017.workers.dev/api/v1/blog",{
                title:title,
                content:content
                },
                {
                    headers:{
                        Authorization:token
                    }
                }
            )
            navigate(`/blog/${res.data.blog.id}`)
        } catch (error) {
         alert("Error! Try again")   
        }
    }

return (
    <div>
        <Appbar />
        <div className="flex justify-end px-30 pt-5">
            <button className="bg-blue-500 rounded-4xl py-1.5 px-6 cursor-pointer" onClick={onClickHandler}>Publish</button>
        </div>
        <div className="p-20 flex flex-col">
            <textarea
                name="title"
                placeholder="Title"
                className="text-5xl border-l pl-2 outline-none border-gray-300 text-gray-500 caret-gray-300 font-normal whitespace-pre-wrap overflow-hidden resize-y"
                rows={1}
                onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }} onChange={(e)=>{
                    setTitle(e.target.value)
                }}
            />
            <textarea
                name="content"
                placeholder="Tell your Story..."
                className="text-gray-500 text-2xl pt-4 pl-2 outline-none caret-gray-300  whitespace-pre-wrap overflow-hidden resize-y"
                rows={1}
                onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}  onChange={(e)=>{
                    setContent(e.target.value)
                }}
            />
        </div>
    </div>
);

}