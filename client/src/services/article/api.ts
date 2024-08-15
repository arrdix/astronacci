import { api } from '@/libs/api'
import { ArticleEntity } from '@/services/article/entities/entities'
import { AxiosInstance } from 'axios'

export class ArticleApi {
    api: AxiosInstance = api

    async findAll() {
        try {
            const response = await api.get<ArticleEntity[]>('/articles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
