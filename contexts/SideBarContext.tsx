"use client"; 

import React, { useState, createContext } from "react"; 

interface SideBarProps { 
    content: string; 
    setContent: (content : string) => void
}

export const SideBarContext = createContext<SideBarProps | undefined>(undefined)

export const SideBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
    const [content, setContent] = useState("home")
    return (
        <SideBarContext.Provider value={{content, setContent}}>
            { children }
        </SideBarContext.Provider>
    )
}