import { api } from '@/libs/api'
import { LoginDto } from '@/services/login/dto/login.dto'
import { AxiosInstance } from 'axios'

export class LoginApi {
    api: AxiosInstance = api

    async login(dto: LoginDto) {
        try {
            const response = await api.post('/auth/login', dto)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
