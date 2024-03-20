import React from 'react'

import { NavData } from '@/constants/NavCompData'
import Image from 'next/image'
import Link from 'next/link'
import NavComp from './NavComp'

// 1.cofigure text color, bg color, height, 
// 2, profile 

const NavBar = () => {
    return (
        <nav className="h-10 w-full flex flex-row justify-center items-center px-3">
           
                <h1 className='font-bold text-black text-[22px]'>
                    Navbar From Web Portal
                </h1>
            
        </nav>

    )
}

export default NavBar