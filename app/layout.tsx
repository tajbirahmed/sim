import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/ThemeProvider";
import { SemesterProvider } from "@/contexts/SemesterContexts";
import { SideBarProvider } from "@/contexts/SideBarContext";
import { ProfileImageUrlProvider } from "@/contexts/ProfileImageContext";


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
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <SideBarProvider>
                        <div className="flex flex-row">
                            <SideBar />
                            <SemesterProvider>
                                <ProfileImageUrlProvider>
                                    {children}
                                </ProfileImageUrlProvider>
                            </SemesterProvider>

                        </div>
                    </SideBarProvider>

                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
