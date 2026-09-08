import { Button } from "./Button"
export function Task({task,onClickHandler1,onClickHandler2}){
    return(
        <div className="border border-gray-400  text-center py-1.5 bg-gray-300 ">
            <div className="font-bold text-2xl">{task}</div>
            <div>
                <Button  lable={"Update"} onClick={onClickHandler1}/>
                <Button lable={"Delete"} onClick={onClickHandler2}/>
            </div>
        </div>
    )
}