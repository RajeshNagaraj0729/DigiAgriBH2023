/*
React Imports
 */
import React from "react";
import "./App.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

/*
Custom Component Imports
 */
import { BrowserRouter } from "react-router-dom";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import fetchUsersData from "./redux/reducers/UsersData/fetchusersdata";
import storePage from "./redux/reducers/storepage";
import fetchCropDocUsers from "./redux/reducers/CropDoc/fetchCropDocUsers";
import Main from "./pages/Main/Main";
import fetchCropDocById from "./redux/reducers/CropDoc/fetchCropDocById";
import fileUpload from "./redux/reducers/Banners/fileUpload";
import fetchPromoBanners from "./redux/reducers/Banners/Promotional/promotionalBanners";
import fetchCollection from "./redux/reducers/Collection/collection";
import fetchHomeBanners from "./redux/reducers/Banners/HomeBanners/HomeBanners";
import cropDocInfo from "./redux/reducers/CropDoc/cropDocInfo";
import dashboardData from "./redux/reducers/Dashboard/dashboardData";
import fetchTotalResults from "./redux/reducers/CropDoc/fetchrows";
import addPlantRecords from "./redux/reducers/AddPlantRecords/addPlantRecords";
import stageRecords from "./redux/reducers/AddStageRecords/stageRecords";
import plantImageUpload from "./redux/reducers/AddPlantRecords/plantImageUpload";
import stageImageUpload from "./redux/reducers/AddStageRecords/stageImageUpload";
import kisanSandesh from "./redux/reducers/KisanSandesh/kisanSandesh";
import category from "./redux/reducers/KisanBazaar/category";
import ads from "./redux/reducers/ProductAds/ads";
import kisanSandeshImageUpload from "./redux/reducers/KisanSandesh/kisanSandeshImageUpload";
import categoryImageUpload from "./redux/reducers/KisanBazaar/categoryImageUpload";
import adsImage from "./redux/reducers/ProductAds/productsAdsImageUpload";
import kisanVedika from "./redux/reducers/KisanVedika/kisanVedika";
import mandiPrices from "./redux/reducers/Mandis/mandiPrices";
import deepLinks from "./redux/reducers/DeepLink/deepLink";
import analytics from "./redux/reducers/Analytics/analytics";
import notification from "./redux/reducers/Notification/notification";
import farmerRole from "./redux/reducers/FarmerRole/farmerRole";
import diseaseRecords from "./redux/reducers/AddDiseaseRecords/diseaseRecords";
import nativeStore from "./redux/reducers/NativeStore/nativeStore";
import User from "./redux/reducers/Userdata/userdata";

function App() {
	//Configuration for Persist Store
	const persistConfig = {
		key: "root",
		storage,
	};

	//redux store
	const rootReducer = combineReducers({
		totalResults: fetchTotalResults,
		users: fetchUsersData,
		page: storePage,
		cropDoc: fetchCropDocUsers,
		cropDocInfo: cropDocInfo,
		cropDocById: fetchCropDocById,
		banners: fetchHomeBanners,
		fileUpload: fileUpload,
		promoBanners: fetchPromoBanners,
		collection: fetchCollection,
		dashboardData: dashboardData,
		plantRecords: addPlantRecords,
		plantImageUpload: plantImageUpload,
		stageRecords: stageRecords,
		stagesImageUpload: stageImageUpload,
		kisanSandesh: kisanSandesh,
		category: category,
		categoryImages: categoryImageUpload,
		kisanSandeshImages: kisanSandeshImageUpload,
		kisanVedika: kisanVedika,
		mandis: mandiPrices,
		ads: ads,
		adsImages: adsImage,
		deepLinks: deepLinks,
		analytics: analytics,
		notification: notification,
		farmerRole: farmerRole,
		diseaseRecords: diseaseRecords,
		nativeStore: nativeStore,
		User:User,
	});

	//Combining Persist config to root reducer
	const persistedReducer = persistReducer(persistConfig, rootReducer);

	//combining store with middileware
	const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));

	let persistor = persistStore(store);

	//Returing React Router
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<div>
						<Main />
					</div>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
