/**
 * React Imports
 */
import React from "react";
import DataTable from "react-data-table-component";

/**
 * Data table with normal pagination
 * @param {Object} props
 */
const NormalDataTable = (props) => {
  return (
    <DataTable
      {...props}
      striped
      paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50]}
      paginationTotalRows={props.length}
      pagination
      onChangeRowsPerPage={(current_rowsperpage, current_page) => {
        if (props.isFiltered) {
          props.setActivePage(current_page);
          props.setPageAmount(current_rowsperpage);
        }
      }}
      onChangePage={(current_page, total_rows) => {
        if (props.isFiltered) {
          props.setActivePage(current_page);
        }
      }}
    />
  );
};
export default NormalDataTable;
