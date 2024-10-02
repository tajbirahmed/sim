import { ResultType } from '@/util/getAllReqults'
import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface SemesterResultStore {
    results: ResultType[]
    setResults: (results : ResultType[]) => void
}

export const useSemesterResultStore = create<SemesterResultStore> () (
    persist(
        (set) => ({
            results: [],
            setResults: (results : ResultType[]) => set({results}),
        }),
        {
            name: 'semester-result-store'
        }
    )
)