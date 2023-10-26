/*
Custom Component Imports
 */
import moment from "moment-timezone";
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
import {
  UTCtolocalDate,
  localToUTCStartDate,
  localToUTCEndDate,
} from "../../../Utils/dataUtils";

export const NEW_USERS_DATA = "NEW_USERS_DATA";
export const NEW_USERS_LOADING = "NEW_USERS_LOADING";
export const NEW_USERS_ERROR = "NEW_USERS_ERROR";

export const STATS_DATA = "STATS_DATA";
export const STATS_LOADING = "STATS_LOADING";
export const STATS_ERROR = "STATS_ERROR";

export const TOP_USERS_DATA = "TOP_USERS_DATA";
export const TOP_USERS_LOADING = "TOP_USERS_LOADING";
export const TOP_USERS_ERROR = "TOP_USERS_ERROR";

export const CHART_DATA = "CHART_DATA";
export const CHART_DATA_LOADING = "CHART_DATA_LOADING";
export const CHART_DATA_ERROR = "CHART_DATA_ERROR";

export const TOTAL_CROP_DOC_COUNT = "TOTAL_CROP_DOC_COUNT";
export const TOTAL_CROP_DOC_WITH_DISEASE_COUNT =
  "TOTAL_CROP_DOC_WITH_DISEASE_COUNT";
export const TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT =
  "TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT";
export const TOTAL_CROP_DOC_DAY_COUNT = "TOTAL_CROP_DOC_DAY_COUNT";

export const TOTAL_CROP_DOC_COUNT_LOADING = "TOTAL_CROP_DOC_COUNT_LOADING";
export const TOTAL_CROP_DOC_WITH_DISEASE_COUNT_LOADING =
  "TOTAL_CROP_DOC_WITH_DISEASE_COUNT_LOADING";
export const TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT_LOADING =
  "TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT_LOADING";
export const TOTAL_CROP_DOC_DAY_COUNT_LOADING =
  "TOTAL_CROP_DOC_DAY_COUNT_LOADING";
export const TOTAL_CROP_DOC_COUNT_ERROR = "TOTAL_CROP_DOC_COUNT_ERROR";

export const CURRENT_VERSION_COUNT_LOADING = "CURRENT_VERSION_COUNT_LOADING";
export const CURRENT_VERSION_COUNT_DATA = "CURRENT_VERSION_COUNT_DATA";
export const CURRENT_VERSION_COUNT_ERROR = "CURRENT_VERSION_COUNT_ERROR";

export const POSTS_COUNT_LOADING = "POSTS_COUNT_LOADING";
export const POSTS_COUNT_DATA = "POSTS_COUNT_DATA";

export const NEW_USERS_COUNT_LOADING = "NEW_USERS_COUNT_LOADING";
export const NEW_USERS_COUNT_DATA = "NEW_USERS_COUNT_DATA";

export const CROPDOC_USERS_COUNT_LOADING = "CROPDOC_USERS_COUNT_LOADING";
export const CROPDOC_USERS_COUNT_DATA = "CROPDOC_USERS_COUNT_DATA";

export const CROPDOC_ATTENDED_COUNT_LOADING = "CROPDOC_ATTENDED_COUNT_LOADING";
export const CROPDOC_ATTENDED_COUNT_DATA = "CROPDOC_ATTENDED_COUNT_DATA";

export const CROPDOC_UNATTENDED_COUNT_LOADING =
  "CROPDOC_UNATTENDED_COUNT_LOADING";
export const CROPDOC_UNATTENDED_COUNT_DATA = "CROPDOC_UNATTENDED_COUNT_DATA";

export const CURRENT_VERSION_NAME_LOADING = "CURRENT_VERSION_NAME_LOADING";
export const CURRENT_VERSION_NAME_DATA = "CURRENT_VERSION_NAME_DATA";

export const TOTAL_CROP_DOC_DAY_COUNT_FILTER =
  "TOTAL_CROP_DOC_DAY_COUNT_FILTER";

export const CROPDOC_TENSORFLOW_COUNT_LOADING =
  "CROPDOC_TENSORFLOW_COUNT_LOADING";
export const CROPDOC_TENSORFLOW_COUNT_DATA = "CROPDOC_TENSORFLOW_COUNT_DATA";

