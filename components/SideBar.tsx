"use client";
import { Home, HomeIcon, Table2, LayoutGrid, LayoutDashboard, } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SideBarComp from './SideBarComp';
import ProjectInfoComp from './ProjectInfoComp';
import ProfileComp from './ProfileComp';



const SideBar = () => {
  const [selected, setSelected] = useState('Home');
  
  return (
    <div className="h-[94vh] min-w-44 overflow-y-auto sticky flex flex-col shadow-md shadow-slate-500 dark:shadow-slate-800 rounded-r-xl
    ">
      <ProjectInfoComp 
          
      />
      <SideBarComp 
        title='Home'
        link="/"
        icon={<HomeIcon size={ 15 } className='mt-[4px]' /> }
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Dashboard'
        link='/dashboard'
        icon={<LayoutDashboard size={15} className='mt-[4px]' />}
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Semester'
        link='/semester'
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Course'
        link='/result'
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        link='/result'
        title='Result'
        selected={selected}
        setSelected={setSelected}
      />
      <div className='flex-1 flex flex-col justify-end'>
        <ProfileComp
        />
      </div>
    </div>
  )
}

export default SideBar