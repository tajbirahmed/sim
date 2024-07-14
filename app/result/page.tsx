"use client";

import { ResultCard } from '@/components/ResultComponents/ResultCard';
import { SemesterContext } from '@/contexts/SemesterContexts';
import React, { useContext } from 'react'


const ResultHome = () => {
  const { semester } = useContext(SemesterContext)!
  return (
    <div className="flex flex-row justify-center w-full pt-2">
      <ResultCard 
      />
    </div>
  )
}

export default ResultHome;