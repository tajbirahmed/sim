import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface SideBarStore {
    isOpen: boolean
    toggleSideBar: (isOpen : boolean) => void
}

export const useSideBarStore = create<SideBarStore>() (
    persist(
        (set) => ({
            isOpen: false,
            toggleSideBar: (isOpen : boolean) => set({isOpen})
        }),
        {
            name: 'sidebar-store'
        }
    )
)