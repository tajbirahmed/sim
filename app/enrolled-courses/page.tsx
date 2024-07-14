"use client";
import React, { use, useEffect, useState } from 'react';
import { Course, NavData } from '@/constants/course';
import NavigateComp from '@/components/NavigateComp';
import { useSession } from '@/contexts/SessionContext';
import { useSemester } from '@/contexts/SemesterContexts';
import { useRouter } from 'next/navigation';




const Page = () => {

	const router = useRouter(); 

	const [courses, setCourses] = useState<Course[]>([]); 
	const [asId, setAsId] = useState<number | undefined>(undefined);
	const {
		student
	} = useSession(); 

	const createQueryString = (name : string, value : number) => {
		const params = new URLSearchParams();
		params.set(name, value.toString());

		return params.toString();
	};

	function changeMiddleDigits(number: number, middleDigits: number): number {
		const numberStr = number.toString();

		if (numberStr.length !== 8) {
			throw new Error("The number must be 8 digits long.");
		}

		const firstPart = numberStr.slice(0, 4);
		const lastPart = numberStr.slice(6);

		const newNumberStr = firstPart + middleDigits.toString().padStart(2, '0') + lastPart;

		return parseInt(newNumberStr, 10);
	}

	const getCourses = async () => { 
		if (asId) {
			try {
				const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;
				const courseUrl = `${baseUrl}/api/student-info/course-semester?academic_session_id=${20170101}`; // asId
				const response = await fetch(
					courseUrl, {
						method: 'GET',
						headers: {
							'Content-Type': 'application'
						}, 
						cache: 'force-cache'
					}
				);
				const result = await response.json();
				setCourses(result as Course[]); 
				console.log(result);
			} catch (error) {
				console.log("[enrolled-courses/page.tsx] error fetching courses", error);
			}
			
		} else { 
			console.log("[enrolled-courses/page.tsx] academic_session_id not found");
		}		
	}

	const {
		semester
	} = useSemester(); 

	useEffect(() => {
		if (student) { 
			setAsId(student.academic_session_id);
			// console.log(student.academic_session_id);
		}
	}, [student])

	useEffect(() => { 
		if (student) {
			setAsId(changeMiddleDigits(student.academic_session_id, semester));
			// getCourses();
			// console.log(changeMiddleDigits(student.academic_session_id, semester));
		}
		
	}, [semester])

	useEffect(() => { 
		if (asId) {
			getCourses();
		}
	}, [asId])

	return (
		<div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
			<NavigateComp
				title="Courses"
			// make={true}
			/>
			<div className="grid grid-cols-3 grid-flow-row gap-x-5 mt-10">
				{courses.map((course, index) => (
					<button key={index} className="bg-white rounded-lg shadow-md flex flex-col dark:bg-black" onClick={() => {
						router.push(`/enrolled-courses/${course.course_id}?${createQueryString("academic_session_id", asId!)}`)}}>
						<div className="bg-black dark:bg-gray-500 text-white rounded-t-lg flex flex-col items-start px-5 py-3">
							<p className="text-lg font-bold text-start">{course.course_title}</p>
							<p className='font-semibold text-gray-300 dark:text-white'>{course.first_name + " " + course.last_name }</p>
						</div>
						<div className="pt-5 flex flex-col items-start px-5 py-2 dark:bg-black">
							<p><strong>Course Code:</strong> {course.course_code}</p>
							<p><strong>Course Credit:</strong> {course.credit}</p>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default Page;
