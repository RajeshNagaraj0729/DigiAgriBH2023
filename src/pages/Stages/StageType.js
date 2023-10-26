/**
 * React imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useStore } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import { stageTypeImageUpload } from "../../redux/actions/AddStageRecords/stageImageUpload";
import { addStageType } from "../../redux/actions/AddStageRecords/stageRecords";
import * as constants from "../../constants";

let stageType = {
  typeName: "",
  typeOrder: 0,
  imageUrl: "",
  translations: {
    te: {
      typeName: "",
    },
    hi: {
      typeName: "",
    },
    ta: {
      typeName: "",
    },
    kn: {
      typeName: "",
    },
    
  },
};

const StageType = () => {
  const [imageLoading, setIsImageLoading] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typeOrder, setTypeOrder] = useState(0);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [uploadDisable, setUploadDisable] = useState(true);
  const [tTypeName, setTTypeName] = useState({ te: "", hi: "",ta:"",kn:"" });

  const dispatch = useDispatch();

  const store = useStore();

  useEffect(() => {
    if (typeName !== "" && imageUrl !== "" && typeOrder !== "") {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [typeName, imageUrl, typeOrder]);

  const imageValidation = () => {
    if (typeof imageUrl === "object") {
      Alert.error("Upload selected Image");
    } else if (
      !imageUrl.toLowerCase().endsWith(".jpg") &&
      !imageUrl.toLowerCase().endsWith(".png") &&
      !imageUrl.toLowerCase().endsWith(".jpeg")
    ) {
      Alert.error("Enter a valid Image Url");
      return false;
    } else {
      return true;
    }
  };

  const postStageType = async () => {
    if (isNaN(typeOrder)) {
      Alert.error("Enter a number in type order");
    } else if (imageValidation()) {
      stageType.typeName = typeName;
      stageType.imageUrl = imageUrl;
      stageType.typeOrder = parseInt(typeOrder);
      stageType.translations.te.typeName = tTypeName.te;
      stageType.translations.hi.typeName = tTypeName.hi;
      stageType.translations.ta.typeName = tTypeName.ta;
      stageType.translations.kn.typeName = tTypeName.kn;
      await dispatch(addStageType(stageType))
        .then(() => {
          Alert.success("Successfully added stage type");
          window.location.reload();
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  const uploadStageTypeImage = async (file) => {
    setIsImageLoading(true);
    await dispatch(stageTypeImageUpload(file))
      .then(() => {
        setIsImageLoading(false);
        setImageUrl(store.getState().stagesImageUpload.stageTypeImageUrl);
        Alert.success("Image uploaded successfully");
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Add Stage Type</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Type Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTypeName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Type Order:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTypeOrder(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-items-center">
                <label className="bannerLableStyle">Type Image:</label>
              </div>
              <div className="col-12 col-md-8 align-items-center">
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      value={imageUrl}
                      className="inputStyle"
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-6 col-sm-6 d-flex mt-2">
                    <label
                      htmlFor={"stagetype-image-upload"}
                      className="custom-file-upload btn btn-sm btn-light mx-1 my-auto"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light mx-1 my-auto"
                      disabled={uploadDisable}
                      onClick={() => {
                        uploadStageTypeImage(imageUrl);
                        setUploadDisable(true);
                      }}
                    >
                      <i className="fa fa-cloud-upload"></i> Upload
                    </Button>
                  </div> */}
                  <div className="col-12 d-flex align-items-center justify-content-center mt-2">
                    {imageLoading ? (
                      <Spinner color="success" size="sm" />
                    ) : (
                      <div className="d-flex">
                        {imageUrl && (
                          <img
                            src={
                              typeof imageUrl !== "object" &&
                              imageUrl.startsWith("stagetypes/")
                                ? constants.mediaUrl +
                                  imageUrl +
                                  constants.sasToken
                                : imageUrl
                            }
                            height="80px"
                            width="100%"
                            alt={"Not Found"}
                            className="notFoundTxt"
                          />
                        )}
                      </div>
                    )}
                    <input
                      id={"stagetype-image-upload"}
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          Alert.error("Please upload a valid image");
                        } else {
                          setUploadDisable(false);
                          setImageUrl(e.target.files[0]);
                        }
                      }}
                      onClick={(e) => (e.target.value = "")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="subHeading">Telugu Translations</h5>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-12 col-md-4 align-self-center">
                    <label className="bannerLableStyle">Type Name:</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      className="inputStyle"
                      onChange={(e) =>
                        setTTypeName({ ...tTypeName, te: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="subHeading">Hindi Translations</h5>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-12 col-md-4 align-self-center">
                    <label className="bannerLableStyle">Type Name:</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      className="inputStyle"
                      onChange={(e) =>
                        setTTypeName({ ...tTypeName, hi: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="subHeading">Tamil Translations</h5>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-12 col-md-4 align-self-center">
                    <label className="bannerLableStyle">Type Name:</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      className="inputStyle"
                      onChange={(e) =>
                        setTTypeName({ ...tTypeName, ta: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="subHeading">Kannada Translations</h5>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-12 col-md-4 align-self-center">
                    <label className="bannerLableStyle">Type Name:</label>
                  </div>
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      className="inputStyle"
                      onChange={(e) =>
                        setTTypeName({ ...tTypeName, kn: e.target.value })
                      }
                    />
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Button
              className="btn btn-sm"
              disabled={submitDisable}
              onClick={() => {
                postStageType();
                setSubmitDisable(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageType;
