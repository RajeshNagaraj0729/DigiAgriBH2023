import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import RichTextEditor from "react-rte";
import { updateDiseaseApi } from "../../redux/actions/AddDiseaseRecords/diseaseRecords";

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

const EditDisease = (props) => {
  const { dataToEdit, afterUpdateAction } = props;

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [symptoms, setSymptoms] = useState(() =>
    RichTextEditor.createEmptyValue()
  );
  const [causeDescription, setCauseDescription] = useState(() =>
    RichTextEditor.createEmptyValue()
  );
  const [description, setDescription] = useState(() =>
    RichTextEditor.createEmptyValue()
  );
  const [preventiveMeasures, setPreventiveMeasures] = useState(() =>
    RichTextEditor.createEmptyValue()
  );
  const [chemicalTreatment, setChemicalTreatment] = useState("");
  const [biologicalTreatment, setBiologicalTreatment] = useState("");
  const [langSymptoms, setlangSymptoms] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });
  const [langCauseDescription, setlangCauseDescription] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });
  const [langDescription, setlangDescription] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });
  const [langPreventiveMeasures, setlangPreventiveMeasures] = useState({
    te: RichTextEditor.createEmptyValue(),
    hi: RichTextEditor.createEmptyValue(),
    ta: RichTextEditor.createEmptyValue(),
    kn: RichTextEditor.createEmptyValue(),
  });
  const [langChemicalTreatment, setlangChemicalTreatment] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });
  const [langBiologicalTreatment, setlangBiologicalTreatment] = useState({
    te: "",
    hi: "",
    ta: "",
    kn: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      symptoms.toString("html") !== "" &&
      causeDescription.toString("html") !== "" &&
      preventiveMeasures.toString("html") !== "" &&
      chemicalTreatment !== "" &&
      biologicalTreatment !== "" &&
      langChemicalTreatment.te !== "" &&
      langChemicalTreatment.hi !== "" &&
      langChemicalTreatment.ta !== "" &&
      langChemicalTreatment.kn !== "" &&
      langBiologicalTreatment.te !== "" &&
      langBiologicalTreatment.hi !== "" &&
      langBiologicalTreatment.ta !== "" &&
      langBiologicalTreatment.kn !== "" &&
      langSymptoms.te.toString("html") !== "" &&
      langSymptoms.hi.toString("html") !== "" &&
      langSymptoms.ta.toString("html") !== "" &&
      langSymptoms.kn.toString("html") !== "" &&
      langCauseDescription.te.toString("html") !== "" &&
      langCauseDescription.hi.toString("html") !== "" &&
      langCauseDescription.ta.toString("html") !== "" &&
      langCauseDescription.kn.toString("html") !== "" &&
      langPreventiveMeasures.te.toString("html") !== "" &&
      langPreventiveMeasures.hi.toString("html") !== "" &&
      langPreventiveMeasures.ta.toString("html") !== "" &&
      langPreventiveMeasures.kn.toString("html") !== "" &&
      (chemicalTreatment !==
        dataToEdit.treatment?.chemicalTreatment?.treatmentDescription ||
        biologicalTreatment !==
          dataToEdit.treatment?.biologicalTreatment?.treatmentDescription ||
        langChemicalTreatment.te !==
          dataToEdit.translations.te?.treatment?.chemicalTreatment
            ?.treatmentDescription ||
        langChemicalTreatment.hi !==
          dataToEdit.translations.hi?.treatment?.chemicalTreatment
            ?.treatmentDescription ||
        langChemicalTreatment.ta !==
          dataToEdit.translations.ta?.treatment?.chemicalTreatment
            ?.treatmentDescription ||
        langChemicalTreatment.kn !==
          dataToEdit.translations.kn?.treatment?.chemicalTreatment
            ?.treatmentDescription ||
        langBiologicalTreatment.te !==
          dataToEdit.translations.te?.treatment?.biologicalTreatment
            ?.treatmentDescription ||
        langBiologicalTreatment.hi !==
          dataToEdit.translations.hi?.treatment?.biologicalTreatment
            ?.treatmentDescription ||
        langBiologicalTreatment.ta !==
          dataToEdit.translations.ta?.treatment?.biologicalTreatment
            ?.treatmentDescription ||
        langBiologicalTreatment.kn !==
          dataToEdit.translations.kn?.treatment?.biologicalTreatment
            ?.treatmentDescription ||
        symptoms.toString("html") !== dataToEdit.symptoms ||
        causeDescription.toString("html") !== dataToEdit.causeDescription ||
        description.toString("html") !== dataToEdit.description ||
        preventiveMeasures.toString("html") !== dataToEdit.priventiveMeasures ||
        langSymptoms.te.toString("html") !==
          dataToEdit.translations.te.symptoms ||
        langSymptoms.hi.toString("html") !==
          dataToEdit.translations.hi.symptoms ||
        langSymptoms.ta.toString("html") !==
          dataToEdit.translations.ta.symptoms ||
        langSymptoms.kn.toString("html") !==
          dataToEdit.translations.kn.symptoms ||
        langCauseDescription.te.toString("html") !==
          dataToEdit.translations.te.causeDescription ||
        langCauseDescription.hi.toString("html") !==
          dataToEdit.translations.hi.causeDescription ||
        langCauseDescription.ta.toString("html") !==
          dataToEdit.translations.ta.causeDescription ||
        langCauseDescription.kn.toString("html") !==
          dataToEdit.translations.kn.causeDescription ||
        langDescription.te.toString("html") !==
          dataToEdit.translations.te.description ||
        langDescription.hi.toString("html") !==
          dataToEdit.translations.hi.description ||
        langDescription.ta.toString("html") !==
          dataToEdit.translations.ta.description ||
        langDescription.kn.toString("html") !==
          dataToEdit.translations.kn.description ||
        langPreventiveMeasures.te.toString("html") !==
          dataToEdit.translations.te.priventiveMeasures ||
        langPreventiveMeasures.hi.toString("html") !==
          dataToEdit.translations.hi.priventiveMeasures ||
        langPreventiveMeasures.ta.toString("html") !==
          dataToEdit.translations.ta.priventiveMeasures ||
        langPreventiveMeasures.kn.toString("html") !==
          dataToEdit.translations.kn.priventiveMeasures)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    chemicalTreatment,
    biologicalTreatment,
    langChemicalTreatment,
    langBiologicalTreatment,
    symptoms,
    causeDescription,
    description,
    preventiveMeasures,
    langSymptoms,
    langCauseDescription,
    langDescription,
    langPreventiveMeasures,
  ]);

  const handleModalShow = () => {
    try {
      setShowModal(true);
      setDisable(true);
      if (dataToEdit) {
        setSymptoms(
          RichTextEditor.createValueFromString(dataToEdit.symptoms, "html")
        );
        setPreventiveMeasures(
          RichTextEditor.createValueFromString(
            dataToEdit.priventiveMeasures,
            "html"
          )
        );
        setCauseDescription(
          RichTextEditor.createValueFromString(
            dataToEdit.causeDescription,
            "html"
          )
        );
        setDescription(
          RichTextEditor.createValueFromString(dataToEdit.description, "html")
        );
        setChemicalTreatment(
          dataToEdit.treatment?.chemicalTreatment?.treatmentDescription
        );
        setBiologicalTreatment(
          dataToEdit.treatment?.biologicalTreatment?.treatmentDescription
        );

        setlangSymptoms({
          te: RichTextEditor.createValueFromString(
            dataToEdit.translations.te.symptoms,
            "html"
          ),
          hi: RichTextEditor.createValueFromString(
            dataToEdit.translations.hi.symptoms,
            "html"
          ),
          ta: RichTextEditor.createValueFromString(
            dataToEdit.translations.ta.symptoms || "",
            "html"
          ),
          kn: RichTextEditor.createValueFromString(
            dataToEdit.translations.kn.symptoms || "",
            "html"
          ),
        });
        setlangPreventiveMeasures({
          te: RichTextEditor.createValueFromString(
            dataToEdit.translations.te.priventiveMeasures,
            "html"
          ),
          hi: RichTextEditor.createValueFromString(
            dataToEdit.translations.hi.priventiveMeasures,
            "html"
          ),
          ta: RichTextEditor.createValueFromString(
            dataToEdit.translations.ta.priventiveMeasures || "",
            "html"
          ),
          kn: RichTextEditor.createValueFromString(
            dataToEdit.translations.kn.priventiveMeasures || "",
            "html"
          ),
        });
        setlangCauseDescription({
          te: RichTextEditor.createValueFromString(
            dataToEdit.translations.te.causeDescription,
            "html"
          ),
          hi: RichTextEditor.createValueFromString(
            dataToEdit.translations.hi.causeDescription,
            "html"
          ),
          ta: RichTextEditor.createValueFromString(
            dataToEdit.translations.ta.causeDescription || "",
            "html"
          ),
          kn: RichTextEditor.createValueFromString(
            dataToEdit.translations.kn.causeDescription || "",
            "html"
          ),
        });
        setlangDescription({
          te: RichTextEditor.createValueFromString(
            dataToEdit.translations.te.description,
            "html"
          ),
          hi: RichTextEditor.createValueFromString(
            dataToEdit.translations.hi.description,
            "html"
          ),
          ta: RichTextEditor.createValueFromString(
            dataToEdit.translations.ta.description || "",
            "html"
          ),
          kn: RichTextEditor.createValueFromString(
            dataToEdit.translations.kn.description || "",
            "html"
          ),
        });
        setlangChemicalTreatment({
          te: dataToEdit.translations.te?.treatment?.chemicalTreatment
            ?.treatmentDescription,
          hi: dataToEdit.translations.hi?.treatment?.chemicalTreatment
            ?.treatmentDescription,
          ta: dataToEdit.translations.ta?.treatment?.chemicalTreatment
            ?.treatmentDescription,
          kn: dataToEdit.translations.kn?.treatment?.chemicalTreatment
            ?.treatmentDescription,
        });
        setlangBiologicalTreatment({
          te: dataToEdit.translations.te?.treatment?.biologicalTreatment
            ?.treatmentDescription,
          hi: dataToEdit.translations.hi?.treatment?.biologicalTreatment
            ?.treatmentDescription,
          ta: dataToEdit.translations.ta?.treatment?.biologicalTreatment
            ?.treatmentDescription,
          kn: dataToEdit.translations.kn?.treatment?.biologicalTreatment
            ?.treatmentDescription,
        });
      }
    } catch (error) {
      Alert.error(error.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      let updatePayload = {
        id: dataToEdit.id,
        diseaseCauseId: dataToEdit.diseaseCauseId,
        causeDescription: causeDescription.toString("html"),
        description: description.toString("html"),
        visionTags: dataToEdit.visionTags,
        symptoms: symptoms.toString("html"),
        priventiveMeasures: preventiveMeasures.toString("html"),
        treatment: {
          biologicalTreatment: {
            treatmentDescription: biologicalTreatment,
            products: dataToEdit.treatment.biologicalTreatment.products,
            collectionIds:
              dataToEdit.treatment.biologicalTreatment.collectionIds,
          },
          chemicalTreatment: {
            treatmentDescription: chemicalTreatment,
            products: dataToEdit.treatment.chemicalTreatment.products,
            collectionIds: dataToEdit.treatment.chemicalTreatment.collectionIds,
          },
        },
        stageCrops: dataToEdit.stageCrops,
        imageUrls: dataToEdit.imageUrls,
        translations: {
          hi: {
            symptoms: langSymptoms.hi.toString("html"),
            priventiveMeasures: langPreventiveMeasures.hi.toString("html"),
            causeDescription: langCauseDescription.hi.toString("html"),
            description: langDescription.hi.toString("html"),
            treatment: {
              biologicalTreatment: {
                treatmentDescription:
                  langBiologicalTreatment.hi.toString("html"),
              },
              chemicalTreatment: {
                treatmentDescription: langChemicalTreatment.hi.toString("html"),
              },
            },
          },
          te: {
            symptoms: langSymptoms.te.toString("html"),
            priventiveMeasures: langPreventiveMeasures.te.toString("html"),
            causeDescription: langCauseDescription.te.toString("html"),
            description: langDescription.te.toString("html"),
            treatment: {
              biologicalTreatment: {
                treatmentDescription:
                  langBiologicalTreatment.te.toString("html"),
              },
              chemicalTreatment: {
                treatmentDescription: langChemicalTreatment.te.toString("html"),
              },
            },
          },
          ta: {
            symptoms: langSymptoms.ta.toString("html"),
            priventiveMeasures: langPreventiveMeasures.ta.toString("html"),
            causeDescription: langCauseDescription.ta.toString("html"),
            description: langDescription.ta.toString("html"),
            treatment: {
              biologicalTreatment: {
                treatmentDescription:
                  langBiologicalTreatment.ta.toString("html"),
              },
              chemicalTreatment: {
                treatmentDescription: langChemicalTreatment.ta.toString("html"),
              },
            },
          },
          kn: {
            symptoms: langSymptoms.kn.toString("html"),
            priventiveMeasures: langPreventiveMeasures.kn.toString("html"),
            causeDescription: langCauseDescription.kn.toString("html"),
            description: langDescription.kn.toString("html"),
            treatment: {
              biologicalTreatment: {
                treatmentDescription:
                  langBiologicalTreatment.kn.toString("html"),
              },
              chemicalTreatment: {
                treatmentDescription: langChemicalTreatment.kn.toString("html"),
              },
            },
          },
        },
      };
      await dispatch(updateDiseaseApi(updatePayload))
        .then(() => {
          handleModalClose();
          Alert.success("Updated Successfully");
          afterUpdateAction(dataToEdit.diseaseCauseId);
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
                Edit Disease Data
              </Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Symptoms:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={symptoms}
                  onChange={(value) => {
                    setSymptoms(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Cause Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={causeDescription}
                  onChange={(value) => {
                    setCauseDescription(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={description}
                  onChange={(value) => {
                    setDescription(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Preventive Measures:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={preventiveMeasures}
                  onChange={(value) => {
                    setPreventiveMeasures(value);
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Biological Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="biological"
                  cols="50"
                  value={biologicalTreatment}
                  className="w-100"
                  onChange={(e) => setBiologicalTreatment(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Chemical Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="chemical"
                  cols="50"
                  value={chemicalTreatment}
                  className="w-100"
                  onChange={(e) => setChemicalTreatment(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="mainHeading">Telugu Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Symptoms:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langSymptoms.te}
                  onChange={(value) => {
                    setlangSymptoms({ ...langSymptoms, te: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Cause Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langCauseDescription.te}
                  onChange={(value) => {
                    setlangCauseDescription({
                      ...langCauseDescription,
                      te: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langDescription.te}
                  onChange={(value) => {
                    setlangDescription({ ...langDescription, te: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Preventive Measures:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langPreventiveMeasures.te}
                  onChange={(value) => {
                    setlangPreventiveMeasures({
                      ...langPreventiveMeasures,
                      te: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Biological Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="biological-te"
                  cols="50"
                  className="w-100"
                  value={langBiologicalTreatment.te}
                  onChange={(e) =>
                    setlangBiologicalTreatment({
                      ...langBiologicalTreatment,
                      te: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Chemical Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="chemical-te"
                  cols="50"
                  className="w-100"
                  value={langChemicalTreatment.te}
                  onChange={(e) =>
                    setlangChemicalTreatment({
                      ...langChemicalTreatment,
                      te: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="mainHeading">Hindi Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Symptoms:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langSymptoms.hi}
                  onChange={(value) => {
                    setlangSymptoms({ ...langSymptoms, hi: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Cause Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langCauseDescription.hi}
                  onChange={(value) => {
                    setlangCauseDescription({
                      ...langCauseDescription,
                      hi: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langDescription.hi}
                  onChange={(value) => {
                    setlangDescription({ ...langDescription, hi: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Preventive Measures:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langPreventiveMeasures.hi}
                  onChange={(value) => {
                    setlangPreventiveMeasures({
                      ...langPreventiveMeasures,
                      hi: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Biological Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="biological-te"
                  cols="50"
                  className="w-100"
                  value={langBiologicalTreatment.hi}
                  onChange={(e) =>
                    setlangBiologicalTreatment({
                      ...langBiologicalTreatment,
                      hi: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Chemical Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="chemical-te"
                  cols="50"
                  className="w-100"
                  value={langChemicalTreatment.hi}
                  onChange={(e) =>
                    setlangChemicalTreatment({
                      ...langChemicalTreatment,
                      hi: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="mainHeading">Tamil Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Symptoms:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langSymptoms.ta}
                  onChange={(value) => {
                    setlangSymptoms({ ...langSymptoms, ta: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Cause Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langCauseDescription.ta}
                  onChange={(value) => {
                    setlangCauseDescription({
                      ...langCauseDescription,
                      ta: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langDescription.ta}
                  onChange={(value) => {
                    setlangDescription({ ...langDescription, ta: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Preventive Measures:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langPreventiveMeasures.ta}
                  onChange={(value) => {
                    setlangPreventiveMeasures({
                      ...langPreventiveMeasures,
                      ta: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Biological Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="biological-te"
                  cols="50"
                  className="w-100"
                  value={langBiologicalTreatment.ta}
                  onChange={(e) =>
                    setlangBiologicalTreatment({
                      ...langBiologicalTreatment,
                      ta: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Chemical Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="chemical-te"
                  cols="50"
                  className="w-100"
                  value={langChemicalTreatment.ta}
                  onChange={(e) =>
                    setlangChemicalTreatment({
                      ...langChemicalTreatment,
                      ta: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="mainHeading">Kannada Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Symptoms:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langSymptoms.kn}
                  onChange={(value) => {
                    setlangSymptoms({ ...langSymptoms, kn: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Cause Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langCauseDescription.kn}
                  onChange={(value) => {
                    setlangCauseDescription({
                      ...langCauseDescription,
                      kn: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langDescription.kn}
                  onChange={(value) => {
                    setlangDescription({ ...langDescription, kn: value });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Preventive Measures:</label>
              </div>
              <div className="col-9">
                <RichTextEditor
                  value={langPreventiveMeasures.kn}
                  onChange={(value) => {
                    setlangPreventiveMeasures({
                      ...langPreventiveMeasures,
                      kn: value,
                    });
                  }}
                  toolbarConfig={toolbarConfig}
                  editorStyle={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Biological Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="biological-te"
                  cols="50"
                  className="w-100"
                  value={langBiologicalTreatment.kn}
                  onChange={(e) =>
                    setlangBiologicalTreatment({
                      ...langBiologicalTreatment,
                      kn: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              <h6 className="subHeading mb-2 col-12">Chemical Treatment:</h6>
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">
                  Treatment Description:
                </label>
              </div>
              <div className="col-9">
                <textarea
                  name="chemical-te"
                  cols="50"
                  className="w-100"
                  value={langChemicalTreatment.kn}
                  onChange={(e) =>
                    setlangChemicalTreatment({
                      ...langChemicalTreatment,
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

export default EditDisease;
