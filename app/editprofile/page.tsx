"use client";

import { LoadingScreen } from '@/components/LoadingScreen';
import NavigateComp from '@/components/NavigateComp'
import { getStudent, useSessionStore } from '@/store/SessionStore';
import React, { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Edit, Edit2, FileClock, Loader2, LucideSchool, MapPin, UploadIcon, User, X } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddressStore } from '@/store/AddressStore';
import { useEditStore } from '@/util/EditStore';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { generatePdf } from '@/utils/generatePdf';
import { Label } from '@/components/ui/label';
import { useImageStore } from '@/store/ImageStore';


const addressSchema = z.object({
	country: z.string().min(2).max(50),
	division: z.string().min(2).max(50),
	district: z.string().min(2).max(50),
	upazila: z.string().min(2).max(50),
	union_name: z.string().min(2).max(50),
	post_office: z.string().min(2).max(50),
	village: z.string().min(2).max(50),
	postal_code: z.string(),
	thana: z.string().min(2).max(50),
})

const formSchema = z.object({
	student_id: z.coerce.number().min(10000000),
	first_name: z.string().min(2).max(50),
	last_name: z.string().min(2).max(50),
	first_name_bn: z.string().min(2).max(50),
	last_name_bn: z.string().min(2).max(50),
	dob: z.date(),
	gender: z.string().min(2).max(10),
	blood_group: z.string().min(2).max(2),
	religion: z.string().min(2).max(50),
	ethnicity: z.string().min(2).max(50),
	nationality: z.string().min(2).max(50),
	father_name: z.string().min(2).max(50),
	father_name_bn: z.string().min(2).max(50),
	mother_name: z.string().min(2).max(50),
	mother_name_bn: z.string().min(2).max(50),
	guardian_name: z.string().min(2).max(50),
	hall_name: z.string().min(2).max(50),
	presendAdress: addressSchema,
	permanentAdress: addressSchema,
	guardianAdress: addressSchema
})


export type AddressEdit = z.infer<typeof addressSchema>;
export type FormEdit = z.infer<typeof formSchema>;




