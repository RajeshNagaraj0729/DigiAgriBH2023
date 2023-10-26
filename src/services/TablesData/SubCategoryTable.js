/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import EditSubCategoryIcon from "../../pages/KisanBazaar/EditSubCategoryIcon";
import * as constants from "../../constants";

/**
 * Table for Vision tags
 * @param {props} props
 */
const SubCategoryTable = (props) => {
  // Column names
  const columns = [
    {
      name: "catName",
      selector: "catName",
    },
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
      catName: row.catName,
      name: row.name,
      description: row.description,
      media: (
        <img
          src={constants.mediaUrl + row.media[0].mediaUrl}
          alt="Not Found"
          className="cropDoctorResults imagePreview"
        />
      ),
      update: <EditSubCategoryIcon data={row} outlined={true} />,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="Sub Categories"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default SubCategoryTable;