// Recently Logged In Users Data
export const fetchRecentLoggedInUsers = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  let resData;
  return async (dispatch) => {
    dispatch({
      type: NEW_USERS_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.newUsersApi
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
          from || to ? true : false
        }`,
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
                  " - Can't fetch Recent Logged in Users"
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
            type: NEW_USERS_DATA,
            data: resData,
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

//Fetching Top Users
export const fetchTopUsers = () => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: TOP_USERS_LOADING,
    });
    try {
      await fetch(`${baseUrl.topUsersApi}`, {
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
                  " - Top Users Error"
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
            type: TOP_USERS_DATA,
            data: resData,
            search: "",
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOP_USERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching Bar Chart Data
export const fetchChartData = () => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: CHART_DATA_LOADING,
    });
    try {
      await fetch(`${baseUrl.chartDataApi}`, {
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
                  " - Chart Data Error"
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
            type: CHART_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CHART_DATA_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching User Stats Data
export const fetchUserStats = () => {
  let resData;
  return async (dispatch) => {
    dispatch({
      type: STATS_LOADING,
    });
    try {
      await fetch(`${baseUrl.statsApi}`, {
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
                  " - Stats Error"
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
            type: STATS_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: STATS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Crop doctor total count
export const getTotalCropDocCount = () => {
  return async (dispatch) => {
    dispatch({
      type: TOTAL_CROP_DOC_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.getTotalCropDocCount}`, {
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
                  " - Total Crop Doc Count Error"
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
            type: TOTAL_CROP_DOC_COUNT,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOTAL_CROP_DOC_COUNT_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Crop doctor with disease count
export const getTotalCropDocWithDiseaseCount = () => {
  return async (dispatch) => {
    dispatch({
      type: TOTAL_CROP_DOC_WITH_DISEASE_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.getTotalCropDocWithDiseaseCount}`, {
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
                  " - Total Crop Doc With Disease Count Error"
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
            type: TOTAL_CROP_DOC_WITH_DISEASE_COUNT,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOTAL_CROP_DOC_COUNT_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Crop Doctor Without disease count
export const getTotalCropDocWithoutDiseaseCount = () => {
  return async (dispatch) => {
    dispatch({
      type: TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.getTotalCropDocWithoutDiseaseCount}`, {
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
                  " - Total Crop Doc Without Disease Count Error"
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
            type: TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOTAL_CROP_DOC_COUNT_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Crop Doctor Day wise count
export const getTotalCropDocDayCount = () => {
  let fromDate = localToUTCStartDate();
  let toDate = localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: TOTAL_CROP_DOC_DAY_COUNT_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.getTotalCropDocDayCount
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${true}`,
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
                  " - Total Crop Doc Day Count Error"
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
            type: TOTAL_CROP_DOC_DAY_COUNT,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOTAL_CROP_DOC_COUNT_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Current version users count
export const getCurrentVersionUsersCount = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: CURRENT_VERSION_COUNT_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.getCurrentVersionUsersCount
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
          from || to ? true : false
        }`,
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
                  " - Current Version Users Count Error"
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
          if (data.length > 0) {
            dispatch({
              type: CURRENT_VERSION_COUNT_DATA,
              data: data[0].currentVersionCount,
            });
          } else {
            dispatch({
              type: CURRENT_VERSION_COUNT_DATA,
              data: 0,
            });
          }
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CURRENT_VERSION_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Current Day kisan vedika posts count
export const getKisanVedikaPostsCount = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: POSTS_COUNT_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.postsCountApi
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
          from || to ? true : false
        }`,
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
                  " - Posts Count Error"
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
            type: POSTS_COUNT_DATA,
            data: data.length > 0 ? data[0].todaysUploads : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: POSTS_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//New Users Count
export const getNewUsersCount = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: NEW_USERS_COUNT_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.newUsersCountApi
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
          from || to ? true : false
        }`,
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
                  " - New Users Count Error"
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
            type: NEW_USERS_COUNT_DATA,
            data: data.length > 0 ? data[0].todaysUsers : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: NEW_USERS_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doc Users Count
export const getCropDocUsersCount = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_USERS_COUNT_LOADING,
    });
    try {
      await fetch(
        `${
          baseUrl.cropDocUsersCountApi
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
          from || to ? true : false
        }`,
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
                  " - Crop Doc Users Count Error"
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
            type: CROPDOC_USERS_COUNT_DATA,
            data: data.length > 0 ? data[0].cropDocUsers : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_USERS_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doc Attended Count
export const getCropDocAttendedCount = () => {
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_ATTENDED_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.cropDocAttendedCountApi}`, {
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
                  " - Crop Doc Attended Count Error"
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
            type: CROPDOC_ATTENDED_COUNT_DATA,
            data: data.length > 0 ? data[0].updatedCount : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_ATTENDED_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doc Unattended Count
export const getCropDocUnAttendedCount = () => {
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_UNATTENDED_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.cropDocUnAttendedCountApi}`, {
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
                  " - Crop Doc Unattended Count Error"
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
            type: CROPDOC_UNATTENDED_COUNT_DATA,
            data: data.length > 0 ? data[0].withoutUpdatedCount : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_UNATTENDED_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doc Current Version Name
export const getCurrentVersionName = () => {
  return async (dispatch) => {
    dispatch({
      type: CURRENT_VERSION_NAME_LOADING,
    });
    try {
      await fetch(`${baseUrl.getCurrentVersionNameApi}`, {
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
                  " - Current Version name error"
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
            type: CURRENT_VERSION_NAME_DATA,
            data: data.currentVersion,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CURRENT_VERSION_NAME_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doctor Day wise count
export const getTotalCropDocDayCountFilter = (from, to) => {
  let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
  let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
  return async (dispatch) => {
    dispatch({
      type: TOTAL_CROP_DOC_DAY_COUNT_FILTER,
      data: null,
    });
    try {
      await fetch(
        `${
          baseUrl.getTotalCropDocDayCount
        }?fromDate=${fromDate}&toDate=${toDate}&isFilter=${true}`,
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
                  " - Total Crop Doc Day Count Error"
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
            type: TOTAL_CROP_DOC_DAY_COUNT_FILTER,
            data: data.length > 0 ? data[0]?.todaysUploads : 0,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: TOTAL_CROP_DOC_DAY_COUNT_FILTER,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};

//Crop Doc Tensorflow count
export const getCropDocTensorflowCount = () => {
  return async (dispatch) => {
    dispatch({
      type: CROPDOC_TENSORFLOW_COUNT_LOADING,
    });
    try {
      await fetch(`${baseUrl.getCropDocTensorflowCountUrl}`, {
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
                  " - Crop Doc Tensorflow Count Error"
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
            type: CROPDOC_TENSORFLOW_COUNT_DATA,
            data: data.tfCount,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROPDOC_TENSORFLOW_COUNT_DATA,
        data: "Err",
      });
      throw new Error(err.message);
    }
  };
};
