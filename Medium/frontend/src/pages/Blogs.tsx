import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import {useBlogsHook} from "../hooks/BlogsHook"
import { SkelatonComponent } from "../components/Skelaton"

function LoaderComponent(){
return(
    <div>
        <Appbar/>
        <div>
            <SkelatonComponent/>
            <SkelatonComponent/>
            <SkelatonComponent/>
            <SkelatonComponent/>
        </div>
    </div>
)
}
export const BlogsComponent=()=>{
    const {loading,blogs}=useBlogsHook()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderComponent />
            </div>
        );
    }
    return(
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    {
                        blogs.map((e)=>{
                        return (
                            <BlogCard
                            key={e.id} 
                            id={e.id}
                            title={e.title} 
                            content={e.content} 
                            authorName={e.author.name} 
                            publishedDate={new Date(e.publishedDate).toLocaleDateString("en-GB",{
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            }).replaceAll(" ","-")}
                            />
                        )
                        })
                    }
                </div>
            </div>
        </div>
    )
}