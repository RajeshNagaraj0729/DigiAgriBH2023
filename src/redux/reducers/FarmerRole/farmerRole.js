import * as types from "../../actions/FarmerRole/farmerRole";

const initialState = {
  createExecutiveData: {},
  getZonalData: [],
  getFeData: [],
  getVleData: [],
  updateExecutiveData: {},
  deleteExecutiveData: null,
  loginData: {},
  accessToken: null,
  farmersList: [],
};

const farmerRole = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ZONAL_DATA:
      return { ...state, createExecutiveData: action.data };
    case types.GET_ZONAL_DATA:
      return { ...state, getZonalData: action.data };
    case types.GET_FE_DATA:
      return { ...state, getFeData: action.data };
    case types.GET_VLE_DATA:
      return { ...state, getVleData: action.data };
    case types.UPDATE_EXECUTIVE_DATA:
      return { ...state, updateExecutiveData: action.data };
    case types.DELETE_EXECUTIVE_DATA:
      return { ...state, deleteExecutiveData: action.data };
    case types.GET_FARMERS_BY_VLE_ID:
      return { ...state, farmersList: action.data };
    case types.GET_LOGIN_DATA:
      return {
        ...state,
        loginData: action.resData,
        accessToken: action.resData.accessToken,
      };
    default:
      return state;
  }
};
export default farmerRole;
