import { UserEntity } from '@/services/user/entities/entities'
import { create } from 'zustand'

interface AppStore {
    loggedUser: UserEntity | null
    setLoggedUser: (user: UserEntity) => void
    removeLoggedUser: () => void
}

export const useAppStore = create<AppStore>((set) => ({
    loggedUser: null,
    setLoggedUser: (user) => {
        set(() => ({ loggedUser: user }))
    },
    removeLoggedUser: () => {
        set(() => ({ loggedUser: null }))
    },
}))
