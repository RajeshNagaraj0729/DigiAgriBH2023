/*
React Imports
 */
import React from "react";
import dateFormat from "dateformat";

/*
Custom Component Imports
 */
import Statistics from "../../layouts/Stats/CropDoc";
import UserDetailTable from "../../services/TablesData/CropDocUserDetailTable";
import { PageLoader } from "../../components/Loading/Loading";
import ImagesDownload from "../../components/DownloadOptions/ImagesDownload";
import * as Constants from "../../constants";
import ExcelFileDownload from "../../components/DownloadOptions/ExcelFileDownload";
import Error from "../Error/Error";
import Filter from "../../layouts/Filtering/Filter";

/**
 * Crop Doctor User Details Page
 * @param {Object} props
 * props coming from Url Params from main page
 */
const CropDocUserDetails = (props) => {
  //Fetched Results Loading
  if (props.isLoading) {
    return <PageLoader />;
  }

  //Fetched Results Error
  else if (props.errMsg) {
    return <Error msg={props.errMsg} />;
  }

  //If data is fetched returning the dashboard components
  else {
    const userStatsData = props.userDetails[0];
    const inValidData = userStatsData.cropdocData.filter(
      (row) => row.diagnosisDetails === null
    );
    const validData = userStatsData?.cropdocData.length - inValidData.length;
    const unique_data = userStatsData?.cropdocData.map((row) => {
      return {
        Image: Constants.mediaUrl + row.imageUrl + Constants.sasToken,
        Result:
          row.diagnosisDetails === null
            ? "No Data Found"
            : row.diagnosisDetails[0]?.causeInfo[0]?.name,
        CreatedOn: dateFormat(row.createdOn, "dd/mm/yyyy, h:MM:ss TT"),
      };
    });

    // returning components for Crop Doc User Details
    return (
      <div>
        {/* User Name with profile pic and phone number */}
        <div className="row">
          <div className="col-12">
            <div className="userNameSec">
              <div>
                <img
                  src={
                    Constants.mediaUrl +
                    props.userDetails[0]?.profilePic +
                    Constants.sasToken
                  }
                  height="50px"
                  width="50px"
                  style={{ borderRadius: "50%" }}
                  alt={props.userDetails[0]?.profilePic}
                />
              </div>
              <div>
                <h2 className="userNameStyle">
                  {props.userDetails[0]?.firstName +
                    " " +
                    props.userDetails[0]?.lastName}
                </h2>
                <p className="userMobileStyle">{props.userDetails[0]?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Statistical results */}
        <div className="row">
          <div className="col-12">
            <Statistics
              data={userStatsData}
              inValidData={inValidData.length}
              validData={validData}
              totalData={userStatsData?.cropdocData.length}
              from="userdetails"
            />
          </div>
        </div>
        <div className="dashedLine"></div>

        {/* Images download button and Export data button*/}
        <div className="row mb-2">
          <div className="col-12">
            <ImagesDownload
              name="Download Images"
              links={props.userDetails[0]?.cropdocData.map(
                (link) => Constants.downloadUrl + link.imageUrl
              )}
              foldername={
                props.userDetails[0]?.firstName +
                " " +
                props.userDetails[0]?.lastName
              }
            />
            <ExcelFileDownload
              data={unique_data}
              fileName={
                props.userDetails[0]?.firstName +
                " " +
                props.userDetails[0]?.lastName
              }
              name="Export Data"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Filter filterType={true} />
          </div>
        </div>

        {/* User Details Table */}
        <div className="row">
          <div className="col-12">
            <UserDetailTable data={props.userDetails} />
          </div>
        </div>
      </div>
    );
  }
};
export default CropDocUserDetails;
