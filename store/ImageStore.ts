import {create} from 'zustand'
import { persist } from 'zustand/middleware';

interface ImageStore {
    image: string | null; 
    setImage: (image: string | null) => void;
}

export const useImageStore = create<ImageStore>() (
    persist(
        (set) => ({
            image: null,
            setImage: (image) => set({ image })
        }),
        {
            name: 'profile-image-store',
        }
    )
)