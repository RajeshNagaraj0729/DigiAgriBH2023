/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

//constants for Collection
export const NATIVE_COLLECTION_LOADING = "NATIVE_COLLECTION_LOADING";
export const NATIVE_COLLECTION_ERROR = "NATIVE_COLLECTION_ERROR";
export const NATIVE_COLLECTION_DATA = "NATIVE_COLLECTION_DATA";
export const NATIVE_CREATE_COLLECTION = "NATIVE_CREATE_COLLECTION";
export const NATIVE_UPDATE_COLLECTION = "NATIVE_UPDATE_COLLECTION";
export const NATIVE_DELETE_COLLECTION = "NATIVE_DELETE_COLLECTION";


export const FETCH_NATIVE_HOME_BANNERS = "FETCH_NATIVE_HOME_BANNERS";
export const NATIVE_HOME_BANNERS_LOADING = "NATIVE_HOME_BANNERS_LOADING";
export const NATIVE_HOME_BANNERS_ERROR = "NATIVE_HOME_BANNERS_ERROR";
export const NATIVE_CREATE_HOME_BANNER = "NATIVE_CREATE_HOME_BANNER";
export const NATIVE_UPDATE_HOME_BANNER = "NATIVE_UPDATE_HOME_BANNER";
export const NATIVE_DELETE_HOME_BANNER = "NATIVE_DELETE_HOME_BANNER";

export const FETCH_NATIVE_HOME_CATEGORIES = "FETCH_NATIVE_HOME_CATEGORIES";
export const NATIVE_HOME_CATEGORIES_LOADING = "NATIVE_HOME_CATEGORIES_LOADING";
export const NATIVE_HOME_CATEGORIES_ERROR = "NATIVE_HOME_CATEGORIES_ERROR";
export const NATIVE_CREATE_HOME_CATEGORIES = "NATIVE_CREATE_HOME_CATEGORIES";
export const NATIVE_UPDATE_HOME_CATEGORIES = "NATIVE_UPDATE_HOME_CATEGORIES";
export const NATIVE_DELETE_HOME_CATEGORIES = "NATIVE_DELETE_HOME_CATEGORIES";

//Action MEthod for Dynamic Product Collection data
//Get Collection data
export const fetchNativeCollection = () => {
	return async (dispatch) => {
		dispatch({
			type: NATIVE_COLLECTION_LOADING,
		});
		try {
			await fetch(`${baseUrl.getNativeCollectionApi}`, {
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
									" - Can't fetch collection"
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
						type: NATIVE_COLLECTION_DATA,
						data: data,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_COLLECTION_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Create Collection
export const createCollection = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.createNativeCollectionApi}`, {
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
				.then((response) => response.json())
				.then((data) => {
					dispatch({
						type: NATIVE_CREATE_COLLECTION,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_COLLECTION_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//update Collection
export const updateCollection = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.updateNativeCollectionApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
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
					dispatch({
						type: NATIVE_UPDATE_COLLECTION,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_COLLECTION_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Delete Collection
export const deleteCollection = (Id) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.deleteNativeCollectionApi}?Id=${Id}`, {
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
						type: NATIVE_DELETE_COLLECTION,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_DELETE_COLLECTION,
				errmsg: err.message,
			});
		}
	};
};



//Action Method For Native Home Banner Data

//Fetching Native Home Banner Data
export const fetchNativeBannersData = (langCode,number,amount,type="home") => {
    let resData;
    return async (dispatch) => {
      dispatch({
        type: NATIVE_HOME_BANNERS_LOADING,
      });
      try {
        await fetch(`${baseUrl.fetchNativeBannerApi}?type=${type}&pagenum=${number}&pagesize=${amount}`, {
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
                    " - Can't fetch Native home banners"
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
              type: FETCH_NATIVE_HOME_BANNERS,
              data: resData,
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      } catch (err) {
        dispatch({
          type: NATIVE_HOME_BANNERS_ERROR,
          errmsg: err.message,
        });
      }
    };
  };
  
  //Posting Banner Details
  export const postNativeBanner = (value) => {
    return async (dispatch) => {
      try {
        await fetch(`${baseUrl.postNativeBannerApi}`, {
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
                type: NATIVE_CREATE_HOME_BANNER,
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
  export const updateNativeBanner = (value,langCode) => {
    return async (dispatch) => {
      try {
        await fetch(`${baseUrl.updateNativeBannerApi}`, {
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
                type: NATIVE_UPDATE_HOME_BANNER,
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
  export const deleteNativeBanner = (bannerId) => {
    return async (dispatch) => {
      try {
        await fetch(`${baseUrl.deleteNativeBannerApi}?Id=${bannerId}`, {
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
              type: NATIVE_DELETE_HOME_BANNER,
              data: data.result,
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      } catch (err) {
        dispatch({
          type: NATIVE_HOME_BANNERS_ERROR,
          errmsg: err.message,
        });
      }
    };
  };


  
//Action Method For Native Home Category

//Fetching Native Home Categories Data
export const fetchCategoryData = (number,amount,showIn="home") => {
	let resData;
	return async (dispatch) => {
		dispatch({
			type: NATIVE_HOME_CATEGORIES_LOADING,
		});
		try {
			await fetch(
				`${baseUrl.fetchnativeCategoryApi}?showIn=${showIn}&pageNum=${number}&pageSize=${amount}`,
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
									" - Can't fetch home categories"
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
						type: FETCH_NATIVE_HOME_CATEGORIES,
						data: resData,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_HOME_CATEGORIES_ERROR,
				errmsg: err.message,
			});
		}
	};
};

//Posting Category Details
export const postCategory = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.postNativeCategoryApi}`, {
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
						throw new Error("Can't create category");
					} else {
						dispatch({
							type: NATIVE_CREATE_HOME_CATEGORIES,
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

//Updating Category Details
export const updateCategory = (value) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.updateNativeCategoryApi}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
					//"user-language": langCode,
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
							type: NATIVE_UPDATE_HOME_CATEGORIES,
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

//deleting category
export const deleteCategory = (bannerId) => {
	return async (dispatch) => {
		try {
			await fetch(`${baseUrl.deleteNativeCategoryApi}?Id=${bannerId}`, {
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
						type: NATIVE_DELETE_HOME_CATEGORIES,
						data: data.result,
					});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		} catch (err) {
			dispatch({
				type: NATIVE_HOME_CATEGORIES_ERROR,
				errmsg: err.message,
			});
		}
	};
};
