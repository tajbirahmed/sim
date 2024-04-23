"use client"; 


import React, { createContext, useState } from 'react';
interface Semester {
  semester: number;
  setSemester: (semester: number) => void
}

export const SemesterContext = createContext<Semester | undefined>(undefined)



export const SemesterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [semester, setSemester] = useState(2)
  return (
    <SemesterContext.Provider value= {{ semester, setSemester }}>
      { children }
    </SemesterContext.Provider>
  );
}