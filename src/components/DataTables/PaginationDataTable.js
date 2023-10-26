/**
 * React Imports
 */
import React from "react";
import DataTable from "react-data-table-component";

/**
 * Data table with serverside pagination
 * @param {Object} props
 */
const PaginationDataTable = (props) => {
  return (
    <DataTable
      {...props}
      striped
      paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
      paginationDefaultPage={props.activePage}
      paginationTotalRows={props.totalCount}
      pagination
      paginationServer
      paginationPerPage={props.pageAmount}
      onChangeRowsPerPage={(current_rowsperpage, current_page) => {
        props.setActivePage(current_page);
        props.setPageAmount(current_rowsperpage);
        // props.dispatch({
        //   type: props.Type,
        //   pageAmount: current_rowsperpage,
        //   activePage: current_page,
        // });
        if (props.searchValue === "") {
          props.callHandle(current_page, current_rowsperpage);
        } else {
          props.callSearchHandler(
            props.searchValue,
            current_page,
            props.pageAmount
          );
        }
      }}
      onChangePage={(current_page, total_rows) => {
        props.setActivePage(current_page);
        // props.dispatch({
        //   type: props.Type,
        //   pageAmount: props.pageAmount,
        //   activePage: current_page,
        // });
        if (props.searchValue === "") {
          props.callHandle(current_page, props.pageAmount);
        } else {
          props.callSearchHandler(
            props.searchValue,
            current_page,
            props.pageAmount
          );
        }
      }}
    />
  );
};
export default PaginationDataTable;
