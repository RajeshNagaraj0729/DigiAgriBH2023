/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import dateFormat from "dateformat";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
*/
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import {
	fetchNativeBannersData,
	updateNativeBanner,
} from "../../../redux/actions/NativeStore/nativeStore";
import { removeQueryParamFromUrl } from "../../../Utils/utils";
import {
	getProductByHandle,
	getProductById,
} from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
import { bannerTypesData } from "../../../services/TablesData/CommonBannerTypesData";
import CustomSelect from "../../../components/Select/Select";

//Initial Object for update
const initialValue = {
	id: "",
	activeTo: "",
	bannerMedia: [],
	redirectLink: "",
	displayOrder: "",
	language: "",
	type: "home",
	bannerDimensions: {
		height: 0,
		width: 0,
	},
	label: "",
	specificAttributes: {
		viewLimit: 0,
		state: [],
		district: [],
		crop: [],
		disease: [],
	},
	bannerName: "",
};

/**
 * Edit Banner Implementation
 * @param {Object} props
 * props from Banners Page
 */
const EditNativeHomeBanner = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const banners = useSelector((state) => state.nativeStore);
	const selectedCollection = (banners?.nativeHomeBannerdata || []).filter(
		(r) => r.id === props.id
	)[0];
	const [selectedBanner, setSelectedBanner] = useState({});
	const [activeTo, setActiveTo] = useState("");
	const [redirectLink, setRedirectLink] = useState("");
	const [bannerPosition, setBannerPosition] = useState("");
	const [bannerMedia, setBannerMedia] = useState("");
	const [disableUpload, setDisableUpload] = useState(true);
	const [isBannerMediaLoading, setIsBannerMediaLoading] = useState(false);
	const [errmsg, seterrmsg] = useState("");
	const [isImageSelected, setIsImageSelected] = useState(false);
	const [isUploadClicked, setIsUploadClicked] = useState(false);
	const [showError, setShowError] = useState(false);
	const [bannerType, setBannerType] = useState({});
	const [contextId, setContextId] = useState("");
	const dispatch = useDispatch();
	const store = useStore();

	const redirectLinkToSet = selectedCollection?.redirectLink?.includes(
		"collection::" || "collections"
	)
		? selectedCollection?.redirectLink?.split("handleName=")[1].split("::/")[0]
		: selectedCollection?.redirectLink?.includes("extLink::")
		? selectedCollection?.redirectLink?.split("url=")[1].split("::/")[0]
		: selectedCollection?.redirectLink?.includes("product::" || "products")
		? selectedCollection?.redirectLink?.split("productId=")[1].split("::/")[0]
		: "";

	useEffect(() => {
		(async () => {
			if (banners && banners?.nativeHomeBannerdata.length != 0) {
				const selectedBanner = (banners?.nativeHomeBannerdata || []).filter(
					(r) => r?.id === props?.id
				)[0];
				setActiveTo(dateFormat(selectedBanner?.activeTo, "yyyy-mm-dd"));
				setBannerPosition(selectedBanner?.displayOrder);
				setBannerMedia(selectedBanner?.bannerMedia[0]);
				setSelectedBanner(selectedBanner || {});
				const productHandleToInsertInUrl = await extractProductHandle(
					selectedBanner?.redirectLink
				);
				setRedirectLink(
					selectedBanner?.redirectLink?.includes("collection::")
						? `https://www.bighaat.com/collections/${extractHandleName(
								selectedBanner?.redirectLink
						  )}`
						: selectedBanner?.redirectLink?.includes("extLink::")
						? extractedExternalUrl(selectedBanner?.redirectLink)
						: selectedBanner?.redirectLink.includes("product::")
						? `https://www.bighaat.com/products/${productHandleToInsertInUrl}`
						: selectedBanner?.redirectLink
				);
				setBannerType(
					selectedBanner?.redirectLink.includes("collection")
						? bannerTypesData[0]
						: selectedBanner?.redirectLink.includes("extLink")
						? bannerTypesData[2]
						: selectedBanner?.redirectLink.includes("products" || "product")
						? bannerTypesData[1]
						: bannerTypesData[3] // Provide a default value if none of the conditions match
				);
				setContextId(redirectLinkToSet);
			}
		})();
	}, [props?.id, banners?.nativeHomeBannerdata]);

	useEffect(() => {
		if (bannerPosition === "") {
			setShowError(false);
		}
		if (bannerMedia === "") {
			setIsImageSelected(false);
			setIsUploadClicked(false);
			setDisableUpload(true);
		}
		if (
			activeTo !== "" &&
			bannerMedia !== "" &&
			bannerMedia.length > 1 &&
			bannerPosition !== "" &&
			redirectLink !== "" &&
			(redirectLink !== redirectLinkToSet ||
				activeTo !== dateFormat(selectedBanner.activeTo, "yyyy-mm-dd") ||
				bannerMedia !== selectedBanner.bannerMedia[0] ||
				bannerPosition !== selectedBanner.displayOrder)
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [activeTo, bannerMedia, bannerPosition, redirectLink]);

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
		} else if (!redirectLink?.includes("https://www.bighaat.com/")) {
			setContextId(redirectLink);
			setBannerType(bannerTypesData[2]);
		}
	}, [redirectLink]);

	const urlWithoutQueryParam = removeQueryParamFromUrl(redirectLink);

	//Method for getting Collection HandleName from redirectLink Present In the native_storefront.products Mongo collection
	const extractHandleName = (str) => {
		const parts = str.split("collection::/handleName=");
		if (parts.length === 2) {
			// Extract the desired string from the second part
			const extractedString = parts[1].split("::/")[0];
			return extractedString;
		} else {
			console.log(
				"String format is not as expected FOR extractHandleName Method."
			);
		}
	};

	//Method for getting External Link from redirectLink Present In the native_storefront.products Mongo collection
	const extractedExternalUrl = (str) => {
		const parts = str.split("extLink::/url=");
		if (parts.length === 2) {
			// Extract the desired string from the second part
			const extractedString = parts[1].split("::/")[0];
			return extractedString;
		} else {
			console.log(
				"String format is not as expected for extractedExternalUrl Method."
			);
		}
	};

	//Method for getting Product Handle from redirectLink Present In the native_storefront.products Mongo collection
	const extractProductHandle = (str) => {
		const extractedId = extractProductId(str);
		const productHandle = getProductHandleById(extractedId);
		return productHandle;
	};

	/**
	 * Method for extracting product id to be passed in APi call
	 */
	const extractProductId = (link) => {
		const parts = link.split("product::/productId=");
		if (parts.length === 2) {
			return parts[1].split("::/")[0];
		} else {
			console.log(
				"String format is not as expected for extractProductId Method."
			);
		}
	};

	/*
	 *calling API to get handle by Product id
	 */
	const getProductHandleById = async (productId) => {
		try {
			const convertingStrtoInt = parseInt(productId);
			// Replace getProductById with your actual function to fetch product data
			const data = await getProductById(convertingStrtoInt);
			const result = data?.handle;
			return result;
		} catch (error) {
			console.error("Error fetching product handle", error);
		}
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
		return true;
	};

	//Edit Native Home banner submit
	const handleSubmit = async () => {
		if (isImageSelected && !isUploadClicked) {
			Alert.error("Please upload the selected image");
		} else if (!validateBannerMedia()) {
			Alert.error("Please enter a valid banner media");
		} else {
			initialValue.activeTo = new Date(activeTo).toISOString();
			initialValue.id = props.id;
			initialValue.bannerMedia = [];
			initialValue.bannerMedia.push(bannerMedia);
			initialValue.displayOrder = bannerPosition;
			initialValue.language = props.language;
			initialValue.bannerDimensions = {
				height: 0,
				width: 0,
			};
			initialValue.label = selectedBanner.label;
			initialValue.specificAttributes = selectedBanner.specificAttributes;
			initialValue.redirectLink = redirectLink.includes("collections")
				? `collection::/handleName=${contextId}::/handleTitle=${selectedBanner?.bannerName}`
				: redirectLink.includes("products")
				? `product::/productId=${contextId}`
				: `extLink::/url=${contextId}`;
			initialValue.bannerName = selectedBanner?.bannerName;
			await dispatch(updateNativeBanner(initialValue, props.language))
				.then(() => {
					handleModalClose();
					Alert.success("Updated Successfully");
					dispatch(
						fetchNativeBannersData(
							props.language,
							props.pagenum,
							props.pageAmount,
							props.type
						)
					);
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	//Upload Media Image
	const uploadMediaImage = async (file) => {
		setIsBannerMediaLoading(true);
		await dispatch(fileUpload(file)).then(() => {
			setIsBannerMediaLoading(false);
		});
	};

	//Modal Show
	const handleModalShow = () => {
		setShowModal(true);
	};

	//Modal Close
	const handleModalClose = async () => {
		setShowModal(false);
		setActiveTo(dateFormat(selectedBanner.activeTo, "yyyy-mm-dd"));
		setBannerMedia(selectedBanner.bannerMedia[0]);
		setBannerPosition(selectedBanner.displayOrder);
		setDisableUpload(true);
		setIsBannerMediaLoading(false);
		seterrmsg("");
		setIsImageSelected(false);
		setIsUploadClicked(false);
		setShowError(false);
		setDisable();
		const productHandleToInsertInUrl = await extractProductHandle(
			selectedBanner?.redirectLink
		);
		setRedirectLink(
			selectedBanner?.redirectLink?.includes("collection::")
				? `https://www.bighaat.com/collections/${extractHandleName(
						selectedBanner?.redirectLink
				  )}`
				: selectedBanner?.redirectLink?.includes("extLink::")
				? extractedExternalUrl(selectedBanner?.redirectLink)
				: selectedBanner?.redirectLink.includes("product::")
				? `https://www.bighaat.com/products/${productHandleToInsertInUrl}`
				: selectedBanner?.redirectLink
		);
	};

	return (
		<div>
			<button
				onClick={handleModalShow}
				className="btn btn-sm btn-warning"
				disabled={!!props.disable}
			>
				Edit
			</button>

			{/* Submit Modal Implementation */}
			<Modal
				show={showModal}
				onHide={handleModalClose}
				overflow={false}
				size={window.innerWidth < "991" ? "xs" : "sm"}
			>
				<Modal.Header closeButton>
					<div className="row">
						<div className="col-9">
							<Modal.Title className="mpdalTitle">
								Edit Native Home Banner
							</Modal.Title>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-12">
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Banner Name:</label>
								</div>
								<div className="col-7 d-flex">
									<p
										className="presentBannerNameStyle"
										style={{ wordBreak: "break-all" }}
									>
										{selectedBanner?.bannerName || ""}
									</p>
								</div>
							</div>
							<div className="row  mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Redirect Link:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setRedirectLink(e.target.value);
										}}
										value={redirectLink}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Banner Type:</label>
								</div>
								<div className="col-12 col-sm-6 col-md-6">
									<CustomSelect
										data={bannerTypesData}
										placeholder="Select Banner Type"
										value={bannerType}
										isDisabled={true}
									/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">
										{bannerType.label1}
									</label>
								</div>
								<div className="col-7 d-flex">
									<input
										type="text"
										value={contextId}
										className="inputStyle"
										disabled
									/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label
										className="bannerLableStyle"
										style={{ display: "block" }}
									>
										Banner Media:{" "}
										<span style={{ fontSize: "12px", color: "#ff0000" }}>
											(jpg/jpeg,png)
										</span>
									</label>
								</div>
								<div className="col-7 d-flex">
									{isBannerMediaLoading ? (
										<div className="col-8">
											<Spinner color="success" size="sm" />
										</div>
									) : (
										<input
											type="text"
											onChange={(e) => {
												setBannerMedia(e.target.value);
											}}
											value={bannerMedia}
											className="inputStyle"
										/>
									)}
									<div className="d-flex">
										<label
											htmlFor={"banner-lang-upload" + props.id}
											className="custom-file-upload btn btn-sm btn-light m-auto"
										>
											<i className="fa fa-picture-o"></i> Select
										</label>
										<Button
											className="custom-file-upload btn btn-sm btn-light m-auto"
											disabled={disableUpload}
											onClick={async () => {
												setDisableUpload(true);
												await uploadMediaImage(bannerMedia).then(() => {
													setIsUploadClicked(true);
													setBannerMedia(store.getState().fileUpload.data);
												});
											}}
										>
											<i className="fa fa-cloud-upload"></i> Upload
										</Button>
									</div>
									<input
										id={"banner-lang-upload" + props.id}
										type="file"
										style={{ display: "none" }}
										accept="image/*"
										onChange={(e) => {
											if (!e.target.files[0].type.startsWith("image/")) {
												Alert.error("Please upload a valid image");
											} else {
												setIsImageSelected(true);
												setDisableUpload(false);
												setBannerMedia(e.target.files[0]);
											}
										}}
									/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Active To:</label>
								</div>
								<div className="col-6">
									<input
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
										onChange={(e) => {
											setActiveTo(e.target.value);
										}}
										value={activeTo}
										className="inputStyle"
										min={props.minDate}
									/>
								</div>
								<div className="col-1"></div>
							</div>
							<div className="row">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Banner Position:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setBannerPosition(e.target.value);
										}}
										value={bannerPosition}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
							</div>
							<div className="row">
								<div className="col-1"></div>
								<div className="col-4"></div>
								<div
									className="col-6"
									style={{ color: "red", fontSize: "14px" }}
								>
									{showError ? errmsg : ""}
								</div>
								<div className="col-1"></div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="btn btn-sm btn-danger"
						onClick={handleModalClose}
						style={{ margin: "5px" }}
					>
						Close
					</Button>
					<Button
						className={
							disable ? "btn btn-sm btn-light" : "btn btn-sm btn-primary"
						}
						disabled={disable}
						onClick={() => {
							handleSubmit();
							setDisable(true);
						}}
						style={{ margin: "5px" }}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditNativeHomeBanner;
