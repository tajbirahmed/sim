"use client";
import { Home } from 'lucide-react'
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
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Dashboard'
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Semester'
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
        title='Course'
        selected={selected}
        setSelected={setSelected}
      />
      <SideBarComp
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