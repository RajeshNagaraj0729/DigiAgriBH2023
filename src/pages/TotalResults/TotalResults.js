/*
React Imports
 */
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Spinner } from "reactstrap";
import { Modal } from "rsuite";
import toast from "react-simple-toasts";

/*
Custom Component Imports
 */
import Statistics from "../../layouts/Stats/CropDoc";
import * as Constants from "../../constants";
import "../../App.css";
import "../TotalResults/EditDiseaseStyle.css";
import TotalData from "../../services/TablesData/TotalData";
import {
	fetchCropDocDatabyFilter,
	changeDiseaseName,
	fetchRowsForExcel,
} from "../../redux/actions/CropDoc/fetchrows";
import Error from "../Error/Error";
import Filter from "../../layouts/Filtering/Filter";
import { Alert } from "rsuite";
import { getCropDocTensorflowCount } from "../../redux/actions/Dashboard/dashboardData";
import {
	UTCtolocalDate,
	localToUTCEndDate,
	localToUTCStartDate,
} from "../../Utils/dataUtils";

/**
 * Crop Doctor Total Results Page
 */
const TotalResults = () => {
	const [from, setFrom] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [to, setTo] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [searchValue, setSearchValue] = useState("");
	const [filterType, setFilterType] = useState("");
	const [includeMetricStress, setIncludeMetricStress] = useState(false);
	const [notUpdated, setNotUpdated] = useState("");
	const [selectedRows, setSelectedRows] = useState([]);
	const [modifiedRows, setModifiedRows] = useState([]);
	const [validate, setValidate] = useState(false);
	const [showValidateModal, setShowValidateModal] = useState(false);
	const [pagenum, setPagenum] = useState(1);
	const [pagesize, setPagesize] = useState(10);
	const [includeTensorFlow, setIncludeTensorFlow] = useState(false);
	const [cropDocDataforExcel, setCropDocDataforExcel] = useState([]);
	const [cropDocDataforExcelFetching, setCropDocDataforExcelFetching] =
		useState(false);

	const dispatch = useDispatch();
	const cropDocInfo = useSelector((state) => state.cropDocInfo);
	const topDiseases = cropDocInfo.topDiseases;
	const cropDoc = useSelector((state) => state.totalResults);
	const diseases = cropDocInfo.diseases;
	const crops = cropDocInfo.crops;
	const stats = useSelector((state) => state.dashboardData);
	const totalPageCount = cropDoc?.data[0]?.filterCount;

	const loggedInUsers = JSON.parse(window.localStorage.getItem("user"));
	const userId = loggedInUsers?.id;
	const readAccess = loggedInUsers?.roleName;

	useEffect(() => {
		if (modifiedRows.length === 0) {
			setValidate(false);
		}
	}, [modifiedRows]);

	useEffect(() => {
		getTensorFlowCount();
	}, []);

	useEffect(() => {
		if (totalPageCount) {
			getDataForExcel();
		}
	}, [totalPageCount]);

	const getDataForExcel = () => {
		try {
			setCropDocDataforExcelFetching(true);
			fetchRowsForExcel(
				from,
				to,
				totalPageCount || 20,
				pagenum,
				searchValue,
				filterType,
				includeMetricStress,
				notUpdated,
				includeTensorFlow
			).then((resp) => {
				setCropDocDataforExcelFetching(false);
				if (resp) {
					setCropDocDataforExcel(resp);
				}
			});
		} catch (error) {
			setCropDocDataforExcelFetching(false);
			console.error("Error in getDataForExcel===", error);
		}
	};

	const getTensorFlowCount = async () => {
		await dispatch(getCropDocTensorflowCount()).catch((err) => {
			Alert.error(err.message);
		});
	};

	useEffect(() => {
		handlefetchrows(1, 10);
	}, []);

	//Dispatching filter criteria
	const handlefetchrows = (number, amount, reset) => {
		if (!reset && from && !to) {
			Alert.error("Please provide TO Date");
		} else {
			dispatch(
				fetchCropDocDatabyFilter(
					number,
					amount,
					!reset && from ? from : "",
					!reset && to ? to : "",
					reset ? "" : searchValue,
					reset ? "" : filterType,
					reset ? "" : includeMetricStress,
					reset ? "" : notUpdated,
					reset ? "" : includeTensorFlow
				)
			);
		}
	};

	//Fetched Results Error
	if (cropDoc.errMsg || cropDocInfo.errmsg) {
		return <Error msg={cropDoc.errMsg || cropDocInfo.errmsg} />;
	}

	//If data is fetched returning the Crop Doctor Total Results components
	else {
		const data = cropDoc.data;

		//Validation for multiple
		const validateMultipleUpdate = () => {
			for (var element in modifiedRows) {
				let validateDiseasePresent =
					typeof modifiedRows[element].isDiseasePresent === "boolean"
						? modifiedRows[element].isDiseasePresent.toString()
						: modifiedRows[element].isDiseasePresent;
				let validateModelDetected =
					typeof modifiedRows[element].isModelDetected === "boolean"
						? modifiedRows[element].isModelDetected.toString()
						: modifiedRows[element].isModelDetected;
				if (
					!modifiedRows[element].diseaseId ||
					!validateDiseasePresent ||
					!validateModelDetected ||
					!modifiedRows[element].trainedStatus
				) {
					return true;
				}
			}
			return false;
		};

		//Update Multiple rows
		const updateMultiple = async () => {
			let check = validateMultipleUpdate();
			if (check) {
				setValidate(true);
				setShowValidateModal(true);
			} else {
				setValidate(false);
				for (var element in modifiedRows) {
					if (modifiedRows[element].diseaseId) {
						const modifiedDisease = {
							title: modifiedRows[element].title,
							cropdocId: modifiedRows[element].id,
							diseaseId: modifiedRows[element].diseaseId,
							suggestion: "Treatment",
							imageUrl:
								Constants.mediaUrl +
								modifiedRows[element].image +
								Constants.sasToken,
							expertTags: [],
							cropId: modifiedRows[element].cropId || null,
							isNotification: modifiedRows[element].isNotification,
							partOfPlant: modifiedRows[element].partOfPlant,
							trainedStatus: modifiedRows[element].trainedStatus,
							isDiseasePresent:
								modifiedRows[element].isDiseasePresent === "true" ||
								modifiedRows[element].isDiseasePresent === true
									? true
									: false,
							isModelDetected:
								modifiedRows[element].isModelDetected === "true" ||
								modifiedRows[element].isModelDetected === true
									? true
									: false,
							updatedBy: userId,
						};
						await dispatch(changeDiseaseName(modifiedDisease))
							.then(() => {
								toast("Updated Sucessfully");
							})
							.catch((err) => {
								Alert.error("Can't Update");
								//break;
							});
					}
				}
				handlefetchrows(pagenum, pagesize);
				resetSelectedValues();
			}
		};

		const validateSingleUpdate = (row) => {
			let validateDiseasePresent =
				typeof row.isDiseasePresent === "boolean"
					? row.isDiseasePresent.toString()
					: row.isDiseasePresent;
			let validateModelDetected =
				typeof row.isModelDetected === "boolean"
					? row.isModelDetected.toString()
					: row.isModelDetected;
			if (
				!row.diseaseId ||
				!validateDiseasePresent ||
				!validateModelDetected ||
				!row.trainedStatus
			) {
				return true;
			}

			return false;
		};

		//Individual Update
		const updateIndividual = async (row) => {
			let check = validateSingleUpdate(row);

			if (check) {
				setValidate(true);
				setShowValidateModal(true);
			} else {
				if (row.diseaseId) {
					const modifiedDisease = {
						title: row.title,
						cropdocId: row.id,
						diseaseId: row.diseaseId,
						suggestion: "Treatment",
						imageUrl: Constants.mediaUrl + row.image + Constants.sasToken,
						expertTags: [],
						cropId: row.cropId || null,
						isNotification: row.isNotification,
						partOfPlant: row.partOfPlant,
						trainedStatus: row.trainedStatus,
						isDiseasePresent:
							row.isDiseasePresent === "true" || row.isDiseasePresent === true
								? true
								: false,
						isModelDetected:
							row.isModelDetected === "true" || row.isModelDetected === true
								? true
								: false,
						updatedBy: userId,
					};
					await dispatch(changeDiseaseName(modifiedDisease))
						.then(() => {
							let index = selectedRows.indexOf(row.id);
							selectedRows.splice(index, 1);
							index = modifiedRows.map((r) => r.id).indexOf(row.id);
							modifiedRows.splice(index, 1);
							toast("Updated Sucessfully");
							handlefetchrows(pagenum, pagesize);
						})
						.catch((err) => {
							Alert.error("Can't Update");
						});
				} else {
					Alert.error("Update Disease name");
				}
			}
		};

		//Loading Excel Data
		let excel_data =
			cropDocDataforExcel &&
			cropDocDataforExcel?.map((row) => {
				return {
					Username: `${row.userdata[0]?.firstName + row.userdata[0]?.lastName}`,
					MobileNumber: row.userdata[0]?.phone.substring(
						3,
						row.userdata[0]?.phone.length
					),
					Image: Constants.mediaUrl + row.imageUrl + Constants.sasToken,
					Result:
						row.diagnosisDetails === null
							? row.cognitiveDetails && row.cognitiveDetails.cognitiveMessage
								? row.cognitiveDetails.cognitiveMessage
								: "No Data Found"
							: row.diagnosisDetails[0]?.causeInfo[0]?.name,
					Probability: row?.tfStats?.stage3Predictions[0]?.probability
						? row?.tfStats?.stage3Predictions[0]?.probability.toFixed(3)
						: 0,
					TagName: row?.tfStats?.stage3Predictions[0]?.tagName
						? row?.tfStats?.stage3Predictions[0]?.tagName
						: "",
					CropName:
						row?.tfStats?.stage1Predictions[0]?.probability <
						row?.tfStats?.stage2Predictions[0]?.probability
							? row?.tfStats?.stage2Predictions[0]?.tagName
							: row?.tfStats?.stage1Predictions[0]?.tagName,
					UpdatedCropName: crops
						?.map((row) => {
							return {
								label: row.cropName,
								value: row.id,
							};
						})
						.filter((crop) => crop.value === row.cropId)[0]?.label,
					DiseasePresent: row.isDiseasePresent,
					ModelDetected: row.isModelDetected,
					Address: row?.locationDetails?.length
						? (row?.locationDetails[0]?.suburb !== null &&
						  row?.locationDetails[0]?.suburb !== ""
								? row?.locationDetails[0]?.suburb + ", "
								: "") +
						  (row?.locationDetails[0]?.city_district != null &&
						  row?.locationDetails[0]?.city_district !== ""
								? row?.locationDetails[0]?.city_district + ", "
								: "") +
						  (row?.locationDetails[0]?.city != null &&
						  row?.locationDetails[0]?.city !== ""
								? row?.locationDetails[0]?.city + ", "
								: "") +
						  (row?.locationDetails[0]?.village != null &&
						  row?.locationDetails[0]?.village !== ""
								? row?.locationDetails[0]?.village + ", "
								: "") +
						  (row?.locationDetails[0]?.county != null &&
						  row?.locationDetails[0]?.county !== ""
								? row?.locationDetails[0]?.county + ", "
								: "") +
						  (row?.locationDetails[0]?.district != null &&
						  row?.locationDetails[0]?.district !== ""
								? row?.locationDetails[0]?.district + ", "
								: "") +
						  (row?.locationDetails[0]?.state != null &&
						  row?.locationDetails[0]?.state !== ""
								? row?.locationDetails[0]?.state
								: "")
						: "N/A",
					State:
						row.locationDetails[0]?.state != null &&
						row.locationDetails[0]?.state !== ""
							? row.locationDetails[0]?.state
							: "N/A",
					District:
						row.locationDetails[0]?.district &&
						row.locationDetails[0]?.district !== ""
							? row.locationDetails[0]?.district
							: "N/A",
					Mandal:
						row.locationDetails[0]?.county != null &&
						row.locationDetails[0]?.county !== ""
							? row.locationDetails[0]?.county + ", "
							: "N/A",
					Village:
						row.locationDetails[0]?.village != null &&
						row.locationDetails[0]?.village !== 0
							? row.locationDetails[0]?.village
							: "N/A",
					City:
						row?.locationDetails[0]?.city != null &&
						row?.locationDetails[0]?.city !== ""
							? row?.locationDetails[0]?.city + ", "
							: "N/A",
					CityDistrict:
						row?.locationDetails[0]?.city_district != null &&
						row?.locationDetails[0]?.city_district !== ""
							? row?.locationDetails[0]?.city_district + ", "
							: "N/A",
					SubUrb:
						row?.locationDetails?.length &&
						row?.locationDetails[0]?.suburb !== null &&
						row?.locationDetails[0]?.suburb !== ""
							? row?.locationDetails[0]?.suburb + ", "
							: "N/A",
					CreatedOn: dateFormat(row.createdOn, "dd/mm/yyyy, h:MM:ss TT"),
					updatedBy: row?.updatedByUserName,
					EstimatedCropArea:
						row.metricStress && row.metricStress.estimatedCropArea,
					EstimatedAffectedArea:
						row.metricStress && row.metricStress.estimatedStress,
					Source: row.source === "cv" ? "Custom Vision" : "Tensor Flow",
					PageLink:
						window.location.origin + "/crop-doctor/edit-disease/" + row.id,
				};
			});
		//totalPageCount

		excel_data = excel_data.map((row) => {
			return {
				Username: row.Username,
				MobileNumber: row.MobileNumber,
				Image: row.Image,
				Result: row.Result,
				Probability: row.Probability,
				TagName: row.TagName,
				CropName: row.CropName,
				UpdatedCropName: row.UpdatedCropName,
				DiseasePresent: row.DiseasePresent,
				ModelDetected: row.ModelDetected,
				Address: row.Address || "N/A",
				State: row.State,
				District: row.District,
				Mandal: row.Mandal,
				Village: row.Village,
				City: row.City,
				CityDistrict: row.CityDistrict,
				SubUrb: row.SubUrb,
				CreatedOn: row.CreatedOn,
				updatedBy: row.updatedBy,
				EstimatedCropArea: row.EstimatedCropArea,
				EstimatedAffectedArea: row.EstimatedAffectedArea,
				PageLink: row.PageLink,
			};
		});

		//Reseting selected and modified rows
		const resetSelectedValues = () => {
			setModifiedRows([]);
			setSelectedRows([]);
		};

		//Reseting pagenum and pagesize
		const initialPageDetails = () => {
			setPagenum(1);
			setPagesize(10);
		};

		//Date filter submit
		const handleDataFilterSubmit = () => {
			resetSelectedValues();
			initialPageDetails();
			handlefetchrows(1, 10);
		};

		//Returning components
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
							{/* <h6>Missed To Update Disease Name</h6> */}
							<h6>Please Fill all the Manditory fields apart from Crop</h6>
						</div>
						{/* <div className="modalBodyTextLeft">
              If disease name is not selected, update will not appear in crop
              doctor widget screen in app
            </div> */}
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
				{(stats.totalCropDocCount === null ||
					stats.totalCropDocCount === undefined) && (
					<div
						style={{
							width: "calc(100% - 290px)",
							height: "100%",
							position: "absolute",
							backgroundColor: "rgba(0, 0, 0, 0.3)",
							zIndex: 2,
						}}
						className="d-flex justify-content-center"
					>
						<div
							style={{
								marginTop: "250px",
								textAlign: "center",
							}}
						>
							<Spinner
								color="white"
								style={{
									width: "3rem",
									height: "3rem",
									justifySelf: "center",
								}}
							/>
							<p
								style={{
									color: "white",
									fontSize: "20px",
								}}
							>
								Loading...
							</p>
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-12">
						<div className="d-flex justify-content-start py-0">
							<h2 className="mainHeading">Crop Doctor Report</h2>
						</div>
					</div>
				</div>

				{/* Statistical data */}
				<div className="row">
					<div className="col-12">
						<Statistics
							totalData={
								stats.totalCropDocCount ? stats.totalCropDocCount : "isLoading"
							}
							validData={
								stats.totalCropDocWithDiseaseCount
									? stats.totalCropDocWithDiseaseCount
									: "isLoading"
							}
							inValidData={
								stats.totalCropDocWithoutDiseaseCount
									? stats.totalCropDocWithoutDiseaseCount
									: "isLoading"
							}
							newData={
								stats.totalCropDocDayCount !== null
									? stats.totalCropDocDayCount
									: "isLoading"
							}
							attendedCount={
								stats.cropDocAttendedCount
									? stats.cropDocAttendedCount
									: "isLoading"
							}
							unAttendedCount={
								stats.cropDocUnAttendedCount
									? stats.cropDocUnAttendedCount
									: "isLoading"
							}
							topDiseases={topDiseases.length !== 0 ? topDiseases : "isLoading"}
							tensorflowCount={
								stats.cropDocTensorflowCount
									? stats.cropDocTensorflowCount
									: "isLoading"
							}
						/>
					</div>
				</div>
				<div className="dashedLine"></div>

				{/* Data filter */}
				<Filter
					from={from}
					to={to}
					dateFilter={true}
					setFrom={(e) => setFrom(e)}
					setTo={(e) => setTo(e)}
					handleSubmit={handleDataFilterSubmit}
					enableExcel ={readAccess === "ReadOnly" ? false : true}
					excel_data={excel_data}
					excel_data_fetching={cropDocDataforExcelFetching}
					excel_fileName="Crop_Doctor_Info"
					setSearchValue={(e) => setSearchValue(e)}
					searchValue={searchValue}
					search={true}
					searchPlaceholder="Username, Mobile no."
					imageDownload={true}
					filterType={true}
					filterTypeValue={filterType}
					selectType={(value) => setFilterType(value)}
					links={data.map((link) => Constants.downloadUrl + link.imageUrl)}
					includeMetricStress={includeMetricStress}
					setIncludeMetricStress={setIncludeMetricStress}
					clearFilter={() => {
						setFrom(dateFormat(Date.now(), "yyyy-mm-dd"));
						setTo(dateFormat(Date.now(), "yyyy-mm-dd"));
						setSearchValue("");
						setModifiedRows([]);
						setSelectedRows([]);
						setFilterType("");
						setIncludeMetricStress(false);
						setNotUpdated("");
						setIncludeTensorFlow(false);
						initialPageDetails();
						handlefetchrows(1, 10, true);
					}}
					searchDisable={
						searchValue === "" &&
						from === "" &&
						to === "" &&
						filterType === "" &&
						!includeMetricStress &&
						notUpdated === "" &&
						!includeTensorFlow
					}
					notUpdated={notUpdated}
					setNotUpdated={setNotUpdated}
					includeTensorFlow={includeTensorFlow}
					setIncludeTensorFlow={setIncludeTensorFlow}
				/>

				{/* Crop Doctor Total Results Table */}
				<div className="row">
					{selectedRows.length !== 0 && (
						<div className="updateBtnMainStyle">
							<div className="updateBtnStyle">
								<Button
									className="btn btn-sm btn-success"
									style={{ float: "right" }}
									onClick={updateMultiple}
								>
									Update
								</Button>
							</div>
						</div>
					)}
					<div className="col-12">
						<div className="table-fixed-width">
							<TotalData
								validate={validate}
								totalCount={
									stats.totalCropDocCount ? stats.totalCropDocCount : 10
								}
								callHandle={handlefetchrows}
								selectedRows={selectedRows}
								setSelectedRows={setSelectedRows}
								modifiedRows={modifiedRows}
								setModifiedRows={setModifiedRows}
								diseaseData={
									diseases.length !== 0 &&
									diseases.map((row) => {
										return {
											label: row.name,
											value: row.id,
										};
									})
								}
								cropData={
									crops.length !== 0 &&
									crops.map((row) => {
										return {
											label: row.cropName,
											value: row.id,
										};
									})
								}
								updateIndividual={updateIndividual}
								pagenum={pagenum}
								pagesize={pagesize}
								setPagenum={(num) => {
									setPagenum(num);
								}}
								setPagesize={(num) => {
									setPagesize(num);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
export default TotalResults;
