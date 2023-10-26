import * as types from "../actions/storepage";

const initialState = {
  cropDocActivePage: 1,
  cropDocUsersActivePage: 1,
  totalUsersActivePage: 1,
  newUsersActivePage: 1,
  cropDocPageAmount: 10,
  cropDocUsersPageAmount: 10,
  totalUsersPageAmount: 10,
  newUsersPageAmount: 10,
};

const storePage = (state = initialState, action) => {
  switch (action.type) {
    case types.CROP_DOC:
      return {
        ...state,
        cropDocActivePage: action.activePage,
        cropDocPageAmount: action.pageAmount,
      };
    case types.CROP_DOC_USERS:
      return {
        ...state,
        cropDocUsersActivePage: action.activePage,
        cropDocUsersPageAmount: action.pageAmount,
      };
    case types.TOTAL_USERS:
      return {
        ...state,
        totalUsersActivePage: action.activePage,
        totalUsersPageAmount: action.pageAmount,
      };
    case types.NEW_USERS:
      return {
        ...state,
        newUsersActivePage: action.activePage,
        newUsersPageAmount: action.pageAmount,
      };
    default:
      return state;
  }
};

export default storePage;
