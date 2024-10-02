import { LoaderIcon } from "lucide-react"

export const LoadingScreen = () => {
	return (
		<div className='w-full h-full flex flex-row  items-center justify-center gap-2'>
			<LoaderIcon className='animate-spin text-black' />
			<p className='text-base font-medium text-black'>Loading...</p>
		</div>
	)
}