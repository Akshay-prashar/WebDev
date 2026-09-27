import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../lib/auth";

export  async function GET(){
    const session=await getServerSession(AuthOptions)
    if(session?.user){
        return NextResponse.json({user:session.user})
    }
    return NextResponse.json({
        message:"You are not Logged in"
    },{status:403})
} 