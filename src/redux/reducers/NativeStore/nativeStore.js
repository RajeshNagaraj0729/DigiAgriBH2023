import * as types from "../../actions/NativeStore/nativeStore";

const initialState = {
	nativeDynamicCollectionData: [],
	isLoading: false,
	errmsg: null,
	updateMsg: null,
	createMsg: null,
	deleteMsg: null,

	nativeHomeBannerdata: [],
	isLoading: false,
	errMsg: null,
	createMsg: null,
	updateMsg: null,
    deleteMsg:null,

	nativeHomeCategorydata: [],
	isLoading: false,
	errMsg: null,
	createMsg: null,
	updateMsg: null,
    deleteMsg:null,
};

const nativeStore = (state = initialState, action) => {
	switch (action.type) {
		case types.NATIVE_COLLECTION_DATA:
			return {
				...state,
				nativeDynamicCollectionData: action.data,
				isLoading: false,
				errmsg: null,
			};
		case types.NATIVE_COLLECTION_LOADING:
			return { ...state, isLoading: true };
		case types.NATIVE_COLLECTION_ERROR:
			return { ...state, errmsg: action.errmsg };
		case types.NATIVE_CREATE_COLLECTION:
			return { ...state, createMsg: action.data };
		case types.NATIVE_UPDATE_COLLECTION:
			return { ...state, updateMsg: action.data };
		case types.NATIVE_DELETE_COLLECTION:
			return { ...state, deleteMsg: action.data };


		case types.FETCH_NATIVE_HOME_BANNERS:
			return {
				...state,
				nativeHomeBannerdata: action.data,
				isLoading: false,
				errmsg: null,
			};
		case types.NATIVE_HOME_BANNERS_LOADING:
			return { ...state, isLoading: true };
		case types.NATIVE_HOME_BANNERS_ERROR:
			return { ...state, errmsg: action.errmsg };
		case types.NATIVE_CREATE_HOME_BANNER:
			return { ...state, createMsg: action.data };
		case types.NATIVE_DELETE_HOME_BANNER:
			return { ...state, deleteMsg: action.data };
		case types.NATIVE_UPDATE_HOME_BANNER:
			return { ...state, updateMsg: action.data };



		case types.FETCH_NATIVE_HOME_CATEGORIES:
			return {
				...state,
				nativeHomeCategorydata: action.data,
				isLoading: false,
				errmsg: null,
			};
		case types.NATIVE_HOME_CATEGORIES_LOADING:
			return { ...state, isLoading: true };
		case types.NATIVE_HOME_CATEGORIES_ERROR:
			return { ...state, errmsg: action.errmsg };
		case types.NATIVE_CREATE_HOME_CATEGORIES:
			return { ...state, createMsg: action.data };
		case types.NATIVE_DELETE_HOME_CATEGORIES:
			return { ...state, deleteMsg: action.data };
		case types.NATIVE_UPDATE_HOME_CATEGORIES:
			return { ...state, updateMsg: action.data };

		default:
			return state;
	}
};
export default nativeStore;
