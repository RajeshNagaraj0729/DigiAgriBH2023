import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
import {
	localToUTCEndDate,
	localToUTCStartDate,
} from "../../../Utils/dataUtils";
import axios from "axios";

export const GET_ANALYTICS_CROPS = "GET_ANALYTICS_CROPS";
export const GET_ANALYTICS_STATES = "GET_ANALYTICS_STATES";
export const GET_ANALYTICS_DISTRICTS = "GET_ANALYTICS_DISTRICTS";
export const GET_ANALYTICS_DISEASE = "GET_ANALYTICS_DISEASE";
export const GET_ANALYTICS_RESULTS = "GET_ANALYTICS_RESULTS";
export const GET_ANALYTICS_COUNT = "GET_ANALYTICS_COUNT";
export const GET_DISEASE_ANALYTICS_RESULTS = "GET_DISEASE_ANALYTICS_RESULTS";
export const GET_CROPS_ANALYTICS_RESULTS = "GET_CROPS_ANALYTICS_RESULTS";

export const GET_ANALYTICS_DISEASE_TYPE = "GET_ANALYTICS_DISEASE_TYPE";
export const GET_ANALYTICS_CROP_TYPE = "GET_ANALYTICS_CROP_TYPE";
export const GET_ANALYTICS_STAGE_COUNT = "GET_ANALYTICS_STAGE_COUNT";

export const GET_PRAKSHEP_ANALYTICS_COUNT = "GET_PRAKSHEP_ANALYTICS_COUNT";
export const GET_PRAKSHEP_SYNCED_DATA = "GET_PRAKSHEP_SYNCED_DATA";

export const GET_CROP_DOC_DAILY_STATS = "GET_CROP_DOC_DAILY_STATS";

export const fetchAnalyticsCrops = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsCropsApi}`, {
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
									" - Can't fetch Analytics Crops"
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
						type: GET_ANALYTICS_CROPS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsStates = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsStatesApi}`, {
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
									" - Can't fetch Analytics States"
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
						type: GET_ANALYTICS_STATES,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsDistricts = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsDistrictApi}`, {
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
									" - Can't fetch Analytics Districts"
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
						type: GET_ANALYTICS_DISTRICTS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsDiseases = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsDiseaseApi}`, {
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
									" - Can't fetch Analytics Diseases"
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
						type: GET_ANALYTICS_DISEASE,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsResults = (
	fromDate,
	toDate,
	cropname,
	state,
	district,
	diseasename,
	number,
	amount,
	flag
) => {
	return async (dispatch) => {
		let from = localToUTCStartDate(fromDate);
		let to = localToUTCEndDate(toDate);
		try {
			await fetch(
				`${baseUrl.getAnalyticsResults}?fromDate=${from || ""}&toDate=${
					to || ""
				}&cropname=${cropname || ""}&state=${state || ""}&district=${
					district || ""
				}&diseasename=${
					diseasename || ""
				}&isFilter=${flag}&pagenum=${number}&pagesize=${amount}`,
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
								"Error " +
									response.status +
									": " +
									response.statusText +
									" - Can't fetch Analytics Results"
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
						type: GET_ANALYTICS_RESULTS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//Fetching Analytics Posts Data - for Excel
export const fetchAnalyticsResultsForExcelData = async (
	fromDate,
	toDate,
	pagesAmount,
	activePage = 1,
	cropname,
	state,
	district,
	diseasename,
	flag
) => {
	let from = localToUTCStartDate(fromDate);
	let to = localToUTCEndDate(toDate);
	try {
		let response = await axios.get(
			`${
				baseUrl.getAnalyticsResults
			}?pagenum=${activePage}&pagesize=${pagesAmount}&fromDate=${from}&toDate=${to}&cropname=${
				cropname || ""
			}&state=${state || ""}&district=${district || ""}&diseasename=${
				diseasename || ""
			}&isFilter=${flag}`,
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

export const fetchAnalyticsCount = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsCount}`, {
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
									" - Can't fetch Analytics Count"
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
						type: GET_ANALYTICS_COUNT,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsDiseaseType = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsDiseaseType}?type=diseasename`, {
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
									" - Can't fetch Analytics Crops"
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
						type: GET_ANALYTICS_DISEASE_TYPE,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsCropType = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getAnalyticsCropsType}?type=cropname`, {
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
									" - Can't fetch Analytics Crops"
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
						type: GET_ANALYTICS_CROP_TYPE,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchDiseaseAnalyticsResults = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getDiseaseAnalyticsResults}`, {
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
									" - Can't fetch Disease Analytics Results"
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
						type: GET_DISEASE_ANALYTICS_RESULTS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchCropsAnalyticsResults = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getCropsAnalyticsResults}`, {
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
									" - Can't fetch Crops Analytics Results"
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
						type: GET_CROPS_ANALYTICS_RESULTS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchAnalyticsStageCount = (stageName, value) => {
	return async (dispatch) => {
		try {
			await fetch(
				`${baseUrl.getAnalyticsStageCount}?stage=${stageName}&percentage=${value}`,
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
								"Error " +
									response.status +
									": " +
									response.statusText +
									" - Can't fetch analytics stage count"
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
						type: GET_ANALYTICS_STAGE_COUNT,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchPrakshepAnalyticsCountApi = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.prakshepAnalyticsCountUrl}`, {
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
									" - Can't fetch prakshep analytics count"
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
						type: GET_PRAKSHEP_ANALYTICS_COUNT,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchPrakshepSyncedDataApi = (noOfdays) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.prakshepSyncedDataUrl}?noOfDays=${noOfdays}`, {
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
									" - Can't fetch prakshep synced data"
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
						type: GET_PRAKSHEP_SYNCED_DATA,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

export const fetchCropDocDailyStatsCount = (fromDate, toDate) => {
	let from = localToUTCStartDate(fromDate);
	let to = localToUTCEndDate(toDate);
	return async (dispatch) => {
		try {
			await fetch(
				`${baseUrl.cropDocDailyStatsCountUrl}?From=${from}&To=${to}`,
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
								"Error " +
									response.status +
									": " +
									response.statusText +
									" - Can't fetch crop doc daily stats"
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
						type: GET_CROP_DOC_DAILY_STATS,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};
