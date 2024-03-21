import React from 'react';

const ResultTable = () => {

  const semesterResults = [
    { semester: 'Spring 2023', cgpa: 3.5, publishDate: '03/20/2024', status: 'Published' },
    // Add more semester results as needed
  ];

  return (
    <div className="flex pl-80 justify-center pt-20">
      <div>
        <h2 className="flex justify-center font-bold text-xl">Semester Results</h2>
        {semesterResults.map((result, index) => (
           <div key={index} className="border border-gray-400 p-4 mb-4 rounded-xl w-[600px]">
           <h3 className="font-bold">Semester: {result.semester}</h3>
           <p>CGPA: {result.cgpa}</p>
           <p>Publish Date: {result.publishDate}</p>
           <p>Status: {result.status}</p>
           <div className="justify-center flex">
           <button className="bg-blue-900 w-[120px] hover:bg-white hover:text-black hover:border-black text-white px-4 py-2 rounded-md mt-2 border-2 rounded-md border-transparent transition-colors duration-300 ease-in-out">
 Details
</button>
</div>
         </div>
        ))}
      </div>
    </div>
  );
};

export default ResultTable;
