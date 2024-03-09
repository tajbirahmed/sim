import React from 'react'

import { NavData } from '@/constants/NavCompData'
import Image from 'next/image'
import Link from 'next/link'
import NavComp from './NavComp'

// 1.cofigure text color, bg color, height, 
// 2, profile 

const NavBar = () => {
    return (
        <nav className="h-10 w-full flex flex-row justify-between items-center px-3">
            <Link
                href="/"
            >
                <div className='flex flex-row justify-center items-center hover:text-slate-500'>
                    <div className=''>
                        
                            <Image
                                src="/assets/cu-logo.png"
                                width={27}
                                height={80}
                                alt='logo'
                            />
                        
                    </div>
                    <div className='px-2 pl-3 font-semibold text-[22px]'>
                        <p>University of Chittagong</p>
                    </div>
                </div>  
            </Link>
            <div className='flex flex-row justify-center items-center '>
                {NavData.map((item, index) => (
                    <NavComp
                        key={index}
                        title={item.title}
                        link={ item.link }
                    />
                ))}
                {/* // fix this */}
                <Link href="/">
                    <div className='px-5 hover:bg-gray-100 rounded-full'>
                        <div className='container mx-auto px-2'>
                            <p className='font-bold text-slate-900 hover:text-slate-500'>
                                profile
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </nav>

    )
}

export default NavBar