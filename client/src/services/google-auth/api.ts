import { api } from '@/libs/api'
import { AxiosInstance } from 'axios'

export class GoogleAuthApi {
    api: AxiosInstance = api

    async googleLogin() {
        try {
            const response = await api.get('/auth/google/login', {
                withCredentials: true,
            })

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
