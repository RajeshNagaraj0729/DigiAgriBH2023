/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CROPS_DATA = "CROPS_DATA";
export const TOP_DISEASES_DATA = "TOP_DISEASES_DATA";
export const DISEASES_DATA = "DISEASES_DATA";
export const CROP_DOC_INFO_ERROR = "CROP_DOC_INFO_ERROR";
export const TOP_DISEASES_ERROR = "TOP_DISEASES_ERROR";
export const BIO_PRODUCTS_DATA = "BIO_PRODUCTS_DATA";
export const CHEM_PRODUCTS_DATA = "CHEM_PRODUCTS_DATA";

//Fetching Crops Data
export const fetchCrops = () => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getCropsApi}`, {
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
                  " - crops not found"
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
            type: CROPS_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROP_DOC_INFO_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching Diseases Data
export const fetchDiseases = () => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getDiseasesApi}`, {
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
                  " - Diseases not found"
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
            type: DISEASES_DATA,
            data: resData,
            search: "",
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROP_DOC_INFO_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching Top Diseases
export const fetchTopDiseases = () => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.topDiseasesApi}`, {
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
                  " - Top Diseases Not Found"
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
            type: TOP_DISEASES_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROP_DOC_INFO_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Fetching Product by DiseaseId
export const getBioProductByDiseaseId = (diseaseId) => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(
        `${
          baseUrl.getProductByDiseaseId
        }?type=${"biological"}&diseaseId=${diseaseId}`,
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
                  " - Biological products Error"
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
            type: BIO_PRODUCTS_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: BIO_PRODUCTS_DATA,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

//Fetching Product by DiseaseId
export const getChemProductByDiseaseId = (diseaseId) => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(
        `${
          baseUrl.getProductByDiseaseId
        }?type=${"chemical"}&diseaseId=${diseaseId}`,
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
                  " - Chemical products Error"
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
            type: CHEM_PRODUCTS_DATA,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CHEM_PRODUCTS_DATA,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};
