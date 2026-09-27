"use client"
import { Appbar } from "@repo/ui/Appbar"
import { useSession ,signIn,signOut } from "next-auth/react"
export default function ClintAppbar(){
    const session=useSession()
    return <div >
      <Appbar onSignin={()=>signIn("credentials",{callbackUrl:"/dashboard"})} onSignout={()=>signOut()} user={session.data?.user}/>
    </div> 
}