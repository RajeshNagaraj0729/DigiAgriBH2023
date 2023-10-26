import * as types from "../../actions/AddStageRecords/stageRecords";

const initialState = {
  stages: null,
  stagesError: null,
  stageTypes: null,
  stageTypesError: null,
  stageTasks: null,
  stageTasksError: null,
  stagesByCrop: [],
  tasksByStage: [],
  allTasksByStage: [],
};

const stageRecords = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STAGES:
      return {
        ...state,
        stages: action.data,
        stagesError: null,
      };
    case types.STAGES_ERROR:
      return { ...state, stagesError: action.errmsg, stages: null };
    case types.STAGE_TYPES_DATA:
      return {
        ...state,
        stageTypes: action.data,
        stageTypesError: null,
      };
    case types.STAGE_TYPES_ERROR:
      return { ...state, stageTypesError: action.errmsg, StageTypes: null };
    case types.GET_STAGES_BY_CROP:
      return { ...state, stagesByCrop: action.data };
    case types.GET_TASKS_BY_STAGE:
      return { ...state, tasksByStage: action.data };
    case types.GET_ALL_TASKS_BY_STAGE:
      return {
        ...state,
        allTasksByStage: action.refresh
          ? []
          : [...state.allTasksByStage, ...action.data],
      };
    case types.UPDATE_STAGE_DATA:
      return {
        ...state,
      };
    case types.UPDATE_STAGE_TASKS_DATA:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default stageRecords;
