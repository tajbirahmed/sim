"use client";
import NavigateComp from '@/components/NavigateComp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileImage } from '@/contexts/ProfileImageContext'
import { Student } from '@/types/StundentType';
import { Mail, Phone, SquarePen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Address, AddressType } from '@/types/AddressType';
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useSession } from '@/contexts/SessionContext';
import { User } from '@/types/User';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
// import { useSession } from '@/contexts/SessionContext';




const ViewProfile = () => {

    const {
        profileImageUrl,
        setProfileImageUrl
    } = useProfileImage();

    const {
        student
    } = useSession(); 

    const router = useRouter(); 

    const handleEditProfile = () => {
        router.push("/editprofile");
    }



    const [cruuAddress, setCurrAddress] = useState<Address | undefined>(undefined); 
    const [permAddress, setPermAddress] = useState<Address | undefined>(undefined);
    const [guradianAddress, setGuradianAddress] = useState<Address | undefined>(undefined);

    const [option, setOption] = useState<'personal' | 'location' | 'contact' >('personal');
    
    function extractNumber(input: number): string {
        const str = input.toString();
        const numberString = str.substring(4, 6);
        const num = Number(numberString);
        const suff = num === 1 ? "1st" : num === 2 ? "2nd" : num === 3 ? "3rd" : num + "th";
        return suff;
    }

    function formatNumber(input: number): string {
        // Convert the number to a string
        const numStr = input.toString();

        // Extract the first 4 digits
        const firstFourDigits = numStr.substring(0, 4);

        // Extract the last 2 digits of the first 4 digits
        const lastTwoDigitsOfFirstFour = parseInt(numStr.substring(2, 4), 10);

        // Add 1 to the last 2 digits
        const incrementedLastTwoDigits = lastTwoDigitsOfFirstFour + 1;

        // Format the result as "YYYY-XX"
        return `${firstFourDigits}-${incrementedLastTwoDigits.toString().padStart(2, '0')}`;
    }

    const getAddressById = async (id: number) => { 
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL!;
        if (student) {
            const addressUrl = `${baseUrl}/api/address/${id}`;
            try {
                const response = await fetch(
                    addressUrl,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        cache: 'force-cache'
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                
                return result as Address;
            } catch (error) {
                console.error('[app/viewprofile/page.tsx] There was a problem with your fetch operation:', error);
            }
        } else {
            console.error('[app/viewprofile/page.tsx] Student is undefined');
        }
        return undefined
    }

    const getAddress = async () => { 
        if (student && cruuAddress === undefined) {
            const address = await getAddressById(student.present_address_id);
            setCurrAddress(address)
            const permAddress = await getAddressById(student.permanent_address_id); 
            setPermAddress(permAddress);
            const guradianAddress = await getAddressById(student.guardian_address_id);
            setGuradianAddress(guradianAddress);
        }
            
    }

    useEffect(() => { 
        getAddress();
    }, [student])
    
    return (
        <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-11/12 no-scrollbar pt-6'>
            <NavigateComp
                title="Profile"
                dashboard={true}
                profile={true}
            />
            {/* <p className='font-bold text-4xl self-center'> Your Information</p> */}
            {student
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
                                                <p className='font-bold text-2xl mt-1'>{ student.first_name + " " +student.last_name}</p>
                                                <p className='italic text-sm '>{"Student"}</p>
                                                <p className='text-sm '> { extractNumber(student.academic_session_id)}{" Semester"}</p>
                                                <p className='text-sm '>{"Session: " + formatNumber(student.academic_session_id)}</p>
                                                <p className='text-sm '>{student.department_name}</p>
                                                <p className='text-sm '>{student.university_name}</p>

                                                <Link prefetch={false} href={"www.google.com"} className='flex flex-row space-x-3 items-center'>
                                                    <Mail size={24} />
                                                    <p className='text-blue-900 dark:text-blue-500 text-sm'>{"Email: " + student.email}</p>
                                                </Link>
                                                <Link prefetch={false} href={"www.google.com"} className='flex flex-row space-x-3 items-center'>
                                                    <Phone size={24} />
                                                    <p className='text-blue-900 dark:text-blue-500 text-sm'>{"Phone: " + student.phone}</p>
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
                            <button className='flex flex-row justify-between self-center items-center mt-16 border-white w-9/12 ml-36' onClick={() => { setOption('personal') }}>
                                <p className={`text-xl ${option === 'personal' ? 'font-bold border-b-2' : 'font-normal'}`}>
                                    {"Personal Information"}
                                </p>
                            </button>
                            <button className='flex flex-row justify-between self-center items-center mt-16 border-white w-8/12 ml-36' onClick={() => { setOption('location') }}>
                                <p className={`text-xl ${option === 'location' ? 'font-bold border-b-2' : 'font-normal'}`}>
                                    Location
                                </p>
                            </button>
                            <button className='flex flex-row justify-between self-center items-center mt-16 border-white w-8/12 ml-36' onClick={() => { setOption('contact') }}>
                                <p className={`text-xl ${option === 'contact' ? 'font-bold border-b-2' : 'font-normal'}`}>
                                    Contact Info
                                </p>
                            </button>

                        </div>
                        {
                            option === 'personal'
                                ?
                                <div color='flex flex-col'>
                                    <div className='grid grid-cols-2 grid-flow-row gap-y-8 gap-x-2 ml-48 mt-10'>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student ID</Label>
                                            <Input type='text' readOnly value={student.student_id} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Full Name(English)</Label>
                                            <Input type='text' readOnly value={ student.first_name + " " + student.last_name} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Student Full Name(Bangla)</Label>
                                            <Input type='text' readOnly value={student.first_name_bn + " " + student.last_name_bn } />
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
                                            <Input type='text' readOnly value={student.guardian_name} />
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


                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Date of Birth</Label>
                                            <Input type='text' readOnly value={format(student.dob, "d MMMM yyyy")} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Gender</Label>
                                            <Input type='text' readOnly value={student.gender} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Blood Group</Label>
                                            <Input type='text' readOnly value={student.blood_group} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Religion</Label>
                                            <Input type='text' readOnly value={student.religion} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Ethnicity</Label>
                                            <Input type='text' readOnly value={student.ethnicity} />
                                        </div>

                                        <div className='flex flex-col space-y-2 w-80'>
                                            <Label>Nationality</Label>
                                            <Input type='text' readOnly value={student.nationality} />
                                        </div>

                                    </div>
                                </div>
                                :
                                option === 'location' && cruuAddress && permAddress && guradianAddress
                                    ?
                                    (
                                        <div className='grid grid-cols-2 grid-flow-row gap-y-8 gap-x-2 ml-48 mt-10'>
                                            <div className='col-span-2'>
                                                <h2 className='text-2xl font-bold'>Present Address</h2>
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Post Office</Label>
                                                <Input type='text' readOnly value={
                                                        cruuAddress.post_office + 
                                                        cruuAddress.postal_code ? ', ' + cruuAddress.postal_code : ''
                                                    } />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Village</Label>
                                                <Input type='text' readOnly value={cruuAddress.village} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Upazilla</Label>
                                                <Input type='text' readOnly value={cruuAddress.upazila} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>District</Label>
                                                <Input type='text' readOnly value={cruuAddress.district} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Division</Label>
                                                <Input type='text' readOnly value={cruuAddress.division} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Country</Label>
                                                <Input type='text' readOnly value={cruuAddress.country} />
                                            </div>

                                            
                                            <div className='col-span-2'>
                                                <h2 className='text-2xl font-bold'>Permanent Address</h2>
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Post Office</Label>
                                                <Input type='text' readOnly value={
                                                    permAddress.post_office +
                                                        permAddress.postal_code ? ', ' + permAddress.postal_code : ''
                                                } />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Village</Label>
                                                <Input type='text' readOnly value={permAddress.village} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Upazilla</Label>
                                                <Input type='text' readOnly value={permAddress.upazila} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>District</Label>
                                                <Input type='text' readOnly value={permAddress.district} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Division</Label>
                                                <Input type='text' readOnly value={permAddress.division} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Country</Label>
                                                <Input type='text' readOnly value={permAddress.country} />
                                            </div>

                                            <div className='col-span-2'>
                                                <h2 className='text-2xl font-bold'>Guardian Address</h2>
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Post Office</Label>
                                                <Input type='text' readOnly value={
                                                    guradianAddress.post_office +
                                                        guradianAddress.postal_code ? ', ' + guradianAddress.postal_code : ''
                                                } />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Village</Label>
                                                <Input type='text' readOnly value={guradianAddress.village} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Upazilla</Label>
                                                <Input type='text' readOnly value={guradianAddress.upazila} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>District</Label>
                                                <Input type='text' readOnly value={guradianAddress.district} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Division</Label>
                                                <Input type='text' readOnly value={guradianAddress.division} />
                                            </div>
                                            <div className='flex flex-col space-y-2 w-80'>
                                                <Label>Country</Label>
                                                <Input type='text' readOnly value={guradianAddress.country} />
                                            </div>
                                        </div>

                                    )
                                    :
                                    option === 'contact'
                                        ?
                                        (
                                            <div className='grid grid-cols-2 grid-flow-row gap-y-8 gap-x-2 ml-48 mt-10'>
                                                <div className='flex flex-col space-y-2 w-80'>
                                                    <Label>Email</Label>
                                                    <Input type='text' readOnly value={student.email} />
                                                </div>

                                                <div className='flex flex-col space-y-2 w-80'>
                                                    <Label>Phone</Label>
                                                    <Input type='text' readOnly value={student.phone} />
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