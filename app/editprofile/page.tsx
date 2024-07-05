import NavigateComp from '@/components/NavigateComp'
import React from 'react'

const Home = () => {
  return (
      <div className='flex flex-col ml-5  h-[94vh] overflow-y-auto w-full no-scrollbar pt-6'>
          <NavigateComp
              title="Edit profile"
              // make={true}
              dashboard={true}
          />
            asda 
        </div>
  )
}

export default Home