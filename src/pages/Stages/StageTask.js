/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import RichTextEditor from "react-rte";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import { stageTaskImageUpload } from "../../redux/actions/AddStageRecords/stageImageUpload";
import { addStageTask } from "../../redux/actions/AddStageRecords/stageRecords";
import * as constants from "../../constants";
import { validateImageUrl } from "../../services/CommonServices";

/**
 * Toolbar configuration for rich text editor
 */
const toolbarConfig = {
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ],
};

let stageTask = {
  taskName: "",
  taskCategory: "",
  taskDescription: "",
  taskInstructions: "",
  stageIds: [],
  imageUrl: "",
  translations: {
    te: {
      taskName: "",
      taskCategory: "",
      taskDescription: "",
      taskInstructions: "",
    },
    hi: {
      taskName: "",
      taskCategory: "",
      taskDescription: "",
      taskInstructions: "",
    },
    ta: {
      taskName: "",
      taskCategory: "",
      taskDescription: "",
      taskInstructions: "",
    },
    kn: {
      taskName: "",
      taskCategory: "",
      taskDescription: "",
      taskInstructions: "",
    },
    
  },
};
const StageTask = () => {
  const stages = useSelector((state) => state.stageRecords).stages;
  const crops = useSelector((state) => state.cropDocInfo).crops;

  const dispatch = useDispatch();
  const store = useStore();

  const [imageLoading, setIsImageLoading] = useState(false);
  const [selectedStages, setSelectedStages] = useState([]);
  const [taskInstructions, setTaskInstructions] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [imageUrl, setImageUrl] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const [uploadDisable, setUploadDisable] = useState(true);
  const [cropId, setCropId] = useState("");
  const [tTaskInstructions, setTTaskInstructions] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });
  const [tTaskName, setTTaskName] = useState({ te: "", hi: "", ta: "", kn: "" });
  const [tTaskCategory, setTTaskCategory] = useState({ te: "", hi: "", ta: "", kn: "" });
  const [tTaskDescription, setTTaskDescription] = useState({ te: "", hi: "", ta: "", kn: "" });

  useEffect(() => {
    if (
      imageUrl &&
      taskName &&
      taskCategory &&
      taskDescription &&
      selectedStages.length !== 0 &&
      taskInstructions.toString("html") !== "<p><br></p>"
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [
    imageUrl,
    taskName,
    taskCategory,
    taskDescription,
    selectedStages,
    taskInstructions,
  ]);

  const uploadStageTaskImage = async (file) => {
    setIsImageLoading(true);
    await dispatch(stageTaskImageUpload(file))
      .then(() => {
        setIsImageLoading(false);
        setImageUrl(store.getState().stagesImageUpload.stageTaskImageUrl);
        Alert.success("Image uploaded successfully");
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  const imageValidation = () => {
    if (typeof imageUrl === "object") {
      Alert.error("Upload selected Image");
    } else if (
      !validateImageUrl(imageUrl)
      // !imageUrl.toLowerCase().endsWith(".jpg") &&
      // !imageUrl.toLowerCase().endsWith(".png") &&
      // !imageUrl.toLowerCase().endsWith(".jpeg")
    ) {
      Alert.error("Enter a valid Image Url");
      return false;
    } else {
      return true;
    }
  };

  const postStageTask = async () => {
    if (imageValidation()) {
      stageTask.taskName = taskName;
      stageTask.taskCategory = taskCategory;
      stageTask.taskDescription = taskDescription;
      stageTask.taskInstructions = taskInstructions.toString("html");
      stageTask.imageUrl = imageUrl;
      stageTask.stageIds = [];
      stageTask.stageIds.push(selectedStages.value);
      stageTask.translations.te.taskName = tTaskName.te;
      stageTask.translations.te.taskCategory = tTaskCategory.te;
      stageTask.translations.te.taskDescription = tTaskDescription.te;
      stageTask.translations.te.taskInstructions =
        tTaskInstructions.te.toString("html");
      stageTask.translations.hi.taskName = tTaskName.hi;
      stageTask.translations.hi.taskCategory = tTaskCategory.hi;
      stageTask.translations.hi.taskDescription = tTaskDescription.hi;
      stageTask.translations.hi.taskInstructions =
        tTaskInstructions.hi.toString("html");
        stageTask.translations.ta.taskName = tTaskName.ta;
      stageTask.translations.ta.taskCategory = tTaskCategory.ta;
      stageTask.translations.ta.taskDescription = tTaskDescription.ta;
      stageTask.translations.ta.taskInstructions =
        tTaskInstructions.ta.toString("html");
        stageTask.translations.kn.taskName = tTaskName.kn;
      stageTask.translations.kn.taskCategory = tTaskCategory.kn;
      stageTask.translations.kn.taskDescription = tTaskDescription.kn;
      stageTask.translations.kn.taskInstructions =
        tTaskInstructions.kn.toString("html");
      await dispatch(addStageTask(stageTask))
        .then(() => {
          Alert.success("Successfully added stage type");
          window.location.reload();
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Add Stage Task</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTaskCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stageTask"
                  cols="50"
                  className="w-100"
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Crop:</label>
              </div>
              <div className="col-12 col-md-8">
                <CustomSelect
                  placeholder="Select Crop"
                  search={true}
                  data={
                    crops
                      ? crops.map((r) => {
                          return { label: r.cropName, value: r.id };
                        })
                      : []
                  }
                  onSelect={(option) => {
                    setCropId(option.value);
                    setSelectedStages("");
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Stages:</label>
              </div>
              <div className="col-12 col-md-8">
                <CustomSelect
                  placeholder="Select Stages"
                  search={true}
                  value={selectedStages}
                  data={
                    stages
                      ? stages
                          .filter((r) => r.cropId === cropId)
                          .map((stage) => {
                            return { label: stage.stageName, value: stage.id };
                          })
                      : []
                  }
                  onSelect={(option) => setSelectedStages(option)}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Image:</label>
              </div>
              <div className="col-12 col-md-8">
                <div className="row mb-3">
                  <div className="col-12 d-flex align-items-center">
                    <input
                      type="text"
                      className="inputStyle"
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                      value={imageUrl}
                    />
                  </div>
                  {/* <div className="col-7 col-sm-6 d-flex mt-2">
                    <label
                      htmlFor={"stagetask-image-upload"}
                      className="custom-file-upload btn btn-sm btn-light mx-1 my-auto"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light mx-1 my-auto"
                      disabled={uploadDisable}
                      onClick={() => {
                        uploadStageTaskImage(imageUrl);
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
                              imageUrl.startsWith("tasks/")
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
                      id={"stagetask-image-upload"}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (!e.target.files[0].type.startsWith("image/")) {
                          Alert.error("Please upload a valid image");
                        } else {
                          setUploadDisable(false);
                          setImageUrl(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 col-md-2 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-12 col-md-10">
                <RichTextEditor
                  value={taskInstructions}
                  onChange={(value) => {
                    setTaskInstructions(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Telugu Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskName({ ...tTaskName, te: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskCategory({ ...tTaskCategory, te: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stageTask"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTTaskDescription({
                      ...tTaskDescription,
                      te: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 col-md-2 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-12 col-md-10">
                <RichTextEditor
                  value={tTaskInstructions.te}
                  onChange={(value) => {
                    setTTaskInstructions({ ...tTaskInstructions, te: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Hindi Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskName({ ...tTaskName, hi: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskCategory({ ...tTaskCategory, hi: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stageTask"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTTaskDescription({
                      ...tTaskDescription,
                      hi: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 col-md-2 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-12 col-md-10">
                <RichTextEditor
                  value={tTaskInstructions.hi}
                  onChange={(value) => {
                    setTTaskInstructions({ ...tTaskInstructions, hi: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Tamil Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskName({ ...tTaskName, ta: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskCategory({ ...tTaskCategory, ta: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stageTask"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTTaskDescription({
                      ...tTaskDescription,
                      ta: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 col-md-2 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-12 col-md-10">
                <RichTextEditor
                  value={tTaskInstructions.ta}
                  onChange={(value) => {
                    setTTaskInstructions({ ...tTaskInstructions, ta: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Kannada Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskName({ ...tTaskName, kn: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTTaskCategory({ ...tTaskCategory, kn: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stageTask"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTTaskDescription({
                      ...tTaskDescription,
                      kn: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 col-md-2 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-12 col-md-10">
                <RichTextEditor
                  value={tTaskInstructions.kn}
                  onChange={(value) => {
                    setTTaskInstructions({ ...tTaskInstructions, kn: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
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
                postStageTask();
                setSubmitDisable();
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

export default StageTask;
