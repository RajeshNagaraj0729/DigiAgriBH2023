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
const StageGroupedBar = (props) => {
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
            labelString: "Count",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Crop Tags",
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  const labels = props.data?.map((tag) => {
    return tag.tagName;
  });
  const predicted = props.data?.map((tag) => {
    return tag.predicted;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Count",
        data: predicted,
        backgroundColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };
  // Returning Bar Chart
  return <Bar data={data} options={options} />;
};

export default StageGroupedBar;
