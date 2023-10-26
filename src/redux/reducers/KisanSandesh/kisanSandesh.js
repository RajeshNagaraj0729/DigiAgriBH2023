import * as types from "../../actions/KisanSandesh/kisanSandesh";

const initialState = {
  languagesData: [],

  newsData: [],
  updateNewsMsg: null,
  deleteNewsMsg: null,
  createNewsMsg: null,
  newsLoading: false,

  videosData: [],
  updateVideosMsg: null,
  deleteVideosMsg: null,
  createVideosMsg: null,
  videosLoading: false,

  tipsData: [],
  updateTipsMsg: null,
  deleteTipsMsg: null,
  createTipsMsg: null,
  tipsLoading: false,

  newsIconsLoading: false,
  newsIcons: [],
  createNewsIconMsg: false,

  allBlogs:[]
};

const kisanSandesh = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LANGUAGES:
      return {
        ...state,
        languagesData: action.data,
      };

    case types.NEWS_LOADING:
      return {
        ...state,
        newsData: [],
        newsLoading: true,
      };
    case types.GET_NEWS:
      return {
        ...state,
        newsData: action.data,
        newsLoading: false,
      };
    case types.CREATE_NEWS:
      return { ...state, createNewsMsg: action.data };
    case types.UPDATE_NEWS:
      return { ...state, updateNewsMsg: action.data };
    case types.DELETE_NEWS:
      return { ...state, deleteNewsMsg: action.data };

    case types.NEWS_ICONS_LOADING:
      return {
        ...state,
        newsIcons: [],
        newsIconsLoading: true,
      };
    case types.GET_NEWS_ICONS:
      return {
        ...state,
        newsIcons: action.data,
        newsIconsLoading: false,
      };
    case types.CREATE_NEWS_ICON:
      return { ...state, createNewsIconMsg: action.data };

    case types.VIDEOS_LOADING:
      return {
        ...state,
        videosData: [],
        videosLoading: true,
      };
    case types.GET_VIDEOS:
      return {
        ...state,
        videosData: action.data,
        videosLoading: false,
      };
    case types.CREATE_VIDEOS:
      return { ...state, createVideosMsg: action.data };
    case types.UPDATE_VIDEOS:
      return { ...state, updateVideosMsg: action.data };
    case types.DELETE_VIDEOS:
      return { ...state, deleteVideosMsg: action.data };

    case types.TIPS_LOADING:
      return {
        ...state,
        tipsData: [],
        tipsLoading: true,
      };
    case types.GET_TIPS:
      return {
        ...state,
        tipsData: action.data,
        tipsLoading: false,
      };
    case types.CREATE_TIPS:
      return { ...state, createTipsMsg: action.data };
    case types.UPDATE_TIPS:
      return { ...state, updateTipsMsg: action.data };
    case types.DELETE_TIPS:
      return { ...state, deleteTipsMsg: action.data };

    case types.ALL_BLOGS:
      return { ...state, allBlogs:action.data};

    default:
      return state;
  }
};
export default kisanSandesh;
