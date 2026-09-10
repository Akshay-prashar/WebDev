import { Link } from "react-router-dom"

type inpt={
    authorName:string
}
export const Appbar=({authorName}:inpt)=>{
    return(
        <div className="flex justify-between p-4 border-b border-slate-200">
            <div className="font-semibold text-lg">Medium</div>
            <div>
            <Link to={'/publish'}>
                <button className="bg-green-500 rounded-4xl py-1.5 px-4 mr-4 cursor-pointer">New</button>
            </Link>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-900 rounded-full">
                <span className="font-bold text-body text-lg text-white">{authorName.slice(0,1).toUpperCase()}</span>
            </div>
            </div>
        </div>
    )
}