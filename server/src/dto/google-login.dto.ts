import { z } from 'zod'

export const thirdPartyLoginDto = z.object({
    username: z.string(),
    fullname: z.string(),
    email: z.string().email(),
    password: z.string(),
})
export type ThirdPartyLoginDto = z.infer<typeof thirdPartyLoginDto>
