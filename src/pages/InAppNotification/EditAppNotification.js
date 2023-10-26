/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import dateFormat from "dateformat";

/**
 * Custom imports
 */
import { updateAppNotification } from "../../redux/actions/Notification/notification";
import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

let inappnotification = {
  type: "",
  id: "",
  title: "",
  mediaUrl: "",
  redirectLink: "",
  handleName: "",
  activeFrom: "",
  activeTo: "",
  buttonText: "",
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

/**
 *
 * @param {props} props
 */
const EditAppNotification = (props) => {
  const dispatch = useDispatch();
  const store = useStore();
  const getAppNotification = useSelector(
    (state) => state.notification
  )?.getAppNotification;
  const notificationData = getAppNotification.filter(
    (r) => r.id === props.data.id
  )[0];
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disableUpload, setDisableUpload] = useState(true);
  const [disableUpload1, setDisableUpload1] = useState(true);
  const [disableUpload2, setDisableUpload2] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isImageLoading1, setIsImageLoading1] = useState(false);
  const [isImageLoading2, setIsImageLoading2] = useState(false);
  const [title, setTitle] = useState(notificationData.title);
  const [buttonText, setButtonText] = useState(notificationData.buttonText);
  const [handleName, setHandleName] = useState(notificationData.handleName);
  const [activeTo, setActiveTo] = useState(
    dateFormat(notificationData.activeTo, "yyyy-mm-dd")
  );
  const [type, setType] = useState(notificationData.type);
  const [url, setUrl] = useState(notificationData.redirectLink);
  const [imageUrl, setImageUrl] = useState(notificationData.mediaUrl);
  const [tTitle, setTTitle] = useState(notificationData.translations.te.title);
  const [hTitle, setHTitle] = useState(notificationData.translations.hi.title);
  const [tButtonText, setTButtonText] = useState(
    notificationData.translations.te.buttonText
  );
  const [hButtonText, setHButtonText] = useState(
    notificationData.translations.hi.buttonText
  );

  const [tImageUrl, setTImageUrl] = useState(
    notificationData.translations.te.mediaUrl
  );

  const [hImageUrl, setHImageUrl] = useState(
    notificationData.translations.hi.mediaUrl
  );

  //Update collection submit
  const handleSubmit = async () => {
    inappnotification.type = type;
    inappnotification.id = notificationData.id;
    inappnotification.title = title;
    inappnotification.mediaUrl = imageUrl;
    inappnotification.redirectLink = url;
    inappnotification.handleName = handleName;
    inappnotification.activeFrom = notificationData.activeFrom;
    inappnotification.activeTo = new Date(activeTo).toISOString();
    inappnotification.buttonText = buttonText;
    inappnotification.translations.te.title = tTitle;
    inappnotification.translations.te.buttonText = tButtonText;
    inappnotification.translations.hi.title = hTitle;
    inappnotification.translations.hi.buttonText = hButtonText;
    inappnotification.translations.te.mediaUrl = tImageUrl;
    inappnotification.translations.hi.mediaUrl = hImageUrl;
    await dispatch(updateAppNotification(inappnotification))
      .then(() => {
        handleModalClose();
        Alert.success("Updated successfully");
      })
      .catch((err) => Alert.error(err.message));
    window.location.reload();
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
    setIsImageLoading1(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setTImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsImageLoading1(false);
      })
      .catch((err) => {
        setIsImageLoading1(false);
        Alert.error(err.message);
      });
  };

  const uploadHindiImage = async (file, cantainerName) => {
    setIsImageLoading2(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setHImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsImageLoading2(false);
      })
      .catch((err) => {
        setIsImageLoading2(false);
        Alert.error(err.message);
      });
  };

  const handleModalShow = () => {
    setShowModal(true);
    initialvalues();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const initialvalues = () => {
    setTitle(notificationData.title);
    setButtonText(notificationData.buttonText);
    setHandleName(notificationData.handleName);
    setType(notificationData.type);
    setUrl(notificationData.redirectLink);
    setImageUrl(notificationData.mediaUrl);
    setActiveTo(dateFormat(notificationData.activeTo, "yyyy-mm-dd"));
    setTTitle(notificationData.translations.te.title);
    setHTitle(notificationData.translations.hi.title);
    setTButtonText(notificationData.translations.te.buttonText);
    setHButtonText(notificationData.translations.hi.buttonText);
    setTImageUrl(notificationData.translations.te.mediaUrl);
    setHImageUrl(notificationData.translations.hi.mediaUrl);
  };

  useEffect(() => {
    if (
      title !== "" &&
      (title !== notificationData.title ||
        buttonText !== notificationData.buttonText ||
        handleName !== notificationData.handleName ||
        url !== notificationData.redirectLink ||
        imageUrl !== notificationData.mediaUrl ||
        activeTo !== dateFormat(notificationData.activeTo, "yyyy-mm-dd"))
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    notificationData,
    title,
    activeTo,
    buttonText,
    handleName,
    url,
    imageUrl,
  ]);

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
                Edit In App Notification
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
                  <label className="bannerLableStyle">Type:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                    disabled={true}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Title:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Active To:</label>
                </div>
                <div className="col-6">
                  <input
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
                    onChange={(e) => {
                      setActiveTo(e.target.value);
                    }}
                    value={activeTo}
                    className="inputStyle"
                    min={dateFormat(notificationData.activeFrom, "yyyy-mm-dd")}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              {type !== "type_4" && type !== "type_5" && (
                <div className="row mb-3">
                  <div className="col-1"></div>
                  <div className="col-4 align-self-center">
                    <label className="bannerLableStyle"> Media url:</label>
                  </div>
                  <div className="col-7 d-flex">
                    {isImageLoading ? (
                      <div className="col-8">
                        <Spinner color="success" size="sm" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                        }}
                        value={imageUrl}
                        className="inputStyle"
                      />
                    )}
                    <div className="d-flex">
                      <label
                        htmlFor={"inappnotification" + props.id}
                        className="custom-file-upload btn btn-sm btn-light m-auto"
                      >
                        <i className="fa fa-picture-o"></i> Select
                      </label>
                      <Button
                        className="custom-file-upload btn btn-sm btn-light m-auto"
                        disabled={disableUpload}
                        onClick={async () => {
                          setDisableUpload(true);
                          await uploadImage(imageUrl, "inappnotifications");
                        }}
                      >
                        <i className="fa fa-cloud-upload"></i> Upload
                      </Button>
                    </div>
                    <input
                      id={"inappnotification" + props.id}
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
                    />
                  </div>
                </div>
              )}

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">
                    {type === "type_1" ? "Source: " : "Redirect Link:"}
                  </label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    value={url}
                    disabled={type === "type_1" ? true : false}
                    className="inputStyle"
                  />
                </div>
              </div>

              {type !== "type_2" && (
                <div className="row mb-3">
                  <div className="col-1"></div>
                  <div className="col-4 align-self-center">
                    <label className="bannerLableStyle">
                      {type === "type_1" ? "Source Id:" : "Handle Name:"}
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      onChange={(e) => {
                        setHandleName(e.target.value);
                      }}
                      value={handleName}
                      className="inputStyle"
                    />
                  </div>
                </div>
              )}

              {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
                <div className="row mb-3">
                  <div className="col-1"></div>
                  <div className="col-4 align-self-center">
                    <label className="bannerLableStyle">Button Text:</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      onChange={(e) => {
                        setButtonText(e.target.value);
                      }}
                      value={buttonText}
                      className="inputStyle"
                    />
                  </div>
                </div>
              )}

              {/* <div className="row mb-3">
                <div className="col-12">
                  <h5 className="subHeading">Telugu Translations</h5>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-4 align-self-center">
                      <label className="bannerLableStyle">Title:</label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setTTitle(e.target.value);
                        }}
                        value={tTitle}
                      />
                    </div>
                  </div>
                </div>

                {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-1"></div>
                      <div className="col-4 align-self-center">
                        <label className="bannerLableStyle">Button Text:</label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="inputStyle"
                          onChange={(e) => {
                            setTButtonText(e.target.value);
                          }}
                          value={tButtonText}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {type !== "type_4" && type !== "type_5" && (
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-1"></div>
                      <div className="col-4 align-self-center">
                        <label className="bannerLableStyle">
                          {" "}
                          Telugu Media url:
                        </label>
                      </div>
                      <div className="col-7 d-flex">
                        {isImageLoading1 ? (
                          <div className="col-8">
                            <Spinner color="success" size="sm" />
                          </div>
                        ) : (
                          <input
                            type="text"
                            onChange={(e) => {
                              setTImageUrl(e.target.value);
                            }}
                            value={tImageUrl}
                            className="inputStyle"
                          />
                        )}
                        <div className="d-flex">
                          <label
                            htmlFor={"inappnotificationteluguData" + props.id}
                            className="custom-file-upload btn btn-sm btn-light m-auto"
                          >
                            <i className="fa fa-picture-o"></i> Select
                          </label>
                          <Button
                            className="custom-file-upload btn btn-sm btn-light m-auto"
                            disabled={disableUpload1}
                            onClick={async () => {
                              setDisableUpload1(true);
                              await uploadTeluguImage(
                                tImageUrl,
                                "inappnotifications"
                              );
                            }}
                          >
                            <i className="fa fa-cloud-upload"></i> Upload
                          </Button>
                        </div>
                        <input
                          id={"inappnotificationteluguData" + props.id}
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
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div> */}

              {/* <div className="row">
                <div className="col-12">
                  <h5 className="subHeading">Hindi Translations</h5>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-4 align-self-center">
                      <label className="bannerLableStyle">Title:</label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setHTitle(e.target.value);
                        }}
                        value={hTitle}
                      />
                    </div>
                  </div>
                </div>

                {type !== "type_3" && type !== "type_4" && type !== "type_5" && (
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-1"></div>
                      <div className="col-4 align-self-center">
                        <label className="bannerLableStyle">Button Text:</label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="inputStyle"
                          onChange={(e) => {
                            setHButtonText(e.target.value);
                          }}
                          value={hButtonText}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {type !== "type_4" && type !== "type_5" && (
                  <div className="col-12">
                    <div className="row mb-3">
                      <div className="col-1"></div>
                      <div className="col-4 align-self-center">
                        <label className="bannerLableStyle">
                          {" "}
                          Hindi Media url:
                        </label>
                      </div>
                      <div className="col-7 d-flex">
                        {isImageLoading2 ? (
                          <div className="col-8">
                            <Spinner color="success" size="sm" />
                          </div>
                        ) : (
                          <input
                            type="text"
                            onChange={(e) => {
                              setHImageUrl(e.target.value);
                            }}
                            value={hImageUrl}
                            className="inputStyle"
                          />
                        )}
                        <div className="d-flex">
                          <label
                            htmlFor={"inappnotificationData" + props.id}
                            className="custom-file-upload btn btn-sm btn-light m-auto"
                          >
                            <i className="fa fa-picture-o"></i> Select
                          </label>
                          <Button
                            className="custom-file-upload btn btn-sm btn-light m-auto"
                            disabled={disableUpload2}
                            onClick={async () => {
                              setDisableUpload2(true);
                              await uploadHindiImage(
                                hImageUrl,
                                "inappnotifications"
                              );
                            }}
                          >
                            <i className="fa fa-cloud-upload"></i> Upload
                          </Button>
                        </div>
                        <input
                          id={"inappnotificationData" + props.id}
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
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
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
            onClick={() => {
              handleSubmit();
              setDisable(true);
            }}
            style={{ margin: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAppNotification;
