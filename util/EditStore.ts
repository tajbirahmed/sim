import { FormEdit } from '@/app/editprofile/page'
import {create} from 'zustand'
import { persist } from 'zustand/middleware';

interface EditType {
    editedValues: FormEdit | undefined; 
    setEditedValues: (editedValues: FormEdit) => void;
}

export const useEditStore = create<EditType>()(
    persist(
        (set) => ({
            editedValues: undefined,
            setEditedValues: (editedValues: FormEdit) => set({editedValues})
        }),
        {
            name: 'edit-store',
        }
    )
)
