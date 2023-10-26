import * as types from "../../actions/KisanSandesh/kisanSandeshImageUpload";

const initialState = {
  newsImageUrl: null,
  videoImageUrl: null,
  tipsImageUrl: null,
};

const kisanSandeshImageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_NEWS_IMAGE_LOADING:
      return {
        ...state,
        newsImageUrl: null,
      };
    case types.UPLOAD_NEWS_IMAGE_DATA:
      return { ...state, newsImageUrl: action.data };

    case types.UPLOAD_VIDEOS_IMAGE_LOADING:
      return {
        ...state,
        videosImageUrl: null,
      };
    case types.UPLOAD_VIDEOS_IMAGE_DATA:
      return { ...state, videoImageUrl: action.data };

    case types.UPLOAD_TIPS_IMAGE_LOADING:
      return {
        ...state,
        tipsImageUrl: null,
      };
    case types.UPLOAD_TIPS_IMAGE_DATA:
      return { ...state, tipsImageUrl: action.data };
    default:
      return state;
  }
};
export default kisanSandeshImageUpload;
