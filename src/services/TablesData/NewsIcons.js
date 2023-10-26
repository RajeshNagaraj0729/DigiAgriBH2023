/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import * as constants from "../../constants";
import EditNewsIcon from "../../pages/KisanSandesh/News/EditNewsIcon";

/**
 * Table for News Icons
 * @param {props} props
 */
const NewsIconsTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Source Name",
      selector: "sourceName",
      center: true,
    },
    {
      name: "Logo",
      selector: "logo",
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
      sourceName: row.source,
      logo: (
        <a
          target="_blank"
          href={
            row.imageUrl.startsWith("news/")
              ? constants.mediaUrl + row.imageUrl + constants.sasToken
              : row.imageUrl
          }
          rel="noreferrer"
        >
          <img
            src={
              row.imageUrl.startsWith("news/")
                ? constants.mediaUrl + row.imageUrl + constants.sasToken
                : row.imageUrl
            }
            alt="Not Uploaded"
            className="iconImage"
          />
        </a>
      ),
      update: <EditNewsIcon id={row.id} outlined={true} />,
    };
  });

  if (props.searchValue) {
    data = data.filter((r) =>
      r.sourceName.toLowerCase().includes(props.searchValue.toLowerCase())
    );
  }

  // Returning data table
  return (
    <NormalDataTable
      title="News Logos"
      columns={columns}
      data={data}
      length={data.length}
      customStyles={{ rows: { style: { height: "80px" } } }}
    />
  );
};

export default NewsIconsTable;
