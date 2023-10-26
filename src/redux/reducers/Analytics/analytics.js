import * as types from "../../actions/Analytics/analytics";

const initialState = {
  getAnalyticsCrops: [],
  getAnalyticsStates: [],
  getAnalyticsDistricts: [],
  getAnalyticsDiseases: [],
  getAnalyticsresult: [],
  getAnalyticsCount: [],
  getAnalyticsDiseaseType: [],
  getAnalyticsCropType: [],
  getDiseaseAnalyticsResults: [],
  getCropsAnalyticsResults: [],
  getAnalyticsStageCount: [],
  prakshepAnalyticsCount: null,
  prakshepSyncedData: [],
  cropDocStatsCount: []
};

const analytics = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ANALYTICS_CROPS:
      return { ...state, getAnalyticsCrops: action.data };
    case types.GET_ANALYTICS_STATES:
      return { ...state, getAnalyticsStates: action.data };
    case types.GET_ANALYTICS_DISTRICTS:
      return { ...state, getAnalyticsDistricts: action.data };
    case types.GET_ANALYTICS_DISEASE:
      return { ...state, getAnalyticsDiseases: action.data };
    case types.GET_ANALYTICS_RESULTS:
      return { ...state, getAnalyticsresult: action.data };
    case types.GET_ANALYTICS_COUNT:
      return { ...state, getAnalyticsCount: action.data };
    case types.GET_ANALYTICS_DISEASE_TYPE:
      return { ...state, getAnalyticsDiseaseType: action.data };
    case types.GET_DISEASE_ANALYTICS_RESULTS:
      return { ...state, getDiseaseAnalyticsResults: action.data };
    case types.GET_CROPS_ANALYTICS_RESULTS:
      return { ...state, getCropsAnalyticsResults: action.data };
    case types.GET_ANALYTICS_CROP_TYPE:
      return { ...state, getAnalyticsCropType: action.data };
    case types.GET_ANALYTICS_STAGE_COUNT:
      return { ...state, getAnalyticsStageCount: action.data };
    case types.GET_PRAKSHEP_ANALYTICS_COUNT:
      return { ...state, prakshepAnalyticsCount: action.data };
    case types.GET_PRAKSHEP_SYNCED_DATA:
      return { ...state, prakshepSyncedData: action.data };
    case types.GET_CROP_DOC_DAILY_STATS:
      return { ...state, cropDocStatsCount: action.data };
    default:
      return state;
  }
};
export default analytics;
