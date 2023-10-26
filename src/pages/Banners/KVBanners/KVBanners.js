//React Imports
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import dateFormat from "dateformat";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";

//Custom Imports
import CustomSelect from "../../../components/Select/Select";
import EditBanner from "./EditKVBanner";
import DeleteRow from "../../../components/Common/DeleteRow";
import TextInput from "../../../components/Common/TextInput";
import { PageLoader } from "../../../components/Loading/Loading";
import {
	deleteBanner,
	fetchKvBannersData,
	getProductByHandle,
	postBanner,
} from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import * as constants from "../../../constants";
import "../BannersStyle.css";
import "../../../App.css";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import { getLanguages } from "../../../services/Languages";
import { bannerTypesData } from "../../../services/TablesData/CommonBannerTypesData";
import { removeQueryParamFromUrl } from "../../../Utils/utils";

/**
 * banner object
 */
const banner = {
	bannerName: "",
	activeFrom: "",
	activeTo: "",
	label: "",
	tags: [],
	bannerMedia: [],
	redirectLink: "",
	isDeleted: false,
	language: "",
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
	type: "kisan-banners",
	specificAttributes: {
		viewLimit: 0,
		state: [],
		district: [],
		crop: [],
		disease: [],
	},
	bannerDimensions: {
		height: 0,
		width: 0,
	},
	contextType: "",
	contextId: "",
};

/**
 *
 * @param {props} props
 */
