import axios from "axios";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";

export const UPLOAD_FILE_ERROR = "UPLOAD_FILE_ERROR";
export const UPLOAD_FILE_DATA = "UPLOAD_FILE_DATA";
export const UPLOAD_FILE_LOADING = "UPLOAD_FILE_LOADING";

//Uploading file
export const fileUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_FILE_LOADING,
    });

    let formData = new FormData();
    formData.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadFileApi,
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
              type: UPLOAD_FILE_DATA,
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
      dispatch({
        type: UPLOAD_FILE_ERROR,
        errmsg: err.message,
      });
    }
  };
};
