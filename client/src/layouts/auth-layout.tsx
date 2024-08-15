import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className="flex justify-center p-2">
            <Outlet />
        </div>
    )
}
