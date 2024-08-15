import { FacebookAuthApi } from '@/services/facebook-auth/api'
import { UserApi } from '@/services/user/api'
import { useAppStore } from '@/stores/app-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Facebook() {
    const setLoggedUser = useAppStore((state) => state.setLoggedUser)
    const facebookApi = new FacebookAuthApi()
    const userApi = new UserApi()
    const navigate = useNavigate()

    useEffect(() => {
        async function facebookLogin() {
            const token = await facebookApi.facebookLogin()

            if (token) {
                localStorage.setItem('token', token)
                const loggedUser = await userApi.getLoggedUser()

                if (loggedUser) {
                    setLoggedUser(loggedUser)
                }

                navigate('/')
            }
        }

        facebookLogin()
    }, [])

    return <h1>Redirecting</h1>
}
