"use client";
import NavigateComp from '@/components/NavigateComp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileImage } from '@/contexts/ProfileImageContext'
import { Student } from '@/types/StundentType';
import { ChevronDown, ChevronRight, ChevronUp, Edit2, Mail, Phone, SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { AddressType } from '@/types/AddressType';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Address } from 'cluster';


const ViewProfile = () => {

    const {
        profileImageUrl,
        setProfileImageUrl
    } = useProfileImage();

    const handleEditProfile = () => {

    }
    const obj: Student = {
        student_id: 20701016,
        user_id: '7fdf2017-asdfa#!1-6asda0-010ed',
        hall_id: 1,
        department_id: 1,
        program_id: 1,
        fathers_name_bn: 'জন ডো',
        mothers_name_bn: 'জেন ডো',
        fathers_name: 'John Doe',
        mothers_name: 'Jane Doe',
        guardians_name: 'Jane Doe',
        guardian_address_id: 1,
        guardian_name_bn: 'জন ডো',
        guardian_relation: 'Mother',
        academic_session_id: 207101019
    }
    const addressObj: AddressType = {
        address_id: 1,
        country: 'Bangladesh',
        division: 'Chattogram',
        district: 'Chattogram',
        upazila: 'Hathazari'
    }
    const [student, setstudent] = useState<Student | undefined>(obj);
    const [showdetails, setShowDetails] = useState<boolean>(true);
    const [address, setAddress] = useState<AddressType | undefined>(addressObj)
    const [option, setOption] = useState<'personal' | 'location'>('personal');
    const handleDetailClick = () => {
        setShowDetails(!showdetails);
    }

    return (
        <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-11/12 no-scrollbar pt-6'>
            <NavigateComp
                title="Profile"
                dashboard={true}
            />
            {/* <p className='font-bold text-4xl self-center'> Your Information</p> */}
            {student && address
                ?
                (
                    <div className='flex flex-col w-full h-full items-stretch'>
                        <div className='flex flex-row justify-between self-start items-center w-full h-auto'>
                            <div>
                                {profileImageUrl === ''
                                    ?
                                    (
                                        <p>Error getting profile image</p>
                                    )
                                    :
                                    (
                                        <div className='flex flex-row items-center justify-center mt-2 ml-28 space-x-8'>
                                            <Image
                                                src={profileImageUrl}
                                                width={200}
                                                height={200}
                                                alt='Profile Image'
                                                className=' border-4 border-blue-900 dark:border-blue-100 '
                                            />
                                            <div className='flex flex-col space-y-1'>
                                                <p className='font-bold text-2xl mt-1'>{"Student Name"}</p>
                                                <p className='italic text-sm '>{"Student"}</p>
                                                <p className='text-sm '>{"Department Name"}</p>
                                                <p className='text-sm '>{"Semester"}</p>
                                                <p className='text-sm '>{"Session"}</p>
                                                <Link prefetch={false} href={"www.google.com"} className='flex flex-row space-x-3 items-center'>
                                                        <Mail size={24} />
                                                    <p className='text-blue-900 dark:text-blue-500 text-sm'>{"Email"}</p>
                                                </Link>
                                                <Link prefetch={false} href={"www.google.com"} className='flex flex-row space-x-3 items-center'>
                                                    <Phone size={24} />
                                                    <p className='text-blue-900 dark:text-blue-500 text-sm'>{"Mobile"}</p>
                                                </Link>
                                            </div>

                                        </div>
                                    )
                                }
                            </div>

                            <Button variant="default" onClick={handleEditProfile}>
                                <div className='flex flex-row items-center space-x-2'>
                                    <SquarePen size={24} />
                                    <p>Edit Information</p>
                                </div>
                            </Button>

                        </div>
                        <div className='flex flex-row justify-around'> 
                            <button className='flex flex-row justify-between self-center items-center mt-16 border-white w-8/12 ml-36' onClick={() => { setOption('personal')}}>
                                <p className={`text-xl ${option === 'personal' ? 'font-bold border-b-2' : 'font-normal'}`}>
                                    Personal Information
                                </p>
                            </button>
                            <button className='flex flex-row justify-between self-center items-center mt-16 border-white w-8/12 ml-36' onClick={() => { setOption('location') }}>
                                <p className={`text-xl ${option === 'location' ? 'font-bold border-b-2' : 'font-normal'}`}>
                                    Location
                                </p>
                            </button>
                        </div>
                        {
                            option === 'personal'
                                ?
                                <div color='flex flex-col'>
                                    {/* <div className='flex flex-row items-center space-x-10 mt-10'>
                                        <p className='font-bold ml-40  text-2xl'>Personal Information</p>
                                        <ChevronRight size={24} className='' />
                                    </div> */}
                                    <div className='grid grid-cols-2 grid-flow-row gap-y-8 gap-x-2 ml-48 mt-10'>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student ID</Label>
                                            <Input type='text' readOnly value={student.student_id} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Full Name(English)</Label>
                                            <Input type='text' readOnly value='**Name**' />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Name(Bangla)</Label>
                                            <Input type='text' readOnly value='**নাম**' />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Father's Name(English)</Label>
                                            <Input type='text' readOnly value={student.fathers_name} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Father's Name(Bangla)</Label>
                                            <Input type='text' readOnly value={student.fathers_name_bn} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Mother's Name(English)</Label>
                                            <Input type='text' readOnly value={student.mothers_name} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Mother's Name(Bangla)</Label>
                                            <Input type='text' readOnly value={student.mothers_name_bn} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Guardian's Name(English)</Label>
                                            <Input type='text' readOnly value={student.guardians_name} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Guardian's Name(Bangla)</Label>
                                            <Input type='text' readOnly value={student.guardian_name_bn} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student-Guardian Relation</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={student.guardian_relation} />
                                                </SelectTrigger>
                                            </Select>
                                        </div>

                                    </div>
                                </div>
                                :
                                option === 'location'
                                    ?
                                    (
                                        <div className='grid grid-cols-2 grid-flow-row gap-y-8 gap-x-2 ml-48 mt-10'>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Upazilla</Label>
                                                <Input type='text' readOnly value={address.upazila} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>District</Label>
                                                <Input type='text' readOnly value={address.district} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Division</Label>
                                                <Input type='text' readOnly value={address.division} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Country</Label>
                                                <Input type='text' readOnly value={address.country} />
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        null   
                                    )
                        }
                    </div>
                )
                :
                (
                    null
                )
            }
        </div>
    )
}

export default ViewProfile