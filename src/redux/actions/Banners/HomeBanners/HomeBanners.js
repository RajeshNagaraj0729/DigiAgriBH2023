/*
Custom Component Imports
 */
import * as baseUrl from "../../../../url/baseUrl";
import * as constants from "../../../../constants";
export const FETCH_HOME_BANNERS = "FETCH_HOME_BANNERS";
export const HOME_BANNERS_LOADING = "HOME_BANNERS_LOADING";
export const HOME_BANNERS_ERROR = "HOME_BANNERS_DATA_ERROR";
export const CREATE_HOME_BANNER = "CREATE_HOME_BANNER";
export const UPDATE_HOME_BANNER = "UPDATE_HOME_BANNER";
export const DELETE_HOME_BANNER = "DELETE_HOME_BANNER";
export const FETCH_KV_BANNERS = "FETCH_KV_BANNERS";
export const FETCH_MAP_BANNERS = "FETCH_MAP_BANNERS";

//Fetching Bar Chart Data
export const fetchBannersData = (langCode) => {
	let resData;
	return async (dispatch) => {
		dispatch({
			type: HOME_BANNERS_LOADING,
		});
		try {
			await fetch(`${baseUrl.bannersApi}`, {
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": langCode,
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
									" - Can't fetch home banners"
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
						type: FETCH_HOME_BANNERS,
						data: resData,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: HOME_BANNERS_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Posting Banner Details
export const postBanner = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.postBannerApi}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
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
					if (data.result !== "Success") {
						throw new Error("Can't create banner");
					} else {
						dispatch({
							type: CREATE_HOME_BANNER,
							data: data.result,
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

//Updating Banner Details
export const updateBanner = (value, langCode) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.updateBannerApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": langCode,
				},
				body: JSON.stringify({
					...value,
					displayOrder: parseInt(value.displayOrder),
				}),
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
					if (data.result !== "Success") {
						throw new Error("Can't Update Banner");
					} else {
						dispatch({
							type: UPDATE_HOME_BANNER,
							data: data.result,
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

//deleting banner
export const deleteBanner = (bannerId) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.deleteBannerApi}?Id=${bannerId}`, {
				method: "DELETE",
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
						type: DELETE_HOME_BANNER,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: HOME_BANNERS_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Fetching KV Banners data
export const fetchKvBannersData = (langCode) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.kvBannersUrl}`, {
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": langCode,
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
									" - Can't fetch KV banners"
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
						type: FETCH_KV_BANNERS,
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

//Fetching Map Banners data
export const fetchMapBannersData = (langCode, banner) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.MapBannersUrl}?type=${banner}`, {
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": langCode,
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
									" - Can't fetch Map banners"
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
						type: FETCH_MAP_BANNERS,
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

/**
 * @param {*} handlename
 * @param {*} lang
 * Function to get product Id by product handle , here we are not using any action reducer anything
 * Just simple i am keeping this method which is doing APi call
 */
export const getProductByHandle = async (handlename, lang = "en") => {
	try {
		const response = await fetch(
			`${baseUrl.getProductByHandleName}?handleName=${handlename}`,
			{
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": lang,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Error in Get getProductByHandle Method");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
	}
};

/**
 * @param {*} productId
 * @param {*} lang
 * Function to get product DetaIsl by product Id , here we are not using any action reducer anything
 * Just simple i am keeping this method which is doing APi call
 */

export const getProductById = async (productId, lang = "en") => {
	try {
		const response = await fetch(
			`${baseUrl.getProductById}?productId=${productId}`,
			{
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					"user-language": lang,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Error in getProductById Method");
		}
		const data = await response.json();
		console.log("data in api", data);
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
	}
};
