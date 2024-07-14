"use client"; 
import NavigateComp from '@/components/NavigateComp'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from '@/contexts/SessionContext';
import { cn } from '@/lib/utils'
import { Address } from '@/types/AddressType';
import { Student } from '@/types/StundentType';
import { User } from '@/types/User';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import { z } from "zod";

const Home = () => {

	

	const {
		student
	} = useSession(); 

	const [cruuAddress, setCurrAddress] = useState<Address | undefined>(undefined);
	const [permAddress, setPermAddress] = useState<Address | undefined>(undefined);
	const [guradianAddress, setGuradianAddress] = useState<Address | undefined>(undefined);

	const [studentData, setStudentData] = useState<User & Student | undefined>(undefined);

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
			setStudentData(student);
			const address = await getAddressById(student.present_address_id);
			setCurrAddress(address)
			const permAddress = await getAddressById(student.permanent_address_id);
			setPermAddress(permAddress);
			const guradianAddress = await getAddressById(student.guardian_address_id);
			setGuradianAddress(guradianAddress);
		}

	}

	const formSchema = z.object({
		student_id: z.string(),

	})

	// const form = useForm<z.infer<typeof formSchema>>({
	// 	resolver: zodResolver(formSchema),
	// 	defaultValues: {
	// 		username: "",
	// 	},
	// })

	useEffect(() => {
		// getAddress();
	}, [student])

	return (
		<div className='flex flex-col ml-5 h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
			<NavigateComp
				title="Edit profile"
				// make={true}
				dashboard={true}
			/>

				<Form>
				

				</Form>

			
				
				<div className='flex flex-col space-y-8 mt-10'>
					<p className='text-xl font-bold'>Current Address</p>
				{cruuAddress
					?
					(
						<div className='grid grid-cols-3 grid-flow-row gap-y-8 gap-x-4 mt-10'>
					
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Post Office</Label>
								<Input type='text'  value={
									cruuAddress.post_office +
										cruuAddress.postal_code ? ', ' + cruuAddress.postal_code : ''
								} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Village</Label>
								<Input type='text'  value={cruuAddress.village} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Upazilla</Label>
								<Input type='text'  value={cruuAddress.upazila} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>District</Label>
								<Input type='text'  value={cruuAddress.district} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Division</Label>
								<Input type='text'  value={cruuAddress.division} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Country</Label>
								<Input type='text'  value={cruuAddress.country} />
							</div>
						</div>

					) : null
				}
			</div>
			<div className='flex flex-col space-y-8 mt-10'>
				<p className='text-xl font-bold'>Permanent Address</p>
				{permAddress
					?
					(
						<div className='grid grid-cols-3 grid-flow-row gap-y-8 gap-x-4 mt-10'>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Post Office</Label>
								<Input type='text'  value={
									permAddress.post_office +
										permAddress.postal_code ? ', ' + permAddress.postal_code : ''
								} />
							</div>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Village</Label>
								<Input type='text'  value={permAddress.village} />
							</div>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Upazilla</Label>
								<Input type='text'  value={permAddress.upazila} />
							</div>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>District</Label>
								<Input type='text'  value={permAddress.district} />
							</div>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Division</Label>
								<Input type='text'  value={permAddress.division} />
							</div>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Country</Label>
								<Input type='text'  value={permAddress.country} />
							</div>
						</div>

					) : null
				}
			</div>


			<div className='flex flex-col space-y-8 mt-10'>
				<p className='text-xl font-bold'>Guardian Address</p>
				{guradianAddress
					?
					(
						<div className='grid grid-cols-3 grid-flow-row gap-y-8 gap-x-4 mt-10'>

							<div className='flex flex-col space-y-2 w-80'>
								<Label>Post Office</Label>
								<Input type='text'  value={
									guradianAddress.post_office +
										guradianAddress.postal_code ? ', ' + guradianAddress.postal_code : ''
								} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Village</Label>
								<Input type='text'  value={guradianAddress.village} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Upazilla</Label>
								<Input type='text'  value={guradianAddress.upazila} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>District</Label>
								<Input type='text'  value={guradianAddress.district} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Division</Label>
								<Input type='text'  value={guradianAddress.division} />
							</div>
							<div className='flex flex-col space-y-2 w-80'>
								<Label>Country</Label>
								<Input type='text'  value={guradianAddress.country} />
							</div>
						</div>

					) : null
				}
			</div>
			
		</div>
	)
}

export default Home