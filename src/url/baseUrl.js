/* API base Url for Dev */
export const baseUrl = process.env.REACT_APP_PUBLIC_URL;

//Dashboard API
export const topUsersApi =
	baseUrl + "dashboard/api/dashboard/get-top-users-cropdoc-results";
export const chartDataApi = baseUrl + "dashboard/api/dashboard/get-chart-data";
export const statsApi = baseUrl + "dashboard/api/dashboard/get-users-stats";
export const newUsersApi =
	baseUrl + "dashboard/api/dashboard/get-recent-login-users";
export const getCurrentVersionUsersCount =
	baseUrl + "dashboard/api/dashboard/get-current-version-users-count";
export const postsCountApi =
	baseUrl + "dashboard/api/dashboard/get-current-day-posts-count";
export const newUsersCountApi =
	baseUrl + "dashboard/api/dashboard/get-new-users-count";
export const cropDocUsersCountApi =
	baseUrl + "dashboard/api/dashboard/get-users-crop-doc-count";
export const cropDocAttendedCountApi =
	baseUrl + "dashboard/api/dashboard/get-with-updated-count";
export const cropDocUnAttendedCountApi =
	baseUrl + "dashboard/api/dashboard/get-with-out-updated-count";
export const getCurrentVersionNameApi =
	baseUrl + "dashboard/api/dashboard/get-current-version";
export const getCropDocTensorflowCountUrl =
	baseUrl + "dashboard/api/dashboard/get-tf-count";
export const loginBHAdminUser =
	baseUrl + "dashboard/api/BHAdminUser/bhadmin-user-login";
export const requestforOtp =
	baseUrl + "dashboard/api/BHAdminUser/send-forgot-password-code";
export const resetPassWord =
	baseUrl + "dashboard/api/BHAdminUser/reset-password";
export const sendKVOtp =
	baseUrl + "dashboard/api/BHAdminUser/kisan-vedika-login";
export const verifyKVLogin =
	baseUrl + "dashboard/api/BHAdminUser/kisan-vedika-verify-otp";

//UserData API
export const usersDataApi = baseUrl + "dashboard/api/dashboard/get-users-data";
export const userDataByDateApi =
	baseUrl + "dashboard/api/dashboard/get-users-data-by-date";
export const getStatesApi = baseUrl + "dashboard/api/dashboard/get-states";
export const getDistrictsApi =
	baseUrl + "dashboard/api/dashboard/get-districts";
export const getPostCodesApi =
	baseUrl + "dashboard/api/dashboard/get-post-codes";

// Crop Doc Total Results
export const totalResultsUrl =
	baseUrl + "dashboard/api/dashboard/get-cropdoctor-results";
export const topDiseasesApi =
	baseUrl + "dashboard/api/dashboard/get-top-diseases-results";
export const editDiseaseApi =
	baseUrl + "dashboard/api/dashboard/update-cropdoc-disease";
export const cropDocById =
	baseUrl + "dashboard/api/dashboard/get-cropdoctor-by-Id";
export const cropDocDataFilterApi =
	baseUrl + "dashboard/api/dashboard/get-crop-doc-data-by-criteria";
export const kvResultsDataFilterApi =
	baseUrl + "dashboard/api/dashboard/get-trainings-kvposts";
export const editKvResultApi =
	baseUrl + "dashboard/api/dashboard/create-kv-training";
export const getDiseasesApi =
	baseUrl + "crop/api/diseasecause/get-disease-causes";
export const getCropsApi =
	baseUrl + "dashboard/api/dashboard/get-crop-doc-crops";
export const getTotalCropDocCount =
	baseUrl + "dashboard/api/dashboard/get-total-cropdoc-count";
export const getTotalCropDocWithDiseaseCount =
	baseUrl + "dashboard/api/dashboard/get-total-cropdoc-with-disease-count";
export const getTotalCropDocWithoutDiseaseCount =
	baseUrl + "dashboard/api/dashboard/get-total-cropdoc-without-disease-count";
