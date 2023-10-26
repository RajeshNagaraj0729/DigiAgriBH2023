/*
React Imports
 */
import React from "react";
import dateFormat from "dateformat";

/**
 * Custom Imports
 */
import Card from "../../components/Card/Card";
import { Spinner } from "reactstrap";
import TextInput from "../../components/Common/TextInput";

/**
 * Statistical Results for Crop Doc Pages
 * @param {Object} props
 */
const Analytics = (props) => {
  return (
    <div>
      {/* Analytics Stats */}
      <div className="row mb-4 mb-md-0 mb-lg-1 mb-xl-4">
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Detected"
            cardText="Disease "
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={props.detected}
            isLoading={props.detected === "isLoading" ? true : false}
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
            number={props.unDetected}
            isLoading={props.unDetected === "isLoading" ? true : false}
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
            number={props.total}
            isLoading={props.total === "isLoading" ? true : false}
          />
        </div>
      </div>

      <div className="row">
        {!props.from && (
          <div className="col-12 col-md-6 col-lg-6">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5>Crop Doctor Daily Stats Count</h5>
                <div className="topUsersScrollStyle">
                  {props.cropDocDailyStatsCount === "isLoading" ? (
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <TextInput
                              labelName="From:"
                              id="from"
                              value={props.fromDate}
                              labelClass="bannerLableStyle"
                              divClass="form-group mb-sm-0"
                              type="date"
                              inputClass="inputStyle"
                              onChange={(e) => {
                                props.setFromDate(e.target.value);
                              }}
                              max={dateFormat(Date.now(), "yyyy-mm-dd")}
                            />
                          </div>
                          <div className="col-12 col-sm-6">
                            <TextInput
                              labelName="To:"
                              id="to"
                              value={props.toDate}
                              labelClass="bannerLableStyle"
                              divClass="form-group mb-0"
                              type="date"
                              inputClass="inputStyle"
                              onChange={(e) => {
                                props.setToDate(e.target.value);
                              }}
                              min={props.fromDate}
                              max={dateFormat(Date.now(), "yyyy-mm-dd")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="topUsers">
                        <div
                          style={{
                            height: "45px",
                            width: "45px",
                            marginRight: "10px",
                          }}
                        ></div>
                        <div className="topUsersLeftSec">
                          <b>Daily Count</b>
                        </div>
                        <div className="topUsersRightSec">
                          {props.cropDocDailyStatsCount.DailyCount}
                        </div>
                      </div>

                      <div className="topUsers">
                        <div
                          style={{
                            height: "45px",
                            width: "45px",
                            marginRight: "10px",
                          }}
                        ></div>
                        <div className="topUsersLeftSec">
                          <b>Attended By Agronomy Team</b>
                        </div>
                        <div className="topUsersRightSec">
                          {props.cropDocDailyStatsCount.AttendedByAgronomyTeam}
                        </div>
                      </div>

                      <div className="topUsers">
                        <div
                          style={{
                            height: "45px",
                            width: "45px",
                            marginRight: "10px",
                          }}
                        ></div>
                        <div className="topUsersLeftSec">
                          <b>UnAttended By Agronomy Team</b>
                        </div>
                        <div className="topUsersRightSec">
                          {
                            props.cropDocDailyStatsCount
                              .UnAttendedByAgronomyTeam
                          }
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!props.from && (
          <div className="col-12 col-md-6 col-lg-6">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5>Detected Diseases Info</h5>
                <div className="topUsersScrollStyle">
                  {props.diseaseByType === "isLoading" ? (
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <Spinner />
                    </div>
                  ) : (
                    props.diseaseByType.map((row, key) => {
                      return (
                        row.name != null && (
                          <div className="topUsers">
                            <div
                              style={{
                                height: "45px",
                                width: "45px",
                                marginRight: "10px",
                              }}
                            ></div>
                            <div className="topUsersLeftSec">
                              <b>
                                {row.name === ""
                                  ? "No disease detected "
                                  : row.name}
                              </b>
                            </div>
                            <div className="topUsersRightSec">{row.count}</div>
                          </div>
                        )
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!props.from && (
          <div className="col-12 col-md-6 col-lg-6">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5>Detected Crops Info</h5>
                <div className="topUsersScrollStyle">
                  {props.cropByType === "isLoading" ? (
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <Spinner />
                    </div>
                  ) : (
                    props.cropByType.map((row, key) => {
                      return (
                        row.name != null && (
                          <div className="topUsers">
                            <div
                              style={{
                                height: "45px",
                                width: "45px",
                                marginRight: "10px",
                              }}
                            ></div>
                            <div className="topUsersLeftSec">
                              <b>
                                {row.name === ""
                                  ? "No Crop detected "
                                  : row.name}
                              </b>
                            </div>
                            <div className="topUsersRightSec">{row.count}</div>
                          </div>
                        )
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!props.from && (
          <div className="col-12 col-md-6 col-lg-6">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5> Diseases Wise State Analytics Results</h5>
                <div className="topUsersScrollStyle">
                  {props.getDiseaseAnalyticsResults === "isLoading" ? (
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <Spinner />
                    </div>
                  ) : (
                    props.getDiseaseAnalyticsResults?.map((row, key) => {
                      return (
                        <div className="topUsers">
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              marginRight: "10px",
                            }}
                          ></div>
                          <div className="topUsersLeftSec">
                            <strong className="stateanalyticsresultsHeading">
                              {row._id === ""
                                ? "No disease detected "
                                : row._id}
                            </strong>
                            <div className="stateanalyticsresults">
                              {row.states.map((state) => (
                                <>
                                  <p>
                                    State:
                                    <span>
                                      {state.stateName !== ""
                                        ? state.stateName
                                        : "N/A"}
                                    </span>
                                  </p>
                                  {state.districtList.map((district) => (
                                    <p>
                                      District:
                                      <span>
                                        {district.districtName
                                          ? district.districtName
                                          : "N/A"}
                                      </span>
                                    </p>
                                  ))}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!props.from && (
          <div className="col-12 col-md-6 col-lg-6">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5>State Wise Analytics Results</h5>
                <div className="topUsersScrollStyle">
                  {props.getCropsAnalyticsResults === "isLoading" ? (
                    <div className="col-12 d-flex align-items-center justify-content-center">
                      <Spinner />
                    </div>
                  ) : (
                    props.getCropsAnalyticsResults.map((row, key) => {
                      return (
                        <div className="topUsers">
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              marginRight: "10px",
                            }}
                          ></div>
                          <div className="topUsersLeftSec">
                            <strong className="stateanalyticsresultsHeading">
                              {row.state === ""
                                ? "No crops detected "
                                : row.state}
                            </strong>
                            <div className="stateanalyticsresults">
                              {row.disasesFound.map((name) => (
                                <div>
                                  <p>
                                    {name.diseaseName !== ""
                                      ? name.diseaseName
                                      : "Not Found"}{" "}
                                    - <span>{name.count}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Analytics;
