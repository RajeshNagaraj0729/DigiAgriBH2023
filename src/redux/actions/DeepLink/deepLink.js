import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const CROP_CARE_DEEPLINKS = "CROP_CARE_DEEPLINKS";
export const PEST_CARE_DEEPLINKS = "PEST_CARE_DEEPLINKS";
export const DISEASE_DEEPLINKS = "DISEASE_DEEPLINKS";
export const CROP_CARE_DEEPLINKS_ERROR = "CROP_CARE_DEEPLINKS_ERROR";
export const CREATE_DEEPLINK = "CREATE_DEEPLINK";
export const PRODUCT_DEEPLINKS = "PRODUCT_DEEPLINKS";

export const fetchDeepLinks = (linkType) => {
  let resData;
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.getDeepLinksApi}?linkType=${linkType}`, {
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
                  " - DeepLinks not found"
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

          let navType;

          if (linkType === "cropCareWithCrop") {
            navType = CROP_CARE_DEEPLINKS;
          } else if (linkType === "pestCareWithCrop") {
            navType = PEST_CARE_DEEPLINKS;
          } else if (linkType === "pestCareDisease") {
            navType = DISEASE_DEEPLINKS;
          } else if (linkType == "AgriStoreTab") {
            navType = PRODUCT_DEEPLINKS;
          }

          dispatch({
            type: navType,
            data: resData,
          });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } catch (err) {
      dispatch({
        type: CROP_CARE_DEEPLINKS_ERROR,
        errmsg: err.message,
      });
    }
  };
};

export const createDeepLink = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createDeepLinkApi}`, {
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
                " - Can't Add DeepLink"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_DEEPLINK,
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
