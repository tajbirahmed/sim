"use client";
import NavigateComp from '@/components/NavigateComp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfileImage } from '@/contexts/ProfileImageContext'
import { Student } from '@/types/StundentType';
import { Mail, MapPin, Phone, PhoneIcon, SquarePen, UserRound } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Address, AddressType } from '@/types/AddressType';
import {
    Select,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/SessionStore';
// import { useSession } from '@/contexts/SessionContext';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { getAddress } from '@/util/getAddress';
import { useAddressStore } from '@/store/AddressStore';
import { useImageStore } from '@/store/ImageStore';




const ViewProfile = () => {

    const profileImageUrl = useImageStore((state) => state.image);

    const student = useSessionStore((state) => state.student);
    const cruuAddress = useAddressStore((state) => state.currentAddress);
    const permAddress = useAddressStore((state) => state.permanentAddress);
    const guradianAddress = useAddressStore((state) => state.gurdianAddress);


    const router = useRouter();

    const handleEditProfile = () => {
        router.push("/editprofile");
    }






    function extractNumber(input: number): string {
        const str = input.toString();
        const numberString = str.substring(4, 6);
        const num = Number(numberString);
        const suff = num === 1 ? "1st" : num === 2 ? "2nd" : num === 3 ? "3rd" : num + "th";
        return suff;
    }

    function formatNumber(input: number): string {
        const numStr = input.toString();

        const firstFourDigits = numStr.substring(0, 4);

        const lastTwoDigitsOfFirstFour = parseInt(numStr.substring(2, 4), 10);

        const incrementedLastTwoDigits = lastTwoDigitsOfFirstFour + 1;

        return `${firstFourDigits}-${incrementedLastTwoDigits.toString().padStart(2, '0')}`;
    }



    useEffect(() => {
        getAddress();
    }, [student]);

    if (student === undefined) {
        toast.error('Error getting student information');
        return null;
    }

    if (cruuAddress === undefined || permAddress === undefined || guradianAddress === undefined) {
        toast.error('Error getting address information');
        return null;
    }


    return (
        <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-11/12 no-scrollbar pt-6'>
            <NavigateComp
                title="Profile"
                dashboard={true}
                profile={true}
            />


            <div className='flex flex-col w-full h-full items-center'>
                <div className='flex flex-row justify-between self-start items-center w-full h-auto'>
                    <div>
                        {profileImageUrl === null
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
                                        className=' border-2 border-blue-900 dark:border-blue-100 rounded-full'
                                    />
                                    <div className='flex flex-col space-y-1'>
                                        <p className='font-bold text-2xl mt-1'>{student.first_name + " " + student.last_name}</p>
                                        <p className='italic text-sm '>{"Student"}</p>
                                        <p className='text-sm '> {extractNumber(student.academic_session_id)}{" Semester"}</p>
                                        <p className='text-sm '>{"Session: " + formatNumber(student.academic_session_id)}</p>
                                        <p className='text-sm '>{student.department_name}</p>
                                        <p className='text-sm '>{student.university_name}</p>
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
                <Tabs defaultValue="personal" className='mt-12 flex flex-col items-center w-full'>
                    <TabsList className='w-fit bg-gray-100 rounded-xl flex flex-row gap-x-3'>
                        <TabsTrigger value="personal" className='data-[state=active]:bg-black/10 data-[state=active]:text-black rounded-xl'>
                            <div className='flex flex-row gap-2 items-center'>
                                <UserRound size={18} />
                                <p className='font-medium text-base'>
                                    Personal Information
                                </p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="location" className='data-[state=active]:bg-black/10 data-[state=active]:text-black rounded-xl'>
                            <div className='flex flex-row gap-2  items-center'>
                                <MapPin size={18} />
                                <p className='font-medium text-base'>
                                    Location
                                </p>
                            </div>
                        </TabsTrigger>
                        <TabsTrigger value="contact" className='data-[state=active]:bg-black/10 data-[state=active]:text-black rounded-xl'>
                            <div className='flex flex-row gap-2 items-center'>
                                <PhoneIcon size={18} />
                                <p className='font-medium text-base'>
                                    Contact Information
                                </p>
                            </div>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='personal' className='w-full flex justify-center'>
                        <StudentPersonalInformation student={student} />
                    </TabsContent>
                    <TabsContent value='location' className='w-full flex justify-center'>
                        <StudentLocationInformation
                            cruuAddress={cruuAddress}
                            permAddress={permAddress}
                            guradianAddress={guradianAddress}
                        />
                    </TabsContent>
                    <TabsContent value='contact' className='w-full flex justify-center'>
                        <StudentContactInformation student={student} />
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}


const StudentPersonalInformation = ({ student }: { student: Student }) => {
    return (

        <div className='flex flex-row gap-4 gap-y-8 flex-wrap w-7/12 justify-between mt-12'>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student ID</Label>
                <Input type='text' readOnly value={student.student_id} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Full Name(English)</Label>
                <Input type='text' readOnly value={student.first_name + " " + student.last_name} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Full Name(Bangla)</Label>
                <Input type='text' readOnly value={student.first_name_bn + " " + student.last_name_bn} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Father's Name(English)</Label>
                <Input type='text' readOnly value={student.fathers_name} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Father's Name(Bangla)</Label>
                <Input type='text' readOnly value={student.fathers_name_bn} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Mother's Name(English)</Label>
                <Input type='text' readOnly value={student.mothers_name} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Mother's Name(Bangla)</Label>
                <Input type='text' readOnly value={student.mothers_name_bn} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Guardian's Name(English)</Label>
                <Input type='text' readOnly value={student.guardian_name} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student Guardian's Name(Bangla)</Label>
                <Input type='text' readOnly value={student.guardian_name_bn} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Student-Guardian Relation</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={student.guardian_relation} />
                    </SelectTrigger>
                </Select>
            </div>


            <div className='flex flex-col space-y-2 w-72'>
                <Label>Date of Birth</Label>
                <Input type='text' readOnly value={format(student.dob, "d MMMM yyyy")} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Gender</Label>
                <Input type='text' readOnly value={student.gender} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Blood Group</Label>
                <Input type='text' readOnly value={student.blood_group} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Religion</Label>
                <Input type='text' readOnly value={student.religion} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Ethnicity</Label>
                <Input type='text' readOnly value={student.ethnicity} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Nationality</Label>
                <Input type='text' readOnly value={student.nationality} />
            </div>

        </div>
    )
}

const StudentLocationInformation = ({
    cruuAddress,
    permAddress,
    guradianAddress
}: {
    cruuAddress: Address | undefined,
    permAddress: Address | undefined,
    guradianAddress: Address | undefined
}) => {

    if (cruuAddress === undefined || permAddress === undefined || guradianAddress === undefined) {
        toast.error('Error getting address information');
        return null;
    }
    return (
        <div className='flex flex-col w-full mt-12 items-center'>
            <div className='col-span-2 self-start ml-40'>
                <h2 className='text-2xl font-bold'>Present Address</h2>
            </div>
            <div className='flex flex-row gap-4 gap-y-8 flex-wrap w-7/12 justify-between mt-12'>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Post Office</Label>
                    <Input type='text' readOnly value={
                        cruuAddress.post_office +
                            cruuAddress.postal_code ? ', ' + cruuAddress.postal_code : ''
                    } />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Village</Label>
                    <Input type='text' readOnly value={cruuAddress.village} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Upazilla</Label>
                    <Input type='text' readOnly value={cruuAddress.upazila} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>District</Label>
                    <Input type='text' readOnly value={cruuAddress.district} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Division</Label>
                    <Input type='text' readOnly value={cruuAddress.division} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Country</Label>
                    <Input type='text' readOnly value={cruuAddress.country} />
                </div>
            </div>



            <div className='col-span-2 ml-40 mt-12 self-start'>
                <h2 className='text-2xl font-bold '>Permanent Address</h2>
            </div>
            <div className='flex flex-row gap-4 gap-y-8 flex-wrap w-7/12 justify-between mt-12'>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Post Office</Label>
                    <Input type='text' readOnly value={
                        permAddress.post_office +
                            permAddress.postal_code ? ', ' + permAddress.postal_code : ''
                    } />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Village</Label>
                    <Input type='text' readOnly value={permAddress.village} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Upazilla</Label>
                    <Input type='text' readOnly value={permAddress.upazila} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>District</Label>
                    <Input type='text' readOnly value={permAddress.district} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Division</Label>
                    <Input type='text' readOnly value={permAddress.division} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Country</Label>
                    <Input type='text' readOnly value={permAddress.country} />
                </div>
            </div>

            <div className='col-span-2 ml-40 mt-12 self-start'>
                <h2 className='text-2xl font-bold'>Guardian Address</h2>
            </div>
            <div className='flex flex-row gap-4 gap-y-8 flex-wrap w-7/12 justify-between mt-12'>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Post Office</Label>
                    <Input type='text' readOnly value={
                        guradianAddress.post_office +
                            guradianAddress.postal_code ? ', ' + guradianAddress.postal_code : ''
                    } />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Village</Label>
                    <Input type='text' readOnly value={guradianAddress.village} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Upazilla</Label>
                    <Input type='text' readOnly value={guradianAddress.upazila} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>District</Label>
                    <Input type='text' readOnly value={guradianAddress.district} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Division</Label>
                    <Input type='text' readOnly value={guradianAddress.division} />
                </div>
                <div className='flex flex-col space-y-2 w-72'>
                    <Label>Country</Label>
                    <Input type='text' readOnly value={guradianAddress.country} />
                </div>
            </div>

        </div>
    )
}

const StudentContactInformation = ({ student }: { student: Student }) => {
    return (
        <div className='flex flex-row gap-4 gap-y-8 flex-wrap w-7/12 justify-between mt-12'>
            <div className='flex flex-col space-y-2 w-72'>
                <Label>Email</Label>
                <Input type='text' readOnly value={student.email} />
            </div>

            <div className='flex flex-col space-y-2 w-72'>
                <Label>Phone</Label>
                <Input type='text' readOnly value={student.phone} />
            </div>

        </div>
    )
}

export default ViewProfile