/*
Custom Component Imports
 */
import * as baseUrl from "../../../../url/baseUrl";
import * as constants from "../../../../constants";

export const PROMO_BANNERS_LOADING = "PROMO_BANNERS_LOADING";
export const PROMO_BANNERS_ERROR = "PROMO_BANNERS_ERROR";
export const PROMO_BANNERS_DATA = "PROMO_BANNERS_DATA";
export const CREATE_PROMO_BANNER = "CREATE_PROMO_BANNER";
export const UPDATE_PROMO_BANNER = "UPDATE_PROMO_BANNER";

//Get Promotional Banners
export const fetchPromoBanners = (lang) => {
  return async (dispatch) => {
    dispatch({
      type: PROMO_BANNERS_LOADING,
    });
    try {
      await fetch(`${baseUrl.getPromoBannersApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": lang,
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
                  " - Can't fetch promo banners"
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
            type: PROMO_BANNERS_DATA,
            data: data,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: PROMO_BANNERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Create Promotional Banner
export const createPromoBanners = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createPromoBannerApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
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
            type: CREATE_PROMO_BANNER,
            data: data.result,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: PROMO_BANNERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

//Update Promotional Banner
export const updatePromoBanner = (value, lang) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updatePromoBannerApi}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": lang,
        },
        body: JSON.stringify(value),
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
            type: UPDATE_PROMO_BANNER,
            data: data.result,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: PROMO_BANNERS_ERROR,
        errmsg: err.message,
      });
    }
  };
};
