/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Modal } from "rsuite";

/**
 * Custom Imports
 */
import "../BannersStyle.css";
import "../../../App.css";
import "./promoBanners.css";
import * as constants from "../../../constants";
import TextInput from "../../../components/Common/TextInput";
import NoImage from "../../../assets/images/noImgFoundPests.jpg";
import { PageLoader } from "../../../components/Loading/Loading";
import ErrorComponent from "../../../components/Error/Error";
import EditPromoBanner from "./EditPromoBanner";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
import CustomSelect from "../../../components/Select/Select";
import {
	createPromoBanners,
	fetchPromoBanners,
} from "../../../redux/actions/Banners/Promotional/promotionalBanners";
import { getLanguages } from "../../../services/Languages";

//promoBanner Object
const promoBanner = {
	type: "",
	imageUrl: "",
	isActive: true,
	msgContent: "",
	extraInfo: {
		couponCode: "",
		media: "",
		content: {
			heading: "",
			paragraph: "",
			footer: "",
		},
		disClaimer: "",
		steps: [],
	},
};

//Promotional Banners Page
const Promotional = () => {
	const dispatch = useDispatch();
	const store = useStore();
	const promoBanners = useSelector((state) => state.promoBanners);

	const [selectType, setSelectType] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [bannerMedia, setBannerMedia] = useState("");
	const [upload, setUpload] = useState(true);
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [file, setFile] = useState("");
	const [type, setType] = useState("");
	const [status, setStatus] = useState("");
	const [smsContent, setSmsContent] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [media, setMedia] = useState("");
	const [submitDisable, setSubmitDisable] = useState(true);
	const [content, setContent] = useState({
		header: "",
		paragraph: "",
		footer: "",
	});
	const [language, setLanguage] = useState({ label: "English", value: "en" });
	const [disclaimer, setDisclaimer] = useState("");
	const [steps, setSteps] = useState([]);
	const [isBannerLoading, setIsBannerLoading] = useState(false);
	const [isStepImageLoading, setIsStepImageLoading] = useState({
		loading: false,
		id: 0,
	});
	const [isExpanded, setIsExpanded] = useState({ expanded: false, id: 0 });
	const [isMediaLoading, setIsMediaLoading] = useState(false);

	//Get promo banners function
	const getBanners = async (lang) => {
		await dispatch(fetchPromoBanners(lang));
	};

	useEffect(() => {
		getBanners(language.value);
	}, [language]);

	//Check for fields in create banner
	useEffect(() => {
		if (
			type !== "" &&
			status !== "" &&
			smsContent !== "" &&
			couponCode !== "" &&
			(bannerMedia !== "" || imageUrl !== "") &&
			content.header !== "" &&
			content.paragraph !== "" &&
			content.footer !== "" &&
			disclaimer !== ""
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [
		type,
		status,
		smsContent,
		couponCode,
		bannerMedia,
		imageUrl,
		content,
		disclaimer,
	]);

	//Modal close for ImageUrl Modal
	const modalClose = () => {
		setShowModal(false);
	};

	//Upload file for banner url
	const uploadFile = async (e) => {
		e.preventDefault();
		setImage(URL.createObjectURL(file));
		setIsBannerLoading(true);
		await dispatch(fileUpload(file)).then(() => {
			setIsBannerLoading(false);
			if (!store.getState().fileUpload.isLoading) {
				setBannerMedia(store.getState().fileUpload.data);
				promoBanner.imageUrl = store.getState().fileUpload.data;
			}
		});
	};

	//Upload step Image
	const uploadStepImage = async (file, id) => {
		setIsStepImageLoading({ loading: true, id: id });
		await dispatch(fileUpload(file)).then(() => {
			setIsStepImageLoading({ loading: false, id: 0 });
		});
	};

	//Upload Media Image
	const uploadMediaImage = async (file) => {
		setIsMediaLoading(true);
		await dispatch(fileUpload(file)).then(() => {
			setIsMediaLoading(false);
		});
	};

	//Create Banner submit function
	const createBannerSubmit = async (e) => {
		e.preventDefault();
		promoBanner.type = type;
		promoBanner.isActive = status.value;
		promoBanner.msgContent = smsContent;
		promoBanner.extraInfo.couponCode = couponCode;
		promoBanner.extraInfo.content = content;
		promoBanner.extraInfo.disClaimer = disclaimer;
		promoBanner.extraInfo.steps = steps;
		promoBanner.extraInfo.media = media;
		if (selectType === "imageurl") {
			promoBanner.imageUrl = imageUrl;
		} else {
			promoBanner.imageUrl = bannerMedia;
		}
		await dispatch(createPromoBanners(promoBanner)).then(() => {
			if (store.getState().promoBanners.createMsg === "Success") {
				window.location.reload();
			}
		});
	};

	return (
		<div className="row">
			<Modal
				show={showModal}
				onHide={modalClose}
				overflow={false}
				size={window.innerWidth < "991" ? "xs" : "sm"}
			>
				<Modal.Body className="modalBodyText">
					<h5>File is already uploaded</h5>
					Do you want to enter Image URL?
				</Modal.Body>
				<Modal.Footer style={{ textAlign: "center" }}>
					<Button
						className="btn btn-sm btn-primary"
						type="submit"
						onClick={() => {
							setSelectType("imageurl");
							modalClose();
							setBannerMedia("");
						}}
						style={{ margin: "5px" }}
					>
						OK
					</Button>
					<Button
						className="btn btn-sm btn-danger"
						onClick={modalClose}
						style={{ margin: "5px" }}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="col-12">
				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Promotional Banner</h2>
					</div>
				</div>
				<div className="tableMainSection cardShadow space-md-inr">
					<form onSubmit={createBannerSubmit}>
						<div className="row">
							<div className="col-12 col-sm-6 col-md-4">
								<TextInput
									labelName="Type:"
									id="type"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) => setType(e.target.value)}
								/>
								<TextInput
									labelName="Msg Content:"
									id="smscontent"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) => setSmsContent(e.target.value)}
								/>
								<TextInput
									labelName="Content Header:"
									id="contentHeader"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) =>
										setContent({ ...content, header: e.target.value })
									}
								/>
								<TextInput
									labelName="Content Paragraph:"
									id="contentPara"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) =>
										setContent({ ...content, paragraph: e.target.value })
									}
								/>
								{isMediaLoading ? (
									<Spinner color="success" size="sm" />
								) : (
									<div className="row">
										<div className="col-8">
											<TextInput
												labelName="Media:"
												id="media"
												labelClass="bannerLableStyle"
												divClass="form-group"
												type="text"
												inputClass="inputStyle"
												value={media}
												onChange={(e) => setMedia(e.target.value)}
											/>
										</div>
										<div className="col-4 d-flex m-auto">
											<label
												htmlFor="file-upload"
												className="custom-file-upload btn btn-sm btn-light m-auto"
											>
												<i className="fa fa-picture-o"></i>
											</label>
											<Button
												className="custom-file-upload btn btn-sm btn-light m-auto"
												onClick={async () => {
													try {
														await uploadMediaImage(media).then(() => {
															setMedia(store.getState().fileUpload.data);
														});
													} catch (err) {
														console.error(err.message);
													}
												}}
											>
												<i className="fa fa-cloud-upload"></i>
											</Button>
										</div>
										<input
											id="file-upload"
											type="file"
											onChange={(e) => {
												setMedia(e.target.files[0]);
											}}
										/>
									</div>
								)}
							</div>

							<div className="col-12 col-sm-6 col-md-4">
								<div className="form-group">
									<label htmlFor="status" className="bannerLableStyle">
										Status:
									</label>
									<CustomSelect
										data={[
											{ label: "Active", value: true },
											{ label: "InActive", value: false },
										]}
										search={false}
										onSelect={(value) => setStatus(value)}
										name="select-type"
										placeholder="Select Status"
									/>
								</div>

								<TextInput
									labelName="Coupon Code:"
									id="couponcode"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) => setCouponCode(e.target.value)}
								/>
								<TextInput
									labelName="Content Footer:"
									id="contentFooter"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) =>
										setContent({ ...content, footer: e.target.value })
									}
								/>
								<TextInput
									labelName="Disclaimer:"
									id="disclaimer"
									labelClass="bannerLableStyle"
									divClass="form-group"
									type="text"
									inputClass="inputStyle"
									onChange={(e) => setDisclaimer(e.target.value)}
								/>
							</div>

							<div className="col-12 col-sm-6 col-md-4">
								<div className="row mb-2">
									<div className="col-6">
										<input
											type="radio"
											value="fileupload"
											name="type_of_upload"
											style={{ marginRight: "5px" }}
											checked={selectType === "fileupload"}
											onChange={(e) => setSelectType(e.target.value)}
										/>
										<label className="imgFileTxt">File Upload</label>
									</div>
									<div className="col-6">
										<input
											type="radio"
											value="imageurl"
											name="type_of_upload"
											onChange={(e) => {
												if (bannerMedia !== "") {
													setShowModal(true);
												} else {
													setSelectType(e.target.value);
												}
											}}
											style={{ marginRight: "5px" }}
											checked={selectType === "imageurl"}
										/>
										<label className="imgFileTxt">Image Url</label>
									</div>
								</div>
								{selectType === "fileupload" && (
									<div className="row mb-3">
										{isBannerLoading && (
											<div className="col-12" style={{ textAlign: "center" }}>
												<Spinner color="success" size="sm" />
											</div>
										)}
										{bannerMedia !== "" && (
											<div className="col-12">
												<div className="form-group">
													<label
														htmlFor="bannerMedia"
														className="bannerLableStyle"
													>
														Image:
													</label>
													<input
														name="bannerMedia"
														type="text"
														id="bannerMedia"
														className="inputStyle"
														value={bannerMedia}
														readOnly
													/>
												</div>
											</div>
										)}
										<div className="col-12">
											<div className="uploadImageStyle">
												<div>
													<img
														style={{ marginBottom: 10 }}
														src={image !== "" ? image : NoImage}
														alt="agriImage"
														width="100%"
														height="140px"
													/>
												</div>
												<div id="upload-box">
													<div className="mb-0">
														<input
															className="btn btn-sm btn-outline fileUploadStyle"
															type="file"
															onChange={(e) => {
																setFile(e.target.files[0]);
																setUpload(false);
															}}
														/>
														<button
															className="btn btn-md btn-success mt-md-2"
															onClick={uploadFile}
															disabled={upload}
														>
															Upload
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}{" "}
								{selectType === "imageurl" && (
									<div className="row mb-2 mb-md-0">
										<TextInput
											labelName="Image:"
											id="image"
											labelClass="bannerLableStyle"
											divClass="form-group col-12"
											type="text"
											inputClass="inputStyle"
											onChange={(e) => {
												setImageUrl(e.target.value);
											}}
										/>
									</div>
								)}
							</div>
						</div>
						<div className="col-8 mt-3">
							<div className="col-12">
								{steps.map((step, index) => {
									return (
										<div className="row mb-3" key={index}>
											<div className="col-2 d-flex align-items-center">
												<label className="bannerLableStyle">
													Step {index + 1}:
												</label>
											</div>
											<div className="col-5 d-flex align-items-center justify-content-center">
												{isStepImageLoading.loading &&
												isStepImageLoading.id === index ? (
													<Spinner color="success" size="sm" />
												) : (
													<div className="d-flex">
														<img
															src={
																constants.mediaUrl +
																step.image +
																constants.sasToken
															}
															height="auto"
															width="150px"
															alt={step.image.name || "Not Found"}
														/>
													</div>
												)}

												<div className="d-flex">
													<label
														htmlFor={"step-upload" + index.toString()}
														className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
													>
														<i className="fa fa-picture-o"></i>
													</label>
													<Button
														className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
														onClick={async () => {
															try {
																await uploadStepImage(step.image, index).then(
																	() => {
																		let newSteps = [...steps];
																		newSteps[index].image =
																			store.getState().fileUpload.data;
																		setSteps(newSteps);
																	}
																);
															} catch (err) {
																console.error(err.message);
															}
														}}
													>
														<i className="fa fa-cloud-upload"></i>
													</Button>
												</div>
												<input
													id={"step-upload" + index.toString()}
													type="file"
													style={{ display: "none" }}
													onChange={(e) => {
														let newSteps = [...steps];
														newSteps[index].image = e.target.files[0];
														setSteps(newSteps);
													}}
												/>
											</div>
											<div className="col-5 d-flex align-items-center">
												<input
													type="text"
													onChange={(e) => {
														let newSteps = [...steps];
														newSteps[index].content = e.target.value;
														setSteps(newSteps);
													}}
													value={step.content}
													className="inputStyle"
												/>
											</div>
											<div className="col-1"></div>
										</div>
									);
								})}
							</div>
							<div className="d-flex col-12 justify-content-center">
								<Button
									className="btn btn-sm btn-primary m-2"
									onClick={() =>
										setSteps(steps.concat({ content: "", image: "" }))
									}
								>
									Add Step
								</Button>
								<Button
									className="btn btn-sm btn-danger m-2"
									onClick={() => {
										setSteps(steps.slice(0, -1));
									}}
									disabled={steps.length === 0}
								>
									Remove Step
								</Button>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
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
			</div>

			<div className="col-12">
				<div style={{ width: "200px", margin: 10, float: "right" }}>
					<CustomSelect
						data={getLanguages()}
						placeholder="Select Language"
						search={false}
						onSelect={(value) => setLanguage(value)}
						value={language}
					/>
				</div>
				<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
					{promoBanners.isLoading ? (
						<PageLoader />
					) : promoBanners.errmsg ? (
						<ErrorComponent msg={promoBanners.errmsg} />
					) : (
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Image</th>
									<th>Msg Content</th>
									<th>Type</th>
									<th>Status</th>
									<th>Coupon Code</th>
									<th>Steps</th>
									<th style={{ width: "200px" }}>Disclaimer</th>
									<th>Content Heading</th>
									<th>Content Paragraph</th>
									<th>Content Footer</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								{promoBanners.data.map((row, index) => {
									return (
										<>
											<tr key={index}>
												<td>
													<a
														target="_blank"
														href={
															row.imageUrl.includes("banners")
																? constants.mediaUrl +
																  row.imageUrl +
																  constants.sasToken
																: row.imageUrl
														}
														rel="noreferrer"
													>
														<img
															src={
																row.imageUrl.includes("banners")
																	? constants.mediaUrl +
																	  row.imageUrl +
																	  constants.sasToken
																	: row.imageUrl
															}
															alt="Not Found"
															className="cropDoctorResults"
														/>
													</a>
													<button
														onClick={() =>
															setIsExpanded({
																expanded: !isExpanded.expanded,
																id: index,
															})
														}
														style={{ float: "left" }}
													>
														<i
															className={
																isExpanded.expanded && isExpanded.id === index
																	? "fa fa-chevron-down"
																	: "fa fa-chevron-right"
															}
														></i>
													</button>
												</td>
												<td>{row.msgContent || "N/A"}</td>
												<td>{row.type}</td>
												<td>
													{row.isActive ? (
														<div className="bgSuccess whiteText smPadding smBorderRadius">
															Active
														</div>
													) : (
														<div className="bgDanger whiteText smPadding smBorderRadius">
															InActive
														</div>
													)}
												</td>
												<td>{row.extraInfo.couponCode || "N/A"} </td>
												<td style={{ width: "300px" }}>
													{row.extraInfo.steps &&
														row.extraInfo.steps.map((r, i) => {
															return (
																<div key={i} style={{ textAlign: "left" }}>
																	<div>
																		<b>Step {i + 1}:</b>
																	</div>
																	<div>{r.content || "N/A"}</div>
																</div>
																// <table>
																//   <thead>
																//     <tr>
																//       {row.extraInfo.steps.map((r, i) => {
																//         return <th>Step {i + 1}</th>;
																//       })}
																//     </tr>
																//   </thead>
																//   <tbody>
																//     <tr>
																//       {row.extraInfo.steps.map((r, i) => {
																//         return (
																//           <td key={i}>{r.content || "N/A"}</td>
																//         );
																//       })}
																//     </tr>
																//   </tbody>
																// </table>
															);
														})}
												</td>
												<td style={{ width: "200px" }}>
													{row.extraInfo.disClaimer || "N/A"}
												</td>
												<td>{row.extraInfo.content.heading || "N/A"}</td>
												<td>{row.extraInfo.content.paragraph || "N/A"}</td>
												<td>{row.extraInfo.content.footer || "N/A"}</td>
												<td>
													<EditPromoBanner
														id={row.id}
														language={language.value}
													/>
												</td>
											</tr>
											{isExpanded.expanded && isExpanded.id === index && (
												<>
													<tr>
														<th>Media</th>
													</tr>
													<tr>
														<a
															target="_blank"
															href={
																row.extraInfo.media.includes("banners")
																	? constants.mediaUrl +
																	  row.extraInfo.media +
																	  constants.sasToken
																	: row.extraInfo.media
															}
															rel="noreferrer"
														>
															<img
																src={
																	row.extraInfo.media.includes("banners")
																		? constants.mediaUrl +
																		  row.extraInfo.media +
																		  constants.sasToken
																		: row.extraInfo.media
																}
																alt="Not Found"
																className="cropDoctorResults"
																style={{ height: "100%" }}
															/>
														</a>
													</tr>
												</>
											)}
										</>
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

export default Promotional;
