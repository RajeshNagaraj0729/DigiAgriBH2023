/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import dateFormat from "dateformat";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import { updateBanner } from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import CustomSelect from "../../../components/Select/Select";
import { imageHeightOptions } from "../../Banners/MapBanners/MapBanners";

//Initial Object for update
const initialValue = {
  id: "",
  activeTo: "",
  label: "",
  bannerMedia: [],
  tags: [],
  redirectLink: "",
  displayOrder: 0,
  language: "",
  specificAttributes: {
    viewLimit: 0,
    state: [],
    district: [],
    crop: [],
    disease: [],
  },
  bannerDimensions: {
    height: 0,
    width: 0,
  },
};

/**
 * Edit Banner Implementation
 * @param {Object} props
 * props from Banners Page
 */
const EditMapBanner = (props) => {
  const store = useStore();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const banners = useSelector((state) => state.banners).mapBanners;
  const dispatch = useDispatch();
  const selectedBanner = banners?.filter((r) => r.id === props.id)[0];
  const [activeTo, setActiveTo] = useState(
    dateFormat(selectedBanner.activeTo, "yyyy-mm-dd")
  );
  const [redirectLink, setRedirectLink] = useState(selectedBanner.redirectLink);
  // const [label, setLabel] = useState(selectedBanner.label);
  const [bannerPosition, setBannerPosition] = useState(
    selectedBanner.displayOrder
  );
  const [bannerMedia, setBannerMedia] = useState(selectedBanner.bannerMedia[0]);
  const [disableUpload, setDisableUpload] = useState(true);
  const [isBannerMediaLoading, setIsBannerMediaLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const [state, setState] = useState(
    selectedBanner.specificAttributes?.state?.length > 0
      ? selectedBanner.specificAttributes?.state?.map((state) => {
          return {
            label: state,
            value: state,
          };
        })
      : []
  );
  const [district, setDistrict] = useState(
    selectedBanner.specificAttributes?.district?.length > 0
      ? selectedBanner.specificAttributes?.district?.map((district) => {
          return {
            label: district,
            value: district,
          };
        })
      : []
  );
  const [crop, setCrop] = useState(
    selectedBanner.specificAttributes?.crop?.length > 0
      ? selectedBanner.specificAttributes?.crop?.map((crop) => {
          return {
            label: props.crops.filter((r) => r.id === crop)[0]?.cropName,
            value: crop,
          };
        })
      : []
  );
  const [pest, setPest] = useState(
    selectedBanner.specificAttributes?.disease?.length > 0
      ? selectedBanner.specificAttributes?.disease?.map((disease) => {
          return {
            label: props.diseases.filter((r) => r.id === disease)[0]?.name,
            value: disease,
          };
        })
      : []
  );
  const [viewLimit, setViewLimit] = useState(
    selectedBanner.specificAttributes?.viewLimit
  );
  const [imageHeight, setImageHeight] = useState(
    selectedBanner.bannerDimensions.height !== 0
      ? imageHeightOptions.find(
          (option) =>
            option.value === selectedBanner.bannerDimensions.height.toString()
        )
      : imageHeightOptions[0]
  );

  //Validate banner media
  const validateBannerMedia = () => {
    if (
      bannerMedia !== "" &&
      !bannerMedia.toLowerCase().endsWith(".jpg") &&
      !bannerMedia.toLowerCase().endsWith(".png") &&
      !bannerMedia.toLowerCase().endsWith(".jpeg")
    ) {
      return false;
    }
    return true;
  };

  //Edit banner submit
  const handleSubmit = async () => {
    if (isImageSelected && !isUploadClicked) {
      Alert.error("Please upload the selected image");
    } else if (!validateBannerMedia()) {
      Alert.error("Please enter a valid banner media");
    } else {
      initialValue.tags = [];
      initialValue.tags = selectedBanner.tags;
      initialValue.activeTo = new Date(activeTo).toISOString();
      initialValue.redirectLink = redirectLink;
      initialValue.id = props.id;
      // initialValue.label = label;
      initialValue.bannerMedia = [];
      initialValue.bannerMedia.push(bannerMedia);
      initialValue.language = props.language;
      initialValue.specificAttributes.state = state.map((r) => r.value);
      initialValue.specificAttributes.district = district.map((r) => r.value);
      initialValue.specificAttributes.disease = pest.map((r) => r.value);
      initialValue.specificAttributes.crop = crop.map((r) => r.value);
      initialValue.specificAttributes.viewLimit = parseInt(viewLimit);
      initialValue.bannerDimensions = {
        height: parseFloat(imageHeight.value),
        width: 0,
      };
      await dispatch(updateBanner(initialValue, props.language))
        .then(() => {
          handleModalClose();
          props.getBanners(props.language);
          Alert.success("Updated Successfully");
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  //Upload Media Image
  const uploadMediaImage = async (file) => {
    setIsBannerMediaLoading(true);
    await dispatch(fileUpload(file)).then(() => {
      setIsBannerMediaLoading(false);
    });
  };

  //Modal Show
  const handleModalShow = () => {
    setShowModal(true);
  };

  //Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setActiveTo(dateFormat(selectedBanner.activeTo, "yyyy-mm-dd"));
    // setLabel(selectedBanner.label);
    setBannerMedia(selectedBanner.bannerMedia[0]);
    setBannerPosition(selectedBanner.displayOrder);
    setDisableUpload(true);
    setIsBannerMediaLoading(false);
    setIsImageSelected(false);
    setIsUploadClicked(false);
    setState(
      selectedBanner.specificAttributes?.state?.length > 0
        ? selectedBanner.specificAttributes?.state?.map((state) => {
            return {
              label: state,
              value: state,
            };
          })
        : []
    );
    setDistrict(
      selectedBanner.specificAttributes?.district?.length > 0
        ? selectedBanner.specificAttributes?.district?.map((district) => {
            return {
              label: district,
              value: district,
            };
          })
        : []
    );
    setPest(
      selectedBanner.specificAttributes?.disease?.length > 0
        ? selectedBanner.specificAttributes?.disease?.map((disease) => {
            return {
              label: props.diseases.filter((r) => r.id === disease)[0]?.name,
              value: disease,
            };
          })
        : []
    );
    setCrop(
      selectedBanner.specificAttributes?.crop?.length > 0
        ? selectedBanner.specificAttributes?.crop?.map((crop) => {
            return {
              label: props.crops.filter((r) => r.id === crop)[0]?.cropName,
              value: crop,
            };
          })
        : []
    );
    setImageHeight(
      selectedBanner.bannerDimensions.height !== 0
        ? imageHeightOptions.find(
            (option) =>
              option.value === selectedBanner.bannerDimensions.height.toString()
          )
        : imageHeightOptions[0]
    );
  };

  useEffect(() => {
    if (bannerMedia === "") {
      setIsImageSelected(false);
      setIsUploadClicked(false);
      setDisableUpload(true);
    }
    if (
      activeTo !== "" &&
      bannerMedia !== "" &&
      redirectLink !== "" &&
      (activeTo !== dateFormat(selectedBanner.activeTo, "yyyy-mm-dd") ||
        bannerMedia !== selectedBanner.bannerMedia[0] ||
        redirectLink !== selectedBanner.redirectLink ||
        viewLimit !== selectedBanner.specificAttributes.viewLimit ||
        state
          .map((r) =>
            selectedBanner.specificAttributes.state.some((i) => i === r.value)
          )
          .includes(false) ||
        state.length !== selectedBanner.specificAttributes.state.length ||
        district
          .map((r) =>
            selectedBanner.specificAttributes.district.some(
              (i) => i === r.value
            )
          )
          .includes(false) ||
        district.length !== selectedBanner.specificAttributes.district.length ||
        pest
          .map((r) =>
            selectedBanner.specificAttributes.disease.some((i) => i === r.value)
          )
          .includes(false) ||
        pest.length !== selectedBanner.specificAttributes.disease.length ||
        crop
          .map((r) =>
            selectedBanner.specificAttributes.crop.some((i) => i === r.value)
          )
          .includes(false) ||
        crop.length !== selectedBanner.specificAttributes.crop.length ||
        imageHeight.value !== selectedBanner.bannerDimensions.height.toString())
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    activeTo,
    bannerMedia,
    redirectLink,
    bannerPosition,
    state,
    district,
    pest,
    crop,
    viewLimit,
    imageHeight,
  ]);

  const onImageHeightSelection = (value) => {
    setImageHeight(value);
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
              <Modal.Title className="mpdalTitle">Edit Map Banner</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Banner Name:</label>
                </div>
                <div className="col-6">
                  <p className="presentBannerNameStyle">
                    {selectedBanner.bannerName}
                  </p>
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Banner Media:</label>
                </div>
                <div className="col-7 d-flex">
                  {isBannerMediaLoading ? (
                    <div className="col-8">
                      <Spinner color="success" size="sm" />
                    </div>
                  ) : (
                    <input
                      type="text"
                      onChange={(e) => {
                        setBannerMedia(e.target.value);
                      }}
                      value={bannerMedia}
                      className="inputStyle"
                    />
                  )}
                  <div className="d-flex">
                    <label
                      htmlFor={"banner-upload" + props.id}
                      className="custom-file-upload btn btn-sm btn-light m-auto"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light m-auto"
                      disabled={disableUpload}
                      onClick={async () => {
                        setDisableUpload(true);
                        await uploadMediaImage(bannerMedia).then(() => {
                          setIsUploadClicked(true);
                          setBannerMedia(store.getState().fileUpload.data);
                        });
                      }}
                    >
                      <i className="fa fa-cloud-upload"></i> Upload
                    </Button>
                  </div>
                  <input
                    id={"banner-upload" + props.id}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files[0].type.startsWith("image/")) {
                        Alert.error("Please upload a valid image");
                      } else {
                        setIsImageSelected(true);
                        setDisableUpload(false);
                        setBannerMedia(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Tag Name:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setTagName(e.target.value);
                    }}
                    value={tagName}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div> */}
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
                    min={props.minDate}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              {/* <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Label:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                    value={label}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div> */}

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Redirect Link:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setRedirectLink(e.target.value);
                    }}
                    value={redirectLink}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">View Limit:</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    onChange={(e) => {
                      setViewLimit(e.target.value);
                    }}
                    value={viewLimit}
                    className="inputStyle"
                    min="0"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">States:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={getStates()}
                    placeholder="Select States"
                    search={true}
                    onSelect={(value) => {
                      if (value) {
                        setState(value);
                      } else {
                        setState([]);
                      }
                      setDistrict([]);
                    }}
                    value={state}
                    isMulti
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Districts:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={
                      state.length > 0
                        ? [].concat(...state.map((r) => getDistricts(r.value)))
                        : []
                    }
                    placeholder="Select Districts"
                    search={true}
                    onSelect={(value) => {
                      if (value) setDistrict(value);
                      else setDistrict([]);
                    }}
                    value={district}
                    isMulti
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Crops:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={
                      props.crops
                        ? props.crops.map((row) => {
                            return {
                              label: row.cropName,
                              value: row.id,
                            };
                          })
                        : []
                    }
                    placeholder="Select Crops"
                    search={true}
                    onSelect={(value) => {
                      if (value) setCrop(value);
                      else setCrop([]);
                    }}
                    value={crop}
                    isMulti
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Diseases:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={
                      props.diseases
                        ? props.diseases.map((row) => {
                            return {
                              label: row.name,
                              value: row.id,
                            };
                          })
                        : []
                    }
                    placeholder="Select Pests"
                    search={true}
                    onSelect={(value) => {
                      if (value) setPest(value);
                      else setPest([]);
                    }}
                    value={pest}
                    isMulti
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Image Height:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={imageHeightOptions}
                    placeholder="Select Image Height"
                    search={false}
                    onSelect={onImageHeightSelection}
                    value={imageHeight}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              {/* <div className="row">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Banner Position:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setBannerPosition(e.target.value);
                    }}
                    value={bannerPosition}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div> */}
              {/* <div className="row">
                <div className="col-1"></div>
                <div className="col-4"></div>
                <div
                  className="col-6"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  {showError ? errmsg : ""}
                </div>
                <div className="col-1"></div>
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

export default EditMapBanner;
