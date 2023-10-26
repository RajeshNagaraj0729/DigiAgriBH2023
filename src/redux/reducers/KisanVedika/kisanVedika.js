import * as Types from "../../actions/KisanVedika/kisanVedika";
const initialState = {
  postsData: [],
  isLoading: false,
  isFiltered: false,
  kvPostsCount: null,
  postComments: null,
  kvTodayPostsCount: null,
  diseaseTags: null,
  userTags: null,
  kvTrainingPost: [],
  result: "",
  allPosts: [],
  // data: [],
  // isLoading: false,
  // errmsg: null,
  // filtered: false,
  // notUpdatedData: false,
};

const kisanVedika = (state = initialState, action) => {
  switch (action.type) {
    case Types.KV_POSTS_DATA:
      return {
        ...state,
        postsData: action.data,
        isLoading: false,
        isFiltered: action.isFiltered,
      };
    case Types.KV_POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case Types.KV_POSTS_COUNT:
      return {
        ...state,
        kvPostsCount: action.data,
      };
    case Types.COMMENTS_DATA:
      return {
        ...state,
        postComments: action.data,
      };
    case Types.USER_DATA_BY_MOBILE:
      return {
        ...state,
        loggedInUser: action.data,
      };
    case Types.KV_POSTS_COUNT_DATA:
      return {
        ...state,
        kvTodayPostsCount: action.data,
      };
    case Types.DISEASE_TAGS_DATA:
      return {
        ...state,
        diseaseTags: action.data,
      };
    case Types.USER_TAGS_DATA:
      return {
        ...state,
        userTags: action.data,
      };
    case Types.GET_TRAINING_POSTS:
      return {
        ...state,
        kvTrainingPost: action.data,
      };

    case Types.KV_RESULT_UPDATE:
      return { ...state, result: action.result };

    case Types.KV_ALL_POSTS:
      return {
        ...state,
        allPosts: action.data,
      };

    // case Types.FETCH_ROWS:
    //   return {
    //     ...state,
    //     data: action.data,
    //     isLoading: false,
    //     errmsg: null,
    //     filteredData: [],
    //   };
    // case Types.LOADING:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     filtered: action.filtered,
    //     data: [],
    //     notUpdatedData: action.notUpdatedData,
    //   };
    // case Types.ERROR:
    //   return { ...state, isLoading: false, errmsg: action.errmsg };
    default:
      return state;
  }
};
export default kisanVedika;
