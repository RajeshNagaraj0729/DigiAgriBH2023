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
  getVideos,
  updateVideos,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import { videosImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";
import { validateImageUrl } from "../../../services/CommonServices";

//Initial Object for update
const initialValue = {
  id: "",
  title: "",
  description: "",
  imageUrl: "",
  videoLink: "",
  state: "",
  district: "",
  cropId: "",
  diseaseCauseId: "",
  tags: [],
};

/**
 * Edit Videos Implementation
 * @param {Object} props
 * props from Videos Page
 */
const EditVideos = (props) => {
  const store = useStore();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const kisanVartha = useSelector((state) => state.kisanSandesh);
  const dispatch = useDispatch();
  const selectedVideos = kisanVartha.videosData.filter(
    (r) => r.id === props.id
  )[0];
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [title, setTitle] = useState(selectedVideos.title);
  const [description, setDescription] = useState(selectedVideos.description);
  const [imageUrl, setImageUrl] = useState(selectedVideos.imageUrl);
  const [videoLink, setVideoLink] = useState(selectedVideos.videoLink);
  const [tags, setTags] = useState(
    selectedVideos.tags?.map((r) => {
      return { label: r, value: r };
    })
  );
  const [state, setState] = useState(
    selectedVideos.state
      ? {
          label: selectedVideos.state,
          value: selectedVideos.state,
        }
      : ""
  );
  const [district, setDistrict] = useState(
    selectedVideos.district
      ? {
          label: selectedVideos.district,
          value: selectedVideos.district,
        }
      : ""
  );
  const [crop, setCrop] = useState(
    selectedVideos.cropId
      ? {
          label: props.crops.filter((r) => r.id === selectedVideos.cropId)[0]
            ?.cropName,
          value: selectedVideos.cropId,
        }
      : ""
  );
  const [pest, setPest] = useState(
    selectedVideos.diseaseCauseId
      ? {
          label: props.diseases.filter(
            (r) => r.id === selectedVideos.diseaseCauseId
          )[0]?.name,
          value: selectedVideos.diseaseCauseId,
        }
      : ""
  );

  //Edit banner submit
  const handleSubmit = async () => {
    if (typeof imageUrl === "object") {
      Alert.error("Please upload the selected image");
    } else if (!validateImageUrl(imageUrl)) {
      Alert.error("Please enter a valid Image Url");
    } else {
      initialValue.id = props.id;
      initialValue.title = title;
      initialValue.description = description;
      initialValue.imageUrl = imageUrl;
      initialValue.likes = selectedVideos.likes;
      initialValue.views = selectedVideos.views;
      initialValue.videoLink = videoLink;
      initialValue.tags = [
        ...new Set(
          tags
            .map((r) => r.label)
            .concat(state.value ? state.value : "")
            .concat(district.value ? district.value : "")
            .concat(
              crop.value
                ? props.crops.filter((r) => r.id === crop.value)[0].cropName
                : null
            )
            .concat(
              pest.value
                ? props.diseases.filter((r) => r.id === pest.value)[0].name
                : null
            )
            .filter((r) => r)
        ),
      ];
      initialValue.state = state.value ? state.value : "";
      initialValue.district = district.value ? district.value : "";
      initialValue.cropId = crop.value ? crop.value : null;
      initialValue.diseaseCauseId = pest.value ? pest.value : null;
      await dispatch(updateVideos(initialValue))
        .then(() => {
          handleModalClose();
          dispatch(getVideos(props.language));
          Alert.success("Updated Successfully");
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  //Upload Media Image
  const uploadImage = async (file) => {
    setIsImageLoading(true);
    await dispatch(videosImageUpload(file))
      .then(() => {
        Alert.success("Image added successfully");
        setImageUrl(store.getState().kisanSandeshImages.videoImageUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  //Modal Show
  const handleModalShow = () => {
    setShowModal(true);
  };

  //Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setTitle(selectedVideos.title);
    setDescription(selectedVideos.description);
    setImageUrl(selectedVideos.imageUrl);
    setVideoLink(selectedVideos.videoLink);
    setDisableUpload(true);
    setDisable(true);
    setTags(
      selectedVideos.tags?.map((r) => {
        return { label: r, value: r };
      })
    );
    setState(
      selectedVideos.state
        ? {
            label: selectedVideos.state,
            value: selectedVideos.state,
          }
        : ""
    );
    setDistrict(
      selectedVideos.district
        ? {
            label: selectedVideos.district,
            value: selectedVideos.district,
          }
        : ""
    );
    setCrop(
      selectedVideos.cropId
        ? {
            label: props.crops.filter((r) => r.id === selectedVideos.cropId)[0]
              ?.cropName,
            value: selectedVideos.cropId,
          }
        : ""
    );
    setPest(
      selectedVideos.diseaseCauseId
        ? {
            label: props.diseases.filter(
              (r) => r.id === selectedVideos.diseaseCauseId
            )[0]?.name,
            value: selectedVideos.diseaseCauseId,
          }
        : ""
    );
  };

  //Check for empty values
  useEffect(() => {
    if (
      title !== "" &&
      description !== "" &&
      videoLink !== "" &&
      (title !== selectedVideos.title ||
        description !== selectedVideos.description ||
        imageUrl !== selectedVideos.imageUrl ||
        videoLink !== selectedVideos.videoLink ||
        (tags &&
          (tags
            .map((r) => selectedVideos.tags.some((i) => i === r.label))
            .includes(false) ||
            tags.length !== selectedVideos.tags.length)) ||
        (state && state.value !== selectedVideos.state) ||
        (district && district.value !== selectedVideos.district) ||
        (crop && crop.value !== selectedVideos.cropId) ||
        (pest && pest.value !== selectedVideos.diseaseCauseId))
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    title,
    description,
    imageUrl,
    videoLink,
    state,
    district,
    pest,
    crop,
    tags,
  ]);
  return (
    <div>
      <button
        onClick={handleModalShow}
        className="btn btn-sm btn-warning wordBreak"
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
              <Modal.Title className="mpdalTitle">Edit Videos</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Image Url:</label>
                </div>
                <div className="col-8 d-flex">
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
                      htmlFor={"videos-image-upload" + props.id}
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                      disabled={disableUpload}
                      onClick={async () => {
                        setDisableUpload(true);
                        await uploadImage(imageUrl);
                      }}
                    >
                      <i className="fa fa-cloud-upload"></i> Upload
                    </Button>
                  </div>
                  <input
                    id={"videos-image-upload" + props.id}
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
                    name="videos-description"
                    className={"w-100"}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Video Link:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => {
                      setVideoLink(e.target.value);
                    }}
                    value={videoLink}
                    className="inputStyle"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Tags:</label>
                </div>
                <div className="col-8">
                  <CustomCreatable
                    name={"videos-tags" + props.id}
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
                      props.crops
                        ? props.crops.map((row) => {
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
                      props.diseases
                        ? props.diseases.map((row) => {
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

export default EditVideos;
