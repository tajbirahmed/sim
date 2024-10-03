import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { StudentPost} from './_DummyReminder';
import { Download, MoreVertical, SendHorizonal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { format } from 'date-fns';

const PostsContiner = ({ 
    postId,
    author,
    postContent,
    authorImageUrl,
    postDate,
    files, 
} : StudentPost) => {
    const openFileInNewTab = (base64File: string) => {
        const newTab = window.open();
        if (newTab) {
            const fileType = base64File.split(';')[0].split(':')[1];
            if (fileType.startsWith('image/')) {
                newTab.document.body.innerHTML = `<img src="${base64File}" alt="Image" style="max-width: 100%; height: auto;"/>`;
            } else if (fileType === 'application/pdf') {
                newTab.document.body.innerHTML = `<iframe src="${base64File}" style="width: 100%; height: 100vh;" frameborder="0"></iframe>`;
            } else {
                newTab.document.body.innerHTML = `<a href="${base64File}" download>Download File</a>`;
            }
        }
    };
  return (
      <div className="flex flex-col space-y-2 px-5 py-3 border-[0.2px] border-black dark:border-white rounded-md
        shadow-sm shadow-black dark:shadow-white w-11/12 self-center
    ">
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
                          {format(postDate, "PPP")}      
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
          
        
        {/* comment component */}
        <hr className="w-full" />
        <h1 className='text-black text-base font-medium'>Files: </h1>
        <div className='flex flex-col gap-2 w-full h-20 overflow-scroll'>
            {files?.map((fileName, ind) => (
                <div key={ind} className="flex flex-row w-full gap-x-8 justify-between">
                    <p className="font-medium text-black dark:text-white overflow-hidden">File: {ind}</p>
                    <Button
                        variant={"link"}
                        onClick={() => openFileInNewTab(fileName)}
                    >
                        <Download size={20} className="text-black dark:text-white" />
                    </Button>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default PostsContiner;