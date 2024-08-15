import { z } from 'zod'

export const registerDto = z.object({
    username: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    password: z.string(),
})
export type RegisterDto = z.infer<typeof registerDto>
