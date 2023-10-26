/*
React Imports
 */
import React, { useEffect, useState } from "react";
import storage from "redux-persist/es/storage";
import { useDispatch, useSelector } from "react-redux";
import {
	Switch,
	Route,
	Redirect,
	withRouter,
	useHistory,
} from "react-router-dom";
import { Alert } from "rsuite";

/*
Custom Component Imports
 */
import Home from "../Home/Home";
import CropDocUserDetails from "../CropDoc/CropDocUserDetails";
import Login from "../Login/Login";
import Users from "../CropDoc/CropDocUsers";
import TotalResults from "../TotalResults/TotalResults";
import EditDisease from "../TotalResults/EditDisease";
import UsersData from "../UsersData/UsersData";
import * as Types from "../../redux/actions/storepage";
import { fetchCropDocUsers } from "../../redux/actions/CropDoc/fetchCropDocUsers";
import * as Dashboard from "../../redux/actions/Dashboard/dashboardData";
import {
	fetchCropDocDatabyFilter,
	fetchRows,
} from "../../redux/actions/CropDoc/fetchrows";
import * as UserDataApis from "../../redux/actions/UsersData/fetchusersdata";
import { fetchCropDocById } from "../../redux/actions/CropDoc/fetchCropDocById";
import * as cropDocInfo from "../../redux/actions/CropDoc/cropDocInfo";
import Banners from "../Banners/HomeBanners/HomeBanners";
import Promotional from "../Banners/Promotional/Promotional";
import MapBanners from "../Banners/MapBanners/MapBanners";
import Collection from "../Collection/Collection";
// import DeepLinking from "../Crops/Deeplinking";
import CropCareDeepLink from "../DeepLink/CropCareDeepLink";
import PestCareDeepLink from "../DeepLink/PestCareDeepLink";
import DiseaseDeepLink from "../DeepLink/DiseaseDeepLink";
import ProductDeepLink from "../DeepLink/ProductDeepLink";
import Category from "../KisanBazaar/Category";
import AppNotification from "../InAppNotification/AppNotification";
import AppCriteria from "../InAppNotification/AppCriteria";
import SubCategory from "../KisanBazaar/SubCategory";
import HomeProducts from "../Products/HomeProducts";
import KvProducts from "../Products/KvProducts";
import MainLayout from "../../layouts/Main/Container";
import AddDisease from "../Diseases/AddDisease";
import AddDiseaseCause from "../Diseases/AddDiseaseCause";
import AddCrop from "../Crops/AddCrop";
import StageType from "../Stages/StageType";
import Stage from "../Stages/Stage";
import StageTask from "../Stages/StageTask";
import * as stagesApi from "../../redux/actions/AddStageRecords/stageRecords";
import News from "../KisanSandesh/News/News";
import Videos from "../KisanSandesh/Videos/Videos";
import Tips from "../KisanSandesh/Tips/Tips";
import NewsIcon from "../KisanSandesh/News/NewsIcon";
import {
	getNewsIcons,
	getLanguages,
} from "../../redux/actions/KisanSandesh/kisanSandesh";
import UserNotificaton from "../UsersData/UserNotification";
import KVPosts from "../KisanVedika/KisanVedikaPosts";
import KVPostById from "../KisanVedika/KVPostById";
import KVLogin from "../Login/KVLogin";
import FarmerLogin from "../Login/FarmerLogin";
import MandiPrices from "../Mandis/MandiPrices";
import KVBanners from "../Banners/KVBanners/KVBanners";
import StagesJson from "../Stages/StagesJson";
import { getMandiPlants } from "../../redux/actions/Mandis/mandiPrices";
import CustomVisionTest from "../TotalResults/CustomVision";
import Analytics from "../Analytics/Analytic";
import KVResults from "../KisanVedika/KVResults";
import Village from "../FarmerRole/Village";
import Field from "../FarmerRole/Field";
import Zonal from "../FarmerRole/Zonal";
import InAppHistory from "../InAppNotification/InAppHistory";
import KisanBazaarAds from "../KisanBazaar/KisanBazaarAds";
import KVAllPosts from "../KisanVedika/KVAllPosts";
import PestDiseases from "../Diseases/PestDiseases";
import Prakshep from "../Analytics/Prakshep";
import StagesList from "../EditStages/StagesList";
import StageTasksList from "../EditStages/StageTasksList";
import DiseasesList from "../EditStages/DiseasesList";
import DiseaseCausesList from "../EditStages/DiseaseCausesList";
import Blogs from "../KisanSandesh/Blogs/Blogs";
import PWReset from "../Login/PWReset";
import PasswordForgot from "../Login/PasswordForgot";
import KVOtp from "../Login/KVOtpVerify";
import KVOtpVerify from "../Login/KVOtpVerify";
import NativeCollection from "../NativeCollection/NativeCollection";
import NativeHomeBanners from "../Banners/NativeHomeBanners/NativeHomeBanners";
import NativeHomeCategory from "../Banners/NativeHomeCayegory/NativeHomeCategory";
import Userdata from "../Userdata/Userdata";
import Createuser from "../Userdata/Createuser";
import DynamicLink from "../DynamicLink/DynamicLink";
import BannersPage from "../BannersPage";
import Register from "../agridigitization/register";
import DigiHome from "../agridigitization/digi-home";

