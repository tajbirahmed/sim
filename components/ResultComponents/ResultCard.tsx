import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyResults } from "./DummyResults"; // Adjust the import path

interface ResultCardProps { 
    semester: number;
}

export function ResultCard({ semester }: ResultCardProps) {
    const [pubdate, setpubDate] = React.useState<Date>(new Date())

    return (
        <Card className="w-9/12 justify-center">
            <CardHeader >
                <CardTitle className="text-center">{semester}<sup className="">{semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th"}</sup>{" Semester"} Result</CardTitle>
                <CardDescription  className="text-lg">Published Date: { format(pubdate, "PPP")}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="text-lg">
                            <TableHead className="w-[280px]">Course Name</TableHead>
                            <TableHead className="w-[280px]">Course Code</TableHead>
                            <TableHead>GPA</TableHead>
                            <TableHead className="text-right">Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dummyResults.map((invoice, index) => (
                            <TableRow  className="text-lg" key={index}>
                                <TableCell className="font-medium">{invoice.Course}</TableCell>
                                <TableCell className="pl-8">{invoice.CourseCode}</TableCell>
                                <TableCell>{invoice.GPA}</TableCell>
                                <TableCell className="text-right pr-7">{invoice.Grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Download</Button>
            </CardFooter>
        </Card>
    )
}
