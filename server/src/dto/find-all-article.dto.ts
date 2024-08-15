import { z } from 'zod'

export const findAllArticleDto = z.enum(['BASIC', 'SILVER', 'GOLD'])
export type FindAllArticleDto = z.infer<typeof findAllArticleDto>
