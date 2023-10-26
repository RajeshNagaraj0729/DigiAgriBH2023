import localStorage from "redux-persist/es/storage";

import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CREATE_ZONAL_DATA = "CREATE_ZONAL_DATA";
export const GET_ZONAL_DATA = "GET_ZONAL_DATA";
export const GET_FE_DATA = "GET_FE_DATA";
export const GET_VLE_DATA = "GET_VLE_DATA";
export const UPDATE_EXECUTIVE_DATA = "UPDATE_EXECUTIVE_DATA";
export const DELETE_EXECUTIVE_DATA = "DELETE_EXECUTIVE_DATA";
export const GET_LOGIN_DATA = "GET_LOGIN_DATA";
export const GET_FARMERS_BY_VLE_ID = "GET_FARMERS_BY_VLE_ID";

export const createExecutiveData = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createExecutive}`, {
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
                " - Can't create executive data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_ZONAL_DATA,
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

export const fetchZonalData = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getzonalDetails}`, {
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
                  " - Can't fetch zonal details"
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
            type: GET_ZONAL_DATA,
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

export const fetchFeData = (type, id) => {
  return async (dispatch, getState) => {
    let accessToken = constants.userToken;
    let url = `${baseUrl.getFeDetails}`;

    if (!!type) {
      accessToken = getState().farmerRole?.accessToken;
      url = url + `?zeId=${id}&type=${type}`;
    } else {
      url = url + "?type=ADMIN";
    }

    try {
      await fetch(`${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
                  " - Can't fetch Fe Details"
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
            type: GET_FE_DATA,
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

export const fetchVleData = (type, id) => {
  return async (dispatch, getState) => {
    let accessToken = constants.userToken;
    let url = `${baseUrl.getVleDetails}`;

    if (!!type) {
      accessToken = getState().farmerRole?.accessToken;
      if (type === "ZM") {
        url = `${baseUrl.getVleDetailsByZM}?zmId=${id}`;
      } else {
        url = url + `?feId=${id}&type=${type}`;
      }
    } else {
      url = url + "?type=ADMIN";
    }

    try {
      await fetch(`${url}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
                  " - Can't fetch Vle Details"
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
            type: GET_VLE_DATA,
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
export const updateExecutiveData = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateExecutive}`, {
        method: "PUT",
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
                " - Can't update executive details"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_EXECUTIVE_DATA,
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

export const deleteExecutiveData = (id, type) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteExecutive}?id=${id}&type=${type}`, {
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
            type: DELETE_EXECUTIVE_DATA,
            data: data.result,
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

export const fetchFarmersListByVleId = (vleId) => {
  return async (dispatch, getState) => {
    try {
      let storedAccessToken = getState().farmerRole?.accessToken;
      let accessToken = !!storedAccessToken
        ? storedAccessToken
        : constants.userToken;
      await fetch(`${baseUrl.getFarmersListByVleId}?vleId=${vleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
                  " - Can't fetch farmer details"
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
            type: GET_FARMERS_BY_VLE_ID,
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

export const loginData = (mobileNumber) => {
  return async (dispatch) => {
    let resData;
    try {
      await fetch(
        `${baseUrl.loginUrl}?mobileNumber=${mobileNumber}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.ErrorCode === "INVALID_USER") {
            throw new Error(data.Error);
          } else {
            resData = data;
          }
          resData = data;
        })
        .catch((error) => {
          let errorMessage = "";
          if (error.message.includes("OTP verification failed")) {
            errorMessage = error.message;
          }

          throw new Error(errorMessage);
        });

      await localStorage.setItem("admin", resData.userType);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: resData.userId,
          username: resData.firstName,
          pp: "users/defaultUserImg.png",
          phone: mobileNumber,
        })
      );
      dispatch({
        type: GET_LOGIN_DATA,
        resData: resData,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
