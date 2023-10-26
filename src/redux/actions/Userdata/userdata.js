import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";
export const USER_LOADING = "USER_LOADING";
export const USER_DATA = "USER_DATA";
export const USER_ERROR = "USER_ERROR";
export const UPDATE_USER = "UPDATE_USER";
export const USER_ROLES = "USER_ROLES";

export const fetchUserInfo = () => {
	return async (dispatch) => {
		dispatch({
			type: USER_LOADING,
		});
		try {
			await fetch(`${baseUrl.getUserDataApi}`, {
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
									" - Can't fetch userdata"
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
						type: USER_DATA,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: USER_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//CreateUserdata
export const createUser = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.createAdminUser}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...value,
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
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//update User
export const updateUser = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.updateAdminUser}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...value,
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
					dispatch({
						type: UPDATE_USER,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: USER_ERROR,
				errmsg: err.message,
			});
		}
	};
};

export const getUserRoles = () => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.getUserRoles}`, {
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
									" - Can't fetch User Roles"
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
						type: USER_ROLES,
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
