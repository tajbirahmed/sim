import Link from 'next/link'
import React from 'react'

interface PageProps {
    title: string,
    link: string
}

// 1. configure hover color
// 2. text color

const NavComp = (props: PageProps) => {
    return (
        <Link href={props.link}>
            <div className='px-5 hover:bg-gray-200 hover:rounded-lg'>
                <div className='w-fit'>
                    <p className='font-bold text-slate-800 hover:{text-slate-900 }'>
                        { props.title }
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default NavComp