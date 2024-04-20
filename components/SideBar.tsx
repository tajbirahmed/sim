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
    <div className=" mt-10 max-h-screen min-h-screen min-w-64 overflow-y-auto sticky flex flex-col 
    ">
      <ProjectInfoComp 
          
      />
      <SideBarComp 
        title='Home'
        link="/"
        icon={<HomeIcon size={ 18 } className='mt-[4px]' /> }
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Dashboard'
        link='/dashboard'
        icon={<LayoutDashboard size={18} className='mt-[4px]' />}
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
      <div className='flex-1 flex flex-col justify-end pb-16'>
        <ProfileComp
        />
      </div>
    </div>
  )
}

export default SideBar