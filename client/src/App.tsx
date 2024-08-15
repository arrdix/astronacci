import { Facebook } from '@/features/facebook/facebook'
import { Google } from '@/features/google/google'
import { Video } from '@/features/video/video'
import { Login } from '@/features/login/login'
import { Membership } from '@/features/membership/membership'
import { Register } from '@/features/register/register'
import { AuthLayout } from '@/layouts/auth-layout'
import { MainLayout } from '@/layouts/main-layout'
import { UserApi } from '@/services/user/api'
import { useAppStore } from '@/stores/app-store'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article } from '@/features/article/article'

function App() {
    const [isPreloaded, setPreloaded] = useState<boolean>(true)
    const loggedUser = useAppStore((state) => state.loggedUser)
    const setLoggedUser = useAppStore((state) => state.setLoggedUser)
    const removeLoggedUser = useAppStore((state) => state.removeLoggedUser)

    useEffect(() => {
        async function isUserLogged() {
            const api = new UserApi()
            try {
                const loggedUser = await api.getLoggedUser()

                if (loggedUser) {
                    setLoggedUser(loggedUser)
                }
            } catch (err) {
                console.log(err)
                removeLoggedUser()
            } finally {
                setPreloaded(false)
            }
        }

        isUserLogged()
    }, [])

    if (isPreloaded) {
        return <h1>Loading...</h1>
    }

    if (loggedUser) {
        return (
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Video />} />
                    <Route path="/article" element={<Article />} />
                    <Route path="/membership" element={<Membership />} />
                </Route>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/google" element={<Google />} />
                <Route path="/facebook" element={<Facebook />} />
            </Route>
        </Routes>
    )
}

export default App
