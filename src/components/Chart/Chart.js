/*
React Imports
 */
import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

//Custom Imports

import * as ChartData from "../../services/ChartData";

/**
 * Bar Chart for x days results
 * @param {Object} props
 * props from Dashboard
 */
const GroupedBar = (props) => {
  // options for Bar Chart
  const options = {
    display: true,
    scales: {
      yAxes: [
        {
          ticks: {
            //max: props.totalData,
            min: 0,
            //stepSize: props.totalData / 10,
            beginAtZero: true,
            padding: 20,
          },
          scaleLabel: {
            display: true,
            labelString: "Total Results",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Upto Date",
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const data = ChartData.weeklyData(props);

  // Returning Bar Chart
  return <Bar data={data} options={options} />;
};

export default GroupedBar;
