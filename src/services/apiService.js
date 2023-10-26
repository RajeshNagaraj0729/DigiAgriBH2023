import * as urls from "../url/baseUrl";
import * as constants from "../constants";

export const getStagesByCropIdApi = async (cropId) => {
  try {
    let resData;
    await fetch(`${urls.getStagesByCrop}?cropId=${cropId}`, {
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resData = data;
      })
      .catch((error) => {
        throw new Error("Failed to fetch stages");
      });
    return resData;
  } catch (error) {
    throw new Error("Failed to fetch stages");
  }
};
