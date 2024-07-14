"use client";
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker";

interface CalendarProps {
  date: Date | undefined,
  setDate: (date : Date | undefined) => void,
}

export function CalendarComp({ date, setDate} : CalendarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[350px] text-left font-normal flex flex-row justify-between",
            !date && "text-muted-foreground text-[15px]"
          )}
        >
          
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          {!date ? <CalendarIcon className="h-4 w-4" /> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          
        />
      </PopoverContent>
    </Popover>
  )
}