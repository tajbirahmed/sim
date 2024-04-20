import React from 'react'

import { NavData } from '@/constants/NavCompData'
import Image from 'next/image'
import Link from 'next/link'
import NavComp from './NavComp'
import { ModeToggle } from '../DarkModeToggle'

// 1.cofigure text color, bg color, height, 
// 2, profile 

const NavBar = () => {
    return (
        <nav className="h-10 w-full flex flex-row justify-end items-center px-3">
           
            
            <div className='justify-end'>
                <ModeToggle />
            </div>
        </nav>

    )
}

export default NavBar