/*
React Imports
 */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

/*
Custom Component Imports
 */
import { CROP_DOC_USERS } from "../../redux/actions/storepage";
import * as constants from "../../constants";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";

/**
 * Crop Doct UserWise Table
 * @param {Object} props
 * props from Crop Doc Userwise Page
 */
const CropDocUsersTable = (props) => {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(
    useSelector((state) => state.page.cropDocUsersActivePage)
  );
  const [pageAmount, setPageAmount] = useState(
    useSelector((state) => state.page.cropDocUsersPageAmount)
  );
  const users = useSelector((state) => state.cropDoc);
  const searchValue = users.searchValue;

  if (users.data.length !== 0) {
    // Column names
    const columns = [
      {
        name: "User Name",
        selector: "Username",
      },
      {
        name: "Mobile Number",
        selector: "MobileNumber",
        center: true,
      },
      // {
      //   name: "Images Count",
      //   selector: "count",
      // },
      {
        name: "View Result",
        selector: "Result",
      },
    ];

    // Fetching Row Data
    const rows = users.data.map((row) => {
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
        count: row.cropdocData.length,
        Result: row.cropdocData.length ? (
          <Link to={`/users/${row.id}`}>
            <i className="fa fa-folder-open"></i>
          </Link>
        ) : (
          "N/A"
        ),
      };
    });

    // Returning data table
    return (
      <PaginationDataTable
        Type={CROP_DOC_USERS}
        activePage={activePage}
        pageAmount={pageAmount}
        title="Userwise Details"
        setActivePage={setActivePage}
        setPageAmount={setPageAmount}
        searchValue={searchValue}
        dispatch={dispatch}
        callHandle={props.callHandle}
        callSearchHandler={props.callSearchHandler}
        columns={columns}
        data={rows}
        totalCount={users.data[0]?.totalCount}
      />
    );
  } else return <NoDataFound msg="No Records to Display" />;
};

export default CropDocUsersTable;
