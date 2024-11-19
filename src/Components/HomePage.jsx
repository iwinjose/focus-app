import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import './HomePage.css';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: 21,
    EmployeeId: 27615,
    Batch: "A3",
  });

  const [weeklyFocusData, setWeeklyFocusData] = useState(
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
  );
  const [dailyFocusData, setDailyFocusData] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200)),
    }))
  );

  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // Track the selected day for the daily chart

  const labels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
  const timeLabels = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

  useEffect(() => {
    axios
      .get('/api/user/focus-data')
      .then((response) => {
        const { user, weeklyData, dailyData } = response.data;
        setUserData(user);
        setWeeklyFocusData(weeklyData);
        setDailyFocusData(dailyData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const weeklyLineChartData = {
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

  const weeklyBarChartData = {
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

  const weeklyChartOptions = {
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
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        setSelectedDayIndex(clickedIndex); // Update the selected day index for the daily chart
      }
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

  return (
    <div className="home-container">
      {/* User Details */}
      <div className="left-panel">
        <h2>User Details</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>Employee Id:</strong> {userData.EmployeeId}</p>
        <p><strong>Batch:</strong> {userData.Batch}</p>
      </div>

      {/* Weekly Charts */}
      <div className="right-panel">
        <h2>Weekly Focus Level</h2>
        <div className="chart-container">
          <Line data={weeklyLineChartData} options={weeklyChartOptions} />
        </div>
        <div className="chart-container">
          <Bar data={weeklyBarChartData} options={weeklyChartOptions} />
        </div>

        {/* Daily Chart */}
        <div className="left-bottom">
          <h2>Daily Focus Level</h2>
          <h3>{dailyFocusData[selectedDayIndex].day}</h3>
          <div className="chart-container1">
            <Line
              data={{
                labels: timeLabels,
                datasets: [
                  {
                    label: `Focus Level on ${dailyFocusData[selectedDayIndex].day}`,
                    data: dailyFocusData[selectedDayIndex].data,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    pointRadius: 4,
                  },
                ],
              }}
              options={dailyChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
