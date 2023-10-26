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
const DiseaseDeepLinkTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Disease Name",
      selector: "diseaseName",
      center: true,
    },
    {
      name: "Disease DeepLink",
      selector: "diseaseDeepLink",
    },
  ];

  // Fetching Row Data
  const data = props.data?.map((row) => {
    return {
      diseaseName: row.linkName,
      diseaseDeepLink: row.deepLinkUrl,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Disease Deep Links"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default DiseaseDeepLinkTable;
