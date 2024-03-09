import React from 'react'
import { AlignLeft } from 'lucide-react';
import SideBarComp from './SideBarComp';
import { ResultData } from '@/constants/ResultInfo';
interface PageProps {
    toggleSidebar: boolean,
    setToggleSideBar: (toggleSideBar: boolean) => void
}

const SideBar = ({ toggleSidebar, setToggleSideBar }: PageProps) => {
    return (
        (
            <div className={`flex flex-col min-h-screen max-h-screen 
                            w-[${toggleSidebar ? 300 : 6}px] rounded-lg` }>
                <div className='w-6 h-6 hover:bg-slate-200 rounded-lg flex flex-row justify-center items-center '>
                    <button onClick={() => setToggleSideBar(!toggleSidebar)}>
                        <AlignLeft size={18} />
                    </button>
                </div>
                {toggleSidebar ? (
                    <div className='flex flex-col items-center px-5 overflow-hidden overflow-y-auto max-h-screen'>
                        {ResultData.map((item, index) => (
                            <SideBarComp
                                title={ item.title}
                            />
                        ))}
                    </div>
                ) : (null)
                }
            </div>
        ) 
    )
}

export default SideBar