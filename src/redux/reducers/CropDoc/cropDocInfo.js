import {
  CROP_DOC_INFO_ERROR,
  CROPS_DATA,
  DISEASES_DATA,
  TOP_DISEASES_DATA,
  BIO_PRODUCTS_DATA,
  CHEM_PRODUCTS_DATA,
} from "../../actions/CropDoc/cropDocInfo";

const initialState = {
  crops: [],
  diseases: [],
  topDiseases: [],
  errmsg: null,
  chemProducts: [],
  bioProducts: [],
};

const cropDocInfo = (state = initialState, action) => {
  switch (action.type) {
    case CROPS_DATA:
      return { ...state, crops: action.data, errmsg: null };
    case DISEASES_DATA:
      return { ...state, diseases: action.data, errmsg: null };
    case TOP_DISEASES_DATA:
      return { ...state, topDiseases: action.data, errmsg: null };
    case CROP_DOC_INFO_ERROR:
      return { ...state, errmsg: action.errmsg };
    case BIO_PRODUCTS_DATA:
      return { ...state, bioProducts: action.data };
    case CHEM_PRODUCTS_DATA:
      return {
        ...state,
        chemProducts: action.data,
      };
    default:
      return state;
  }
};

export default cropDocInfo;
