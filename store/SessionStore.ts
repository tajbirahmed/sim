import {SessionType} from "@/types/SessionType";
import {User} from "@/types/User";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import { AxiosInstance } from "@/utils/AxiosInstance";
import { Student } from "@/types/StundentType";
import { toast } from "sonner";

interface StoreType {
    session: SessionType | undefined,
    setSession: (session: SessionType) => void
    student: User & Student | undefined
    setStudent: (student: User & Student | undefined) => void
}

export const useSessionStore = create<StoreType>() (
    persist(
        (set) => ({
            session: undefined,
            setSession: (session: SessionType) => set({session}),
            student: undefined,
            setStudent: (student: User & Student | undefined) => set({student})
        }),
        {
            name: 'session-storage'
        }
    )
)

export const getSession = async () : Promise<SessionType | undefined> => {
    const response = await AxiosInstance.post(
        '/api/login/student',
        {
            student_id: parseInt(process.env.NEXT_PUBLIC_USER_EMAIL!),
            password: process.env.NEXT_PUBLIC_USER_PASSWORD!
        }
    )
    if (response.status !== 200) {
        toast.error('Error while attempting to login');
        return undefined;
    }
    return response.data as SessionType;
}

export const getStudent = async (session : SessionType) : Promise<User & Student | undefined> => {
    const response = await AxiosInstance.get(`/api/student-info/base-info?session_id=${session.session_id}`);
    if (response.status !== 200) {
        toast.error('Error fetching student info');
        return undefined;
    }
    return response.data as User & Student;
}