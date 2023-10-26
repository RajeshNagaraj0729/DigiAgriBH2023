import {
  GET_DISEASES,
  GET_DISEASE_CAUSES,
} from "../../actions/AddDiseaseRecords/diseaseRecords";

const initialState = {
  diseases: [],
  diseaseCauses: [],
};

const diseaseRecords = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISEASES:
      return {
        ...state,
        diseases: action.data,
      };
    case GET_DISEASE_CAUSES:
      return {
        ...state,
        diseaseCauses: action.data,
      };

    default:
      return state;
  }
};
export default diseaseRecords;
