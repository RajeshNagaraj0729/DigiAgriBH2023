import * as types from "../../actions/ProductAds/productsAdsImageUpload";

const initialState = {
  productAdsImageUrl: [],
};

const adsImage = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_PRODUCT_ADS_IMAGE_LOADING:
      return {
        ...state,
        productAdsImageUrl: null,
      };
    case types.UPLOAD_PRODUCT_ADS_IMAGE_DATA:
      return { ...state, productAdsImageUrl: action.resData };

    default:
      return state;
  }
};
export default adsImage;
