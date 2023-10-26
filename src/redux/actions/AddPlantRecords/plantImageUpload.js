import axios from "axios";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const UPLOAD_CROP_IMAGE_DATA = "UPLOAD_CROP_IMAGE_DATA";
export const UPLOAD_CROP_IMAGE_LOADING = "UPLOAD_CROP_IMAGE_LOADING";

export const UPLOAD_DISEASE_IMAGE_DATA = "UPLOAD_DISEASE_IMAGE_DATA";
export const UPLOAD_DISEASE_IMAGE_LOADING = "UPLOAD_DISEASE_IMAGE_LOADING";

//Uploading crop Image
export const cropImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_CROP_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadCropImageApi,
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
              type: UPLOAD_CROP_IMAGE_DATA,
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

//Uploading Disease Image
export const diseaseImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_DISEASE_IMAGE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadDiseaseImageApi,
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
              type: UPLOAD_DISEASE_IMAGE_DATA,
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
