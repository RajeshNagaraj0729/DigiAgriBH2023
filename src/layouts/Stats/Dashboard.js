/*
React Imports
 */
import React, { useState } from "react";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import GroupedBar from "../../components/Chart/Chart";
import * as constants from "../../constants";
import Card from "../../components/Card/Card";
import CustomSelect from "../../components/Select/Select";
import ErrorComponent from "../../components/Error/Error";

/**
 * Dashboard components
 * @param {Object} props
 * props from Home Page
 */
const Dashboard = (props) => {
  const [chartOption, setChartOption] = useState({
    label: "Last 7 days",
    value: 7,
  });
  const chartOptionSelect = (options) => {
    setChartOption(options);
  };

  return (
    <div>
      {/* Top Cards */}
      {props.statsError ? (
        <ErrorComponent msg={props.statsError} />
      ) : (
        <>
          <div className="row mb-md-0 mb-4 mb-xl-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseBlueCard"
                cardHeading="Current Version Users"
                cardText={props.currentVersionName}
                number={props.currentVersionCount}
                isLoading={
                  props.currentVersionCount === "isLoading" ? true : false
                }
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseGreenCard"
                cardHeading="Logged In Users"
                cardText=""
                number={props.recentUsers}
                isLoading={props.recentUsers === "isLoading" ? true : false}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-0 mb-md-0">
              <Card
                cardStyle="diseaseSkyBlueCard"
                cardHeading="New Users"
                cardText=""
                number={props.newUsers}
                isLoading={props.newUsers === "isLoading" ? true : false}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <Card
                cardStyle="diseaseRedCard"
                cardHeading="Crop Doctor Users"
                cardText=""
                number={props.cropDocUserCount}
                isLoading={
                  props.cropDocUserCount === "isLoading" ? true : false
                }
              />
            </div>
          </div>
          <div className="row mb-md-0 mb-4 mb-xl-4">
            {/* <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseRedCard"
                cardHeading="Total Users"
                cardText=""
                number={props.totalUsers}
                isLoading={props.totalUsers === "isLoading" ? true : false}
              />
            </div> */}
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseRedCard"
                cardHeading="Kisan Vedika Posts"
                cardText=""
                number={props.postsCount}
                isLoading={props.postsCount === "isLoading" ? true : false}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseSkyBlueCard"
                cardHeading="Crop Doctor Uploads"
                cardText=""
                number={props.cdDayWiseCount}
                isLoading={props.cdDayWiseCount === "isLoading" ? true : false}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseRedCard"
                cardHeading="Text Local SMS Credits Left"
                cardText=""
                number={props.smsCreditsData}
                isLoading={props.smsCreditsData === "isLoading" ? true : false}
              />
            </div>
          </div>
        </>
      )}

      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Crop Doctor Activity</h2>
        </div>
      </div>

      {/* Bar Chart Implementation */}
      <div className="row">
        <div className="col-12 col-md-12 col-lg-7">
          <div className="tableMainSection cardShadow">
            <div
              style={{
                height: "400px",
                width: "100%",
                padding: "10px",
              }}
            >
              {props.chartDataError ? (
                <ErrorComponent msg={props.chartDataError} />
              ) : props.chartData === "isLoading" ? (
                <div
                  className="col-12 d-flex align-items-center justify-content-center"
                  style={{ height: "100%" }}
                >
                  <Spinner />
                </div>
              ) : (
                <GroupedBar data={props.chartData} num={chartOption.value} />
              )}
            </div>
            <div
              style={{
                paddingBottom: "10px",
              }}
            >
              <div style={{ width: "150px", marginLeft: "10px" }}>
                <CustomSelect
                  placeholder="Select Type"
                  search={false}
                  onSelect={chartOptionSelect}
                  data={[
                    { label: "Last 7 days", value: 7 },
                    { label: "Today", value: 1 },
                    { label: "Last 2 days", value: 2 },
                    { label: "Last 15 days", value: 15 },
                    { label: "Last 30 days", value: 30 },
                  ]}
                  value={chartOption}
                  name="select-type"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Users Implementation */}
        <div className="col-12 col-md-12 col-lg-5 ">
          <div className="tableMainSection cardShadow">
            <div className="topUsersMainSec">
              <h5>Top Users</h5>
              <div className="topUsersScrollStyle1">
                {props.topUsersError ? (
                  <ErrorComponent msg={props.topUsersError} />
                ) : props.topUsers === "isLoading" ? (
                  <div className="col-12 d-flex align-items-center justify-content-center">
                    <Spinner />
                  </div>
                ) : (
                  props.topUsers.map((row, key) => {
                    return (
                      <div className="topUsers" key={key}>
                        <img
                          style={{ borderRadius: "100%", marginRight: "12px" }}
                          src={
                            constants.mediaUrl +
                            row.userDetails[0]?.profilePic +
                            constants.sasToken
                          }
                          width="36px"
                          height="36px"
                          alt="Not found"
                        />
                        <div className="topUsersLeftSec">
                          <b>{row.userDetails[0]?.firstName}</b>
                          {row.userDetails &&
                            row.userDetails[0]?.detailedLocationInfo && (
                              <p>
                                {row.userDetails[0]?.detailedLocationInfo.state}
                              </p>
                            )}
                        </div>
                        <div className="topUsersRightSec">{row.count}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Doc Stats Implementation */}
      <div className="row mb-md-0 mb-4 mb-xl-4">
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Detected"
            cardText="Disease"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={props.validData}
            isLoading={props.validData === "isLoading" ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Undetected"
            cardText="Disease"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textPrimary"
            number={props.inValidData}
            isLoading={props.inValidData === "isLoading" ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-0 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Total"
            cardText="Uploads"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textDanger"
            number={props.totalData}
            isLoading={props.totalData === "isLoading" ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Today's"
            cardText="Uploads"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textWarning"
            number={props.newData}
            isLoading={props.newData === "isLoading" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