const Home = () => {

	const student = useSessionStore((state) => state.student);

	const setEditedValues = useEditStore((state) => state.setEditedValues);
	const currentAddress = useAddressStore((state) => state.currentAddress);
	const permanentAddress = useAddressStore((state) => state.permanentAddress);
	const guardianAddress = useAddressStore((state) => state.gurdianAddress);
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			student_id: student?.student_id,
			first_name: student?.first_name,
			first_name_bn: student?.first_name_bn,
			last_name: student?.last_name,
			last_name_bn: student?.last_name_bn,
			dob: student?.dob,
			gender: student?.gender,
			blood_group: student?.blood_group,
			religion: student?.religion,
			ethnicity: student?.ethnicity,
			nationality: student?.nationality,
			father_name: student?.fathers_name,
			mother_name: student?.mothers_name,
			father_name_bn: student?.fathers_name_bn,
			mother_name_bn: student?.mothers_name_bn,
			guardian_name: student?.guardian_name,
			hall_name: student?.hall_name,
			presendAdress: {
				country: currentAddress?.country,
				division: currentAddress?.division,
				district: currentAddress?.district,
				upazila: currentAddress?.upazila,
				union_name: currentAddress?.union_name,
				post_office: currentAddress?.post_office,
				village: currentAddress?.village,
				postal_code: currentAddress?.postal_code?.toString(),
				thana: currentAddress?.thana
			},
			permanentAdress: {
				country: permanentAddress?.country,
				division: permanentAddress?.division,
				district: permanentAddress?.district,
				upazila: permanentAddress?.upazila,
				union_name: permanentAddress?.union_name,
				post_office: permanentAddress?.post_office,
				village: permanentAddress?.village,
				postal_code: permanentAddress?.postal_code?.toString(),
				thana: permanentAddress?.thana
			},
			guardianAdress: {
				country: guardianAddress?.country,
				division: guardianAddress?.division,
				district: guardianAddress?.district,
				upazila: guardianAddress?.upazila,
				union_name: guardianAddress?.union_name,
				post_office: guardianAddress?.post_office,
				village: guardianAddress?.village,
				postal_code: guardianAddress?.postal_code?.toString(),
				thana: guardianAddress?.thana
			}
		}
	})



	if (student === undefined) {
		return <LoadingScreen />;
	}
	const changes: string[] = [];

	const compareValues = (field: string, newValue: any, oldValue: any) => {
		if (newValue !== oldValue) {
			if (field === 'dob') {
				changes.push(`${field} (new): ${format(newValue, 'PPP')}`, `${field} (old): ${format(oldValue, 'PPP')}`);
				return;
			}
			changes.push(`${field} (new): ${newValue}`, `${field} (old): ${oldValue}`);
		}
	};
	const compareAddress = (addressType: string, newAddress: any, oldAddress: any) => {
		compareValues(`${addressType}.country`, newAddress.country, oldAddress.country);
		compareValues(`${addressType}.division`, newAddress.division, oldAddress.division);
		compareValues(`${addressType}.district`, newAddress.district, oldAddress.district);
		compareValues(`${addressType}.upazila`, newAddress.upazila, oldAddress.upazila);
		compareValues(`${addressType}.union_name`, newAddress.union_name, oldAddress.union_name);
		compareValues(`${addressType}.post_office`, newAddress.post_office, oldAddress.post_office);
		compareValues(`${addressType}.village`, newAddress.village, oldAddress.village);
		compareValues(`${addressType}.postal_code`, newAddress.postal_code, oldAddress.postal_code.toString());
		compareValues(`${addressType}.thana`, newAddress.thana, oldAddress.thana);
	};

	const onSubmit = () => {
		setEditedValues(form.getValues());
		const formValues = form.getValues();

		compareValues('first_name', formValues.first_name, student.first_name);
		compareValues('last_name', formValues.last_name, student.last_name);
		compareValues('first_name_bn', formValues.first_name_bn, student.first_name_bn);
		compareValues('last_name_bn', formValues.last_name_bn, student.last_name_bn);
		compareValues('dob', formValues.dob, student.dob);
		compareValues('gender', formValues.gender, student.gender);
		compareValues('blood_group', formValues.blood_group, student.blood_group);
		compareValues('religion', formValues.religion, student.religion);
		compareValues('ethnicity', formValues.ethnicity, student.ethnicity);
		compareValues('nationality', formValues.nationality, student.nationality);
		compareValues('father_name', formValues.father_name, student.fathers_name);
		compareValues('father_name_bn', formValues.father_name_bn, student.fathers_name_bn);
		compareValues('mother_name', formValues.mother_name, student.mothers_name);
		compareValues('mother_name_bn', formValues.mother_name_bn, student.mothers_name_bn);
		compareValues('guardian_name', formValues.guardian_name, student.guardian_name);
		compareValues('hall_name', formValues.hall_name, student.hall_name);


		compareAddress('presendAdress', formValues.presendAdress, currentAddress);
		compareAddress('permanentAdress', formValues.permanentAdress, permanentAddress);
		compareAddress('guardianAdress', formValues.guardianAdress, guardianAddress);

		console.log(changes);
	}

	const getAcademicSession = (academic_session_id: number): string => {
		const year = parseInt(academic_session_id.toString().slice(0, 4));
		return `${year}-${(year + 1) % 100}`;
	};

	const onSubmitApplication = async () => {
		setLoading(true);
		await generatePdf({
			changes: changes,
			student_name: `${student.first_name} ${student.last_name}`,
			student_id: student.student_id.toString(),
			student_email: student.email,
			student_phone: student.phone,
			student_session: getAcademicSession(student.academic_session_id),
			setLoading
		});
	}

	return (
		<div className='flex flex-col ml-5 h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
			<NavigateComp
				title="Edit profile"
				// make={true}
				dashboard={true}
			/>

			<Tabs className='mt-10 ml-12 flex flex-col items-center' defaultValue={"personal_info"}>
				<TabsList >
					<TabsTrigger value='personal_info'>
						<div className='flex flex-row gap-2 items-center'>
							<User size={18} className='text-black' />
							Personal Information
						</div>
					</TabsTrigger>
					<TabsTrigger value='address_info'>
						<div className='flex flex-row gap-2 items-center'>
							<MapPin size={18} className='text-black' />
							Address Information
						</div>
					</TabsTrigger>
					<TabsTrigger value='hall_info'>
						<div className='flex flex-row gap-2 items-center'>
							<LucideSchool size={18} className='text-black' />
							Hall Information
						</div>
					</TabsTrigger>
					<TabsTrigger value='image_info'>
						<div className='flex flex-row gap-2 items-center'>
							<UploadIcon size={18} className='text-black' />
							Change Image
						</div>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='personal_info' className='flex justify-center'>
					<PersonalInfoForm
						onSubmit={onSubmit}
						form={form}
					/>
				</TabsContent>
				<TabsContent value='address_info' className='flex justify-center'>
					<AddressInfoForm
						onSubmit={onSubmit}
						form={form}
					/>
				</TabsContent>
				<TabsContent value='hall_info' className='flex justify-center'>
					<HallInfoForm
						onSubmit={onSubmit}
						form={form}
					/>
				</TabsContent>
				<TabsContent value="image_info">
					<ImageInfoForm
					/>
				</TabsContent>
			</Tabs>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-11/12 flex items-center justify-center ml-24">
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button

								type="submit" className='w-1/3 self-center mr-4 mt-12 flex flex-row gap-4'>
								<Edit size={20} className='text-white' />
								Confirm Edit
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent >
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action will save your changes locally.
									after you submit the changes via submit application, you can't undo this action.
								</AlertDialogDescription>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogHeader>
						</AlertDialogContent>
					</AlertDialog>
					<Button
						onClick={onSubmitApplication}
						variant={"destructive"}
						type="submit" className='w-1/3 self-center mr-4 mt-12 flex flex-row gap-4'>
						<div>
							{loading ? <Loader2 className='text-white animate-spin' /> :
								<FileClock size={20} className='text-white' />}
						</div>
						Submit Application
					</Button>
				</form>
			</Form>
		</div>
	)
}

