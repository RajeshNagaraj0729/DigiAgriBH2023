import {
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_LOADING,
  UPLOAD_FILE_DATA,
} from "../../actions/Banners/fileUpload";

const initialState = {
  data: null,
  isLoading: false,
  errmsg: null,
};

const fileUpload = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
      };
    case UPLOAD_FILE_LOADING:
      return { ...state, isLoading: true, data: null };
    case UPLOAD_FILE_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    default:
      return state;
  }
};
export default fileUpload;