export const getTotalCropDocDayCount =
	baseUrl + "dashboard/api/dashboard/get-total-cropdoc-day-count";
export const getProductByDiseaseId =
	baseUrl + "crop/api/disease/get-products-by-diseaseId";
export const diagnoseCropUrl =
	baseUrl + "dashboard/api/dashboard/diagnose-crop-test";

//User wise crop doc
export const userApi =
	baseUrl + "dashboard/api/dashboard/get-user-by-cropdoctor-results";

//Shopify Banner API
export const postBannerApi = baseUrl + "dashboard/api/banners/create-banner";
export const bannersApi = baseUrl + "dashboard/api/banners/get-banners";
export const updateBannerApi = baseUrl + "dashboard/api/banners/update-banner";
export const deleteBannerApi = baseUrl + "dashboard/api/banners/delete-banner";
export const updateBannerOrderApi =
	baseUrl + "dashboard/api/banners/update-banner-order";
export const uploadFileApi = baseUrl + "stream/api/image/upload-small-file";
export const kvBannersUrl = baseUrl + "dashboard/api/banners/get-kv-banners";
export const MapBannersUrl =
	baseUrl + "dashboard/api/dashboard/get-banners-by-type";
export const uploadContainerImageApi =
	baseUrl + "dashboard/api/dashboard/upload-image";

//Promotional Banner API
export const getPromoBannersApi =
	baseUrl + "dashboard/api/banners/get-promotional-banners";
export const createPromoBannerApi =
	baseUrl + "dashboard/api/banners/create-promotional-banner";
export const updatePromoBannerApi =
	baseUrl + "dashboard/api/banners/update-promotional-banner";

//Collection API
export const getCollectionApi =
	baseUrl + "crop/api/products/get-collections-details";
export const createCollectionApi =
	baseUrl + "dashboard/api/banners/create-product-collections";
export const updateCollectionApi =
	baseUrl + "dashboard/api/banners/update-product-collection";
export const deleteCollectionApi =
	baseUrl + "dashboard/api/banners/delete-product-collection";

//Native Dynamic Collection API
export const getNativeCollectionApi =
	baseUrl +
	"dashboard/api/NativeDynamicProductCollection/get-product-collection";
export const createNativeCollectionApi =
	baseUrl +
	"dashboard/api/NativeDynamicProductCollection/create-product-collection";
export const updateNativeCollectionApi =
	baseUrl +
	"dashboard/api/NativeDynamicProductCollection/update-product-collection";
export const deleteNativeCollectionApi =
	baseUrl +
	"dashboard/api/NativeDynamicProductCollection/delete-product-collection";

//Native Home Category API
export const fetchnativeCategoryApi =
	baseUrl + "dashboard/api/nativecategory/get-categories";
export const postNativeCategoryApi =
	baseUrl + "dashboard/api/nativecategory/create-category";
export const updateNativeCategoryApi =
	baseUrl + "dashboard/api/nativecategory/update-category";
export const deleteNativeCategoryApi =
	baseUrl + "dashboard/api/nativecategory/delete-category";

//Native Home Banner API
export const fetchNativeBannerApi =
	baseUrl + "dashboard/api/NativeBanners/get-banners";
export const postNativeBannerApi =
	baseUrl + "dashboard/api/NativeBanners/create-banner";
export const updateNativeBannerApi =
	baseUrl + "dashboard/api/NativeBanners/update-banner";
export const deleteNativeBannerApi =
	baseUrl + "dashboard/api/NativeBanners/delete-banner";

//Posting Plant details
export const addDiseaseCauseApi =
	baseUrl + "dashboard/api/dashboard/create-disease-cause";
export const addDiseaseApi = baseUrl + "crop/api/disease/create-disease-excel";
export const addCropApi = baseUrl + "crop/api/plant/create-plant";
export const uploadCropImageApi = baseUrl + "crop/api/plant/upload-plant-image";
export const uploadDiseaseImageApi =
	baseUrl + "crop/api/disease/upload-disease-image";
