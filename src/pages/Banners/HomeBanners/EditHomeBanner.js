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
import {
	fetchBannersData,
	getProductByHandle,
	updateBanner,
} from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import { bannerTypesData } from "../../../services/TablesData/CommonBannerTypesData";
import { removeQueryParamFromUrl } from "../../../Utils/utils";
import CustomSelect from "../../../components/Select/Select";

//Initial Object for update
const initialValue = {
	id: "",
	activeTo: "",
	bannerMedia: [],
	tags: [],
	redirectLink: "",
	displayOrder: 0,
	language: "",
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
	contextId: "",
	contextType: "",
};

/**
 * Edit Banner Implementation
 * @param {Object} props
 * props from Banners Page
 */
const EditBanner = (props) => {
	let notAllowedBannersPosition = props.notAllowedBannersPosition;
	let allowedBannerPositions =
		notAllowedBannersPosition.length > 0
			? [
					...Array(
						notAllowedBannersPosition[notAllowedBannersPosition.length - 1] + 2
					).keys(),
			  ].filter((r) => !notAllowedBannersPosition.includes(r))
			: [0, 1];
	const store = useStore();
	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const banners = useSelector((state) => state.banners);
	const dispatch = useDispatch();
	const [selectedBanner, setSelectedBanner] = useState({});
	const [tagName, setTagName] = useState("");
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
	const [contextId, setContextId] = useState("");
	const [bannerType, setBannerType] = useState({});

	useEffect(() => {
		if (banners && banners.data) {
			const selectedBanner = banners.data.filter((r) => r.id === props.id)[0];
			setTagName(selectedBanner?.tags?.length ? selectedBanner.tags[0] : "");
			setActiveTo(dateFormat(selectedBanner?.activeTo, "yyyy-mm-dd"));
			setRedirectLink(selectedBanner?.redirectLink);
			setBannerPosition(selectedBanner?.displayOrder);
			setBannerMedia(selectedBanner?.bannerMedia[0]);
			setSelectedBanner(selectedBanner || {});
			setContextId(
				selectedBanner?.contextType === "collection"
					? selectedBanner?.contextId?.split("handleName=")[1].split("::/")[0]
					: selectedBanner?.contextId
			);
			setBannerType(
				selectedBanner?.contextType === "collection"
					? bannerTypesData[0]
					: selectedBanner?.contextType === "product"
					? bannerTypesData[1]
					: bannerTypesData[2]
			);
		}
	}, [props?.id, banners?.data]);

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

	const urlWithoutQueryParam = removeQueryParamFromUrl(redirectLink);

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
			(tagName !== "" &&
				activeTo !== "" &&
				bannerMedia !== "" &&
				redirectLink !== "" &&
				bannerPosition !== "" &&
				(tagName !==
					(selectedBanner.tags === null ? "" : selectedBanner.tags[0]) ||
					activeTo !== dateFormat(selectedBanner.activeTo, "yyyy-mm-dd") ||
					bannerMedia !== selectedBanner.bannerMedia[0] ||
					redirectLink !== selectedBanner.redirectLink ||
					parseInt(bannerPosition) !== selectedBanner.displayOrder)) ||
			contextId !==
				(selectedBanner?.contextType === "collection"
					? selectedBanner?.contextId.split("handleName=")[1].split("::/")[0]
					: selectedBanner?.contextId)
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [tagName, activeTo, bannerMedia, redirectLink, bannerPosition]);

	//Validating Banners Position
	const validatePosition = (num) => {
		let index = notAllowedBannersPosition.indexOf(selectedBanner.displayOrder);
		let number = parseInt(num);
		if (index > -1) {
			notAllowedBannersPosition.splice(index, 1);
		}
		if (isNaN(num)) {
			seterrmsg("Please enter a number");
			return false;
		} else if (notAllowedBannersPosition.includes(number)) {
			seterrmsg("Banner position " + number + " is already present");
			return false;
		} else if (!allowedBannerPositions.includes(number) && num !== "") {
			seterrmsg("Allowed banners positions are " + allowedBannerPositions);
			return false;
		} else {
			seterrmsg("");
			return true;
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

	//Edit banner submit
	const handleSubmit = async () => {
		if (isImageSelected && !isUploadClicked) {
			Alert.error("Please upload the selected image");
		} else if (!validateBannerMedia()) {
			Alert.error("Please enter a valid banner media");
		} else if (
			bannerPosition !== selectedBanner.displayOrder &&
			!validatePosition(bannerPosition)
		) {
			setShowError(true);
		} else {
			initialValue.tags = [];
			initialValue.tags.push(tagName);
			initialValue.activeTo = new Date(activeTo).toISOString();
			initialValue.redirectLink = redirectLink;
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
			initialValue.contextType = bannerType.value;
			initialValue.contextId = redirectLink?.includes("collections")
				? `handleName=${contextId}::/handleTitle=${selectedBanner?.bannerName}`
				: contextId;

			await dispatch(updateBanner(initialValue, props.language))
				.then(() => {
					handleModalClose();
					dispatch(fetchBannersData(props.language));
					Alert.success("Updated Successfully");
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
	const handleModalClose = () => {
		setShowModal(false);
		setTagName(selectedBanner.tags === null ? "" : selectedBanner.tags[0]);
		setActiveTo(dateFormat(selectedBanner.activeTo, "yyyy-mm-dd"));
		setBannerMedia(selectedBanner.bannerMedia[0]);
		setBannerPosition(selectedBanner.displayOrder);
		setDisableUpload(true);
		setIsBannerMediaLoading(false);
		seterrmsg("");
		setIsImageSelected(false);
		setIsUploadClicked(false);
		setShowError(false);
		setRedirectLink(selectedBanner?.redirectLink);
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
							<Modal.Title className="mpdalTitle">Edit Banner</Modal.Title>
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
									<p className="presentBannerNameStyle">
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
									<label className="bannerLableStyle">Tag Name:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setTagName(e.target.value);
										}}
										value={tagName}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
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

export default EditBanner;
