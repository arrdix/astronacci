import { z } from 'zod'

export const contentEntity = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    video: z.string(),
})
export type ContentEntity = z.infer<typeof contentEntity>
