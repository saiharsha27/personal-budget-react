import React, { useEffect, useRef } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

function ChartJS({ chartData }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Budget Distribution',
            data: chartData.data,
            backgroundColor: [
              '#4caf50', 
              '#2196f3', 
              '#ff9800', 
              '#9c27b0', 
              '#e91e63', 
              '#00bcd4', 
              '#ffc107'  
            ],
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          }
        }
      }
    });
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} width="400" height="400"></canvas>;
}

export default ChartJS;
