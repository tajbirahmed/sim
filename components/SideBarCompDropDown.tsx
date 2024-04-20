import React from 'react'

import { Home, LayoutGrid, Table2 } from 'lucide-react';
import Link from 'next/link';

interface SideBarProps {
  title: string,
  selected: string,
  setSelected: (selected: string) => void
}


const SideBarCompDropDown = ({ title, selected, setSelected }: SideBarProps) => {
  const handleClick = () => {
    setSelected(title);
  }
  return (
    <Link
      href={title === 'Home' ? "/" :
        title === 'Semester' ? "/semester" :
          title === 'Course' ? "/course" :
            title === "Dashboard" ? "/dashboard" :
              title === 'Result' ? "/result" :
                "/"}
      className={`flex flex-row space-x-3 mx-4 mt-2 p-2 ${selected === title && "bg-slate-100 rounded-xl text-blue-600"}
         hover:bg-slate-100 rounded-xl`}
      onClick={() => handleClick()}
    >
      {title === 'Home' ? <Home size={18} className='mt-[4px]' /> :
        title === 'Dashboard' ? <LayoutGrid size={18} className='mt-[4px]' /> :
          (
            <Table2 size={18} className='mt-[4px]' />
          )}
      <div>
        <h3 className='font-semibold text-[18px]'>{title}</h3>
      </div>
    </Link>
  )
}

export default SideBarCompDropDown;