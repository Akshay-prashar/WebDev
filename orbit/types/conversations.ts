import z, { string } from "zod"

export const createConversationInputpropSchema=z.object({
    agentId:z.string().trim().min(1),
    name:z.string().trim().min(1)
})
export type createConversationInputprop=z.infer<typeof createConversationInputpropSchema>;


export const getConversationsInputpropSchema=z.object({
    agentId:z.string().trim().min(1),
})
export type getConversationsInputprop=z.infer<typeof getConversationsInputpropSchema>;


export const getMessagesInputpropSchema=z.object({
    conversationId:z.string().trim().min(1)
})
export type getMessagesInputprop=z.infer<typeof getMessagesInputpropSchema>;


export const addMessagesInputpropSchema=z.object({
    conversationId:string().trim().min(1),
    role:z.enum(["USER", "ASSISTANT", "TOOL"]),
    content:string().trim().min(1)
})
export type addMessagesInputprop=z.infer<typeof addMessagesInputpropSchema>;