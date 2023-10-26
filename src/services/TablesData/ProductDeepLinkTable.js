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
const ProductDeepLinkTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Product",
      selector: "productName",
      center: true,
    },
    {
      name: "Product DeepLink",
      selector: "productDeepLink",
    },
  ];

  // Fetching Row Data
  let data = props.data?.map((row) => {
    return {
      productName: row.linkName,
      productDeepLink: row.deepLinkUrl,
    };
  });

  if (props.searchValue) {
    data = data.filter((r) =>
      r.productName.toLowerCase().includes(props.searchValue.toLowerCase())
    );
  }

  // Returning data table
  return (
    <NormalDataTable
      title="Product Deep Links"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default ProductDeepLinkTable;
