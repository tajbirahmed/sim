"use client";

import { Button } from '@/components/ui/button';
import { useSession } from '@/contexts/SessionContext';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

interface ExamDetails {
    exam_id: number;
    course_id: number;
    student_id: number;
    ct_mark: number;
    attendance_mark: number;
    course_code: string;
    course_title: string;
    credit: number;
    course_type: string;
    exam_minutes: number;
    set: "A" | "B";
    paper_code: number;
    total_mark: number;
}

const CourseResultDetails = () => {

    const router = useRouter();

    const {
        course_id
    } = useParams<{
        course_id: string
    }>();

    const {
        student
    } = useSession();

    const [courseResult, setCourseResult] = useState<ExamDetails[]>([])

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

    const getCourseSpecificResult = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;

        if (student) {
            const catmUrl = `${baseUrl}/api/student-info/catm-marks?student_id${student.student_id}&course_id=${course_id}`;
            try {
                const res = await fetch(catmUrl, {
                    method: 'GET',
                    cache: 'force-cache'
                });
                const resutl = await res.json();
                // console.log(resutl);
                setCourseResult(resutl as ExamDetails[]);
            } catch (error) {
                console.log("[course_id]/page.tsx", error);
            }
        } else {
            console.log("student not found");
        }
    }


    useEffect(() => {
        getCourseSpecificResult();
    }, [student])

    return (
        <div className='flex flex-col space-y-10 mt-10'>
            {courseResult.length > 0 ? (
                <div className='flex flex-col space-y-10'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <p className='text-xl font-bold'>Course Title: {courseResult[0].course_title}</p>
                        <p className='text-lg font-semibold'>Course Code: {courseResult[0].course_code}</p>
                        <p className='text-lg font-semibold'>Course Credit: {courseResult[0].credit}</p>
                        <p className='text-lg font-semibold'>Course Type: {courseResult[0].course_type}</p>
                    </div>
                    <div className='flex flex-row justify-around space-y-1'>
                        <div className='flex flex-col spacey-4 w-52'>
                            <div className='flex flex-row justify-between'>
                                <p className='font-medium'>CT Marks: </p>
                                <p>{courseResult[0].ct_mark} </p>

                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className='font-medium'>Attendence Marks: </p>
                                <p>{courseResult[0].attendance_mark} </p>
                            </div>
                            <div className='bg-black dark:bg-white h-[2px]' />
                            <div className='flex flex-row justify-between'>
                                <p className='font-medium'>Total: </p>
                                <p>{courseResult[0].attendance_mark + courseResult[0].ct_mark} </p>
                            </div>
                        </div>
                        {courseResult[0].course_type === "Theory" ? (
                            <div className='flex flex-col items-center w-52'>
                                {courseResult.map((val, ind) => (
                                    <div className='flex flex-row justify-between w-full'>
                                        <p className='font-medium'>Set {val.set}</p>
                                        <p className='font-medium'>{val.total_mark}</p>
                                    </div>
                                ))}
                                <div className='bg-black dark:bg-white h-[2px] w-full' />
                                <div className='flex flex-row justify-between w-full'>
                                    <p className='font-medium'>Total: </p>
                                    <p className='font-medium'>{courseResult[0].total_mark + courseResult[1].total_mark}</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-row justify-between items-center w-40'>
                                <p className='font-medium'>Marks</p>
                                <p className='font-medium'>{courseResult[0].total_mark}</p>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-row justify-around w-9/12 self-center'> 
                        <div className='flex flex-row justify-between w-40 '>
                            <p className='font-medium text-lg'>Total Marks:</p>
                            <p className='font-medium text-lg'>{courseResult[0].attendance_mark +
                                courseResult[0].ct_mark +
                                courseResult[0].total_mark + 
                                (courseResult[0].course_type === "Theory" ? courseResult[1].total_mark : 0)
                            }</p>
                        </div>
                        <div className='flex flex-row justify-between w-40 '>
                            <p className='font-medium text-lg'>Obtained Grade:</p>
                            <p className='font-semibold text-lg'>
                                {getGrade(courseResult[0].attendance_mark +
                                    courseResult[0].ct_mark +
                                    courseResult[0].total_mark +
                                    (courseResult[0].course_type === "Theory" ? courseResult[1].total_mark : 0))}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className='w-40 text-center self-center' onClick={() => router.back()}>
                        Go Back
                    </Button>
                </div>
            ) : (<p>loading...</p>)}

        </div>
    )
}

export default CourseResultDetails