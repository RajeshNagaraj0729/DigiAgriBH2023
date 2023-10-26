import * as types from "../../actions/AddPlantRecords/addPlantRecords";

const initialState = {
  diseaseResult: null,
  diseaseError: null,
  diseaseCauseResult: null,
  diseaseCauseError: null,
  cropResult: null,
  cropError: null,
  allDiseasesData: [],
};

const addPlantRecords = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_DISEASE_RESULT:
      return {
        ...state,
        diseaseResult: action.data,
        diseaseError: null,
      };
    case types.CREATE_DISEASE_ERROR:
      return { ...state, diseaseError: action.errmsg, diseaseResult: null };

    case types.CREATE_CROP_RESULT:
      return {
        ...state,
        cropResult: action.data,
        cropError: null,
      };
    case types.CREATE_CROP_ERROR:
      return { ...state, cropError: action.errmsg, cropResult: null };

    case types.CREATE_DISEASE_CAUSE_RESULT:
      return {
        ...state,
        diseaseCauseResult: action.data,
        diseaseCauseError: null,
      };
    case types.CREATE_DISEASE_CAUSE_ERROR:
      return {
        ...state,
        diseaseCauseError: action.errmsg,
        diseaseCauseResult: null,
      };
    case types.GET_ALL_DISEASES:
      return {
        ...state,
        allDiseasesData: action.data,
      };
    default:
      return state;
  }
};
export default addPlantRecords;
