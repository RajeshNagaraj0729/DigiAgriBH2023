import moment from "moment-timezone";
import axios from "axios";
import {
	localToUTCStartDate,
	localToUTCEndDate,
} from "../../../Utils/dataUtils";
/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const KV_POSTS_LOADING = "KV_POSTS_LOADING";
export const KV_POSTS_DATA = "KV_POSTS_DATA";

export const KV_POSTS_COUNT = "KV_POSTS_COUNT";
export const COMMENTS_DATA = "COMMENTS_DATA";
export const USER_DATA_BY_MOBILE = "USER_DATA_BY_MOBILE";
export const USER_TAGS_DATA = "USER_TAGS_DATA";
export const DISEASE_TAGS_DATA = "DISEASE_TAGS_DATA";
export const GET_TRAINING_POSTS = "GET_TRAINING_POSTS";
export const KV_POSTS_COUNT_DATA = "KV_POSTS_COUNT_DATA";
export const KV_RESULT_UPDATE = "KV_RESULT_UPDATE";
export const KV_ALL_POSTS = "KV_ALL_POSTS";

// export const FETCH_ROWS = "FETCH_ROWS";
// export const LOADING = "LOADING";
// export const ERROR = "ERROR";

//Fetching KV Posts Data
export const fetchKVPosts = (
	pagenum,
	pagesize,
	search,
	from,
	to,
	crop,
	replyCountFilter
) => {
	let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
	let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
	let replyFilterCount =
		replyCountFilter?.value === undefined ? "" : replyCountFilter?.value;
	return async (dispatch) => {
		dispatch({
			type: KV_POSTS_LOADING,
		});
		try {
			await fetch(
				`${
					baseUrl.getKisanVedikaPosts
				}?pagenum=${pagenum}&pagesize=${pagesize}&searchCriteria=${search}&fromDate=${fromDate}&toDate=${toDate}&cropId=${crop}&isFiltered=${
					search || (from && to) || crop ? true : false
				}&replyFilterRequired=${replyFilterCount}`,
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
									" - Can't fetch KV Posts"
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
						type: KV_POSTS_DATA,
						data: data,
						isFiltered: search || (from && to) || crop ? true : false,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: KV_POSTS_DATA,
				data: [],
				isFiltered: true,
			});
			throw new Error(err.message);
		}
	};
};

//Kisan Vedika Total Posts count
export const fetchKVPostsCount = () => {
	return async (dispatch) => {
		dispatch({
			type: KV_POSTS_COUNT,
			data: null,
		});
		try {
			await fetch(`${baseUrl.kisanVedikaPostsCount}`, {
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
									" - Can't fetch KV Posts Count"
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
						type: KV_POSTS_COUNT,
						data: data.count,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: KV_POSTS_COUNT,
				data: "Err",
			});
			throw new Error(err.message);
		}
	};
};

