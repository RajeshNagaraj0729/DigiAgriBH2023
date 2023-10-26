/*
Custom Component Imports
 */
import * as baseUrl from "../../../url/baseUrl";
import * as constants from "../../../constants";

export const GET_LANGUAGES = "GET_LANGUAGES";
export const LANGUAGES_LOADING = "LANGUAGES_LOADING";

export const GET_NEWS = "GET_NEWS";
export const NEWS_LOADING = "NEWS_LOADING";
export const CREATE_NEWS = "CREATE_NEWS";
export const UPDATE_NEWS = "UPDATE_NEWS";
export const DELETE_NEWS = "DELETE_NEWS";

export const GET_VIDEOS = "GET_VIDEOS";
export const VIDEOS_LOADING = "VIDEOS_LOADING";
export const CREATE_VIDEOS = "CREATE_VIDEOS";
export const UPDATE_VIDEOS = "UPDATE_VIDEOS";
export const DELETE_VIDEOS = "DELETE_VIDEOS";

export const GET_TIPS = "GET_TIPS";
export const TIPS_LOADING = "TIPS_LOADING";
export const CREATE_TIPS = "CREATE_TIPS";
export const UPDATE_TIPS = "UPDATE_TIPS";
export const DELETE_TIPS = "DELETE_TIPS";

export const GET_NEWS_ICONS = "GET_NEWS_ICONS";
export const NEWS_ICONS_LOADING = "NEWS_ICONS_LOADING";
export const CREATE_NEWS_ICON = "CREATE_NEWS_ICON";
export const UPDATE_NEWS_ICON = "UPDATE_NEWS_ICON";

export const ALL_BLOGS = "ALL_BLOGS";

export const getLanguages = () => {
  return async (dispatch) => {
    dispatch({
      type: LANGUAGES_LOADING,
    });
    try {
      await fetch(`${baseUrl.languagesApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't fetch Languages"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_LANGUAGES,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      throw new Error(err.message);
    }
  };
};

export const getNews = (langCode) => {
  return async (dispatch) => {
    dispatch({
      type: NEWS_LOADING,
    });
    try {
      await fetch(`${baseUrl.getNewsApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": langCode,
        },
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
                " - Can't fetch News"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_NEWS,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_NEWS,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const createNews = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createNewsApi}`, {
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
                " - Can't Add News data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_NEWS,
              data: data.message,
            });
          } else {
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

export const updateNews = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateNewsApi}`, {
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
                " - Can't Update News"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_NEWS,
              data: data.message,
            });
          } else {
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

export const updateNewsPublish = (id, flag) => {
  return async () => {
    try {
      await fetch(`${baseUrl.updateNewsPublishApi}?Id=${id}&flag=${flag}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update News"
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

export const deleteNews = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteNewsApi}?Id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update News"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: DELETE_NEWS,
              data: data.message,
            });
          } else {
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

//Action methods for Videos

export const getVideos = (lang) => {
  return async (dispatch) => {
    dispatch({
      type: VIDEOS_LOADING,
    });
    try {
      await fetch(`${baseUrl.getVideosApi}?language=${lang}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't fetch Videos"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_VIDEOS,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_VIDEOS,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const createVideos = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createVideosApi}`, {
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
                " - Can't Add Videos data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_VIDEOS,
              data: data.message,
            });
          } else {
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

export const updateVideosPublish = (id, flag) => {
  return async () => {
    try {
      await fetch(`${baseUrl.updateVideosPublishApi}?Id=${id}&flag=${flag}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update Videos"
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

export const updateVideos = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateVideosApi}`, {
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
                " - Can't Update Videos"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_VIDEOS,
              data: data.message,
            });
          } else {
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

export const deleteVideos = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteVideosApi}?Id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update Videos"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: DELETE_VIDEOS,
              data: data.message,
            });
          } else {
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

//Action methods for Tips

export const getTips = (lang) => {
  return async (dispatch) => {
    dispatch({
      type: TIPS_LOADING,
    });
    try {
      await fetch(`${baseUrl.getTipsApi}?language=${lang}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't fetch Tips"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_TIPS,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_TIPS,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const createTips = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createTipsApi}`, {
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
                " - Can't Add Tips data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_TIPS,
              data: data.message,
            });
          } else {
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

export const updateTips = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateTipsApi}`, {
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
                " - Can't Update Tips"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_TIPS,
              data: data.message,
            });
          } else {
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

export const deleteTips = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.deleteTipsApi}?Id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update Tips"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: DELETE_TIPS,
              data: data.message,
            });
          } else {
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

export const updateTipsPublish = (id, flag) => {
  return async () => {
    try {
      await fetch(`${baseUrl.updateTipsPublishApi}?Id=${id}&flag=${flag}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
        },
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
                " - Can't Update News"
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

export const getNewsIcons = (langCode) => {
  return async (dispatch) => {
    dispatch({
      type: NEWS_ICONS_LOADING,
    });
    try {
      await fetch(`${baseUrl.getNewsIconsApi}`, {
        headers: {
          Authorization: `Bearer ${constants.userToken}`,
          "Content-Type": "application/json",
          "user-language": langCode,
        },
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
                " - Can't fetch NewsIcons"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: GET_NEWS_ICONS,
            data: data,
          });
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } catch (err) {
      dispatch({
        type: GET_NEWS_ICONS,
        data: [],
      });
      throw new Error(err.message);
    }
  };
};

export const createNewsIcons = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.createNewsIconsApi}`, {
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
                " - Can't Add NewsIcons data"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: CREATE_NEWS_ICON,
              data: data.message,
            });
          } else {
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

export const updateNewsIcon = (value) => {
  return async (dispatch) => {
    try {
      await fetch(`${baseUrl.updateNewsIconsApi}`, {
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
                " - Can't Update News Icon"
            );
            error.response = response;
            throw error;
          }
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Success") {
            dispatch({
              type: UPDATE_NEWS_ICON,
              data: data.message,
            });
          } else {
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

//Action Methods For Blogs
export const fetchBlogsApi = (pageNum, pageSize) => {
  return async (dispatch) => {
    try {
      await fetch(
        `${baseUrl.getBlogsApi}?pagenum=${pageNum}&pagesize=${pageSize}`,
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
                  " - Can't fetch blogs"
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
            type: ALL_BLOGS,
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
