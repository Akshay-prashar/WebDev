export function Inputbox({lable,placeholder,onChange}){
    return(
        <>
        <div>{lable}</div>
        <input className="border-2 border-gray-500 rounded px-2" type="text" placeholder={placeholder} onChange={onChange}/>
        </>
    )
}