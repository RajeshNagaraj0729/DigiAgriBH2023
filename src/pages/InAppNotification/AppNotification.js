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
import AppNotificationTable from "../../services/TablesData/AppNotificationTable";
import TextInput from "../../components/Common/TextInput";
import {
  createAppNotification,
  fetchAppNotification,
} from "../../redux/actions/Notification/notification";
import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

export const notificationTypes = [
  {
    label: "Type 1",
    value: "type_1",
  },
  {
    label: "Type 2",
    value: "type_2",
  },
  {
    label: "Type 3",
    value: "type_3",
  },
  {
    label: "Type 4",
    value: "type_4",
  },
  {
    label: "Type 5",
    value: "type_5",
  },
];

export const sourceTypes = [
  {
    label: "Kisan Bazaar",
    value: "kisanBazaar",
  },
  {
    label: "Kisan Vedika",
    value: "kisanVedika",
  },
  {
    label: "Kisan Sandesh News",
    value: "kisanSandeshNews",
  },
  {
    label: "Kisan Sandesh Tips",
    value: "kisanSandeshTips",
  },
  {
    label: "Pest Care With Disease",
    value: "pestCareWithDisease",
  },
];

let inAppNotificationData = {
  type: "",
  title: "",
  mediaUrl: "",
  redirectLink: "",
  handleName: "",
  buttonText: "",
  activeFrom: "",
  activeTo: "",
  isActive: true,
  translations: {
    te: {
      title: "",
      mediaUrl: "",
      buttonText: "",
    },
    hi: {
      title: "",
      mediaUrl: "",
      buttonText: "",
    },
  },
};

