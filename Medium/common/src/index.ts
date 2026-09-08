import z from 'zod'

export const signupInput=z.object({
    email:z.email(),
    name:z.string(),
    password:z.string().min(8)
})
export type signupInput= z.infer<typeof signupInput>

export const signinInput=z.object({
    email:z.email(),
    name:z.string(),
    password:z.string().min(8)
})
export type SigninInput= z.infer<typeof signinInput>

export const createBlogInput=z.object({
    title:z.string(),
    content:z.string()
});
export type CreateBlogInput=z.infer<typeof createBlogInput>

export const updateBlogInput=z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
});

export type UpdateBlogInput=z.infer<typeof updateBlogInput>