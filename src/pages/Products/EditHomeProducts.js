/**
 * React imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom imports
 */
import { updateProductAds } from "../../redux/actions/ProductAds/ads";
import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

//Collection Object
let homeProduct = {
	id: "",
	title: "",
	url: "",
	name: "",
	displayOrder: 0,
	imageUrl: "",
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
	contextId: "",
};

/**
 *
 * @param {props} props
 */
const EditHomeProducts = (props) => {
	const dispatch = useDispatch();
	const store = useStore();

	const productAdsData = useSelector((state) => state.ads)?.getProductAds;
	const productAds = productAdsData.filter((r) => r.id === props.id)[0];

	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const [disableUpload, setDisableUpload] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [title, setTitle] = useState(productAds.title);
	const [url, setUrl] = useState(productAds.url);
	const [imageUrl, setImageUrl] = useState(productAds.imageUrl);
	const [tTitle, setTTitle] = useState({
		te: productAds.translations.te.title,
		hi: productAds.translations.hi.title,
		ta: productAds.translations.ta.title,
		kn: productAds.translations.kn.title,
	});
	const [handleName, setHandleName] = useState(productAds.contextId);

	//Update collection submit
	const handleSubmit = async () => {
		homeProduct.title = title;
		homeProduct.url = url;
		homeProduct.imageUrl = imageUrl;
		homeProduct.id = props.id;
		homeProduct.translations.te.title = tTitle.te;
		homeProduct.translations.hi.title = tTitle.hi;
		homeProduct.translations.ta.title = tTitle.ta;
		homeProduct.translations.kn.title = tTitle.kn;
		homeProduct.contextId = handleName;

		await dispatch(updateProductAds(homeProduct))
			.then(() => {
				handleModalClose();
				props.refreshList();
				Alert.success("Updated Successfully");
			})
			.catch((err) => Alert.error(err.message));
	};

	const uploadImage = async (file, cantainerName) => {
		setIsImageLoading(true);
		await dispatch(productAdsImageUpload(file, cantainerName))
			.then(() => {
				setImageUrl(store.getState().adsImages?.productAdsImageUrl);
				setIsImageLoading(false);
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};

	const handleModalShow = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setTitle(productAds.title);
		setHandleName(productAds.contextId);
		setUrl(productAds.url);
		setImageUrl(productAds.imageUrl);
		setTTitle({
			te: productAds.translations.te.title,
			hi: productAds.translations.hi.title,
			ta: productAds.translations.ta.title,
			kn: productAds.translations.kn.title,
		});
	};
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
								Edit Home Product Ads
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
								<div className="col-7 d-flex">
									<input
										type="text"
										onChange={(e) => {
											setHandleName(e.target.value);
											setDisable(false);
										}}
										value={handleName}
										className="inputStyle"
									/>
								</div>
							</div>
							{/* <div className="row mb-3">
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
							</div> */}

							<div className="row mb-3">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Redirect Link:</label>
								</div>
								<div className="col-6">
									<input
										type="text"
										onChange={(e) => {
											setUrl(e.target.value);
											setDisable(false);
										}}
										value={url}
										className="inputStyle"
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
											(jpg/jpeg, png)
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
											htmlFor={"productsAds" + props.id}
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
										id={"productsAds" + props.id}
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
								<div className="col-12">
									<h5 className="subHeading">Telugu Translations</h5>
								</div>
								<div className="col-12">
									<div className="row">
										<div className="col-1"></div>
										<div className="col-4 align-self-center">
											<label className="bannerLableStyle">Title:</label>
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
									<div className="row">
										<div className="col-1"></div>
										<div className="col-4 align-self-center">
											<label className="bannerLableStyle">Title:</label>
										</div>
										<div className="col-6">
											<input
												type="text"
												className="inputStyle"
												onChange={(e) => {
													setTTitle({ ...tTitle, hi: e.target.value });
													setDisable(false);
												}}
												value={tTitle.hi}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Tamil Translations</h5>
								</div>
								<div className="col-12">
									<div className="row">
										<div className="col-1"></div>
										<div className="col-4 align-self-center">
											<label className="bannerLableStyle">Title:</label>
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

							<div className="row">
								<div className="col-12">
									<h5 className="subHeading">Kannada Translations</h5>
								</div>
								<div className="col-12">
									<div className="row">
										<div className="col-1"></div>
										<div className="col-4 align-self-center">
											<label className="bannerLableStyle">Title:</label>
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
						onClick={handleSubmit}
						style={{ margin: "5px" }}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default EditHomeProducts;