export const getDiseaseCausesListUrl =
	baseUrl + "dashboard/api/dashboard/get-diseasescauses";
export const getDiseasesListUrl =
	baseUrl + "dashboard/api/dashboard/get-diseases";
export const updateDiseaseUrl =
	baseUrl + "dashboard/api/dashboard/update-disease";
export const updateDiseaseCauseUrl =
	baseUrl + "dashboard/api/dashboard/update-diseasecause";

//Stages API
export const getStagesApi = baseUrl + "crop/api/stage/get-stages";
export const getStageTasksApi = baseUrl + "crop/api/stagetask/get-stage-tasks";
export const getStageTypesApi = baseUrl + "crop/api/stagetypes/get-stage-types";
export const postStagesApi = baseUrl + "crop/api/stage/create-stage";
export const postStageTypeApi =
	baseUrl + "crop/api/stagetypes/create-stage-type";
export const postStageTaskApi =
	baseUrl + "crop/api/stagetask/create-stage-task";
export const uploadStageImageApi = baseUrl + "";
export const uploadStageTypeImageApi =
	baseUrl + "crop/api/stagetypes/upload-stagetype-image";
export const uploadStageTaskImageApi =
	baseUrl + "crop/api/stagetask/upload-stagetask-image";
export const getStagesByCrop = baseUrl + "dashboard/api/dashboard/get-stages";
export const getTasksByStage =
	baseUrl + "dashboard/api/dashboard/get-stages-tasks";
export const getAllDiseasesUrl =
	baseUrl + "dashboard/api/dashboard/get-all-diseases";
export const updateCropStageByIdUrl =
	baseUrl + "dashboard/api/dashboard/update-stages";
export const updateCropStageTasksByIdUrl =
	baseUrl + "dashboard/api/dashboard/update-stage-task";

//Languages
export const languagesApi =
	baseUrl + "dashboard/api/kisan-sandesh/get-languages";

//News API
export const getNewsApi = baseUrl + "dashboard/api/kisan-sandesh/get-news";
export const createNewsApi =
	baseUrl + "dashboard/api/kisan-sandesh/create-news";
export const updateNewsApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-news";
export const updateNewsPublishApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-news-publish";
export const deleteNewsApi =
	baseUrl + "dashboard/api/kisan-sandesh/delete-news";
export const uploadNewsImageApi =
	baseUrl + "dashboard/api/kisan-sandesh/upload-news-image";
export const getNewsIconsApi =
	baseUrl + "dashboard/api/kisan-sandesh/get-news-icons";
export const createNewsIconsApi =
	baseUrl + "dashboard/api/kisan-sandesh/create-news-icons";
export const updateNewsIconsApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-news-icons";

//Videos API
export const getVideosApi = baseUrl + "dashboard/api/kisan-sandesh/get-videos";
export const createVideosApi =
	baseUrl + "dashboard/api/kisan-sandesh/create-videos";
export const updateVideosApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-videos";
export const deleteVideosApi =
	baseUrl + "dashboard/api/kisan-sandesh/delete-videos";
export const uploadVideosImageApi =
	baseUrl + "dashboard/api/kisan-sandesh/upload-video-image";
export const updateVideosPublishApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-videos-publish";

//Tips API
export const getTipsApi = baseUrl + "dashboard/api/kisan-sandesh/get-tips";
export const createTipsApi =
	baseUrl + "dashboard/api/kisan-sandesh/create-tips";
export const updateTipsApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-tips";
export const deleteTipsApi =
	baseUrl + "dashboard/api/kisan-sandesh/delete-tips";
export const uploadTipsImageApi =
	baseUrl + "dashboard/api/kisan-sandesh/upload-tips-image";
export const updateTipsPublishApi =
	baseUrl + "dashboard/api/kisan-sandesh/update-tips-publish";

//Blogs API
export const getBlogsApi = baseUrl + "dashboard/api/kisan-sandesh/get-blogs";

