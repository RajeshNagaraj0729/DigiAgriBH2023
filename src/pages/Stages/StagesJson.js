/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import {
  getAllTasksByStageApi,
  getStagesByCropApi,
  getTasksByStageApi,
} from "../../redux/actions/AddStageRecords/stageRecords";

const StagesJson = () => {
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const stages = useSelector((state) => state.stageRecords).stagesByCrop;
  const tasks = useSelector((state) => state.stageRecords).tasksByStage;
  const allTasks = useSelector((state) => state.stageRecords).allTasksByStage;

  const dispatch = useDispatch();

  const [cropId, setCropId] = useState("");
  const [stageId, setStageId] = useState("");
  const [stagesLoading, setStagesLoading] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [allTasksLoading, setAllTasksLoading] = useState(false);

  const getStages = async () => {
    setStagesLoading(true);
    await dispatch(getStagesByCropApi(cropId)).catch((err) => {
      Alert.error(err.message);
    });
    setStagesLoading(false);
  };

  const getTasks = async () => {
    setTasksLoading(true);
    await dispatch(getTasksByStageApi(stageId.value)).catch((err) => {
      Alert.error(err.message);
    });
    setTasksLoading(false);
  };

  const getAllTasks = async () => {
    setAllTasksLoading(true);
    for (var i = 0; i < stages?.length; i++) {
      await dispatch(getAllTasksByStageApi(stages[i]?.id)).catch((err) => {
        Alert.error(err.message);
      });
    }
    setAllTasksLoading(false);
  };

  const getStagesWithObjIds = (stages) => {
    return stages
      ?.map((stage) => {
        return {
          ...stage,
          cropId: {
            $oid: stage.cropId,
          },
          _id: {
            $oid: stage.id,
          },
          stageType: stage.stageType.map((type) => {
            return {
              $oid: type,
            };
          }),
        };
      })
      ?.map(({ id, ...rest }) => {
        return { ...rest };
      });
  };

  const getTasksWithObjIds = (tasks) => {
    return tasks
      ?.map((task) => {
        return {
          ...task,
          _id: {
            $oid: task.id,
          },
          stages: task.stageIds?.map((stage) => {
            return {
              $oid: stage,
            };
          }),
        };
      })
      ?.map(({ id, stageIds, ...rest }) => {
        return { ...rest };
      });
  };

  useEffect(() => {
    setStageId("");
    getStages();
  }, [cropId]);

  useEffect(() => {
    getTasks();
  }, [stageId]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Stages Data</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
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
                    crops &&
                    crops?.map((row) => {
                      return {
                        label: row.cropName,
                        value: row.id,
                      };
                    })
                  }
                  onSelect={(option) => setCropId(option.value)}
                />
                <div className="col-12">
                  {stagesLoading ? (
                    <Spinner
                      style={{
                        width: "1rem",
                        height: "1rem",
                        fontSize: "1rem",
                      }}
                      size="sm"
                      color="green"
                    />
                  ) : (
                    <a
                      type="button"
                      href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(getStagesWithObjIds(stages))
                      )}`}
                      download="stages.json"
                    >
                      {`Download Stages Json`}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Stage:</label>
              </div>
              <div className="col-12 col-md-8">
                <CustomSelect
                  placeholder="Select Stage"
                  search={true}
                  data={
                    stages &&
                    stages?.map((row) => {
                      return {
                        label: row.stageName,
                        value: row.id,
                      };
                    })
                  }
                  value={stageId}
                  onSelect={(option) => setStageId(option)}
                />
                <div className="col-12">
                  {tasksLoading ? (
                    <Spinner
                      style={{
                        width: "1rem",
                        height: "1rem",
                        fontSize: "1rem",
                      }}
                      size="sm"
                      color="green"
                    />
                  ) : (
                    <a
                      type="button"
                      href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(getTasksWithObjIds(tasks))
                      )}`}
                      download="tasks.json"
                    >
                      {`Download Tasks Json`}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button
              className="btn btn-sm btn-primary"
              onClick={getAllTasks}
              disabled={stages?.length === 0}
            >
              Get All Tasks
            </button>
            <a
              className="btn btn-sm btn-success ml-3"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(getTasksWithObjIds(allTasks))
              )}`}
              download="alltasks.json"
              style={{
                display: allTasks?.length === 0 ? "none" : "inherit",
              }}
            >
              {allTasksLoading ? (
                <Spinner
                  style={{
                    width: "1rem",
                    height: "1rem",
                    fontSize: "1rem",
                    margin: "0 30px",
                  }}
                  size="sm"
                  color="green"
                />
              ) : (
                `Download All Tasks Json`
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StagesJson;
