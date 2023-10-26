import * as types from "../../actions/AddStageRecords/stageImageUpload";

const initialState = {
  stageImageUrl: null,
  stageTypeImageUrl: null,
  stageTaskImageUrl: null,
};

const stageImageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_STAGE_IMAGE_DATA:
      return {
        ...state,
        stageImageUrl: action.data,
      };
    case types.UPLOAD_STAGE_IMAGE_LOADING:
      return { ...state, stageImageUrl: null };
    case types.UPLOAD_STAGETYPE_IMAGE_DATA:
      return { ...state, stageTypeImageUrl: action.data };
    case types.UPLOAD_STAGETYPE_IMAGE_LOADING:
      return { ...state, stageTypeImageUrl: null };
    case types.UPLOAD_STAGETASK_IMAGE_DATA:
      return { ...state, stageTaskImageUrl: action.data };
    case types.UPLOAD_STAGETASK_IMAGE_LOADING:
      return { ...state, stageTaskImageUrl: null };
    default:
      return state;
  }
};
export default stageImageUpload;
