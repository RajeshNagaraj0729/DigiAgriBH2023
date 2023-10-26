/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const GET_STAGES = "GET_STAGES";
export const STAGES_ERROR = "STAGES_ERROR";

export const STAGE_TYPES_DATA = "STAGE_TYPES_DATA";
export const STAGE_TYPES_ERROR = "STAGE_TYPES_ERROR";

export const GET_STAGES_BY_CROP = "GET_STAGES_BY_CROP";
export const GET_TASKS_BY_STAGE = "GET_TASKS_BY_STAGE";
export const GET_ALL_TASKS_BY_STAGE = "GET_ALL_TASKS_BY_STAGE";

export const UPDATE_STAGE_DATA = "UPDATE_STAGE_DATA";
export const UPDATE_STAGE_TASKS_DATA = "UPDATE_STAGE_TASKS_DATA";

//Fetching StageTypes Data
export const fetchStageTypes = () => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getStageTypesApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                "Error " +
                  response.status +
                  ": " +
                  response.statusText +
                  " - Diseases not found"
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .then((response) => response.json())
        .then((data) => {
          resData = data;
          dispatch({
            type: STAGE_TYPES_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: STAGE_TYPES_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching stages data
export const fetchStages = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getStagesApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Add Disease"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_STAGES,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: STAGES_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//post stage
export const addStage = (value) => {
  return async () => {
    try {
      await fetch(`${baseUrl.postStagesApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Add Stage"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result !== "Success") {
            throw new Error(data.result);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

//post stage type
export const addStageType = (value) => {
  return async () => {
    try {
      await fetch(`${baseUrl.postStageTypeApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Add Stage Type"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result !== "Success") {
            throw new Error(data.result);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

//post task
export const addStageTask = (value) => {
  return async () => {
    try {
      await fetch(`${baseUrl.postStageTaskApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Add Task"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result !== "Success") {
            throw new Error(data.result);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

//Fetching stages data
export const getStagesByCropApi = (cropId) => {
  return async (dispatch) => {
    dispatch({
      type: GET_ALL_TASKS_BY_STAGE,
      refresh: true,
    });
    try {
      await fetch(`${baseUrl.getStagesByCrop}?cropId=${cropId}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Get Stages"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_STAGES_BY_CROP,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

//Fetching stage tasks data
export const getTasksByStageApi = (stageId) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getTasksByStage}?stageId=${stageId}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Get Stage Tasks"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_TASKS_BY_STAGE,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

//Fetching stage tasks data
export const getAllTasksByStageApi = (stageId) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getTasksByStage}?stageId=${stageId}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Get Stage Tasks"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_ALL_TASKS_BY_STAGE,
            data: data,
            refresh: false,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

export const updateCropStageByIdApi = (payload) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateCropStageByIdUrl}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't update stage data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_STAGE_DATA,
              data: data.message,
            });
          } else {
            throw new Error(data.message);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

export const updateCropStageTasksByIdApi = (payload) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateCropStageTasksByIdUrl}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't update stage tasks data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_STAGE_TASKS_DATA,
              data: data.message,
            });
          } else {
            throw new Error(data.message);
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
