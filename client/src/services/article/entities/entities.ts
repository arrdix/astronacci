import { z } from 'zod'

export const articleEntity = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string(),
})
export type ArticleEntity = z.infer<typeof articleEntity>
