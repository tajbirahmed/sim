import React from 'react';

const ResultTable = () => {
  // Sample data for demonstration
  const semesterResults = [
    { course: 'Mathematics', grade: 'A' },
    { course: 'Physics', grade: 'B' },
    { course: 'Chemistry', grade: 'A-' },
    // Add more courses and grades as needed
  ];

  return (
    <div>
      <h2>Result Table</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Course</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {semesterResults.map((result, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{result.course}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
