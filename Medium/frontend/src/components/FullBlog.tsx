import { Appbar } from "./Appbar";
type blog={
    id:string
    title:string;
    content:string;
    publishedDate:string;
    name:string;
}
export const FullBlog=({id,title,content,name,publishedDate}:blog)=>{
    return(
        <div>
            <Appbar/>
            <div className="grid grid-cols-12 p-10">
                <div className="col-span-8">
                    <div className="text-5xl font-bold">{title}</div>
                    <div className="text-sm font-medium text-gray-500 pt-2">Posted on {publishedDate}</div>
                    <div className="text-md font-medium pt-5 text-gray-600">{content}</div>
                </div>
                <div className="col-span-4">
                    <div className="font-medium text-md text-gray-700">Author</div>
                    <div className="flex pt-4">
                        <div>
                            <div className="text-6xl text-slate-100 pr-2">&#9679;</div>
                        </div>
                        <div>
                        <div className="font-bold text-2xl">{name}</div>
                        <div className="font-medium text-gray-500 text-sm pt-2">Details</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}