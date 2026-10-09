import z from 'zod'

export const createAgentInputPropsSchema=z.object({
    name:z.string().trim().min(1),
    description:z.string().trim().min(1),
    instructions:z.string().trim().min(1),
    avatar:z.string().trim().min(1)
})
export type createAgentInputProps = z.infer<typeof createAgentInputPropsSchema>;


export const getAgentInputPropSchema=z.object({
    agentId:z.string().trim().min(1)
})
export type getAgentInputProp=z.infer<typeof getAgentInputPropSchema>;


export const updateAgentInputpropsSchema=z.object({
    agentId:z.string().trim().min(1),
    name:z.string().trim().min(1),
    description:z.string().trim().min(1),
    instructions:z.string().trim().min(1),
    avatar:z.string().trim().min(1)
})
export type updateAgentInputprops=z.infer<typeof updateAgentInputpropsSchema>;


export const deleteAgentInputPropSchema=z.object({
    agentId:z.string().trim().min(1)
})
export type deleteAgentInputProp=z.infer<typeof deleteAgentInputPropSchema>;

