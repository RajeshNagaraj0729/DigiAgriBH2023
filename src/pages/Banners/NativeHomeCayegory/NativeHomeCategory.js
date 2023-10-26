//React Imports
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";

//Custom Imports
import CustomSelect from "../../../components/Select/Select";
import TextInput from "../../../components/Common/TextInput";
import { PageLoader } from "../../../components/Loading/Loading";
import ErrorComponent from "../../../components/Error/Error";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import * as constants from "../../../constants";
import "../BannersStyle.css";
import "../../../App.css";
import NativeHomeCategoryDataTable from "../../../services/TablesData/NativeHomeCategoryDataTable";
import {
	fetchCategoryData,
	deleteCategory,
	postCategory,
} from "../../../redux/actions/NativeStore/nativeStore";
import { productAdsImageUpload } from "../../../redux/actions/ProductAds/productsAdsImageUpload";

/**
 * category object
 */
const category = {
	title: "",
	name: "",
	url: "",
	imageUrl: null,
	showIn: "home",
	properties: {
		units: "",
		price: "",
		afterDiscount: "",
	},
	translations: {
		te: {
			title: "",
			name: "",
		},
		hi: {
			title: "",
			name: "",
		},
		ta: {
			title: "",
			name: "",
		},
		kn: {
			title: "",
			name: "",
		},
	},
};

/**
 *
 * @param {props} props
 */
