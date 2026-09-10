import { Link } from "react-router-dom"

type BlogCardInput={
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}

export const BlogCard=({authorName,title,content,publishedDate,id}:BlogCardInput)=>{
    return(
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 w-2xl cursor-pointer">
                <div className="flex items-center">  
                    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full">
                        <span className="font-medium text-body">{authorName.slice(0,1).toUpperCase()}</span>
                    </div>
                    <div className="font-extralight px-2">{authorName}</div>
                    <div className="text-xs text-slate-300">&#9679;</div>
                    <div className="font-thin text-slate-400 text-sm px-2">{publishedDate}</div>
                </div>
                <div className="text-xl font-bold pt-2">{title} </div>
                <div className="text-md font-thin">{content.length>200 ?content.slice(0,200)+"...":content}</div>
                <div className="font-light text-sm pt-4">{Math.ceil(content.length/100)} min read</div>
            </div>
        </Link>
    )
}