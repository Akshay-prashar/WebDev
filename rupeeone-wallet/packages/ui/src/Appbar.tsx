import Button from "./components/Button"

interface AppbarProps{
    user:{
        name?:string | null | undefined,
        email?:string | null | undefined,
        image?:string | null | undefined,
    } |null |undefined,
    onSignin:any,
    onSignout:any
}

export  function Appbar({user,onSignin,onSignout}:AppbarProps){
    return(
        <div className="flex  justify-between border border-gray-400 px-20 items-center py-1.5 bg-[#ddd9d9]">
            <div className="font-bold text-lg text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div>RupeeOne</div>
            </div>
            <div>
                <Button onClick={user?onSignout :onSignin} > {user?"Logout" :"Login"} </Button>
            </div>
        </div>
    )
}