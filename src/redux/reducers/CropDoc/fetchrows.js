import {
  FETCH_ROWS,
  LOADING,
  ERROR,
  UPDATE,
  CROP_DOC_UPLOAD,
} from "../../actions/CropDoc/fetchrows";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  result: "",
  filtered: false,
  notUpdatedData: false,
};

const fetchTotalResults = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROWS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
        filteredData: [],
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
        filtered: action.filtered,
        data: [],
        notUpdatedData: action.notUpdatedData,
      };
    case ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    case UPDATE:
      return { ...state, result: action.result, isLoading: false };
    case CROP_DOC_UPLOAD: {
      return {
        ...state,
        customVisionData: !action.refresh
          ? state.customVisionData?.concat(action.data)
          : [],
      };
    }
    default:
      return state;
  }
};
export default fetchTotalResults;
