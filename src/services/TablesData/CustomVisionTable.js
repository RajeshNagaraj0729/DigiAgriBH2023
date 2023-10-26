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
      name: "Image Name",
      selector: "imageName",
      center: true,
    },
    {
      name: "Image Url",
      selector: "imageUrl",
    },
    {
      name: "Result",
      selector: "result",
    },
  ];

  const data = props.data?.map((row) => {
    return {
      imageName: row.imageName,
      imageUrl: (
        <a href={row.imageUrl} target="_blank">
          {row.imageUrl}
        </a>
      ),
      result: row.result,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Test Results"
      columns={columns}
      data={data}
      length={data?.length}
    />
  );
};

export default VisionTags;
