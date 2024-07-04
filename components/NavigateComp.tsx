"use client";
import { ChevronRight, Home, Settings } from 'lucide-react'
import React, { useContext } from 'react'
import SettingPopOver from './SemesterComponents/SettingsDialog';
import {  useSemester } from '@/contexts/SemesterContexts';
import { CreateAnnouncement } from './SemesterComponents/CreateAnnouncement';
import { ModeToggle } from './DarkModeToggle';

interface NavigateProps {
  title?: string | undefined;
  make?: boolean | undefined;
  dashboard?: boolean;
  profile?: boolean;
}

const NavigateComp = ({
  title,
  make, 
  dashboard
}: NavigateProps) => {
  const helper = (str: string): string => {
    return str.charAt(0).toUpperCase() + (str.length > 1 ? str.slice(1).toLowerCase() : '');
  }
  const {
    semester,
    setSemester
  } = useSemester(); 
  return (
    <div className='flex flex-row space-x-1 items-center justify-between'>
      <div className='flex flex-row space-x-1 items-center' >
        <Home size={15} className="text-black dark:text-white self-center" />
        <ChevronRight size={14} className="text-black dark:text-white pt-[1px]" />
        <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium'>Student</p>
        
        {dashboard === undefined
          ?
          (
            <>
              <ChevronRight size={14} className="text-black dark:text-white pt-[1px]" />
              <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium w-auto'>
              {semester}<sup>{semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"}</sup> {" Semester"}
              </p>
            </>
          )
          :
          (
            null
          )
        }
        {title && (
          <>
            <ChevronRight size={14} className="text-black dark:text-white pt-[2px]" />
            <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium'>{helper(title)}</p>
          </>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        {make ? <CreateAnnouncement /> : null}
        <SettingPopOver />
        <ModeToggle />
      </div>
    </div>
  )
}

export default NavigateComp