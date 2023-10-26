/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import { productAdsImageUpload } from "../../../redux/actions/ProductAds/productsAdsImageUpload";
import {
	fetchCategoryData,
	updateCategory,
} from "../../../redux/actions/NativeStore/nativeStore";

//Collection Object
const homeCategory = {
	id: "",
	title: "",
	url: "",
	name: "",
	displayOrder: "",
	imageUrl: null,
	isDeleted: false,
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
const EditNativeHomeCategory = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const [disableUpload, setDisableUpload] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({});
	const productAdsData = useSelector(
		(state) => state.nativeStore?.nativeHomeCategorydata
	);
	const productAds = productAdsData?.filter((r) => r.id === props.id)[0];
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [displayOrder, setDisplayOrder] = useState("");
	const [url, setUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [tTitle, setTTitle] = useState({
		te: "",
		hi: "",
		ta: "",
		kn: "",
	});
	const dispatch = useDispatch();
	const store = useStore();

	useEffect(() => {
		if (productAdsData.length != 0) {
			const selectedCategory = (productAdsData || []).filter(
				(r) => r.id === props.id
			)[0];
			setTitle(selectedCategory?.title);
			setName(selectedCategory?.name);
			setDisplayOrder(selectedCategory.displayOrder);
			setUrl(selectedCategory.url);
			setSelectedCategory(selectedCategory || {});
			setImageUrl(selectedCategory.imageUrl);
			setTTitle({
				te: selectedCategory?.translations.te.title,
				hi: selectedCategory?.translations.hi.title,
				ta: selectedCategory?.translations.ta.title,
				kn: selectedCategory?.translations.kn.title,
			});
		}
	}, [props?.id, productAdsData]);

	//Update collection submit
	const handleSubmit = async () => {
		homeCategory.title = title;
		homeCategory.name = name;
		homeCategory.url = url;
		homeCategory.displayOrder = displayOrder;
		homeCategory.imageUrl = imageUrl;
		homeCategory.id = props.id;
		homeCategory.properties = { units: "", price: "", afterDiscount: "" };
		homeCategory.translations.te.title = tTitle.te;
		homeCategory.translations.hi.title = tTitle.hi;
		homeCategory.translations.ta.title = tTitle.ta;
		homeCategory.translations.kn.title = tTitle.kn;
		homeCategory.translations.te.name = name;
		homeCategory.translations.hi.name = name;
		homeCategory.translations.ta.name = name;
		homeCategory.translations.kn.name = name;

		await dispatch(updateCategory(homeCategory))
			.then(() => {
				handleModalClose();
				dispatch(fetchCategoryData(props.pagenum, props.pageAmount));
				Alert.success("Updated Successfully");
			})
			.catch((err) => Alert.error(err.message));
		// }
	};

	//upload Image function
	const uploadImage = async (file, cantainerName) => {
		setIsImageLoading(true);
		await dispatch(productAdsImageUpload(file, cantainerName))
			.then(() => {
				setImageUrl(store.getState().adsImages?.productAdsImageUrl);
				setIsImageLoading(false);
				Alert.success("Image Uploaded successfully");
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};

	//Modal Show
	const handleModalShow = () => {
		setShowModal(true);
	};

	//Modal Close
	const handleModalClose = () => {
		setShowModal(false);
		setTitle(productAds.title);
		setName(productAds.name);
		setImageUrl(productAds.imageUrl);
		setDisplayOrder(productAds.displayOrder);
		setDisable(true);
		setTTitle({
			te: productAds.translations.te.title,
			hi: productAds.translations.hi.title,
			ta: productAds.translations.ta.title,
			kn: productAds.translations.kn.title,
		});
	};

	useEffect(() => {
		if (displayOrder === "") {
			setShowError(false);
		}
		if (imageUrl === "") {
			setDisableUpload(true);
		}
		if (
			title !== "" &&
			imageUrl !== "" &&
			imageUrl.length > 1 &&
			displayOrder !== "" &&
			name !== "" &&
			tTitle.te !== "" &&
			tTitle.hi !== "" &&
			tTitle.ta !== "" &&
			tTitle.kn !== "" &&
			(title !== selectedCategory.title ||
				imageUrl !== selectedCategory.imageUrl ||
				displayOrder !== selectedCategory.displayOrder ||
				name !== selectedCategory.name ||
				tTitle.te !== selectedCategory?.translations.te.title ||
				tTitle.hi !== selectedCategory?.translations.hi.title ||
				tTitle.ta !== selectedCategory?.translations.ta.title ||
				tTitle.kn !== selectedCategory?.translations.kn.title)
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [
		title,
		imageUrl,
		displayOrder,
		name,
		tTitle.te,
		tTitle.hi,
		tTitle.ta,
		tTitle.kn,
	]);

	return (
		<div>
			<button
				onClick={handleModalShow}
				className="btn btn-sm btn-warning"
				disabled={props.disable}
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
								Edit Native Home Category
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
									<label className="bannerLableStyle">Title:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setTitle(e.target.value);
											setDisable(false);
										}}
										value={title}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
							</div>

							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Handle Name:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setName(e.target.value);
											setDisable(false);
										}}
										value={name}
										className="inputStyle"
									/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">
										{" "}
										Category Media:
										<span style={{ fontSize: "12px", color: "#ff0000" }}>
											(jpg/jpeg,png)
										</span>
									</label>
								</div>
								<div className="col-7 d-flex">
									{isImageLoading ? (
										<div className="col-8">
											<Spinner color="success" size="sm" />
										</div>
									) : (
										<input
											type="text"
											onChange={(e) => {
												setImageUrl(e.target.value);
											}}
											value={imageUrl}
											className="inputStyle"
										/>
									)}
									<div className="d-flex">
										<label
											htmlFor={"kvProductsAds" + props.id}
											className="custom-file-upload btn btn-sm btn-light m-auto"
										>
											<i className="fa fa-picture-o"></i> Select
										</label>
										<Button
											className="custom-file-upload btn btn-sm btn-light m-auto"
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
										id={"kvProductsAds" + props.id}
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
									/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Display Order:</label>
								</div>
								<div className="col-6">
									<input
										min="0"
										type="text"
										onChange={(e) => {
											setDisplayOrder(e.target.value);
											setDisable(false);
										}}
										value={displayOrder}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
							</div>

							<div className="row mb-3">
								<div className="col-12">
									<h5 className="subHeading">Telugu Translations</h5>
								</div>
								<div className="col-12">
									<div className="row mb-3">
										<div className="col-1"></div>
										<div className="col-4">
											<label className="bannerLableStyle align-self-center">
												Title:
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												className="inputStyle"
												onChange={(e) => {
													setTTitle({ ...tTitle, te: e.target.value });
													setDisable(false);
												}}
												value={tTitle.te}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Hindi Translations</h5>
								</div>
								<div className="col-12">
									<div className="row mb-3">
										<div className="col-1"></div>
										<div className="col-4">
											<label className="bannerLableStyle align-self-center">
												Title:
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												className="inputStyle"
												onChange={(e) => {
													setTTitle({ ...tTitle, hi: e.target.value });
												}}
												value={tTitle.hi}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="row mb-3">
								<div className="col-12">
									<h5 className="subHeading">Tamil Translations</h5>
								</div>
								<div className="col-12">
									<div className="row mb-3">
										<div className="col-1"></div>
										<div className="col-4">
											<label className="bannerLableStyle align-self-center">
												Title:
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												className="inputStyle"
												onChange={(e) => {
													setTTitle({ ...tTitle, ta: e.target.value });
													setDisable(false);
												}}
												value={tTitle.ta}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="row mb-3">
								<div className="col-12">
									<h5 className="subHeading">Kannada Translations</h5>
								</div>
								<div className="col-12">
									<div className="row mb-3">
										<div className="col-1"></div>
										<div className="col-4">
											<label className="bannerLableStyle align-self-center">
												Title:
											</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												className="inputStyle"
												onChange={(e) => {
													setTTitle({ ...tTitle, kn: e.target.value });
													setDisable(false);
												}}
												value={tTitle.kn}
											/>
										</div>
									</div>
								</div>
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

export default EditNativeHomeCategory;
