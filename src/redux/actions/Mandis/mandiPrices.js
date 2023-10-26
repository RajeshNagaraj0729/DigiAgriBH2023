/**
 * React imports
 */
import axios from "axios";

/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const MANDI_PRICES_DATA = "MANDI_PRICES_DATA";
export const MANDI_PLANTS = "MANDI_PLANTS";
export const LAST_UPLOADED_DATE = "LAST_UPLOADED_DATE";

//Mandi Prices Data
export const getMandiPricesData = () => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: baseUrl.mandiPricesApi,
      headers: {
        Accept: "application/json",
      },
    };
    try {
      await axios(config)
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: MANDI_PRICES_DATA,
              data: response.data.records,
              createdAt: response.data.updated_date,
            });
          } else {
            throw new Error("Can't fetch mandi prices");
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

//Post mandi prices
export const createMandiPrices = (value) => {
  return async () => {
    try {
      await fetch(`${baseUrl.postMandisInBetaApi}`, {
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
                " - Can't Add Mandis data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result !== "Success") {
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

//Post mandi prices
export const createMandiPricesInProd = (value) => {
  return async () => {
    try {
      await fetch(`${baseUrl.postMandisInProdApi}`, {
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
                " - Can't Add Mandis data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result !== "Success") {
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

//Get mandi plants
export const getMandiPlants = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getPlantsApi}`, {
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
                  " - Can't fetch mandi plants"
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
            type: MANDI_PLANTS,
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

//Get Last Uploaded Date
export const getLastUploadedDate = () => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getLastUploadedDateApi}`, {
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
                  " - Can't fetch last uploaded date"
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
            type: LAST_UPLOADED_DATE,
            data: data.currentDate,
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
