"use server"
import { prisma } from '@/lib/db/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { createConversationInputprop,createConversationInputpropSchema } from '@/types/conversations'
import { getConversationsInputprop,getConversationsInputpropSchema } from '@/types/conversations'
import { getMessagesInputprop,getMessagesInputpropSchema } from '@/types/conversations'
import { addMessagesInputprop,addMessagesInputpropSchema } from '@/types/conversations'

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
        const isValidAgent=await prisma.agent.findFirst({
            where:{
                userId:session.user.id,
                id:agentId
            }
        });
        if (!isValidAgent) {
            return{
                success:false,
                message:"Agent Not Found"
            }
        }
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

export async function getConversations({agentId}:getConversationsInputprop) {
    const session=await getServerSession(authOptions)
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    const isValidinput=getConversationsInputpropSchema.safeParse({agentId})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    try {
        const res=await prisma.conversation.findMany({
            where:{
                userId:session.user.id,
                agentId:agentId
            },
            orderBy:{
                createdAt: "desc"
            }
        });
        return{
            success:true,
            conversations:res,
            message: res.length? "Conversation fetched successfully": "No Conversation found",
        }
    } catch (error) {
        return{
            success:false,
            message:"Internal Server Error"
        }
    }
}

export async function getMessages({conversationId}:getMessagesInputprop) {
    const session=await getServerSession(authOptions)
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    const isValidinput=getMessagesInputpropSchema.safeParse({conversationId})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    try {
        const isValiConversation=await prisma.conversation.findFirst({
            where:{
                userId:session.user.id,
                id:conversationId
            }
        })
        if (!isValiConversation) {
            return{
                success: false,
                message: "Conversation not found"
            }
        }
        const res=await prisma.chatMessage.findMany({
            where:{
                conversationId
            },
            orderBy:{
                createdAt: "desc"
            }
        });
        return{
            success:true,
            messages:res,
            message: res.length? "Conversation fetched successfully": "No Conversation found",
        }
    } catch (error) {
        return{
            success:false,
            message:"Internal Server Error"
        }
    }
}

export async function addMessage({conversationId,role,content}:addMessagesInputprop) {
    const session=await getServerSession(authOptions)
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    const isValidinput=addMessagesInputpropSchema.safeParse({conversationId,role,content})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    try {

        const isValiConversation=await prisma.conversation.findFirst({
            where:{
                userId:session.user.id,
                id:conversationId
            }
        })
        if (!isValiConversation) {
            return{
                success:false,
                message:"Conversation Not Fount"
            }
        }
        const res=await prisma.chatMessage.create({
            data:{
                conversationId,
                role,
                content
            }
        })
        return{
            success:true,
            message:"Message Added",
            ChatMessageId:res.id
        }
    } catch (error) {
        return{
            success:false,
            message:"Internal Server Error"
        }
    }
}