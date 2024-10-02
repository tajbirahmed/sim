import { CourseDetailsType } from "@/constants/course";
import { useCourseStore } from "@/store/CourseStore";
import { useSessionStore } from "@/store/SessionStore";
import { AxiosInstance } from "@/utils/AxiosInstance"
import { toast } from "sonner";

export const getCourseById = async (course_id : number) => {
    const student = useSessionStore.getState().student;
    
    try {
        if (student === undefined) {
            throw new Error('Student is not logged in');
        }
        const response = await AxiosInstance.post(
            '/api/student-info/course-semester/course', 
            {
                academic_session_id: student.academic_session_id,
                course_id,
                student_id: student.student_id
            }
        )
        if (response.status !== 200) {
            throw new Error('Error fetching course');
        }
        useCourseStore.setState({course: response.data as CourseDetailsType});
    } catch (error) {
        console.error(error);
    }
}