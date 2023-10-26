//React Imports
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import dateFormat from "dateformat";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";

//Custom Imports
import CustomSelect from "../../../components/Select/Select";
import TextInput from "../../../components/Common/TextInput";
import { PageLoader } from "../../../components/Loading/Loading";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import "../BannersStyle.css";
import "../../../App.css";
import { bannerTypesData } from "../../../services/TablesData/CommonBannerTypesData";
import NativeHomeBannerDataTable from "../../../services/TablesData/NativeHomeBannerDataTable";
import {
	fetchNativeBannersData,
	postNativeBanner,
	deleteNativeBanner,
} from "../../../redux/actions/NativeStore/nativeStore";
import { removeQueryParamFromUrl } from "../../../Utils/utils";
import { getProductByHandle } from "../../../redux/actions/Banners/HomeBanners/HomeBanners";

/**
 * banner object
 */
const banner = {
	bannerName: "",
	activeFrom: "",
	activeTo: "",
	tags: [],
	bannerMedia: [],
	redirectLink: "",
	isDeleted: false,
	language: "",
	label: "",
	translations: {
		te: {
			bannerMedia: [],
		},
		hi: {
			bannerMedia: [],
		},
		ta: {
			bannerMedia: [],
		},
		kn: {
			bannerMedia: [],
		},
	},
	type: "home",
	bannerDimensions: {
		height: 0,
		width: 0,
	},
	specificAttributes: {
		viewLimit: 0,
		state: [],
		district: [],
		crop: [],
		disease: [],
	},
};

/**
 *
 * @param {props} props
 */
