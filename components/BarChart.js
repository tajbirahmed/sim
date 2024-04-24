"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const context = chartRef.current.getContext("2d");
    const newChart = new Chart(context, {
      type: "bar",
      data: {
        labels: ["Semester1", "Semester2", "Semester3","Semester3","Semester4","Semester5"],
        datasets: [
          {
            label: "Result",
            data: [3.1, 3.5, 3.2,3.4,3.2,2.7],
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

  return (
    <div style={{ position: "relative", width: "60vw", height: "80vw" }}>
      <canvas ref={chartRef} />
    </div>
  );
}