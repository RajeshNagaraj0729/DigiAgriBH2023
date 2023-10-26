import {
  HOME_BANNERS_ERROR,
  HOME_BANNERS_LOADING,
  CREATE_HOME_BANNER,
  UPDATE_HOME_BANNER,
  FETCH_HOME_BANNERS,
  FETCH_MAP_BANNERS,
  FETCH_KV_BANNERS,
} from "../../../actions/Banners/HomeBanners/HomeBanners";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  createMsg: null,
  updateMsg: null,
  kvBanners: [],
  mapBanners: [],
};

const fetchHomeBanners = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_BANNERS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
      };
    case HOME_BANNERS_LOADING:
      return { ...state, isLoading: true };
    case HOME_BANNERS_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    case CREATE_HOME_BANNER:
      return { ...state, createMsg: action.data };
    case UPDATE_HOME_BANNER:
      return { ...state, updateMsg: action.data };
    case FETCH_KV_BANNERS:
      return { ...state, kvBanners: action.data };
    case FETCH_MAP_BANNERS:
      return { ...state, mapBanners: action.data };
    default:
      return state;
  }
};
export default fetchHomeBanners;
