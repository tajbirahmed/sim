import { School } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface PageProps { 
  title: string, 
}
// 1.text size fix
// 2. any logo suggestions?
const SideBarComp = ({ title } : PageProps) => {
  return (
    <div className='p-2 m-2 hover:bg-slate-100 border-[1px] flex flex-row self-center rounded-lg min-w-[275px] '>
      <Link href="/">
        <div className='pr-3 self-center'>
          <School size={16} strokeWidth={2}/>
        </div>
      </Link>
      <Link href="/">
        <div className='self-center'>
          <p className='text-[16px] font-medium hover:font-semibold'>
            {title}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default SideBarComp