"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SemesterContext } from "@/contexts/SemesterContexts"
import { SemesterHelper } from "@/utils/SemesterHelper";
import { Plus, PlusIcon, X } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns";

export function CreateAnnouncement() {
    const { semester } = useContext(SemesterContext)!;
    const [post, setPost] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const limitString = (text: string): string => {
        if (text.length <= 7) {
            return text;
        }

        return text.substring(0, 12) + '...';
    }
    const { toast } = useToast();
    
    const getData = async () => { 
        const date = format('2024-07-06', 'yyyy-MM-dd HH:mm:ss');
        console.log(date);
        
        const announcement = {
            academic_session_id: 20180301,
            announcement: "Testing announcement using post 2",
            date: date,
            student_id: 19701037
        }
        const result = await fetch(
            `http://localhost:5000/api/student-info/announcement`, 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(announcement),
            }
        )
        const response = await result.json();
        console.log(response)
        
    }
    useEffect(() => { 
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file)
        })
        getData()
    }, [])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="hover:bg-slate-200 hover:rounded-xl">
                    <Plus size={19} className='text-black dark:text-white pt-[2px]' />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[1000px] max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Make an announcement</DialogTitle>
                    <DialogDescription>
                        This announcement will be posted to {semester}<sup>{SemesterHelper(semester)}</sup> semester
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="font-medium">
                            <em>Announcement</em>
                        </Label>
                        <Textarea
                            id="post"
                            placeholder="Whats on your mind?"
                            className="col-span-5 placeholder:italic placeholder:text-slate-400 "
                            rows={4}
                            value={post}
                            onChange={(e) => { setPost(e.target.value)}}
                        />
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <Label htmlFor="name" className="font-medium">
                            <em>Attach Files</em>
                        </Label>
                        <Input 
                            type="file"
                            className="w-28 text-center" 
                            name="Upload files"
                            multiple
                            onChange={(e) => { 
                                if (e.target.files) {
                                    const file = Array.from(e.target.files); 
                                    if (file.length <= 8) {

                                        setFiles((prev) => [...prev, ...file]);
                                    } else {

                                    }
                                }    
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {files ?  (
                            files.map((val, ind) => (
                            <div className="flex flex-row w-80 gap-x-8 justify-between">
                                    <p className="font-medium text-black dark:text-white overflow-hidden">{limitString(val.name)}</p>
                                    <p className="font-medium text-black dark:text-white">{val.size}bytes</p>
                                    <button>
                                        <X size={20} className="text-black dark:text-white" onClick={() => {
                                            const newFiles = files.filter((_, index) => index !== ind)
                                            setFiles(newFiles)
                                        }} />
                                    </button>
                            </div>
                        ))
                        ) : (null)}
                    </div>
                </div>
                <DialogClose className="flex flex-row justify-end items-center">
                <Button type="submit" onClick={() => { 
                        toast({
                            title: "Announcement Successfull Uploaded",
                            description: "It will show in the announce section any minute",
                            action: (
                                <ToastAction altText="Review Announcement">Review</ToastAction>
                            ),
                        })
                        // Add Post Submission 
                     }}>Post</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
