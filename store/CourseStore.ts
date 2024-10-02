import { CourseDetailsType } from '@/constants/course'
import {create} from 'zustand'
import { persist } from 'zustand/middleware';

interface CourseStoreType {
    course: CourseDetailsType | undefined; 
    setCourse: (course: CourseDetailsType) => void;
}

export const useCourseStore = create<CourseStoreType>() (
    persist(
        (set) => ({
            course: undefined,
            setCourse: (course: CourseDetailsType) => set({course}),
        }),
        {
            name: 'course-storage'
        }
    )
)