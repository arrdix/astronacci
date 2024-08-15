import { GoogleAuthApi } from '@/services/google-auth/api'
import { UserApi } from '@/services/user/api'
import { useAppStore } from '@/stores/app-store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Google() {
    const setLoggedUser = useAppStore((state) => state.setLoggedUser)
    const googleApi = new GoogleAuthApi()
    const userApi = new UserApi()
    const navigate = useNavigate()

    useEffect(() => {
        async function googleLogin() {
            const token = await googleApi.googleLogin()

            if (token) {
                localStorage.setItem('token', token)
                const loggedUser = await userApi.getLoggedUser()

                if (loggedUser) {
                    setLoggedUser(loggedUser)
                }

                navigate('/')
            }
        }

        googleLogin()
    }, [])

    return <h1>Redirecting</h1>
}
