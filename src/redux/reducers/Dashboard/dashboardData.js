import * as Types from "../../actions/Dashboard/dashboardData";

const initialState = {
  newUsers: {
    data: [],
    errmsg: null,
    isLoading: false,
  },
  topUsers: {
    data: [],
    errmsg: null,
  },
  chartData: {
    data: [],
    errmsg: null,
  },
  stats: {
    data: null,
    errmsg: null,
  },
  totalCropDocCount: null,
  totalCropDocWithDiseaseCount: null,
  totalCropDocWithoutDiseaseCount: null,
  totalCropDocDayCount: null,
  totalCropDocError: null,
  currentVersionCount: null,
  postsCount: null,
  newUsersCount: null,
  cropDocUsersCount: null,
  cropDocAttendedCount: null,
  cropDocUnAttendedCount: null,
  currentVersionName: null,
  cropDocDayWiseFilterCount: null,
  c: null,
};

const dashboardData = (state = initialState, action) => {
  switch (action.type) {
    case Types.CHART_DATA:
      const chartData1 = Object.assign(state.chartData);
      chartData1.data = action.data;
      chartData1.errmsg = null;
      return { ...state, chartData: chartData1 };
    case Types.CHART_DATA_LOADING:
      const chartData2 = Object.assign(state.chartData);
      chartData2.data = [];
      chartData2.errmsg = null;
      return { ...state, chartData: chartData2 };
    case Types.CHART_DATA_ERROR:
      const chartData3 = Object.assign(state.chartData);
      chartData3.data = [];
      chartData3.errmsg = action.errmsg;
      return { ...state, chartData: chartData3 };

    case Types.STATS_DATA:
      const stats1 = Object.assign(state.stats);
      stats1.data = action.data;
      stats1.errmsg = null;
      return { ...state, stats: stats1 };
    case Types.STATS_LOADING:
      const stats2 = Object.assign(state.stats);
      stats2.data = null;
      stats2.errmsg = null;
      return { ...state, stats: stats2 };
    case Types.STATS_ERROR:
      const stats3 = Object.assign(state.stats);
      stats3.data = null;
      stats3.errmsg = action.errmsg;
      return { ...state, stats: stats3 };

    case Types.NEW_USERS_DATA:
      const newUsers1 = Object.assign(state.newUsers);
      newUsers1.data = action.data;
      newUsers1.errmsg = null;
      newUsers1.isLoading = false;
      return { ...state, newUsers: newUsers1 };
    case Types.NEW_USERS_LOADING:
      const newUsers2 = Object.assign(state.newUsers);
      newUsers2.data = null;
      newUsers2.errmsg = null;
      newUsers2.isLoading = true;
      return { ...state, newUsers: newUsers2 };
    case Types.NEW_USERS_ERROR:
      const newUsers3 = Object.assign(state.newUsers);
      newUsers3.data = [];
      newUsers3.errmsg = action.errmsg;
      newUsers3.isLoading = false;
      return { ...state, newUsers: newUsers3 };

    case Types.TOP_USERS_DATA:
      const topUsers1 = Object.assign(state.topUsers);
      topUsers1.data = action.data;
      topUsers1.errmsg = null;
      return { ...state, topUsers: topUsers1 };
    case Types.TOP_USERS_LOADING:
      const topUsers2 = Object.assign(state.topUsers);
      topUsers2.data = [];
      topUsers2.errmsg = null;
      return { ...state, topUsers: topUsers2 };
    case Types.TOP_USERS_ERROR:
      const topUsers3 = Object.assign(state.topUsers);
      topUsers3.data = [];
      topUsers3.errmsg = action.errmsg;
      return { ...state, topUsers: topUsers3 };

    case Types.TOTAL_CROP_DOC_COUNT:
      return { ...state, totalCropDocCount: action.data.count };
    case Types.TOTAL_CROP_DOC_COUNT_LOADING:
      return { ...state, totalCropDocCount: null };

    case Types.TOTAL_CROP_DOC_WITH_DISEASE_COUNT:
      return {
        ...state,
        totalCropDocWithDiseaseCount: action.data[0]
          ? action.data[0].withDisease
          : 0,
      };
    case Types.TOTAL_CROP_DOC_WITH_DISEASE_COUNT_LOADING:
      return {
        ...state,
        totalCropDocWithDiseaseCount: null,
      };

    case Types.TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT:
      return {
        ...state,
        totalCropDocWithoutDiseaseCount: action.data[0]
          ? action.data[0].withoutDisease
          : 0,
      };
    case Types.TOTAL_CROP_DOC_WITHOUT_DISEASE_COUNT_LOADING:
      return {
        ...state,
        totalCropDocWithoutDiseaseCount: null,
      };

    case Types.TOTAL_CROP_DOC_DAY_COUNT:
      return {
        ...state,
        totalCropDocDayCount: action.data[0] ? action.data[0].todaysUploads : 0,
      };
    case Types.TOTAL_CROP_DOC_DAY_COUNT_LOADING:
      return {
        ...state,
        totalCropDocDayCount: null,
      };
    case Types.TOTAL_CROP_DOC_COUNT_ERROR:
      return { ...state, totalCropDocError: action.errmsg };

    case Types.CURRENT_VERSION_COUNT_LOADING:
      return {
        ...state,
        currentVersionCount: null,
      };
    case Types.CURRENT_VERSION_COUNT_DATA:
      return {
        ...state,
        currentVersionCount: action.data,
      };

    case Types.POSTS_COUNT_LOADING:
      return {
        ...state,
        postsCount: null,
      };
    case Types.POSTS_COUNT_DATA:
      return {
        ...state,
        postsCount: action.data,
      };

    case Types.NEW_USERS_COUNT_LOADING:
      return {
        ...state,
        newUsersCount: null,
      };
    case Types.NEW_USERS_COUNT_DATA:
      return {
        ...state,
        newUsersCount: action.data,
      };

    case Types.CROPDOC_USERS_COUNT_LOADING:
      return {
        ...state,
        cropDocUsersCount: null,
      };
    case Types.CROPDOC_USERS_COUNT_DATA:
      return {
        ...state,
        cropDocUsersCount: action.data,
      };

    case Types.CROPDOC_ATTENDED_COUNT_LOADING:
      return {
        ...state,
        cropDocAttendedCount: null,
      };
    case Types.CROPDOC_ATTENDED_COUNT_DATA:
      return {
        ...state,
        cropDocAttendedCount: action.data,
      };

    case Types.CROPDOC_UNATTENDED_COUNT_LOADING:
      return {
        ...state,
        cropDocUnAttendedCount: null,
      };
    case Types.CROPDOC_UNATTENDED_COUNT_DATA:
      return {
        ...state,
        cropDocUnAttendedCount: action.data,
      };

    case Types.CURRENT_VERSION_NAME_LOADING:
      return {
        ...state,
        // currentVersionName: null,
      };
    case Types.CURRENT_VERSION_NAME_DATA:
      return {
        ...state,
        currentVersionName: action.data,
      };

    case Types.TOTAL_CROP_DOC_DAY_COUNT_FILTER:
      return {
        ...state,
        cropDocDayWiseFilterCount: action.data,
      };

    case Types.CROPDOC_TENSORFLOW_COUNT_LOADING:
      return {
        ...state,
        cropDocTensorflowCount: null,
      };
    case Types.CROPDOC_TENSORFLOW_COUNT_DATA:
      return {
        ...state,
        cropDocTensorflowCount: action.data,
      };

    default:
      return state;
  }
};

export default dashboardData;
