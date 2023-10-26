import * as types from "../../actions/DeepLink/deepLink";

const initialState = {
  cropCareDeeplinks: [],
  pestCareDeeplinks: [],
  diseaseDeeplinks: [],
  productDeeplinks: [],
  deepLinkStatus: "",
};

const deeplinks = (state = initialState, action) => {
  switch (action.type) {
    case types.CROP_CARE_DEEPLINKS:
      return { ...state, cropCareDeeplinks: action.data };
    case types.PEST_CARE_DEEPLINKS:
      return { ...state, pestCareDeeplinks: action.data };
    case types.DISEASE_DEEPLINKS:
      return { ...state, diseaseDeeplinks: action.data };
    case types.PRODUCT_DEEPLINKS:
      return { ...state, productDeeplinks: action.data };
    case types.CREATE_DEEPLINK:
      return { ...state, deepLinkStatus: action.data };

    default:
      return state;
  }
};
export default deeplinks;
