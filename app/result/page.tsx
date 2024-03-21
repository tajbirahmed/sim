import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={`text-xl font-semibold h-[40px] w-[180px] rounded-xl hover:bg-gray-400 hover:text-white ${className}`}>
      {children}
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
        <DropdownMenuTrigger className="font-semibold text-xl">Choose Semester</DropdownMenuTrigger>
        <DropdownMenuContent className="pl-10 justify-center font-semibold text-2xl w-48">
          {semesters.map((semester, index) => (
            <Link href={semester.link} key={index}> {/* Wrap DropdownMenuItem in Link */}
              <DropdownMenuItem>{semester.name}</DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Result;
