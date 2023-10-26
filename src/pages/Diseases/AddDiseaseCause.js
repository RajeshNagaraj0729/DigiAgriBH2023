/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useStore } from "react-redux";
import { Alert } from "rsuite";

/**
 * Custom Imports
 */
import { CustomCreatable } from "../../components/Select/Select";
import { addDiseaseCause } from "../../redux/actions/AddPlantRecords/addPlantRecords";

//Initial Family Object
const initialFamily = {
  familyName: "",
  scientificNames: [],
};

//InitialCauseCategory Object
const initialCauseCategory = { type: "", family: [initialFamily] };

const AddDiseaseCause = () => {
  const [causeCategories, setCauseCategories] = useState([
    initialCauseCategory,
  ]);
  const [tCauseCategories, setTCauseCategories] = useState({
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
  });
  const [name, setName] = useState("");
  const [tName, setTName] = useState({ te: "", hi: "" });
  const [isInfectious, setIsInfectious] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  const dispatch = useDispatch();

  const diseaseCauseResult = useStore();

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

  //Provide empty values for cause categories for translations
  const emptyCauseCategories = (causeCategories) => {
    let emptyCauseCategory = new Array(causeCategories.length);
    for (let i = 0; i < causeCategories.length; i++) {
      emptyCauseCategory[i] = Object.assign({
        type: "",
        family: [],
      });
      emptyCauseCategory[i].family = new Array(
        causeCategories[i].family.length
      );
      for (let j = 0; j < causeCategories[i].family.length; j++) {
        emptyCauseCategory[i].family[j] = Object.assign({
          familyName: "",
          scientificNames: [],
        });
      }
    }
    return emptyCauseCategory;
  };

  useEffect(() => {
    if (name && checkCauseCategories()) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [name, causeCategories]);

  //Submit for disease cause
  const submitDiseaseCause = async () => {
    const diseaseCause = {
      name: name,
      isInfectious: isInfectious,
      causeCategories: causeCategories,
      source: "",
      isNoDiseaseDataFound: true,
      translations: {
        te: {
          causeCategories: tCauseCategories.te,
          name: tName.te,
        },
        hi: {
          causeCategories: tCauseCategories.hi,
          name: tName.hi,
        },
      },
    };
    await dispatch(addDiseaseCause(diseaseCause)).then(() => {
      if (
        diseaseCauseResult.getState().plantRecords.diseaseCauseError ||
        diseaseCauseResult.getState().plantRecords.diseaseCauseResult !==
          "Success"
      ) {
        Alert.error(
          diseaseCauseResult.getState().plantRecords.diseaseCauseError ||
            "Can't add Disease cause"
        );
      } else {
        Alert.success("Successfully added Disease cause", 3000);
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">New Problem Cause</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 col-sm-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12">
                <label style={{ marginBottom: 0, marginTop: "5px" }}>
                  <input
                    type="checkbox"
                    style={{ marginRight: "5px" }}
                    onChange={() => setIsInfectious(!isInfectious)}
                  />
                  Is Infectious
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h5 className="subHeading">Cause Categories</h5>
          </div>
        </div>

        <div>
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
                              onChange={(e) => {
                                let dupCauseCategory = [...causeCategories];
                                dupCauseCategory[index].family[ind].familyName =
                                  e.target.value;
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
                              placeholder="Add Scientific Names"
                              onSelect={(values) => {
                                let scientificNames;
                                if (values) {
                                  scientificNames = values.map((k) => k.label);
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

        <hr className="mb-5" />
        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="mainHeading">Telugu Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 col-sm-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTName({ ...tName, te: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h5 className="subHeading">Cause Categories</h5>
          </div>
        </div>

        <div>
          {tCauseCategories.te.map((row, index) => {
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
                          onChange={(e) => {
                            let dupCauseCategory = [...tCauseCategories.te];
                            dupCauseCategory[index].type = e.target.value;
                            setTCauseCategories({
                              ...tCauseCategories,
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
                              onChange={(e) => {
                                let dupCauseCategory = [...tCauseCategories.te];
                                dupCauseCategory[index].family[ind].familyName =
                                  e.target.value;
                                setTCauseCategories({
                                  ...tCauseCategories,
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
                              onSelect={(values) => {
                                let scientificNames;
                                if (values) {
                                  scientificNames = values.map((k) => k.label);
                                } else {
                                  scientificNames = [];
                                }
                                let dupCauseCategory = [...tCauseCategories.te];
                                dupCauseCategory[index].family[
                                  ind
                                ].scientificNames = scientificNames;
                                setTCauseCategories({
                                  ...tCauseCategories,
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
                        ...tCauseCategories.te[index].family,
                        { familyName: "", scientificNames: [] },
                      ];
                      let dupCauseCategory = [...tCauseCategories.te];
                      dupCauseCategory[index].family = dupFamily;
                      setTCauseCategories({
                        ...tCauseCategories,
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
                      let dupFamily = [...tCauseCategories.te[index].family];
                      dupFamily = dupFamily.slice(0, -1);
                      let dupCauseCategory = [...tCauseCategories.te];
                      dupCauseCategory[index].family = dupFamily;
                      setTCauseCategories({
                        ...tCauseCategories,
                        te: dupCauseCategory,
                      });
                    }}
                    disabled={tCauseCategories.te[index].family.length === 1}
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
                let dupCauseCategory = Object.assign(tCauseCategories.te);
                dupCauseCategory = [
                  ...dupCauseCategory,
                  {
                    type: "",
                    family: [{ familyName: "", scientificNames: [] }],
                  },
                ];
                setTCauseCategories({
                  ...tCauseCategories,
                  te: dupCauseCategory,
                });
              }}
            >
              <i className="fa fa-plus"></i> Add Category
            </Button>
            <Button
              className="btn btn-sm btn-danger mx-1"
              onClick={() => {
                setTCauseCategories({
                  ...tCauseCategories,
                  te: tCauseCategories.te.slice(0, -1),
                });
              }}
              disabled={tCauseCategories.te.length === 1}
            >
              <i className="fa fa-remove"></i> Remove Category
            </Button>
          </div>
        </div>

        <hr className="mb-5" />
        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="mainHeading">Hindi Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row">
              <div className="col-12 col-sm-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setTName({ ...tName, hi: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h5 className="subHeading">Cause Categories</h5>
          </div>
        </div>

        <div>
          {tCauseCategories.hi.map((row, index) => {
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
                          onChange={(e) => {
                            let dupCauseCategory = [...tCauseCategories.hi];
                            dupCauseCategory[index].type = e.target.value;
                            setTCauseCategories({
                              ...tCauseCategories,
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
                              onChange={(e) => {
                                let dupCauseCategory = [...tCauseCategories.hi];
                                dupCauseCategory[index].family[ind].familyName =
                                  e.target.value;
                                setTCauseCategories({
                                  ...tCauseCategories,
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
                              onSelect={(values) => {
                                let scientificNames;
                                if (values) {
                                  scientificNames = values.map((k) => k.label);
                                } else {
                                  scientificNames = [];
                                }
                                let dupCauseCategory = [...tCauseCategories.hi];
                                dupCauseCategory[index].family[
                                  ind
                                ].scientificNames = scientificNames;
                                setTCauseCategories({
                                  ...tCauseCategories,
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
                        ...tCauseCategories.hi[index].family,
                        { familyName: "", scientificNames: [] },
                      ];
                      let dupCauseCategory = [...tCauseCategories.hi];
                      dupCauseCategory[index].family = dupFamily;
                      setTCauseCategories({
                        ...tCauseCategories,
                        hi: dupCauseCategory,
                      });
                    }}
                  >
                    <i className="fa fa-plus"></i> Add Family
                  </Button>
                  <Button
                    id={"familyremove" + index}
                    className="btn btn-sm btn-danger mx-1"
                    onClick={() => {
                      let dupFamily = [...tCauseCategories.hi[index].family];
                      dupFamily = dupFamily.slice(0, -1);
                      let dupCauseCategory = [...tCauseCategories.hi];
                      dupCauseCategory[index].family = dupFamily;
                      setTCauseCategories({
                        ...tCauseCategories,
                        hi: dupCauseCategory,
                      });
                    }}
                    disabled={tCauseCategories.hi[index].family.length === 1}
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
                let dupCauseCategory = Object.assign(tCauseCategories.hi);
                dupCauseCategory = [
                  ...dupCauseCategory,
                  {
                    type: "",
                    family: [{ familyName: "", scientificNames: [] }],
                  },
                ];
                setTCauseCategories({
                  ...tCauseCategories,
                  hi: dupCauseCategory,
                });
              }}
            >
              <i className="fa fa-plus"></i> Add Category
            </Button>
            <Button
              className="btn btn-sm btn-danger mx-1"
              onClick={() => {
                setTCauseCategories({
                  ...tCauseCategories,
                  hi: tCauseCategories.hi.slice(0, -1),
                });
              }}
              disabled={tCauseCategories.hi.length === 1}
            >
              <i className="fa fa-remove"></i> Remove Category
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Button
              className="btn btn-sm"
              onClick={() => {
                submitDiseaseCause();
                setSubmitDisable(true);
              }}
              disabled={submitDisable}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiseaseCause;
