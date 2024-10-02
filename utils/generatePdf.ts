import jsPDF from 'jspdf';

// import 'jspdf-autotable';
import { format } from 'date-fns';



export const generatePdf = async ( {
    to='The Deputy Registrar (Academic)',
    subject='Requesting for student information changes',
    changes, 
    student_name,
    student_id,
    student_email,
    student_phone,
    student_session, 
    setLoading
} : {
    subject?: string; 
    to?: string;
    changes: string[];
    student_name: string; 
    student_id: string; 
    student_email: string;
    student_phone: string;
    student_session: string;
    setLoading: (loading: boolean) => void 
}) => {
    setLoading(true);
    const doc = new jsPDF();
    
    // Add the title
    doc.setFontSize(10);  // Smaller font size
    doc.text(format(new Date(), 'MMMM do, yyyy'), 160, 10); // Date in top right corner
    
    // Add header
    doc.setFontSize(10);
    doc.text('To', 20, 30);
    doc.text(to, 20, 35);
    doc.text('University of Chittagong', 20, 40);
    doc.text('Chittagong, Bangladesh', 20, 45);

    
    // Add Subject (Bold)
    doc.setFontSize(10);
    doc.setFont('Times New Roman', 'bold'); // Set font to bold
    doc.text(`Subject: ${subject}`, 20, 65);
    
    doc.setFont('Times New Roman', 'normal'); // Helvatica
    
    const bodyText = `
      Dear Sir,
      
      I hope this letter finds you well. I am writing to request for changes in my student information. 
      I would like to request the following changes:
    `;
    

    const wrappedText = doc.splitTextToSize(bodyText, 180); // 180 is the width of the text block

    doc.text(wrappedText, 20, 75);

    const changesText = changes.map((change, index) => {
        return `${index + 1}. ${change}\n`;
    })
    const wrappedChagesText = doc.splitTextToSize(changesText.join(''), 180);
    doc.text(wrappedChagesText, 20, 100);

    doc.text('I would be grateful if you could make the necessary changes as soon as possible.', 20, 200);

    doc.text('Sincerely,', 20, 210);
    doc.text(`Name: ${student_name}`, 20, 215);
    doc.text(`ID: ${student_id}`, 20, 220);
    doc.text(`Mail: ${student_email}`, 20, 225);
    doc.text(`Phone: ${student_phone}`, 20, 230);
    doc.text(`Session: ${student_session}`, 20, 235);
    setLoading(false);

    doc.save(`request_letter_for_${student_id}.pdf`);
};