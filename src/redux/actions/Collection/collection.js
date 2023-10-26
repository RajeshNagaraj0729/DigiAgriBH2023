/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

//constants for Collection
export const COLLECTION_LOADING = "COLLECTION_LOADING";
export const COLLECTION_ERROR = "COLLECTION_ERROR";
export const COLLECTION_DATA = "COLLECTION_DATA";
export const CREATE_COLLECTION = "CREATE_COLLECTION";
export const UPDATE_COLLECTION = "UPDATE_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";

//Get Collection data
export const fetchCollection = (langCode) => {
  return async (dispatch) => {
    dispatch({
      type: COLLECTION_LOADING,
    });
    try {
      await fetch(`${baseUrl.getCollectionApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": langCode,
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
                  " - Can't fetch collection"
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
            type: COLLECTION_DATA,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Create Collection
export const createCollection = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createCollectionApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...value,
          displayOrder: parseInt(value.displayOrder),
        }),
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
          dispatch({
            type: CREATE_COLLECTION,
            data: data.result,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//update Collection
export const updateCollection = (value, langCode) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateCollectionApi}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": langCode,
        },
        body: JSON.stringify({
          ...value,
          displayOrder: parseInt(value.displayOrder),
        }),
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
          dispatch({
            type: UPDATE_COLLECTION,
            data: data.result,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: COLLECTION_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Delete Collection
export const deleteCollection = (collectionId) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteCollectionApi}?Id=${collectionId}`, {
        method: "DELETE",
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
          dispatch({
            type: DELETE_COLLECTION,
            data: data.result,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: DELETE_COLLECTION,
        errmsg: err.message,
      });
    }
  };
};
