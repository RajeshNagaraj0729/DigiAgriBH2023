import * as Types from "../../actions/Mandis/mandiPrices";

const initialState = {
  mandiPrices: [],
  mandiCreatedAt: null,
  mandiPlants: [],
  lastUploadedDate: null,
};

const mandiPrices = (state = initialState, action) => {
  switch (action.type) {
    case Types.MANDI_PRICES_DATA:
      return {
        ...state,
        mandiPrices: action.data,
        mandiCreatedAt: action.createdAt,
      };

    case Types.MANDI_PLANTS:
      return {
        ...state,
        mandiPlants: action.data,
      };

    case Types.LAST_UPLOADED_DATE:
      return {
        ...state,
        lastUploadedDate: action.data,
      };

    default:
      return state;
  }
};

export default mandiPrices;
