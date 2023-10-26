/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
export const FETCH_CROPDOC_USERSDATA = "FETCH_CROPDOC_USERSDATA";
export const CROPDOC_USERS_LOADING = "CROPDOC_USERS_LOADING";
export const CROPDOC_USERS_ERROR = "CROPDOC_USERS_ERROR";

//Fetching Crop Doc Users Data
export const fetchCropDocUsers = (activePage, pagesAmount) => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_USERS_LOADING,
    });
    try {
      await fetch(
        `${baseUrl.userApi}?pagenum=${activePage}&pagesize=${pagesAmount}`,
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
            type: FETCH_CROPDOC_USERSDATA,
            data: resData,
            search: "",
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_USERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching Crop Doc Users Data By Search
export const fetchCropDocUsersBySearch = (
  searchValue,
  activePage,
  pagesAmount
) => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_USERS_LOADING,
    });
    try {
      await fetch(
        `${baseUrl.userApi}?searchCriteria=${searchValue}&pagenum=${activePage}&pagesize=${pagesAmount}`,
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
            type: FETCH_CROPDOC_USERSDATA,
            data: resData,
            search: searchValue,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_USERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};
