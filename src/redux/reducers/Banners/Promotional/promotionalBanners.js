import {
  PROMO_BANNERS_ERROR,
  PROMO_BANNERS_LOADING,
  PROMO_BANNERS_DATA,
  CREATE_PROMO_BANNER,
  UPDATE_PROMO_BANNER,
} from "../../../actions/Banners/Promotional/promotionalBanners";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  createMsg: null,
  updateMsg: null,
};

const fetchPromoBanners = (state = initialState, action) => {
  switch (action.type) {
    case PROMO_BANNERS_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
      };
    case PROMO_BANNERS_LOADING:
      return { ...state, isLoading: true };
    case PROMO_BANNERS_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    case CREATE_PROMO_BANNER:
      return { ...state, createMsg: action.data };
    case UPDATE_PROMO_BANNER:
      return { ...state, updateMsg: action.data };
    default:
      return state;
  }
};
export default fetchPromoBanners;