const KVBanners = (props) => {
	const kvBanners = useSelector((state) => state.banners).kvBanners;
	const crops = useSelector((state) => state.cropDocInfo).crops;
	const diseases = useSelector((state) => state.cropDocInfo).diseases;

	const dispatch = useDispatch();
	const store = useStore();
	const [sortedKvBanners, setSortedKvBanners] = useState([]);
	const [bannerName, setBannerName] = useState("");
	const [tagName, setTagName] = useState("");
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
	const [isLoading, setIsLoading] = useState(true);
	const [state, setState] = useState([]);
	const [district, setDistrict] = useState([]);
	const [crop, setCrop] = useState([]);
	const [pest, setPest] = useState([]);
	const [viewLimit, setViewLimit] = useState(0);
	const [label, setLabel] = useState([]);
	const [bannerType, setBannerType] = useState({});
	const [contextId, setContextId] = useState("");

	useEffect(() => {
		if (kvBanners && kvBanners.length) {
			const sortedData = kvBanners.map((item) => {
				if (
					new Date(item.activeTo).setHours(0, 0, 0, 0) >=
						new Date().setHours(0, 0, 0, 0) &&
					new Date(item.activeFrom).setHours(0, 0, 0, 0) <=
						new Date().setHours(0, 0, 0, 0)
				) {
					item.isActive = 1;
				} else {
					item.isActive = 0;
				}
				return item;
			});
			setSortedKvBanners(
				sortedData.sort((a, b) => a.isActive - b.isActive).reverse()
			);
		}
	}, [kvBanners]);

	/**
	 * Getting banners function
	 * @param {string} lang
	 */
	const getKVBanners = async (lang) => {
		setIsLoading(true);
		await dispatch(fetchKvBannersData(lang)).catch((err) => {
			Alert.error(err.message);
		});
		setIsLoading(false);
	};

	//Get banners
	useEffect(() => {
		getKVBanners(language.value);
	}, [language]);

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
			tagName !== "" &&
			activeFrom !== "" &&
			activeTo !== "" &&
			label !== "" &&
			(bannerMedia !== "" ||
				(translations.te.bannerMedia.length !== 0 &&
					translations.te.bannerMedia[0] !== "") ||
				(translations.hi.bannerMedia.length !== 0 &&
					translations.hi.bannerMedia[0] !== "") ||
				(translations.ta.bannerMedia.length !== 0 &&
					translations.ta.bannerMedia[0] !== "") ||
				(translations.kn.bannerMedia.length !== 0 &&
					translations.kn.bannerMedia[0] !== "")) &&
			redirectLink !== "" &&
			bannerType !== "" &&
			contextId !== ""
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [
		bannerName,
		tagName,
		activeFrom,
		activeTo,
		bannerMedia,
		redirectLink,
		label,
		translations,
		bannerType,
		contextId,
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
				} catch (error) {
					console.error("Error fetching product data:", error);
				}
			};
			fetchData();
			setBannerType(bannerTypesData[1]);
		} else if (redirectLink === "") {
			setBannerType(bannerTypesData[3]);
			setContextId("");
		} else if (!urlWithoutQueryParam?.includes("https://www.bighaat.com/")) {
			setContextId(redirectLink);
			setBannerType(bannerTypesData[2]);
		}
	}, [redirectLink]);

	//method calling for removing query params from a URL
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

	//Validate banner media
	const validateBannerMedia = () => {
		if (
			bannerMedia !== "" &&
			!bannerMedia.toLowerCase().endsWith(".jpg") &&
			!bannerMedia.toLowerCase().endsWith(".png") &&
			!bannerMedia.toLowerCase().endsWith(".jpeg")
		) {
			return false;
		}
		if (
			translations.te.bannerMedia.length !== 0 &&
			!translations.te.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
			!translations.te.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
			!translations.te.bannerMedia[0].toLowerCase().endsWith(".png")
		) {
			return false;
		}
		if (
			translations.hi.bannerMedia.length !== 0 &&
			!translations.hi.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
			!translations.hi.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
			!translations.hi.bannerMedia[0].toLowerCase().endsWith(".png")
		) {
			return false;
		}
		if (
			translations.ta.bannerMedia.length !== 0 &&
			!translations.ta.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
			!translations.ta.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
			!translations.ta.bannerMedia[0].toLowerCase().endsWith(".png")
		) {
			return false;
		}
		if (
			translations.kn.bannerMedia.length !== 0 &&
			!translations.kn.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
			!translations.kn.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
			!translations.kn.bannerMedia[0].toLowerCase().endsWith(".png")
		) {
			return false;
		}
		return true;
	};

	// const validateRedirectLink = () => {
	//   if (
	//     !redirectLink.startsWith("http://") &&
	//     !redirectLink.startsWith("https://")
	//   ) {
	//     return false;
	//   }
	//   return true;
	// };

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
			banner.tags = [];
			banner.bannerName = bannerName;
			banner.tags.push(tagName);
			banner.activeFrom = new Date(activeFrom).toISOString();
			banner.activeTo = new Date(activeTo).toISOString();
			banner.label = label;
			banner.redirectLink = redirectLink;
			banner.translations = translations;
			banner.language = postLanguage.value;
			banner.type = "kisan-banners";
			banner.specificAttributes.state = state.map((r) => r.value);
			banner.specificAttributes.district = district.map((r) => r.value);
			banner.specificAttributes.disease = pest.map((r) => r.value);
			banner.specificAttributes.crop = crop.map((r) => r.value);
			banner.specificAttributes.viewLimit = parseInt(viewLimit);
			banner.bannerDimensions = {
				height: 0,
				width: 0,
			};
			banner.contextType = bannerType.value;
			banner.contextId =
				bannerType.value === "collection"
					? `handleName=${contextId}::/handleTitle=${bannerName}`
					: contextId;

			await dispatch(postBanner(banner))
				.then(() => {
					// window.location.reload();
					Alert.success("Successfully added banner");
					setLanguage(postLanguage);
					setBannerName("");
					setBannerMedia("");
					setTagName("");
					setActiveTo("");
					setActiveFrom("");
					setRedirectLink("");
					setLabel("");
					setBannerType(bannerTypesData[3]);
					setContextId("");
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
					setViewLimit(0);
					setCrop([]);
					setDistrict([]);
					setPest([]);
					setState([]);
					setSubmitDisable(true);
					setDisableUpload(true);
					getKVBanners(postLanguage.value);
					setIsUploadClicked(false);
					setIsImageSelected(false);
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
		dispatch(deleteBanner(id)).then(() => {
			Alert.success("Successfully deleted banner");
			getKVBanners(language.value);
			//window.location.reload();
		});
	};

	return (
		<div>
			<div className="row">
				<div className="col-6  d-flex align-items-center">
					<h2 className="mainHeading">
						Kisan Vedika, Kisan Bazaar, Kisan Sandesh Banners
					</h2>
				</div>
				<div className="col-6">
					<div style={{ width: "200px", marginBottom: 10, float: "right" }}>
						<CustomSelect
							data={getLanguages()}
							placeholder="Select Language"
							search={false}
							onSelect={(value) => {
								setBannerMedia("");
								banner.bannerMedia = [];
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
								setPostLanguage(value);
								setDisableUpload(true);
								setRedirectLink("");
								setIsUploadClicked(false);
								setIsImageSelected(false);
							}}
							value={postLanguage}
						/>
					</div>
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
							<TextInput
								labelName="Tag Name:"
								id="tagName"
								value={tagName}
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								inputClass="inputStyle"
								onChange={(e) => {
									setTagName(e.target.value);
								}}
							/>
							<div className={"form-group"}>
								<label htmlFor={"news-district"} className="bannerLableStyle">
									District: (Optional)
								</label>
								<CustomSelect
									data={
										state.length > 0
											? [].concat(...state.map((r) => getDistricts(r.value)))
											: []
									}
									placeholder="Select Districts"
									search={true}
									onSelect={(value) => {
										if (value) setDistrict(value);
										else setDistrict([]);
									}}
									value={district}
									isMulti
								/>
							</div>
							<TextInput
								labelName="View Limit:"
								id="clicks"
								value={viewLimit}
								labelClass="bannerLableStyle"
								divClass="form-group"
								inputClass="inputStyle"
								onChange={(e) => setViewLimit(e.target.value)}
								type="number"
								min="0"
							/>
						</div>

						<div className="col-12 col-sm-6 col-md-4">
							<div className={"form-group disabled"}>
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
							<TextInput
								labelName="Label:"
								id="label"
								value={label}
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								inputClass="inputStyle"
								onChange={(e) => {
									setLabel(e.target.value);
								}}
							/>
							<div className={"form-group"}>
								<label htmlFor={"news-crop"} className="bannerLableStyle">
									Crop: (Optional)
								</label>
								<CustomSelect
									data={
										crops
											? crops.map((row) => {
													return {
														label: row.cropName,
														value: row.id,
													};
											  })
											: []
									}
									placeholder="Select Crops"
									search={true}
									onSelect={(value) => {
										if (value) setCrop(value);
										else setCrop([]);
									}}
									value={crop}
									isMulti
								/>
							</div>
							<div className="row">
								<div className="col-7">
									{isMediaLoading ? (
										<Spinner color="success" size="sm" />
									) : (
										<TextInput
											labelName="Banner Media:(jpg/jpeg, png)"
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
							<div className={"form-group"}>
								<label htmlFor={"news-state"} className="bannerLableStyle">
									State: (Optional)
								</label>
								<CustomSelect
									data={getStates()}
									placeholder="Select States"
									search={true}
									onSelect={(value) => {
										if (value) {
											setState(value);
										} else {
											setState([]);
										}
										setDistrict([]);
									}}
									value={state}
									isMulti
								/>
							</div>
							<div className={"form-group"}>
								<label htmlFor={"news-district"} className="bannerLableStyle">
									Pest: (Optional)
								</label>
								<CustomSelect
									data={
										diseases
											? diseases.map((row) => {
													return {
														label: row.name,
														value: row.id,
													};
											  })
											: []
									}
									placeholder="Select Pests"
									search={true}
									onSelect={(value) => {
										if (value) setPest(value);
										else setPest([]);
									}}
									value={pest}
									isMulti
								/>
							</div>
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
					<div style={{ width: "200px", margin: 10, float: "right" }}>
						<CustomSelect
							data={getLanguages()}
							placeholder="Select Language"
							search={false}
							onSelect={(value) => setLanguage(value)}
							value={language}
						/>
					</div>
					<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
						{isLoading ? (
							<PageLoader />
						) : (
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Banner Name</th>
										<th>Active From</th>
										<th>Active To</th>
										<th>Media</th>
										<th>View Limit</th>
										<th>Status</th>
										<th>Redirect Link</th>
										<th>Label</th>
										<th>Total Clicks</th>
										<th>&nbsp;</th>
										<th>&nbsp;</th>
									</tr>
								</thead>
								<tbody>
									{sortedKvBanners?.map((item, index) => (
										<tr key={index}>
											<td>{item.bannerName}</td>
											<td>{dateFormat(item.activeFrom, "dd/mm/yyyy")}</td>
											<td>{dateFormat(item.activeTo, "dd/mm/yyyy")}</td>
											<td>
												<a
													target="_blank"
													href={
														item.bannerMedia.length !== 0 &&
														item.bannerMedia[0]?.startsWith("banners")
															? constants.mediaUrl +
															  item.bannerMedia[0] +
															  constants.sasToken
															: item.bannerMedia[0]
													}
													rel="noreferrer"
												>
													<img
														src={
															item.bannerMedia.length !== 0 &&
															item.bannerMedia[0]?.startsWith("banners")
																? constants.mediaUrl +
																  item.bannerMedia[0] +
																  constants.sasToken
																: item.bannerMedia[0]
														}
														alt="Not Uploaded"
														className="cropDoctorResults"
													/>
												</a>
											</td>
											<td>{item.specificAttributes.viewLimit}</td>
											<td>
												{item.isActive ? (
													<div className="bgSuccess whiteText smPadding smBorderRadius">
														Active
													</div>
												) : (
													<div className="bgDanger whiteText smPadding smBorderRadius">
														Inactive
													</div>
												)}
											</td>
											<td>
												<a
													target="_blank"
													href={item.redirectLink}
													rel="noreferrer"
												>
													{`${item.bannerName} - Link`}
												</a>
											</td>
											<td>{item.label}</td>
											<td>{item.viewCount}</td>
											<td>
												<EditBanner
													id={item.id}
													minDate={dateFormat(item.activeFrom, "yyyy-mm-dd")}
													language={language.value}
													crops={crops}
													diseases={diseases}
													getBanners={getKVBanners}
												/>
											</td>
											<td>
												<DeleteRow
													id={item.id}
													name={item.bannerName}
													deleterow={delBanner}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default KVBanners;
