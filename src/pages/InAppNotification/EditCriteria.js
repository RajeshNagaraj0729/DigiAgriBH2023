/**
 * React imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import CustomSelect from "../../components/Select/Select";
import { getLanguages } from "../../services/Languages";

/**
 * Custom imports
 */
import { updateInAppCriteria } from "../../redux/actions/Notification/notification";

let inAppNotificationData = {
  id: "",
  notificationId: "",
  filterCriteria: {
    cropId: null,
    state: null,
    language: null,
  },
  isActive: true,
};

/**
 *
 * @param {props} props
 */
const EditCriteria = (props) => {
  const dispatch = useDispatch();
  const appCriteriaNotificationData = useSelector(
    (state) => state.notification
  )?.getInAppCriteria;
  const singleNotificationData = appCriteriaNotificationData.filter(
    (r) => r.id === props.data.id
  )[0];

  const crops = useSelector((state) => state.cropDocInfo.crops);
  const users = useSelector((state) => state.users);
  const usersStates = useSelector((state) => state.users)?.states;
  const appNotification = useSelector(
    (state) => state.notification
  )?.getAppNotification;
  const cropData = crops.filter(
    (r) => r.id === singleNotificationData.filterCriteria.cropId
  )[0];
  const userData = usersStates.filter(
    (r) => r === singleNotificationData.filterCriteria.state
  )[0];
  const criteriaNotificationId = appNotification.filter(
    (r) => r.id === singleNotificationData.notificationId
  )[0];

  const lang = getLanguages();
  const userLanguage = lang.filter(
    (r) => r.value === singleNotificationData.filterCriteria.language
  )[0];
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [notificationId, setNotificationId] = useState({
    label: criteriaNotificationId?.title
      ? criteriaNotificationId?.title
      : "N/A",
    value: criteriaNotificationId?.id,
  });
  const [cropId, setCropId] = useState({
    label: cropData.cropName,
    value: cropData.id,
  });
  const [language, setlanguage] = useState({
    label: userLanguage.label,
    value: userLanguage.value,
  });

  const [state, setState] = useState({
    label: userData,
    value: userData,
  });

  //Update collection submit
  const handleSubmit = async () => {
    inAppNotificationData.id = singleNotificationData.id;
    inAppNotificationData.notificationId = notificationId.value;
    inAppNotificationData.filterCriteria.cropId = cropId.value;
    inAppNotificationData.filterCriteria.state = state.value;
    inAppNotificationData.filterCriteria.language = language.value;
    inAppNotificationData.isActive = true;
    await dispatch(updateInAppCriteria(inAppNotificationData))
      .then(() => {
        handleModalClose();
        Alert.success("Updated successfully");
      })
      .catch((err) => Alert.error(err.message));
    window.location.reload();
  };

  const handleModalShow = () => {
    setShowModal(true);
    initialValues();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const initialValues = () => {
    setCropId({
      label: cropData.cropName,
      value: cropData.id,
    });
    setlanguage({
      label: userLanguage.label,
      value: userLanguage.value,
    });

    setState({
      label: userData,
      value: userData,
    });
    setNotificationId({
      label: criteriaNotificationId.title,
      value: criteriaNotificationId.id,
    });
  };

  return (
    <div>
      <button
        onClick={handleModalShow}
        className="btn btn-sm btn-warning"
        disabled={props.disable}
      >
        Edit
      </button>

      {/* Submit Modal Implementation */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        overflow={false}
        size={window.innerWidth < "991" ? "xs" : "sm"}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-9">
              <Modal.Title className="mpdalTitle">
                Edit In App Criteria Notification
              </Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Notification:</label>
                </div>
                <div className="col-6">
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
                      setNotificationId(option);
                    }}
                    value={notificationId}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Crop:</label>
                </div>
                <div className="col-6">
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
                      setCropId(option);
                    }}
                    value={cropId}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">State:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    placeholder="Select state"
                    data={users.states?.map((r) => {
                      return {
                        label: r,
                        value: r,
                      };
                    })}
                    onSelect={(option) => {
                      setState(option);
                    }}
                    value={state}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Language:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    placeholder="Select Language"
                    data={getLanguages()}
                    onSelect={(option) => {
                      setlanguage(option);
                    }}
                    value={language}
                  />
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-danger"
            onClick={handleModalClose}
            style={{ margin: "5px" }}
          >
            Close
          </Button>
          <Button
            className={
              disable ? "btn btn-sm btn-light" : "btn btn-sm btn-primary"
            }
            disabled={disable}
            onClick={handleSubmit}
            style={{ margin: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditCriteria;
