import { CourseType } from "@/constants/course";
import { useCourseSemester } from "@/store/CourseSemester"
import { AxiosInstance } from "@/utils/AxiosInstance";
import { Console } from "console";
import { toast } from "sonner";

export const getCoursesForSemester = async (academic_session_id : number) => {
    const courses = useCourseSemester.getState().courses;
    const setCourses = useCourseSemester.getState().setCourses;

    if (courses === undefined) {
        const response = await AxiosInstance.get(
            `/api/student-info/course-semester/courses?academic_session_id=${academic_session_id}`
        )
        if (response.status !== 200) {
            toast.error('[getCourseSemester.ts] Error fetching courses');
            return; 
        }
        console.log(response.data);
        setCourses(response.data as CourseType[]);
    }
}