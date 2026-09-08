import { Link } from "react-router-dom";
export function Bottomline({lable,to,buttonText}){
    return(
        <div className="flex justify-center text-sm pt-1">
            <div>{lable}</div>
            <Link className="cursor-pointer underline pl-1" to={to}>{buttonText}</Link>
        </div>
    )
}