import React from 'react';
import { NavData } from '@/constants/course';

const EnrolledCourses = ({
  children
}: Readonly<{
  children : React.ReactNode
}>
) => {
  return (
    <div className="flex flex-row w-9/12">
      {children}
    </div>
  );
    
};

export default EnrolledCourses;
