import { z } from 'zod'

export const upgradeUserDto = z.object({
    username: z.string(),
    type: z.enum(['BASIC', 'SILVER', 'GOLD']),
})
export type UpgradeUserDto = z.infer<typeof upgradeUserDto>