const AppNotification = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isTeluguImageLoading, setIsTeluguImageLoading] = useState(false);
  const [isHindiImageLoading, setIsHindiImageLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [handleName, setHandleName] = useState("");
  const [type, setType] = useState();
  const [url, setUrl] = useState("");
  const [activeFrom, setActiveFrom] = useState("");
  const [activeTo, setActiveTo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tImageUrl, setTImageUrl] = useState("");
  const [hImageUrl, setHImageUrl] = useState("");
  const [tButtonText, setTButtonText] = useState("");
  const [hButtonText, setHButtonText] = useState("");
  const [tTitle, setTTitle] = useState("");
  const [hTitle, setHTitle] = useState("");
  const [disableUpload, setDisableUpload] = useState(true);
  const [disableUpload1, setDisableUpload1] = useState(true);
  const [disableUpload2, setDisableUpload2] = useState(true);
  const [submitDisable, setSubmitDisable] = useState(true);
  const appNotification = useSelector(
    (state) => state.notification
  )?.getAppNotification;

  useEffect(() => {
    inAppNotificationList();
  }, []);

  useEffect(() => {
    if (!!type && !!title && !!activeFrom && !!activeTo) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [title, type, activeFrom, activeTo]);

  // fetchAppNotification
  const inAppNotificationList = async () => {
    await dispatch(fetchAppNotification())
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  const uploadImage = async (file, cantainerName) => {
    setIsImageLoading(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  const uploadTeluguImage = async (file, cantainerName) => {
    setIsTeluguImageLoading(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setTImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsTeluguImageLoading(false);
      })
      .catch((err) => {
        setIsTeluguImageLoading(false);
        Alert.error(err.message);
      });
  };

  const uploadHindiImage = async (file, cantainerName) => {
    setIsHindiImageLoading(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setHImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsHindiImageLoading(false);
      })
      .catch((err) => {
        setIsHindiImageLoading(false);
        Alert.error(err.message);
      });
  };

  const submitInAppnotification = async () => {
    inAppNotificationData.type = type;
    inAppNotificationData.title = title;
    inAppNotificationData.mediaUrl = imageUrl;
    inAppNotificationData.redirectLink = url;
    inAppNotificationData.handleName = handleName;
    if (type === "type_5") {
      inAppNotificationData.buttonText = "Buy now";
    } else {
      inAppNotificationData.buttonText = buttonText;
    }
    inAppNotificationData.activeFrom = activeFrom;
    inAppNotificationData.activeTo = activeTo;
    inAppNotificationData.translations.te.title = tTitle;
    inAppNotificationData.translations.te.buttonText = tButtonText;
    inAppNotificationData.translations.hi.title = hTitle;
    inAppNotificationData.translations.hi.buttonText = hButtonText;
    inAppNotificationData.translations.te.mediaUrl = tImageUrl;
    inAppNotificationData.translations.hi.mediaUrl = hImageUrl;
    await dispatch(createAppNotification(inAppNotificationData))
      .then(() => {
        Alert.success("Notification inserted successfully");
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
          <h2 className="mainHeading">In App Notification</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row mb-2">
          <div className="col-12 col-sm-6 col-md-4">
            <label className="bannerLableStyle">Type:</label>
            <CustomSelect
              placeholder="Select Type"
              data={notificationTypes}
              onSelect={(option) => {
                setType(option.value);
              }}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          {type === "type_1" ? (
            <div className="col-12 col-sm-6 col-md-4">
              <label className="bannerLableStyle">Source:</label>
              <CustomSelect
                placeholder="Select Type"
                data={sourceTypes}
                onSelect={(option) => {
                  setUrl(option.value);
                }}
              />
            </div>
          ) : (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group">
                <label className="bannerLableStyle align-self-center">
                  Redirect Link:
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          {type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="row">
                <div className="col-7">
                  <div className="form-group">
                    <label className="bannerLableStyle align-self-center">
                      Media Url:
                    </label>
                    {isImageLoading ? (
                      <Spinner color="success" size="sm" />
                    ) : (
                      <TextInput
                        //labelName="Media Url:"
                        id={"icon-inappnotificationsimageurl"}
                        //labelClass="bannerLableStyle"
                        divClass="form-group"
                        type="text"
                        inputClass="inputStyle"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-5 d-flex m-auto">
                  <label
                    htmlFor={"icon-file-upload-image"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                  >
                    <i className="fa fa-picture-o" /> Select
                  </label>
                  <Button
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                    disabled={disableUpload}
                    onClick={async () => {
                      setDisableUpload(true);
                      await uploadImage(imageUrl, "inappnotifications");
                    }}
                  >
                    <i className="fa fa-cloud-upload" /> Upload
                  </Button>
                </div>
                <input
                  id={"icon-file-upload-image"}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      Alert.error("Please upload a valid image");
                    } else {
                      setDisableUpload(false);
                      setImageUrl(e.target.files[0]);
                    }
                  }}
                  onClick={(e) => (e.target.value = "")}
                />
              </div>
            </div>
          )}
          {type !== "type_2" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group">
                <label className="bannerLableStyle align-self-center">
                  {type === "type_1" ? "Source Id:" : "Handle Name:"}
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setHandleName(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group">
                <label className="bannerLableStyle align-self-center">
                  Button Text:
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setButtonText(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div className="col-12 col-sm-6 col-md-4">
            <TextInput
              labelName="Active From:"
              id="activeFrom"
              labelClass="bannerLableStyle"
              divClass="form-group"
              type="date"
              value={activeFrom}
              onKeyPress={(e) => {
                e.preventDefault();
                return false;
              }}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onKeyUp={(e) => {
                e.preventDefault();
                return false;
              }}
              inputClass="inputStyle"
              onChange={(e) => {
                setActiveFrom(e.target.value);
              }}
              min={dateFormat(Date.now(), "yyyy-mm-dd")}
              max={activeTo}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <TextInput
              labelName="Active To:"
              id="activeTo"
              value={activeTo}
              labelClass="bannerLableStyle"
              divClass="form-group"
              type="date"
              onKeyPress={(e) => {
                e.preventDefault();
                return false;
              }}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onKeyUp={(e) => {
                e.preventDefault();
                return false;
              }}
              inputClass="inputStyle"
              onChange={(e) => {
                setActiveTo(e.target.value);
              }}
              min={activeFrom || dateFormat(Date.now(), "yyyy-mm-dd")}
            />
          </div>
        </div>

        {/* <div className="row">
          <div className="col-12">
            <h5 className="subHeading">Telugu Translations</h5>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTTitle(e.target.value);
                }}
              />
            </div>
          </div>
          {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group">
                <label className="bannerLableStyle align-self-center">
                  Button Text:
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setTButtonText(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="row">
                <div className="col-7">
                  <div className="form-group">
                    <label className="bannerLableStyle align-self-center">
                      Media Url:
                    </label>
                    {isTeluguImageLoading ? (
                      <Spinner color="success" size="sm" />
                    ) : (
                      <TextInput
                        //labelName="Media Url:"
                        id={"icon-productimageurl"}
                        //labelClass="bannerLableStyle"
                        divClass="form-group"
                        type="text"
                        inputClass="inputStyle"
                        value={tImageUrl}
                        onChange={(e) => {
                          setTImageUrl(e.target.value);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-5 d-flex m-auto">
                  <label
                    htmlFor={"icon-file-upload-img"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                  >
                    <i className="fa fa-picture-o"></i> Select
                  </label>
                  <Button
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                    disabled={disableUpload1}
                    onClick={async () => {
                      setDisableUpload1(true);
                      await uploadTeluguImage(tImageUrl, "inappnotifications");
                    }}
                  >
                    <i className="fa fa-cloud-upload"></i> Upload
                  </Button>
                </div>
                <input
                  id={"icon-file-upload-img"}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      Alert.error("Please upload a valid image");
                    } else {
                      setDisableUpload1(false);
                      setTImageUrl(e.target.files[0]);
                    }
                  }}
                  onClick={(e) => (e.target.value = "")}
                />
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-12">
            <h5 className="subHeading">Hindi Translations</h5>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setHTitle(e.target.value);
                }}
              />
            </div>
          </div>
          {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="form-group">
                <label className="bannerLableStyle align-self-center">
                  Button Text:
                </label>
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setHButtonText(e.target.value);
                  }}
                />
              </div>
            </div>
          )}
          {type !== "type_4" && type !== "type_5" && (
            <div className="col-12 col-sm-6 col-md-4">
              <div className="row">
                <div className="col-7">
                  <div className="form-group">
                    <label className="bannerLableStyle align-self-center">
                      Media Url:
                    </label>
                    {isHindiImageLoading ? (
                      <Spinner color="success" size="sm" />
                    ) : (
                      <TextInput
                        //labelName="Media Url:"
                        id={"icon-productimageurl"}
                        //labelClass="bannerLableStyle"
                        divClass="form-group"
                        type="text"
                        inputClass="inputStyle"
                        value={hImageUrl}
                        onChange={(e) => {
                          setHImageUrl(e.target.value);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-5 d-flex m-auto">
                  <label
                    htmlFor={"icon-file-upload-ge"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                  >
                    <i className="fa fa-picture-o"></i> Select
                  </label>
                  <Button
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                    disabled={disableUpload2}
                    onClick={async () => {
                      setDisableUpload2(true);
                      await uploadHindiImage(hImageUrl, "inappnotifications");
                    }}
                  >
                    <i className="fa fa-cloud-upload"></i> Upload
                  </Button>
                </div>
                <input
                  id={"icon-file-upload-ge"}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      Alert.error("Please upload a valid image");
                    } else {
                      setDisableUpload2(false);
                      setHImageUrl(e.target.files[0]);
                    }
                  }}
                  onClick={(e) => (e.target.value = "")}
                />
              </div>
            </div>
          )}
        </div> */}

        <div className="row">
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
        {appNotification?.length !== 0 ? (
          <AppNotificationTable data={appNotification} />
        ) : (
          "No Records Found"
        )}
      </div>
    </div>
  );
};

export default AppNotification;
