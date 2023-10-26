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
const PestCareDeepLinkTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Crops",
      selector: "crops",
      center: true,
    },
    {
      name: "Pest Care DeepLink",
      selector: "pestCareDeepLink",
    },
  ];

  // Fetching Row Data
  const data = props.data?.map((row) => {
    return {
      crops: row.linkName,
      pestCareDeepLink: row.deepLinkUrl,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Pest Deep Links"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default PestCareDeepLinkTable;
