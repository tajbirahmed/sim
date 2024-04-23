"use clinet";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { format } from "date-fns";


interface ResultCardProps { 
    semester: number;
}

export function ResultCard({ semester }: ResultCardProps) {
    const [pubdate, setpubDate] = React.useState<Date>(new Date())
    return (
        <Card className="w-9/12 justify-center">
            <CardHeader >
                <CardTitle className="text-center">{semester}<sup className="">{semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"}</sup>{" Semester"} Result</CardTitle>
                <CardDescription>Published Date: { format(pubdate, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* TODO: Table */}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Download</Button>
            </CardFooter>
        </Card>
    )
}
