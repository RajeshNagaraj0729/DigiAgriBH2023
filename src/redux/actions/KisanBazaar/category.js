import axios from "axios";

import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORY = "GET_CATEGORY";
export const CREATE_SUB_CATEGORY = "CREATE_SUB_CATEGORY";
export const GET_SUB_CATEGORY = "GET_SUB_CATEGORY";
export const GET_ALL_ADS = "GET_ALL_ADS";

// export const UPLOAD_CATEGORY_IMAGE_DATA = "UPLOAD_CATEGORY_IMAGE_DATA";
// export const UPLOAD_CATEGORY_IMAGE_LOADING = "UPLOAD_CATEGORY_IMAGE_LOADING";

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_SUB_CATEGORY = "UPDATE_SUB_CATEGORY";

export const createCategory = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createCategoryApi}`, {
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
                " - Can't Add Category"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_CATEGORY,
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

export const createSubCategory = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createSubCategoryApi}`, {
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
                " - Can't Add Sub Category"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_SUB_CATEGORY,
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

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getCategoryApi}`, {
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
                  " - Can't fetch Categories"
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
            type: GET_CATEGORY,
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

export const fetchSubCategory = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getSubCategoryApi}`, {
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
                  " - Can't fetch Sub Categories"
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
            type: GET_SUB_CATEGORY,
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

export const updateCategory = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateCategoryApi}`, {
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
                " - Can't update Category"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_CATEGORY,
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

export const updateSubCategory = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateSubCategoryApi}`, {
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
                " - Can't update SubCategory"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_SUB_CATEGORY,
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

export const fetchKisanBazaarAdsApi = (pageNum, pageSize) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.getKisanBazaarAdsUrl}?pagesize=${pageSize}&pagenum=${pageNum}`,
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
                  " - Can't fetch Ads"
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
            type: GET_ALL_ADS,
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
