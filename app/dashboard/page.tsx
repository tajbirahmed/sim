"use client"; 

import React, { useEffect } from "react";
import "./Dashboard.css"; // Import the CSS file
import "@/components/BarChart";
import BarChart from "@/components/BarChart";
import NavigateComp from "@/components/NavigateComp";
import { useSessionStore } from "@/store/SessionStore";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useSemesterResultStore } from "@/store/semesterResultStore";
import { getAllResults } from "@/util/getAllReqults";

const Dashboard = () => {

	const student = useSessionStore((state) => state.student);

	useEffect(() => {
		if (student) {
			getAllResults(student.student_id)
		}
	}, [student])


	if (student === undefined) {
		return <LoadingScreen />
	}

	const getSemester = () : string => {
		const semester = parseInt(student.academic_session_id.toString().slice(4, 6));
		if (semester === 1) {
			return "1st";
		}
		else if (semester === 2) {
			return "2nd";
		}
		else if (semester === 3) {
			return "3rd";
		}
		else {
			return semester + "th";
		}

	}

	return (
		<div className="w-full flex flex-col h-[94vh] overflow-y-auto no-scrollbar pt-6 ml-5">
			<NavigateComp title="Dashboard" profile={true} dashboard={true} />
			<p className="text-lg font-bold text-gray-800 self-center mr-96">
				Welcome, <span className="text-blue-500">{student.first_name+ " " + student.last_name}</span>
			</p>

			<div className="grid grid-cols-3 gap-20 pl-52">
				{/* Semester */}
				<div className="card bg-slate-100 flex-row p-8">
					<h2 className="title">Semester</h2>
					<p className="bg-slate-100">
						<span className="text-indigo-500">Semester: {getSemester()}</span>
					</p>
				</div>

				{/* Department */}
				<div className="bg-slate-100 card flex-row p-8">
					<h2 className="title ">Department</h2>
					<p className="bg-slate-100">
						<span className="text-indigo-500">{student.department_abbr}</span>
					</p>
				</div>

				{/* Upcoming Events */}
			</div>
			<div className="ml-40 mt-4">
				<BarChart 
				/>
			</div>
		</div>
	);
};

export default Dashboard;
