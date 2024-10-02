import NavigateComp from "@/components/NavigateComp";


export default function ResultRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-9/12">
      <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
        <NavigateComp
          title="Result"
        />
        {children}
      </div>
    </div>
  )
}