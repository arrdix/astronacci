import { Prisma, PrismaClient } from '@prisma/client'
import { ResponseEntity } from '../entities/response.entity'
import primsaErrorHandler from '../utils/prisma-error'
import { UpgradeUserDto } from '../dto/upgrade-user.dto'
import jwt from 'jsonwebtoken'
import { SECRET_SAUCE } from '../config/app.conf'

const prisma = new PrismaClient()

class UserService {
    async getLoggedUser(username: string): Promise<ResponseEntity> {
        try {
            const loggedUser = await prisma.user.findFirst({
                where: {
                    username,
                },
            })

            if (!loggedUser) {
                return {
                    error: true,
                    payload: 'User not found.',
                }
            }

            const { password, ...userWithoutPassword } = loggedUser

            return {
                error: false,
                payload: userWithoutPassword,
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

    async upgradeUser(dto: UpgradeUserDto) {
        try {
            const upgradedUser = await prisma.user.update({
                where: {
                    username: dto.username,
                },
                data: {
                    type: dto.type,
                },
            })

            const { password, ...userWithoutPassword } = upgradedUser
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

export default new UserService()
