/*
React Imports
 */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/*
Custom Component Imports
 */
import { TOTAL_USERS } from "../../redux/actions/storepage";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import { PageLoader } from "../../components/Loading/Loading";
import { additionalLanguages, languages } from "../Languages";
import dateFormat from "dateformat";

const UsersDataTable = (props) => {
  const dispatch = useDispatch();
  const cropDocStats = useSelector((state) => state.dashboardData);
  const users = useSelector((state) => state.users);

  if (users.isLoading) {
    return <PageLoader />;
  }

  const data = props.pagination ? users.data : users.filteredData;
  if (data?.length !== 0) {
    //Column names for table
    const columns = [
      {
        name: "User Name",
        selector: "username",
        center: true,
      },
      {
        name: "Mobile Number",
        selector: "MobileNumber",
        sortable: true,
        width: "200px",
        center: true,
      },
      {
        name: "Last Opened",
        selector: "lastOpened",
        center: true,
      },
      {
        name: "Language",
        selector: "language",
        center: true,
      },
      {
        name: "Crops",
        selector: "crops",
        center: true,
      },
      {
        name: "State",
        selector: "state",
        center: true,
      },
      {
        name: "District",
        selector: "district",
        center: true,
      },
      {
        name: "Pincode",
        selector: "pincode",
        center: true,
      },
      {
        name: "KV Posts",
        selector: "kvposts",
        center: true,
        omit: !props.includeKV,
      },
      {
        name: "Crop Doctor",
        selector: "cdcount",
        center: true,
        omit: !props.includeCD,
      },
      // {
      //   name: "Address",
      //   selector: "address",
      //   center: true,
      // },
    ];

    // Fetching Row Data
    let rows = data.map((row) => {
      return {
        username: row.firstName + " " + row.lastName,
        MobileNumber: row.phone,
        address:
          (row.detailedLocationInfo.suburb !== null &&
          row.detailedLocationInfo.suburb !== ""
            ? row.detailedLocationInfo.suburb + " (suburb), "
            : "") +
          (row.detailedLocationInfo.city_district != null &&
          row.detailedLocationInfo.city_district !== ""
            ? row.detailedLocationInfo.city_district + " (cdist.), "
            : "") +
          (row.detailedLocationInfo.city != null &&
          row.detailedLocationInfo.city !== ""
            ? row.detailedLocationInfo.city + " (city), "
            : "") +
          (row.detailedLocationInfo.village != null &&
          row.detailedLocationInfo.village !== ""
            ? row.detailedLocationInfo.village + " (vil), "
            : "") +
          (row.detailedLocationInfo.county != null &&
          row.detailedLocationInfo.county !== ""
            ? row.detailedLocationInfo.county + " (county), "
            : "") +
          (row.detailedLocationInfo.district != null &&
          row.detailedLocationInfo.district !== ""
            ? row.detailedLocationInfo.district + " (dist), "
            : "") +
          (row.detailedLocationInfo.state != null &&
          row.detailedLocationInfo.state !== ""
            ? row.detailedLocationInfo.state + " (state), "
            : "") +
          (row.detailedLocationInfo.postcode != null &&
          row.detailedLocationInfo.postcode !== 0
            ? row.detailedLocationInfo.postcode + " (postcode)"
            : ""),
        state:
          row.detailedLocationInfo.state != null &&
          row.detailedLocationInfo.state !== ""
            ? row.detailedLocationInfo.state
            : "N/A",
        language: [...languages, ...additionalLanguages].filter(
          (lang) => lang.code === row.language
        )[0].name,
        crops:
          row.crops && (row.crops.length === 0 || row.crops[0]?.cropId === null)
            ? "N/A"
            : row.crops.map((crop, key) => {
                var cropName = props.crops.filter(
                  (r) => r.value === crop.cropId
                )[0]?.label;
                if (key !== row.crops.length - 1 && cropName) {
                  if (cropName) {
                    return cropName + ", ";
                  } else return "";
                } else {
                  return cropName;
                }
              }),
        district:
          row.detailedLocationInfo.district != null &&
          row.detailedLocationInfo.district !== ""
            ? row.detailedLocationInfo.district
            : "N/A",
        pincode:
          row.detailedLocationInfo.postcode != null &&
          row.detailedLocationInfo.postcode !== 0
            ? row.detailedLocationInfo.postcode
            : "N/A",
        lastOpened: dateFormat(row.lastOpened, "dd/mm/yyyy, h:MM:ss TT"),
        kvposts: row.postData?.length,
        cdcount: row.cropdocData?.length,
      };
    });

    //Address Null Implementation
    rows = rows.map((row) => {
      return {
        username: row.username,
        MobileNumber: row.MobileNumber,
        address: row.address || "N/A",
        language: row.language,
        state: row.state,
        crops: row.crops,
        district: row.district,
        pincode: row.pincode,
        lastOpened: row.lastOpened,
        kvposts: row.kvposts,
        cdcount: row.cdcount,
      };
    });

    // Returning data table
    // if (!props.pagination) {
    //   return (
    //     <NormalDataTable
    //       title="User Details"
    //       columns={columns}
    //       data={rows}
    //       length={data.length}
    //     />
    //   );
    // } else {
    return (
      <PaginationDataTable
        Type={TOTAL_USERS}
        activePage={props.pagenum}
        pageAmount={props.pageAmount}
        title="User Details"
        setActivePage={props.setPagenum}
        setPageAmount={props.setPageAmount}
        dispatch={dispatch}
        callHandle={props.callHandle}
        columns={columns}
        data={rows}
        searchValue=""
        totalCount={
          !props.pagination
            ? users.filteredData[0]?.totalCount
            : cropDocStats.stats.data?.totalUsers
        }
      />
    );
    // }
  } else {
    return <NoDataFound msg="No Data Found" />;
  }
};

export default UsersDataTable;
