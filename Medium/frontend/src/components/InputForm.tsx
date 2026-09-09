import type { ChangeEvent } from "react"
import { Link } from "react-router-dom"
type ForminputLables={
    heading:string,
    subheading:string,
    link:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    onClick:()=>void,
    btnText:string
}

export const InputForm=({heading,subheading,link,onChange,onClick,btnText}:ForminputLables)=>{
    return(
        <div className="flex justify-center">
            <div className="flex flex-col justify-center">

                <div className="text-3xl font-bold">{heading}</div>
                <div className="text-sm font-light text-gray-400">{subheading}<Link className="underline" to={`/${link}`}>{link}</Link></div>

                <label className="font-bold py-2">Email</label>
                <input name="email" type="email" placeholder="Enter Your email" className="border rounded border-gray-300 p-1 focus:outline-none focus:border-blue-400 focus:ring-blue-500 " onChange={onChange} />

                <label className="font-bold py-2">Username</label>
                <input name="name" type="text" placeholder="Enter Your Username" className="border rounded border-gray-300 p-1 focus:outline-none focus:border-blue-400 focus:ring-blue-500 " onChange={onChange}/>       

                <label className="font-bold py-2">Password</label>
                <input name="password" type="password" placeholder="Enter Your Password" className="border rounded border-gray-300 p-1 focus:outline-none focus:border-blue-400 focus:ring-blue-500 " onChange={onChange}/>

                <button onClick={onClick} className="bg-black rounded-lg text-white py-2 mt-3">{btnText}</button>
            </div>
        </div>
    )
}