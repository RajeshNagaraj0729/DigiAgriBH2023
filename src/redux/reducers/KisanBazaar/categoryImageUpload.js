import * as types from "../../actions/KisanBazaar/categoryImageUpload";

const initialState = {
  categoryImageUrl: [],
};

const categoryImageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_CATEGORY_IMAGE_LOADING:
      return {
        ...state,
        categoryImageUrl: null,
      };
    case types.UPLOAD_CATEGORY_IMAGE_DATA:
      return { ...state, categoryImageUrl: action.data };

    default:
      return state;
  }
};
export default categoryImageUpload;
