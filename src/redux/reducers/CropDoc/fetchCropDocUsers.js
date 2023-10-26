import {
  FETCH_CROPDOC_USERSDATA,
  CROPDOC_USERS_ERROR,
  CROPDOC_USERS_LOADING,
} from "../../actions/CropDoc/fetchCropDocUsers";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  searchValue: "",
};

const fetchCropDocUsers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CROPDOC_USERSDATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
        searchValue: action.search,
      };
    case CROPDOC_USERS_LOADING:
      return { ...state, isLoading: true };
    case CROPDOC_USERS_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    default:
      return state;
  }
};
export default fetchCropDocUsers;
