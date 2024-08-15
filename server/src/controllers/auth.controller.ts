import { Request, Response } from 'express'
import { registerDto } from '../dto/register.dto'
import { z } from 'zod'
import authServices from '../services/auth.services'
import { loginDto } from '../dto/login.dto'

declare module 'express-serve-static-core' {
    export interface Request {
        user: {
            _json: {
                id: string
                name: string
                given_name: string
                first_name: string
                last_name: string
                email: string
                sub: string
            }
        }
    }
}

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const dto = registerDto.parse(req.body)
            const { error, payload } = await authServices.register(dto)

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

    async login(req: Request, res: Response) {
        try {
            const dto = loginDto.parse(req.body)
            const { error, payload } = await authServices.login(dto)

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

    async googleAuthCallback(req: Request, res: Response) {
        res.redirect('http://localhost:5173/google')
    }

    async googleAuthLogin(req: Request, res: Response) {
        if (req.user) {
            const { name, given_name, email, sub } = req.user._json

            try {
                const { error, payload } = await authServices.thirdPartyLogin({
                    fullname: name,
                    username: given_name,
                    email: email,
                    password: sub,
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

    async facebookAuthCallback(req: Request, res: Response) {
        res.redirect('http://localhost:5173/facebook')
    }

    async facebookLogin(req: Request, res: Response) {
        const { email, last_name, first_name, id } = req.user._json

        try {
            const { error, payload } = await authServices.thirdPartyLogin({
                email,
                fullname: `${first_name} ${last_name}`,
                username: `${first_name}${last_name}`,
                password: id,
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

export default new AuthController()
