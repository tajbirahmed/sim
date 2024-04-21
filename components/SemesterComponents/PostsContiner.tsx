import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { StudentPost, Comment } from './_DummyReminder';
import { MoreVertical, SendHorizonal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PostsContiner = ({ 
    postId,
    author,
    postContent,
    authorImageUrl,
    postDate,
    files, 
    comment
} : StudentPost) => {
  return (
      <div className="flex flex-col space-y-2 px-5 py-3 border-[1px] border-black dark:border-white rounded-md
        shadow-xs shadow-black dark:shadow-white
    ">
        {/* post author */}
        <div className="flex flex-row justify-between">
            <div className="flex flex-row space-x-3">
                <Avatar className={'rounded-full h-8 w-8'}>
                    <AvatarImage src={authorImageUrl} alt="@shadcn" />
                    <AvatarFallback className={'rounded-lg text-[#0c4c6c] dark:text-white'}>PP</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-[1px] pt-[2px]">
                    <p className="text-black dark:text-white font-semibold text-[14px]">
                          { author}  
                    </p>
                    <p className="text-black dark:text-white font-normal text-[13px]">
                          {postDate.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                          })}      
                    </p>  
                </div>  
              </div>
              <DropdownMenu >
                  <DropdownMenuTrigger asChild>
                      <MoreVertical size={20} className="text-black dark:text-white pt-[2px] hover:bg-slate-200 hover:rounded-full w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-[14px]">
                          Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-[14px]">
                          Report abuse
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>   
        </div>  
        {/* post */}
        <p className="text-[16px] font-normal">
              { postContent}
        </p>
          
        {/* files component */}
        {/* comment component */}
        <hr className="w-full" />
        <div className='flex flex-row space-x-3 pt-3'>
              <Avatar className={'rounded-full h-8 w-8'}>
                  <AvatarImage src={authorImageUrl} alt="@shadcn" />
                  <AvatarFallback className={'rounded-lg text-[#0c4c6c] dark:text-white'}>PP</AvatarFallback>
              </Avatar>
              <input type="text" placeholder='Add a comment' className='rounded-lg border-[0.5px] w-full placeholder:text-[14px] pl-1' />
              <div className='self-center'>  
                  <SendHorizonal size={18} className='text-black dark:text-white' />
              </div>
        </div>  
    </div>
  )
}

export default PostsContiner;