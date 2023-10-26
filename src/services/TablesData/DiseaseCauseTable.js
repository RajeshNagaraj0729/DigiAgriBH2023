/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import EditDiseaseCause from "../../pages/EditStages/EditDiseaseCause";

/**
 * Table for News Icons
 * @param {props} props
 */
const DiseaseCauseTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Name",
      selector: "name",
      center: true,
    },
    {
      name: "Update",
      selector: "update",
      center: true,
    },
  ];

  // Fetching Row Data
  let data = props.data.map((row) => {
    return {
      name: row.name,
      update: (
        <EditDiseaseCause
          dataToEdit={row}
          afterUpdateAction={props.afterUpdateAction}
        />
      ),
    };
  });

  if (props.searchValue) {
    data = data.filter((r) =>
      r.name.toLowerCase().includes(props.searchValue.toLowerCase())
    );
  }

  // Returning data table
  return (
    <NormalDataTable
      title="Disease Causes"
      columns={columns}
      data={data}
      length={data.length}
      customStyles={{ rows: { style: { height: "80px" } } }}
    />
  );
};

export default DiseaseCauseTable;
