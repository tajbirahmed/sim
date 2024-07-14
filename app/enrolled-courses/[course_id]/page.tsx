"use client"; 
import { Course } from '@/constants/course';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CourseDetails = () => {
  
    const {
        course_id
    } = useParams();

    const [course, setCourse] = useState<Course[]>([])

    const academic_session_id = useSearchParams().get("academic_session_id")

    const getCourse = async () => { 
        if (academic_session_id && typeof course_id === 'string') {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;
                const c_id = Number(course_id); 
                const as_id = Number(academic_session_id); 
                const courseUrl = `${baseUrl}/api/student-info/course-semester?academic_session_id=${20170101}&course_id=${c_id}`; // asId
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
                setCourse(result as Course[]);
                console.log(result);
            } catch (error) {
                console.log("[enrolled-courses/page.tsx] error fetching courses", error);
            }

        } else {
            console.log("[enrolled-courses/page.tsx] academic_session_id not found");
        }
    }

    useEffect(() => {
        getCourse(); 
        console.log(course);
        
    }, [academic_session_id, course_id]);
  
    return (
        <div>
            {course.length > 0 ? (
                <div>
                    <h2>{course[0].course_code}</h2>
                    <p>{course[0].course_type}</p>
                    {/* Add more course details here */}
                </div>
            ) : (
                <p>Loading course details...</p>
            )}
        </div>
    );
}

export default CourseDetails