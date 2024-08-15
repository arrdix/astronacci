import { z } from 'zod'

export const findAllContentDto = z.enum(['BASIC', 'SILVER', 'GOLD'])
export type FindAllContentDto = z.infer<typeof findAllContentDto>
