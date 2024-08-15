import { Button } from '@/components/ui/button'
import { MembershipApi } from '@/services/membership/api'
import { UserApi } from '@/services/user/api'
import { useAppStore } from '@/stores/app-store'
import formatCurrency from '@/utils/formatCurrency'
import clsx from 'clsx'

interface CardProps {
    size: 'base' | 'lg'
    type: 'BASIC' | 'SILVER' | 'GOLD'
}

export function Card({ size, type }: CardProps) {
    const loggedUser = useAppStore((state) => state.loggedUser)
    const setLoggedUser = useAppStore((state) => state.setLoggedUser)
    const api = new MembershipApi()
    const userApi = new UserApi()

    const plans = {
        BASIC: {
            price: 1200000,
            benefits: ['3 exclusive videos', '3 exclusive articles', 'Weekly market updates.'],
        },
        SILVER: {
            price: 3400000,
            benefits: [
                '10 exclusive videos',
                '10 exclusive articles',
                'Daily market updates (in-depth)',
                'Personalized learning path',
            ],
        },
        GOLD: {
            price: 9999999,
            benefits: [
                'Unlimited exclusive videos',
                'Unlimited exclusive articles',
                'Daily market analysis and insights',
                'Weekly live trading sessions',
                'VIP community access',
                'Priority customer support',
                'Personalized trading coaching',
            ],
        },
    }

    async function onUpgradeUser() {
        const token = await api.upgradeUser({ type })

        if (token) {
            console.log(token)
            const loggedUser = await userApi.getLoggedUser()
            localStorage.setItem('token', token)

            if (loggedUser) {
                setLoggedUser(loggedUser)
            }
        }
    }

    return (
        <div
            className={clsx(
                'flex flex-col items-center gap-4 w-72 border-2 border-foreground rounded-lg py-6 px-4 relative',
                {
                    'h-80': size == 'base',
                    'h-96': size == 'lg',
                }
            )}
        >
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-black">{type}</h2>
            </div>
            <div className="flex flex-col items-center h-full">
                {plans[type].benefits.map((benefit) => (
                    <p key={benefit} className="text-base">
                        {benefit}
                    </p>
                ))}
            </div>
            <p className="text-2xl">{formatCurrency(plans[type].price)}</p>
            <Button
                className="text-background bg-foreground w-full py-2 rounded-lg mt-auto"
                onClick={onUpgradeUser}
                disabled={loggedUser?.type === type}
            >
                Select
            </Button>
            {loggedUser?.type === type && (
                <div className="w-auto h-auto border-2 border-foreground bg-background text-foreground font-semibold absolute -top-6 -right-3 rounded-lg p-2 px-6">
                    Current Plan
                </div>
            )}
        </div>
    )
}
