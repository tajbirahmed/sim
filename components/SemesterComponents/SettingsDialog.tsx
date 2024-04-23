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
import { useContext } from "react"
import { SemesterContext } from "@/contexts/SemesterContexts"

export default function SettingPopOver() { 
    const { semester, setSemester } = useContext(SemesterContext)!
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="link" className="hover:bg-slate-200 hover:rounded-xl">
                    <Settings size={18} className='text-black dark:text-white pt-[2px]' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 self-end">
                <Card className="w-[250px]">
                    <CardHeader>
                        <CardTitle>Select Semester</CardTitle>
                        {/* <CardDescription>Select your semester to see semister specific announcement</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={semester.toString()}
                            onValueChange={e => setSemester(parseInt(e)) }
                        >   
                            <SelectTrigger id="semester">
                                <SelectValue placeholder="Select semester"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {semesterData.map((val, ind) => (
                                    <SelectItem key={ ind } value={val.value.toString()}>{ val.semester} </SelectItem>
                                ))}                                
                            </SelectContent>
                        </Select>
                    </CardContent>
                    {/* <CardFooter className="flex justify-end">
                        <Button>
                            Done
                        </Button>
                    </CardFooter> */}
                </Card>
            </PopoverContent>
        </Popover>
    )
}