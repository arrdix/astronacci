import { z } from 'zod'

export const facebookLoginDto = z.object({
    username: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    password: z.string(),
})
export type FacebookLoginDto = z.infer<typeof facebookLoginDto>
