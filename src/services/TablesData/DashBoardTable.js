/*
React Imports
 */
import React from "react";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";

/*
Custom Component Imports
 */
import * as constants from "../../constants";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import { PageLoader } from "../../components/Loading/Loading";
import Error from "../../pages/Error/Error";

/**
 * Table for recently logged in users
 */
const NewUsersData = () => {
  const rows = useSelector((state) => state.dashboardData.newUsers);
  if (rows.isLoading) {
    return <PageLoader />;
  }

  if (rows.data.length !== 0) {
    // Column names
    const columns = [
      {
        name: "User Name",
        selector: "Username",
        left: true,
      },
      {
        name: "Mobile Number",
        selector: "MobileNumber",
        center: true,
      },
      {
        name: "Status",
        selector: "status",
      },
      {
        name: "Created On",
        selector: "createdon",
      },
    ];

    // Fetching Row Data
    const data = rows.data.map((row) => {
      return {
        Username: (
          <div>
            <img
              style={{ borderRadius: "100%", marginRight: "5px" }}
              src={constants.mediaUrl + row.profilePic + constants.sasToken}
              width="30px"
              height="30px"
              alt="Not found"
            />
            <span> {row.firstName + " " + row.lastName}</span>
          </div>
        ),
        MobileNumber: row.phone,
        status: row.isVerified ? (
          <div className="bgSuccess whiteText smPadding smBorderRadius">
            Verfied
          </div>
        ) : (
          <div className="bgDanger whiteText smPadding smBorderRadius">
            Not Verified
          </div>
        ),
        createdon: dateFormat(row.createdAt, "dd/mm/yyyy, h:MM:ss TT"),
      };
    });

    // Returning data table
    return (
      <NormalDataTable
        className="newUsersDataTable"
        title="Recently Logged In Users"
        columns={columns}
        data={data}
        length={rows.data.length}
      />
    );
  } else return <NoDataFound msg="No Records to Display" />;
};

export default NewUsersData;
