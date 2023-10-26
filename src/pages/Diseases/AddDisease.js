/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import RichTextEditor from "react-rte";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import CustomSelect, { CustomCreatable } from "../../components/Select/Select";
import { addDisease } from "../../redux/actions/AddPlantRecords/addPlantRecords";
import * as constants from "../../constants";
import { diseaseImageUpload } from "../../redux/actions/AddPlantRecords/plantImageUpload";
import { validateImageUrl } from "../../services/CommonServices";

/**
 * Toolbar configuration for rich text editor
 */
const toolbarConfig = {
	display: [
		"INLINE_STYLE_BUTTONS",
		"BLOCK_TYPE_BUTTONS",
		"BLOCK_TYPE_DROPDOWN",
	],
	INLINE_STYLE_BUTTONS: [
		{ label: "Bold", style: "BOLD", className: "custom-css-class" },
		{ label: "Italic", style: "ITALIC" },
		{ label: "Underline", style: "UNDERLINE" },
	],
	BLOCK_TYPE_DROPDOWN: [
		{ label: "Normal", style: "unstyled" },
		{ label: "Heading Large", style: "header-one" },
		{ label: "Heading Medium", style: "header-two" },
		{ label: "Heading Small", style: "header-three" },
	],
	BLOCK_TYPE_BUTTONS: [
		{ label: "UL", style: "unordered-list-item" },
		{ label: "OL", style: "ordered-list-item" },
	],
};

const stageCrop = {
	cropName: "",
	stageName: [],
};

