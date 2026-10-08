import { getServerSession } from "next-auth"
import {authOptions} from '@/lib/auth/auth'
import { redirect } from "next/navigation"

export default async function DashboardPage(){
    const session=await getServerSession(authOptions)
    if (!session?.user) {
        redirect('api/auth/signin')
    }
    return <div>
        This is DashBoard
    </div>
}