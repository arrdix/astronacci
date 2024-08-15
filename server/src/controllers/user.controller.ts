import { Request, Response } from 'express'
import userService from '../services/user.service'
import { z } from 'zod'
import { UserEntity } from '../entities/user.entity'

class UserController {
    async getLoggedUser(req: Request, res: Response) {
        const loggedUser = res.locals.user

        try {
            const { error, payload } = await userService.getLoggedUser(loggedUser.username)

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

    async upgradeUser(req: Request, res: Response) {
        const loggedUser: UserEntity = res.locals.user
        const { type } = req.body

        try {
            const { error, payload } = await userService.upgradeUser({
                username: loggedUser.username,
                type,
            })

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

export default new UserController()
