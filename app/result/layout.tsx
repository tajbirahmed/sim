"use client";
import React, { useState } from "react";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false); 
  return (
    <div className="flex flex-row">
      { children }
    </div>
  )
}