import { Prisma, PrismaClient } from '@prisma/client'
import { RegisterDto } from '../dto/register.dto'
import Hasher from '../utils/hasher'
import primsaErrorHandler from '../utils/prisma-error'
import { ResponseEntity } from '../entities/response.entity'
import { LoginDto } from '../dto/login.dto'
import jwt from 'jsonwebtoken'
import { SECRET_SAUCE } from '../config/app.conf'
import { ThirdPartyLoginDto } from '../dto/google-login.dto'
import { FacebookLoginDto } from '../dto/facebook-login.dto'

const prisma = new PrismaClient()

class AuthService {
    async register(dto: RegisterDto): Promise<ResponseEntity> {
        try {
            await prisma.user.create({
                data: {
                    ...dto,
                    type: 'BASIC',
                    password: await Hasher.hashPassword(dto.password),
                },
            })

            return {
                error: false,
                payload: 'Account created.',
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    error: true,
                    payload: primsaErrorHandler(error),
                }
            }

            return {
                error: true,
                payload: error,
            }
        }
    }

    async login(dto: LoginDto): Promise<ResponseEntity> {
        try {
            const requestedUser = await prisma.user.findFirst({
                where: {
                    username: dto.username,
                },
            })

            if (!requestedUser) {
                return {
                    error: true,
                    payload: 'Wrong username/password.',
                }
            }

            const isPasswordMatch = await Hasher.comparePassword(
                dto.password,
                requestedUser.password
            )

            if (!isPasswordMatch) {
                return {
                    error: true,
                    payload: 'Wrong username/password.',
                }
            }

            const { password, ...userWithoutPassword } = requestedUser
            const token = jwt.sign(userWithoutPassword, SECRET_SAUCE)

            return {
                error: false,
                payload: token,
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    error: true,
                    payload: primsaErrorHandler(error),
                }
            }

            return {
                error: true,
                payload: error,
            }
        }
    }

    async thirdPartyLogin(dto: ThirdPartyLoginDto): Promise<ResponseEntity> {
        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            username: dto.username,
                        },
                        {
                            email: dto.email,
                        },
                    ],
                },
            })

            if (existingUser) {
                const { password, ...userWithoutPassword } = existingUser
                const token = jwt.sign(userWithoutPassword, SECRET_SAUCE)

                return {
                    error: false,
                    payload: token,
                }
            }

            const newUser = await prisma.user.create({
                data: {
                    ...dto,
                    type: 'BASIC',
                    password: await Hasher.hashPassword(dto.password),
                },
            })

            const { password, ...userWithoutPassword } = newUser
            const token = jwt.sign(userWithoutPassword, SECRET_SAUCE)

            return {
                error: false,
                payload: token,
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {
                    error: true,
                    payload: primsaErrorHandler(error),
                }
            }

            return {
                error: true,
                payload: error,
            }
        }
    }
}

export default new AuthService()