//Kisan Vedika
export const getKisanVedikaPosts =
	baseUrl + "dashboard/api/dashboard/get-posts-load";
export const kisanVedikaPostsCount =
	baseUrl + "dashboard/api/dashboard/get-total-posts-count";
export const getCommentsByPostId =
	baseUrl + "kisan-vedika/api/comments/get-comments-by-postId";
export const getUserByMobileNo =
	baseUrl + "dashboard/api/dashboard/get-user-by-mobile";
export const postCommentApi =
	baseUrl + "kisan-vedika/api/comments/create-comment";
export const updateCommentApi =
	baseUrl + "kisan-vedika/api/comments/update-comment";
export const deleteCommentApi =
	baseUrl + "kisan-vedika/api/comments/delete-comment-by-Id";
export const deletePostApi = baseUrl + "kisan-vedika/api/community/post-delete";
export const getPostDiseaseTagsUrl =
	baseUrl + "kisan-vedika/api/community/get-post-disease-tags";
export const getPostUserTagsUrl =
	baseUrl + "kisan-vedika/api/community/get-post-user-tags";
export const getAllPostsUrl = baseUrl + "kisan-vedika/api/community/get-posts";
export const getPostByPostId =
	baseUrl + "dashboard/api/dashboard/get-post-by-postid";

//Mandi Prices Api
export const mandiPricesApi =
	"https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001c76822dcb98146284c0401c65ddf7d9f&format=json&offset=0&limit=10000";
export const postMandisInBetaApi = baseUrl + "crop/api/mandi/create-mandis";
export const postMandisInProdApi = baseUrl + "crop/api/mandi/create-mandis";
export const getPlantsApi = baseUrl + "crop/api/plant/get-plants";
export const getLastUploadedDateApi =
	baseUrl + "dashboard/api/dashboard/get-latest-mandi-date";

//Kisan bazar
export const createCategoryApi =
	baseUrl + "dashboard/api/category/create-category";
export const createSubCategoryApi =
	baseUrl + "dashboard/api/category/create-subcategory";
export const getCategoryApi = baseUrl + "dashboard/api/category/get-categories";
export const getSubCategoryApi =
	baseUrl + "dashboard/api/category/get-all-subcategory-list";
export const uploadCategoryIconsApi =
	baseUrl + "dashboard/api/category/upload-category-icons";
export const updateCategoryApi =
	baseUrl + "dashboard/api/category/update-category";
export const updateSubCategoryApi =
	baseUrl + "dashboard/api/category/update-SubCategory";
export const getKisanBazaarAdsUrl =
	baseUrl + "buy-sell/api/actions/get-post-ads";

//product Ads
export const createProductAdsApi =
	baseUrl + "dashboard/api/productsads/create-product-ad";
export const getProductAdsApi =
	baseUrl + "dashboard/api/productsads/get-product-dashboard-ads";
export const updateProductAdsApi =
	baseUrl + "dashboard/api/productsads/update-product-ad";
export const deleteProductAdsApi =
	baseUrl + "dashboard/api/productsads/delete-product-ad";

//deep links
export const createDeepLinkApi =
	baseUrl + "dashboard/api/DeepLink/create-deeplink";
export const getDeepLinksApi = baseUrl + "dashboard/api/DeepLink/get-deeplinks";
export const deeplinkingApi =
	baseUrl + "identity/api/users/get-dynamic-short-url";
export const updateDeeplinkingApi =
	baseUrl + "dashboard/update-crop-dynamic-links";
export const getDiseaseCauseApi =
	baseUrl + "dashboard/api/deeplink/get-disease-by-diseaseCauseId";
export const getProductDeeplinkUrl =
	baseUrl + "dashboard/api/deeplink/get-product-dynamic-short-url";

//Bussiness Analytics

export const getAnalyticsCropsApi =
	baseUrl + "dashboard/api/businessanalytics/get-cropdoctor-analytics-crops";

export const getAnalyticsStatesApi =
	baseUrl + "dashboard/api/businessanalytics/get-cropdoctor-analytics-states";

