import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProjectInfoComp = () => {
  return (
    <div className='flex flex-row space-x-3 mx-4 mt-2 p-2 mb-5'>
      <div className='w-10 h-10 rounded-lg'>
        <Avatar className={'rounded-lg'}>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback className={'rounded-lg text-[#0c4c6c]'}>SI</AvatarFallback>
        </Avatar >
      </div>
      <div className='w-full '>
        <h2 className='text-[#0c4c6c] font-semibold text-[2opx]'>
          Student Information
        </h2>
        <h4 className='text-[16px]'>
          University of Chittagong
        </h4>
      </div>
    </div>
  )
}

export default ProjectInfoComp