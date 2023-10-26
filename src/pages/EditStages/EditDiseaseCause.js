import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import {
  updateDiseaseApi,
  updateDiseaseCauseApi,
} from "../../redux/actions/AddDiseaseRecords/diseaseRecords";
import { CustomCreatable } from "../../components/Select/Select";

//Initial Family Object
const initialFamily = {
  familyName: "",
  scientificNames: [],
};

//InitialCauseCategory Object
const initialCauseCategory = { type: "", family: [initialFamily] };

const EditDiseaseCause = (props) => {
  const { dataToEdit, afterUpdateAction } = props;

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [causeCategories, setCauseCategories] = useState([
    initialCauseCategory,
  ]);
  const [langCauseCategories, setLangCauseCategories] = useState({
    te: [
      {
        type: "",
        family: [
          {
            familyName: "",
            scientificNames: [],
          },
        ],
      },
    ],
    hi: [
      {
        type: "",
        family: [
          {
            familyName: "",
            scientificNames: [],
          },
        ],
      },
    ],
    ta: [
      {
        type: "",
        family: [
          {
            familyName: "",
            scientificNames: [],
          },
        ],
      },
    ],
    kn: [
      {
        type: "",
        family: [
          {
            familyName: "",
            scientificNames: [],
          },
        ],
      },
    ],
  });
  const [name, setName] = useState("");
  const [langName, setLangName] = useState({ te: "", hi: "", ta: "", kn: "" });

  const dispatch = useDispatch();

  //Check empty values for cause categories
  const checkCauseCategories = () => {
    for (let i = 0; i < causeCategories.length; i++) {
      if (causeCategories[i].type === "") {
        return false;
      }
      for (let j = 0; j < causeCategories[i].family.length; j++) {
        if (
          causeCategories[i].family[j].familyName === "" ||
          causeCategories[i].family[j].scientificNames.length === 0
        ) {
          return false;
        }
      }
    }
    return true;
  };

  //Check empty values for cause categories
  const checkInitalCauseCategories = () => {
    let initial = JSON.parse(JSON.stringify(dataToEdit.causeCategories));
    let flag = false;
    for (let i = 0; i < causeCategories.length; i++) {
      if (causeCategories[i].type !== initial[i].type) {
        flag = true;
      }
      for (let j = 0; j < causeCategories[i].family.length; j++) {
        if (
          causeCategories[i].family[j].familyName !==
            initial[i].family[j].familyName ||
          causeCategories[i].family[j].scientificNames.length !==
            initial[i].family[j].scientificNames.length
        ) {
          flag = true;
        }
      }
    }
    return flag;
  };

  // useEffect(() => {
  //   if (
  //     name !== "" &&
  //     langName.te !== "" &&
  //     langName.hi !== "" &&
  //     langName.ta !== "" &&
  //     checkCauseCategories() &&
  //     (name !== dataToEdit.name ||
  //       langName.te !== dataToEdit.translations.te.name ||
  //       langName.hi !== dataToEdit.translations.hi.name ||
  //       langName.ta !== dataToEdit.translations.ta.name ||
  //       checkInitalCauseCategories())
  //   ) {
  //     setDisable(false);
  //   } else {
  //     setDisable(true);
  //   }
  // }, [name, langName, causeCategories]);

  const handleModalShow = () => {
    setShowModal(true);
    setDisable(false);
    if (dataToEdit) {
      setName(dataToEdit.name);
      setLangName({
        te: dataToEdit.translations.te.name,
        hi: dataToEdit.translations.hi.name,
        ta: dataToEdit.translations.ta.name,
        kn: dataToEdit.translations.kn.name,
      });
      setCauseCategories(dataToEdit.causeCategories);
      setLangCauseCategories({
        te: dataToEdit.translations?.te?.causeCategories,
        hi: dataToEdit.translations?.hi?.causeCategories,
        ta: dataToEdit.translations?.ta?.causeCategories,
        kn: dataToEdit.translations?.kn?.causeCategories,
      });
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      let updatePayload = {
        id: dataToEdit.id,
        causeCategories: causeCategories,
        name: name,
        source: dataToEdit.source,
        isInfectious: dataToEdit.isInfectious,
        translations: {
          te: {
            causeCategories: langCauseCategories.te,
            name: langName.te,
          },
          hi: {
            causeCategories: langCauseCategories.hi,
            name: langName.hi,
          },
          ta: {
            causeCategories: langCauseCategories.ta,
            name: langName.ta,
          },
          kn: { causeCategories: langCauseCategories.kn, name: langName.kn },
        },
        isNoDiseaseDataFound: dataToEdit.isNoDiseaseDataFound,
      };
      await dispatch(updateDiseaseCauseApi(updatePayload))
        .then(() => {
          handleModalClose();
          Alert.success("Updated Successfully");
          afterUpdateAction();
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
                Edit Disease Cause Data
              </Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="inputStyle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 row mb-3">
              {causeCategories.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 p-3 mb-3"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12 col-sm-6">
                        <div className="row">
                          <div className="col-12 col-sm-4 align-self-center">
                            <label className="bannerLableStyle">Type:</label>
                          </div>
                          <div className="col-12 col-sm-8">
                            <input
                              type="text"
                              className="inputStyle"
                              value={row.type}
                              onChange={(e) => {
                                let dupCauseCategory = [...causeCategories];
                                dupCauseCategory[index].type = e.target.value;
                                setCauseCategories(dupCauseCategory);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    {row.family.map((r, ind) => {
                      return (
                        <div className="row mb-3" key={ind}>
                          <div className="col-12 col-sm-6">
                            <div className="row mb-3 mb-md-0">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Family Name:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <input
                                  type="text"
                                  className="inputStyle"
                                  value={r.familyName}
                                  onChange={(e) => {
                                    let dupCauseCategory = [...causeCategories];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].familyName = e.target.value;
                                    setCauseCategories(dupCauseCategory);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="row">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Scientific Names:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <CustomCreatable
                                  name={"names" + index + ind}
                                  isMulti={true}
                                  value={r.scientificNames?.map((sn) => {
                                    return { label: sn, value: sn };
                                  })}
                                  placeholder="Add Scientific Names"
                                  onSelect={(values) => {
                                    let scientificNames;
                                    if (values) {
                                      scientificNames = values.map(
                                        (k) => k.label
                                      );
                                    } else {
                                      scientificNames = [];
                                    }
                                    let dupCauseCategory = [...causeCategories];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].scientificNames = scientificNames;
                                    setCauseCategories(dupCauseCategory);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-12 d-flex justify-content-center">
                      <Button
                        id={"familyadd" + index}
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...causeCategories[index].family,
                            { familyName: "", scientificNames: [] },
                          ];
                          let dupCauseCategory = [...causeCategories];
                          dupCauseCategory[index].family = dupFamily;
                          setCauseCategories(dupCauseCategory);
                        }}
                      >
                        <i className="fa fa-plus"></i> Add Family
                      </Button>
                      <Button
                        id={"familyremove" + index}
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => {
                          let dupFamily = [...causeCategories[index].family];
                          dupFamily = dupFamily.slice(0, -1);
                          let dupCauseCategory = [...causeCategories];
                          dupCauseCategory[index].family = dupFamily;
                          setCauseCategories(dupCauseCategory);
                        }}
                        disabled={causeCategories[index].family.length === 1}
                      >
                        <i className="fa fa-remove"></i> Remove Family
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 mb-3 d-flex justify-content-center">
                <Button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => {
                    let dupCauseCategory = Object.assign(causeCategories);
                    dupCauseCategory = [
                      ...dupCauseCategory,
                      {
                        type: "",
                        family: [{ familyName: "", scientificNames: [] }],
                      },
                    ];
                    setCauseCategories(dupCauseCategory);
                  }}
                >
                  <i className="fa fa-plus"></i> Add Category
                </Button>
                <Button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => {
                    setCauseCategories(causeCategories.slice(0, -1));
                  }}
                  disabled={causeCategories.length === 1}
                >
                  <i className="fa fa-remove"></i> Remove Category
                </Button>
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Telugu Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="inputStyle"
                  value={langName.te}
                  onChange={(e) =>
                    setLangName({ ...langName, te: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              {langCauseCategories.te.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 p-3 mb-3"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12 col-sm-6">
                        <div className="row">
                          <div className="col-12 col-sm-4 align-self-center">
                            <label className="bannerLableStyle">Type:</label>
                          </div>
                          <div className="col-12 col-sm-8">
                            <input
                              type="text"
                              className="inputStyle"
                              value={row.type}
                              onChange={(e) => {
                                let dupCauseCategory = [
                                  ...langCauseCategories.te,
                                ];
                                dupCauseCategory[index].type = e.target.value;
                                setLangCauseCategories({
                                  ...langCauseCategories,
                                  te: dupCauseCategory,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    {row.family.map((r, ind) => {
                      return (
                        <div className="row mb-3" key={ind}>
                          <div className="col-12 col-sm-6">
                            <div className="row mb-3 mb-md-0">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Family Name:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <input
                                  type="text"
                                  className="inputStyle"
                                  value={r.familyName}
                                  onChange={(e) => {
                                    let dupCauseCategory = [
                                      ...langCauseCategories.te,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].familyName = e.target.value;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      te: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="row">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Scientific Names:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <CustomCreatable
                                  name={"names" + index + ind + "te"}
                                  isMulti={true}
                                  placeholder="Add Scientific Names"
                                  value={r.scientificNames?.map((sn) => {
                                    return { label: sn, value: sn };
                                  })}
                                  onSelect={(values) => {
                                    let scientificNames;
                                    if (values) {
                                      scientificNames = values.map(
                                        (k) => k.label
                                      );
                                    } else {
                                      scientificNames = [];
                                    }
                                    let dupCauseCategory = [
                                      ...langCauseCategories.te,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].scientificNames = scientificNames;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      te: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-12 d-flex justify-content-center">
                      <Button
                        id={"familyadd" + index + "te"}
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.te[index].family,
                            { familyName: "", scientificNames: [] },
                          ];
                          let dupCauseCategory = [...langCauseCategories.te];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            te: dupCauseCategory,
                          });
                        }}
                      >
                        <i className="fa fa-plus"></i> Add Family
                      </Button>
                      <Button
                        id={"familyremove" + index + "te"}
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.te[index].family,
                          ];
                          dupFamily = dupFamily.slice(0, -1);
                          let dupCauseCategory = [...langCauseCategories.te];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            te: dupCauseCategory,
                          });
                        }}
                        disabled={
                          langCauseCategories.te[index].family.length === 1
                        }
                      >
                        <i className="fa fa-remove"></i> Remove Family
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 mb-3 d-flex justify-content-center">
                <Button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => {
                    let dupCauseCategory = Object.assign(
                      langCauseCategories.te
                    );
                    dupCauseCategory = [
                      ...dupCauseCategory,
                      {
                        type: "",
                        family: [{ familyName: "", scientificNames: [] }],
                      },
                    ];
                    setLangCauseCategories({
                      ...langCauseCategories,
                      te: dupCauseCategory,
                    });
                  }}
                >
                  <i className="fa fa-plus"></i> Add Category
                </Button>
                <Button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => {
                    setLangCauseCategories({
                      ...langCauseCategories,
                      te: langCauseCategories.te.slice(0, -1),
                    });
                  }}
                  disabled={langCauseCategories.te.length === 1}
                >
                  <i className="fa fa-remove"></i> Remove Category
                </Button>
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Hindi Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="inputStyle"
                  value={langName.hi}
                  onChange={(e) =>
                    setLangName({ ...langName, hi: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              {langCauseCategories.hi.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 p-3 mb-3"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12 col-sm-6">
                        <div className="row">
                          <div className="col-12 col-sm-4 align-self-center">
                            <label className="bannerLableStyle">Type:</label>
                          </div>
                          <div className="col-12 col-sm-8">
                            <input
                              type="text"
                              className="inputStyle"
                              value={row.type}
                              onChange={(e) => {
                                let dupCauseCategory = [
                                  ...langCauseCategories.hi,
                                ];
                                dupCauseCategory[index].type = e.target.value;
                                setLangCauseCategories({
                                  ...langCauseCategories,
                                  hi: dupCauseCategory,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    {row.family.map((r, ind) => {
                      return (
                        <div className="row mb-3" key={ind}>
                          <div className="col-12 col-sm-6">
                            <div className="row mb-3 mb-md-0">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Family Name:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <input
                                  type="text"
                                  className="inputStyle"
                                  value={r.familyName}
                                  onChange={(e) => {
                                    let dupCauseCategory = [
                                      ...langCauseCategories.hi,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].familyName = e.target.value;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      hi: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="row">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Scientific Names:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <CustomCreatable
                                  name={"names" + index + ind + "hi"}
                                  isMulti={true}
                                  placeholder="Add Scientific Names"
                                  value={r.scientificNames?.map((sn) => {
                                    return { label: sn, value: sn };
                                  })}
                                  onSelect={(values) => {
                                    let scientificNames;
                                    if (values) {
                                      scientificNames = values.map(
                                        (k) => k.label
                                      );
                                    } else {
                                      scientificNames = [];
                                    }
                                    let dupCauseCategory = [
                                      ...langCauseCategories.hi,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].scientificNames = scientificNames;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      hi: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-12 d-flex justify-content-center">
                      <Button
                        id={"familyadd" + index + "hi"}
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.hi[index].family,
                            { familyName: "", scientificNames: [] },
                          ];
                          let dupCauseCategory = [...langCauseCategories.hi];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            hi: dupCauseCategory,
                          });
                        }}
                      >
                        <i className="fa fa-plus"></i> Add Family
                      </Button>
                      <Button
                        id={"familyremove" + index + "hi"}
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.hi[index].family,
                          ];
                          dupFamily = dupFamily.slice(0, -1);
                          let dupCauseCategory = [...langCauseCategories.hi];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            hi: dupCauseCategory,
                          });
                        }}
                        disabled={
                          langCauseCategories.hi[index].family.length === 1
                        }
                      >
                        <i className="fa fa-remove"></i> Remove Family
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 mb-3 d-flex justify-content-center">
                <Button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => {
                    let dupCauseCategory = Object.assign(
                      langCauseCategories.hi
                    );
                    dupCauseCategory = [
                      ...dupCauseCategory,
                      {
                        type: "",
                        family: [{ familyName: "", scientificNames: [] }],
                      },
                    ];
                    setLangCauseCategories({
                      ...langCauseCategories,
                      hi: dupCauseCategory,
                    });
                  }}
                >
                  <i className="fa fa-plus"></i> Add Category
                </Button>
                <Button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => {
                    setLangCauseCategories({
                      ...langCauseCategories,
                      hi: langCauseCategories.hi.slice(0, -1),
                    });
                  }}
                  disabled={langCauseCategories.hi.length === 1}
                >
                  <i className="fa fa-remove"></i> Remove Category
                </Button>
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Tamil Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="inputStyle"
                  value={langName.ta}
                  onChange={(e) =>
                    setLangName({ ...langName, ta: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              {langCauseCategories.ta.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 p-3 mb-3"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12 col-sm-6">
                        <div className="row">
                          <div className="col-12 col-sm-4 align-self-center">
                            <label className="bannerLableStyle">Type:</label>
                          </div>
                          <div className="col-12 col-sm-8">
                            <input
                              type="text"
                              className="inputStyle"
                              value={row.type}
                              onChange={(e) => {
                                let dupCauseCategory = [
                                  ...langCauseCategories.ta,
                                ];
                                dupCauseCategory[index].type = e.target.value;
                                setLangCauseCategories({
                                  ...langCauseCategories,
                                  ta: dupCauseCategory,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    {row.family.map((r, ind) => {
                      return (
                        <div className="row mb-3" key={ind}>
                          <div className="col-12 col-sm-6">
                            <div className="row mb-3 mb-md-0">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Family Name:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <input
                                  type="text"
                                  className="inputStyle"
                                  value={r.familyName}
                                  onChange={(e) => {
                                    let dupCauseCategory = [
                                      ...langCauseCategories.ta,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].familyName = e.target.value;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      ta: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="row">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Scientific Names:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <CustomCreatable
                                  name={"names" + index + ind + "ta"}
                                  isMulti={true}
                                  placeholder="Add Scientific Names"
                                  value={r.scientificNames?.map((sn) => {
                                    return { label: sn, value: sn };
                                  })}
                                  onSelect={(values) => {
                                    let scientificNames;
                                    if (values) {
                                      scientificNames = values.map(
                                        (k) => k.label
                                      );
                                    } else {
                                      scientificNames = [];
                                    }
                                    let dupCauseCategory = [
                                      ...langCauseCategories.ta,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].scientificNames = scientificNames;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      ta: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-12 d-flex justify-content-center">
                      <Button
                        id={"familyadd" + index + "ta"}
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.ta[index].family,
                            { familyName: "", scientificNames: [] },
                          ];
                          let dupCauseCategory = [...langCauseCategories.ta];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            ta: dupCauseCategory,
                          });
                        }}
                      >
                        <i className="fa fa-plus"></i> Add Family
                      </Button>
                      <Button
                        id={"familyremove" + index + "ta"}
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.ta[index].family,
                          ];
                          dupFamily = dupFamily.slice(0, -1);
                          let dupCauseCategory = [...langCauseCategories.ta];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            ta: dupCauseCategory,
                          });
                        }}
                        disabled={
                          langCauseCategories.ta[index].family.length === 1
                        }
                      >
                        <i className="fa fa-remove"></i> Remove Family
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 mb-3 d-flex justify-content-center">
                <Button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => {
                    let dupCauseCategory = Object.assign(
                      langCauseCategories.ta
                    );
                    dupCauseCategory = [
                      ...dupCauseCategory,
                      {
                        type: "",
                        family: [{ familyName: "", scientificNames: [] }],
                      },
                    ];
                    setLangCauseCategories({
                      ...langCauseCategories,
                      ta: dupCauseCategory,
                    });
                  }}
                >
                  <i className="fa fa-plus"></i> Add Category
                </Button>
                <Button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => {
                    setLangCauseCategories({
                      ...langCauseCategories,
                      ta: langCauseCategories.ta.slice(0, -1),
                    });
                  }}
                  disabled={langCauseCategories.ta.length === 1}
                >
                  <i className="fa fa-remove"></i> Remove Category
                </Button>
              </div>
            </div>

            <div className="col-12 mb-3">
              <h5 className="subHeading">Kannada Translations</h5>
            </div>

            <div className="col-12 row mb-3">
              <div className="col-3 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  className="inputStyle"
                  value={langName.kn}
                  onChange={(e) =>
                    setLangName({ ...langName, kn: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="col-12 row mb-3">
              {langCauseCategories.kn.map((row, index) => {
                return (
                  <div
                    key={index}
                    className="col-12 p-3 mb-3"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <div className="row mb-3">
                      <div className="col-12 col-sm-6">
                        <div className="row">
                          <div className="col-12 col-sm-4 align-self-center">
                            <label className="bannerLableStyle">Type:</label>
                          </div>
                          <div className="col-12 col-sm-8">
                            <input
                              type="text"
                              className="inputStyle"
                              value={row.type}
                              onChange={(e) => {
                                let dupCauseCategory = [
                                  ...langCauseCategories.kn,
                                ];
                                dupCauseCategory[index].type = e.target.value;
                                setLangCauseCategories({
                                  ...langCauseCategories,
                                  kn: dupCauseCategory,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-6"></div>
                    </div>

                    {row.family.map((r, ind) => {
                      return (
                        <div className="row mb-3" key={ind}>
                          <div className="col-12 col-sm-6">
                            <div className="row mb-3 mb-md-0">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Family Name:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <input
                                  type="text"
                                  className="inputStyle"
                                  value={r.familyName}
                                  onChange={(e) => {
                                    let dupCauseCategory = [
                                      ...langCauseCategories.kn,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].familyName = e.target.value;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      kn: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className="row">
                              <div className="col-12 col-sm-4 align-self-center">
                                <label className="bannerLableStyle">
                                  Scientific Names:
                                </label>
                              </div>
                              <div className="col-12 col-sm-8">
                                <CustomCreatable
                                  name={"names" + index + ind + "kn"}
                                  isMulti={true}
                                  placeholder="Add Scientific Names"
                                  value={r.scientificNames?.map((sn) => {
                                    return { label: sn, value: sn };
                                  })}
                                  onSelect={(values) => {
                                    let scientificNames;
                                    if (values) {
                                      scientificNames = values.map(
                                        (k) => k.label
                                      );
                                    } else {
                                      scientificNames = [];
                                    }
                                    let dupCauseCategory = [
                                      ...langCauseCategories.kn,
                                    ];
                                    dupCauseCategory[index].family[
                                      ind
                                    ].scientificNames = scientificNames;
                                    setLangCauseCategories({
                                      ...langCauseCategories,
                                      kn: dupCauseCategory,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="col-12 d-flex justify-content-center">
                      <Button
                        id={"familyadd" + index + "kn"}
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.kn[index].family,
                            { familyName: "", scientificNames: [] },
                          ];
                          let dupCauseCategory = [...langCauseCategories.kn];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            kn: dupCauseCategory,
                          });
                        }}
                      >
                        <i className="fa fa-plus"></i> Add Family
                      </Button>
                      <Button
                        id={"familyremove" + index + "kn"}
                        className="btn btn-sm btn-danger mx-1"
                        onClick={() => {
                          let dupFamily = [
                            ...langCauseCategories.kn[index].family,
                          ];
                          dupFamily = dupFamily.slice(0, -1);
                          let dupCauseCategory = [...langCauseCategories.kn];
                          dupCauseCategory[index].family = dupFamily;
                          setLangCauseCategories({
                            ...langCauseCategories,
                            kn: dupCauseCategory,
                          });
                        }}
                        disabled={
                          langCauseCategories.kn[index].family.length === 1
                        }
                      >
                        <i className="fa fa-remove"></i> Remove Family
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="col-12 mb-3 d-flex justify-content-center">
                <Button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => {
                    let dupCauseCategory = Object.assign(
                      langCauseCategories.kn
                    );
                    dupCauseCategory = [
                      ...dupCauseCategory,
                      {
                        type: "",
                        family: [{ familyName: "", scientificNames: [] }],
                      },
                    ];
                    setLangCauseCategories({
                      ...langCauseCategories,
                      kn: dupCauseCategory,
                    });
                  }}
                >
                  <i className="fa fa-plus"></i> Add Category
                </Button>
                <Button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => {
                    setLangCauseCategories({
                      ...langCauseCategories,
                      kn: langCauseCategories.kn.slice(0, -1),
                    });
                  }}
                  disabled={langCauseCategories.kn.length === 1}
                >
                  <i className="fa fa-remove"></i> Remove Category
                </Button>
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
            className={"btn btn-sm btn-primary"}
            onClick={() => {
              handleSubmit();
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

export default EditDiseaseCause;
