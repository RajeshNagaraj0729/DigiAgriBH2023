import * as types from "../../actions/ProductAds/ads";

const initialState = {
  createProductAds: {},
  getProductAds: [],
  productAdsImageUrl: [],
  updateProductAds: {},
  deleteMsg: null,
};

const ads = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_PRODUCT_ADS:
      return { ...state, createProductAds: action.data };

    case types.GET_PRODUCT_ADS:
      return { ...state, getProductAds: action.data };

    case types.UPDATE_PRODUCT_ADS:
      return { ...state, updateProductAds: action.data };

    case types.DELETE_PRODUCT_ADS:
      return { ...state, deleteMsg: action.data };
    default:
      return state;
  }
};
export default ads;
