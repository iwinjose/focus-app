// src/components/ExportData.js
import React, { useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Exportdata.css';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ExportData = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const dailyChartRef = useRef(null);

  // Sample data for weekly charts
  const weeklyFocusData = [60, 70, 65, 75, 80, 85, 90];
  const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  // Data for weekly charts
  const focusData = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Focus Level (%)",
        data: weeklyFocusData,
        backgroundColor: "rgba(0, 123, 255, 0.3)",
        borderColor: "#007bff",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#007bff",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Weekly Focus Level (%)",
        data: weeklyFocusData,
        backgroundColor: "rgba(0, 200, 100, 0.6)",
        borderColor: "#00c864",
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the daily chart (current day data)
  const currentDayFocusData = [30, 50, 80, 120, 160, 180, 200]; // Example of daily focus data
  const timeLabels = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

  // Data structure for the daily chart
  const dailyFocusData = {
    labels: timeLabels,
    datasets: [
      {
        label: `Focus Level for ${new Date().toLocaleDateString()}`,
        data: currentDayFocusData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Focus Level (%)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
        title: {
          display: true,
          text: "Focus Level",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const handleDownload = (ref, chartName) => {
    html2canvas(ref.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${chartName}.png`;
      link.click();
    });
  };

  return (
    <div className="export-data-container">
      <h2>Export Focus Charts</h2>
      <div className="charts-container">
        {/* Weekly Focus Line Chart */}
        <div className="chart-item">
          <h3>Weekly Focus Level Line Chart</h3>
          <div className="chart-wrapper" ref={chartRef1}>
            <Line data={focusData} options={chartOptions} />
          </div>
          <button onClick={() => handleDownload(chartRef1, 'weekly_focus_line')}>Download Image</button>
        </div>

        {/* Weekly Focus Bar Chart */}
        <div className="chart-item">
          <h3>Weekly Focus Level Bar Chart</h3>
          <div className="chart-wrapper" ref={chartRef2}>
            <Bar data={barChartData} options={chartOptions} />
          </div>
          <button onClick={() => handleDownload(chartRef2, 'weekly_focus_bar')}>Download Image</button>
        </div>

        {/* Daily Focus Chart (Current Day) */}
        <div className="chart-item">
          <h3>Daily Focus Level for {new Date().toLocaleDateString()}</h3>
          <div className="chart-wrapper" ref={dailyChartRef}>
            <Line data={dailyFocusData} options={dailyChartOptions} />
          </div>
          <button onClick={() => handleDownload(dailyChartRef, 'daily_focus')}>Download Image</button>
        </div>
      </div>
    </div>
  );
};

export default ExportData;

