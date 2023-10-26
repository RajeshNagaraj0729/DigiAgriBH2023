/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert, Modal } from "rsuite";
import parse from "html-react-parser";
import { Accordion, Card } from "react-bootstrap";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */
import { PageLoader } from "../../components/Loading/Loading";
import * as Constants from "../../constants";
import Error from "../Error/Error";
import VisionTags from "../../services/TablesData/VisionTagsTable";
import EstimatedCropArea from "../../assets/images/estimatedCropAreaIcon.png";
import EstimatedAffectedArea from "../../assets/images/estimatedAffectedAreaIcon.png";
import { changeDiseaseName } from "../../redux/actions/CropDoc/fetchrows";
import CustomSelect from "../../components/Select/Select";
import {
	getBioProductByDiseaseId,
	getChemProductByDiseaseId,
} from "../../redux/actions/CropDoc/cropDocInfo";
import { isNoDiseaseFound } from "../../services/CommonServices";
import { plantParts } from "../../services/PlantParts";

//getting user detail for scm user access temporary fix
const loggedInUsers = JSON.parse(window.localStorage.getItem("user"));
const readAccess = loggedInUsers?.roleName;
//Initial edit disease object
const editDisease = {
	title: "",
	cropdocId: "",
	diseaseId: "",
	suggestion: "",
	imageUrl: "",
	expertTags: [],
	cropId: "",
	isNotification: false,
	partOfPlant: "",
};

//Languages
const languages = {
	en: "English",
	te: "Telugu",
	hi: "Hindi",
};

/**
 * Edit Disease Page
 */
