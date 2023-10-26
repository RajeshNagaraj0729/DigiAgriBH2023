import * as baseUrl from "../url/baseUrl";
import * as constants from "../constants";
import { Alert } from "rsuite";

export const isNoDiseaseFound = (diseaseCauseId, diseases) => {
  return diseases.filter((r) => r.id === diseaseCauseId)[0]
    ?.isNoDiseaseDataFound;
};

//Validate Image Url
export const validateImageUrl = (imageUrl) => {
  if (
    imageUrl !== "" &&
    !imageUrl.toLowerCase().endsWith(".jpg") &&
    !imageUrl.toLowerCase().endsWith(".png") &&
    !imageUrl.toLowerCase().endsWith(".jpeg")
  ) {
    return false;
  }
  return true;
};

export const getUsersDataApi = async (
  fromDate,
  toDate,
  searchValue,
  crop,
  state,
  lang,
  dist,
  postCode,
  pagenum,
  pagesize,
  includeCD,
  includeKV,
  userVersion,
  title,
  message,
  type,
  isNotification
) => {
  try {
    let resData;
    await fetch(
      `${
        baseUrl.userDataByDateApi
      }?fromDate=${fromDate}&toDate=${toDate}&searchCriteria=${searchValue}&crop=${crop}&state=${state}&lang=${lang}&userVersion=${
        userVersion || ""
      }&title=${title}&message=${message}&type=${type}&isNotification=${
        isNotification ? true : false
      }&district=${dist || ""}&postCode=${postCode || 0}&pagenum=${
        pagenum || 1
      }&pagesize=${
        pagesize || 10
      }&isCropDocCountRequired=${includeCD}&isPostsCountRequired=${includeKV}`,
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
        resData = data;
      })
      .catch((error) => {
        Alert.error(error.message);
      });

    return resData;
  } catch (error) {
    Alert.error(error.message);
  }
};
