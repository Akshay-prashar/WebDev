interface CardProps{
    title:string;
    children:React.ReactNode
}
export function Card({title,children}:CardProps){
    return(
        <div className=" p-4 h-fit rounded  ">
            <h1 className="text-2xl font-bold border-gray-100 border-b">{title}</h1>
            {children}
        </div>
    )
}