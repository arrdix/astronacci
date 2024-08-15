import { Request, Response } from 'express'
import contentService from '../services/content.service'
import { z } from 'zod'
import { UserEntity } from '../entities/user.entity'

class ContentController {
    async findAll(req: Request, res: Response) {
        const loggedUser: UserEntity = res.locals.user

        try {
            const { error, payload } = await contentService.findAll(loggedUser.type)

            if (error) {
                res.status(500).json(payload)
                return
            }

            res.status(200).json(payload)
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: 'Bad Request' })
            }

            return res.status(500).json({ error: 'Internal Server Error.' })
        }
    }
}

export default new ContentController()
