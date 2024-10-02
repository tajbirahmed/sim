import { CourseType } from '@/constants/course';
import {create} from 'zustand'; 
import { persist } from 'zustand/middleware';

interface CourseSemesterType {
    courses: CourseType[] | undefined; 
    setCourses: (courses: CourseType[]) => void;
}

export const useCourseSemester = create<CourseSemesterType>() (
    persist(
        (set) => ({
            courses: undefined,
            setCourses: (courses: CourseType[]) => set({courses})
        }),
        {
            name: 'course-semester-storage'
        }
    )
)