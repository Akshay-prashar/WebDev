import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
export function DashboardTop(){
    const navigate=useNavigate()
    function onClickHandler(){
        localStorage.removeItem('token')
        navigate('/Signin')
    }
    return(
        <div className="flex justify-between mx-10 my-5 shadow-sm p-2 text-center" >
            <div>kjgb</div>
            <Button lable={"Logout"} onClick={onClickHandler}/>
        </div>
    )
}