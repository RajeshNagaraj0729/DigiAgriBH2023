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
const CropCareDeepLinkTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Crops",
      selector: "crops",
      center: true,
    },
    {
      name: "Crop Care DeepLink",
      selector: "cropCareDeepLink",
    },
  ];

  // Fetching Row Data
  const data = props.data?.map((row) => {
    return {
      crops: row.linkName,
      cropCareDeepLink: row.deepLinkUrl,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Crop Deep Links"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default CropCareDeepLinkTable;
