import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import RichTextEditor from "react-rte";

import { updateCropStageTasksByIdApi } from "../../redux/actions/AddStageRecords/stageRecords";

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

let updatePayload = {
  id: "",
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

const EditStageTasks = (props) => {
  const { dataToEdit, afterUpdateAction } = props;

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskInstructions, setTaskInstructions] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [langTaskNames, setLangTaskNames] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });
  const [langTaskCategory, setLangTaskCategory] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });
  const [langTaskDescription, setLangTaskDescription] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });
  const [langTaskInstructions, setLangTaskInstructions] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      langTaskNames.ta !== "" &&
      langTaskNames.kn !== "" &&
      langTaskDescription.ta !== "" &&
      langTaskDescription.kn !== "" &&
      langTaskCategory.ta !== "" &&
      langTaskCategory.kn !== "" &&
      langTaskInstructions.ta !== RichTextEditor.createEmptyValue() &&
      langTaskInstructions.kn !== RichTextEditor.createEmptyValue() &&
      (langTaskNames.ta !== dataToEdit.translations.ta.taskName ||
        langTaskNames.kn !== dataToEdit.translations.kn.taskName ||
        langTaskCategory.ta !== dataToEdit.translations.ta.taskCategory ||
        langTaskCategory.kn !== dataToEdit.translations.kn.taskCategory ||
        langTaskDescription.ta !== dataToEdit.translations.ta.taskDescription ||
        langTaskDescription.kn !== dataToEdit.translations.kn.taskDescription ||
        langTaskInstructions.ta.toString("html") !==
          dataToEdit.translations.ta.taskInstructions ||
        langTaskInstructions.kn.toString("html") !==
          dataToEdit.translations.kn.taskInstructions)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    langTaskNames,
    langTaskCategory,
    langTaskDescription,
    langTaskInstructions,
  ]);

  const handleModalShow = () => {
    setShowModal(true);
    setDisable(true);
    if (dataToEdit) {
      setTaskName(dataToEdit.taskName);
      setTaskCategory(dataToEdit.taskCategory);
      setTaskDescription(dataToEdit.taskDescription);
      setTaskInstructions(
        RichTextEditor.createValueFromString(
          dataToEdit.taskInstructions,
          "html"
        )
      );
      setLangTaskNames({
        te: dataToEdit.translations.te.taskName,
        hi: dataToEdit.translations.hi.taskName,
        ta: dataToEdit.translations.ta.taskName,
        kn: dataToEdit.translations.kn.taskName,
      });
      setLangTaskCategory({
        te: dataToEdit.translations.te.taskCategory,
        hi: dataToEdit.translations.hi.taskCategory,
        ta: dataToEdit.translations.ta.taskCategory,
        kn: dataToEdit.translations.kn.taskCategory,
      });
      setLangTaskDescription({
        te: dataToEdit.translations.te.taskDescription,
        hi: dataToEdit.translations.hi.taskDescription,
        ta: dataToEdit.translations.ta.taskDescription,
        kn: dataToEdit.translations.kn.taskDescription,
      });
      setLangTaskInstructions({
        te: RichTextEditor.createValueFromString(
          dataToEdit.translations.te.taskInstructions,
          "html"
        ),
        hi: RichTextEditor.createValueFromString(
          dataToEdit.translations.hi.taskInstructions,
          "html"
        ),
        ta: RichTextEditor.createValueFromString(
          dataToEdit.translations.ta.taskInstructions,
          "html"
        ),
        kn: RichTextEditor.createValueFromString(
          dataToEdit.translations.kn.taskInstructions,
          "html"
        ),
      });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      updatePayload.id = dataToEdit.id;
      updatePayload.taskName = taskName;
      updatePayload.taskCategory = taskCategory;
      updatePayload.taskDescription = taskDescription;
      updatePayload.taskInstructions = taskInstructions.toString("html");
      updatePayload.stageIds = dataToEdit.stageIds;
      updatePayload.imageUrl = dataToEdit.imageUrl;
      updatePayload.translations = {
        te: {
          taskName: langTaskNames.te,
          taskCategory: langTaskCategory.te,
          taskDescription: langTaskDescription.te,
          taskInstructions: langTaskInstructions.te.toString("html"),
        },
        hi: {
          taskName: langTaskNames.hi,
          taskCategory: langTaskCategory.hi,
          taskDescription: langTaskDescription.hi,
          taskInstructions: langTaskInstructions.hi.toString("html"),
        },
        ta: {
          taskName: langTaskNames.ta,
          taskCategory: langTaskCategory.ta,
          taskDescription: langTaskDescription.ta,
          taskInstructions: langTaskInstructions.ta.toString("html"),
        },
        kn: {
          taskName: langTaskNames.kn,
          taskCategory: langTaskCategory.kn,
          taskDescription: langTaskDescription.kn,
          taskInstructions: langTaskInstructions.kn.toString("html"),
        },
      };
      await dispatch(updateCropStageTasksByIdApi(updatePayload))
        .then(() => {
          handleModalClose();
          Alert.success("Updated Successfully");
          afterUpdateAction(dataToEdit.stageIds[0]);
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    } catch (error) {
      Alert.error(error.message);
    }
  };

  return (
    <div>
      <button onClick={handleModalShow} className="btn btn-sm btn-warning">
        Edit
      </button>

      <Modal
        show={showModal}
        onHide={handleModalClose}
        overflow={false}
        size={window.innerWidth < "991" ? "sm" : "lg"}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-9">
              <Modal.Title className="mpdalTitle">
                Edit Stage Tasks Data
              </Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                  value={taskName}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setTaskCategory(e.target.value);
                  }}
                  value={taskCategory}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  disabled={true}
                  value={taskInstructions}
                  onChange={(value) => {
                    setTaskInstructions(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Telugu Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangTaskNames({
                      ...langTaskNames,
                      te: e.target.value,
                    });
                  }}
                  value={langTaskNames.te}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangTaskCategory({
                      ...langTaskCategory,
                      te: e.target.value,
                    });
                  }}
                  value={langTaskCategory.te}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langTaskDescription.te}
                  onChange={(e) =>
                    setLangTaskDescription({
                      ...langTaskDescription,
                      te: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  disabled={true}
                  value={langTaskInstructions.te}
                  onChange={(value) => {
                    setLangTaskInstructions({
                      ...langTaskInstructions,
                      te: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Hindi Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangTaskNames({
                      ...langTaskNames,
                      hi: e.target.value,
                    });
                  }}
                  value={langTaskNames.hi}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangTaskCategory({
                      ...langTaskCategory,
                      hi: e.target.value,
                    });
                  }}
                  value={langTaskCategory.hi}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langTaskDescription.hi}
                  onChange={(e) =>
                    setLangTaskDescription({
                      ...langTaskDescription,
                      hi: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  disabled={true}
                  value={langTaskInstructions.hi}
                  onChange={(value) => {
                    setLangTaskInstructions({
                      ...langTaskInstructions,
                      hi: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Tamil Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangTaskNames({
                      ...langTaskNames,
                      ta: e.target.value,
                    });
                  }}
                  value={langTaskNames.ta}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangTaskCategory({
                      ...langTaskCategory,
                      ta: e.target.value,
                    });
                  }}
                  value={langTaskCategory.ta}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langTaskDescription.ta}
                  onChange={(e) =>
                    setLangTaskDescription({
                      ...langTaskDescription,
                      ta: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langTaskInstructions.ta}
                  onChange={(value) => {
                    setLangTaskInstructions({
                      ...langTaskInstructions,
                      ta: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Kannada Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangTaskNames({
                      ...langTaskNames,
                      kn: e.target.value,
                    });
                  }}
                  value={langTaskNames.kn}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Category:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangTaskCategory({
                      ...langTaskCategory,
                      kn: e.target.value,
                    });
                  }}
                  value={langTaskCategory.kn}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langTaskDescription.kn}
                  onChange={(e) =>
                    setLangTaskDescription({
                      ...langTaskDescription,
                      kn: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Task Instructions:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langTaskInstructions.kn}
                  onChange={(value) => {
                    setLangTaskInstructions({
                      ...langTaskInstructions,
                      kn: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
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

export default EditStageTasks;
