import {
   CREATE_KV_BANNER,
   UPDATE_KV_BANNER,
   FETCH_KV_BANNERS,
   DELETE_KV_BANNER,
} from "../../../actions/Banners/KVBanners/KVBanners";

const initialState = {
   data: [],
};

const fetchKvBanners = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_KV_BANNERS:
         return {
            ...state,
            data: action.data,
         };
      case CREATE_KV_BANNER:
         return { ...state };
      case UPDATE_KV_BANNER:
         return { ...state };
      case DELETE_KV_BANNER:
         return { ...state };
      default:
         return state;
   }
};
export default fetchKvBanners;
