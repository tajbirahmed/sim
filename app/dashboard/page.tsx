import React from "react";
import "./Dashboard.css"; // Import the CSS file
import "@/components/BarChart";
import BarChart from "@/components/BarChart";

export default function Dashboard() {
  return (
    <div className="w-full  flex flex-col  ">
      {/* Welcome Message */}
      <p className="text-lg font-bold text-gray-800 ">
        Welcome, <span className="text-blue-500">John Doe!</span>
      </p>

      <div className="grid grid-cols-3 gap-0 ml-20 ">
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
        <div className="card bg-slate-100  p-7 ">
          <h2 className="title ">Upcoming Events</h2>
          <p className="text-gray-600">
            <span className="text-indigo-500">2 New Events</span>
          </p>
        </div>
      </div>
      <div className="ml-40 mt-0">
        <BarChart />
      </div>
    </div>
  );
}
