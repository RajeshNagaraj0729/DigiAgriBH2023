import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CREATE_APP_NOTIFICATION = "CREATE_APP_NOTIFICATION";
export const GET_APP_NOTIFICATION = "GET_APP_NOTIFICATION";
export const UPDATE_APP_NOTIFICATION = "UPDATE_APP_NOTIFICATION";
export const DELETE_APP_NOTIFICATION = "DELETE_APP_NOTIFICATION";

export const CREATE_IN_APP_CRITERIA = "CREATE_IN_APP_CRITERIA";
export const GET_IN_APP_CRITERIA = "GET_IN_APP_CRITERIA";
export const UPDATE_IN_APP_CRITERIA = "UPDATE_IN_APP_CRITERIA";
export const DELETE_IN_APP_CRITERIA = "DELETE_IN_APP_CRITERIA";
export const IN_APP_ACTIVITY_HISTORY = "IN_APP_ACTIVITY_HISTORY";

export const createAppNotification = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createInsideAppNotification}`, {
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
                " - Can't Add App Notification"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_APP_NOTIFICATION,
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

export const fetchAppNotification = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getInsideAppNotification}`, {
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
                  " - Can't fetch App Notifications"
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
            type: GET_APP_NOTIFICATION,
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

export const updateAppNotification = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateInsideAppNotification}`, {
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
                " - Can't update App Notification"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_APP_NOTIFICATION,
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

export const deleteAppNotification = (NotificationId) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.deleteInsideAppNotification}?Id=${NotificationId}`,
        {
          method: "DELETE",
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
            type: DELETE_APP_NOTIFICATION,
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

export const createInAppCriteria = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createInAppCriteria}`, {
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
                " - Can't Add In App Criteria"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_IN_APP_CRITERIA,
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

export const fetchInAppCriteria = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getInAppCriteria}`, {
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
                  " - Can't fetch In App Criteria"
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
            type: GET_IN_APP_CRITERIA,
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

export const updateInAppCriteria = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateInAppCriteria}`, {
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
                " - Can't update In App Criteria"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_IN_APP_CRITERIA,
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

export const deleteInAppCriteria = (NotificationCiteriaId) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.deleteInAppCriteria}?Id=${NotificationCiteriaId}`,
        {
          method: "DELETE",
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
            type: DELETE_IN_APP_CRITERIA,
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

export const fetchInAppNotificationHistoryApi = (pageNum, pageSize) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.getInAppActivities}?pagenum=${pageNum}&pagesize=${pageSize}`,
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
                  " - Can't fetch In App History"
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
            type: IN_APP_ACTIVITY_HISTORY,
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
