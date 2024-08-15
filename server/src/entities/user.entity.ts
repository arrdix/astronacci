import { z } from 'zod'

export const userEntity = z.object({
    id: z.string(),
    username: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    type: z.enum(['BASIC', 'SILVER', 'GOLD']),
})
export type UserEntity = z.infer<typeof userEntity>
