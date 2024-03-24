import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// 1.deesing issue #1: fix height of each individual footercomps

const FooterBar = () => {
    return (
        <>
            <footer className="bg-[#002A5C] min-h-60 pb-10">
                <div className="mx-auto w-full max-w-screen-xl flex flex-row justify-around pt-8">

                    <div className=' min-w-[300px] flex flex-row justify-center mx-4 pt-2'>
                        <div className='flex flex-col justify-center'>
                            <Link
                                href="/"    
                            >
                                <p className='text-white text-[20px] pb-1 font-normal hover:font-medium hover:underline'>
                                    Offered Program
                                </p>
                            </Link>
                            <Link
                                href="/"
                            >
                                <p className='text-white text-[20px] pt-1 font-normal hover:font-medium hover:underline'>
                                    Facilities
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className=' min-w-[300px] flex flex-row justify-center mx-4 pt-2'>
                        <div className='flex flex-col justify-center hover:bg-inherit'>
                            <Link
                                href="/"
                            >
                                <p className='text-white text-[20px] pb-1 font-normal hover:font-medium hover:underline'>Gallery</p>
                            </Link>
                            <Link
                                href="/"
                            >
                                <p className='text-white text-[20px] pt-1 font-normal hover:font-medium hover:underline'>Faculty Member</p>
                            </Link>
                        </div>
                    </div>
                    <div className=' min-w-[550px] flex flex-col items-center justify-center mx-4'>
                        <Link
                            href="/"
                        >
                            <Image
                                src="/assets/cu-logo.png"
                                width={150}
                                height={200}
                                alt={'net nai naki?'}
                            />
                        </Link>
                        <Link href="/">
                            <p className='text-white font-bold text-[34px]'>
                                University of Chittagong
                            </p>
                        </Link>
                    </div>
                    <div className=' min-w-[300px] flex flex-row justify-center mx-4 pt-2'>
                        <div className='flex flex-col justify-center hover:bg-inherit'>
                            <Link
                                href="/"
                            >
                                <p className='text-white text-[20px] pb-1 font-normal hover:font-medium hover:underline'>
                                    Contact
                                </p>
                            </Link>
                            <Link
                                href="/"
                            >
                                <p className='text-white text-[20px] pt-1 font-normal hover:font-medium hover:underline'>FAQ</p>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </footer>
            <div className='h-[80px] bg-[#001733] pt-2 flex items-center'>
                <p className='text-[20px] font-semibold text-white pl-48'>
                    &copy; UNIVERSITY OF CHITTAGONG
                </p>
            </div>
        </>

    )
}

export default FooterBar