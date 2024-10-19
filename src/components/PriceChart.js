/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../App.css";
import ExpandSVG from "../assets/ExpandSVG";
import AddSVG from "../assets/AddSVG";

const PriceChart = () => {
  const [activeTab, setActiveTab] = useState("Chart");
  const [timeRange, setTimeRange] = useState("1w");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [extraData, setExtraData] = useState([]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const timeRanges = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];
  const numPoints = 50;

  const dataSets = {};
  const seconDataSets = {};

  for (let range of timeRanges) {
    let prev = 63000;
    let prev2 = 3120;

    dataSets[range] = [];
    seconDataSets[range] = [];

    for (let i = 0; i < numPoints; i++) {
      if (i % 2 === 0) {
        prev += Math.floor(Math.random() * 200);
      } else {
        prev -= Math.floor(Math.random() * 200);
      }
      dataSets[range].push(prev);

      if (i % 2 === 0) {
        prev2 += Math.floor(Math.random() * 20);
      } else {
        prev2 -= Math.floor(Math.random() * 20);
      }
      seconDataSets[range].push(prev2);
    }
  }

  const addExtraData = () => {
    const datasetCount = extraData.length;
    const isLineChart = datasetCount % 2 === 1;
    const newDataSet = {
      label: `Comparison Data ${datasetCount + 1}`,
      data: dataSets[timeRange].map((value) => value + Math.random() * 1000),
      fill: isLineChart,
      background: isLineChart
        ? "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);"
        : " linear-gradient(180deg, #E8E7FF 0%, rgba(255, 255, 255, 0) 100%);",
      borderColor: isLineChart
        ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
        : "transparent",
      borderWidth: isLineChart ? 2 : 0,
      type: isLineChart ? "line" : "bar",
      pointBackgroundColor: "#4B40EE",
      pointBorderColor: "#fff",
    };

    setExtraData((prevData) => [...prevData, newDataSet]);
  };

  let label = [];

  for (let i = 1; i < 50; i++) {
    label.push(i);
  }

  const data = {
    labels: label,
    datasets: [
      {
        label: "Price",
        data: dataSets[timeRange],
        fill: true,
        background:
          "linear-gradient(180deg, #E8E7FF 0%, rgba(255, 255, 255, 0) 100%)",
        borderColor: "#4B40EE",
        borderWidth: 2,
        pointBackgroundColor: "#4B40EE",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Price",
        data: seconDataSets[timeRange],
        fill: true,
        background: "#E6E8EB",
        borderColor: "#4B40EE",
        borderWidth: 2,
        pointBackgroundColor: "#4B40EE",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
        type: "bar",
      },
      ...extraData,
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: !isFullscreen,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "nearest",
        intersect: true,
        callbacks: {
          label: function (context) {
            return `$${context.raw}`;
          },
        },
        backgroundColor: "#4B40EE",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          size: 10,
        },
        padding: 4,
      },
    },
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Summary":
        return <div>Summary content goes here...</div>;
      case "Chart":
        return <Line data={data} options={options} />;
      case "Statistics":
        return <div>Statistics content goes here...</div>;
      case "Analysis":
        return <div>Analysis content goes here...</div>;
      case "Settings":
        return <div>Settings content goes here...</div>;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #000",
        borderRadius: "8px",
        position: "relative",
        width: isFullscreen ? "100%" : "50%",
        height: "675px",
      }}
      className="container"
    >
      <div className="price-wrapper">
        <span style={{ textAlign: "left" }} className="heading-1">
          {dataSets[timeRange][dataSets[timeRange].length-1]}
          <sup style={{ color: "#BDBEBF" }} className="sub">
            USD
          </sup>
        </span>
        <span className="subtitle-1" style={{ color: "#67BF6B" }}>
          + 2,161.42 (3.54%)
        </span>
      </div>

      <div className="tabs">
        {["Summary", "Chart", "Statistics", "Analysis", "Settings"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "transparent",
                color: activeTab !== tab ? "#6F7177" : "#1A243A",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom: activeTab === tab ? "2px solid #5353d5" : "none",
              }}
              className="subtitle-1"
            >
              {tab}
            </button>
          )
        )}
      </div>

      {activeTab === "Chart" && (
        <div className="fullscreen-compare">
          <div className="fullscreen-and-compare-wrapper">
            <button
              onClick={toggleFullscreen}
              style={{
                border: "none",
                padding: "10px 10px",
                cursor: "pointer",
                marginRight: "10px",
                background: "white",
              }}
              className="subtitle-1"
            >
              {isFullscreen ? (
                "Exit Fullscreen"
              ) : (
                <span className="fullscreen-wrapper">
                  <ExpandSVG />{" "}
                  <span style={{ marginLeft: 5 }}>Fullscreen</span>
                </span>
              )}
            </button>

            <button
              onClick={() => addExtraData()} // Call the function on button click
              style={{
                border: "none",
                padding: "10px 10px",
                cursor: "pointer",
                background: "white",
              }}
              className="subtitle-1"
            >
              <span className="compare-wrapper">
                <AddSVG /> <span style={{ marginLeft: 5 }}>Compare</span>
              </span>
            </button>
          </div>
          <div>
            {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                style={{
                  background: timeRange === range ? "#4B40EE" : "transparent",
                  border: "none",
                  marginRight: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  color: timeRange === range ? "white" : "#6F7177",
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          padding: "20px",
          background: "rgb(255 255 255)",
          borderRadius: "8px",
        }}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PriceChart;
