import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 1. Papon is responsible for come up with good colors


const ProjectInfoComp = () => {
  return (
    <div className='flex flex-row space-x-3 mx-4 mt-2 p-2 mb-3'>
      <div className='w-8 h-8 rounded-lg'>
        <Avatar className={'rounded-lg'}>
          {/* add logo of the project */}
          <AvatarImage src="" alt="@shadcn" /> 
          <AvatarFallback className={'rounded-lg text-[#0c4c6c] dark:text-white'}>SI</AvatarFallback>
        </Avatar >
      </div>
      <div className='w-full flex flex-col pt-[2px]'>
        <h2 className='text-[#0c4c6c] font-semibold text-[16px] dark:text-white'>
          Student Information
        </h2>
        <h4 className='text-[14px] dark:text-white'>
          University of Chittagong
        </h4>
      </div>
    </div>
  )
}

export default ProjectInfoComp