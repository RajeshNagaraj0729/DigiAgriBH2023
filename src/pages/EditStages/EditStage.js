import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { updateCropStageByIdApi } from "../../redux/actions/AddStageRecords/stageRecords";

let updatePayload = {
  id: "",
  cropId: "",
  stageType: [],
  stageName: "",
  description: "",
  weekPeriod: {
    startWeek: 0,
    endWeek: 0,
  },
  imageUrl: "",
  translations: {
    hi: {
      stageName: "",
      description: "",
    },
    te: {
      stageName: "",
      description: "",
    },
    ta: {
      stageName: "",
      description: "",
    },
    kn: {
      stageName: "",
      description: "",
    },
  },
};

const EditStage = (props) => {
  const { dataToEdit, afterUpdateAction } = props;

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [stageName, setStageName] = useState("");
  const [description, setDescription] = useState("");
  const [langStageNames, setLangStageName] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });
  const [langDescription, setLangDescription] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      langStageNames.ta !== "" &&
      langStageNames.kn !== "" &&
      langDescription.ta !== "" &&
      langDescription.kn !== "" &&
      (langStageNames.ta !== dataToEdit.translations.ta.stageName ||
        langStageNames.kn !== dataToEdit.translations.kn.stageName ||
        langDescription.ta !== dataToEdit.translations.ta.description ||
        langDescription.kn !== dataToEdit.translations.kn.description)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [langStageNames, langDescription]);

  const handleModalShow = () => {
    setShowModal(true);
    setDisable(true);
    if (dataToEdit) {
      setStageName(dataToEdit.stageName);
      setDescription(dataToEdit.description);
      setLangStageName({
        te: dataToEdit.translations.te.stageName,
        hi: dataToEdit.translations.hi.stageName,
        ta: dataToEdit.translations.ta.stageName,
        kn: dataToEdit.translations.kn.stageName,
      });
      setLangDescription({
        te: dataToEdit.translations.te.description,
        hi: dataToEdit.translations.hi.description,
        ta: dataToEdit.translations.ta.description,
        kn: dataToEdit.translations.kn.description,
      });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      updatePayload.id = dataToEdit.id;
      updatePayload.cropId = dataToEdit.cropId;
      updatePayload.stageType = dataToEdit.stageType;
      updatePayload.stageName = stageName;
      updatePayload.description = description;
      updatePayload.weekPeriod = dataToEdit.weekPeriod;
      updatePayload.imageUrl = dataToEdit.imageUrl;
      updatePayload.translations = {
        hi: {
          stageName: langStageNames.hi,
          description: langDescription.hi,
        },
        te: {
          stageName: langStageNames.te,
          description: langDescription.te,
        },
        ta: {
          stageName: langStageNames.ta,
          description: langDescription.ta,
        },
        kn: {
          stageName: langStageNames.kn,
          description: langDescription.kn,
        },
      };

      await dispatch(updateCropStageByIdApi(updatePayload))
        .then(() => {
          handleModalClose();
          Alert.success("Updated Successfully");
          afterUpdateAction(dataToEdit.cropId);
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
              <Modal.Title className="mpdalTitle">Edit Stage Data</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setStageName(e.target.value);
                  }}
                  value={stageName}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Telugu Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangStageName({
                      ...langStageNames,
                      te: e.target.value,
                    });
                  }}
                  value={langStageNames.te}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langDescription.te}
                  onChange={(e) =>
                    setLangDescription({
                      ...langDescription,
                      te: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Hindi Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-9">
                <input
                  disabled={true}
                  type="text"
                  onChange={(e) => {
                    setLangStageName({
                      ...langStageNames,
                      hi: e.target.value,
                    });
                  }}
                  value={langStageNames.hi}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  disabled={true}
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langDescription.hi}
                  onChange={(e) =>
                    setLangDescription({
                      ...langDescription,
                      hi: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Tamil Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangStageName({
                      ...langStageNames,
                      ta: e.target.value,
                    });
                  }}
                  value={langStageNames.ta}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langDescription.ta}
                  onChange={(e) =>
                    setLangDescription({
                      ...langDescription,
                      ta: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Kannada Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  onChange={(e) => {
                    setLangStageName({
                      ...langStageNames,
                      kn: e.target.value,
                    });
                  }}
                  value={langStageNames.kn}
                  className="inputStyle"
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <textarea
                  name="description"
                  cols="50"
                  rows="3"
                  className="w-100"
                  value={langDescription.kn}
                  onChange={(e) =>
                    setLangDescription({
                      ...langDescription,
                      kn: e.target.value,
                    })
                  }
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

export default EditStage;
