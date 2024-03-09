"use client";
import SideBar from "@/components/ResultComponents/SideBar";
import React, { useState } from "react";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false); 
  return (
    <div className="flex flex-row">
      <SideBar
        toggleSidebar={toggleSideBar}
        setToggleSideBar={ setToggleSideBar}
      />
      { children }
    </div>
  )
}