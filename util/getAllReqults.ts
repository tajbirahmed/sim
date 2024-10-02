import { useSemesterResultStore } from "@/store/semesterResultStore";
import { AxiosInstance } from "@/utils/AxiosInstance";
import { toast } from "sonner"

export interface ResultType {
    academic_session_id: number,
    student_id: number,
    cgpa: number,
}

export const getAllResults = async (student_id: number) => {

    try {
        const response = await AxiosInstance.get(`/api/student-info/result/all?student_id=${student_id}`);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        console.log(response.data);
        
        useSemesterResultStore.setState({results: response.data as ResultType[]});   
    } catch (error) {
        toast.error('Error fetching results')
        return undefined;
    }
}