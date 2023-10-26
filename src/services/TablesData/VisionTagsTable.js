/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";

/**
 * Table for Vision tags
 * @param {props} props
 */
const VisionTags = (props) => {
  // Column names
  const columns = [
    {
      name: "Tag Name",
      selector: "tagname",
    },
    {
      name: "Probability",
      selector: "probability",
    },
  ];

  // Fetching Row Data
  const data = props.data.map((row) => {
    return {
      tagname: row.tagName,
      probability: row.probability,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title={props.name}
      columns={columns}
      data={data}
      length={props.data.length}
    />
  );
};

export default VisionTags;
