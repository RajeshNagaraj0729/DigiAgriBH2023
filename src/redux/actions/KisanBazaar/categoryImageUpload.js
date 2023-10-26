import axios from "axios";

import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const UPLOAD_CATEGORY_IMAGE_DATA = "UPLOAD_CATEGORY_IMAGE_DATA";
export const UPLOAD_CATEGORY_IMAGE_LOADING = "UPLOAD_CATEGORY_IMAGE_LOADING";

export const categoryImageUpload = (file) => {
  return async (dispatch) => {
    dispatch({
      type: UPLOAD_CATEGORY_IMAGE_LOADING,
    });

    var formdata = new FormData();
    formdata.append("formFile", file);

    var config = {
      method: "post",
      url: baseUrl.uploadCategoryIconsApi,
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      data: formdata,
    };
    try {
      await axios(config)
        .then((response) => {
          let data = response.data;
          if (data.message === "Category icon Uploaded Successfully") {
            dispatch({
              type: UPLOAD_CATEGORY_IMAGE_DATA,
              data: data.data[0].mediaUrl,
            });
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
