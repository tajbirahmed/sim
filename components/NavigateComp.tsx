import { ChevronRight, Home, Settings } from 'lucide-react'
import React, { useContext } from 'react'
import SettingPopOver from './SemesterComponents/SettingsDialog';
import { SemesterContext } from '@/contexts/SemesterContexts';
import { CreateAnnouncement } from './SemesterComponents/CreateAnnouncement';

interface NavigateProps {
  title?: string | undefined;
  make?: boolean | undefined;
}

const NavigateComp = ({
  title,
  make
}: NavigateProps) => {
  const helper = (str: string): string => {
    return str.charAt(0).toUpperCase() + (str.length > 1 ? str.slice(1).toLowerCase() : '');
  }
  const { semester } = useContext(SemesterContext)!
  return (
    <div className='flex flex-row space-x-1 items-center justify-between'>
      <div className='flex flex-row space-x-1 items-center' >
        <Home size={15} className="text-black dark:text-white self-center" />
        <ChevronRight size={14} className="text-black dark:text-white pt-[1px]" />
        <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium'>Student</p>
        <ChevronRight size={14} className="text-black dark:text-white pt-[1px]" />
        <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium w-auto'>
          {semester}<sup>{semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"}</sup> {" Semester"}
        </p>
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
      </div>
    </div>
  )
}

export default NavigateComp