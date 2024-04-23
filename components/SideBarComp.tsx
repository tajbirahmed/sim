"use cilent";
import { ChevronRight, Table2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface SideBarProps { 
  title: string, 
  link: string, 
  icon?: React.ReactNode | null, 
  selected: string, 
  setSelected: (selected: string) => void
}

const SideBarComp = ({ title , link, icon, selected, setSelected }: SideBarProps) => {
  const handleClick = () => {
    setSelected(title.toLowerCase());
  }
  console.log("===>", selected, title);
  
  return (
    <div className='flex flex-col space-y-1'>
      <Link
        prefetch={ false }
        href={link!}
        className={`flex flex-row justify-between  mx-4 mt-2 p-2 ${selected === title.toLowerCase() && "bg-slate-100 rounded-xl text-blue-600"}
          hover:bg-slate-100 rounded-xl hover:dark:text-black`}
        onClick={() => handleClick()}
      >
        <div className='flex flex-row space-x-3'>
          {icon ? icon : (
            <Table2 size={15} className='mt-[4px]' />

          )}
          <div>
            <h2 className='font-semibold text-[16px]'>{ title }</h2>
          </div>
        </div>
        {selected === title.toLowerCase() && (
          <div className='self-center'>
              <ChevronRight size={18} />
          </div>
        )}
      </Link>
    </div>
  )
}

export default SideBarComp;