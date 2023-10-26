/**
 * React imports
 */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Alert } from "rsuite";

/**
 * Custom Imports
 */
import "../Banners/BannersStyle.css";
import "../../App.css";
import TextInput from "../../components/Common/TextInput";
import DeleteBanner from "../../components/Common/DeleteRow";
import { PageLoader } from "../../components/Loading/Loading";
import ErrorComponent from "../../components/Error/Error";
import EditNativeCollection from "./EditNativeCollection";
import {
	fetchNativeCollection,
	createCollection,
	deleteCollection,
} from "../../redux/actions/NativeStore/nativeStore";

//Collection Object
const collectionObj = {
	title: "",
	handleName: "",
	isDeleted: false,
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

//Native Collection Implementation
const NativeCollection = () => {
	const collection = useSelector((state) => state.nativeStore);
	const dispatch = useDispatch();
	const store = useStore();

	const [title, setTitle] = useState("");
	const [handleName, setHandleName] = useState("");
	const [submitDisable, setSubmitDisable] = useState(true);
	const [tTitle, setTTitle] = useState({ te: "", hi: "", ta: "", kn: "" });

	/**
	 * get collection function
	 * @param {string} lang
	 */
	const getCollection = async () => {
		await dispatch(fetchNativeCollection());
	};

	useEffect(() => {
		getCollection();
	}, []);

	//Check fields for creation
	useEffect(() => {
		if (
			title !== "" &&
			handleName !== "" &&
			tTitle.te !== "" &&
			tTitle.hi !== "" &&
			tTitle.ta !== "" &&
			tTitle.kn !== ""
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [title, handleName, tTitle.te, tTitle.hi, tTitle.ta, tTitle.kn]);

	/**
	 * Delete collection Implementation
	 * @param {ObjectId} id
	 */
	const delCollection = (id) => {
		dispatch(deleteCollection(id)).then(() => {
			if (store.getState().nativeStore.deleteMsg === "Success") {
				Alert.success("Successfully deleted native collection");
				getCollection();
			}
		});
	};
	/**
	 * Create collection submit
	 * @param {events} e
	 */
	const createCollectionSubmit = async (e) => {
		e.preventDefault();
		collectionObj.title = title;
		collectionObj.handleName = handleName;
		collectionObj.translations.te.title = tTitle.te;
		collectionObj.translations.hi.title = tTitle.hi;
		collectionObj.translations.ta.title = tTitle.ta;
		collectionObj.translations.kn.title = tTitle.kn;
		await dispatch(createCollection(collectionObj)).then(() => {
			if (store.getState().nativeStore.createMsg === "Success") {
				Alert.success("Successfully added native collection");
				setTitle("");
				setHandleName("");
				setSubmitDisable(true);
				setTTitle({ te: "", hi: "", ta: "", kn: "" });
				getCollection();
			}
		});
	};

	return (
		<div className="row">
			<div className="col-12">
				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Native Dynamic Product Collection</h2>
					</div>
				</div>
				<div className="tableMainSection cardShadow space-md-inr">
					<form onSubmit={createCollectionSubmit}>
						<div className="row">
							<div className="col-12 col-sm-6 col-md-4">
								<TextInput
									labelName="Title:"
									id="title"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									value={title}
									inputClass="inputStyle"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="col-12 col-sm-6 col-md-4">
								<TextInput
									labelName="HandleName:"
									id="name"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									value={handleName}
									inputClass="inputStyle"
									onChange={(e) => setHandleName(e.target.value)}
								/>
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
							<div className="col-12  col-sm-6 col-md-3">
								<input
									type="submit"
									className="btn btn-md btn-primary"
									value="Submit"
									disabled={submitDisable}
								/>
							</div>
						</div>
					</form>
				</div>

				<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
					{collection.isLoading ? (
						<PageLoader />
					) : collection.errmsg ? (
						<ErrorComponent msg={collection.errmsg} />
					) : (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Title</th>
									<th>Handle Name</th>
									<th>Display Order</th>
									<th style={{ width: "100px" }}></th>
									<th style={{ width: "100px" }}></th>
								</tr>
							</thead>
							<tbody>
								{collection.nativeDynamicCollectionData?.map((row, index) => {
									return (
										<tr key={index} style={{ height: "50px" }}>
											<td>{row.title}</td>
											<td>{row.handleName}</td>
											<td>{row.displayOrder}</td>
											<td style={{ width: "100px" }}>
												<EditNativeCollection id={row.id} />
											</td>
											<td style={{ width: "100px" }}>
												<DeleteBanner
													id={row.id}
													name={row.handleName}
													deleterow={delCollection}
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
		</div>
	);
};

export default NativeCollection;
