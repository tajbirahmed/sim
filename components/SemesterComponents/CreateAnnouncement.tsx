"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SemesterContext } from "@/contexts/SemesterContexts"
import { SemesterHelper } from "@/utils/SemesterHelper";
import { Plus, X } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns";
import { AxiosInstance } from "@/utils/AxiosInstance";
import { toast as Toast } from 'sonner';
import { useSessionStore } from "@/store/SessionStore";
import { StudentPost } from "./_DummyReminder";
import { useStudentPostStore } from "@/store/StudentPostStore";



export function CreateAnnouncement() {
    const { semester } = useContext(SemesterContext)!;
    const [post, setPost] = useState<string>('');
    const [files, setFiles] = useState<string[]>([]);
    const { toast } = useToast();

    const student = useSessionStore((state) => state.student);
    const setStudent = useSessionStore((state) => state.setStudent);
    const addPost = useStudentPostStore((state) => state.addPost);
     
    const limitString = (text: string): string => {
        if (text.length <= 7) {
            return text;
        }
        return text.substring(0, 12) + '...';
    }



	// const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = e.target.files?.[0];

	// 	if (file) {
	// 		if (validateFile(file)) {
	// 			const reader = new FileReader();
	// 			reader.onloadend = () => {

    //             };
	// 			reader.readAsDataURL(file);
	// 		}
	// 	}
	// };

    const postAnnouncement = async () => {
        if (student === undefined) {
            return Toast.error("Error", {
                cancel: true,
                description: "Student information not found",
                duration: 5000
            });
        }

        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

        const newPost: StudentPost = {
            postId: Date.now(), 
            author: student.first_name + ' ' + student.last_name,
            postContent: post,
            postDate: currentDate,
            files: files
        };

        try {
                addPost(newPost);
                setPost('');
                setFiles([]);
        } catch (error) {
            Toast.error("Error", {
                cancel: true,
                description: "Failed to post announcement. Please try again.",
                duration: 5000
            });
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            if (fileList.length <= 8) {

                const fileNames = fileList.map((file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setFiles(prev => [...prev, reader.result as string]);
                    }
                    reader.readAsDataURL(file);
                });
            } else {
                Toast.error("Error", {
                    cancel: true,
                    description: "You can only upload up to 8 files.",
                    duration: 5000
                });
            }
        }
    }

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
                            placeholder="What's on your mind?"
                            className="col-span-5 placeholder:italic placeholder:text-slate-400"
                            rows={4}
                            value={post}
                            onChange={(e) => { setPost(e.target.value) }}
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
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {files.map((fileName, ind) => (
                            <div key={ind} className="flex flex-row w-80 gap-x-8 justify-between">
                                <p className="font-medium text-black dark:text-white overflow-hidden">{limitString(fileName)}</p>
                                <button>
                                    <X size={20} className="text-black dark:text-white" onClick={() => {
                                        setFiles(files.filter((_, index) => index !== ind));
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <DialogClose className="flex flex-row justify-end items-center">
                    <Button type="submit" onClick={postAnnouncement}>Post</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}