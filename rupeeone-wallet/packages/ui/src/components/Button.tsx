import { ReactNode } from "react"

interface buttonProps{
    children:ReactNode;
    onClick: () => void;
}
export default function Button({onClick,children}:buttonProps){
    return(
        <button onClick={onClick} className="rounded-2xl text-white font-bold px-4 py-2 bg-blue-500 text-lg cursor-pointer">{children}</button>
    )
}