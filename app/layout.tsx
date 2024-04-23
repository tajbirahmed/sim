import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBarComponents/NavBar";
import FooterBar from "@/components/FooterComponents/FooterBar";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SemesterProvider } from "@/contexts/SemesterContexts";
import { SideBarProvider } from "@/contexts/SideBarContext";

const inter = Inter({ subsets: ["latin"] });
// 1. font selection. 
export const metadata: Metadata = {
    title: "Student Information Management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SideBarProvider>
                        <NavBar />
                        <div className="flex flex-row">
                            <SideBar />
                            <SemesterProvider>
                                {children}
                            </SemesterProvider>

                        </div>
                    </SideBarProvider>
                    {/* <div className="flex-end">
                    <FooterBar />
                </div> */}
                </ThemeProvider>
            </body>
        </html>
    );
}
