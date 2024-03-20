import { Home, Table2, LayoutGrid, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface SideBarProps { 
  title: string, 
  selected: string, 
  setSelected: (selected: string) => void
}

const SideBarComp = ({ title, selected, setSelected }: SideBarProps) => {
  const handleClick = () => {
    setSelected(title);
  }
  return (
    <div className='flex flex-col space-y-1'>
      <Link
        href={title === 'Home' ? "/" :
              title === 'Semester' ? "/semester" :
              title === 'Course' ? "/course" : 
              title === "Dashboard" ? "/dashboard" : 
              title === 'Result' ? "/result" : 
              "/"}
        className={`flex flex-row justify-between  mx-4 mt-2 p-2 ${selected === title && "bg-slate-100 rounded-xl text-blue-600"}
          hover:bg-slate-100 rounded-xl`}
        onClick={() => handleClick()}
      >
        <div className='flex flex-row space-x-3'>
          {title === 'Home' ? <Home size={18} className='mt-[4px]' /> :
            title === 'Dashboard' ? <LayoutGrid size={18} className='mt-[4px]' /> : 
            (
            <Table2 size={18} className='mt-[4px]' />
          )}
          <div>
            <h2 className='font-semibold text-[18px]'>{ title }</h2>
          </div>
        </div>
        {selected === title && (
          <div className='self-center'>
              <ChevronRight size={18} />
          </div>
        )}
      </Link>
    </div>
  )
}

export default SideBarComp;