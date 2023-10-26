// import React from "react";

/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */

import TextInput from "../../components/Common/TextInput";
import DeleteBanner from "../../components/Common/DeleteRow";
import { PageLoader } from "../../components/Loading/Loading";
import ErrorComponent from "../../components/Error/Error";
import EditHomeProducts from "./EditHomeProducts";

import * as constants from "../../constants";

import {
	fetchProductAds,
	createProductAds,
	deleteProductAds,
} from "../../redux/actions/ProductAds/ads";

import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

//initial object for crop
let homeProduct = {
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

const HomeProducts = () => {
	const dispatch = useDispatch();
	const [isImageLoading, setIsImageLoading] = useState(false);
	const store = useStore();
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [submitDisable, setSubmitDisable] = useState(true);
	const [tTitle, setTTitle] = useState({ te: "", hi: "", ta: "", kn: "" });
	const [homeProductsLoading, setHomeProductsLoading] = useState(true);
	const [disableUpload, setDisableUpload] = useState(true);
	const [handleName, setHandleName] = useState("");

	const productAds = useSelector((state) => state.ads)?.getProductAds;

	useEffect(() => {
		productAdsList();
	}, []);

	useEffect(() => {
		if (handleName && title && url && imageUrl && imageUrl.length > 1) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [handleName, title, url, imageUrl]);

	const productAdsList = async () => {
		setHomeProductsLoading(true);
		await dispatch(fetchProductAds("home"))
			.then(() => {})
			.catch((err) => {
				Alert.error(err.message);
			});
		setHomeProductsLoading(false);
	};

	const uploadImage = async (file, cantainerName) => {
		setIsImageLoading(true);
		await dispatch(productAdsImageUpload(file, cantainerName))
			.then(() => {
				setImageUrl(store.getState().adsImages?.productAdsImageUrl);
				Alert.success("Banner media added successfully");
				setIsImageLoading(false);
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};

	const delProductAds = async (id) => {
		await dispatch(deleteProductAds(id))
			.then(() => {
				productAdsList();
			})
			.catch((err) => Alert.error(err.message));
	};

	const submitCategory = async () => {
		homeProduct.title = title;
		homeProduct.url = url;
		homeProduct.imageUrl = imageUrl;
		homeProduct.translations.te.title = tTitle.te;
		homeProduct.translations.hi.title = tTitle.hi;
		homeProduct.translations.ta.title = tTitle.ta;
		homeProduct.translations.kn.title = tTitle.kn;
		homeProduct.contextId = handleName;

		await dispatch(createProductAds(homeProduct))
			.then(() => {
				Alert.success("Home Product Created Successfully");
			})
			.catch((err) => {
				Alert.error(err.message);
			});
		window.location.reload();
	};
	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h2 className="mainHeading">Add Home Product</h2>
				</div>
			</div>

			<div className="tableMainSection cardShadow p-3">
				<div className="row mb-2">
					<div className="col-12 col-sm-6 col-md-4">
						<div className="form-group">
							<label className="bannerLableStyle align-self-center">
								Handle Name:
							</label>
							<input
								type="text"
								className="inputStyle"
								onChange={(e) => {
									setHandleName(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="form-group">
							<label className="bannerLableStyle align-self-center">
								Title:
							</label>
							<input
								type="text"
								className="inputStyle"
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="form-group">
							<label className="bannerLableStyle align-self-center">
								Redirect Link:
							</label>
							<input
								type="text"
								className="inputStyle"
								onChange={(e) => {
									setUrl(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-md-4">
						<div className="row">
							<div className="col-7">
								<div className="form-group">
									<label className="bannerLableStyle align-self-center">
										Product Media:(jpg/jpeg, png)
									</label>
									{isImageLoading ? (
										<Spinner color="success" size="sm" />
									) : (
										<TextInput
											//labelName="Media Url:"
											id={"icon-productimageurl"}
											//labelClass="bannerLableStyle"
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
				</div>

				<div className="row mb-2">
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
							className="btn btn-md"
							disabled={submitDisable}
							onClick={() => {
								submitCategory();
								setSubmitDisable(true);
							}}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>

			<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
				{homeProductsLoading ? (
					<PageLoader />
				) : (
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Title</th>
								<th>Image</th>
								<th>Redirect Link</th>
								<th>Telugu Title</th>
								<th>Hindi Title</th>
								<th>Tamil Title</th>
								<th>Kannaada Title</th>
								<th style={{ width: "100px" }}></th>
								<th style={{ width: "100px" }}></th>
							</tr>
						</thead>
						<tbody>
							{productAds.map((row, index) => {
								return (
									<tr key={index} style={{ height: "50px" }}>
										<td>{row.title}</td>
										<td>
											<a
												target="_blank"
												href={
													row.length !== 0 &&
													row.imageUrl?.startsWith("products")
														? constants.mediaUrl + row.imageUrl
														: row.imageUrl
												}
												rel="noreferrer"
											>
												<img
													src={
														row.length !== 0 &&
														row.imageUrl?.startsWith("products")
															? constants.mediaUrl + row.imageUrl
															: row.imageUrl
													}
													alt="Not Uploaded"
													className="cropDoctorResults"
												/>
											</a>
										</td>
										<td>
											<a href={row.url} target="_blank" rel="noreferrer">
												{row.url}
											</a>
										</td>
										<td>{row.translations.te.title}</td>
										<td>{row.translations.hi.title}</td>
										<td>{row.translations.ta.title}</td>
										<td>{row.translations.kn.title}</td>
										<td style={{ width: "100px" }}>
											<EditHomeProducts
												id={row.id}
												refreshList={productAdsList}
											/>
										</td>
										<td style={{ width: "100px" }}>
											<DeleteBanner
												id={row.id}
												name={row.name}
												deleterow={delProductAds}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</div>
		</div>
	);
};

export default HomeProducts;
