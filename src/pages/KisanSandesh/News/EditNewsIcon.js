/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import {
	getNewsIcons,
	updateNewsIcon,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import { newsImageUpload } from "../../../redux/actions/KisanSandesh/kisanSandeshImageUpload";
import { validateImageUrl } from "../../../services/CommonServices";

//Initial Object for update
const initialValue = {
	id: "",
	imageUrl: "",
	source: "",
	height: "",
	width: "",
};

/**
 * Edit News Implementation
 * @param {Object} props
 * props from News Page
 */
const EditNewsIcon = (props) => {
	const store = useStore();

	const kisanVartha = useSelector((state) => state.kisanSandesh);

	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const selectedNewsIcon = kisanVartha.newsIcons.filter(
		(r) => r.id === props.id,
	)[0];
	const [disableUpload, setDisableUpload] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [source, setSource] = useState(selectedNewsIcon.source);
	const [imageUrl, setImageUrl] = useState(selectedNewsIcon.imageUrl);
	const [height, setHeight] = useState(selectedNewsIcon.height);
	const [width, setWidth] = useState(selectedNewsIcon.width);

	//Edit News Icon submit
	const handleSubmit = async () => {
		if (typeof imageUrl === "object") {
			Alert.error("Please upload the selected image");
		} else if (!validateImageUrl(imageUrl)) {
			Alert.error("Upload valid image (.jpg, .jpeg, .png)");
		} else {
			initialValue.id = props.id;
			initialValue.source = source;
			initialValue.imageUrl = imageUrl;
			initialValue.height = height;
			initialValue.width = width;
			await dispatch(updateNewsIcon(initialValue))
				.then(() => {
					handleModalClose();
					dispatch(getNewsIcons());
					Alert.success("Updated Successfully");
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	//Upload Media Image
	const uploadImage = async (file) => {
		setIsImageLoading(true);
		await dispatch(newsImageUpload(file))
			.then(() => {
				setImageUrl(store.getState().kisanSandeshImages.newsImageUrl);
				setIsImageLoading(false);
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
		setSource(selectedNewsIcon.source);
		setImageUrl(selectedNewsIcon.imageUrl);
		setHeight(selectedNewsIcon.height);
		setWidth(selectedNewsIcon.width);
		setDisableUpload(true);
		setDisable(true);
	};

	//Check for empty values
	useEffect(() => {
		if (
			source &&
			imageUrl &&
			(source !== selectedNewsIcon.source ||
				imageUrl !== selectedNewsIcon.imageUrl)
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [source, imageUrl]);
	return (
		<div>
			<button
				onClick={() => {
					handleModalShow();
					setSource(selectedNewsIcon.source);
					setImageUrl(selectedNewsIcon.imageUrl);
				}}
				className="btn btn-sm btn-warning"
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
							<Modal.Title className="mpdalTitle">Edit News</Modal.Title>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-12">
							<div className="row mb-3">
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Image Url:</label>
								</div>
								<div className="col-8 d-flex">
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
											htmlFor={"news-image-upload" + props.id}
											className="custom-file-upload btn btn-sm btn-light mx-1"
										>
											<i className="fa fa-picture-o"></i> Select
										</label>
										<Button
											className="custom-file-upload btn btn-sm btn-light mx-1"
											disabled={disableUpload}
											onClick={async () => {
												setDisableUpload(true);
												await uploadImage(imageUrl);
											}}
										>
											<i className="fa fa-cloud-upload"></i> Upload
										</Button>
									</div>
									<input
										id={"news-image-upload" + props.id}
										type="file"
										style={{ display: "none" }}
										accept="image/*"
										onChange={(e) => {
											if (!e.target.files[0].type.startsWith("image/")) {
												Alert.error("Please upload a valid image");
											} else {
												setDisableUpload(false);
												setImageUrl(e.target.files[0]);
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

							<div className="row mb-3">
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Source:</label>
								</div>
								<div className="col-8">
									<input
										type="text"
										onChange={(e) => {
											setSource(e.target.value);
										}}
										value={source}
										className="inputStyle"
									/>
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

export default EditNewsIcon;
