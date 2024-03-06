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
            <div className='px-5 hover:bg-gray-100 rounded-full'>
                <div className='container mx-auto px-2'>
                    <p className='font-bold text-slate-900 hover:text-slate-500'>
                        { props.title}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default NavComp