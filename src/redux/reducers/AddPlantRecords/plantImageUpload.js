import * as types from "../../actions/AddPlantRecords/plantImageUpload";

const initialState = {
  diseaseImageUrl: null,
  cropImageUrl: null,
};

const plantImageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_CROP_IMAGE_DATA:
      return {
        ...state,
        cropImageUrl: action.data,
      };
    case types.UPLOAD_CROP_IMAGE_LOADING:
      return { ...state, cropImageUrl: null };
    case types.UPLOAD_DISEASE_IMAGE_DATA:
      return { ...state, diseaseImageUrl: action.data };
    case types.UPLOAD_DISEASE_IMAGE_LOADING:
      return { ...state, diseaseImageUrl: null };
    default:
      return state;
  }
};
export default plantImageUpload;
