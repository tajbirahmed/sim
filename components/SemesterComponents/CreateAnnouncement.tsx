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
import { Plus } from "lucide-react"
import { useContext } from "react"

export function CreateAnnouncement() {
    const { semester } = useContext(SemesterContext)!;
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
                        This announcement will be posted to <p className="font-semibold">{semester}<sup>{SemesterHelper(semester)}</sup> semester</p>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="font-medium">
                            <em>Announcement</em>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Whats on your mind?"
                            className="col-span-10 row-auto placeholder:italic placeholder:text-slate-400"
                            
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
