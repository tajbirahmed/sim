"use client";
import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ProfileImageUrlContextType {
    profileImageUrl: string,
    setProfileImageUrl: (profileImageUrl: string) => void
}

const ProfileImageUrlContext = createContext<ProfileImageUrlContextType | null>(null);

interface ProfileImageUrlContextProps {
    children: ReactNode
}

const ProfileImageUrlProvider: FC<ProfileImageUrlContextProps> = ({ children }) => {
    const [profileImageUrl, setProfileImageUrl] = useState<string>('https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg.webp');
    return (
        <ProfileImageUrlContext.Provider value={{
            profileImageUrl,
            setProfileImageUrl
        }}>
            {children}
        </ProfileImageUrlContext.Provider>
    )
}

const useProfileImage = () => {
    const context = useContext(ProfileImageUrlContext);
    if (context === null) {
        throw new Error('useProfileImage must be used within an ProfileImageUrlProvider');
    }
    return context;
}

export { ProfileImageUrlProvider, useProfileImage }