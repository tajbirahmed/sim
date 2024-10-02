"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { ResultDataType } from "@/types/ResultTypes";
import { useSemester } from "@/contexts/SemesterContexts";
import { useSession } from "@/contexts/SessionContext";
import { generate_pdf } from "./generatePDF"; // Import the generate_pdf function
import { Student } from "@/types/StundentType"; // Ensure the correct path

export function ResultCard() {
    const [pubdate, setPubDate] = React.useState<Date>(new Date());
    const [resultData, setResultData] = React.useState<ResultDataType[] | undefined>(undefined);
    const [studentData, setStudentData] = React.useState<Student | undefined>(undefined); // Set as a single student

    const { semester } = useSemester();
    const { student } = useSession();

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
            const { academic_session_id, student_id } = student;

            const resultUrl = `${baseUrl}/api/student-info/result?academic_session_id=${academic_session_id}&student_id=${student_id}`;
            try {
                const response = await fetch(resultUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setResultData(result as ResultDataType[]);
                setStudentData(student); // Set the student data here
                console.log(result);
            } catch (error) {
                console.error('[components/ResultComponents/ResultCard.tsx] There was a problem with your fetch operation:', error);
            }
        } else {
            console.error('[components/ResultComponents/ResultCard.tsx] Student is undefined');
        }
    };

    React.useEffect(() => {
        getResult();
    }, [student]);

    return (
        <Card className="w-auto justify-center mt-20">
            {resultData && studentData ? (
                <div>
                    <CardHeader>
                        <CardTitle className="text-center">
                            {semester}
                            <sup>
                                {semester === 1
                                    ? 'st'
                                    : semester === 2
                                    ? 'nd'
                                    : semester === 3
                                    ? 'rd'
                                    : 'th'}
                            </sup>{' '}
                            Semester Result
                        </CardTitle>
                        <CardDescription className="text-lg">
                            Published Date: {format(pubdate, 'PPP')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold text-center">Course Code</TableHead>
                                    <TableHead className="min-w-[280px] font-bold text-center">Course Title</TableHead>
                                    <TableHead className="font-bold text-center">Credits</TableHead>
                                    <TableHead className="text-center">Letter Grade</TableHead>
                                    <TableHead className="text-center">Grade Point</TableHead>
                                    <TableHead className="text-center">Credit Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {resultData.map((val, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{val.course_code}</TableCell>
                                        <TableCell>{val.course_title}</TableCell>
                                        <TableCell className="text-center">{val.credit}</TableCell>
                                        <TableCell className="text-center">{getGrade(val.gpa)}</TableCell>
                                        <TableCell className="text-center">{val.gpa}</TableCell>
                                        <TableCell className="text-center">{val.gpa * val.credit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={() => generate_pdf(resultData, studentData, semester)}>Download</Button>
                    </CardFooter>
                </div>
            ) : (
                <p className="text-lg text-center font-bold">Failed Getting Data</p>
            )}
        </Card>
    );
}
