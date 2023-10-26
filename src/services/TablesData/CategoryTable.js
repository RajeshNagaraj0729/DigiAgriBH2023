/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import EditCategoryIcon from "../../pages/KisanBazaar/EditCategoryIcon";
import * as constants from "../../constants";
/**
 * Table for Vision tags
 * @param {props} props
 */
const CategoryTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Description",
      selector: "description",
    },
    {
      name: "Media",
      selector: "media",
      center: true,
    },
    {
      name: "Update",
      selector: "update",
      center: true,
    },
  ];

  // Fetching Row Data
  const data = props.data?.map((row) => {
    return {
      name: row.name,
      description: row.description,
      // media: row.media[0].mediaUrl,
      media: (
        <img
          src={constants.mediaUrl + row.media[0].mediaUrl}
          alt="Not Found"
          className="cropDoctorResults imagePreview"
        />
      ),
      update: <EditCategoryIcon data={row} outlined={true} />,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Categories"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default CategoryTable;
