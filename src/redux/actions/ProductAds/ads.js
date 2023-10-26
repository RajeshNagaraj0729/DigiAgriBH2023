import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CREATE_PRODUCT_ADS = "CREATE_PRODUCT_ADS";
export const GET_PRODUCT_ADS = "GET_PRODUCT_ADS";
export const UPDATE_PRODUCT_ADS = "UPDATE_PRODUCT_ADS";
export const DELETE_PRODUCT_ADS = "DELETE_PRODUCT_ADS";

export const createProductAds = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createProductAdsApi}`, {
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
                " - Can't Add ProductAds"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_PRODUCT_ADS,
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

export const fetchProductAds = (home) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getProductAdsApi}?showIn=${home}`, {
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
                  " - Can't fetch ProductAds"
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
            type: GET_PRODUCT_ADS,
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

export const updateProductAds = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateProductAdsApi}`, {
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
                " - Can't update ProductAds"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_PRODUCT_ADS,
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

export const deleteProductAds = (ProductId) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteProductAdsApi}?Id=${ProductId}`, {
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
            type: DELETE_PRODUCT_ADS,
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
