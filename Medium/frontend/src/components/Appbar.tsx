type inpt={
    authorName:string
}
export const Appbar=({authorName}:inpt)=>{
    return(
        <div className="flex justify-between p-4 border-b border-slate-200">
            <div className="font-semibold text-lg">Medium</div>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-900 rounded-full">
                <span className="font-bold text-body text-lg text-white">{authorName.slice(0,1).toUpperCase()}</span>
            </div>
        </div>
    )
}