const PersonalInfoForm = ({
	form,
	onSubmit
}: {
	form: UseFormReturn<z.infer<typeof formSchema>>,
	onSubmit: () => void
}) => {



	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col flex-wrap gap-4 w-7/12">

				<div className='flex flex-row flex-wrap w-full mt-4 gap-x-4 gap-y-8'>
					{/* 1 */}
					<FormField
						control={form.control}
						name="student_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Student ID</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter student id" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/*2  */}
					<FormField
						control={form.control}
						name="first_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your first name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 3 */}
					<FormField
						control={form.control}
						name="last_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your last name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* 4 */}
					<FormField
						control={form.control}
						name="first_name_bn"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name(in Bangla)</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your first name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 5 */}
					<FormField
						control={form.control}
						name="last_name_bn"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name(in Bangla)</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your last name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 6 */}
					<FormField
						control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem className="flex flex-col pt-2 w-72">
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[288px] pl-3 text-left font-normal",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 7 */}
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gender</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} >
									<FormControl>
										<SelectTrigger className='w-72'>
											<SelectValue placeholder="Select your gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='w-72'>
										<SelectItem value="Male">Male</SelectItem>
										<SelectItem value="Female">Female</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 8 */}
					<FormField
						control={form.control}
						name="blood_group"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Blood Group</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} >
									<FormControl>
										<SelectTrigger className='w-72'>
											<SelectValue placeholder="Select your blood group" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='w-72'>
										<SelectItem value="A+">A+</SelectItem>
										<SelectItem value="A-">A-</SelectItem>
										<SelectItem value="O+">O+</SelectItem>
										<SelectItem value="O-">O-</SelectItem>
										<SelectItem value="AB+">AB+</SelectItem>
										<SelectItem value="AB-">AB-</SelectItem>
										<SelectItem value="B+">B+</SelectItem>
										<SelectItem value="B-">B-</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 9 */}
					<FormField
						control={form.control}
						name="religion"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Religion</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} >
									<FormControl>
										<SelectTrigger className='w-72'>
											<SelectValue placeholder="Select your religion" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='w-72'>
										<SelectItem value="Islam">Islam</SelectItem>
										<SelectItem value="Hinduism">Hinduism</SelectItem>
										<SelectItem value="Buddhism">Buddhism</SelectItem>
										<SelectItem value="Christianity">Christianity</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 10 */}
					<FormField
						control={form.control}
						name="ethnicity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ethnicity </FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your ethnicity" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 11 */}
					<FormField
						control={form.control}
						name="nationality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nationality </FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your nationality" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 12 */}
					<FormField
						control={form.control}
						name="father_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Father's Name</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your father's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 13 */}
					<FormField
						control={form.control}
						name="father_name_bn"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Father's Name(in Bangla)</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your father's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 14 */}
					<FormField
						control={form.control}
						name="mother_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mother's Name</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your mother's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 15 */}
					<FormField
						control={form.control}
						name="mother_name_bn"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mother's Name(in Bangla)</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your mother's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* 16 */}
					<FormField
						control={form.control}
						name="guardian_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Guardian's Name</FormLabel>
								<FormControl>
									<Input className='w-72' placeholder="Enter your guardian's name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}

