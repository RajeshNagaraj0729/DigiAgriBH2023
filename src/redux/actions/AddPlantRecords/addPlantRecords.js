/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CREATE_DISEASE_RESULT = "CREATE_DISEASE_RESULT";
export const CREATE_DISEASE_ERROR = "CREATE_DISEASE_ERROR";

export const CREATE_DISEASE_CAUSE_RESULT = "CREATE_DISEASE_CAUSE_RESULT";
export const CREATE_DISEASE_CAUSE_ERROR = "CREATE_DISEASE_CAUSE_ERROR";

export const CREATE_CROP_RESULT = "CREATE_CROP_RESULT";
export const CREATE_CROP_ERROR = "CREATE_CROP_ERROR";
export const GET_ALL_DISEASES = "GET_ALL_DISEASES";

export const addDisease = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.addDiseaseApi}`, {
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
                " - Can't Add Disease"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: CREATE_DISEASE_RESULT,
            data: data.result,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: CREATE_DISEASE_ERROR,
        errmsg: err.message,
      });
    }
  };
};

export const addDiseaseCause = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.addDiseaseCauseApi}`, {
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
                " - Can't Add Disease Cause"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: CREATE_DISEASE_CAUSE_RESULT,
            data: data.result,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: CREATE_DISEASE_CAUSE_ERROR,
        errmsg: err.message,
      });
    }
  };
};

export const addCrop = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.addCropApi}`, {
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
                " - Can't Add Crop"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: CREATE_CROP_RESULT,
            data: data.result,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: CREATE_CROP_ERROR,
        errmsg: err.message,
      });
    }
  };
};

export const fetchAllDiseasesApi = (pageNum, pageSize) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.getAllDiseasesUrl}?pagesize=${pageSize}&pagenum=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${constants.userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
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
                  " - Can't fetch diseases"
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
          dispatch({
            type: GET_ALL_DISEASES,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
