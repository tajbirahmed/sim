"use client";
import { Plus } from 'lucide-react';
import React from 'react'
import { Button } from "@/components/ui/button"
import { CalendarComp } from '@/components/SemesterComponents/CalendarComp';
import ProcedureProgess from '@/components/testComponets/ProcedureProgess';


const Semester = () => {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className='flex flex-col ml-5 mt-5 space-y-10'>
      {/* <ProcedureProgess /> */}
      <div className='pt-10'>

      </div>
      <div className='flex flex-col space-y-5'>
        <h1 className='font-bold text-[36px] text-slate-700 hover:text-slate-600'>Calendar</h1>
        <div className='flex flex-row space-x-6'>
          <div className='flex flex-row items-center justify-center'>
            <CalendarComp
              date={date}
              setDate={ setDate}
            />
          </div>
          <div className='flex flex-col space-y-2'> 
            <p className='font-medium text-[22px]'>Reminders of {date?.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
            <div>
              Reminders will appear here...
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col space-y-5'>
        <h1 className='font-bold text-[36px] text-slate-700 hover:text-slate-600'>Announcements</h1>
        <div className='flex flex-row space-x-4'>
          <div className='mt-5'>
            <Button variant="outline" className='flex flex-row space-x-1'>
              <Plus size={22} /> 
              <p>Make an Announcement</p>
            </Button>
          </div>
          <div>
            <p>Smester wise annoucment will appear here</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col space-y-5'>
        <h1 className='font-bold text-[36px] text-slate-700 hover:text-slate-600'>
          Important Notices
        </h1>
        
      </div>

    </div>
  )
}

export default Semester;