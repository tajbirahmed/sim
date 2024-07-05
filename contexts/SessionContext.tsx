"use client";
import { SessionType } from "@/types/SessionType";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface SesssionContextType {
    session: SessionType | undefined,
    setSession: (session: SessionType | undefined) => void
}

const SessionContext = createContext<SesssionContextType | undefined>(undefined);

interface SessionContextProps {
    children: ReactNode
}

const SessionProvider: FC<SessionContextProps> = ({ children }) => {

    const login = async () => {
        const loginUrl = 'http://bike-csecu.com:5000/api/login'
        const loginData = {
            email: process.env.NEXT_PUBLIC_USER_EMAIL!,
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

    const [session, setSession] = useState<SessionType | undefined>(undefined); 
    useEffect(() => {
        if (session === undefined ) login();
    }, [])


    
    return (
        <SessionContext.Provider value={{
            session,
            setSession
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