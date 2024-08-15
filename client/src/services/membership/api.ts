import { api } from '@/libs/api'
import { UpgradeUserDto } from '@/services/membership/dto/upgrade-user'
import { AxiosInstance } from 'axios'

export class MembershipApi {
    api: AxiosInstance = api

    async upgradeUser(dto: UpgradeUserDto) {
        try {
            const response = await api.post('/user/upgrade', dto, {
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