//Kisan Vedika Posts Comments
export const fetchCommentsByPostId = (postId) => {
	return async (dispatch) => {
		dispatch({
			type: COMMENTS_DATA,
			data: null,
		});
		try {
			await fetch(`${baseUrl.getCommentsByPostId}?postId=${postId}`, {
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
									" - Can't fetch Comments"
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
						type: COMMENTS_DATA,
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

//Get User By Mobile Number
export const fetchUserByMobileNo = (mobileno) => {
	return async (dispatch) => {
		dispatch({
			type: USER_DATA_BY_MOBILE,
			data: null,
		});
		try {
			await fetch(`${baseUrl.getUserByMobileNo}?mobile=${mobileno}`, {
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
									" - Can't fetch Userdata"
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
						type: USER_DATA_BY_MOBILE,
						data: data,
					});
					if (data.id === null) {
						throw new Error("Invalid Login");
					} else {
						localStorage.setItem(
							"user",
							JSON.stringify({
								id: data.id,
								username: data.firstName + " " + data.lastName,
								pp: data.profilePic,
								phone: data.phone,
							})
						);
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

//Create comment for post
export const createComment = (value) => {
	return async () => {
		try {
			await fetch(`${baseUrl.postCommentApi}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
			})
				.then((response) => {
					if (response.ok) {
						return response;
					} else {
						var error = new Error(
							"Error " +
								response.status +
								": " +
								response.statusText +
								" - Can't Add Comment"
						);
						error.response = response;
						throw error;
					}
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.result !== "Success") {
						throw new Error(data.message);
					}
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//Update comment for post
export const updateComment = (value) => {
	return async () => {
		try {
			await fetch(`${baseUrl.updateCommentApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
			})
				.then((response) => {
					if (response.ok) {
						return response;
					} else {
						var error = new Error(
							"Error " +
								response.status +
								": " +
								response.statusText +
								" - Can't Update Comment"
						);
						error.response = response;
						throw error;
					}
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.result !== "Success") {
						throw new Error(data.message);
					}
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//Delete comment for post
export const deleteComment = (value) => {
	return async () => {
		try {
			await fetch(`${baseUrl.deleteCommentApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
			})
				.then((response) => {
					if (response.ok) {
						return response;
					} else {
						var error = new Error(
							"Error " +
								response.status +
								": " +
								response.statusText +
								" - Can't Delete Comment"
						);
						error.response = response;
						throw error;
					}
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.result !== "Success") {
						throw new Error(data.message);
					}
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//Current Day kisan vedika posts count
export const getCurrentDayPostCount = (from, to) => {
	let fromDate = from ? localToUTCStartDate(from) : localToUTCStartDate();
	let toDate = to ? localToUTCEndDate(to) : localToUTCEndDate();
	return async (dispatch) => {
		dispatch({
			type: KV_POSTS_COUNT_DATA,
			data: null,
		});
		try {
			await fetch(
				`${
					baseUrl.postsCountApi
				}?fromDate=${fromDate}&toDate=${toDate}&isFilter=${
					from || to ? true : false
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
								"Error " +
									response.status +
									": " +
									response.statusText +
									" - Posts Count Error"
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
						type: KV_POSTS_COUNT_DATA,
						data: data.length > 0 ? data[0].todaysUploads : 0,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: KV_POSTS_COUNT_DATA,
				data: "Err",
			});
		}
	};
};

//Delete KV post
export const deletePost = (value) => {
	return async () => {
		try {
			await fetch(`${baseUrl.deletePostApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(value),
			})
				.then((response) => {
					if (response.ok) {
						return response;
					} else {
						var error = new Error(
							"Error " +
								response.status +
								": " +
								response.statusText +
								" - Can't Delete Post"
						);
						error.response = response;
						throw error;
					}
				})
				.then((response) => response.json())
				.then((data) => {
					if (data.result !== "Success") {
						throw new Error(data.message);
					}
				})
				.catch((err) => {
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
};

//Kisan Vedika disease tags for a post
export const fetchDiseaseTagsByPostId = (postId, lang) => {
	return async (dispatch) => {
		dispatch({
			type: DISEASE_TAGS_DATA,
			data: [],
		});
		try {
			await fetch(
				`${baseUrl.getPostDiseaseTagsUrl}?postId=${postId}&api-version=2.0`,
				{
					headers: {
						Authorization: `Bearer ${constants.userToken}`,
						"Content-Type": "application/json",
						"user-language": lang,
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
									" - Can't fetch KV Post Disease tags"
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
						type: DISEASE_TAGS_DATA,
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

//Kisan Vedika user tags for a post
export const fetchUserTagsByPostId = (postId, lang) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: USER_TAGS_DATA,
				data: [],
			});
			await fetch(
				`${baseUrl.getPostUserTagsUrl}?postId=${postId}&api-version=2.0`,
				{
					headers: {
						Authorization: `Bearer ${constants.userToken}`,
						"Content-Type": "application/json",
						"user-language": lang,
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
									" - Can't fetch KV Post User Tags"
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
						type: USER_TAGS_DATA,
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

export const fetchKvTrainingPosts = (
	pagenum,
	pagesize,
	fromDate,
	toDate,
	searchValue,
	isTrained
) => {
	return async (dispatch) => {
		let url = `${baseUrl.kvResultsDataFilterApi}?pageNum=${pagenum}&pageSize=${pagesize}`;

		if (!!fromDate) {
			url = url + `&fromDate=${fromDate}`;
		}

		if (!!toDate) {
			url = url + `&toDate=${toDate}`;
		}

		if (!!searchValue) {
			url = url + `&searchCriteria=${searchValue}`;
		}

		if (!!isTrained) {
			url = url + `&isTrained=${isTrained}`;
		}

		if (!!fromDate || !!toDate || !!searchValue) {
			url = url + `&isFilter=true`;
		} else {
			url = url + `&isFilter=false`;
		}

		try {
			await fetch(url, {
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
									" - Can't fetch kv training posts"
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
						type: GET_TRAINING_POSTS,
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

export const changeKVResultDiseaseName = (editDisease) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.editKvResultApi}`, {
				method: "POST",
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
						type: KV_RESULT_UPDATE,
						result: data.result,
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

export const fetchKisanVedikaAllPostsApi = (pageNum, pageSize) => {
	return async (dispatch) => {
		try {
			await fetch(
				`${baseUrl.getAllPostsUrl}?pagesize=${pageSize}&pagenum=${pageNum}`,
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
									" - Can't fetch posts"
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
						type: KV_ALL_POSTS,
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

//Fetching KV Posts Data - for Excel
export const fetchKVPostsForExcelData = async (
	fromDate,
	toDate,
	crop,
	replyCountFilter,
	searchValue,
	pagesAmount,
	activePage = 1
) => {
	let replyFilterCount =
		replyCountFilter?.value === undefined ? "" : replyCountFilter?.value;
	try {
		let response = await axios.get(
			`${
				baseUrl.getKisanVedikaPosts
			}?pagenum=${activePage}&pagesize=${pagesAmount}&fromDate=${fromDate}&toDate=${toDate}&cropId=${crop}&isFiltered=${
				(fromDate && toDate) || crop ? true : false
			} &searchCriteria=${
				searchValue || ""
			}&replyFilterRequired=${replyFilterCount}
			`,
			{
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
			}
		);
		console.error("response in fetchKVPostsForExcelData", response);
		return response?.data;
	} catch (error) {
		console.error("Error in fetchRowsForExcel ===", error);
		return "Error";
	}
};
