/*
Custom Component Imports
 */
import axios from "axios";
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
import {
	UTCtolocalDate,
	localToUTCEndDate,
	localToUTCStartDate,
} from "../../../Utils/dataUtils";
import { postToDiscord } from "../../../Utils/utils";
export const FETCH_ROWS = "FETCH_ROWS";
export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const UPDATE = "UPDATE";
export const FILTERED_DATA = "FILTERED_DATA";
export const CROP_DOC_UPLOAD = "CROP_DOC_UPLOAD";

// Fetching Crop Doc Total Results Data
export const fetchRows = (activePage, pagesAmount) => {
	let resData;
	return async (dispatch) => {
		dispatch({
			type: LOADING,
			filtered: false,
			data: [],
		});
		try {
			await fetch(
				`${baseUrl.totalResultsUrl}?pagenum=${activePage}&pagesize=${pagesAmount}`,
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
					dispatch({
						type: FETCH_ROWS,
						data: resData,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Editing Disease Name
export const changeDiseaseName = (editDisease) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.editDiseaseApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(editDisease),
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
						type: UPDATE,
						result: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: ERROR,
				errmsg: err.message,
			});
		}
	};
};

//exporting data by filter
export const fetchCropDocDatabyFilter = (
	pagenum,
	pagesize,
	fromDate,
	toDate,
	searchValue,
	filterType,
	metricStress,
	notUpdated,
	tensorflow
) => {
	let resData;
	let from = fromDate ? localToUTCStartDate(fromDate) : localToUTCStartDate();
	let to = toDate ? localToUTCEndDate(toDate) : localToUTCEndDate();
	return async (dispatch) => {
		dispatch({
			type: LOADING,
			filtered:
				fromDate ||
				toDate ||
				searchValue ||
				filterType ||
				metricStress ||
				notUpdated ||
				tensorflow
					? true
					: false,
			notUpdatedData:
				!fromDate &&
				!toDate &&
				!searchValue &&
				!filterType &&
				!metricStress &&
				notUpdated &&
				notUpdated.value === "No" &&
				!tensorflow
					? true
					: false,
		});
		try {
			await fetch(
				`${
					baseUrl.cropDocDataFilterApi
				}?fromDate=${from}&toDate=${to}&searchCriteria=${
					searchValue || ""
				}&DiseaseCriteria=${filterType ? filterType.value : ""}&metricStress=${
					metricStress ? "Yes" : ""
				}&isUpdated=${
					notUpdated ? notUpdated.value : ""
				}&pagenum=${pagenum}&pagesize=${pagesize}&Source=${
					tensorflow ? "tf" : ""
				}&isFilter=${
					fromDate ||
					toDate ||
					searchValue ||
					filterType ||
					metricStress ||
					(notUpdated && notUpdated.value === "Yes") ||
					tensorflow
						? true
						: false
				}`,
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
					dispatch({
						type: FETCH_ROWS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Uploading crop-doc Image
export const uploadCropdocImage = (userId, file) => {
	return async (dispatch) => {
		let formData = new FormData();
		formData.append("formFile", file);

		var config = {
			method: "post",
			url: `${baseUrl.diagnoseCropUrl}?userId=${userId}`,
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
							type: CROP_DOC_UPLOAD,
							data: data,
							refresh: false,
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

// Fetching Crop Doc Total Results Data For Excel
export const fetchRowsForExcel = async (
	fromDate,
	toDate,
	pagesAmount,
	activePage = 1,
	searchValue,
	filterType,
	metricStress,
	notUpdated,
	tensorflow
) => {
	let from = fromDate ? localToUTCStartDate(fromDate) : localToUTCStartDate();
	let to = toDate ? localToUTCEndDate(toDate) : localToUTCEndDate();
	try {
		let response = await axios.get(
			`${
				baseUrl.cropDocDataFilterApi
			}?pagenum=${activePage}&pagesize=${pagesAmount}&fromDate=${from}&toDate=${to}&searchCriteria=${
				searchValue || ""
			}&DiseaseCriteria=${filterType ? filterType.value : ""}&metricStress=${
				metricStress ? "Yes" : ""
			}&isUpdated=${notUpdated ? notUpdated.value : ""}&Source=${
				tensorflow ? "tf" : ""
			}&isFilter=${
				from ||
				to ||
				searchValue ||
				filterType ||
				metricStress ||
				(notUpdated && notUpdated.value === "Yes") ||
				tensorflow
					? true
					: false
			}
      `,
			{
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response?.data;
	} catch (error) {
		console.error("Error in fetchRowsForExcel ===", error);
		return "Error";
	}
};
