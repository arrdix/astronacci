import { api } from '@/libs/api'
import { ContentEntity } from '@/services/content/entities/entities'
import { AxiosInstance } from 'axios'

export class ContentApi {
    api: AxiosInstance = api

    async findAll() {
        try {
            const response = await api.get<ContentEntity[]>('/contents', {
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
