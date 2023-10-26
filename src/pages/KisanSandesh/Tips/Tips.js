/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert, Modal } from "rsuite";
import { Table, Button } from "react-bootstrap";

/**
 * Custom Imports
 */
import DeleteRow from "../../../components/Common/DeleteRow";
import { PageLoader } from "../../../components/Loading/Loading";
import {
  getTips,
  deleteTips,
  createTips,
  updateTipsPublish,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import * as constants from "../../../constants";
import TextInput from "../../../components/Common/TextInput";
import EditTips from "./EditTips";
import { tipsImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";
import CustomCarousel from "../../../components/Carousel/Carousel";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import { validateImageUrl } from "../../../services/CommonServices";
import dateFormat from "dateformat";
import ExcelFileDownload from "../../../components/DownloadOptions/ExcelFileDownload";

//Initial Object for tips create
const initialTips = {
  title: "",
  description: "",
  imageUrls: [],
  likes: 0,
  views: 0,
  tags: [],
  isDeleted: false,
  district: "",
  state: "",
  language: "",
  cropId: "",
  diseaseCauseId: "",
  productCollectionDetails: {
    handle: [],
    link: [],
  },
};

const CarouselModal = (props) => {
  return (
    <Modal
      overflow={false}
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
    >
      <Modal.Body>
        <CustomCarousel data={props.images} />
      </Modal.Body>
    </Modal>
  );
};

/**
 * Component for Tips
 */
const Tips = () => {
  const tips = useSelector((state) => state.kisanSandesh);
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const diseases = useSelector((state) => state.cropDocInfo).diseases;
  const dispatch = useDispatch();
  const store = useStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState([""]);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [uploadDisable, setUploadDisable] = useState([true]);
  const [isImageLoading, setIsImageLoading] = useState({
    loading: false,
    id: 0,
  });
  const [tags, setTags] = useState([]);
  const [language, setLanguage] = useState({
    label: "English",
    value: "6086fdd98a9ed09b83f33a93",
  });
  const [postLanguage, setPostLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [crop, setCrop] = useState("");
  const [pest, setPest] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [productHandleNames, setProductHandleNames] = useState("");

  //Fetching tips
  const fetchTips = async (lang) => {
    await dispatch(getTips(lang)).catch((err) => {
      Alert.error(err.message);
    });
  };

  //Get tips
  useEffect(() => {
    fetchTips(language.value);
  }, [language]);

  //Check for create tips
  useEffect(() => {
    if (title !== "" && description !== "" && imageUrl.length !== 0) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [title, description, imageUrl, postLanguage]);

  //Loading Excel Data
  const excelData = tips.tipsData.map((row) => {
    return {
      title: row.title,
      views: row.views,
      createdOn: row.createdOn,
    };
  });

  /**
   * file upload function
   * @param {events} e
   */
  const uploadFile = async (file, id) => {
    setIsImageLoading({
      loading: true,
      id: id,
    });
    await dispatch(tipsImageUpload(file))
      .then(() => {
        Alert.success("Image added successfully");
        setIsImageLoading({
          loading: false,
          id: 0,
        });
      })
      .catch((err) => {
        setIsImageLoading({
          loading: false,
          id: 0,
        });
        Alert.error(err.message);
      });
  };

  //Validate Image Url
  const validateImageUrls = () => {
    for (let i = 0; i < imageUrl.length; i++) {
      if (imageUrl[i] === "") {
        Alert.error("Please upload an image");
        return false;
      }
      if (typeof imageUrl[i] === "object") {
        Alert.error("Please upload the selected image");
        return false;
      } else if (
        !validateImageUrl(imageUrl[i])
        // imageUrl[i] &&
        // !imageUrl[i].toLowerCase().endsWith(".jpg") &&
        // !imageUrl[i].toLowerCase().endsWith(".png") &&
        // !imageUrl[i].toLowerCase().endsWith(".jpeg")
      ) {
        Alert.error("Please enter a valid image url");
        return false;
      }
      return true;
    }
  };

  /**
   * Create Tips submit implementation
   */
  const handleSubmit = async () => {
    if (postLanguage === "") {
      Alert.error("Select language");
    } else if (validateImageUrls()) {
      initialTips.title = title;
      initialTips.description = description;
      initialTips.imageUrls = imageUrl;
      initialTips.tags = tags
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
        .filter((r) => r);
      initialTips.language = postLanguage.value;
      initialTips.state = state.value ? state.value : "";
      initialTips.district = district.value ? district.value : "";
      initialTips.cropId = crop.value ? crop.value : null;
      initialTips.diseaseCauseId = pest.value ? pest.value : null;
      initialTips.productCollectionDetails = {
        handle: productHandleNames.split(","),
        link: [],
      };

      dispatch(createTips(initialTips))
        .then(() => {
          Alert.success("Successfully created tip");
          setTitle("");
          setDescription("");
          setImageUrl([""]);
          setTags([]);
          setState("");
          setDistrict("");
          setCrop("");
          setPest("");
          setProductHandleNames("");
          setSubmitDisable(true);
          setUploadDisable([true]);
          setLanguage(postLanguage);
          fetchTips(postLanguage.value);
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  /**
   * Delete Tips implementation
   * @param {ObjectId} id
   */
  const delTips = (id) => {
    dispatch(deleteTips(id))
      .then(() => {
        Alert.success("Successfully deleted tip");
        fetchTips(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  //Set publish
  const setPublish = async (id, flag) => {
    await dispatch(updateTipsPublish(id, flag))
      .then(() => {
        Alert.success("Successfully updated tips");
        fetchTips(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  return (
    <div>
      <CarouselModal
        showModal={showModal}
        setShowModal={setShowModal}
        images={modalImages}
      />
      <div className="row mb-2">
        <div className="col-6 d-flex align-items-center">
          <h2 className="mainHeading">Tips</h2>
        </div>
        <div className="col-6">
          <div style={{ width: "200px", float: "right" }}>
            <CustomSelect
              data={tips.languagesData?.map((r) => {
                return {
                  label: r.langName,
                  value: r.id,
                };
              })}
              placeholder="Select Language"
              search={false}
              onSelect={(value) => {
                setPostLanguage(value);
              }}
              value={postLanguage}
            />
          </div>
        </div>
      </div>
      <div className="tableMainSection cardShadow space-md-inr">
        <form>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Title:"
                id="title"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={title}
                inputClass="inputStyle"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <div className={"form-group"}>
                <label htmlFor={"tips-tags"} className="bannerLableStyle">
                  Tags: (Optional)
                </label>
                <CustomCreatable
                  name={"tips-tags"}
                  isMulti={true}
                  value={tags}
                  placeholder="Add Tags"
                  onSelect={(values) => {
                    setTags(values);
                  }}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor={"news-state"} className="bannerLableStyle">
                  State: (Optional)
                </label>
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
              <div className={"form-group"}>
                <label htmlFor={"news-crop"} className="bannerLableStyle">
                  Crop: (Optional)
                </label>
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
              <div className={"form-group"}>
                <label htmlFor={"products-handle"} className="bannerLableStyle">
                  Products: (Comma seperated handle names)
                </label>
                <textarea
                  value={productHandleNames}
                  cols="30"
                  rows="4"
                  name="products-handle"
                  className="inputStyle"
                  onChange={(e) => setProductHandleNames(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className={"form-group"}>
                <label
                  htmlFor={"tips-description"}
                  className="bannerLableStyle"
                >
                  Description:
                </label>
                <textarea
                  value={description}
                  cols="30"
                  rows="4"
                  name="tips-description"
                  className="inputStyle"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor={"news-district"} className="bannerLableStyle">
                  District: (Optional)
                </label>
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
              <div className={"form-group"}>
                <label htmlFor={"news-district"} className="bannerLableStyle">
                  Pest: (Optional)
                </label>
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

            <div className="col-12 col-sm-6 col-md-4">
              {imageUrl.map((r, k) => {
                return (
                  <div className="row mb-3" key={k}>
                    <div className="col-12 d-flex111 align-items-center">
                      <TextInput
                        labelName={"ImageUrl " + (k + 1) + ":"}
                        id={"ImageUrl " + (k + 1) + ":"}
                        labelClass="bannerLableStyle"
                        divClass="form-group"
                        type="text"
                        value={r}
                        inputClass="inputStyle"
                        onChange={(e) => {
                          let dupImages = [...imageUrl];
                          dupImages[k] = e.target.value;
                          setImageUrl(dupImages);
                        }}
                      />
                    </div>
                    <div className="col-4 d-flex">
                      <label
                        htmlFor={"tips-image-upload" + k.toString()}
                        className="custom-file-upload btn btn-sm btn-light mx-1"
                      >
                        <i className="fa fa-picture-o"></i> Select
                      </label>
                      <Button
                        className="custom-file-upload btn btn-sm btn-light mx-1"
                        disabled={uploadDisable[k]}
                        onClick={async () => {
                          let disableUpload = [...uploadDisable];
                          disableUpload[k] = true;
                          setUploadDisable(disableUpload);
                          try {
                            await uploadFile(r, k).then(() => {
                              let newImages = [...imageUrl];
                              newImages[k] =
                                store.getState().kisanSandeshImages.tipsImageUrl;
                              setImageUrl(newImages);
                            });
                          } catch (err) {
                            Alert.error(err.message);
                          }
                        }}
                      >
                        <i className="fa fa-cloud-upload"></i> Upload
                      </Button>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center mt-2">
                      {isImageLoading.loading && isImageLoading.id === k ? (
                        <Spinner color="success" size="sm" />
                      ) : (
                        <div className="d-flex">
                          {r && (
                            <img
                              src={
                                typeof r !== "object" && r.startsWith("tips/")
                                  ? constants.mediaUrl + r + constants.sasToken
                                  : r
                              }
                              height="80px"
                              width="100%"
                              alt={r?.name || "Not Found"}
                            />
                          )}
                        </div>
                      )}
                      <input
                        id={"tips-image-upload" + k.toString()}
                        type="file"
                        style={{ display: "none" }}
                        accept={"image/*"}
                        onChange={(e) => {
                          if (!e.target.files[0].type.startsWith("image/")) {
                            Alert.error("Please upload a valid image");
                          } else {
                            let disableUpload = [...uploadDisable];
                            disableUpload[k] = false;
                            setUploadDisable(disableUpload);
                            let newImages = [...imageUrl];
                            newImages[k] = e.target.files[0];
                            setImageUrl(newImages);
                          }
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <Button
                    className="btn btn-sm btn-success m-1"
                    onClick={() => {
                      setImageUrl(imageUrl.concat(""));
                      setUploadDisable(uploadDisable.concat(true));
                    }}
                  >
                    <i className="fa fa-plus"></i> Add Image
                  </Button>
                  <Button
                    className="btn btn-sm btn-danger m-1"
                    onClick={() => {
                      setImageUrl(imageUrl.slice(0, -1));
                      setUploadDisable(uploadDisable.slice(0, -1));
                    }}
                    disabled={imageUrl.length === 1}
                  >
                    <i className="fa fa-remove"></i> Remove Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                className="btn btn-md btn-primary"
                disabled={submitDisable}
                onClick={() => {
                  handleSubmit();
                  setSubmitDisable(true);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Excel Component */}
      <div className="row mb-2">
        <div
          className="col-12"
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <ExcelFileDownload
            data={excelData}
            fileName="Ks_Tips"
            name="Export Data"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div style={{ width: "200px", margin: 10, float: "right" }}>
            <CustomSelect
              data={tips.languagesData.map((r) => {
                return {
                  label: r.langName,
                  value: r.id,
                };
              })}
              placeholder="Select Language"
              search={false}
              onSelect={(value) => setLanguage(value)}
              value={language}
            />
          </div>
          <div className="tableMainSection cardShadow createBannerTable">
            {tips.tipsLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Tip Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Tags</th>
                    <th>Views</th>
                    <th>Published</th>
                    <th>Created On</th>
                    <th>Product Handles</th>
                    <th style={{ width: "100px" }}>&nbsp;</th>
                    <th style={{ width: "100px" }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {tips.tipsData?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <div
                          style={{
                            width: "200px",
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setShowModal(true);
                              setModalImages(
                                item.imageUrls.map((imageUrl) => {
                                  return imageUrl.startsWith("tips/")
                                    ? constants.mediaUrl +
                                        imageUrl +
                                        constants.sasToken
                                    : imageUrl;
                                })
                              );
                            }}
                          >
                            View Images
                          </Button>
                        </div>
                        {/* <div style={{ width: "200px", height: "100px" }}>
                          <CustomCarousel
                            data={item.imageUrls.map((imageUrl) => {
                              return imageUrl.startsWith("tips/")
                                ? constants.mediaUrl + imageUrl
                                : imageUrl;
                            })}
                          />
                        </div> */}
                      </td>
                      <td>
                        {item.tags.map((r) => (
                          <div>{r}</div>
                        ))}
                      </td>
                      <td>{item.views}</td>
                      <td>
                        {item.isPublished ? (
                          <Button
                            className="btn btn-sm btn-success"
                            onClick={() => setPublish(item.id, false)}
                          >
                            Published
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              if (
                                item.title &&
                                item.description &&
                                item.imageUrls.length !== 0
                              ) {
                                setPublish(item.id, true);
                              } else {
                                Alert.error("Data is insufficient to publish");
                              }
                            }}
                          >
                            Unpublished
                          </Button>
                        )}
                      </td>
                      <td>
                        {dateFormat(item.createdOn, "yyyy-mm-dd HH:MM TT")}
                      </td>
                      <td>{item.productCollectionDetails.handle.join(",")}</td>
                      <td style={{ width: "100px" }}>
                        <EditTips
                          id={item.id}
                          language={language.value}
                          crops={crops}
                          diseases={diseases}
                        />
                      </td>
                      <td style={{ width: "100px" }}>
                        <DeleteRow
                          id={item.id}
                          name={item.title}
                          deleterow={delTips}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <CustomCarousel />
        </div>
      </div>
    </div>
  );
};

export default Tips;
