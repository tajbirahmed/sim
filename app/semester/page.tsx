"use client";
import React, { useState } from 'react'
import { CalendarComp } from '@/components/SemesterComponents/CalendarComp';
import ReminderComponent from '@/components/SemesterComponents/ReminderComponent';
import NavigateComp from '@/components/NavigateComp';



const Semester = () => {
	const [date, setDate] = useState<Date | undefined>(undefined)

	return (
		<div className='flex flex-col ml-10 h-[94vh] overflow-y-auto w-11/12 no-scrollbar pt-6'>
			<NavigateComp
				title="Announcements"
				make={true}
			/>
			<div className='flex flex-col space-y-5 pt-2 w-full '>
				<div className='flex flex-row justify-between pr-1'>
					<h1 className='font-bold text-[32px] text-slate-700 hover:text-slate-600 dark:text-white'>Announcements</h1>
					<p className='font-semibold text-[16px] self-center'>{date && `${date.toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}`}
					</p>
					<div className='flex flex-row items-center justify-center w-36'>
						<CalendarComp
							date={date}
							setDate={setDate}
						/>
					</div>
				</div>
				<div className='flex flex-row space-x-6 w-full'>

					<ReminderComponent />
					
				</div>
			</div>

		</div>
	)
}

export default Semester;