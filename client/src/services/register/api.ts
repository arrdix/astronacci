import { api } from '@/libs/api'
import { RegisterDto } from '@/services/register/dto/register.dto'
import { AxiosInstance } from 'axios'

export class RegisterApi {
    api: AxiosInstance = api

    async register(dto: RegisterDto) {
        try {
            const response = await api.post('/auth/register', dto)

            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}
