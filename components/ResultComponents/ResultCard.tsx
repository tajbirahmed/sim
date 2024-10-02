"use client";
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dummyResults } from "./DummyResults"; // Adjust the import path
import { ResultDataType } from "@/types/ResultTypes";
import { useSemester } from "@/contexts/SemesterContexts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/SessionStore";
import { Download, DownloadIcon, Loader2 } from "lucide-react";
import { generateResultPdf } from "@/util/generatePdf";




export function ResultCard() {

    const [pubdate, setpubDate] = React.useState<Date>(new Date());
    const [resultData, setResultData] = React.useState<ResultDataType[] | undefined>(undefined)

    const {
        semester
    } = useSemester();

    const student = useSessionStore(state => state.student);
    const [loading, setLoading] = React.useState<boolean>(false);

    const router = useRouter(); 

    function getGrade(gpa: number): string {
        if (gpa === 4.00) {
            return "A+";
        } else if (gpa >= 3.75) {
            return "A";
        } else if (gpa >= 3.5) {
            return "A-";
        } else if (gpa >= 3.25) {
            return "B+";
        } else if (gpa >= 3.0) {
            return "B";
        } else if (gpa >= 2.75) {
            return "B-";
        } else if (gpa >= 2.5) {
            return "C+";
        } else if (gpa >= 2.25) {
            return "C";
        } else if (gpa >= 2.0) {
            return "D";
        } else {
            return "F";
        }
    }


    const getResult = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;

        if (student) {
            const {
                academic_session_id,
                student_id
            } = student;

            const resultUrl = `${baseUrl}/api/student-info/result?academic_session_id=${academic_session_id}&student_id=${student_id}`;
            try {
                const response = await fetch(resultUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: 'force-cache'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setResultData(result as ResultDataType[]);
                console.log(result);
            } catch (error) {
                console.error('[components/ResultComponents/ResultCard.tsx] There was a problem with your fetch operation:', error);
            }
        } else {
            console.error('[components/ResultComponents/ResultCard.tsx] Student is undefined');
        }


    }

    const downloadPdf = async () => {
        setTimeout(() => {
            setLoading(true);
            generateResultPdf(); 
        }, 1000);
        setLoading(false);
    }

    React.useEffect(() => {

        getResult();

    }, [student])

    return (
        <Card className="w-auto justify-center mt-20">
            {resultData
                ?
                (
                    <div>
                        <CardHeader >
                            <CardTitle className="text-center">{semester}<sup className="">{semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"}</sup>{" Semester"} Result</CardTitle>
                            <CardDescription className="text-lg">Published Date: {format(pubdate, "PPP")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="">
                                        <TableHead className="font-bold text-center">Course Code</TableHead>
                                        <TableHead className="min-w-[280px] font-bold text-center">Course Title</TableHead>
                                        <TableHead className="font-bold text-center">Credits</TableHead>
                                        <TableHead className="text-center ">Letter Grade</TableHead>
                                        <TableHead className="text-center ">Grade Point</TableHead>
                                        <TableHead className="text-center">Credit Points</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {resultData.map((val, index) => (
                                        // <Link href={`/course/${val.course_id}`} passHref key={index}>
                                        <TableRow className="" key={index} onClick={() => { 
                                            router.push(`/result/${val.course_id}`);
                                        }} >
                                                <TableCell className="text-center uppercase">{val.course_code}</TableCell>
                                                <TableCell className="capitalize">{val.course_title}</TableCell>
                                                <TableCell className="text-center">{val.credit}</TableCell>
                                                <TableCell className="text-center ">{getGrade(val.gpa)}</TableCell>
                                                <TableCell className="text-center ">{val.gpa}</TableCell>
                                                <TableCell className="text-center ">{val.gpa * val.credit}</TableCell>
                                            </TableRow>
                                        // </Link>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                onClick={() => {
                                    downloadPdf();
                                }}
                            >
                                <div className="w-full h-full flex flex-row gap-2">
                                    {loading ? <Loader2 className="text-white animate-spin" size={20} />
                                    : <DownloadIcon className="text-white" size={20} />}
                                    {loading? "Downloading..." : "Download"}
                                </div>
                            </Button>
                        </CardFooter>
                    </div>
                )
                :
                (
                    <p className="text-lg text-center font-bold">Failed Getting Data</p>
                )
            }

        </Card>
    )
}