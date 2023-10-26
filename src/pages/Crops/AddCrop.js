/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useStore } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import { addCrop } from "../../redux/actions/AddPlantRecords/addPlantRecords";
import * as constants from "../../constants";
import { cropImageUpload } from "../../redux/actions/AddPlantRecords/plantImageUpload";

//initial object for crop
let crop = {
	cropName: "",
	cropCode: "",
	cropType: "",
	cropselectionOrder: 0,
	durationWeeks: 0,
	isDeleted: true,
	npkValues: [0, 0, 0],
	extraAttributes: {
		imageUrl: "",
		preferredTemperature: 0,
	},
	translations: {
		telugu: {
			cropName: "",
			cropType: "",
		},
		hindi: {
			cropName: "",
			cropType: "",
		},
	},
	isCropDoctorEnabled: false,
	tfCode: "",
};

const AddCrop = () => {
	const dispatch = useDispatch();
	const [isImageLoading, setIsImageLoading] = useState(false);
	const store = useStore();
	const [cropName, setCropName] = useState("");
	const [cropType, setCropType] = useState("");
	const [durationWeeks, setDurationWeeks] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [npkValues, setNpkValues] = useState([0, 0, 0]);
	const [submitDisable, setSubmitDisable] = useState(true);
	const [uploadDisable, setUploadDisable] = useState(true);
	const [durationWeeksErr, setDurationWeeksErr] = useState("");
	const [npkErr, setnpkErr] = useState("");
	const [tCropName, setTCropName] = useState({ te: "", hi: "" });
	const [tCropType, setTCropType] = useState({ te: "", hi: "" });
	const [cropOrder, setCropOrder] = useState(0);
	const [temp, setTemp] = useState(0);
	const [tfcode, setTfcode] = useState("");

	useEffect(() => {
		if (
			cropName &&
			cropType &&
			durationWeeks &&
			npkValues[0] !== 0 &&
			npkValues[1] !== 0 &&
			npkValues[2] !== 0 &&
			npkValues[0] &&
			npkValues[1] &&
			npkValues[2] &&
			temp &&
			tfcode
		) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [cropName, cropType, durationWeeks, imageUrl, npkValues, temp, tfcode]);

	const imageValidation = () => {
		if (typeof imageUrl === "object") {
			Alert.error("Upload selected Image");
		} else if (
			!imageUrl.toLowerCase().endsWith(".jpg") &&
			!imageUrl.toLowerCase().endsWith(".png") &&
			!imageUrl.toLowerCase().endsWith(".jpeg")
		) {
			Alert.error("Enter a valid Image Url");
			return false;
		} else {
			return true;
		}
	};

	const validateNumber = () => {
		if (
			isNaN(durationWeeks) ||
			isNaN(npkValues[0]) ||
			isNaN(npkValues[1]) ||
			isNaN(npkValues[2])
		) {
			if (isNaN(durationWeeks)) {
				setDurationWeeksErr("Enter a number");
			}
			if (isNaN(npkValues[0]) || isNaN(npkValues[1]) || isNaN(npkValues[2])) {
				setnpkErr("Enter a number");
			}
			return false;
		} else {
			return true;
		}
	};

	//Submitting crop form
	const submitCrop = async () => {
		if (validateNumber()) {
			crop.cropName = cropName;
			crop.cropCode = cropName;
			crop.cropType = cropType;
			crop.durationWeeks = parseInt(durationWeeks);
			crop.npkValues[0] = parseInt(npkValues[0]);
			crop.npkValues[1] = parseInt(npkValues[1]);
			crop.npkValues[2] = parseInt(npkValues[2]);
			crop.extraAttributes.imageUrl = imageUrl;
			crop.translations.telugu.cropName = tCropName.te;
			crop.translations.hindi.cropName = tCropName.hi;
			crop.translations.telugu.cropType = tCropType.te;
			crop.translations.hindi.cropType = tCropType.hi;
			crop.extraAttributes.preferredTemperature = parseInt(temp);
			crop.cropselectionOrder = parseInt(cropOrder);
			crop.tfCode = tfcode;
			await dispatch(addCrop(crop)).then(() => {
				if (
					store.getState().plantRecords.cropError ||
					store.getState().plantRecords.cropResult !== "Success"
				) {
					Alert.error(
						store.getState().plantRecords.cropError || "Can't add Crop"
					);
				} else {
					Alert.success("Successfully added crop", 3000);
					window.location.reload();
				}
			});
		}
	};

	//Uploading Crop Image
	const uploadCropImage = async (file) => {
		setIsImageLoading(true);
		await dispatch(cropImageUpload(file))
			.then(() => {
				setIsImageLoading(false);
			})
			.catch((err) => {
				setIsImageLoading(false);
				Alert.error(err.message);
			});
	};
	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h2 className="mainHeading">Add Crop</h2>
				</div>
			</div>

			<div className="tableMainSection cardShadow p-3">
				<div className="row">
					<div className="col-12 col-sm-6">
						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Name:</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setCropName(e.target.value);
									}}
								/>
							</div>
						</div>

						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Type:</label>
							</div>
							<div className="col-12 col-md-8">
								<CustomSelect
									placeholder="Select Crop Type"
									data={[
										{
											label: "Horticulture Crops",
											value: "horticulture crops",
										},
										{
											label: "Field Crops",
											value: "field crops",
										},
									]}
									onSelect={(option) => {
										setCropType(option.value);
									}}
								/>
							</div>
						</div>

						{/* <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Crop Order:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setCropOrder(e.target.value);
                  }}
                />
              </div>
            </div> */}

						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">TF Code:</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setTfcode(e.target.value);
									}}
								/>
							</div>
						</div>

						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Image:</label>
							</div>
							<div className="col-12 col-md-8">
								<div className="row">
									<div className="col-12 col-lg-12 align-items-center">
										<input
											type="text"
											className="inputStyle"
											value={imageUrl}
											onChange={(e) => {
												setImageUrl(e.target.value);
											}}
										/>
									</div>
									{/* <div className="col-6 col-lg-6 mt-2 d-flex">
                    <label
                      htmlFor={"crop-image-upload"}
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light mx-1"
                      disabled={uploadDisable}
                      onClick={async () => {
                        setUploadDisable(true);
                        try {
                          await uploadCropImage(imageUrl).then(() => {
                            setImageUrl(
                              store.getState().plantImageUpload.cropImageUrl
                            );
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
										{isImageLoading ? (
											<Spinner color="success" size="sm" />
										) : (
											<div className="d-flex">
												{imageUrl && (
													<img
														src={
															typeof imageUrl !== "object" &&
															imageUrl.startsWith("crop/")
																? constants.mediaUrl +
																  imageUrl +
																  constants.sasToken
																: imageUrl
														}
														height="80px"
														width="100%"
														alt={imageUrl.name || "Not Found"}
														className="notFoundTxt"
													/>
												)}
											</div>
										)}
										<input
											id={"crop-image-upload"}
											type="file"
											style={{ display: "none" }}
											accept="image/*"
											onChange={(e) => {
												if (!e.target.files[0].type.startsWith("image/")) {
													Alert.error("Please upload a valid image");
												} else {
													setImageUrl(e.target.files[0]);
													setUploadDisable(false);
												}
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-12 col-sm-6">
						<div className="row">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Duration Weeks:</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setDurationWeeksErr("");
										setDurationWeeks(e.target.value);
									}}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-12 col-md-4"></div>
							<div
								className="col-12 col-md-8"
								style={{ color: "red", fontSize: "14px" }}
							>
								{durationWeeksErr}
							</div>
						</div>

						<div className="row">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">NPK Values:</label>
							</div>
							<div className="col-12 col-md-8">
								<div className="row">
									<div className="col-4">
										<input
											type="text"
											className="inputStyle"
											onChange={(e) => {
												setnpkErr("");
												let npk = [...npkValues];
												npk[0] = e.target.value;
												setNpkValues(npk);
											}}
										/>
									</div>
									<div className="col-4">
										<input
											type="text"
											className="inputStyle"
											onChange={(e) => {
												setnpkErr("");
												let npk = [...npkValues];
												npk[1] = e.target.value;
												setNpkValues(npk);
											}}
										/>
									</div>
									<div className="col-4">
										<input
											type="text"
											className="inputStyle"
											onChange={(e) => {
												setnpkErr("");
												let npk = [...npkValues];
												npk[2] = e.target.value;
												setNpkValues(npk);
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-4"></div>
							<div className="col-8" style={{ color: "red", fontSize: "14px" }}>
								{npkErr}
							</div>
						</div>

						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">
									Preferred Temperature:
								</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setTemp(e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mb-3">
						<h5 className="subHeading">Telugu Translations</h5>
					</div>
					<div className="col-12 col-sm-6">
						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Name:</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setTCropName({ ...tCropName, te: e.target.value });
									}}
								/>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6">
						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Type:</label>
							</div>
							<div className="col-12 col-md-8">
								<CustomSelect
									placeholder="Select Crop Type"
									data={[
										{
											label: "Horticulture Crops",
											value: "ఉద్యాన పంటలు",
										},
										{
											label: "Field Crops",
											value: "పొలాలు పంటలు",
										},
									]}
									onSelect={(option) => {
										setTCropType({ ...tCropType, te: option.value });
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-12 mb-3">
						<h5 className="subHeading">Hindi Translations</h5>
					</div>
					<div className="col-12 col-sm-6">
						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Name:</label>
							</div>
							<div className="col-12 col-md-8">
								<input
									type="text"
									className="inputStyle"
									onChange={(e) => {
										setTCropName({ ...tCropName, hi: e.target.value });
									}}
								/>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-6">
						<div className="row mb-3">
							<div className="col-12 col-md-4 align-self-center">
								<label className="bannerLableStyle">Crop Type:</label>
							</div>
							<div className="col-12 col-md-8">
								<CustomSelect
									placeholder="Select Crop Type"
									data={[
										{
											label: "Horticulture Crops",
											value: "उद्यानिकी फसलें",
										},
										{
											label: "Field Crops",
											value: "खेत की फसल",
										},
									]}
									onSelect={(option) => {
										setTCropType({ ...tCropType, hi: option.value });
									}}
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
								submitCrop();
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

export default AddCrop;
