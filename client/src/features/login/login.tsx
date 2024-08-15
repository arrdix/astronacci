import { Button } from '@/components/ui/button'
import ValidatedInput from '@/components/ui/validated-input'
import { FACEBOOK_REDIRECT_URL, GOOGLE_REDIRECT_URL } from '@/config/config'
import { LoginApi } from '@/services/login/api'
import { LoginDto } from '@/services/login/dto/login.dto'
import { UserApi } from '@/services/user/api'
import { useAppStore } from '@/stores/app-store'
import { useForm } from 'react-hook-form'
import { FaGoogle, FaFacebook } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDto>()
    const navigate = useNavigate()
    const setLoggedUser = useAppStore((state) => state.setLoggedUser)

    async function onLogin(dto: LoginDto) {
        const loginApi = new LoginApi()
        const userApi = new UserApi()
        const token = await loginApi.login(dto)

        if (token) {
            const loggedUser = await userApi.getLoggedUser()
            localStorage.setItem('token', token)

            if (loggedUser) {
                setLoggedUser(loggedUser)
            }

            navigate('/')
        }
    }

    return (
        <div className="flex justify-center items-center gap-8 w-3/5 h-screen">
            <div className="flex w-full h-3/5 bg-b rounded-lg shadow-xl">
                <div className="flex w-full h-full p-4 pr-0">
                    <img
                        className="w-full h-full rounded-lg"
                        src="/assets/images/coin.jpg"
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-8 w-full p-4">
                    <div className="flex flex-col gap-1 items-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <h2 className="text-sm ">Login with your Astronacci account.</h2>
                    </div>
                    <div className="flex flex-col gap-2 w-4/5">
                        <ValidatedInput
                            id="username"
                            name="username"
                            placeholder="Username"
                            type="text"
                            register={register}
                            error={errors.username}
                            autoFocus
                        />
                        <ValidatedInput
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            register={register}
                            error={errors.password}
                        />
                        <Button
                            onClick={() => {
                                handleSubmit((dto) => onLogin(dto))()
                            }}
                        >
                            Login
                        </Button>
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-accent inline">
                                Register.
                            </Link>
                        </p>
                    </div>
                    <p className="text-center w-full">Or continue with</p>
                    <div className="flex justify-center gap-4 w-4/5 -mt-4">
                        <Link to={GOOGLE_REDIRECT_URL}>
                            <FaGoogle size={36} />
                        </Link>
                        <Link to={FACEBOOK_REDIRECT_URL}>
                            <FaFacebook size={36} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
