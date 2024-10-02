"use client";

import { LoadingScreen } from '@/components/LoadingScreen';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherType } from '@/constants/course';
import { useCourseSemester } from '@/store/CourseSemester';
import { useCourseStore } from '@/store/CourseStore';
import { getCourseById } from '@/util/getCourseWithId';
import { Info } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const CourseDetails = ({ params }: { params: { course_id: string } }) => {

    const {
        course_id
    } = params;



    const course = useCourseStore((state) => state.course);
    const courses = useCourseSemester((state) => state.courses);
    const courseDetails = courses?.find((course) => course.course_id === parseInt(course_id));

    useEffect(() => {
        if (course === undefined) {
            getCourseById(parseInt(course_id));
        }
        console.log(course);

    }, [])

    if (course === undefined) {
        return (<LoadingScreen />);
    }

    if (courses === undefined || courseDetails === undefined) {
        return toast.error('Error fetching course');
    }

    const getTotalMark = () => {
        return course.catm_mark + course.attendance_mark + course.total_paper_mark.reduce((acc, curr) => acc + curr.total_mark, 0);
    }

    return (
        <div className='w-full h-full flex flex-col gap-y-6 items-center ml-32'>
            <Header
                title={courseDetails.course_title}
                course_code={courseDetails.course_code}
                teachers={courseDetails.teachers}
            />
            <div className='flex flex-col w-full gap-y-4 mt-16'>
                <h1 className='text-black font-medium text-2xl'>
                    Instructor{courseDetails.teachers.length > 1 ? 's' : ''}
                </h1>
                <div className='flex flex-col w-full gap-y-3'>
                    {courseDetails.teachers.map((teacher, index) => (
                        <Badge
                            key={index}
                            variant={"outline"}
                            className='w-fit h-10 text-black flex flex-row items-center gap-2 py-2 shadow-xs shadow-black'
                        >
                            <div className='w-7 h-7 rounded-full border border-primary'>
                                <Avatar className='w-7 h-7 items-center justify-center rounded-full'>
                                    <AvatarImage src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-178-132169.png?f=webp&w=256" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <p className='font-medium text-base'>{teacher.designation} {teacher.title} {teacher.first_name} {teacher.last_name}</p>
                        </Badge>
                    ))}
                </div>
            </div>
            <div className='flex flex-row justify-between w-full items-start mt-12'>
                <Tabs className='self-start' defaultValue={"ct_mark"}>
                    <TabsList >
                        <TabsTrigger value={"ct_mark"}>
                            <div className='flex items-center justify-center'>
                                <p className='font-medium'>
                                    CT & Attendence Marks
                                </p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value={"total_mark"}>
                            <div className='flex items-center justify-center'>
                                <p className='font-medium'>
                                    Paper Marks
                                </p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"ct_mark"} className='mt-4'>
                        <Card className='shadow-black shadow-sm '>
                            <CardContent className='flex flex-col gap-y-2 w-full h-full pt-4'>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className='text-black text-base'>
                                        CT Mark:
                                    </p>
                                    <p className='text-black text-base'>
                                        {course.catm_mark.toFixed(2)}
                                    </p>

                                </div>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className='text-black text-base'>
                                        Attendence Mark:
                                    </p>
                                    <p className='text-black text-base'>
                                        {course.attendance_mark.toFixed(2)}
                                    </p>
                                </div>
                                <Separator />
                                <div className='flex flex-row justify-between'>
                                    <p className='text-black text-base'>
                                        Total Mark:
                                    </p>
                                    <p className='text-black text-base'>
                                        {(course.catm_mark + course.attendance_mark).toFixed(2)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value={"total_mark"} className='mt-4'>
                        <Card className='shadow-black shadow-sm '>
                            <CardContent className='flex flex-col gap-y-2 w-full h-full pt-4'>
                                {course.total_paper_mark.map((paper, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center'>
                                        <p className='text-black text-base'>
                                            Set {paper.set}
                                        </p>
                                        <p className='text-black text-base'>
                                            Mark: {paper.total_mark.toFixed(2)}
                                        </p>

                                    </div>
                                ))}
                                <Separator />
                                <div className='flex flex-row justify-between'>
                                    <p className='text-black text-base'>
                                        Total Mark:
                                    </p>
                                    <p className='text-black text-base'>
                                        {course.total_paper_mark.reduce((acc, curr) => acc + curr.total_mark, 0).toFixed(2)}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className='w-1/2'>
                    <Card className='shadow-sm shadow-black'>
                        <CardHeader>
                            <CardTitle>Obtained Marks</CardTitle>
                            <CardDescription>Check on the left side to view detailed marks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Obtained Marks: <p className='font-semibold text-black'>{getTotalMark()}</p></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const Header = ({
    title,
    course_code,
    teachers
}: {
    title: string;
    course_code: string;
    teachers: TeacherType[]
}) => {

    return (
        <div
            className='w-full items-center  mt-12  '
        >
            <div className='flex flex-col gap-2 border border-muted overflow-hidden rounded-xl'>
                <div className='h-[300px] bg-gradient-to-tr from-white to-gray-300 w-full' />
                <div className='-mt-32 ml-4 mb-4  flex flex-row justify-between items-center w w-full'>
                    <p className='text-inherit text-4xl font-semibold'>
                        {title}
                    </p>
                    {/* todo */}
                    <Info className='w-10 h-10 text-muted-foreground mr-12' />
                </div>
            </div>
        </div>
    )
}


export default CourseDetails;