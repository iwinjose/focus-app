// src/components/ActivityPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Activitypage.css';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ActivityPage = () => {
  const [attentionData, setAttentionData] = useState([]);
  const [attentionScore, setAttentionScore] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyText, setStoryText] = useState("");
  const [timer, setTimer] = useState(60); // Timer for changing stories every 60 seconds
  const chartRef = useRef(null);

  const stories = [
    "Once upon a time in a faraway land, there was a peaceful kingdom.",
    "In a small village, a young hero set off on a journey to save the world.",
    "The sky turned dark, and mysterious creatures appeared from the forest.",
    "A great dragon guarded a treasure hidden deep within the mountains.",
    "In the heart of the forest, a wizard cast powerful spells to protect the village."
  ];

  // Function to simulate real-time attention data (replace with actual data from Mindwave)
  const generateRandomAttention = () => {
    return Math.floor(Math.random() * 100); // Random value between 0-100
  };

  // Update attention data and score every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newAttention = generateRandomAttention();
      setAttentionScore(newAttention);

      const newAttentionData = [...attentionData];
      newAttentionData.push(newAttention);

      // Only keep last 60 data points for real-time chart
      if (newAttentionData.length > 60) newAttentionData.shift();

      setAttentionData(newAttentionData);
    }, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [attentionData]);

  // Change story every 60 seconds
  useEffect(() => {
    const storyInterval = setInterval(() => {
      setStoryIndex(prevIndex => (prevIndex + 1) % stories.length);
    }, 60000);

    setStoryText(stories[storyIndex]);

    return () => clearInterval(storyInterval);
  }, [storyIndex]);

  // Chart data for attention levels
  const chartData = {
    labels: Array.from({ length: attentionData.length }, (_, index) => index),
    datasets: [
      {
        label: 'Attention Level',
        data: attentionData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
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
          text: 'Attention Level (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time (s)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="activity-page-container">
      <div className="activity-content">
        {/* Score container on the left side */}
        <div className="score-container">
          <h3>Attention Score</h3>
          <div className="score-bar">
            <div className="score" style={{ width: `${attentionScore}%` }}></div>
          </div>
          <p>{attentionScore}%</p>
        </div>

        {/* Main content area */}
        <div className="main-content">
          {/* Story container in the center */}
          <div className="story-container">
            <p className="story-text">{storyText}</p>
          </div>

          {/* Chart container at the bottom */}
          <div className="chart-container">
            <h3>Real-Time Attention Chart</h3>
            <div className="chart-wrapper">
              <Line ref={chartRef} data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
