export const SkelatonComponent=()=>{
    return (
    <div className="p-4 border-b border-slate-200 w-2xl">
        <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse"></div>

            <div className="h-4 w-24 bg-slate-200 rounded ml-2 animate-pulse"></div>

            <div className="w-1 h-1 rounded-full bg-slate-200 mx-2 animate-pulse"></div>

            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse"></div>
        </div>

        <div className="h-6 w-3/4 bg-slate-200 rounded mt-3 animate-pulse"></div>
        <div className="mt-2 space-y-2">
            <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
        </div>

        <div className="h-3 w-16 bg-slate-200 rounded mt-4 animate-pulse"></div>
    </div>
);
 
}