export const getAnalyticsDistrictApi =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-analytics-districts";

export const getAnalyticsDiseaseApi =
	baseUrl + "dashboard/api/businessanalytics/get-cropdoctor-analytics-diseases";

export const getAnalyticsResults =
	baseUrl + "dashboard/api/businessanalytics/get-cropdoctor-analytics";

export const getAnalyticsCount =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-businessanalytics-counts";

export const getAnalyticsDiseaseType =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-businessanalytics-by-type";

export const getAnalyticsCropsType =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-businessanalytics-by-type";

export const getDiseaseAnalyticsResults =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-disease-wise-businessanalytics";

export const getCropsAnalyticsResults =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-state-wise-analytics-counts";

export const getAnalyticsStageCount =
	baseUrl +
	"dashboard/api/businessanalytics/get-cropdoctor-stage-wise-analytics-counts";
//Inside App Notification

export const getInsideAppNotification =
	baseUrl + "dashboard/api/InsideAppNotification/get-insideapp-notifications";

export const createInsideAppNotification =
	baseUrl + "dashboard/api/InsideAppNotification/create-insideAppNotification";

export const updateInsideAppNotification =
	baseUrl + "dashboard/api/InsideAppNotification/update-insideappnotification";

export const deleteInsideAppNotification =
	baseUrl + "dashboard/api/InsideAppNotification/delete-insideApp-Notification";

export const getInAppCriteria =
	baseUrl + "dashboard/api/InsideAppNotification/get-inapp-criteries";

export const createInAppCriteria =
	baseUrl + "dashboard/api/InsideAppNotification/create-inapp-criteria";

export const updateInAppCriteria =
	baseUrl + "dashboard/api/InsideAppNotification/update-inapp-criteria";

export const deleteInAppCriteria =
	baseUrl + "dashboard/api/InsideAppNotification/delete-inapp-criteria";

export const getInAppActivities =
	baseUrl + "dashboard/api/InsideAppNotification/get-inapp-activitys";

// FarmLynch

export const createExecutive =
	baseUrl + "dashboard/api/FarmLync/create-executive";

export const updateExecutive =
	baseUrl + "dashboard/api/FarmLync/update-executive";

export const deleteExecutive =
	baseUrl + "dashboard/api/FarmLync/delete-executive";

export const getVleDetails =
	baseUrl + "dashboard/api/FarmLync/get-vle-details-byfe";

export const getFeDetails =
	baseUrl + "dashboard/api/FarmLync/get-fe-details-byzm";

export const getzonalDetails =
	baseUrl + "dashboard/api/FarmLync/get-zonal-details";

export const getVleDetailsByZM =
	baseUrl + "dashboard/api/FarmLync/get-vle-details-byzm";

export const getFarmersListByVleId =
	baseUrl + "dashboard/api/FarmLync/get-farmer-details-byvle";

export const loginUrl = baseUrl + "dashboard/api/FarmLync/executive-login";

export const prakshepSyncedDataUrl =
	baseUrl + "dashboard/api/analytics/track-prakshep-synched-data";

export const prakshepAnalyticsCountUrl =
	baseUrl + "dashboard/api/analytics/prakshep-analytics-count";

export const cropDocDailyStatsCountUrl =
	baseUrl + "dashboard/api/analytics/get-cropdoctor-daily-stats-count";

//UserData - Roles Creation Screen
export const getUserDataApi =
	baseUrl + "dashboard/api/BHAdminUser/get-all-bhadmin-user";

export const getUserRoles =
	baseUrl + "dashboard/api/BHAdminUser/get-all-bhadmin-user-role";

export const createAdminUser =
	baseUrl + "dashboard/api/BHAdminUser/add-bhadmin-user";

export const updateAdminUser =
	baseUrl + "dashboard/api/BHAdminUser/update-bhadmin-user";

export const getProductByHandleName =
	baseUrl + "native-service/api/products/get-products-by-product-handle-name";

export const getProductById =
	baseUrl + "native-service/api/products/get-product-by-id";
