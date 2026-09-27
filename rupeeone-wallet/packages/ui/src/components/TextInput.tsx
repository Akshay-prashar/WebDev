"use client"
interface TextInputProps{
    lable:string;
    onChange:(value:string)=>void;
    placeholder:string;
}
export function TextInput({lable,placeholder,onChange}:TextInputProps){
    return(
        <div className="pt-2">
            <label className="mb-2 text-sm font-medium text-gray-900">{lable}</label>
            <input type="text" placeholder={placeholder} onChange={(e)=> onChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    )
}