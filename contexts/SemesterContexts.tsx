"use client"; 

import React, { createContext, useEffect, useState } from 'react';

interface Semester {
  semester: number;
  setSemester: (semester: number) => void
}

export const SemesterContext = createContext<Semester | undefined>(undefined)



export const SemesterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [semester, setSemester] = useState(1); 
  
  

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