const NativeHomeCategory = (props) => {
	const [pagination, setPagination] = useState(true);
	const [pageNum, setPagenum] = useState(1);
	const [pageAmount, setPageAmount] = useState(10);
	const [titleName, setTitleName] = useState("");
	const [handleName, setHandleName] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [tTitle, setTTitle] = useState({ te: "", hi: "", ta: "", kn: "" });
	const [tName, setTTName] = useState({ te: "", hi: "", ta: "", kn: "" });
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [submitDisable, setSubmitDisable] = useState(true);
	const [postLanguage, setPostLanguage] = useState({
		label: "English",
		value: "en",
	});
	const [disableUpload, setDisableUpload] = useState(true);
	const [disable, setDisable] = useState(true);
	const [isImageSelected, setIsImageSelected] = useState(false);
	const [isUploadClicked, setIsUploadClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const categories = useSelector((state) => state.nativeStore);
	const dispatch = useDispatch();
	const store = useStore();
	const results = useSelector(
		(state) => state.nativeStore?.nativeHomeCategorydata
	);
	const totalGridCount = results[0]?.filterCount;

	/**
	 * Getting category function
	 * @param {string}
	 */
	const getNativeHomeCategory = async (number, amount, showIn) => {
		await dispatch(fetchCategoryData(number, amount, showIn));
	};

	//Get Native Category
	useEffect(() => {
		getNativeHomeCategory(pageNum, pageAmount);
	}, []);

	/**
	 * file upload function
	 * @param {events} e
	 */
	const uploadImage = async (file, cantainerName) => {
		setIsImageLoading(true);
		await dispatch(productAdsImageUpload(file, cantainerName))
			.then(() => {
				setImageUrl(store.getState().adsImages?.productAdsImageUrl);
				Alert.success("Image uploaded Successfully");
				setIsImageLoading(false);
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};

	/**
	 * Delete banner implementation
	 * @param {ObjectId} id
	 */
	const delBanner = async (id) => {
		await dispatch(deleteCategory(id)).then(() => {
			Alert.success("Successfully deleted Native Category");
			getNativeHomeCategory(pageNum, pageAmount);
		});
	};

	//Check for create category
	useEffect(() => {
		if (
			titleName &&
			handleName &&
			imageUrl &&
			imageUrl.length > 1 &&
			tTitle.te &&
			tTitle.hi &&
			tTitle.ta &&
			tTitle.kn
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [
		titleName,
		handleName,
		imageUrl,
		tTitle.te,
		tTitle.hi,
		tTitle.ta,
		tTitle.kn,
	]);

	/**
	 * Create category submit implementation
	 */
	const handleSubmit = async () => {
		// if (isImageSelected && !isUploadClicked) {
		// 	Alert.error("Please upload the selected image");
		// } else if (!validateBannerMedia()) {
		// 	Alert.error("Please enter a valid banner media");
		// } else {
		category.title = titleName;
		category.name = handleName;
		category.imageUrl = imageUrl;
		(category.properties = {
			units: "",
			price: "",
			afterDiscount: "",
		}),
			(category.translations.te.title = tTitle.te);
		category.translations.hi.title = tTitle.hi;
		category.translations.ta.title = tTitle.ta;
		category.translations.kn.title = tTitle.kn;
		category.translations.te.name = handleName;
		category.translations.hi.name = handleName;
		category.translations.ta.name = handleName;
		category.translations.kn.name = handleName;

		await dispatch(postCategory(category))
			.then(() => {
				Alert.success("Successfully added Native Home category");
				setTitleName("");
				setHandleName("");
				setImageUrl("");
				setTTitle({ te: "", hi: "", ta: "", kn: "" });
				setSubmitDisable(true);
				setDisableUpload(true);
				getNativeHomeCategory(pageNum, pageAmount);
				setIsUploadClicked(false);
				setIsImageSelected(false);
			})
			.catch((err) => {
				Alert.error(err.message);
			});
		//}
	};

	return (
		<div>
			<div className="row">
				<div className="col-6  d-flex align-items-center">
					<h2 className="mainHeading">Native Home Categories</h2>
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
								labelName="Title:"
								id="titleName"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								value={titleName}
								inputClass="inputStyle"
								onChange={(e) => {
									setTitleName(e.target.value);
								}}
							/>
						</div>

						<div className="col-12 col-sm-6 col-md-4">
							<TextInput
								labelName="Handle Name"
								id="bannerName"
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								value={handleName}
								inputClass="inputStyle"
								onChange={(e) => {
									setHandleName(e.target.value);
								}}
							/>
						</div>
						<div className="col-12 col-sm-6 col-md-4">
							<div className="row">
								<div className="col-7">
									<div className="form-group">
										<label className="bannerLableStyle align-self-center">
											Category Media:
										</label>
										{isImageLoading ? (
											<Spinner color="success" size="sm" />
										) : (
											<TextInput
												id={"icon-productimageurl"}
												divClass="form-group"
												type="text"
												inputClass="inputStyle"
												value={imageUrl}
												onChange={(e) => {
													setImageUrl(e.target.value);
												}}
											/>
										)}
									</div>
								</div>
								<div className="col-5 d-flex m-auto">
									<label
										htmlFor={"icon-file-upload"}
										className="custom-file-upload btn btn-sm btn-light mx-1"
									>
										<i className="fa fa-picture-o"></i> Select
									</label>
									<Button
										className="custom-file-upload btn btn-sm btn-light mx-1"
										disabled={disableUpload}
										onClick={async () => {
											setDisableUpload(true);
											setDisable(false);
											await uploadImage(imageUrl, "products");
										}}
									>
										<i className="fa fa-cloud-upload"></i> Upload
									</Button>
								</div>
								<input
									id={"icon-file-upload"}
									type="file"
									style={{ display: "none" }}
									accept="image/*"
									onChange={(e) => {
										if (!e.target.files[0].type.startsWith("image/")) {
											Alert.error("Please upload a valid image");
										} else {
											setDisableUpload(false);
											setImageUrl(e.target.files[0]);
										}
									}}
									onClick={(e) => (e.target.value = "")}
								/>
							</div>
						</div>
						<div className="col-12 col-sm-4">
							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Telugu Translations</h5>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label className="bannerLableStyle align-self-center">
											Title:
										</label>
										<input
											type="text"
											value={tTitle.te}
											className="inputStyle"
											onChange={(e) => {
												setTTitle({ ...tTitle, te: e.target.value });
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-4">
							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Hindi Translations</h5>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label className="bannerLableStyle align-self-center">
											Title:
										</label>
										<input
											type="text"
											value={tTitle.hi}
											className="inputStyle"
											onChange={(e) => {
												setTTitle({ ...tTitle, hi: e.target.value });
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-4">
							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Tamil Translations</h5>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label className="bannerLableStyle align-self-center">
											Title:
										</label>
										<input
											type="text"
											value={tTitle.ta}
											className="inputStyle"
											onChange={(e) => {
												setTTitle({ ...tTitle, ta: e.target.value });
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-4">
							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Kannada Translations</h5>
								</div>
								<div className="col-12">
									<div className="form-group">
										<label className="bannerLableStyle align-self-center">
											Title:
										</label>
										<input
											type="text"
											value={tTitle.kn}
											className="inputStyle"
											onChange={(e) => {
												setTTitle({ ...tTitle, kn: e.target.value });
											}}
										/>
									</div>
								</div>
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
					<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
						{categories.isLoading ? (
							<PageLoader />
						) : (
							<NativeHomeCategoryDataTable
								callHandle={getNativeHomeCategory}
								pagination={pagination}
								results={results}
								pagenum={pageNum}
								pageAmount={pageAmount}
								setPagenum={setPagenum}
								setPageAmount={setPageAmount}
								total={totalGridCount}
								isLoading={isLoading}
								delBanner={delBanner}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default NativeHomeCategory;
