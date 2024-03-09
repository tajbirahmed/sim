import React from 'react';

const ResultTable = () => {

  const semesterResults = [
    { courseid: 'CSE 101', course: 'Introduction to Computer Science', grade: 'A', gradeValue: 4.0 },
    { courseid: 'CSE 102', course: 'Data Structures and Algorithms', grade: 'B', gradeValue: 3.0 },
    { courseid: 'CSE 103', course: 'Database Management Systems', grade: 'A-', gradeValue: 3.7 },
    { courseid: 'CSE 104', course: 'Operating Systems', grade: 'B+', gradeValue: 3.3 },
    { courseid: 'CSE 105', course: 'Software Engineering', grade: 'A', gradeValue: 4.0 },
    { courseid: 'CSE 106', course: 'Artificial Intelligence', grade: 'A-', gradeValue: 3.7 },
  ];


  const issueDate = new Date().toLocaleDateString();

  return (
    <div className="flex pl-80 justify-center pt-20">
      <div>
        <h2 className="flex justify-center font-bold">Result Table</h2>
        
        
              <div className="pr-2 pb-2">
                Result Issued Date: {issueDate}
              </div>
            
        <table className="border-collapse border border-black w-[700px]">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">CourseID</th>
              <th className="border border-black px-4 py-2">Course</th>
              <th className="border border-black px-4 py-2">Grade</th>
              <th className="border border-black px-4 py-2">GPA</th>
            </tr>
          </thead>
          <tbody>
            {semesterResults.map((result, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{result.courseid}</td>
                <td className="border border-black px-4 py-2">{result.course}</td>
                <td className="border border-black px-4 py-2 pl-12">{result.grade}</td>
                <td className="border border-black px-4 py-2 pl-9">{result.gradeValue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