const Main = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const cropDocUsers = useSelector((state) => state.cropDoc);
	const isLoggedin = localStorage.getItem("isLoggedIn");
	const admin = localStorage.getItem("admin");
	const [isNavOpen, setIsNavOpen] = useState(true);
	const [activeKey, setActiveKey] = useState("1");
	const [openKeys, setOpenKeys] = useState([
		"2",
		"3",
		"4",
		"6",
		"7",
		"8",
		"9",
		"10",
		"17",
	]);

	// Implements logout functionality
	const logout = () => {
		localStorage.clear();
		dispatch({
			type: Types.CROP_DOC,
			activePage: 1,
			pageAmount: 10,
		});
		dispatch({
			type: Types.TOTAL_USERS,
			activePage: 1,
			pageAmount: 10,
		});
		dispatch({
			type: Types.CROP_DOC_USERS,
			activePage: 1,
			pageAmount: 10,
		});
		storage.removeItem("persist:root");
		history.push("/login");
	};

	const getdata = async () => {
		// dispatch(fetchCropDocDatabyFilter(1, 10));
		dispatch(UserDataApis.fetchUsersData(1, 10));
		// dispatch(
		//   fetchCropDocUsers(
		//     page.cropDocUsersActivePage,
		//     page.cropDocUsersPageAmount
		//   )
		// );
		dispatch(Dashboard.getCropDocAttendedCount()).catch((err) => {
			Alert.error(err.message);
		});
		dispatch(Dashboard.getCropDocUnAttendedCount()).catch((err) => {
			Alert.error(err.message);
		});
		dispatch(Dashboard.fetchUserStats());
		dispatch(Dashboard.getTotalCropDocCount());
		dispatch(Dashboard.getTotalCropDocWithDiseaseCount());
		dispatch(Dashboard.getTotalCropDocWithoutDiseaseCount());
		dispatch(Dashboard.getTotalCropDocDayCount());
		dispatch(Dashboard.fetchTopUsers());
		dispatch(Dashboard.fetchChartData());
		dispatch(cropDocInfo.fetchTopDiseases());
		dispatch(cropDocInfo.fetchDiseases());
		dispatch(cropDocInfo.fetchCrops());
		dispatch(stagesApi.fetchStageTypes());
		dispatch(stagesApi.fetchStages());
		dispatch(Dashboard.getCurrentVersionName()).catch((err) => {
			Alert.error(err.message);
		});
		await dispatch(getNewsIcons()).catch((err) => {
			Alert.error(err.message);
		});
		dispatch(getLanguages()).catch((err) => Alert.error(err.message));
		dispatch(getNewsIcons()).catch((err) => Alert.error(err.message));
		dispatch(UserDataApis.getDistricts()).catch((err) =>
			Alert.error(err.message)
		);
		dispatch(UserDataApis.getStates()).catch((err) => Alert.error(err.message));
		dispatch(UserDataApis.getPostCodes()).catch((err) =>
			Alert.error(err.message)
		);
		dispatch(getMandiPlants()).catch((err) => Alert.error(err.message));
	};

	// Fetching data from API on page load
	useEffect(() => {
		getdata();
	}, [isLoggedin]);

	/**
	 * Main Layout with props
	 * @param {component} param0
	 */
	const Container = ({ component }) => {
		return (
			<MainLayout
				component={component}
				isNavOpen={isNavOpen}
				setIsNavOpen={setIsNavOpen}
				logout={logout}
				activeKey={activeKey}
				setActiveKey={setActiveKey}
				openKeys={openKeys}
				setOpenKeys={setOpenKeys}
			/>
		);
	};

	// Displaying Home page
	const HomePage = () => {
		return <Container component={<Home />} />;
	};

	const PrakshepPage = () => {
		return <Container component={<MapBanners />} />;
	};

	const AnalyticsPage = () => {
		return <Container component={<Analytics />} />;
	};

	const VillagePage = () => {
		return <Container component={<Village />} />;
	};
	const FieldPage = () => {
		return <Container component={<Field />} />;
	};
	const ZonalPage = () => {
		return <Container component={<Zonal />} />;
	};
	// Displaying Total Results page
	const TotalResultsPage = () => {
		return <Container component={<TotalResults />} />;
	};

	// Displaying Analytics Results page
	const AnalyticsResultsPage = () => {
		return <Container component={<Analytics />} />;
	};

	const PrakashepResultsPage = () => {
		return <Container component={<Prakshep />} />;
	};

	/**
	 * Displaying User Details Page
	 * @param {String} match
	 */
	const UserDetail = ({ match }) => {
		return (
			<Container
				component={
					<CropDocUserDetails
						userDetails={cropDocUsers.data.filter(
							(row) => row.id === match.params.userId
						)}
						isLoading={cropDocUsers.isLoading}
						errMsg={cropDocUsers.errmsg}
					/>
				}
			/>
		);
	};

	// Displaying Users Data Page
	const Usersdata = () => {
		return <Container component={<UsersData />} />;
	};

	// Displaying Users Send Notification Page
	const UserNotificationPage = () => {
		return <Container component={<UserNotificaton />} />;
	};

	// Displaying CropDoctor Users Page
	const CropDocUsers = () => {
		return <Container component={<Users />} />;
	};

	/**
	 * Displaying edit Disease Page
	 * @param {String} match
	 */
	const EditPage = ({ match }) => {
		dispatch(fetchCropDocById(match.params.diseaseId));
		return <Container component={<EditDisease />} />;
	};

	//Displaying Home Banners Page
	const HomeBannerPage = () => {
		return <Container component={<Banners />} />;
	};

	//Displaying Map Banners Page
	const MapBannerPage = () => {
		return <Container component={<MapBanners />} />;
	};

	//Displaying Promotional Banners Page
	const PromoBannerPage = () => {
		return <Container component={<Promotional />} />;
	};

	//Displaying Collection Page
	const CollectionPage = () => {
		return <Container component={<Collection />} />;
	};
	//Dynamic Link Generation Page
	const DynamicLinkPage = () => {
		return <Container component={<DynamicLink />} />;
	};
	const AllBannersPage = () => {
		return <Container component={<BannersPage />} />;
	};

	// const DeepLinkingPage = () => {
	//   return <Container component={<DeepLinking />} />;
	// };

	const CropCareDeepLinkPage = () => {
		return <Container component={<CropCareDeepLink />} />;
	};

	const PestCareDeepLinkPage = () => {
		return <Container component={<PestCareDeepLink />} />;
	};

	const DiseaseDeepLinkPage = () => {
		return <Container component={<DiseaseDeepLink />} />;
	};

	const ProductDeepLinkPage = () => {
		return <Container component={<ProductDeepLink />} />;
	};

	const CategoryPage = () => {
		return <Container component={<Category />} />;
	};
	//UserData
	const UserdataPage = () => {
		return <Container component={<Userdata />} />;
	};
	const CreateuserPage = () => {
		return <Container component={<Createuser />} />;
	};
	const KisanBazaarAdsPage = () => {
		return <Container component={<KisanBazaarAds />} />;
	};

	const AppNotificationPage = () => {
		return <Container component={<AppNotification />} />;
	};
	const AppCriteriaPage = () => {
		return <Container component={<AppCriteria />} />;
	};

	const InAppHistoryPage = () => {
		return <Container component={<InAppHistory />} />;
	};

	const SubCategoryPage = () => {
		return <Container component={<SubCategory />} />;
	};

	const HomeProductPage = () => {
		return <Container component={<HomeProducts />} />;
	};

	const KvProductPage = () => {
		return <Container component={<KvProducts />} />;
	};

	//Displaying Add disease page
	const AddDiseasePage = () => {
		return <Container component={<AddDisease />} />;
	};

	//Displaying Add Disease Cause page
	const AddDiseaseCausePage = () => {
		return <Container component={<AddDiseaseCause />} />;
	};

	//Displaying Add Crop Page
	const AddCropPage = () => {
		return <Container component={<AddCrop />} />;
	};

	//DStages json page
	const JsonPage = () => {
		return <Container component={<StagesJson />} />;
	};

	//Displaying Add Stage Type Page
	const AddStageTypePage = () => {
		return <Container component={<StageType />} />;
	};

	//Displaying Add Stage Page
	const AddStagePage = () => {
		return <Container component={<Stage />} />;
	};

	//Displaying Add Crop Page
	const AddStageTaskPage = () => {
		return <Container component={<StageTask />} />;
	};

	const StagesListPage = () => {
		return <Container component={<StagesList />} />;
	};

	const StageTasksListPage = () => {
		return <Container component={<StageTasksList />} />;
	};

	const DiseasesListPage = () => {
		return <Container component={<DiseasesList />} />;
	};

	const DiseaseCausesListPage = () => {
		return <Container component={<DiseaseCausesList />} />;
	};

	//News Icon Page
	const NewsIconPage = () => {
		return <Container component={<NewsIcon />} />;
	};

	//Displaying News Page
	const NewsPage = () => {
		return <Container component={<News />} />;
	};

	//Displaying Videos Page
	const VideosPage = () => {
		return <Container component={<Videos />} />;
	};

	//Displaying Tips Page
	const TipsPage = () => {
		return <Container component={<Tips />} />;
	};

	//Displaying Blog Page
	const BlogsPage = () => {
		return <Container component={<Blogs />} />;
	};

	//Displaying KV Posts Page
	const KVPostsPage = () => {
		return <Container component={<KVPosts />} />;
	};

	const KVResultsPage = () => {
		return <Container component={<KVResults />} />;
	};

	const KVAllPostsPage = () => {
		return <Container component={<KVAllPosts />} />;
	};

	const PestDiseasesPage = () => {
		return <Container component={<PestDiseases />} />;
	};

	/**
	 * Displaying edit post comment Page
	 * @param {String} match
	 */
	const EditPostComment = ({ match }) => {
		return <Container component={<KVPostById id={match.params.postId} />} />;
	};

	//Displaying KV Posts Page
	const MandiPricePage = () => {
		return <Container component={<MandiPrices />} />;
	};

	//Displaying Custom vision page
	const CustomVisionPage = () => {
		return <Container component={<CustomVisionTest />} />;
	};

	//Displaying KV Banners page
	const KVBannersPage = () => {
		return <Container component={<KVBanners />} />;
	};

	const NativeCollectionPage = () => {
		return <Container component={<NativeCollection />} />;
	};

	//Displaying Native Home Banner page
	const NativeHomeBannersPage = () => {
		return <Container component={<NativeHomeBanners />} />;
	};

	//Displaying Native Category Page
	const NativeHomeCategoryPage = () => {
		return <Container component={<NativeHomeCategory />} />;
	};
	/**
	 * Check for login and redirect to appropriate screen
	 * @param {Component} param0
	 */

	const PrivateRoute = ({ component: Component, ...rest }) => (
		<Route
			{...rest}
			render={(props) =>
				isLoggedin ? (
					admin === rest.from ? (
						<Component {...props} />
					) : (
						<Redirect
							to={
								admin === "user"
									? "/users/user-data"
									: admin === "prakshep"
									? "/prakshep"
									: admin === "normal"
									? "/home"
									: admin === "farmlync"
									? "/zonal-ad"
									: admin === "ZM"
									? "/field-zm"
									: admin === "FE"
									? "/village-fe"
									: admin === "kvadmin"
									? "/kisan-vedika/posts"
									: admin === "dev"
									? "/mandi-prices"
									: "home-banners"
							}
						/>
					)
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);

	// Switch between the routes
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/kisan-vedika-login" component={KVLogin} />
			<Route exact path="/kisan-vedika-otp-verify" component={KVOtpVerify} />
			<Route exact path="/forgot-password" component={PasswordForgot} />
			<Route exact path="/password-reset" component={PWReset} />
			<Route exact path="/farmlync-login" component={FarmerLogin} />
			<Route exact path="/register_user" component={Register} />
			<Route exact path="/digi-home" component={DigiHome} />

			<PrivateRoute exact path="/home" component={HomePage} from="normal" />

			<PrivateRoute
				exact
				path="/users"
				component={CropDocUsers}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/users/user-data"
				component={Usersdata}
				from={admin === "normal" ? "normal" : "user"}
			/>
			<PrivateRoute
				exact
				path="/users/user-notification"
				component={UserNotificationPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/crop-doctor-total-results"
				component={TotalResultsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/crop-doctor-analytics"
				component={AnalyticsResultsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/prakshep-analytics"
				component={PrakashepResultsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/test-custom-vision"
				component={CustomVisionPage}
				from="kvadmin"
			/>
			<PrivateRoute
				exact
				path="/prakshep"
				component={PrakshepPage}
				from={"prakshep"}
			/>

			<PrivateRoute
				exact
				path="/analytics"
				component={AnalyticsPage}
				from={"analytics"}
			/>

			<PrivateRoute
				exact
				path="/zonal-ad"
				component={ZonalPage}
				from="farmlync"
			/>
			<PrivateRoute
				exact
				path="/field-ad"
				component={FieldPage}
				from="farmlync"
			/>
			<PrivateRoute
				exact
				path="/village-ad"
				component={VillagePage}
				from="farmlync"
			/>

			<PrivateRoute exact path="/field-zm" component={FieldPage} from="ZM" />
			<PrivateRoute
				exact
				path="/village-zm"
				component={VillagePage}
				from="ZM"
			/>

			<PrivateRoute
				exact
				path="/village-fe"
				component={VillagePage}
				from="FE"
			/>

			<PrivateRoute
				exact
				path="/users/:userId"
				component={UserDetail}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/crop-doctor/edit-disease/:diseaseId"
				component={EditPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/diseases/add-disease"
				component={AddDiseasePage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/diseases/all-diseases"
				component={PestDiseasesPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/diseases/add-problem-cause"
				component={AddDiseaseCausePage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/crops/add-crop"
				component={AddCropPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/stages/add-stage-type"
				component={AddStageTypePage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/stages/add-stage"
				component={AddStagePage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/stages/add-stage-task"
				component={AddStageTaskPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/stages/stages-json"
				component={JsonPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/stages/stages-list"
				component={StagesListPage}
				from="translate"
			/>
			<PrivateRoute
				exact
				path="/stages/stage-tasks-list"
				component={StageTasksListPage}
				from="translate"
			/>
			<PrivateRoute
				exact
				path="/diseases/diseases-list"
				component={DiseasesListPage}
				from="translate"
			/>
			<PrivateRoute
				exact
				path="/diseases/diseases-causes-list"
				component={DiseaseCausesListPage}
				from="translate"
			/>
			<PrivateRoute
				exact
				path="/kisan-sandesh/news/news-icon"
				component={NewsIconPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kisan-sandesh/news"
				component={NewsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kisan-sandesh/videos"
				component={VideosPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kisan-sandesh/tips"
				component={TipsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kisan-sandesh/blogs"
				component={BlogsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/crop-care-deep-linking"
				component={CropCareDeepLinkPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/pest-care-deep-linking"
				component={PestCareDeepLinkPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/product-deep-linking"
				component={ProductDeepLinkPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/disease-deep-linking"
				component={DiseaseDeepLinkPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/category"
				component={CategoryPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/user-userdata"
				component={UserdataPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/create-user"
				component={CreateuserPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kb-ads"
				component={KisanBazaarAdsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/inAppNotification"
				component={AppNotificationPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/inAppCriteria"
				component={AppCriteriaPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/inAppHistory"
				component={InAppHistoryPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/sub-category"
				component={SubCategoryPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/home-products"
				component={HomeProductPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/kv-products"
				component={KvProductPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/kisan-vedika/posts"
				component={KVPostsPage}
				from="kvadmin"
			/>
			<PrivateRoute
				exact
				path="/kisan-vedika/results"
				component={KVResultsPage}
				from="kvadmin"
			/>
			<PrivateRoute
				exact
				path="/kv-posts"
				component={KVAllPostsPage}
				from="normal"
			/>
			<PrivateRoute
				exact
				path="/kisan-vedika/posts/:postId"
				component={EditPostComment}
				from="kvadmin"
			/>
			<PrivateRoute
				exact
				path="/mandi-prices"
				component={MandiPricePage}
				from="dev"
			/>
			<PrivateRoute
				exact
				path="/home-banners"
				component={HomeBannerPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/map-banners"
				component={MapBannerPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/promotional-banners"
				component={PromoBannerPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/collection-details"
				component={CollectionPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/dynamic-link"
				component={DynamicLinkPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/all-banners-page"
				component={AllBannersPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/kisan-banners"
				component={KVBannersPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/native-dynamic-collections-details"
				component={NativeCollectionPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/native-home-banner"
				component={NativeHomeBannersPage}
				from="banner"
			/>
			<PrivateRoute
				exact
				path="/native-home-category"
				component={NativeHomeCategoryPage}
				from="banner"
			/>
			{!isLoggedin ? (
				<Redirect to="/login" />
			) : (
				<Redirect
					to={
						admin === "user"
							? "/users/user-data"
							: admin === "prakshep"
							? "/prakshep"
							: admin === "analytics"
							? "/analytics"
							: admin === "farmlync"
							? "/zonal-ad"
							: admin === "ZM"
							? "/field-zm"
							: admin === "FE"
							? "/village-fe"
							: admin === "normal"
							? "/home"
							: admin === "kvadmin"
							? "/kisan-vedika/posts"
							: admin === "translate"
							? "/stages/stages-list"
							: "home-banners"
					}
				/>
			)}
		</Switch>
	);
};
export default withRouter(Main);
