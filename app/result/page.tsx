import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={`text-xl font-semibold h-12 w-48 rounded-xl hover:bg-gray-400 hover:text-white flex items-center justify-between px-4 ${className}`}>
      <span>{children}</span>
    </button>
  );
};

const Result = () => {
  const semesters = [
    { name: "8th Semester", link: "../result/resultid" },
    { name: "7th Semester", link: "../result/resultid" },
    { name: "6th Semester", link: "../result/resultid" },
    { name: "5th Semester", link: "../result/resultid" },
    { name: "4th Semester", link: "../result/resultid" },
    { name: "3rd Semester", link: "../result/resultid" },
    { name: "2nd Semester", link: "../result/resultid" },
    { name: "1st Semester", link: "../result/resultid" },
  ];

  return (
    <div className="ml-[300px] flex flex-col items-center"> 
      <div className="ml-10">
        <p className="font-semibold text-xl pb-4 pt-10">Please select a semester from the dropdown box to see your results:</p>
      </div>
      <DropdownMenu>
        <div className="relative inline-block">
          <DropdownMenuTrigger className="font-semibold text-xl border-2 border-gray-300 rounded-md px-8 py-2 cursor-pointer pr-8">
            Choose Semester
            <ChevronDown className="text-gray-600 absolute top-1/2 right-0 transform -translate-y-1/2 mr-2" />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="pl-10 justify-center font-semibold text-2xl w-48">
          {semesters.map((semester, index) => (
            <Link href={semester.link} key={index}> {/* Wrap DropdownMenuItem in Link */}
              <DropdownMenuItem className="hover:bg-gray-400"> {/* Add hover:bg-gray-400 class */}
                {semester.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Result;
