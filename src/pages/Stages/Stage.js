/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import { addStage } from "../../redux/actions/AddStageRecords/stageRecords";

let stage = {
  cropId: "",
  stageType: [],
  stageName: "",
  description: "",
  weekPeriod: {
    startWeek: "",
    endWeek: "",
  },
  imageUrl: "",
  translations: {
    te: {
      description: "",
      stageName: "",
    },
    hi: {
      description: "",
      stageName: "",
    },
    ta: {
      description: "",
      stageName: "",
    },
    kn: {
      description: "",
      stageName: "",
    },
  },
};

const Stage = () => {
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const stageTypes = useSelector((state) => state.stageRecords).stageTypes;

  const dispatch = useDispatch();

  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedStageTypes, setSelectedStageTypes] = useState([]);
  const [stageName, setStageName] = useState("");
  const [startWeek, setStartWeek] = useState("");
  const [endWeek, setEndWeek] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const [description, setDescription] = useState("");
  const [startWeekErr, setStartWeekErr] = useState("");
  const [endWeekErr, setEndWeekErr] = useState("");
  const [tStageName, setTStageName] = useState({ te: "", hi: "", ta: "", kn: "" });
  const [tDescription, setTDescription] = useState({ te: "", hi: "", ta:"", kn:"" });

  useEffect(() => {
    if (!startWeek) {
      setStartWeekErr("");
    }
    if (!endWeek) {
      setEndWeekErr("");
    }
    if (
      stageName &&
      startWeek &&
      endWeek &&
      selectedCrop &&
      selectedStageTypes.length !== 0 &&
      description
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [
    stageName,
    startWeek,
    endWeek,
    selectedCrop,
    selectedStageTypes,
    description,
  ]);

  const validateStage = () => {
    if (isNaN(startWeek) || isNaN(endWeek)) {
      if (isNaN(startWeek)) {
        setStartWeekErr("Enter a number");
      }
      if (isNaN(endWeek)) {
        setEndWeekErr("Enter a number");
      }
      return false;
    } else {
      setEndWeekErr("");
      setStartWeekErr("");
      return true;
    }
  };

  const postStage = async () => {
    if (validateStage()) {
      stage.stageName = stageName;
      stage.cropId = selectedCrop;
      stage.stageType = selectedStageTypes;
      stage.description = description;
      stage.weekPeriod.startWeek = parseInt(startWeek);
      stage.weekPeriod.endWeek = parseInt(endWeek);
      stage.translations.te.stageName = tStageName.te;
      stage.translations.hi.stageName = tStageName.hi;
      stage.translations.ta.stageName = tStageName.ta;
      stage.translations.kn.stageName = tStageName.kn;
      stage.translations.te.description = tDescription.te;
      stage.translations.hi.description = tDescription.hi;
      stage.translations.ta.description = tDescription.ta;
      stage.translations.kn.description = tDescription.kn;
      await dispatch(addStage(stage))
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
          <h2 className="mainHeading">Add Stage</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => setStageName(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Start Week:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setStartWeek(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-md-4"></div>
              <div
                className="col-12 col-md-8"
                style={{ color: "red", fontSize: "14px" }}
              >
                {startWeekErr}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Stage Types:</label>
              </div>
              <div className="col-12 col-md-8">
                <CustomSelect
                  placeholder="Select Stage Types"
                  search={true}
                  isMulti={true}
                  data={
                    stageTypes &&
                    stageTypes.map((row) => {
                      return {
                        label: row.typeName,
                        value: row.id,
                      };
                    })
                  }
                  onSelect={(option) =>
                    setSelectedStageTypes(
                      option ? option.map((r) => r.value) : []
                    )
                  }
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
                  placeholder="Select Crops"
                  search={true}
                  data={
                    crops &&
                    crops.map((row) => {
                      return {
                        label: row.cropName,
                        value: row.id,
                      };
                    })
                  }
                  onSelect={(option) => setSelectedCrop(option.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">End Week:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setEndWeek(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-sm-4"></div>
              <div
                className="col-12 col-sm-8"
                style={{ color: "red", fontSize: "14px" }}
              >
                {endWeekErr}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stage"
                  cols="50"
                  className="w-100"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-1"></div>
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
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTStageName({ ...tStageName, te: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stage"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTDescription({ ...tDescription, te: e.target.value })
                  }
                />
              </div>
              <div className="col-1"></div>
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
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTStageName({ ...tStageName, hi: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stage"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTDescription({ ...tDescription, hi: e.target.value })
                  }
                />
              </div>
              <div className="col-1"></div>
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
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTStageName({ ...tStageName, ta: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stage"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTDescription({ ...tDescription, ta: e.target.value })
                  }
                />
              </div>
              <div className="col-1"></div>
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
                <label className="bannerLableStyle">Stage Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) =>
                    setTStageName({ ...tStageName, kn: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <textarea
                  name="stage"
                  cols="50"
                  className="w-100"
                  onChange={(e) =>
                    setTDescription({ ...tDescription, kn: e.target.value })
                  }
                />
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Button
              className="btn btn-sm"
              disabled={submitDisable}
              onClick={() => {
                postStage();
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

export default Stage;
