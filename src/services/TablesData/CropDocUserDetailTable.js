/*
React Imports
 */
import React from "react";
import dateFormat from "dateformat";

/*
Custom Component Imports
 */
import * as constants from "../../constants";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";

/**
 * Crop Doc User Detail Table
 * @param {Object} props
 */
const UserDetailTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Image",
      selector: "image",
    },
    {
      name: "Result",
      selector: "result",
    },
    {
      name: "Created On",
      selector: "createdon",
    },
  ];

  if (props.data.length !== 0) {
    // Fetching Row Data
    const rows = props.data[0]?.cropdocData.map((row) => {
      return {
        image: (
          <a
            target="_blank"
            href={constants.mediaUrl + row.imageUrl + constants.sasToken}
            rel="noreferrer"
          >
            <img
              src={constants.mediaUrl + row.imageUrl + constants.sasToken}
              alt="Not found"
              className="cropDoctorResults"
            />
          </a>
        ),
        result:
          row.diagnosisDetails === null ? (
            <div className="bgDanger whiteText smPadding smBorderRadius">
              No Data Found
            </div>
          ) : (
            <div className="bgSuccess whiteText smPadding smBorderRadius">
              {row.diagnosisDetails[0]?.causeInfo[0]?.name}
            </div>
          ),
        createdon: dateFormat(row.createdOn, "dd/mm/yyyy, h:MM:ss TT"),
      };
    });

    // Returning data table
    return (
      <NormalDataTable
        title="User Crop Doctor Results"
        columns={columns}
        data={rows}
        length={props.data[0]?.cropdocData.length}
      />
    );
  } else return <NoDataFound msg="No Records to Display" />;
};

export default UserDetailTable;