const AddressInfoForm = ({ form, onSubmit }: { form: UseFormReturn<z.infer<typeof formSchema>>, onSubmit: () => void }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col flex-wrap gap-4 w-7/12">
				{/* 1 */}
				<div className='flex flex-col w-full gap-8'>
					<h1 className='text-xl text-black font-semibold'>Edit Guardian Address</h1>
					<div className='flex flex-row flex-wrap gap-6'>
						<FormField
							control={form.control}
							name="guardianAdress.country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country </FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 2 */}
						<FormField
							control={form.control}
							name="guardianAdress.district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 3 */}
						<FormField
							control={form.control}
							name="guardianAdress.division"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Division </FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 4 */}
						<FormField
							control={form.control}
							name="guardianAdress.post_office"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Post Office</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 5 */}
						<FormField
							control={form.control}
							name="guardianAdress.postal_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 6 */}
						<FormField
							control={form.control}
							name="guardianAdress.thana"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thana </FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 7 */}
						<FormField
							control={form.control}
							name="guardianAdress.union_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Union </FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 8 */}
						<FormField
							control={form.control}
							name="guardianAdress.upazila"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upazilla </FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 9 */}
						<FormField
							control={form.control}
							name="guardianAdress.village"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Village</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Guardian address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				{/* 1 */}
				<div className='flex flex-col w-full gap-8'>
					<h1 className='text-xl text-black font-semibold'>Edit Permanent Address</h1>
					<div className='flex flex-row flex-wrap gap-6'>

						<FormField
							control={form.control}
							name="permanentAdress.country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 2 */}
						<FormField
							control={form.control}
							name="permanentAdress.district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 3 */}
						<FormField
							control={form.control}
							name="permanentAdress.division"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Division</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 4 */}
						<FormField
							control={form.control}
							name="permanentAdress.post_office"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Post Office</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 5 */}
						<FormField
							control={form.control}
							name="permanentAdress.postal_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 6 */}
						<FormField
							control={form.control}
							name="permanentAdress.thana"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thana</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 7 */}
						<FormField
							control={form.control}
							name="permanentAdress.union_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Union</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 8 */}
						<FormField
							control={form.control}
							name="permanentAdress.upazila"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upazilla</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 9 */}
						<FormField
							control={form.control}
							name="permanentAdress.village"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Village</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter Permenant address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className='flex flex-col w-full gap-8'>

					<h1 className='text-xl text-black font-semibold'>Edit Present Address</h1>
					<div className='flex flex-row flex-wrap gap-6'>

						{/* 1 */}
						<FormField
							control={form.control}
							name="presendAdress.country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 2 */}
						<FormField
							control={form.control}
							name="presendAdress.district"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 3 */}
						<FormField
							control={form.control}
							name="presendAdress.division"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Division</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 4 */}
						<FormField
							control={form.control}
							name="presendAdress.post_office"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Post Office</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 5 */}
						<FormField
							control={form.control}
							name="presendAdress.postal_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 6 */}
						<FormField
							control={form.control}
							name="presendAdress.thana"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thana</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 7 */}
						<FormField
							control={form.control}
							name="presendAdress.union_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Union</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 8 */}
						<FormField
							control={form.control}
							name="presendAdress.upazila"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Upazilla</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* 9 */}
						<FormField
							control={form.control}
							name="presendAdress.village"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Village</FormLabel>
									<FormControl>
										<Input className='w-72' placeholder="Enter present address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</form>
		</Form>
	)
}

