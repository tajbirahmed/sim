"use client"; 

import { useSessionStore } from '@/store/SessionStore';
import React, { createContext, useEffect, useState } from 'react';

interface Semester {
  semester: number;
  setSemester: (semester: number) => void
}

export const SemesterContext = createContext<Semester | undefined>(undefined)



export const SemesterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  function getMiddleDigits(number: number): number {
    const numberStr = number.toString();

    if (numberStr.length !== 8) {
      throw new Error("The number must be 8 digits long.");
    }

    const middleDigitsStr = numberStr.slice(4, 6);

    return parseInt(middleDigitsStr, 10);
  }

  const [semester, setSemester] = useState(1); 
  
  const student = useSessionStore((state) => state.student);

  useEffect(() => {
    if (student) {
      setSemester(getMiddleDigits(student.academic_session_id));
    }
  }, [student]);

  return (
    <SemesterContext.Provider value= {{ semester, setSemester }}>
      { children }
    </SemesterContext.Provider>
  );
}

export const useSemester = () => { 
  const context = React.useContext(SemesterContext)
  if (context === undefined) {
    throw new Error('useSemester must be used within a SemesterProvider')
  }
  return context; 
}