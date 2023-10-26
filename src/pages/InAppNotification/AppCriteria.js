/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useStore, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import dateFormat from "dateformat";

/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import { getLanguages } from "../../services/Languages";
import AppCriteriaNotificationTable from "../../services/TablesData/AppCriteriaNotificationTable";
import {
  createInAppCriteria,
  fetchInAppCriteria,
  fetchAppNotification,
} from "../../redux/actions/Notification/notification";

let inAppNotificationData = {
  notificationId: "",
  filterCriteria: {
    cropId: "",
    state: "",
    language: "",
  },
  isActive: true,
};

const AppCriteria = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const [notificationId, setNotificationId] = useState("");
  const [cropId, setCropId] = useState("");
  const [language, setlanguage] = useState("");
  const [state, setState] = useState("");

  const [submitDisable, setSubmitDisable] = useState(true);
  const appNotification = useSelector(
    (state) => state.notification
  )?.getAppNotification;
  const appCriteriaNotificationData = useSelector(
    (state) => state.notification
  )?.getInAppCriteria;

  const crops = useSelector((state) => state.cropDocInfo.crops);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    inAppNotificationList();
  }, []);

  // fetchAppNotification
  const inAppNotificationList = async () => {
    await dispatch(fetchAppNotification())
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  useEffect(() => {
    inAppCriteriaNotificationList();
  }, []);

  useEffect(() => {
    if (!!notificationId && !!cropId && !!state && !!language) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [notificationId, cropId, state, language]);

  // fetchAppNotification
  const inAppCriteriaNotificationList = async () => {
    await dispatch(fetchInAppCriteria())
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  const submitInAppnotification = async () => {
    inAppNotificationData.notificationId = notificationId;
    inAppNotificationData.filterCriteria.cropId = cropId;
    inAppNotificationData.filterCriteria.state = state;
    inAppNotificationData.filterCriteria.language = language;
    inAppNotificationData.isActive = true;

    await dispatch(createInAppCriteria(inAppNotificationData))
      .then(() => {
        Alert.success("Notification Criteria inserted successfully");
        window.location.reload();
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">In App Criteria Notification</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row mb-2">
          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <label className="bannerLableStyle">Notification:</label>
            <CustomSelect
              placeholder="Select Notification"
              data={
                appNotification
                  ? appNotification.map((row) => {
                      return {
                        label: row.title,
                        value: row.id,
                      };
                    })
                  : []
              }
              onSelect={(option) => {
                setNotificationId(option.value);
              }}
            />
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <label className="bannerLableStyle">Crop:</label>
            <CustomSelect
              placeholder="Select Crop"
              data={
                crops
                  ? crops.map((row) => {
                      return {
                        label: row.cropName,
                        value: row.id,
                      };
                    })
                  : []
              }
              onSelect={(option) => {
                setCropId(option.value);
              }}
            />
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <label className="bannerLableStyle">State:</label>
            <CustomSelect
              placeholder="Select state"
              data={users.states?.map((r) => {
                return {
                  label: r,
                  value: r,
                };
              })}
              onSelect={(option) => {
                setState(option.value);
              }}
            />
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <label className="bannerLableStyle">Language:</label>
            <CustomSelect
              placeholder="Select Language"
              data={getLanguages()}
              onSelect={(option) => {
                setlanguage(option.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Button
              className="btn btn-md"
              disabled={submitDisable}
              onClick={() => {
                submitInAppnotification();
                setSubmitDisable(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="tableMainSection cardShadow topUsersMainSec111">
        <div className="visionTagsSec"></div>
        {appCriteriaNotificationData?.length !== 0 ? (
          <AppCriteriaNotificationTable data={appCriteriaNotificationData} />
        ) : (
          "No Records Found"
        )}
      </div>
    </div>
  );
};

export default AppCriteria;
