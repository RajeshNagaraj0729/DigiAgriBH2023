import {
  COLLECTION_ERROR,
  COLLECTION_DATA,
  COLLECTION_LOADING,
  CREATE_COLLECTION,
  UPDATE_COLLECTION,
  DELETE_COLLECTION,
} from "../../actions/Collection/collection";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  updateMsg: null,
  createMsg: null,
  deleteMsg: null,
};

const fetchCollection = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_DATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
      };
    case COLLECTION_LOADING:
      return { ...state, isLoading: true };
    case COLLECTION_ERROR:
      return { ...state, isLoading: false, errmsg: action.errmsg };
    case CREATE_COLLECTION:
      return { ...state, createMsg: action.data };
    case UPDATE_COLLECTION:
      return { ...state, updateMsg: action.data };
    case DELETE_COLLECTION:
      return { ...state, deleteMsg: action.data };
    default:
      return state;
  }
};
export default fetchCollection;
