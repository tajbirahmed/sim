"use client";

import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSession, getStudent, useSessionStore } from "@/store/SessionStore";
import { useSideBarStore } from "@/store/sidebarstore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(8).max(8),
    password: z.string(),
});

export default function Home() {
    const session = useSessionStore((state) => state.session);
    const setSession = useSessionStore((state) => state.setSession);
    const student = useSessionStore((state) => state.student);
    const setStudent = useSessionStore((state) => state.setStudent);
    const toggleSidebar = useSideBarStore((state) => state.toggleSideBar);

    const router = useRouter();
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    useEffect(() => {
        if (student && session) {
            toggleSidebar(true);
            router.push("/dashboard");
        }
    }, [student, session])

    const onLoginFormSubmit = async (data: z.infer<typeof loginSchema>) => {
        getSession(data.email, data.password)
            .then((session) => {
                if (session) {
                    setSession(session);
                    getStudent(session)
                        .then((student) => {
                            if (student) {
                                setStudent(student);
                                toggleSidebar(true);
                                router.push("/dashboard");
                            }
                        });
                }
            })
    }

    return (
        <div className={"w-full px-4 h-screen no-scrollbar flex" +
            " justify-center overflow-y-scroll" +
            " items-center"}>
            <div className={"flex flex-col w-full rounded-lg" +
                " max-w-80"}>
                <div className={"flex-col mb-16"}>
                    <h2 className={"text-4xl font-bold"}>{`Welcome back to `}
                        <span
                            className={" bg-gradient-to-br" +
                                " from-violet-400 to-indigo-900 bg-clip-text" +
                                " text-transparent"}>Student Information</span>
                    </h2>
                </div>
                {/*    form*/}
                <div className={"flex flex-col"}><Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
                        className={"space-y-3  w-full"}>
                        <FormField control={loginForm.control} name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl
                                    >
                                        <Input
                                            placeholder={"Student ID"} {...field} />
                                    </FormControl>
                                    <FormMessage className={"text-sm" +
                                        " font-normal"} />
                                </FormItem>
                            )}>
                        </FormField>
                        <div className={"flex flex-col gap-2"}>
                            <FormField control={loginForm.control}
                                name={"password"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl
                                        >
                                            <PasswordInput
                                                placeholder={"Password"}
                                                autoComplete="current-password" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage
                                            className={"text-sm font-normal"} />
                                    </FormItem>
                                )}>
                            </FormField>
                            <Link href={"/forgot-password"}
                                className={"active:underline text-right" +
                                    " text-foreground/60 text-sm" +
                                    " hover:underline"}>Forgot
                                password?</Link>
                        </div>
                        <div className={"w-full pt-4"}>
                            <Button type={"submit"} className={"w-full"}
                            >Login</Button>
                        </div>
                    </form>
                </Form>

                </div>
            </div>
        </div>
    );
}

