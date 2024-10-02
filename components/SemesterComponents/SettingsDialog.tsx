"use client"; 

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Settings } from "lucide-react"
import { semesterData } from "./_semesterWithValue"
import { useContext, useEffect, useState } from "react"
import { SemesterContext, useSemester } from "@/contexts/SemesterContexts"
import { useSessionStore } from "@/store/SessionStore";

type StudentProgram = {
    academic_session_id: number;
    session: string;
    semester: number;
    program_id: number;
    program_name: string;
    program_abbr: string;
    student_program_id: number;
    student_program_start_date: string;
    student_program_end_date: string;
    student_program_type: string;
};


export default function SettingPopOver() { 
    const {
        semester,
        setSemester
    } = useSemester(); 

    const student = useSessionStore((state) => state.student);

    const [semesters, setSemesters] = useState<StudentProgram[]>([])

    const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;

    // needs checking
    const getSemester = async () => {
        if (student) {
            const academic_session_id = student.academic_session_id
            const historyUrl = `${baseUrl}/api/student-info/history?academic_session_id=${academic_session_id}`;
            const response = await fetch(
                historyUrl, {
                method: 'GET',
                cache: 'force-cache'
            });
            const data = await response.json();
            setSemesters(data as StudentProgram[]);
            console.log(data); 
        } else { 
            console.log("[SettingDialog.tsx] Student not found");
        }
    }

    useEffect(() => {
        getSemester();
    }, [student])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link" className="hover:bg-slate-200 hover:rounded-xl dark:hover:bg-slate-800">
                    <Settings size={18} className='text-black dark:text-white pt-[2px]' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 self-end">
                <Card className="w-[250px]">
                    <CardHeader>
                        <CardTitle>Select Semester</CardTitle>
                        {/* <CardDescription>Select your semester to see semister specific announcement</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={semester.toString()}
                            onValueChange={e => setSemester(parseInt(e)) }
                        >   
                            <SelectTrigger id="semester">
                                <SelectValue placeholder="Select semester"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {semesters.map((val, ind) => (
                                    <SelectItem key={ ind } value={val.semester.toString()}>{ val.semester} </SelectItem>
                                ))}                                
                            </SelectContent>
                        </Select>
                    </CardContent>
                    {/* <CardFooter className="flex justify-end">
                        <Button>
                            Done
                        </Button>
                    </CardFooter> */}
                </Card>
            </PopoverContent>
        </Popover>
    )
}