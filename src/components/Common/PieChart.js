/**
 * React Imports
 */
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

/**
 * Pie Chart for displaying stats
 * @param {Object} props
 */
const PieCharts = (props) => {
  return (
    <PieChart
      data={[{ value: props.count, color: props.color }]}
      totalValue={props.total}
      lineWidth={props.width}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
      labelStyle={{
        fontSize: props.fontSize,
        fontFamily: "sans-serif",
        fill: props.color,
      }}
      background="#ddd"
      labelPosition={0}
      animate
    />
  );
};
export default PieCharts;
