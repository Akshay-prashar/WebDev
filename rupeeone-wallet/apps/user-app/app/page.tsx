"use client"
import Image from "next/image";
import { Card } from "@repo/ui/card";
// import prisma, { PrismaClient } from "@repo/db";
import {increment,decrement,setValue,resetValue } from "@repo/store";
import { useAppDispatch,useAppSelector } from "@repo/store/hooks";
import { signIn } from "next-auth/react";

export default  function Page() {
  // const user =await prisma.user.findUnique({where:{id:2}})

  const count =useAppSelector((state)=>state.counter.value)
  const inputBoxValue =useAppSelector((state)=>state.inputSlice.value)
  const dispatch=useAppDispatch()
  // return(
  //   <div className="flex min-h-screen justify-center items-center flex-col ">
  //     <div>
  //       <input type="text" placeholder="Enter TEXT" onChange={(e)=>dispatch(setValue(e.target.value))} />
  //       <div>{inputBoxValue}</div>
  //       <button onClick={()=>dispatch(resetValue())}>Reset</button>
  //     </div>
  //     <div>
  //       <button className="border rounded w-6 mr-3" onClick={()=>dispatch(decrement())}>-</button>
  //       Count is {count} 
  //       <button className="border rounded w-6 ml-3" onClick={()=>dispatch(increment())}>+</button>
  //     </div>
  //   </div>
  // )
  async function OnClickHandler(){
    await signIn('credentials',{
      phone:"7835623546",
      password:"ksdhksjbjfk",
      email:"ksdjbcjskfbh@gmail"
    })
  }
  return(
    <div>
      <button onClick={OnClickHandler}>Signin</button>
    </div>
  )
}