const HallInfoForm = ({ form, onSubmit }: { form: UseFormReturn<z.infer<typeof formSchema>>, onSubmit: () => void }) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col flex-wrap gap-4 w-7/12">
				<div className='flex flex-row items-center w-full justify-start'>
					<FormField
						control={form.control}
						name="hall_name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hall</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value} >
									<FormControl>
										<SelectTrigger className='w-72'>
											<SelectValue placeholder="Select your hall" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='w-72'>
										<SelectItem value="Shaheed Abdur Rab Hall">Shaheed Abdur Rab Hall</SelectItem>
										<SelectItem value="Alaol Hall">Alaol Hall</SelectItem>
										<SelectItem value="A. F. Rahman Hall">A. F. Rahman Hall</SelectItem>
										<SelectItem value="Shahjalal Hall">Shahjalal Hall</SelectItem>
										<SelectItem value="Suhrawardy Hall">Suhrawardy Hall</SelectItem>
										<SelectItem value="Shah Amanat Hall">Shah Amanat Hall</SelectItem>
										<SelectItem value="Shamsunnahar Hall">Shamsunnahar Hall</SelectItem>
										<SelectItem value="Pritilota Hall">Pritilota Hall</SelectItem>

									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}

const ImageInfoForm = () => {
	const pervImage = useImageStore((state) => state.image);
	const setImageStore = useImageStore((state) => state.setImage);
	const [image, setImage] = useState<string | null>(pervImage);
	const [error, setError] = useState<string | null>(null);


	const validateFile = (file: File): boolean => {
		const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
		if (!validTypes.includes(file.type)) {
			setError('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
			return false;
		}
		if (file.size > 5 * 1024 * 1024) { // 5MB limit
			setError('File size exceeds 5MB limit.');
			return false;
		}
		return true;
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setError(null);

		if (file) {
			if (validateFile(file)) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setImage(reader.result as string);
					setImageStore(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setError(null);
		setImageStore(null);
	};

	return (
		<div className="max-w-md mx-auto p-4">
			<Label htmlFor="image-upload" className="block mb-2">
				Upload Image (JPEG, PNG, or GIF, max 5MB)
			</Label>
			<Input
				id="image-upload"
				type="file"
				accept="image/jpeg,image/png,image/gif"
				onChange={handleImageChange}
				className="mb-4"
			/>
			{error && (
				<Label className="block text-warning-foreground" htmlFor="image-upload">
					{error}
				</Label>
			)}
			{image ? (
				<div className="relative flex items-center justify-center">
					<img
						src={image}
						alt="Uploaded preview"
						className="w-40 h-40 rounded-full"
					/>
					<Button
						variant="outline"
						size="icon"
						className="absolute top-2 right-16"
						onClick={handleRemoveImage}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default Home