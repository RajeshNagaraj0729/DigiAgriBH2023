/*
React Imports
 */
import React from "react";

/**
 * Custom Imports
 */
import PieChart from "../../components/Common/PieChart";
import Card from "../../components/Card/Card";
import { Spinner } from "reactstrap";

/**
 * Statistical Results for Crop Doc Pages
 * @param {Object} props
 */
const Statistics = (props) => {
  return (
    <div>
      {/* Pie Chart Implementation */}
      <div className="row">
        <div className="col-12 col-md-12 col-lg-7">
          <div className="tableMainSection cardShadow">
            <div className="row">
              <div className="col-6">
                <div className="chartMainSec">
                  <PieChart
                    count={
                      props.validData === "isLoading" ? 0 : props.validData
                    }
                    color={"#006400"}
                    width={20}
                    fontSize="26px"
                    total={
                      props.totalData === "isLoading" ? 0 : props.totalData
                    }
                  />
                </div>
                <div>
                  <h6 className="chartTitle w-100">Results with Disease</h6>
                </div>
              </div>
              <div className="col-6">
                <div className="chartMainSec">
                  <PieChart
                    count={
                      props.inValidData === "isLoading" ? 0 : props.inValidData
                    }
                    color={"#E38627"}
                    width={20}
                    fontSize="26px"
                    total={
                      props.totalData === "isLoading" ? 0 : props.totalData
                    }
                  />
                </div>
                <div>
                  <h6 className="chartTitle w-100">Results Without Disease</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Diseases for Total Results Page */}
        {!props.from && (
          <div className="col-12 col-md-12 col-lg-5">
            <div className="tableMainSection cardShadow">
              <div className="topUsersMainSec">
                <h5>Top Detected Diseases</h5>
                {props.topDiseases === "isLoading" ||
                props.validData === "isLoading" ? (
                  <div className="col-12 d-flex align-items-center justify-content-center">
                    <Spinner />
                  </div>
                ) : (
                  props.topDiseases.map((row, key) => {
                    return (
                      row.diagnosisDetails != null && (
                        <div className="topUsers" key={key}>
                          <div
                            style={{
                              height: "45px",
                              width: "45px",
                              marginRight: "10px",
                            }}
                          >
                            <PieChart
                              count={row.count}
                              color={"#3ac47d"}
                              width={15}
                              fontSize="26px"
                              total={
                                props.validData === "isLoading"
                                  ? row.count
                                  : props.validData
                              }
                            />
                          </div>
                          <div className="topUsersLeftSec">
                            <b>{row.diagnosisDetails[0]?.causeInfo[0]?.name}</b>
                            <p>
                              {
                                row.diagnosisDetails[0]?.causeInfo[0]
                                  ?.causeCategories[0]?.type
                              }
                            </p>
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
        )}
      </div>

      {/* Crop Doc Stats */}
      <div className="row mb-4 mb-md-0 mb-lg-1 mb-xl-4">
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Detected"
            cardText="Disease "
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
        {!props.from && (
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
        )}
      </div>
      <div className="row mb-4 mb-md-0 mb-lg-1 mb-xl-4">
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Attended"
            cardText="Crop Doctor"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textWarning"
            number={props.attendedCount}
            isLoading={props.attendedCount === "isLoading" ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Unattended"
            cardText="Crop Doctor"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textDanger"
            number={props.unAttendedCount}
            isLoading={props.unAttendedCount === "isLoading" ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Tensorflow"
            cardText="Results count"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textPrimary"
            number={props.tensorflowCount}
            isLoading={props.tensorflowCount === "isLoading" ? true : false}
          />
        </div>
      </div>
    </div>
  );
};
export default Statistics;
