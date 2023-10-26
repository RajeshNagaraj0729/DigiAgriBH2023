/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import {
	fetchNativeCollection,
	updateCollection,
} from "../../redux/actions/NativeStore/nativeStore";

//Collection Object
const initialValue = {
	title: "",
	handleName: "",
	displayOrder: "",
	translations: {
		te: {
			title: "",
		},
		hi: {
			title: "",
		},
		ta: {
			title: "",
		},
		kn: {
			title: "",
		},
	},
};

/**
 *
 * @param {props} props
 */
const EditNativeCollection = (props) => {
	const dispatch = useDispatch();
	const store = useStore();
	const collection = useSelector((state) => state.nativeStore);
	const selectedCollection = (
		collection?.nativeDynamicCollectionData || []
	).filter((r) => r.id === props.id)[0];
	const [showModal, setShowModal] = useState(false);
	const [disable, setDisable] = useState(true);
	const [title, setTitle] = useState(selectedCollection?.title);
	const [handleName, setHandleName] = useState(selectedCollection?.handleName);
	const [displayOrder, setDisplayOrder] = useState(
		selectedCollection?.displayOrder
	);
	const [tTitle, setTTitle] = useState({
		te: selectedCollection?.translations.te.title,
		ta: selectedCollection?.translations.ta.title,
		kn: selectedCollection?.translations.kn.title,
		hi: selectedCollection?.translations.hi.title,
	});

	//Update collection submit
	const handleSubmit = async () => {
		initialValue.title = title;
		initialValue.handleName = handleName;
		initialValue.displayOrder = displayOrder;
		initialValue.id = props.id;
		initialValue.translations.te.title = tTitle.te;
		initialValue.translations.hi.title = tTitle.hi;
		initialValue.translations.ta.title = tTitle.ta;
		initialValue.translations.kn.title = tTitle.kn;
		await dispatch(updateCollection(initialValue))
			.then(() => {
				handleModalClose();
				dispatch(fetchNativeCollection());
				Alert.success("Updated Successfully");
			})
			.catch((err) => Alert.error(err.message));
	};

	const handleModalShow = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
		setTitle(selectedCollection.title);
		setHandleName(selectedCollection.handleName);
		setDisplayOrder(selectedCollection.displayOrder);
		setTTitle({
			te: selectedCollection.translations.te.title,
			hi: selectedCollection.translations.hi.title,
			ta: selectedCollection.translations.ta.title,
			kn: selectedCollection.translations.kn.title,
		});
		setDisable(true);
	};

	useEffect(() => {
		if (
			title !== "" &&
			handleName !== "" &&
			displayOrder !== "" &&
			tTitle.te !== "" &&
			tTitle.hi !== "" &&
			tTitle.ta !== "" &&
			tTitle.kn !== "" &&
			(title !== selectedCollection.title ||
				handleName !== selectedCollection.handleName ||
				displayOrder !== selectedCollection.displayOrder ||
				tTitle.te !== selectedCollection.translations.te.title ||
				tTitle.hi !== selectedCollection.translations.hi.title ||
				tTitle.ta !== selectedCollection.translations.ta.title ||
				tTitle.kn !== selectedCollection.translations.kn.title)
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [
		title,
		handleName,
		displayOrder,
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
								Edit Native Dynamic Collection
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
											setHandleName(e.target.value);
											setDisable(false);
										}}
										value={handleName}
										className="inputStyle"
									/>
								</div>
								<div className="col-1"></div>
							</div>
							<div className="row">
								<div className="col-1"></div>
								<div className="col-4 align-self-center">
									<label className="bannerLableStyle">Display Position:</label>
								</div>
								<div className="col-6">
									<input
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
							<div className="row">
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

export default EditNativeCollection;
