import { api } from '@/libs/api'
import { AxiosInstance } from 'axios'

export class FacebookAuthApi {
    api: AxiosInstance = api

    async facebookLogin() {
        try {
            const response = await api.get('/auth/facebook/login', {
                withCredentials: true,
            })

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
