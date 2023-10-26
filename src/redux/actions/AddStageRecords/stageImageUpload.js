import axios from "axios";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const UPLOAD_STAGETYPE_IMAGE_DATA = "UPLOAD_STAGETYPE_IMAGE_DATA";
export const UPLOAD_STAGETYPE_IMAGE_LOADING = "UPLOAD_STAGETYPE_IMAGE_LOADING";

export const UPLOAD_STAGE_IMAGE_DATA = "UPLOAD_STAGE_IMAGE_DATA";
export const UPLOAD_STAGE_IMAGE_LOADING = "UPLOAD_STAGE_IMAGE_LOADING";

export const UPLOAD_STAGETASK_IMAGE_DATA = "UPLOAD_STAGETASK_IMAGE_DATA";
export const UPLOAD_STAGETASK_IMAGE_LOADING = "UPLOAD_STAGETASK_IMAGE_LOADING";

//Uploading Stage type Image
export const stageTypeImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_STAGETYPE_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadStageTypeImageApi,
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
              type: UPLOAD_STAGETYPE_IMAGE_DATA,
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

//Uploading Stage Image
export const stageImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_STAGE_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadStageImageApi,
      headers: {
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
              type: UPLOAD_STAGE_IMAGE_DATA,
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

//Uploading Stage Image
export const stageTaskImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_STAGETASK_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadStageTaskImageApi,
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
              type: UPLOAD_STAGETASK_IMAGE_DATA,
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
