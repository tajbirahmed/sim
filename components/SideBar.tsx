"use client";
import { Home, HomeIcon, Table2, LayoutGrid, LayoutDashboard, } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import SideBarComp from './SideBarComp';
import ProjectInfoComp from './ProjectInfoComp';
import ProfileComp from './ProfileComp';
import { SideBarContext } from '@/contexts/SideBarContext';
import { useSideBarStore } from '@/store/sidebarstore';



const SideBar = () => {
  const { content, setContent } = useContext(SideBarContext)!;
  const isOpen = useSideBarStore((state) => state.isOpen);
  

  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="h-screen min-w-44 overflow-y-hidden sticky flex flex-col shadow-md shadow-slate-500 dark:shadow-slate-800 rounded-r-xl
    ">
      <ProjectInfoComp 
          
      />
      <SideBarComp
        title='Dashboard'
        link='/dashboard'
        icon={<LayoutDashboard size={15} className='mt-[4px]' />}
        selected={content}
        setSelected={setContent}
      />
      <SideBarComp
        title='Semester'
        link='/semester'
        selected={content}
        setSelected={setContent}
      />
      <SideBarComp
        title='Course'
        link='/enrolled-courses'
        selected={content}
        setSelected={setContent}
      />
      <SideBarComp
        link='/result'
        title='Result'
        selected={content}
        setSelected={setContent}
      />
      <div className='flex-1 flex flex-col justify-end'>
        <ProfileComp
        />
      </div>
    </div>
  )
}

export default SideBar