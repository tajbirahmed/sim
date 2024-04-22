import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Settings } from "lucide-react"
import { semesterData } from "./_semesterWithValue"

export default function SettingPopOver() { 
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Settings size={18} className='text-black dark:text-white pt-[2px]' />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 self-end">
                <Card className="w-[250px]">
                    <CardHeader>
                        <CardTitle>Select Semester</CardTitle>
                        <CardDescription>Select your semester to see announcement</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {semesterData.map((val, ind) => (
                                    <SelectItem value={val.value}>{ val.semester} </SelectItem>

                                ))}                                
                            </SelectContent>
                        </Select>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Done</Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}