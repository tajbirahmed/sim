"use client";

import { getSession, getStudent, useSessionStore } from "@/store/SessionStore";
import { useEffect } from "react";

export default function Home() {
    const session = useSessionStore((state) => state.session);
    const setSession = useSessionStore((state) => state.setSession);
    const student = useSessionStore((state) => state.student);
    const setStudent = useSessionStore((state) => state.setStudent);

    useEffect(() => {
        if (session === undefined) {
            getSession()
                .then((session) => {
                    if (session) {
                        setSession(session);
                        getStudent(session)
                            .then((student) => {
                                if (student) {
                                    setStudent(student);
                                }
                            });
                    }
                });
        } else {
            if (student === undefined) {
                getStudent(session)
                    .then((student) => {
                        if (student) {
                            setStudent(student);
                        }
                    });
            }
        }
        console.log(session);
        console.log(student);
    }, [session, student])
    return (
        <div className="flex justify-center min-h-screen ">
            Student information Management
        </div>
    );
}

