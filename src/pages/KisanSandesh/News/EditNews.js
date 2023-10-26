/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import {
  getNews,
  updateNews,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import { newsImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";

//Initial Object for update
const initialValue = {
  id: "",
  title: "",
  description: "",
  imageUrl: "",
  iconUrl: "",
  fullDescription: "",
  state: "",
  district: "",
  cropId: "",
  diseaseCauseId: "",
  sourceName: "",
  iconWidth: 0,
  iconHeight: 0,
  isSourceNameRequired: true,
  tags: [],
};

/**
 * Edit News Implementation
 * @param {Object} props
 * props from News Page
 */
const EditNews = (props) => {
  const store = useStore();

  const kisanVartha = useSelector((state) => state.kisanSandesh);
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const diseases = useSelector((state) => state.cropDocInfo).diseases;

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const selectedNews = kisanVartha.newsData.filter((r) => r.id === props.id)[0];
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState({
    loading: false,
    type: "",
  });
  const [iconImage, setIconImage] = useState(
    selectedNews.iconUrl
      ? {
          label: kisanVartha.newsIcons?.filter(
            (r) => r.imageUrl === selectedNews.iconUrl
          )[0]?.source,
          value: selectedNews.iconUrl,
        }
      : ""
  );
  const [title, setTitle] = useState(selectedNews.title);
  const [description, setDescription] = useState(selectedNews.description);
  const [imageUrl, setImageUrl] = useState(selectedNews.imageUrl);
  const [fullDescription, setFullDescription] = useState(
    selectedNews.fullDescription
  );
  const [tags, setTags] = useState(
    selectedNews.tags?.map((r) => {
      return { label: r, value: r };
    })
  );
  const [state, setState] = useState(
    selectedNews.state
      ? {
          label: selectedNews.state,
          value: selectedNews.state,
        }
      : ""
  );
  const [district, setDistrict] = useState(
    selectedNews.district
      ? {
          label: selectedNews.district,
          value: selectedNews.district,
        }
      : ""
  );
  const [crop, setCrop] = useState(
    selectedNews.cropId
      ? {
          label: crops.filter((r) => r.id === selectedNews.cropId)[0]?.cropName,
          value: selectedNews.cropId,
        }
      : ""
  );
  const [pest, setPest] = useState(
    selectedNews.diseaseCauseId
      ? {
          label: diseases.filter((r) => r.id === selectedNews.diseaseCauseId)[0]
            ?.name,
          value: selectedNews.diseaseCauseId,
        }
      : ""
  );
  const [isSourceNameRequired, setIsSourceNameRequired] = useState(
    selectedNews.isSourceNameRequired
  );

  //Edit banner submit
  const handleSubmit = async () => {
    if (typeof imageUrl === "object") {
      Alert.error("Please upload the selected image");
    } else {
      initialValue.id = props.id;
      initialValue.title = title;
      initialValue.description = description;
      initialValue.imageUrl = imageUrl;
      initialValue.likes = selectedNews.likes;
      initialValue.views = selectedNews.views;
      initialValue.iconUrl = iconImage.value;
      initialValue.fullDescription = fullDescription;
      initialValue.state = state.value ? state.value : "";
      initialValue.district = district.value ? district.value : "";
      initialValue.cropId = crop.value ? crop.value : null;
      initialValue.diseaseCauseId = pest.value ? pest.value : null;
      initialValue.tags = [
        ...new Set(
          tags
            .map((r) => r.label)
            .concat(state.value ? state.value : "")
            .concat(district.value ? district.value : "")
            .concat(
              crop.value
                ? crops.filter((r) => r.id === crop.value)[0].cropName
                : null
            )
            .concat(
              pest.value
                ? diseases.filter((r) => r.id === pest.value)[0].name
                : null
            )
            .filter((r) => r)
        ),
      ];
      initialValue.sourceName = iconImage.label;
      initialValue.iconHeight = kisanVartha.newsIcons?.filter(
        (r) => r.imageUrl === iconImage.value
      )[0]?.height;
      initialValue.iconWidth = kisanVartha.newsIcons?.filter(
        (r) => r.imageUrl === iconImage.value
      )[0]?.width;
      initialValue.isSourceNameRequired = isSourceNameRequired;
      await dispatch(updateNews(initialValue))
        .then(() => {
          handleModalClose();
          dispatch(getNews(props.language));
          Alert.success("Updated Successfully");
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  //Upload Media Image
  const uploadImage = async (file, type) => {
    setIsImageLoading({ loading: true, type: type });
    await dispatch(newsImageUpload(file))
      .then(() => {
        if (type === "image") {
          Alert.success("Image added successfully");
          setImageUrl(store.getState().kisanSandeshImages.newsImageUrl);
        } else {
          Alert.success("Icon added successfully");
          setIconImage(store.getState().kisanSandeshImages.newsImageUrl);
        }
        setIsImageLoading({ loading: false, type: "" });
      })
      .catch((err) => {
        setIsImageLoading({ loading: false, type: "" });
        Alert.error(err.message);
      });
  };

  //Modal Show
  const handleModalShow = () => {
    setShowModal(true);
  };

  const setValues = () => {
    setTitle(selectedNews.title);
    setDescription(selectedNews.description);
    setImageUrl(selectedNews.imageUrl);
    setIconImage(
      selectedNews.iconUrl
        ? {
            label: kisanVartha.newsIcons?.filter(
              (r) => r.imageUrl === selectedNews.iconUrl
            )[0]?.source,
            value: selectedNews.iconUrl,
          }
        : ""
    );
    setDisableUpload(true);
    setDisable(true);
    setFullDescription(selectedNews.fullDescription);
    setTags(
      selectedNews.tags?.map((r) => {
        return { label: r, value: r };
      })
    );
    setState(
      selectedNews.state
        ? {
            label: selectedNews.state,
            value: selectedNews.state,
          }
        : ""
    );
    setDistrict(
      selectedNews.district
        ? {
            label: selectedNews.district,
            value: selectedNews.district,
          }
        : ""
    );
    setCrop(
      selectedNews.cropId
        ? {
            label: crops.filter((r) => r.id === selectedNews.cropId)[0]
              ?.cropName,
            value: selectedNews.cropId,
          }
        : ""
    );
    setPest(
      selectedNews.diseaseCauseId
        ? {
            label: diseases.filter(
              (r) => r.id === selectedNews.diseaseCauseId
            )[0]?.name,
            value: selectedNews.diseaseCauseId,
          }
        : ""
    );
    setIsSourceNameRequired(selectedNews.isSourceNameRequired);
  };

  //Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setValues();
  };

  //Check for empty values
  useEffect(() => {
    if (
      title &&
      description &&
      imageUrl &&
      iconImage &&
      fullDescription &&
      (title !== selectedNews.title ||
        description !== selectedNews.description ||
        imageUrl !== selectedNews.imageUrl ||
        iconImage.value !== selectedNews.iconUrl ||
        fullDescription !== selectedNews.fullDescription ||
        (tags &&
          (tags
            .map((r) => selectedNews.tags.some((i) => i === r.label))
            .includes(false) ||
            tags.length !== selectedNews.tags.length)) ||
        (state && state.value !== selectedNews.state) ||
        (district && district.value !== selectedNews.district) ||
        (crop && crop.value !== selectedNews.cropId) ||
        (pest && pest.value !== selectedNews.diseaseCauseId) ||
        isSourceNameRequired !== selectedNews.isSourceNameRequired)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    title,
    description,
    imageUrl,
    iconImage,
    fullDescription,
    state,
    district,
    pest,
    crop,
    isSourceNameRequired,
    tags,
  ]);
  return (
    <div>
      <button
        onClick={() => {
          handleModalShow();
          setValues();
        }}
        className="btn btn-sm btn-warning"
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
              <Modal.Title className="mpdalTitle">Edit News</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-2">
                <div className="col-4"></div>
                <div className="col-8">
                  <label>
                    <input
                      type="checkbox"
                      checked={isSourceNameRequired}
                      onChange={(e) =>
                        setIsSourceNameRequired(!isSourceNameRequired)
                      }
                    />{" "}
                    Source Name Required
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Image Url:</label>
                </div>
                <div className="col-8 d-flex">
                  {isImageLoading.loading && isImageLoading.type === "image" ? (
                    <div className="col-7">
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
                      htmlFor={"news-image-upload" + props.id}
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                      disabled={disableUpload}
                      onClick={async () => {
                        setDisableUpload(true);
                        await uploadImage(imageUrl, "image");
                      }}
                    >
                      <i className="fa fa-cloud-upload"></i> Upload
                    </Button>
                  </div>
                  <input
                    id={"news-image-upload" + props.id}
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
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">News Source:</label>
                </div>
                <div className="col-8">
                  <CustomSelect
                    data={kisanVartha.newsIcons?.map((r) => {
                      return {
                        label: r.source,
                        value: r.imageUrl,
                      };
                    })}
                    placeholder="Select News Source"
                    search={true}
                    onSelect={(value) => {
                      setIconImage(value);
                    }}
                    value={iconImage}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Title:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    className="inputStyle"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Description:</label>
                </div>
                <div className="col-8">
                  <textarea
                    value={description}
                    cols="34"
                    name="news-description"
                    className={"w-100"}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Tags:</label>
                </div>
                <div className="col-8">
                  <CustomCreatable
                    name={"news-tags" + props.id}
                    isMulti={true}
                    placeholder="Add Tags"
                    value={tags}
                    onSelect={(values) => {
                      setTags(values);
                    }}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">State:</label>
                </div>
                <div className="col-8">
                  <CustomSelect
                    data={getStates()}
                    placeholder="Select State"
                    search={false}
                    onSelect={(value) => {
                      setState(value);
                      setDistrict("");
                    }}
                    value={state}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">District:</label>
                </div>
                <div className="col-8">
                  <CustomSelect
                    data={state.value ? getDistricts(state.value) : []}
                    placeholder="Select District"
                    search={false}
                    onSelect={(value) => {
                      setDistrict(value);
                    }}
                    value={district}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Crop:</label>
                </div>
                <div className="col-8">
                  <CustomSelect
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
                    placeholder="Select Crop"
                    search={false}
                    onSelect={(value) => {
                      setCrop(value);
                    }}
                    value={crop}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Pest:</label>
                </div>
                <div className="col-8">
                  <CustomSelect
                    data={
                      diseases
                        ? diseases.map((row) => {
                            return {
                              label: row.name,
                              value: row.id,
                            };
                          })
                        : []
                    }
                    placeholder="Select Pest"
                    search={false}
                    onSelect={(value) => {
                      setPest(value);
                    }}
                    value={pest}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Full Description:</label>
                </div>
                <div className="col-8">
                  <textarea
                    value={fullDescription}
                    cols="34"
                    rows="5"
                    name="news-fulldescription"
                    className={"w-100"}
                    onChange={(e) => setFullDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-danger"
            onClick={handleModalClose}
            style={{ marginLeft: "5px", marginRight: "5px" }}
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
            style={{ marginLeft: "5px", marginRight: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditNews;
