import * as types from "../../actions/KisanBazaar/category";

const initialState = {
  createCategory: {},
  createSubCategory: {},
  getCategory: [],
  getSubCategory: [],
  // categoryImageUrl: [],
  updateCategory: {},
  updateSubCategory: {},
  kisanBazaarAds: [],
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_CATEGORY:
      return { ...state, createCategory: action.data };
    case types.CREATE_SUB_CATEGORY:
      return { ...state, createSubCategory: action.data };
    case types.GET_CATEGORY:
      return { ...state, getCategory: action.data };
    case types.GET_SUB_CATEGORY:
      return { ...state, getSubCategory: action.data };
    // case types.UPLOAD_CATEGORY_IMAGE_LOADING:
    //   return {
    //     ...state,
    //     categoryImageUrl: null,
    //   };
    // case types.UPLOAD_CATEGORY_IMAGE_DATA:
    //   return { ...state, categoryImageUrl: action.data };

    case types.UPDATE_CATEGORY:
      return { ...state, updateCategory: action.data };

    case types.UPDATE_SUB_CATEGORY:
      return { ...state, updateSubCategory: action.data };

    case types.GET_ALL_ADS:
      return { ...state, kisanBazaarAds: action.data };

    default:
      return state;
  }
};
export default category;
