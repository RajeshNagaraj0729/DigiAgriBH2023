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
  getTips,
  updateTips,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import { tipsImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import { validateImageUrl } from "../../../services/CommonServices";

//Initial Object for update
const initialValue = {
  id: "",
  title: "",
  description: "",
  imageUrls: "",
  tags: [],
  state: "",
  district: "",
  cropId: "",
  diseaseCauseId: "",
  productCollectionDetails: {
    handle: [],
    link: [],
  },
};

/**
 * Edit Tips Implementation
 * @param {Object} props
 * props from Tips Page
 */
const EditTips = (props) => {
  const store = useStore();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const kisanVartha = useSelector((state) => state.kisanSandesh);
  const dispatch = useDispatch();
  const selectedTips = kisanVartha.tipsData.filter((r) => r.id === props.id)[0];
  const [disableUpload, setDisableUpload] = useState(
    selectedTips.imageUrls.map((r) => true)
  );
  const [isImageLoading, setIsImageLoading] = useState({
    loading: false,
    id: 0,
  });
  const [title, setTitle] = useState(selectedTips.title);
  const [description, setDescription] = useState(selectedTips.description);
  const [imageUrls, setimageUrls] = useState(selectedTips.imageUrls);
  const [tags, setTags] = useState(
    selectedTips.tags.map((r) => {
      return { label: r, value: r };
    })
  );
  const [state, setState] = useState(
    selectedTips.state
      ? {
          label: selectedTips.state,
          value: selectedTips.state,
        }
      : ""
  );
  const [district, setDistrict] = useState(
    selectedTips.district
      ? {
          label: selectedTips.district,
          value: selectedTips.district,
        }
      : ""
  );
  const [crop, setCrop] = useState(
    selectedTips.cropId
      ? {
          label: props.crops.filter((r) => r.id === selectedTips.cropId)[0]
            ?.cropName,
          value: selectedTips.cropId,
        }
      : ""
  );
  const [pest, setPest] = useState(
    selectedTips.diseaseCauseId
      ? {
          label: props.diseases.filter(
            (r) => r.id === selectedTips.diseaseCauseId
          )[0]?.name,
          value: selectedTips.diseaseCauseId,
        }
      : ""
  );
  const [productHandleNames, setProductHandleNames] = useState(
    selectedTips.productCollectionDetails.handle.join(",")
  );

  //Validate Image Urls
  const validateImageUrls = () => {
    for (let i = 0; i < imageUrls.length; i++) {
      if (imageUrls[i] === "") {
        Alert.error("Please upload an image");
        return false;
      }
      if (typeof imageUrls[i] === "object") {
        Alert.error("Please upload the selected image");
        return false;
      } else if (
        !validateImageUrl(imageUrls[i])
        // imageUrls[i] &&
        // !imageUrls[i].toLowerCase().endsWith(".jpg") &&
        // !imageUrls[i].toLowerCase().endsWith(".png") &&
        // !imageUrls[i].toLowerCase().endsWith(".jpeg")
      ) {
        Alert.error("Please enter a valid image url");
        return false;
      }
      return true;
    }
  };

  //Edit banner submit
  const handleSubmit = async () => {
    if (validateImageUrls()) {
      initialValue.id = props.id;
      initialValue.title = title;
      initialValue.description = description;
      initialValue.imageUrls = imageUrls;
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
      initialValue.productCollectionDetails = {
        handle: productHandleNames.split(","),
        link: [],
      };

      await dispatch(updateTips(initialValue))
        .then(() => {
          handleModalClose();
          dispatch(getTips(props.language));
          Alert.success("Updated Successfully");
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  //Upload Media Image
  const uploadImage = async (file, id) => {
    setIsImageLoading({ loading: true, id: id });
    await dispatch(tipsImageUpload(file))
      .then(() => {
        Alert.success("Image added successfully");
        let newImages = [...imageUrls];
        newImages[id] = store.getState().kisanSandeshImages.tipsImageUrl;
        setimageUrls(newImages);
        setIsImageLoading({ loading: false, id: 0 });
      })
      .catch((err) => {
        setIsImageLoading({ loading: false, id: 0 });
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
    setTitle(selectedTips.title);
    setDescription(selectedTips.description);
    setimageUrls(selectedTips.imageUrls);
    setTags(
      selectedTips.tags.map((r) => {
        return { label: r, value: r };
      })
    );
    setDisableUpload(true);
    setDisable(true);
    setState(
      selectedTips.state
        ? {
            label: selectedTips.state,
            value: selectedTips.state,
          }
        : ""
    );
    setDistrict(
      selectedTips.district
        ? {
            label: selectedTips.district,
            value: selectedTips.district,
          }
        : ""
    );
    setCrop(
      selectedTips.cropId
        ? {
            label: props.crops.filter((r) => r.id === selectedTips.cropId)[0]
              ?.cropName,
            value: selectedTips.cropId,
          }
        : ""
    );
    setPest(
      selectedTips.diseaseCauseId
        ? {
            label: props.diseases.filter(
              (r) => r.id === selectedTips.diseaseCauseId
            )[0]?.name,
            value: selectedTips.diseaseCauseId,
          }
        : ""
    );
    setProductHandleNames(
      selectedTips.productCollectionDetails.handle.join(",")
    );
  };

  //Check for empty values
  useEffect(() => {
    if (
      title !== "" &&
      description !== "" &&
      imageUrls.length !== 0 &&
      (title !== selectedTips.title ||
        description !== selectedTips.description ||
        imageUrls
          .map((r) => selectedTips.imageUrls.some((i) => i === r))
          .includes(false) ||
        (tags &&
          (tags
            .map((r) => selectedTips.tags.some((i) => i === r.label))
            .includes(false) ||
            tags.length !== selectedTips.tags.length)) ||
        (state && state.value !== selectedTips.state) ||
        (district && district.value !== selectedTips.district) ||
        (crop && crop.value !== selectedTips.cropId) ||
        (pest && pest.value !== selectedTips.diseaseCauseId) ||
        productHandleNames !==
          selectedTips.productCollectionDetails.handle.join(","))
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    title,
    description,
    imageUrls,
    tags,
    state,
    district,
    pest,
    crop,
    productHandleNames,
  ]);
  return (
    <div>
      <button onClick={handleModalShow} className="btn btn-sm btn-warning">
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
              <Modal.Title className="mpdalTitle">Edit Tips</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              {imageUrls.map((r, k) => (
                <div className="row mb-3">
                  <div className="col-1"></div>
                  <div className="col-4 align-self-center">
                    <label className="bannerLableStyle">
                      Image Url{k + 1}:
                    </label>
                  </div>
                  <div className="col-7 d-flex">
                    {isImageLoading.loading && isImageLoading.id === k ? (
                      <div className="col-8">
                        <Spinner color="success" size="sm" />
                      </div>
                    ) : (
                      <input
                        type="text"
                        onChange={(e) => {
                          let dupImages = [...imageUrls];
                          dupImages[k] = e.target.value;
                          setimageUrls(dupImages);
                        }}
                        value={r}
                        className="inputStyle"
                      />
                    )}
                    <div className="d-flex">
                      <label
                        htmlFor={"tips-image-upload" + props.id + (k + 1)}
                        className="custom-file-upload btn btn-sm btn-light m-auto"
                      >
                        <i className="fa fa-picture-o"></i> Select
                      </label>
                      <Button
                        className="custom-file-upload btn btn-sm btn-light m-auto"
                        disabled={disableUpload[k]}
                        onClick={async () => {
                          let disUpload = [...disableUpload];
                          disUpload[k] = true;
                          setDisableUpload(disUpload);
                          await uploadImage(r, k);
                        }}
                      >
                        <i className="fa fa-cloud-upload"></i> Upload
                      </Button>
                    </div>
                    <input
                      id={"tips-image-upload" + props.id + (k + 1)}
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          Alert.error("Please upload a valid image");
                        } else {
                          let disUpload = [...disableUpload];
                          disUpload[k] = false;
                          setDisableUpload(disUpload);
                          let newImages = [...imageUrls];
                          newImages[k] = e.target.files[0];
                          setimageUrls(newImages);
                        }
                      }}
                      onClick={(e) => (e.target.value = "")}
                    />
                  </div>
                </div>
              ))}

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
                  <label className="bannerLableStyle">Description:</label>
                </div>
                <div className="col-6">
                  <textarea
                    value={description}
                    cols="30"
                    name="tips-description"
                    className={"w-100"}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Tags:</label>
                </div>
                <div className="col-6">
                  <CustomCreatable
                    name={"tips-tags" + props.id}
                    isMulti={true}
                    placeholder="Add Tags"
                    value={tags}
                    onSelect={(values) => {
                      setTags(values);
                    }}
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
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">District:</label>
                </div>
                <div className="col-6">
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
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Crop:</label>
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
                    placeholder="Select Crop"
                    search={false}
                    onSelect={(value) => {
                      setCrop(value);
                    }}
                    value={crop}
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Pest:</label>
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
                    placeholder="Select Pest"
                    search={false}
                    onSelect={(value) => {
                      setPest(value);
                    }}
                    value={pest}
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">
                    Products: (Comma seperated handle names)
                  </label>
                </div>
                <div className="col-6">
                  <textarea
                    value={productHandleNames}
                    cols="30"
                    rows="4"
                    name="products-handle"
                    className={"w-100"}
                    onChange={(e) => setProductHandleNames(e.target.value)}
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

export default EditTips;
