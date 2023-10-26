import * as baseUrl from "../url/baseUrl";
import * as constants from "../constants";
import { Alert } from "rsuite";

export const dynamicLinkGenerationApi = async (id, type, format) => {
  try {
    let resData;
    await fetch(
      `${baseUrl.deeplinkingApi}?linkId=${id}&linkType=${type}&linkFormat=${format}&isDeepLinkRequired=true&api-version=2.0`,
      {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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

export const fetchDiseaseCauseByIdApi = async (diseaseId) => {
  try {
    let resData;
    await fetch(`${baseUrl.getDiseaseCauseApi}?diseaseCauseId=${diseaseId}`, {
      headers: {
        Authorization: `Bearer ${constants.userToken}`,
        "Content-Type": "application/json",
      },
    })
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

export const productDynamicLinkGenerationApi = async (
  encodedLink,
  title,
  description,
  imageUrl,
  format
) => {
  try {
    let resData;
    await fetch(
      `${baseUrl.getProductDeeplinkUrl}?encodedDeeplink=${encodedLink}&linkTitle=${title}&linkDescription=${description}&linkImage=${imageUrl}&linkFormat=${format}`,
      {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
