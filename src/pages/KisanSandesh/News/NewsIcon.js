import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import {
	getNewsIcons,
	createNewsIcons,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import { newsImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import { PageLoader } from "../../../components/Loading/Loading";
import TextInput from "../../../components/Common/TextInput";
import NewsIconsTable from "../../../services/TablesData/NewsIcons";
import { validateImageUrl } from "../../../services/CommonServices";

const initialObject = {
	source: "",
	imageUrl: "",
	height: "",
	width: "",
};

const NewsIcon = () => {
	const news = useSelector((state) => state.kisanSandesh);
	const store = useStore();
	const dispatch = useDispatch();
	const [source, setSource] = useState("");
	const [image, setImage] = useState("");
	const [disableUpload, setDisableUpload] = useState(true);
	const [submitDisable, setSubmitDisable] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);
	const [search, setSearch] = useState("");

	//Upload Icon Image
	const uploadImage = async (file) => {
		setIsImageLoading(true);
		await dispatch(newsImageUpload(file))
			.then(() => {
				setImage(store.getState().kisanSandeshImages.newsImageUrl);
				setIsImageLoading(false);
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};

	const fetchNewsIcons = async () => {
		await dispatch(getNewsIcons()).catch((err) => {
			Alert.error(err.message);
		});
	};

	useEffect(() => {
		fetchNewsIcons();
	}, []);

	useEffect(() => {
		if (source && image) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	});

	const handleSubmit = async () => {
		if (typeof image === "object") {
			Alert.error("Please upload the selected image");
		} else if (!validateImageUrl(image)) {
			Alert.error("Upload valid image (.jpg, .jpeg, .png)");
		} else {
			initialObject.source = source;
			initialObject.imageUrl = image;
			initialObject.height = height;
			initialObject.width = width;
			await dispatch(createNewsIcons(initialObject))
				.then(() => {
					Alert.success("Icon created successfully");
					setSource("");
					setImage("");
					setHeight(0);
					setWidth(0);
					fetchNewsIcons();
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h2 className="mainHeading">News Logos</h2>
				</div>
			</div>

			<div className="tableMainSection cardShadow space-md-inr">
				<form>
					<div className="row">
						<div className="col-12 col-sm-6 col-md-6">
							<TextInput
								labelName="Source:"
								id={"icon-source"}
								labelClass="bannerLableStyle"
								divClass="form-group"
								type="text"
								inputClass="inputStyle"
								value={source}
								onChange={(e) => {
									setSource(e.target.value);
								}}
							/>
						</div>

						<div className="col-12 col-sm-6 col-md-6">
							<div className="row">
								<div className="col-12">
									{isImageLoading ? (
										<Spinner color="success" size="sm" />
									) : (
										<TextInput
											labelName="Icon Url:"
											id={"icon-imageurl"}
											labelClass="bannerLableStyle"
											divClass="form-group"
											type="text"
											inputClass="inputStyle"
											value={image}
											onChange={(e) => {
												setImage(e.target.value);
											}}
										/>
									)}
								</div>
								<div className="col-5 col-lg-4 d-flex mb-2">
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
											await uploadImage(image);
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
											setImage(e.target.files[0]);
											var reader = new FileReader();
											reader.onload = function (e) {
												var img = new Image();
												img.onload = function () {
													setHeight(img.height);
													setWidth(img.width);
												};
												img.src = reader.result;
											};
											reader.readAsDataURL(e.target.files[0]);
										}
									}}
									onClick={(e) => (e.target.value = "")}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<Button
								className="btn btn-sm btn-primary"
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
					<div className="tableMainSection cardShadow newsIconTable">
						{news.newsIconsLoading ? (
							<PageLoader />
						) : (
							<>
								<div
									className="d-flex justify-items-end m-2"
									style={{
										width: "200px",
										position: "absolute",
										right: 15,
										zIndex: 2,
									}}
								>
									<input
										type="text"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										placeholder="search"
										className="inputStyle"
									/>
								</div>
								<NewsIconsTable
									data={news.newsIcons || []}
									searchValue={search}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsIcon;
