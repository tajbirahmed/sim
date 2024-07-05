import React from 'react';
import { NavData } from '@/constants/course';
import NavigateComp from '@/components/NavigateComp';


const Page = () => {
  return (
    <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
      <NavigateComp
        title="Courses"
        // make={true}
      />
    <div className="p-4 mb-64 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {NavData.map((course, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md">
          <div className="bg-black text-white py-4 px-6 rounded-t-lg">
            <h2 className="text-lg font-bold">{course.title}</h2>
            <p>{course.tName}</p>
          </div>
          <div className="p-6 py-20">
            <p><strong>Course ID:</strong> {course.course_id}</p>
            <p><strong>Course Credit:</strong> {course.course_credit}</p>
          </div>
        </div>
      ))}
      </div>
      </div>
  );
};

export default Page;
