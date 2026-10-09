"use server"
import { prisma } from '@/lib/db/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/auth'
import { createAgentInputProps, createAgentInputPropsSchema } from '@/types/agents'
import { getAgentInputProp,getAgentInputPropSchema } from '@/types/agents'
import {updateAgentInputprops,updateAgentInputpropsSchema} from '@/types/agents'
import { deleteAgentInputProp,deleteAgentInputPropSchema } from '@/types/agents'
export async function createAgent({name,description,instructions,avatar}:createAgentInputProps){
    const session=await getServerSession(authOptions)
    const isValidinput=createAgentInputPropsSchema.safeParse({name,description,instructions,avatar})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    try {
        
        const existingAgentWithSameName=await prisma.agent.findFirst({
            where:{
                userId:session.user.id,
                name:name
            }
        })
        if (existingAgentWithSameName) {
            return{
                success:false,
                message:"Agent alredy exist with this name"
            }
        }
        const res=await prisma.agent.create({
            data:{
                userId:session.user.id,
                name,
                description,
                instructions,
                avatar
            }
        });
        return{
            success:true,
            message:"Agent Created Sucessfully",
            agentName:res.name
        }
    } catch (error) {
        return{
           success:false,
           message:"Internal Server Error",
        }
    }

}

export async function getAgents() {
    const session=await getServerSession(authOptions)
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    try {
        const res=await prisma.agent.findMany({
            where:{
                userId:session.user.id
            }
        });
        return{
            success:true,
            agents:res,
            message: res.length? "Agents fetched successfully": "No agents found",
        }
    } catch (error) {
        return{
           success:false, 
           message:"Internal Server Error",
        }
    }
}

export async function getAgent({agentId}:getAgentInputProp) {
    const session=await getServerSession(authOptions)
    const isValidinput=getAgentInputPropSchema.safeParse({agentId})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    }
    try {
        const res=await prisma.agent.findFirst({
            where:{
                id:agentId,
                userId:session.user.id
            }
        });
        if (!res) {
            return{
                success:false,
                message:"Agent Not Found"
            }
        };
        return{
            success:true,
            agent:res
        }
    } catch (error) {
        return{
           success:false,
           message:"Internal Server Error",
        }
    }
}

export async function updateAgent({agentId,name,description,instructions,avatar}:updateAgentInputprops) {
    const session=await getServerSession(authOptions)
    const isValidinput=updateAgentInputpropsSchema.safeParse({agentId,name,description,instructions,avatar})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    } 
    try {
        const isValidReq=await prisma.agent.findFirst({
            where:{
                id:agentId,
                userId:session.user.id
            }
        });
        if (!isValidReq) {
            return{
                success:false,
                message:"invalid Request"
            }
        };
        const res=await prisma.agent.update({
            where:{
                id:agentId
            },
            data:{
                name,
                description,
                instructions,
                avatar
            }
        });
        return{
            success:true,
            message:"Agent updated",
            agentName:res.name
        }
    } catch (error) {
        return{
           success:false, 
           message:"Internal Server Error",
        }
    }
}

export async function deleteAgent({agentId}:deleteAgentInputProp) {
    const session=await getServerSession(authOptions)
    const isValidinput=deleteAgentInputPropSchema.safeParse({agentId})
    if (!isValidinput.success) {
        return{
            success:false,
            message:"Invalid Input"
        }
    }
    if (!session?.user?.id) {
        return{
            success:false,
            message:"Invalid User"
        }
    };
    try {
        const isValidReq=await prisma.agent.findFirst({
            where:{
                id:agentId,
                userId:session.user.id
            }
        });
        if (!isValidReq) {
            return{
                success:false,
                message:"invalid Request"
            }
        };
        const res=await prisma.agent.delete({
            where:{
                id:agentId,
                userId:session.user.id
            }
        });
        return{
            success:true,
            message:"Agent deleted",
            agentName:res.name
        }
    } catch (error) {
        return{
           success:false, 
           message:"Internal Server Error",
        }
    } 
}