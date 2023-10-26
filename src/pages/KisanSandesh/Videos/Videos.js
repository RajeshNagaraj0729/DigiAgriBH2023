/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";
import { Table, Button } from "react-bootstrap";

/**
 * Custom Imports
 */
import DeleteRow from "../../../components/Common/DeleteRow";
import { PageLoader } from "../../../components/Loading/Loading";
import {
  getVideos,
  deleteVideos,
  createVideos,
  updateVideosPublish,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import * as constants from "../../../constants";
import TextInput from "../../../components/Common/TextInput";
import EditVideos from "./EditVideos";
import { videosImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import { validateImageUrl } from "../../../services/CommonServices";
import dateFormat from "dateformat";
import ExcelFileDownload from "../../../components/DownloadOptions/ExcelFileDownload";

//Initial Object for videos create
const initialVideos = {
  title: "",
  description: "",
  imageUrl: "",
  likes: 0,
  views: 0,
  videoLink: "",
  district: "",
  state: "",
  language: "",
  cropId: "",
  diseaseCauseId: "",
  tags: [],
  isPublished: false,
  isDeleted: false,
};

/**
 * Component for Videos
 */
const Videos = () => {
  const videos = useSelector((state) => state.kisanSandesh);
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const diseases = useSelector((state) => state.cropDocInfo).diseases;
  const dispatch = useDispatch();
  const store = useStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [videoLink, setVideoLink] = useState();
  const [language, setLanguage] = useState({
    label: "English",
    value: "6086fdd98a9ed09b83f33a93",
  });
  const [postLanguage, setPostLanguage] = useState({
    label: "English",
    value: "6086fdd98a9ed09b83f33a93",
  });
  const [crop, setCrop] = useState("");
  const [pest, setPest] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tags, setTags] = useState([]);

  //Fetching videos
  const fetchVideos = async (lang) => {
    await dispatch(getVideos(lang)).catch((err) => {
      Alert.error(err.message);
    });
  };

  //Get videos
  useEffect(() => {
    fetchVideos(language.value);
  }, [language]);

  //Check for create videos
  useEffect(() => {
    if (title !== "" && description !== "" && videoLink !== "") {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [title, description, imageUrl, videoLink]);

  //Loading Excel Data
  const excelData = videos.videosData.map((row) => {
    return {
      title: row.title,
      videoId: row.videoLink,
      views: row.views,
      createdOn: row.createdOn,
    };
  });

  /**
   * file upload function
   * @param {events} e
   */
  const uploadFile = async (file) => {
    setIsImageLoading(true);
    await dispatch(videosImageUpload(file))
      .then(() => {
        setImageUrl(store.getState().kisanSandeshImages.videoImageUrl);
        Alert.success("Image added successfully");
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  /**
   * Create Videos submit implementation
   */
  const handleSubmit = async () => {
    if (typeof imageUrl === "object") {
      Alert.error("Please upload the selected image");
    } else if (imageUrl && !validateImageUrl(imageUrl)) {
      Alert.error("Please enter a valid image url");
    } else {
      initialVideos.title = title;
      initialVideos.description = description;
      initialVideos.imageUrl = imageUrl;
      initialVideos.videoLink = videoLink;
      initialVideos.language = postLanguage.value;
      initialVideos.state = state.value ? state.value : "";
      initialVideos.district = district.value ? district.value : "";
      initialVideos.cropId = crop.value ? crop.value : null;
      initialVideos.diseaseCauseId = pest.value ? pest.value : null;
      initialVideos.tags = tags
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
      dispatch(createVideos(initialVideos))
        .then(() => {
          setTitle("");
          setDescription("");
          setImageUrl("");
          setVideoLink("");
          setState("");
          setDistrict("");
          setCrop("");
          setPest("");
          setTags([]);
          setSubmitDisable(true);
          setDisableUpload(true);
          setLanguage(postLanguage);
          Alert.success("Successfully created video");
          fetchVideos(postLanguage.value);
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };

  /**
   * Delete Videos implementation
   * @param {ObjectId} id
   */
  const delVideos = (id) => {
    dispatch(deleteVideos(id))
      .then(() => {
        Alert.success("Successfully deleted video");
        fetchVideos(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  //Set publish for videos
  const setPublish = async (id, flag) => {
    await dispatch(updateVideosPublish(id, flag))
      .then(() => {
        Alert.success("Successfully updated video");
        fetchVideos(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="col-6  d-flex align-items-center">
          <h2 className="mainHeading">Videos</h2>
        </div>
        <div className="col-6">
          <div style={{ width: "200px", float: "right" }}>
            <CustomSelect
              data={videos.languagesData?.map((r) => {
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
                <label
                  htmlFor={"videos-description"}
                  className="bannerLableStyle"
                >
                  Description:
                </label>
                <textarea
                  value={description}
                  cols="30"
                  rows="4"
                  name="videos-description"
                  className="inputStyle"
                  onChange={(e) => setDescription(e.target.value)}
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
              <TextInput
                labelName="Video Id:"
                id="videoLink"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={videoLink}
                inputClass="inputStyle"
                onChange={(e) => {
                  setVideoLink(e.target.value);
                }}
              />

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
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className="row">
                <div className="col-12">
                  {isImageLoading ? (
                    <Spinner color="success" size="sm" />
                  ) : (
                    <TextInput
                      labelName="Image Url: (Optional)"
                      id={"videos-imageurl"}
                      labelClass="bannerLableStyle"
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
                <div className="col-3 col-lg-5 d-flex mb-2">
                  <label
                    htmlFor={"videos-file-upload"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                  >
                    <i className="fa fa-picture-o"></i> Select
                  </label>
                  <Button
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                    disabled={disableUpload}
                    onClick={async () => {
                      setDisableUpload(true);
                      await uploadFile(imageUrl);
                    }}
                  >
                    <i className="fa fa-cloud-upload"></i> Upload
                  </Button>
                </div>
                <input
                  id={"videos-file-upload"}
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
              <div className={"form-group"}>
                <label htmlFor={"videos-tags"} className="bannerLableStyle">
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
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                className="btn btn-sm btn-primary"
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

      <div className="row">
        <div className="col-12">
          {/* Excel Component */}
          <div className="row mb-2">
            <div
              className="col-12"
              style={{ justifyContent: "flex-end", display: "flex" }}
            >
              <ExcelFileDownload
                data={excelData}
                fileName="Ks_Videos"
                name="Export Data"
              />
            </div>
          </div>
          <div style={{ width: "200px", margin: 10, float: "right" }}>
            <CustomSelect
              data={videos.languagesData?.map((r) => {
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
          <div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
            {videos.videosLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Video Id</th>
                    <th>Views</th>
                    {/* <th>Image</th> */}
                    {/* <th>Likes</th>
                    <th>Views</th> */}
                    <th>Published</th>
                    <th style={{ width: "100px" }}>Created On</th>
                    <th>&nbsp;</th>
                    <th style={{ width: "100px" }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.videosData?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.videoLink}</td>
                      {/* <td>
                        <a
                          target="_blank"
                          href={
                            item.imageUrl.startsWith("kisansandeshvideos/")
                              ? constants.mediaUrl +
                                item.imageUrl +
                                constants.sasToken
                              : item.imageUrl
                          }
                          rel="noreferrer"
                        >
                          <img
                            src={
                              item.imageUrl.startsWith("kisansandeshvideos/")
                                ? constants.mediaUrl +
                                  item.imageUrl +
                                  constants.sasToken
                                : item.imageUrl
                            }
                            alt="Not Uploaded"
                            className="cropDoctorResults"
                          />
                        </a>
                      </td> */}
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
                                item.videoLink
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
                      <td style={{ width: "100px" }}>
                        {dateFormat(item.createdOn, "yyyy-mm-dd HH:MM TT")}
                      </td>
                      {/* <td>{item.likes}</td>
                      <td>{item.views}</td> */}
                      <td>
                        <EditVideos
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
                          deleterow={delVideos}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
