import { BadgeCheck } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

interface PageProps { 
  title: string, 
}
// 1.text size fix
// 2. any logo suggestions?
const SideBarComp = ({ title } : PageProps) => {
  return (
    <Link href="../result/resultid">
    <div className='p-2 m-2 hover:bg-slate-100 border-[1px] flex flex-row self-center rounded-lg min-w-[275px] '>
      
      <div className='pr-3 self-center'>
        <BadgeCheck size={16} strokeWidth={2}/>
      </div>
      <Link href="../result/resultid">
      <div className='self-center'>
        <p className='text-[16px] font-medium hover:font-semibold'>
          {title}
        </p>
      </div>
      </Link>
    </div>
    </Link>
  )
}

export default SideBarComp