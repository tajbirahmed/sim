import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ResultDataType } from "@/types/ResultTypes";
import { Student } from "@/types/StundentType"; // Ensure the correct path

// Function to convert image URL to base64
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

const getGrade = (gpa: number): string => {
    if (gpa === 4.00) {
        return "A+";
    } else if (gpa >= 3.75) {
        return "A";
    } else if (gpa >= 3.5) {
        return "A-";
    } else if (gpa >= 3.25) {
        return "B+";
    } else if (gpa >= 3.0) {
        return "B";
    } else if (gpa >= 2.75) {
        return "B-";
    } else if (gpa >= 2.5) {
        return "C+";
    } else if (gpa >= 2.25) {
        return "C";
    } else if (gpa >= 2.0) {
        return "D";
    } else {
        return "F";
    }
};

export const generate_pdf = async (resultData: ResultDataType[], studentData: Student, semester: number) => {
    const doc = new jsPDF("l");

    // Load the logo image
    const logoBase64 = await getImageBase64('/logo.png');
    if (!logoBase64) {
        console.error('Failed to load logo image');
        return;
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const logoWidth = 18;
    const logoHeight = 24;

    // Add the logo at the top center
    doc.addImage(logoBase64, 'PNG', (pageWidth - logoWidth) / 2, 6, logoWidth, logoHeight);

    // Add title
    doc.setFontSize(14);
    doc.text(`${semester}${semester === 1 ? 'st' : semester === 2 ? 'nd' : semester === 3 ? 'rd' : 'th'} Semester Result`, 126, 56);

    // Add student information
    doc.setFontSize(12);
    const departmentText = `Department of ${studentData.department_name}`;
    const textWidth = doc.getTextWidth(departmentText);
    const textX = (pageWidth - textWidth) / 2;

    doc.text(`Name: ${studentData.first_name}`, 14, 64);
    doc.text(departmentText, textX, 47);
    doc.text(`Student ID: ${studentData.student_id}`, 14, 72);
    doc.text(`Hall: ${studentData.hall_name}`, 14, 80);
    doc.text(`${studentData.university_name}`, 129, 38);

    // Add published date
    const pubDate = new Date();
    doc.text(`Published Date: ${pubDate.toLocaleDateString()}`, 14, 200);

    // Define the table columns and data
    const tableStyles = {
        headStyles: {
            fillColor: [255, 255, 255], // White background for header
            textColor: [0, 0, 0],       // Black text for header
            fontSize: 12,
            lineWidth: 0.3,              // Adjust line width for borders (optional)
            lineColor: [0, 0, 0],
            halign: 'center',
        },
        bodyStyles: {
            fontSize: 10,
        },
    };
    const columns = [
        { title: "Course Code", dataKey: "course_code" },
        { title: "Course Title", dataKey: "course_title" },
        { title: "Credits", dataKey: "credit" },
        { title: "Letter Grade", dataKey: "letter_grade" },
        { title: "Grade Point", dataKey: "gpa" },
        { title: "Credit Points", dataKey: "credit_points" },
    ];

    const data = resultData.map(val => ({
        course_code: val.course_code,
        course_title: val.course_title,
        credit: val.credit,
        letter_grade: getGrade(val.gpa),
        gpa: val.gpa,
        credit_points: val.gpa * val.credit,
    }));

    // Add the table to the PDF
    (doc as any).autoTable({
        head: [columns.map(col => col.title)],
        body: data.map(row => Object.values(row)),
        startY: 90,
        ...tableStyles,                // Apply the defined table styles
    });

    // Save the PDF
    doc.save('result.pdf');
};
