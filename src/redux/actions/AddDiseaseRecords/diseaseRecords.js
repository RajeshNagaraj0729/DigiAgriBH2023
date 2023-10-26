/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const GET_DISEASES = "GET_DISEASES";
export const GET_DISEASE_CAUSES = "GET_DISEASE_CAUSES";

//Fetching diseases Data
export const getDiseasesListByCause = (diseaseCauseId) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.getDiseasesListUrl}?diseaseCauseId=${diseaseCauseId}`,
        {
          headers: {
            Authorization: `Bearer ${constants.userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " +
                response.status +
                ": " +
                response.statusText +
                " - Can't Get Diseases"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_DISEASES,
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

//Fetching diseases Data
export const getDiseasesCausesList = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getDiseaseCausesListUrl}`, {
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
                " - Can't Get Disease Causes"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_DISEASE_CAUSES,
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

export const updateDiseaseApi = (payload) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateDiseaseUrl}`, {
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
                " - Can't update disease"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
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

export const updateDiseaseCauseApi = (payload) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateDiseaseCauseUrl}`, {
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
                " - Can't update disease causes"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
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
