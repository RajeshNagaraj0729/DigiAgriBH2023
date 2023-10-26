import {
  FETCH_FILTERED_USERSDATA,
  FETCH_USERSDATA,
  GET_DISTRICTS,
  GET_POSTCODES,
  GET_STATES,
  UPDATE_DEEP_LINK_DATA,
  USERS_ERROR,
  USERS_LOADING,
} from "../../actions/UsersData/fetchusersdata";

const initialState = {
  data: [],
  isLoading: false,
  errmsg: null,
  searchValue: "",
  startDate: "",
  endDate: "",
  filteredData: [],
  states: [],
  districts: [],
  postCodes: [],
  cropDeeplinking: [],
  pestDeeplinking: [],
  updatedDeeplinkingData: null,
};

const fetchUsersData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERSDATA:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        errmsg: null,
        searchValue: action.search,
        startDate: action.startDate,
        endDate: action.endDate,
        filteredData: [],
      };
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errmsg: null,
        searchValue: action.search,
        startDate: action.startDate,
        endDate: action.endDate,
      };
    case USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        errmsg: action.errmsg,
        data: [],
        filteredData: [],
      };
    case FETCH_FILTERED_USERSDATA:
      return {
        ...state,
        filteredData: action.data,
        isLoading: false,
        errmsg: null,
        searchValue: action.search,
        startDate: action.startDate,
        endDate: action.endDate,
      };
    case GET_STATES:
      return {
        ...state,
        states: action.data,
      };
    case UPDATE_DEEP_LINK_DATA:
      return {
        ...state,
        updatedDeeplinkingData: action.resData,
      };
    case GET_DISTRICTS:
      return {
        ...state,
        districts: action.data,
      };
    case GET_POSTCODES:
      return {
        ...state,
        postCodes: action.data,
      };
    default:
      return state;
  }
};
export default fetchUsersData;
