import { api } from '@/libs/api'
import { UserEntity } from '@/services/user/entities/entities'
import { AxiosInstance } from 'axios'

export class UserApi {
    api: AxiosInstance = api

    async getLoggedUser() {
        try {
            const response = await api.get<UserEntity>('/user/me', {
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
