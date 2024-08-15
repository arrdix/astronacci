import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores/app-store'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FaDoorOpen, FaGrav, FaHouse, FaUser } from 'react-icons/fa6'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

export function MainLayout() {
    const [activeBar, setActiveBar] = useState<string>()
    const { pathname } = useLocation()

    const loggedUser = useAppStore((state) => state.loggedUser)
    const removeLoggedUser = useAppStore((state) => state.removeLoggedUser)
    const navigate = useNavigate()

    useEffect(() => {
        setActiveBar(pathname)
    }, [pathname])

    function onLogout() {
        localStorage.removeItem('token')
        removeLoggedUser()

        navigate('/')
    }

    return (
        <div className="flex w-full h-screen py-6 px-4 ">
            <div className="w-1/5 bg-foreground h-full rounded-xl p-4">
                <div className="flex flex-col h-full">
                    <h1 className="text-background text-2xl font-bold mb-6">Astronacci</h1>
                    <div className="flex flex-col gap-2 h-full">
                        <Link
                            to="/"
                            className={clsx(
                                'flex items-center gap-4 text-background rounded-lg py-2 px-4 hover:text-foreground hover:bg-background transition-all',
                                {
                                    'text-foreground bg-background': activeBar === '/',
                                }
                            )}
                        >
                            <FaHouse size={24} />
                            <h2 className="text-lg">Video</h2>
                        </Link>
                        <Link
                            to="/article"
                            className={clsx(
                                'flex items-center gap-4 text-background rounded-lg py-2 px-4 hover:text-foreground hover:bg-background transition-all',
                                {
                                    'text-foreground bg-background': activeBar === '/article',
                                }
                            )}
                        >
                            <FaHouse size={24} />
                            <h2 className="text-lg">Article</h2>
                        </Link>
                        <Link
                            to="/membership"
                            className={clsx(
                                'flex items-center gap-4 text-background rounded-lg py-2 px-4 hover:text-foreground hover:bg-background transition-all',
                                {
                                    'text-foreground bg-background': activeBar === '/membership',
                                }
                            )}
                        >
                            <FaGrav size={24} />
                            <h2 className="text-lg">Membership</h2>
                        </Link>
                        <Button
                            className={clsx(
                                'flex items-center gap-4 text-background rounded-lg py-2 px-4 hover:text-foreground hover:bg-background transition-all'
                            )}
                            onClick={onLogout}
                        >
                            <FaDoorOpen size={24} />
                            <h2 className="text-lg">Logout</h2>
                        </Button>
                        <div className="flex items-center gap-3 text-background rounded-lg py-2 px-4 mt-auto">
                            <div className="rounded-full bg-white p-2">
                                <FaUser size={20} />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold leading-none">
                                    {loggedUser?.type}{' '}
                                    <span className="font-normal text-sm">member</span>
                                </p>
                                <p className="text-sm text-gray-400 leading-none">
                                    @{loggedUser?.username}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full px-2">
                <Outlet />
            </div>
        </div>
    )
}
