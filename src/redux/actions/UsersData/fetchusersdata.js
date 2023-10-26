/**
 * React imports
 */
import dateFormat from "dateformat";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
export const FETCH_USERSDATA = "FETCH_USERSDATA";
export const USERS_LOADING = "USERS_LOADING";
export const USERS_ERROR = "USERS_ERROR";
export const FETCH_FILTERED_USERSDATA = "FETCH_FILTERED_USERSDATA";
export const GET_DISTRICTS = "GET_DISTRICTS";
export const GET_STATES = "GET_STATES";
export const GET_POSTCODES = "GET_POSTCODES";
export const UPDATE_DEEP_LINK_DATA = "UPDATE_DEEP_LINK_DATA";

//Fetching Users Data
export const fetchUsersData = (activePage, pagesAmount) => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: USERS_LOADING,
      search: "",
      startDate: "",
      endDate: "",
    });
    try {
      await fetch(
        `${baseUrl.usersDataApi}?pagenum=${activePage}&pagesize=${pagesAmount}`,
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
            type: FETCH_USERSDATA,
            data: data,
            search: "",
            startDate: "",
            endDate: "",
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//exporting data by filter
export const fetchUserDatabyFilter = (
  fromDate,
  toDate,
  searchValue,
  crop,
  state,
  lang,
  dist,
  postCode,
  pagenum,
  pagesize,
  includeCD,
  includeKV,
  userVersion,
  title,
  message,
  type,
  isNotification
) => {
  return async (dispatch) => {
    dispatch({
      type: USERS_LOADING,
      startDate: fromDate === "" ? "" : dateFormat(fromDate, "yyyy-mm-dd"),
      endDate: toDate === "" ? "" : dateFormat(toDate, "yyyy-mm-dd"),
      search: searchValue,
    });
    try {
      await fetch(
        `${
          baseUrl.userDataByDateApi
        }?fromDate=${fromDate}&toDate=${toDate}&searchCriteria=${searchValue}&crop=${crop}&state=${state}&lang=${lang}&userVersion=${
          userVersion || ""
        }&title=${title}&message=${message}&type=${type}&isNotification=${
          isNotification ? true : false
        }&district=${dist || ""}&postCode=${postCode || 0}&pagenum=${
          pagenum || 1
        }&pagesize=${
          pagesize || 10
        }&isCropDocCountRequired=${includeCD}&isPostsCountRequired=${includeKV}`,
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
          dispatch({
            type: FETCH_FILTERED_USERSDATA,
            data: data,
            startDate:
              fromDate === "" ? "" : dateFormat(fromDate, "yyyy-mm-dd"),
            endDate: toDate === "" ? "" : dateFormat(toDate, "yyyy-mm-dd"),
            search: searchValue,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

export const getDistricts = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getDistrictsApi}`, {
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
                " - Can't fetch Districts"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_DISTRICTS,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_DISTRICTS,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const getStates = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getStatesApi}`, {
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
                " - Can't fetch States"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_STATES,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_STATES,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const getPostCodes = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getPostCodesApi}?pincode=${value || 0}`, {
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
                " - Can't fetch Post Code"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_POSTCODES,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_POSTCODES,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const updateDynamicLink = (
  selectedCrop,
  cropDeeplinking,
  pestDeeplinking
) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateDeeplinkingApi}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cropId: selectedCrop,
          cropCareLink: cropDeeplinking,
          pestCareLink: pestDeeplinking,
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
          if (data.result !== "Success") {
            throw new Error("Can't Update deeplink data");
          } else {
            dispatch({
              type: UPDATE_DEEP_LINK_DATA,
              resData: data.result,
            });
          }
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
