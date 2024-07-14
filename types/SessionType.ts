import { User } from "@/types/User";

export type SessionType = {
    message: string;
    session_id: string;
    user?: User;
    role?: string;
}

