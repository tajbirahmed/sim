import { useSessionStore } from '@/store/SessionStore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ResultType {
    course_code: string;
    course_title: string;
    course_credit: number;
    letter_grade: string;
    grade_point: number;
    credit_point: number;
} 

const getImageBase64 = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error loading image:', error);
        return '';
    }
};
export const generateResultPdf = async () => {
    const doc = new jsPDF("l");

    const studentData = useSessionStore.getState().student;

    // Load the logo image
    const logoBase64 = await getImageBase64('./logo.png');
    if (!logoBase64) {
        console.error('Failed to load logo image');
        return;
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 18;
    const logoHeight = 24;

    // Add the logo at the top center
    doc.addImage(logoBase64, 'png', (pageWidth - logoWidth) / 2, 6, logoWidth, logoHeight);

    // Add title
    doc.setFontSize(14);
    const semester = 8; 
    doc.text(`${semester}th Semester Result`, 126, 56);

    doc.setFontSize(12);
    const departmentText = `Department of ${studentData?.department_name}`;
    const textWidth = doc.getTextWidth(departmentText);
    const textX = (pageWidth - textWidth) / 2;

    doc.text(`Name: ${studentData?.first_name} ${studentData?.last_name}`, 14, 64);
    doc.text(departmentText, textX, 47);
    doc.text(`Student ID: ${studentData?.student_id}`, 14, 72);
    doc.text(`Hall: ${studentData?.hall_name}`, 14, 80);
    doc.text(`${studentData?.university_name}`, 129, 38);

    // Add published date
    const pubDate = new Date("2024-01-01");
    doc.text(`Published Date: ${pubDate.toLocaleDateString()}`, 14, 200);

    // Table styles
    const tableStyles = {
        headStyles: {
            fillColor: [255, 255, 255] as [number, number, number], // White background for header
            textColor: [0, 0, 0] as [number, number, number],       // Black text for header
            fontSize: 12,
            lineWidth: 0.3,             // Adjust line width for borders (optional)
            lineColor: [0, 0, 0] as [number, number, number],
            halign: 'center' as 'center',
        },
        bodyStyles: {
            fillColor: [255, 255, 255] as [number, number, number], // White background for header
            textColor: [0, 0, 0] as [number, number, number],       // Black text for header
            fontSize: 11,
            lineWidth: 0.3,             // Adjust line width for borders (optional)
            lineColor: [0, 0, 0] as [number, number, number],
            halign: 'center' as 'center',
        },
    };

    // Define the columns
    const columns = [
        { title: "Course Code", dataKey: "course_code" },
        { title: "Course Title", dataKey: "course_title" },
        { title: "Credits", dataKey: "course_credit" },
        { title: "Letter Grade", dataKey: "letter_grade" },
        { title: "Grade Point", dataKey: "grade_point" },
        { title: "Credit Points", dataKey: "credit_point" },
    ];

    // Data for the table
    const resultData = [
        {
            course_code: "CSE 611",
            course_title: "Computer Interfacing and Microcontroller",
            course_credit: 3,
            letter_grade: "A",
            grade_point: 3.75,
            credit_point: 11.25,
        },
        {
            course_code: "CSE 612",
            course_title: "Computer Interfacing and Microcontroller Lab",
            course_credit: 1,
            letter_grade: "A",
            grade_point: 3.5,
            credit_point: 3.5,
        },
        {
            course_code: "CSE 613",
            course_title: "Computer Networks",
            course_credit: 3,
            letter_grade: "A-",
            grade_point: 3.5,
            credit_point: 10.5,
        },
        {
            course_code: "CSE 614",
            course_title: "Computer Networks Lab",
            course_credit: 1,
            letter_grade: "A+",
            grade_point: 4.0,
            credit_point: 4.0,
        },
        {
            course_code: "CSE 615",
            course_title: "Web Engineering and Design",
            course_credit: 3,
            letter_grade: "A-",
            grade_point: 3.5,
            credit_point: 10.5,
        },
        {
            course_code: "CSE 616",
            course_title: "Web Engineering and Design Lab",
            course_credit: 1,
            letter_grade: "A+",
            grade_point: 4.0,
            credit_point: 4.0,
        }
    ];

    // Add the table to the PDF
    autoTable(doc, {
        head: [columns.map(col => col.title)], // Corrected header mapping
        body: resultData.map(item => [
            item.course_code,
            item.course_title,
            item.course_credit,
            item.letter_grade,
            item.grade_point,
            item.credit_point,
        ]),
        startY: 90, // Start after the header
        ...tableStyles, // Apply the custom table styles
    });

    // Save the PDF
    doc.save('result.pdf');
};
