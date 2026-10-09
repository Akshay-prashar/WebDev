import z from "zod"

export const createConversationInputpropSchema=z.object({
    agentId:z.string().trim().min(1),
    name:z.string().trim().min(1)
})
export type createConversationInputprop=z.infer<typeof createConversationInputpropSchema>;