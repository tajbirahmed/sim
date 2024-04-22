import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 1. Papon is responsible for come up with good colors



const ProfileComp = () => {
  return (
    <div className='flex flex-row space-x-3 w-full mt-2 p-2 mb-1 bg-slate-100 rounded-md'>
      <div className='w-10 h-10 rounded-lg'>
        <Avatar className={'rounded-lg'}>
          <AvatarImage src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp" alt="@shadcn" />
          <AvatarFallback className={'rounded-lg text-[#0c4c6c] dark:text-white'}>PP</AvatarFallback>
        </Avatar >
      </div>
      <div className='w-full'>
        <h2 className='text-[#0c4c6c] font-semibold text-[18px] dark:text-white'>
          Tajbir Ahmed
        </h2>
        <h4 className='text-[16px] dark:text-white'>
          Student
        </h4>
      </div>
    </div>
  )
}

export default ProfileComp