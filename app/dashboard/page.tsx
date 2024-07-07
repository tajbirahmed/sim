import React from "react";
import "./Dashboard.css"; // Import the CSS file
import "@/components/BarChart";
import BarChart from "@/components/BarChart";
import NavigateComp from "@/components/NavigateComp";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col h-[94vh] overflow-y-auto no-scrollbar pt-6 ml-5">
      <NavigateComp title="Dashboard" profile={true} dashboard={true} />
      <p className="text-lg font-bold text-gray-800 self-center mr-96">
        Welcome, <span className="text-blue-500">John Doe!</span>
      </p>

      <div className="grid grid-cols-3 gap-20 pl-52">
        {/* Semester */}
        <div className="card bg-slate-100 flex-row p-8">
          <h2 className="title">Semester</h2>
          <p className="bg-slate-100">
            <span className="text-indigo-500">Semester: 1st</span>
          </p>
        </div>

        {/* Department */}
        <div className="bg-slate-100 card flex-row p-8">
          <h2 className="title ">Department</h2>
          <p className="bg-slate-100">
            <span className="text-indigo-500">CSE</span>
          </p>
        </div>

        {/* Upcoming Events */}
      </div>
      <div className="ml-40 mt-0">
        <BarChart />
      </div>
    </div>
  );
};

export default Dashboard;
