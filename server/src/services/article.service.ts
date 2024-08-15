import { Prisma, PrismaClient } from '@prisma/client'
import primsaErrorHandler from '../utils/prisma-error'
import { contentLimiter } from '../utils/contentLimiter'
import { FindAllArticleDto } from '../dto/find-all-article.dto'

const prisma = new PrismaClient()

class ArticleService {
    async findAll(type: FindAllArticleDto) {
        const limit = contentLimiter(type)

        try {
            if (limit) {
                const articles = await prisma.article.findMany({
                    take: limit,
                    orderBy: {
                        title: 'desc',
                    },
                })

                return {
                    error: false,
                    payload: articles,
                }
            }

            const articles = await prisma.article.findMany({
                orderBy: {
                    title: 'desc',
                },
            })

            return {
                error: false,
                payload: articles,
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

export default new ArticleService()