const EditDisease = () => {
	const cropDocById = useSelector((state) => state.cropDocById);
	const diseases = useSelector((state) => state.cropDocInfo.diseases);
	const crops = useSelector((state) => state.cropDocInfo.crops);

	const [showValidateModal, setShowValidateModal] = useState(false);
	const [showDiseaseError, setShowDiseaseError] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [title, setTitle] = useState("");
	const [suggestion, setSuggestion] = useState("");
	const [name, setName] = useState("");
	const [cropId, setCropId] = useState("");
	const [sendNotification, setSendNotification] = useState(true);
	const productsInfo = useSelector((state) => state.cropDocInfo);
	const [isProductsLoading, setIsProductsLoading] = useState(false);
	const [plantPart, setPlantPart] = useState("");

	const store = useStore();
	const dispatch = useDispatch();

	let data = cropDocById?.data;

	const predictionData = data.visionPredictions || [];

	const stage1Data =
		data.tfStats?.stage1Predictions.length > 0
			? data.tfStats?.stage1Predictions
			: [];
	const stage2Data =
		data.tfStats?.stage2Predictions.length > 0
			? data.tfStats?.stage2Predictions
			: [];
	const stage3Data =
		data.tfStats?.stage3Predictions.length > 0
			? data.tfStats?.stage3Predictions
			: [];

	const getProducts = async (diseaseId) => {
		setIsProductsLoading(true);
		await dispatch(getChemProductByDiseaseId(diseaseId)).catch((err) => {
			Alert.error(err.message);
		});
		await dispatch(getBioProductByDiseaseId(diseaseId)).catch((err) => {
			Alert.error(err.message);
		});
		setIsProductsLoading(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		editDisease.title = title || data?.title;
		editDisease.cropdocId = data?.id;
		editDisease.diseaseId =
			selectedId ||
			(data.expertTags.length !== 0
				? data.expertTags[0]
				: data.diagnosisDetails && data.diagnosisDetails[0]?.causeInfo
				? data.diagnosisDetails[0]?.causeInfo[0]?.id
				: null);
		editDisease.suggestion = suggestion || data.suggestion || "";
		editDisease.imageUrl =
			Constants.mediaUrl + data.imageUrl + Constants.sasToken;
		editDisease.expertTags = [];
		editDisease.cropId = cropId.value || data.cropId || null;
		editDisease.isNotification = sendNotification;
		editDisease.partOfPlant = plantPart || data?.partOfPlant;
		if (editDisease.diseaseId && !editDisease.suggestion) {
			editDisease.suggestion = "Treatment";
		}
		if (!editDisease?.diseaseId && !editDisease?.suggestion) {
			setShowValidateModal(true);
		} else {
			await dispatch(changeDiseaseName(editDisease)).then(() => {
				if (
					!store.getState().totalResults.isLoading &&
					store.getState().totalResults.result === "Success"
				) {
					window.location.reload();
				} else {
					Alert.error("Can't update disease");
				}
			});
		}
	};

	useEffect(() => {
		if (!cropDocById.isLoading && data?.diseaseData.length !== 0) {
			getProducts(data?.diseaseData[0]?.id);
		}
		if (!cropDocById.isLoading && data.expertTags.length !== 0) {
			setShowDiseaseError(true);
		}
	}, [cropDocById.isLoading]);

	if (!data) {
		return <div>No Data</div>;
	}

	//Fetched Results Loading
	if (cropDocById.isLoading) {
		return <PageLoader />;
	}

	//Fetched Results Error
	else if (cropDocById.errmsg) {
		return <Error msg={cropDocById.errmsg} />;
	}

	//returning components for Edit Disease
	else {
		const initialName = cropDocById.data.diagnosisDetails
			? cropDocById.data.diagnosisDetails[0]?.causeInfo[0]?.name
			: cropDocById.data.cognitiveDetails &&
			  cropDocById.data.cognitiveDetails.cognitiveMessage
			? cropDocById.data.cognitiveDetails.cognitiveMessage
			: "No Disease Found";
		return (
			<div>
				<Modal
					overflow={false}
					show={showValidateModal}
					onHide={() => setShowValidateModal(false)}
				>
					<Modal.Header closeButton>
						<div className="row">
							<div className="col-9">
								<Modal.Title className="mpdalTitle">Alert</Modal.Title>
							</div>
						</div>
					</Modal.Header>
					<Modal.Body>
						<div className="modalBodyTextDiseaseName">
							<h6>Update Disease Name or Suggested Solution</h6>
						</div>
						<div className="modalBodyTextLeft">
							If disease name or suggested solution is not provided, update will
							not appear in crop doctor widget screen in app
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							className="btn btn-sm btn-danger"
							onClick={() => setShowValidateModal(false)}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
				{/* User Details */}
				<div className="row">
					<div className="col-4">
						<div className="userNameSec">
							<div>
								<img
									src={
										Constants.mediaUrl +
										data.userdata[0]?.profilePic +
										Constants.sasToken
									}
									height="50px"
									width="50px"
									style={{ borderRadius: "50%" }}
									alt={data.userdata[0]?.profilePic}
								/>
							</div>
							<div>
								<h2 className="userNameStyle">
									{data.userdata[0]?.firstName +
										" " +
										data.userdata[0]?.lastName}
								</h2>
								<p className="userMobileStyle">{data.userdata[0]?.phone}</p>
							</div>
						</div>
					</div>
					<div className="col-4">
						State:
						<p className="userMobileStyle">
							{data.userdata[0]?.detailedLocationInfo?.state}
						</p>
					</div>
					<div className="col-4 d-flex justify-content-end">
						{data.updateMsg ? (
							<div
								className="bgSuccess whiteText smPadding smBorderRadius"
								style={{ height: "35px" }}
							>
								Attended
							</div>
						) : (
							<div
								className="bgDanger whiteText smPadding smBorderRadius"
								style={{ height: "35px" }}
							>
								Unattended
							</div>
						)}
					</div>
				</div>

				{/* Crop Doc Image */}
				<div className="row">
					<div className="col-12 col-md-12 col-lg-5">
						<div className="tableMainSection cardShadow topUsersMainSec">
							<a
								href={Constants.mediaUrl + data.imageUrl + Constants.sasToken}
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={Constants.mediaUrl + data.imageUrl + Constants.sasToken}
									alt={data.imageUrl}
									className="w-100 visionTagsImg"
								/>
							</a>
						</div>
						{data.diseaseData && data.diseaseData.length > 0 ? (
							<div className="tableMainSection cardShadow topUsersMainSec">
								<Accordion defaultActiveKey="0">
									<Card>
										<Accordion.Toggle
											as={Card.Header}
											eventKey="0"
											style={{ cursor: "pointer" }}
										>
											<div className="row">
												<div className="col-11">
													<b>Observe for the following symptoms</b>
												</div>
												<div className="d-flex justify-content-end align-items-center col-1">
													<i className="fa fa-angle-down fa-lg"></i>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
											<Card.Body
												style={{
													height: "350px",
													overflowY: "auto",
												}}
											>
												{parse(data.diseaseData[0]?.symptoms)}
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle
											as={Card.Header}
											eventKey="1"
											style={{ cursor: "pointer" }}
										>
											<div className="row">
												<div className="col-11">
													<b>Recommended Treatment</b>
												</div>
												<div className="d-flex justify-content-end align-items-center col-1">
													<i className="fa fa-angle-down fa-lg"></i>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="1">
											<Card.Body
												style={{
													height: "350px",
													overflowY: "auto",
												}}
											>
												<Accordion defaultActiveKey="1.1">
													<Card>
														<Accordion.Toggle
															as={Card.Header}
															eventKey="1.1"
															style={{ cursor: "pointer" }}
														>
															<div className="row">
																<div className="col-11">
																	<b>Biological Treatment:</b>
																	<p>
																		Description:{" "}
																		{
																			data.diseaseData[0]?.treatment
																				?.biologicalTreatment
																				?.treatmentDescription
																		}
																	</p>
																</div>
																<div className="d-flex justify-content-end align-items-center col-1">
																	<i className="fa fa-angle-down fa-lg"></i>
																</div>
															</div>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="1.1">
															<Card.Body
																style={{
																	height: "350px",
																	overflowY: "auto",
																}}
															>
																{isProductsLoading ? (
																	<div
																		className="m-3 d-flex align-items-center justify-content-center"
																		style={{
																			height: "250px",
																		}}
																	>
																		<Spinner
																			style={{
																				width: "2rem",
																				height: "2rem",
																				fontSize: "1rem",
																				color: "green",
																			}}
																			size="sm"
																		/>
																	</div>
																) : (
																	<div className="row">
																		{productsInfo.bioProducts?.products?.map(
																			(r) => {
																				return (
																					<>
																						<div
																							className="col-6"
																							style={{
																								border: "1px #ddd solid",
																							}}
																						>
																							<a
																								href={
																									"https://www.bighaat.com/products/" +
																									r.handle
																								}
																								target="_blank"
																							>
																								<div>
																									<p>{r.title}</p>

																									<div>
																										<img
																											src={r.images[0]?.src}
																											alt={r.title}
																											height="200px"
																											width="150px"
																										/>
																									</div>
																								</div>
																							</a>
																						</div>
																						<hr />
																					</>
																				);
																			}
																		)}
																	</div>
																)}
															</Card.Body>
														</Accordion.Collapse>
													</Card>
													<Card>
														<Accordion.Toggle
															as={Card.Header}
															eventKey="1.2"
															style={{ cursor: "pointer" }}
														>
															<div className="row">
																<div className="col-11">
																	<b>Chemical Treatment:</b>
																	<p>
																		Description:{" "}
																		{
																			data.diseaseData[0]?.treatment
																				?.chemicalTreatment
																				?.treatmentDescription
																		}
																	</p>
																</div>
																<div className="d-flex justify-content-end align-items-center col-1">
																	<i className="fa fa-angle-down fa-lg"></i>
																</div>
															</div>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey="1.2">
															<Card.Body
																style={{
																	height: "350px",
																	overflowY: "auto",
																}}
															>
																{isProductsLoading ? (
																	<div
																		className="m-3 d-flex align-items-center justify-content-center"
																		style={{
																			height: "250px",
																		}}
																	>
																		<Spinner
																			style={{
																				width: "2rem",
																				height: "2rem",
																				fontSize: "1rem",
																				color: "green",
																			}}
																			size="sm"
																		/>
																	</div>
																) : (
																	<div className="row">
																		{productsInfo.chemProducts?.products?.map(
																			(r) => {
																				return (
																					<>
																						<div
																							className="col-6"
																							style={{
																								border: "1px #ddd solid",
																							}}
																						>
																							<a
																								href={
																									"https://www.bighaat.com/products/" +
																									r.handle
																								}
																								target="_blank"
																							>
																								<div>
																									<p>{r.title}</p>
																									<div>
																										<img
																											src={r.images[0]?.src}
																											alt={r.title}
																											height="200px"
																											width="150px"
																										/>
																									</div>
																								</div>
																							</a>
																						</div>
																						<hr />
																					</>
																				);
																			}
																		)}
																	</div>
																)}
															</Card.Body>
														</Accordion.Collapse>
													</Card>
												</Accordion>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle
											as={Card.Header}
											eventKey="2"
											style={{ cursor: "pointer" }}
										>
											<div className="row">
												<div className="col-11">
													<b>Steps to prevent the damage</b>
												</div>
												<div className="d-flex justify-content-end align-items-center col-1">
													<i className="fa fa-angle-down fa-lg"></i>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="2">
											<Card.Body
												style={{
													height: "350px",
													overflowY: "auto",
												}}
											>
												{parse(data.diseaseData[0]?.priventiveMeasures)}
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle
											as={Card.Header}
											eventKey="3"
											style={{ cursor: "pointer" }}
										>
											<div className="row">
												<div className="col-11">
													<b>Main reasons for the problem</b>
												</div>
												<div className="d-flex justify-content-end align-items-center col-1">
													<i className="fa fa-angle-down fa-lg"></i>
												</div>
											</div>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="3">
											<Card.Body
												style={{
													height: "350px",
													overflowY: "auto",
												}}
											>
												{parse(data.diseaseData[0]?.causeDescription)}
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</div>
						) : (
							<div></div>
						)}
					</div>

					<div className="col-12 col-md-12 col-lg-7">
						{data.metricStress &&
							(data.metricStress.estimatedCropArea !== 0 ||
								data.metricStress.estimatedStress !== 0) && (
								<div className="tableMainSection cardShadow topUsersMainSec">
									<h5>Metric Stress</h5>
									<div
										className="d-flex align-items-center"
										style={{ marginBottom: "10px" }}
									>
										<img
											src={EstimatedCropArea}
											alt="Estimated Crop Area"
											className="EstimatedCropAreaStyle"
										/>
										<p className="editDiseaseName my-0">
											Estimated Crop Area -{" "}
											{data.metricStress.estimatedCropArea} Acre
										</p>
									</div>
									<div className="d-flex align-items-center">
										<img
											src={EstimatedAffectedArea}
											alt="Estimated Affected Area"
											className="EstimatedAffectedAreaStyle"
										/>
										<p className="editDiseaseName my-0">
											Estimated Affected Area -{" "}
											{data.metricStress.estimatedStress}%
										</p>
									</div>
								</div>
							)}

						<div className="tableMainSection cardShadow topUsersMainSec">
							{/* Edit Disease modal */}

							<div style={{ display: "flex" }}>
								<div className="editDiseaseName">Disease Name:</div>
							</div>
							<div>
								{data.expertTags && data.expertTags.length !== 0 ? (
									<div className="bgSuccess whiteText smPadding smBorderRadius">
										{
											diseases.filter((r) => r.id === data.expertTags[0])[0]
												?.name
										}
									</div>
								) : data.diagnosisDetails === null ? (
									data.cognitiveDetails &&
									data.cognitiveDetails.cognitiveMessage ? (
										<div className="bgDanger whiteText smPadding smBorderRadius">
											{data.cognitiveDetails.cognitiveMessage}
										</div>
									) : (
										<div className="bgDanger whiteText smPadding smBorderRadius">
											No Data Found
										</div>
									)
								) : (
									<div className="bgSuccess whiteText smPadding smBorderRadius">
										{data.diagnosisDetails[0]?.causeInfo[0]?.name}
									</div>
								)}
							</div>

							<div className="row">
								<div className="col-12 col-sm-12 col-md-12 mb-2 mt-3 mb-md-0">
									<div className="mb-1 mb-md-3">
										<div className="modalBodyTextLeft">
											Notification Title :
										</div>
										<div>
											<input
												type="text"
												value={title || data.title}
												onChange={(e) => {
													setTitle(e.target.value);
												}}
												className="inputStyle"
											/>
										</div>
									</div>
									<div className="mb-1 mb-md-3">
										<div className="modalBodyTextLeft">
											{initialName === name.label ? "Detected" : "Updated"}{" "}
											Disease Name :
										</div>
										<div style={{ width: "100%" }}>
											{/* Can't add new disease coz of disease */}
											<CustomSelect
												data={
													diseases.length !== 0 &&
													diseases.map((row) => {
														return {
															label: row.name,
															value: row.id,
														};
													})
												}
												placeholder="Select Disease Name"
												onSelect={(options) => {
													setSelectedId(options.value);
													setName(options);
													if (isNoDiseaseFound(options.value, diseases)) {
														setShowDiseaseError(true);
													} else {
														setShowDiseaseError(false);
													}
												}}
												search={true}
												value={
													name || {
														label:
															data.expertTags && data.expertTags.length !== 0
																? diseases.filter(
																		(r) => r.id === data.expertTags[0]
																  )[0]?.name
																: data.diagnosisDetails &&
																  data.diagnosisDetails[0]?.causeInfo
																? data.diagnosisDetails[0]?.causeInfo[0]?.name
																: "Select Disease Name",
														value:
															data.expertTags && data.expertTags.length !== 0
																? data.expertTags[0]
																: data.diagnosisDetails &&
																  data.diagnosisDetails[0]?.causeInfo
																? data.diagnosisDetails[0]?.causeInfo[0]?.id
																: "Select Disease Name",
													}
												}
											/>
										</div>
										{showDiseaseError && (
											<div style={{ color: "red", fontSize: "14px" }}>
												This disease_cause doesn't have master disease details
											</div>
										)}
									</div>
									<div className="mb-1 mb-md-3">
										<div className="modalBodyTextLeft">User Language :</div>
										<div>
											<input
												type="text"
												value={
													data?.userdata &&
													languages[data.userdata[0]?.language]
												}
												readOnly
												className="inputStyle"
											/>
										</div>
									</div>
									<div className="mb-1 mb-md-3">
										<div className="modalBodyTextLeft">
											Suggested Solution :
										</div>
										<div>
											<textarea
												placeholder="Please enter your suggestion.."
												onChange={(e) => {
													setSuggestion(e.target.value);
												}}
												style={{ width: "100%" }}
												rows={3}
												value={suggestion || data.suggestion}
											/>
										</div>
									</div>
									<div className="mb-1 mb-md-3 row">
										<div className="col-6">
											<div className="modalBodyTextLeft">Crop Name :</div>
											<div style={{ width: "100%" }}>
												<CustomSelect
													data={
														crops.length !== 0 &&
														crops.map((row) => {
															return {
																label: row.cropName,
																value: row.id,
															};
														})
													}
													onSelect={(option) => {
														// let newTags = [...tags];
														// newTags.push(option.label);
														// setTags(newTags);
														setCropId(option);
													}}
													search={true}
													placeholder="Select Crop"
													value={
														cropId || {
															label:
																crops.filter((r) => r.id === data.cropId)[0]
																	?.cropName || "Select Crop Name",
															value: data.cropId || "Select Crop Name",
														}
													}
												/>
											</div>
										</div>
										<div className="col-6">
											<div className="modalBodyTextLeft">Part of Plant :</div>
											<div style={{ width: "100%" }}>
												<CustomSelect
													name={"crop-part"}
													data={plantParts}
													onSelect={(option) => {
														setPlantPart(option.value);
													}}
													search={true}
													placeholder="Select Plant Part"
													value={{
														label:
															plantPart ||
															data.partOfPlant ||
															"Select Plant Part",
														value: plantPart || data.partOfPlant,
													}}
												/>
											</div>
										</div>
									</div>
									<div className="mb-1 mb-md-3">
										<label className="modalBodyTextLeft">
											<input
												type="checkbox"
												checked={sendNotification}
												onChange={() => setSendNotification(!sendNotification)}
												style={{ marginRight: "5px" }}
											/>
											Send Push Notification
										</label>
									</div>
									<Button
										className={"btn btn-sm btn-primary"}
										onClick={handleSubmit}
										disabled={readAccess === "ReadOnly" ? true : false} //Condition added to disable this for SCM team
									>
										Submit
									</Button>
								</div>
							</div>
						</div>

						<div className="tableMainSection cardShadow topUsersMainSec">
							{/* Table for Vision Tags */}
							<div className="visionTagsSec">
								{predictionData.length !== 0 ? (
									<VisionTags data={predictionData} name="Vision Tags" />
								) : (
									<div>
										<VisionTags data={stage1Data} name="Stage 1 Predictions" />
										<VisionTags data={stage2Data} name="Stage 2 Predictions" />
										<VisionTags data={stage3Data} name="Stage 3 Predictions" />
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
export default EditDisease;
