"use server"
import { prisma } from '@/lib/db/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { createConversationInputprop,createConversationInputpropSchema } from '@/types/conversations'

export async function CreateConversation({agentId,name}:createConversationInputprop){
    const session=await getServerSession(authOptions)
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    const isValidinput=createConversationInputpropSchema.safeParse({agentId,name})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    try {
        const res=await prisma.conversation.create({
            data:{
                userId:session.user.id,
                agentId:agentId,
                name:name
            }
        })
        return{
            success:true,
            message:"Conversation Created",
            name:res.name
        }
    } catch (error) {
        return{
            success:false,
            message:"Internal server error"
        }
    }
}