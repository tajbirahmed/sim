import { ChevronRight, Home, Settings } from 'lucide-react'
import React from 'react'
import SettingPopOver from './SemesterComponents/SettingsDialog';

interface NavigateProps { 
    title?: string[] | undefined, 
}

const NavigateComp = ({
    title
}: NavigateProps) => {
    const helper = (str : string) : string => { 
        return str.charAt(0).toUpperCase() + (str.length > 1 ? str.slice(1).toLowerCase() : '');
    }
  return (
      <div className='flex flex-row space-x-1 items-center justify-between'>
          <div className='flex flex-row space-x-1 items-center' >
            <Home size={15} className="text-black dark:text-white self-center" /> 
            <ChevronRight size={14} className="text-black dark:text-white pt-[1px]" />
            <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium'>Student</p>
            {title ?
                title.map((val, ind) => ( 
                    <>
                        <ChevronRight size={14} className="text-black dark:text-white pt-[2px]" />
                        <p className='text-black dark:text-white text-[15px] pt-[2px] font-medium'>{helper(val)}</p>
                    </>
                ))
                  : null}
          </div>
          <SettingPopOver />
    </div>
  )
}

export default NavigateComp