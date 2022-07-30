import z from 'zod'

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email()
})

export const createUserOutputSchema = z.object({
    name: z.string(),
    email: z.string().email()
})

export type CreateUserInput = z.infer<typeof createUserSchema>


export const requestOtpSchema = z.object({
    email: z.string().email(),
    redirect: z.string().default('/')
})

export type RequestOtpInput = z.infer<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
    hash: z.string()
})