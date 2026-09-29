import { getServerSession } from "next-auth"
import { AuthOptions } from "../../lib/auth"
export default async function dashboard(){
    const session=await getServerSession(AuthOptions)
    return <div className="bg-[#ddd9d9] w-full">
        <div className="flex items-center pt-5 pl-5">
            <div className="text-2xl pr-1 text-[#6a51a6] text-decoration-line: underline">UserName:  </div>
            <div className="text-2xl font-bold text-[#6a51a6] ">{session.user.name}</div>
        </div>
    </div>
}