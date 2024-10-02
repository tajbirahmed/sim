"use client";
import React, { use, useEffect, useState } from 'react';
import { Course, NavData } from '@/constants/course';
import NavigateComp from '@/components/NavigateComp';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/SessionStore';
import { useCourseSemester } from '@/store/CourseSemester';
import { getCoursesForSemester } from '@/util/getCoursesForSemester';
import { LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/LoadingScreen';
import { getCourseById } from '@/util/getCourseWithId';




const Page = () => {

	const router = useRouter();



	const student = useSessionStore((state) => state.student);
	const courses = useCourseSemester((state) => state.courses);


	useEffect(() => {
		if (student) {
			getCoursesForSemester(student.academic_session_id);
		}
	}, [student])

	if (courses === undefined) {
		return <LoadingScreen />
	}


	return (
		<div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
			<NavigateComp
				title="Courses"
			// make={true}
			/>
			<h1 className='text-2xl text-black font-semibold mt-12'>
				Enrolled Courses
			</h1>
			<div className="flex flex-row flex-wrap gap-5 mt-10 w-full gap-y-12">
				{courses.map((course, index) => (
					<Button variant={"ghost"} key={index} className="bg-white rounded-lg shadow-md flex flex-col dark:bg-black w-[320px] h-[150px] p-0 items-start gap-2"
						onClick={() => { 
							// await getCourseById(course.course_id);
							router.push(`/enrolled-courses/${course.course_id}`)
						}}
					>
						<div className='flex flex-col items-center justify-center gap-2 w-full h-full'>
							<div className=" bg-gradient-to-tr from-[#586c7c] to-[#000000] dark:bg-gray-500 text-white rounded-t-lg flex flex-col gap-0 items-start w-full h-32 p-2">
								<p className="text-lg font-bold text-start text-wrap line-clamp-1 capitalize">{course.course_title}</p>
								<div className='flex flex-row justify-between w-full items-center'>
									<p className='text-muted font-normal text-wrap line-clamp-1 capitalize'>
										{course.teachers.map((teacher, index) => (
											<p key={index}>
												{teacher.designation} {teacher.title} {teacher.first_name} {teacher.last_name}
												{course.teachers.length - 1 !== index ? ', ' : ''}
											</p>
										))}
									</p>
									<div className='w-10 h-10 rounded-full border border-primary'>
										<Avatar>
											<AvatarImage src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-178-132169.png?f=webp&w=256" alt="@shadcn" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-2 self-start dark:bg-black py-4 w-full items-start px-2 bg-muted-foreground/5">
								<p>
									<strong className='text-black font-medium'>Course Code:</strong> {course.course_code}</p>
								<p><strong className='text-black font-medium'>Course Credit:</strong> {course.credit}</p>
							</div>
						</div>
					</Button>
				))}
			</div>
		</div>
	);
};



export default Page;
