import * as types from "../../actions/Notification/notification";

const initialState = {
  createAppNotification: {},
  getAppNotification: [],
  updateAppNotification: {},
  deleteAppNotification: null,

  createInAppCriteria: {},
  getInAppCriteria: [],
  updateInAppCriteria: {},
  deleteInAppCriteria: null,
  activityHistory: [],
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_APP_NOTIFICATION:
      return { ...state, createAppNotification: action.data };
    case types.GET_APP_NOTIFICATION:
      return { ...state, getAppNotification: action.data };
    case types.UPDATE_APP_NOTIFICATION:
      return { ...state, updateAppNotification: action.data };
    case types.DELETE_APP_NOTIFICATION:
      return { ...state, deleteAppNotification: action.data };
    case types.CREATE_IN_APP_CRITERIA:
      return { ...state, createInAppCriteria: action.data };
    case types.GET_IN_APP_CRITERIA:
      return { ...state, getInAppCriteria: action.data };
    case types.UPDATE_IN_APP_CRITERIA:
      return { ...state, updateInAppCriteria: action.data };
    case types.DELETE_IN_APP_CRITERIA:
      return { ...state, deleteInAppCriteria: action.data };
    case types.IN_APP_ACTIVITY_HISTORY:
      return { ...state, activityHistory: action.data };
    default:
      return state;
  }
};
export default notification;
