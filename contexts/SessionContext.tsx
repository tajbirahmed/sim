"use client";
import { SessionType } from "@/types/SessionType";
import { Student } from "@/types/StundentType";
import { User } from "@/types/User";
import { log } from "console";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface SesssionContextType {
    session: SessionType | undefined,
    setSession: (session: SessionType | undefined) => void
    student: User & Student | undefined
    setStudent: (student: User & Student | undefined) => void
}

const SessionContext = createContext<SesssionContextType | undefined>(undefined);

interface SessionContextProps {
    children: ReactNode
}

const SessionProvider: FC<SessionContextProps> = ({ children }) => {

    const login = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;
        const loginUrl = `${baseUrl}/api/login/student`
        const loginData = {
            student_id: parseInt(process.env.NEXT_PUBLIC_USER_EMAIL!),
            password: process.env.NEXT_PUBLIC_USER_PASSWORD!
        };
        try {
            const response = await fetch(
                loginUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData),
                    cache: 'force-cache'
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            if (result.message !== 'Invalid Credentials')
                setSession(result as SessionType);
        } catch (error) {
            console.error('[context/SessionContext.tsx] There was a problem with your fetch operation:', error);
        }

    }

    const fetchStudentInfo = async () => { 
        if (session) {
            const baseUrl = process.env.NEXT_PUBLIC_BASEURL!
            const infoUrl = `${baseUrl}/api/student-info/base-info`;
            const url = `${infoUrl}?session_id=${session.session_id}`;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    cache: 'force-cache'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                if (result.message !== 'Invalid Credentials') {
                    setStudent(result as User & Student);
                    console.log("here");
                    console.log(result);
                }   
            } catch (error) {
                console.error('[context/SessionContext.tsx] There was a problem with your fetch operation:', error);
            }
        }
    }

    const [session, setSession] = useState<SessionType | undefined>(undefined); 
    const [student, setStudent] = useState<User & Student | undefined>(undefined);
    useEffect(() => {
        if (session === undefined) login();
    }, [])

    useEffect(() => { 
        if (student === undefined) fetchStudentInfo();
    }, [session])   
    
    return (
        <SessionContext.Provider value={{
            session,
            setSession,
            student, 
            setStudent
        }}>
            {children}
        </SessionContext.Provider>
    )
}

const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within an SessionProvider');
    }
    return context;
}

export { SessionProvider, useSession }