const AddDisease = () => {
	const crops = useSelector((state) => state.cropDocInfo).crops;
	const diseases = useSelector((state) => state.cropDocInfo).diseases;
	const stageTypes = useSelector((state) => state.stageRecords).stageTypes;
	const store = useStore();

	const [symptoms, setSymptoms] = useState(() =>
		RichTextEditor.createEmptyValue()
	);
	const [causeDescription, setCauseDescription] = useState(() =>
		RichTextEditor.createEmptyValue()
	);
	const [description, setDescription] = useState(() =>
		RichTextEditor.createEmptyValue()
	);
	const [preventiveMeasures, setPreventiveMeasures] = useState(() =>
		RichTextEditor.createEmptyValue()
	);
	const [diseaseCause, setDiseaseCause] = useState("");
	const [imageUrls, setImageUrls] = useState([""]);
	const [isImageLoading, setIsImageLoading] = useState({
		loading: false,
		id: 0,
	});
	const [submitDisable, setSubmitDisable] = useState(true);
	const [chemicalTreatment, setChemicalTreatment] = useState("");
	const [biologicalTreatment, setBiologicalTreatment] = useState("");
	const [uploadDisable, setUploadDisable] = useState([true]);
	const [stageCrops, setStageCrops] = useState([stageCrop]);
	const [bioCollIds, setBioCollIds] = useState([]);
	const [chemCollIds, setChemCollIds] = useState([]);
	const [tChemicalTreatment, setTChemicalTreatment] = useState({
		te: "",
		hi: "",
	});
	const [tBlogicalTreatment, setTBiologicalTreatment] = useState({
		te: "",
		hi: "",
	});
	const [tSymptoms, setTSymptoms] = useState({
		te: RichTextEditor.createEmptyValue(),
		hi: RichTextEditor.createEmptyValue(),
	});
	const [tCauseDescription, setTCauseDescription] = useState({
		te: RichTextEditor.createEmptyValue(),
		hi: RichTextEditor.createEmptyValue(),
	});
	const [tDescription, setTDescription] = useState({
		te: RichTextEditor.createEmptyValue(),
		hi: RichTextEditor.createEmptyValue(),
	});
	const [tPreventiveMeasures, setTPreventiveMeasures] = useState({
		te: RichTextEditor.createEmptyValue(),
		hi: RichTextEditor.createEmptyValue(),
	});

	const dispatch = useDispatch();

	const checkImageUrl = () => {
		for (let i = 0; i < imageUrls.length; i++) {
			if (imageUrls[i] === "") {
				return false;
			}
		}
		return true;
	};

	//Check Stage Crops
	const checkStageCrops = () => {
		for (let i = 0; i < stageCrops.length; i++) {
			if (
				stageCrops[i].cropName === "" ||
				stageCrops[i].stageName.length === 0
			) {
				return false;
			}
		}
		return true;
	};

	useEffect(() => {
		if (
			symptoms.toString("html") !== "<p><br></p>" &&
			causeDescription.toString("html") !== "<p><br></p>" &&
			preventiveMeasures.toString("html") !== "<p><br></p>" &&
			diseaseCause &&
			chemicalTreatment &&
			biologicalTreatment &&
			// checkImageUrl() &&
			checkStageCrops()
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [
		diseaseCause,
		symptoms,
		stageCrops,
		causeDescription,
		preventiveMeasures,
		chemicalTreatment,
		biologicalTreatment,
		imageUrls,
	]);

	const uploadDiseaseImage = async (file, id) => {
		setIsImageLoading({ loading: true, id: id });
		await dispatch(diseaseImageUpload(file))
			.then(() => {
				setIsImageLoading({ loading: false, id: 0 });
			})
			.catch((err) => {
				setIsImageLoading({ loading: false, id: 0 });
				Alert.error(err.message);
			});
	};

	const imageValidation = () => {
		for (let i = 0; i < imageUrls.length; i++) {
			if (typeof imageUrls[i] === "object") {
				Alert.error("Upload selected Image");
				return false;
			}
			if (
				!validateImageUrl(imageUrls[i])
				// imageUrls[i] &&
				// !imageUrls[i].toLowerCase().endsWith(".jpg") &&
				// !imageUrls[i].toLowerCase().endsWith(".png") &&
				// !imageUrls[i].toLowerCase().endsWith(".jpeg")
			) {
				Alert.error("Enter a valid Image Url");
				return false;
			}
		}
		return true;
	};

	//Submit for Disease
	const submitDisease = async () => {
		if (imageValidation()) {
			const disease = {
				diseaseCauseId: diseaseCause,
				causeDescription: causeDescription.toString("html"),
				description: description.toString("html"),
				symptoms: symptoms.toString("html"),
				visionTags: [],
				priventiveMeasures: preventiveMeasures.toString("html"),
				treatment: {
					biologicalTreatment: {
						treatmentDescription: biologicalTreatment,
						collectionIds: bioCollIds,
					},
					chemicalTreatment: {
						treatmentDescription: chemicalTreatment,
						collectionIds: chemCollIds,
					},
				},
				stageCrops: stageCrops,
				imageUrls: imageUrls,
				translations: {
					te: {
						causeDescription:
							tCauseDescription.te.toString("html") !== "<p><br></p>"
								? tCauseDescription.te.toString("html")
								: "",
						description:
							tDescription.te.toString("html") !== "<p><br></p>"
								? tDescription.te.toString("html")
								: "",
						priventiveMeasures:
							tPreventiveMeasures.te.toString("html") !== "<p><br></p>"
								? tPreventiveMeasures.te.toString("html")
								: "",
						symptoms:
							tSymptoms.te.toString("html") !== "<p><br></p>"
								? tSymptoms.te.toString("html")
								: "",
						treatment: {
							biologicalTreatment: {
								treatmentDescription: tBlogicalTreatment.te,
							},
							chemicalTreatment: {
								treatmentDescription: tChemicalTreatment.te,
							},
						},
					},
					hi: {
						causeDescription:
							tCauseDescription.hi.toString("html") !== "<p><br></p>"
								? tCauseDescription.hi.toString("html")
								: "",
						description:
							tDescription.hi.toString("html") !== "<p><br></p>"
								? tDescription.hi.toString("html")
								: "",
						priventiveMeasures:
							tPreventiveMeasures.hi.toString("html") !== "<p><br></p>"
								? tPreventiveMeasures.hi.toString("html")
								: "",
						symptoms:
							tSymptoms.hi.toString("html") !== "<p><br></p>"
								? tSymptoms.hi.toString("html")
								: "",
						treatment: {
							biologicalTreatment: {
								treatmentDescription: tBlogicalTreatment.hi,
							},
							chemicalTreatment: {
								treatmentDescription: tChemicalTreatment.hi,
							},
						},
					},
				},
			};
			await dispatch(addDisease(disease)).then(() => {
				if (
					store.getState().plantRecords.diseaseError ||
					store.getState().plantRecords.diseaseResult !== "Success"
				) {
					Alert.error(
						store.getState().plantRecords.diseaseError || "Can't add Disease"
					);
				} else window.location.reload();
			});
		}
	};

	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h2 className="mainHeading">New Disease</h2>
				</div>
			</div>

			<div className="tableMainSection cardShadow p-3">
				<div className="row mb-4">
					<div
						className="col-12 p-3 mb-3"
						style={{ backgroundColor: "#f9f9f9" }}
					>
						{stageCrops.map((r, k) => {
							return (
								<div className="row mb-3">
									<div className="col-12 col-sm-2 align-self-center">
										<label className="bannerLableStyle">Crops:</label>
									</div>
									<div className="col-12 col-sm-4">
										<CustomSelect
											placeholder="Select Crops"
											search={true}
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
												let dupStageCrops = [...stageCrops];
												dupStageCrops[k].cropName = option.value;
												setStageCrops(dupStageCrops);
											}}
										/>
									</div>
									<div className="col-12 col-sm-2 align-self-center">
										<label className="bannerLableStyle">Stage Types:</label>
									</div>
									<div className="col-12 col-sm-4">
										<CustomSelect
											placeholder="Select Stage Types"
											search={true}
											isMulti={true}
											data={
												stageTypes
													? stageTypes.map((row) => {
															return {
																label: row.typeName,
																value: row.id,
															};
													  })
													: []
											}
											onSelect={(option) => {
												let dupStageCrops = [...stageCrops];
												dupStageCrops[k].stageName = option
													? option.map((r) => r.value)
													: [];
												setStageCrops(dupStageCrops);
											}}
										/>
									</div>
								</div>
							);
						})}
						<div className="col-12 d-flex justify-content-center">
							<Button
								className="btn btn-sm btn-success m-1"
								onClick={() => {
									setStageCrops(
										stageCrops.concat({ cropName: "", stageName: [] })
									);
								}}
							>
								<i className="fa fa-plus"></i> Add Stage Crop
							</Button>
							<Button
								className="btn btn-sm btn-danger m-1"
								onClick={() => {
									setStageCrops(stageCrops.slice(0, -1));
								}}
								disabled={stageCrops.length === 1}
							>
								<i className="fa fa-remove"></i> Remove Stage Crop
							</Button>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="row mb-3">
							<div className="col-12 col-sm-4 align-self-center">
								<label className="bannerLableStyle">Disease Cause:</label>
							</div>
							<div className="col-12 col-sm-8">
								<CustomSelect
									placeholder="Select Disease Causes"
									search={true}
									data={
										diseases.length !== 0 &&
										diseases.map((row) => {
											return {
												label: row.name,
												value: row.id,
											};
										})
									}
									onSelect={(option) => setDiseaseCause(option.value)}
								/>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-12 col-sm-4 align-self-center">
								<label className="bannerLableStyle">Image Urls:</label>
							</div>
							<div className="col-12 col-sm-8">
								{imageUrls.map((r, k) => {
									return (
										<div className="row mb-3" key={k}>
											<div className="col-12 align-items-center">
												<input
													type="text"
													className="inputStyle"
													value={r}
													onChange={(e) => {
														let dupImages = [...imageUrls];
														dupImages[k] = e.target.value;
														setImageUrls(dupImages);
													}}
												/>
											</div>
											{/* <div className="col-6 mt-2 d-flex">
                        <label
                          htmlFor={"image-upload" + k.toString()}
                          className="custom-file-upload btn btn-sm btn-light mx-1"
                        >
                          <i className="fa fa-picture-o"></i> Select
                        </label>
                        <Button
                          className="custom-file-upload btn btn-sm btn-light mx-1"
                          disabled={uploadDisable[k]}
                          onClick={async () => {
                            let disableUpload = [...uploadDisable];
                            disableUpload[k] = true;
                            setUploadDisable(disableUpload);
                            try {
                              await uploadDiseaseImage(r, k).then(() => {
                                let newImages = [...imageUrls];
                                newImages[
                                  k
                                ] = store.getState().plantImageUpload.diseaseImageUrl;
                                setImageUrls(newImages);
                              });
                            } catch (err) {
                              console.error(err.message);
                            }
                          }}
                        >
                          <i className="fa fa-cloud-upload"></i> Upload
                        </Button>
                      </div> */}

											<div className="col-12 d-flex align-items-center justify-content-center mt-2">
												{isImageLoading.loading && isImageLoading.id === k ? (
													<Spinner color="success" size="sm" />
												) : (
													<div className="d-flex">
														{r && (
															<img
																src={
																	typeof r !== "object" &&
																	r.startsWith("diseases/")
																		? constants.mediaUrl +
																		  r +
																		  constants.sasToken
																		: r
																}
																height="80px"
																width="100%"
																alt={r?.name || "Not Found"}
																className="notFoundTxt"
															/>
														)}
													</div>
												)}
												<input
													id={"image-upload" + k.toString()}
													type="file"
													style={{ display: "none" }}
													accept={"image/*"}
													onChange={(e) => {
														if (!e.target.files[0].type.startsWith("image/")) {
															Alert.error("Please upload a valid image");
														} else {
															let disableUpload = [...uploadDisable];
															disableUpload[k] = false;
															setUploadDisable(disableUpload);
															let newImages = [...imageUrls];
															newImages[k] = e.target.files[0];
															setImageUrls(newImages);
														}
													}}
												/>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<div className="row">
							<div className="col-12 d-flex justify-content-center">
								<Button
									className="btn btn-sm btn-success m-1"
									onClick={() => {
										setImageUrls(imageUrls.concat(""));
										setUploadDisable(uploadDisable.concat(true));
									}}
								>
									<i className="fa fa-plus"></i> Add Image
								</Button>
								<Button
									className="btn btn-sm btn-danger m-1"
									onClick={() => {
										setImageUrls(imageUrls.slice(0, -1));
										setUploadDisable(uploadDisable.slice(0, -1));
									}}
									disabled={imageUrls.length === 1}
								>
									<i className="fa fa-remove"></i> Remove Image
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Symptoms:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={symptoms}
							onChange={(value) => {
								setSymptoms(value);
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Cause Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={causeDescription}
							onChange={(value) => {
								setCauseDescription(value);
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={description}
							onChange={(value) => {
								setDescription(value);
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-5">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Preventive Measures:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={preventiveMeasures}
							onChange={(value) => {
								setPreventiveMeasures(value);
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Treatment</h2>
						<hr style={{ marginTop: "0rem" }} />
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Biological Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="biological"
									cols="50"
									className="w-100"
									onChange={(e) => setBiologicalTreatment(e.target.value)}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">Collection Ids:</label>
							</div>
							<div className="col-12 col-md-9">
								<CustomCreatable
									name={"collIdbio"}
									isMulti={true}
									placeholder="Add Collection Ids"
									onSelect={(values) => {
										if (values) setBioCollIds(values.map((r) => r.value));
										else setBioCollIds([]);
									}}
								/>
							</div>
						</div>

						{/* <div className="row mb-3">
          <div className="col-1"></div>
          <div className="col-3 align-self-center">
            <label className="bannerLableStyle">Products:</label>
          </div>
          <div className="col-3">
            <textarea name="crops" cols="50" />
          </div>
          <div className="col-1"></div>
        </div> */}
					</div>

					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Chemical Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="chemical"
									cols="50"
									className="w-100"
									onChange={(e) => setChemicalTreatment(e.target.value)}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">Collection Ids:</label>
							</div>
							<div className="col-12 col-md-9">
								<CustomCreatable
									name={"collIdbio"}
									isMulti={true}
									placeholder="Add Collection Ids"
									onSelect={(values) => {
										if (values) setChemCollIds(values.map((r) => r.value));
										else setChemCollIds([]);
									}}
								/>
							</div>
						</div>
						{/* <div className="row mb-3">
          <div className="col-1"></div>
          <div className="col-3 align-self-center">
            <label className="bannerLableStyle">Products:</label>
          </div>
          <div className="col-3">
            <textarea name="crops" cols="50" />
          </div>
          <div className="col-1"></div>
        </div> */}
					</div>
				</div>

				<hr className="mb-5" />
				<div className="row">
					<div className="col-12 mb-3">
						<h5 className="mainHeading">Telugu Translations</h5>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Symptoms:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tSymptoms.te}
							onChange={(value) => {
								setTSymptoms({ ...tSymptoms, te: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Cause Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tCauseDescription.te}
							onChange={(value) => {
								setTCauseDescription({ ...tCauseDescription, te: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tDescription.te}
							onChange={(value) => {
								setTDescription({ ...tDescription, te: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-5">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Preventive Measures:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tPreventiveMeasures.te}
							onChange={(value) => {
								setTPreventiveMeasures({ ...tPreventiveMeasures, te: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Treatment</h2>
						<hr style={{ marginTop: "0rem" }} />
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Biological Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="biological"
									cols="50"
									className="w-100"
									onChange={(e) =>
										setTBiologicalTreatment({
											...tBlogicalTreatment,
											te: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Chemical Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="chemical"
									cols="50"
									className="w-100"
									onChange={(e) =>
										setTChemicalTreatment({
											...tChemicalTreatment,
											te: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>

				<hr className="mb-5" />
				<div className="row">
					<div className="col-12 mb-3">
						<h5 className="mainHeading">Hindi Translations</h5>
					</div>
				</div>
				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Symptoms:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tSymptoms.hi}
							onChange={(value) => {
								setTSymptoms({ ...tSymptoms, hi: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Cause Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tCauseDescription.hi}
							onChange={(value) => {
								setTCauseDescription({ ...tCauseDescription, hi: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-4">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Description:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tDescription.hi}
							onChange={(value) => {
								setTDescription({ ...tDescription, hi: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row mb-5">
					<div className="col-12 col-md-2 align-self-center">
						<label className="bannerLableStyle">Preventive Measures:</label>
					</div>
					<div className="col-12 col-md-10">
						<RichTextEditor
							value={tPreventiveMeasures.hi}
							onChange={(value) => {
								setTPreventiveMeasures({ ...tPreventiveMeasures, hi: value });
							}}
							toolbarConfig={toolbarConfig}
							editorStyle={{ height: "200px" }}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Treatment</h2>
						<hr style={{ marginTop: "0rem" }} />
					</div>
				</div>

				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Biological Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="biological"
									cols="50"
									className="w-100"
									onChange={(e) =>
										setTBiologicalTreatment({
											...tBlogicalTreatment,
											hi: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6">
						<h6 className="subHeading mb-2">Chemical Treatment:</h6>
						<div className="row mb-3">
							<div className="col-12 col-md-3 align-self-center">
								<label className="bannerLableStyle">
									Treatment Description:
								</label>
							</div>
							<div className="col-12 col-md-9">
								<textarea
									name="chemical"
									cols="50"
									className="w-100"
									onChange={(e) =>
										setTChemicalTreatment({
											...tChemicalTreatment,
											hi: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
						<Button
							className="btn btn-sm"
							disabled={submitDisable}
							onClick={() => {
								submitDisease();
								setSubmitDisable(true);
							}}
						>
							Submit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddDisease;
