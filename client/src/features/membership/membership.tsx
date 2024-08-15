import { Card } from '@/features/membership/components/card'

export function Membership() {
    return (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-full p-4 -translate-y-24">
            <h1 className="text-3xl font-bold">Astronacci Membership Plan</h1>
            <div className="flex justify-center items-center gap-4 w-full">
                <Card size="base" type="BASIC" />
                <Card size="lg" type="GOLD" />
                <Card size="base" type="SILVER" />
            </div>
        </div>
    )
}
