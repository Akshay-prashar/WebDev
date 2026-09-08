export function Button({lable,onClick}){
    return(
        <button type="button" className="text-white bg-black border border-default rounded mt-2 p-2 " onClick={onClick}>{lable}</button>
    )
}