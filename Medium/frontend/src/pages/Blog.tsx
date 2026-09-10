import { FullBlog } from "../components/FullBlog"
import { useBlogHook } from "../hooks/BlogHooks"
import { useParams } from "react-router-dom"
function LoaderComponent(){
return(
    <div className="inline-flex" role="status" aria-label="loading">
        <svg className="animate-spin size-20 shrink-0 text-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                <path d="M12 2.75V5.25" opacity="0.15"/>
                <path d="M16.95 4.08L15.7 6.25" opacity="0.22"/>
                <path d="M19.92 7.05L17.75 8.3" opacity="0.32"/>
                <path d="M21.25 12H18.75" opacity="0.42"/>
                <path d="M19.92 16.95L17.75 15.7" opacity="0.54"/>
                <path d="M16.95 19.92L15.7 17.75" opacity="0.66"/>
                <path d="M12 21.25V18.75" opacity="0.78"/>
                <path d="M7.05 19.92L8.3 17.75" opacity="0.9"/>
                <path d="M4.08 16.95L6.25 15.7" opacity="1"/>
                <path d="M2.75 12H5.25" opacity="0.86"/>
                <path d="M4.08 7.05L6.25 8.3" opacity="0.7"/>
                <path d="M7.05 4.08L8.3 6.25" opacity="0.5"/>
            </g>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
)
}
export const BlogComponent=function(){
    const {id}=useParams()
    const {loading,blog}=useBlogHook({
        id:id || ""
    })


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderComponent />
            </div>
        );
    }
    if (!blog) {
    return <div>Blog not found</div>;
}
    const pusblishedDateFrrInput=new Date(blog.publishedDate).toLocaleDateString("en-GB",{
        day: "numeric",
        month: "short",
        year: "numeric"
    }).replaceAll(" ","-")

    return(
        <FullBlog  id={blog.id} title={blog.title} content={blog.content} name={blog.author.name} publishedDate={pusblishedDateFrrInput}/>
    )
}