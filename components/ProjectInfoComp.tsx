import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 1. Papon is responsible for come up with good colors


const ProjectInfoComp = () => {
  return (
    <div className='flex flex-row space-x-3 mx-4 mt-2 p-2 mb-5'>
      <div className='w-10 h-10 rounded-lg'>
        <Avatar className={'rounded-lg'}>
          {/* add logo of the project */}
          <AvatarImage src="" alt="@shadcn" /> 
          <AvatarFallback className={'rounded-lg text-[#0c4c6c] dark:text-white'}>SI</AvatarFallback>
        </Avatar >
      </div>
      <div className='w-full '>
        <h2 className='text-[#0c4c6c] font-semibold text-[20px] dark:text-white'>
          Student Information
        </h2>
        <h4 className='text-[16px] dark:text-white'>
          University of Chittagong
        </h4>
      </div>
    </div>
  )
}

export default ProjectInfoComp