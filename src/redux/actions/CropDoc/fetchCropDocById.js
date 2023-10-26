/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
export const CROPDOC_BY_ID_LOADING = "CROPDOC_BY_ID_LOADING";
export const CROPDOC_BY_ID_ERROR = "CROPDOC_BY_ID_ERROR";
export const FETCH_CROPDOC_BY_ID = "FETCH_CROPDOC_BY_ID";

export const fetchCropDocById = (cropDocId) => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_BY_ID_LOADING,
    });
    try {
      await fetch(`${baseUrl.cropDocById}?cropDocId=${cropDocId}`, {
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
                "Error " + response.status + ": " + response.statusText
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
            type: FETCH_CROPDOC_BY_ID,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_BY_ID_ERROR,
        errmsg: err.message,
      });
    }
  };
};
