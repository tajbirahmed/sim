"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { useSemesterResultStore } from "@/store/semesterResultStore";

export default function BarChart() {
  const results = useSemesterResultStore((state) => state.results);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const data = results.map((val, ind) => {
      return val.cgpa;
    })
    const context = chartRef.current.getContext("2d");
    const newChart = new Chart(context, {
      type: "bar",
      data: {
        labels: ["1st Sem.", "2nd Sem.", "3rd Sem.","4th Sem.","5th Sem.","6th Sem.", "7th Sem.", "8th Sem."],
        datasets: [
          {
            label: "Result",
            data: data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 164)",
              "rgb(121, 99, 132)",
              "rgb(255, 99, 122)",
              "rgb(121, 159, 164)",
              "rgb(255, 99, 132)"
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    chartInstanceRef.current = newChart;
  }, []);

  if (results === undefined) {
    return <p>Error fethcing results.</p>;
  }

  return (
    <div style={{ position: "relative", width: "60vw", height: "80vw" }}>
      <canvas ref={chartRef} />
    </div>
  );
}