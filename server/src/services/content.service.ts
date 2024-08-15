import { Prisma, PrismaClient } from '@prisma/client'
import primsaErrorHandler from '../utils/prisma-error'
import { ResponseEntity } from '../entities/response.entity'
import { FindAllContentDto } from '../dto/find-all-content.dto'
import { contentLimiter } from '../utils/contentLimiter'

const prisma = new PrismaClient()

class ContentService {
    async findAll(type: FindAllContentDto): Promise<ResponseEntity> {
        const limit = contentLimiter(type)

        try {
            if (limit) {
                const contents = await prisma.content.findMany({
                    take: limit,
                    orderBy: {
                        title: 'desc',
                    },
                })

                return {
                    error: false,
                    payload: contents,
                }
            }

            const contents = await prisma.content.findMany({
                orderBy: {
                    title: 'desc',
                },
            })

            return {
                error: false,
                payload: contents,
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

export default new ContentService()
