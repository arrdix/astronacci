import { Button } from '@/components/ui/button'
import ValidatedInput from '@/components/ui/validated-input'
import { RegisterApi } from '@/services/register/api'
import { RegisterDto } from '@/services/register/dto/register.dto'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterDto>()
    const navigate = useNavigate()

    async function onRegister(dto: RegisterDto) {
        const api = new RegisterApi()
        await api.register(dto)

        navigate('/')
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
                <div className="flex flex-col justify-center items-center gap-6 w-full p-4">
                    <div className="flex flex-col gap-1 items-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <h2 className="text-sm ">Create an Astronacci account.</h2>
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
                            id="fullname"
                            name="fullname"
                            placeholder="fullname"
                            type="text"
                            register={register}
                            error={errors.fullname}
                        />
                        <ValidatedInput
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="text"
                            register={register}
                            error={errors.email}
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
                                handleSubmit((dto) => onRegister(dto))()
                            }}
                        >
                            Register
                        </Button>
                        <p className="text-sm">
                            Already have an account?{' '}
                            <Link to="/" className="text-accent inline">
                                Login.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
