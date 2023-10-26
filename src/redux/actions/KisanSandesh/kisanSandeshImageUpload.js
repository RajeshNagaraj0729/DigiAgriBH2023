import axios from "axios";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const UPLOAD_NEWS_IMAGE_DATA = "UPLOAD_NEWS_IMAGE_DATA";
export const UPLOAD_NEWS_IMAGE_LOADING = "UPLOAD_NEWS_IMAGE_LOADING";

export const UPLOAD_VIDEOS_IMAGE_DATA = "UPLOAD_VIDEOS_IMAGE_DATA";
export const UPLOAD_VIDEOS_IMAGE_LOADING = "UPLOAD_VIDEOS_IMAGE_LOADING";

export const UPLOAD_TIPS_IMAGE_DATA = "UPLOAD_TIPS_IMAGE_DATA";
export const UPLOAD_TIPS_IMAGE_LOADING = "UPLOAD_TIPS_IMAGE_LOADING";

//Uploading news Image
export const newsImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_NEWS_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadNewsImageApi,
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      data: formData,
    };
    try {
      await axios(config)
        .then((response) => {
          let data = response.data;
          if (data.message === "Image Uploaded Successfully") {
            dispatch({
              type: UPLOAD_NEWS_IMAGE_DATA,
              data: data.uploadedFile.url,
            });
          } else {
            throw new Error(data.message);
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

//Uploading Video Image
export const videosImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_VIDEOS_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadVideosImageApi,
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      data: formData,
    };
    try {
      await axios(config)
        .then((response) => {
          let data = response.data;
          if (data.message === "Image Uploaded Successfully") {
            dispatch({
              type: UPLOAD_VIDEOS_IMAGE_DATA,
              data: data.uploadedFile.url,
            });
          } else {
            throw new Error(data.message);
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

//Uploading Tip Image
export const tipsImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_TIPS_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadTipsImageApi,
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      data: formData,
    };
    try {
      await axios(config)
        .then((response) => {
          let data = response.data;
          if (data.message === "Image Uploaded Successfully") {
            dispatch({
              type: UPLOAD_TIPS_IMAGE_DATA,
              data: data.uploadedFile.url,
            });
          } else {
            throw new Error(data.message);
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