const NativeHomeBanners = (props) => {
	const [bannerName, setBannerName] = useState("");
	const [pagination, setPagination] = useState(true);
	const [pageNum, setPagenum] = useState(1);
	const [pageAmount, setPageAmount] = useState(10);
	const [activeFrom, setActiveFrom] = useState("");
	const [activeTo, setActiveTo] = useState("");
	const [redirectLink, setRedirectLink] = useState("");
	const [bannerMedia, setBannerMedia] = useState("");
	const [isMediaLoading, setIsMediaLoading] = useState(false);
	const [submitDisable, setSubmitDisable] = useState(true);
	const [translations, setTranslations] = useState({
		te: {
			bannerMedia: [],
		},
		hi: {
			bannerMedia: [],
		},
		ta: {
			bannerMedia: [],
		},
		kn: {
			bannerMedia: [],
		},
	});
	const [language, setLanguage] = useState({ label: "English", value: "en" });
	const [postLanguage, setPostLanguage] = useState({
		label: "English",
		value: "en",
	});
	const [disableUpload, setDisableUpload] = useState(true);
	const [isImageSelected, setIsImageSelected] = useState(false);
	const [isUploadClicked, setIsUploadClicked] = useState(false);
	const [bannerType, setBannerType] = useState(bannerTypesData[0]);
	const [isLoading, setIsLoading] = useState(true);
	const banners = useSelector((state) => state.nativeStore);
	const dispatch = useDispatch();
	const store = useStore();
	const results = useSelector(
		(state) => state.nativeStore?.nativeHomeBannerdata
	);
	const totalGridCount = results[0]?.filterCount;
	const [contextId, setContextId] = useState("");

	/**
	 * Getting banners function
	 * @param {string}
	 */
	const getHomeBanners = async (number, amount) => {
		await dispatch(
			fetchNativeBannersData(language.value, number, amount, banner.type)
		);
		setIsLoading(false);
	};

	//Get banners
	useEffect(() => {
		getHomeBanners(pageNum, pageAmount);
	}, [pageNum, pageAmount, language.value]);

	//Check for create banners
	useEffect(() => {
		if (
			bannerMedia === "" &&
			translations.te.bannerMedia.length !== 0 &&
			translations.te.bannerMedia[0] !== "" &&
			translations.hi.bannerMedia.length !== 0 &&
			translations.hi.bannerMedia[0] !== "" &&
			translations.ta.bannerMedia.length !== 0 &&
			translations.ta.bannerMedia[0] !== "" &&
			translations.kn.bannerMedia.length !== 0 &&
			translations.kn.bannerMedia[0] !== ""
		) {
			setIsImageSelected(false);
			setIsUploadClicked(false);
			setDisableUpload(true);
		}
		if (
			bannerName !== "" &&
			activeFrom !== "" &&
			activeTo !== "" &&
			bannerMedia.length > 1 &&
			(bannerMedia !== "" ||
				(translations.te.bannerMedia.length !== 0 &&
					translations.te.bannerMedia[0] !== "") ||
				(translations.hi.bannerMedia.length !== 0 &&
					translations.hi.bannerMedia[0] !== "") ||
				(translations.ta.bannerMedia.length !== 0 &&
					translations.ta.bannerMedia[0] !== "") ||
				(translations.kn.bannerMedia.length !== 0 &&
					translations.kn.bannerMedia[0] !== "")) &&
			redirectLink !== ""
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [
		bannerName,
		activeFrom,
		activeTo,
		bannerMedia,
		translations,
		redirectLink,
	]);

	useEffect(() => {
		if (urlWithoutQueryParam?.includes("collections/")) {
			const parts = urlWithoutQueryParam.split("collections/");
			const extractedValue = parts[1].replace(/\W+/g, "-").toLowerCase(); // Take the second part and remove any extra characters
			setContextId(extractedValue);
			setBannerType(bannerTypesData[0]);
		} else if (urlWithoutQueryParam?.includes("products/")) {
			const parts = urlWithoutQueryParam.split("products/"); // Split the redirectLink by "products/"
			const fetchData = async () => {
				try {
					const data = await getProductByHandle(parts[1]);
					const productIdAsString = String(data?.productId); // Convert productId to a string
					setContextId(productIdAsString);
					console.log("inside Home banner", data);
				} catch (error) {
					console.error("Error fetching product data:", error);
				}
			};
			fetchData();
			setBannerType(bannerTypesData[1]);
		} else if (redirectLink === "") {
			setBannerType(bannerTypesData[3]);
			setContextId("");
		} else if (!redirectLink?.includes("https://www.bighaat.com/")) {
			setContextId(redirectLink);
			setBannerType(bannerTypesData[2]);
		}
	}, [redirectLink]);

	//Method calling for removing query params from a redirectLink that we entered
	const urlWithoutQueryParam = removeQueryParamFromUrl(redirectLink);

	/**
	 * file upload function
	 * @param {events} e
	 */
	const uploadFile = async (file, lang) => {
		setIsMediaLoading(true);
		await dispatch(fileUpload(file)).then(() => {
			if (!store.getState().fileUpload.isLoading) {
				Alert.success("Banner media added successfully");
				setIsMediaLoading(false);
			}
		});
	};

	const validateBannerMedia = () => {
		if (
			bannerMedia !== "" &&
			!bannerMedia.toLowerCase().endsWith(".jpg") &&
			!bannerMedia.toLowerCase().endsWith(".png") &&
			!bannerMedia.toLowerCase().endsWith(".jpeg")
		) {
			return false;
		}

		const languageCodes = ["te", "hi", "ta", "kn"];
		for (const code of languageCodes) {
			const media = translations[code].bannerMedia;
			if (
				media.length !== 0 &&
				!media[0].toLowerCase().endsWith(".jpg") &&
				!media[0].toLowerCase().endsWith(".jpeg") &&
				!media[0].toLowerCase().endsWith(".png")
			) {
				return false;
			}
		}
		return true;
	};

	/**
	 * Create banner submit implementation
	 */
	const handleSubmit = async () => {
		if (isImageSelected && !isUploadClicked) {
			Alert.error("Please upload the selected image");
		} else if (!validateBannerMedia()) {
			Alert.error("Please enter a valid banner media");
		} else if (
			new Date(activeFrom).setHours(0, 0, 0, 0) >
			new Date(activeTo).setHours(0, 0, 0, 0)
		) {
			Alert.error("Active From date is greater than Active To date");
		} else {
			banner.bannerName = bannerName;
			banner.activeFrom = new Date(activeFrom).toISOString();
			banner.activeTo = new Date(activeTo).toISOString();
			banner.translations = translations;
			banner.language = postLanguage.value;
			banner.bannerDimensions = {
				height: 0,
				width: 0,
			};
			banner.redirectLink =
				bannerType.value === "collection"
					? `collection::/handleName=${contextId}::/handleTitle=${bannerName}`
					: bannerType.value === "product"
					? `product::/productId=${contextId}`
					: `extLink::/url=${contextId}`;

			await dispatch(postNativeBanner(banner))
				.then(() => {
					Alert.success("Successfully added banner");
					setLanguage(postLanguage);
					setBannerName("");
					setBannerMedia("");
					setActiveTo("");
					setActiveFrom("");
					setBannerType(bannerTypesData[3]);
					setRedirectLink("");
					setTranslations({
						te: {
							bannerMedia: [],
						},
						hi: {
							bannerMedia: [],
						},
						ta: {
							bannerMedia: [],
						},
						kn: {
							bannerMedia: [],
						},
					});
					setSubmitDisable(true);
					setDisableUpload(true);
					setIsUploadClicked(false);
					setIsImageSelected(false);
					getHomeBanners(pageNum, pageAmount);
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	/**
	 * Delete banner implementation
	 * @param {ObjectId} id
	 */
	const delBanner = (id) => {
		dispatch(deleteNativeBanner(id)).then(() => {
			Alert.success("Successfully deleted banner");
			getHomeBanners(pageNum, pageAmount);
		});
	};

	return (
		<div>
			<div className="row">
				<div className="col-6  d-flex align-items-center">
					<h2 className="mainHeading">Native Home Banner</h2>
				</div>
				<div className="col-6">
					<div
						style={{ width: "200px", marginBottom: 10, float: "right" }}
					></div>
				</div>
			</div>
			<div className="tableMainSection cardShadow space-md-inr">
				<form>
					<div className="row">
						<div className="col-12 col-sm-6 col-md-4">
							<TextInput
								labelName="Redirect Link:"
								id="redirectLink"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								inputClass="inputStyle"
								value={redirectLink}
								onChange={(e) => {
									setRedirectLink(e.target.value);
								}}
							/>
							<TextInput
								labelName="Banner Name:"
								id="bannerName"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								value={bannerName}
								inputClass="inputStyle"
								onChange={(e) => {
									setBannerName(e.target.value);
								}}
							/>
							<div className="row">
								<div className="col-7">
									{isMediaLoading ? (
										<Spinner color="success" size="sm" />
									) : (
										<TextInput
											labelName="Banner Media:( jpg/jpeg, png)"
											id={postLanguage.value + "bannermedia"}
											labelClass="bannerLableStyle"
											divClass="form-group"
											type="text"
											inputClass="inputStyle"
											value={
												postLanguage.value === "en"
													? bannerMedia
													: translations[postLanguage.value].bannerMedia
															.length !== 0
													? translations[postLanguage.value].bannerMedia[0]
													: ""
											}
											onChange={(e) => {
												if (postLanguage.value === "en") {
													setBannerMedia(e.target.value);
													banner.bannerMedia = [];
													banner.bannerMedia[0] = e.target.value;
												} else {
													let duptranslations = {
														te: {
															bannerMedia: [],
														},
														hi: {
															bannerMedia: [],
														},
														ta: {
															bannerMedia: [],
														},
														kn: {
															bannerMedia: [],
														},
													};
													duptranslations[postLanguage.value].bannerMedia[0] =
														e.target.value;
													setTranslations(duptranslations);
												}
											}}
										/>
									)}
								</div>
								<div className="col-5 d-flex m-auto">
									<label
										htmlFor={postLanguage.value + "lang-file-upload"}
										className="custom-file-upload btn btn-sm btn-light m-auto"
									>
										<i className="fa fa-picture-o"></i> Select
									</label>
									<Button
										className="custom-file-upload btn btn-sm btn-light m-auto"
										disabled={disableUpload}
										onClick={async () => {
											setDisableUpload(true);
											try {
												if (postLanguage.value === "en") {
													await uploadFile(bannerMedia).then(() => {
														setIsUploadClicked(true);
														setBannerMedia(store.getState().fileUpload.data);
														banner.bannerMedia = [];
														banner.bannerMedia[0] =
															store.getState().fileUpload.data;
													});
												} else {
													await uploadFile(
														translations[postLanguage.value].bannerMedia[0]
													).then(() => {
														setIsUploadClicked(true);
														let duptranslations = {
															te: {
																bannerMedia: [],
															},
															hi: {
																bannerMedia: [],
															},
															ta: {
																bannerMedia: [],
															},
															kn: {
																bannerMedia: [],
															},
														};
														duptranslations[postLanguage.value].bannerMedia[0] =
															store.getState().fileUpload.data;
														setTranslations(duptranslations);
													});
												}
											} catch (err) {
												console.error(err.message);
											}
										}}
									>
										<i className="fa fa-cloud-upload"></i> Upload
									</Button>
								</div>
								<input
									id={postLanguage.value + "lang-file-upload"}
									type="file"
									style={{ display: "none" }}
									accept="image/*"
									onChange={(e) => {
										if (!e.target.files[0].type.startsWith("image/")) {
											Alert.error("Please upload a valid image");
										} else {
											setIsImageSelected(true);
											setDisableUpload(false);
											if (postLanguage.value === "en") {
												setBannerMedia(e.target.files[0]);
											} else {
												let duptranslations = {
													te: {
														bannerMedia: [],
													},
													hi: {
														bannerMedia: [],
													},
													ta: {
														bannerMedia: [],
													},
													kn: {
														bannerMedia: [],
													},
												};
												duptranslations[postLanguage.value].bannerMedia.push(
													e.target.files[0]
												);

												setTranslations(duptranslations);
											}
										}
									}}
									onClick={(e) => (e.target.value = "")}
								/>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4">
							<div className={"form-group"}>
								<label htmlFor={"banner-type"} className="bannerLableStyle">
									Banner Type
								</label>
								<CustomSelect
									data={bannerTypesData}
									placeholder="Select Banner Type"
									value={bannerType}
									onSelect={(value) => {
										if (value) setBannerType(value);
										else setBannerType(bannerTypesData[0]);
									}}
									isDisabled={true}
								/>
							</div>
							<TextInput
								labelName="Active From:"
								id="activeFrom"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="date"
								value={activeFrom}
								onKeyPress={(e) => {
									e.preventDefault();
									return false;
								}}
								onKeyDown={(e) => {
									e.preventDefault();
									return false;
								}}
								onKeyUp={(e) => {
									e.preventDefault();
									return false;
								}}
								inputClass="inputStyle"
								onChange={(e) => {
									setActiveFrom(e.target.value);
								}}
								min={dateFormat(Date.now(), "yyyy-mm-dd")}
							/>
						</div>
						<div className="col-12 col-sm-6 col-md-4">
							<TextInput
								labelName={bannerType.label1}
								id="bannerName"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								value={contextId}
								inputClass="inputStyle"
								disabled
							/>
							<TextInput
								labelName="Active To:"
								id="activeTo"
								value={activeTo}
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="date"
								onKeyPress={(e) => {
									e.preventDefault();
									return false;
								}}
								onKeyDown={(e) => {
									e.preventDefault();
									return false;
								}}
								onKeyUp={(e) => {
									e.preventDefault();
									return false;
								}}
								inputClass="inputStyle"
								onChange={(e) => {
									setActiveTo(e.target.value);
								}}
								min={activeFrom || dateFormat(Date.now(), "yyyy-mm-dd")}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Button
								className="btn btn-md btn-primary"
								disabled={submitDisable}
								onClick={() => {
									handleSubmit();
									setSubmitDisable(true);
								}}
							>
								Submit
							</Button>
						</div>
					</div>
				</form>
			</div>
			<div className="row">
				<div className="col-12">
					<div style={{ width: "200px", margin: 10, float: "right" }}></div>
					<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
						{banners.isLoading ? (
							<PageLoader />
						) : (
							<NativeHomeBannerDataTable
								callHandle={getHomeBanners}
								pagination={pagination}
								results={results}
								pagenum={pageNum}
								pageAmount={pageAmount}
								setPagenum={setPagenum}
								setPageAmount={setPageAmount}
								delBanner={delBanner}
								total={totalGridCount}
								isLoading={isLoading}
								language={language.value}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default NativeHomeBanners;
