import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "rsuite";

import PieChart from "../../components/Common/PieChart";
import Card from "../../components/Card/Card";
import { PageLoader } from "../../components/Loading/Loading";
import { Table, Button } from "react-bootstrap";
import NoDataFound from "../../components/NoData/NoDataFound";
import CustomSelect from "../../components/Select/Select";
import {
  fetchPrakshepAnalyticsCountApi,
  fetchPrakshepSyncedDataApi,
} from "../../redux/actions/Analytics/analytics";

const spinnerContainer = {
  width: "calc(100% - 290px)",
  height: "100%",
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  zIndex: 2,
};

const spinnerSubContainer = {
  marginTop: "250px",
  textAlign: "center",
};

const spinner = {
  width: "3rem",
  height: "3rem",
  justifySelf: "center",
};

const loadingText = {
  color: "white",
  fontSize: "20px",
};

const daysOptions = [
  {
    label: "Last 3 Days",
    value: "3",
  },
  {
    label: "Last 5 Days",
    value: "5",
  },
  {
    label: "Last 10 Days",
    value: "10",
  },
  {
    label: "Last 15 Days",
    value: "15",
  },
];

const Prakshep = () => {
  const [days, setDays] = useState(daysOptions[0]);
  const [isLoading, setIsLoading] = useState(true);

  const analyticsCount = useSelector(
    (state) => state.analytics.prakshepAnalyticsCount
  );
  const syncedData = useSelector((state) => state.analytics.prakshepSyncedData);

  const dispatch = useDispatch();

  useEffect(() => {
    loadAnalyticsCount();
  }, []);

  useEffect(() => {
    loadSyncedData(days.value);
  }, []);

  const loadAnalyticsCount = async () => {
    try {
      await dispatch(fetchPrakshepAnalyticsCountApi())
        .then(() => {})
        .catch((err) => {
          Alert.error(err.message);
        });
    } catch (error) {}
  };

  const loadSyncedData = async (noOfDays) => {
    try {
      setIsLoading(true);
      await dispatch(fetchPrakshepSyncedDataApi(noOfDays))
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.error(err.message);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSubmitButtonPress = () => {
    loadSyncedData(days.value);
  };

  return (
    <div>
      {!analyticsCount && (
        <div style={spinnerContainer} className="d-flex justify-content-center">
          <div style={spinnerSubContainer}>
            <Spinner color="white" style={spinner} />
            <p style={loadingText}>Loading...</p>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">
            Prakshep Stats [Starting from Feb 7th 2022]
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-8">
          <div className="tableMainSection cardShadow">
            <div className="row">
              <div className="col-sm-6">
                <div className="chartMainSec">
                  <PieChart
                    total={analyticsCount ? analyticsCount.synchedRecords : 0}
                    count={
                      analyticsCount
                        ? analyticsCount.stressGeoJson.updatedCount
                        : 0
                    }
                    color={"#006400"}
                    width={20}
                    fontSize="26px"
                  />
                </div>
                <div>
                  <h6 className="chartTitle w-100">Stress updated</h6>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="chartMainSec">
                  <PieChart
                    total={analyticsCount ? analyticsCount.synchedRecords : 0}
                    count={
                      analyticsCount
                        ? analyticsCount.stressGeoJson.notUpdatedCount
                        : 0
                    }
                    color={"#E38627"}
                    width={20}
                    fontSize="26px"
                  />
                </div>
                <div>
                  <h6 className="chartTitle w-100">Stress not updated</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <Card
            cardStyle="whiteCardBg mb-3"
            cardHeading="Total Synced"
            cardText="Prakshep"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={analyticsCount ? analyticsCount.synchedRecords : 0}
            isLoading={!!analyticsCount ? false : true}
          />
          <Card
            cardStyle="whiteCardBg mb-3"
            cardHeading="Stress Updated"
            cardText="Prakshep"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={
              analyticsCount ? analyticsCount.stressGeoJson.updatedCount : 0
            }
            isLoading={!!analyticsCount ? false : true}
          />
          <Card
            cardStyle="whiteCardBg"
            cardHeading="Stress Not Updated"
            cardText="Prakshep"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={
              analyticsCount ? analyticsCount.stressGeoJson.notUpdatedCount : 0
            }
            isLoading={!!analyticsCount ? false : true}
          />
        </div>
      </div>

      <div className="tableMainSection cardShadow">
        <div className="row px-3 pt-3">
          <div className="col-12 col-sm-3">
            <div className="form-group">
              <label className="bannerLableStyle">Days:</label>
              <CustomSelect
                data={daysOptions}
                placeholder="Select state"
                onSelect={(value) => {
                  setDays(value);
                }}
                value={days}
              />
            </div>
          </div>
          <div className="col-12 col-sm-7">
            <p className="m-0">&nbsp;</p>
            <Button
              className="btn btn-md btn-primary d-block mr-auto"
              disabled={false}
              onClick={onSubmitButtonPress}
            >
              Submit
            </Button>
          </div>
          <div className="col-12 col-sm-2"></div>
        </div>
      </div>

      <div className="tableMainSection cardShadow farmerRegistrationTable">
        <div className="row">
          <div className="col-sm-8">
            <h5 className="subHeading p-3 mb-0">Prakshep Synced Data</h5>
          </div>
          <div className="col-sm-4 py-3">
            <div className="prakshepsyncdataSection">
              <h6>Note:</h6>
              <p>
                <strong>Total uploads with location:</strong> Users who uploaded
                image with location
              </p>
              <p>
                <strong>Recent unique uploads:</strong> Only one image per user
                will be processed
              </p>
              <p>
                <strong>Existing user uploads:</strong> Users who uploaded image
                more than once
              </p>
            </div>
          </div>
          <div className="col-12">
            {isLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th rowspan="2">Synced on</th>
                    <th rowspan="2">Total uploads with location</th>
                    <th colspan="4">Recent unique uploads</th>
                    <th rowspan="2">Existing user uploads</th>
                  </tr>
                  <tr>
                    <th>Identified</th>
                    <th>Unidentified</th>
                    <th>Stress updated</th>
                    <th>Stress not updated</th>
                  </tr>
                </thead>
                <tbody>
                  {syncedData?.map((item, index) => (
                    <tr key={index}>
                      <td>{dateFormat(item.synchedDate, "dd/mm/yyyy")}</td>
                      <td>{item.totalUserUploads}</td>
                      <td>{item.newUserUploads.synched}</td>
                      <td>{item.newUserUploads.unSynched}</td>
                      <td>{item.newUserUploads.stressUpdated}</td>
                      <td>{item.newUserUploads.stressNotUpdated}</td>
                      <td>{item.existingUserUploads}</td>
                    </tr>
                  ))}
                  {syncedData.length === 0 && (
                    <tr>
                      <td colSpan="10">
                        <NoDataFound msg="No data found" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prakshep;
