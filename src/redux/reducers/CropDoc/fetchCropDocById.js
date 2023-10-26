import {
  FETCH_CROPDOC_BY_ID,
  CROPDOC_BY_ID_LOADING,
  CROPDOC_BY_ID_ERROR,
} from "../../actions/CropDoc/fetchCropDocById";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
};

const fetchCropDocById = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CROPDOC_BY_ID:
      return { ...state, data: action.data, isLoading: false, errmsg: null };
    case CROPDOC_BY_ID_LOADING:
      return { ...state, isLoading: true };
    case CROPDOC_BY_ID_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    default:
      return state;
  }
};
export default fetchCropDocById;
