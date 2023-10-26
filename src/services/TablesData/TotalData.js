/*
React Imports
 */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import { Modal } from "rsuite";

/*
Custom Component Imports
 */
import { CROP_DOC } from "../../redux/actions/storepage";
import * as constants from "../../constants";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import CustomSelect from "../../components/Select/Select";
import { PageLoader } from "../../components/Loading/Loading";
import Error from "../../pages/Error/Error";
import { isNoDiseaseFound } from "../CommonServices";
import { plantParts } from "../PlantParts";

const ImageModal = (props) => {
	return (
		<Modal
			overflow={false}
			show={props.showModal}
			onHide={() => props.setShowModal(false)}
		>
			<Modal.Body>
				<img
					src={constants.mediaUrl + props.image + constants.sasToken}
					alt="Not Found"
					style={{ width: "100%", height: "500px" }}
				/>
			</Modal.Body>
		</Modal>
	);
};

/**
 * Crop Doc Total Results Table
 * @param {Object} props
 * props from Crop Doc Total Results Page
 */
const TotalData = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [image, setImage] = useState("");
	const totalResults = useSelector((state) => state.totalResults);
	const diseases = useSelector((state) => state.cropDocInfo.diseases);
	const loggedInUsers = JSON.parse(window.localStorage.getItem("user"));
	const readAccess = loggedInUsers?.roleName;

	const columns = useMemo(
		() => [
			{
				name: "User Name",
				selector: "Username",
				left: true,
			},
			{
				name: "Mobile Number",
				selector: "MobileNumber",
				center: true,
			},
			{
				name: "Image",
				selector: "image",
				width: "200px",
			},
			{
				name: "Result",
				selector: "result",
				center: true,
				width: "200px",
			},
			{
				name: "Disease Present",
				selector: "diseasePresent",
				center: true,
			},
			{
				name: "Model Detected",
				selector: "modelDetected",
				center: true,
			},
			{
				name: "CropName",
				selector: "cropName",
				center: true,
				width: "100px",
			},
			{
				name: "Updated Crop Name",
				selector: "updatedCropName",
				center: true,
				width: "100px",
			},
			{
				name: "Attended",
				selector: "isUpdated",
				center: true,
			},
			{
				name: "Attended By",
				selector: "updatedByUserName",
				center: true,
			},
			{
				name: "Created On",
				selector: "createdon",
				sortable: true,
			},
			{
				name: "Source",
				selector: "source",
				center: true,
			},
			{
				name: "Tag Name",
				selector: "tagName",
				center: true,
				width: "250px",
			},
			{
				name: "Probability",
				selector: "probability",
				center: true,
				width: "150px",
			},
			{
				name: "Village",
				selector: "cityRVillage",
				center: true,
			},
			{
				name: "Mandal",
				selector: "county",
				center: true,
			},
			{
				name: "District",
				selector: "district",
				center: true,
			},
			{
				name: "State",
				selector: "state",
				center: true,
			},
			// {
			//   name: "Estimated Crop Area",
			//   selector: "EstimatedCropArea",
			//   center: true,
			// },
			// {
			//   name: "Estimated Affected Area",
			//   selector: "EstimatedAffectedArea",
			//   center: true,
			// },
			{
				name: "View Result",
				selector: "view",
				center: true,
			},
		],
		[]
	);

	const [disease, setDisease] = useState({
		label: "",
		value: "",
		index: "",
	});

	if (totalResults.isLoading) {
		return <PageLoader />;
	}

	if (totalResults.errmsg) {
		return <Error msg={totalResults.errmsg} />;
	}

	//Component on checkbox select component
	const ExpandableComponent = ({ data }) => {
		return (
			<div
				className="row col-12"
				style={{
					borderBottomColor: "#e9ecef",
					borderBottomWidth: 1,
					borderBottomStyle: "solid",
					paddingBottom: "5px",
					backgroundColor: data.r_ind % 2 === 0 ? "white" : "#fafafa",
				}}
			>
				{/* <div className="col-1">{data.treatmentDesc}</div> */}
				<div
					className="col-11 d-flex align-items-center"
					style={{
						backgroundColor:
							props.validate &&
							props.selectedRows.includes(data.id) &&
							(!props.modifiedRows.filter((r) => r.id === data.id)[0]
								?.diseaseId ||
								!props.modifiedRows.filter((r) => r.id === data.id)[0]
									?.isDiseasePresent ||
								!props.modifiedRows.filter((r) => r.id === data.id)[0]
									?.isModelDetected ||
								!props.modifiedRows.filter((r) => r.id === data.id)[0]
									?.trainedStatus) &&
							"#ffcdd2",
						borderRadius: "5px",
					}}
				>
					<div className="mr-3 mt-4">{data.sendNotification}</div>
					<div className="mr-3">{data.trainedStatus}</div>
					<div className="mr-3">{data.changeDisease}</div>
					<div className="mr-3">{data.changeCrop}</div>
					<div className="mr-3">{data.changePlantPart}</div>
					<div className="mr-3">{data.isDiseasePresent}</div>
					<div className="mr-3">{data.isModelDetected}</div>
					<div className="mt-4">{data.update}</div>
				</div>
				{props.selectedRows.includes(data.id) &&
					props.modifiedRows.filter((r) => r.id === data.id)[0]
						?.showDiseaseError && (
						<div
							style={{
								color: "red",
								fontSize: "14px",
								marginLeft: "600px",
							}}
						>
							This disease_cause doesn't have master disease detail. Provide
							suggestion in view result page
						</div>
					)}
			</div>
		);
	};

	if (totalResults?.data?.length !== 0) {
		let resData;
		let resultData;
		//Fetching rows for table
		let data = totalResults?.data?.map((row, index) => {
			if (row.child[0] === undefined || row.child === []) {
				resData = (
					<div>
						{row.expertTags && row.expertTags.length !== 0 ? (
							<div className="bgSuccess whiteText smPadding smBorderRadius">
								{
									(props?.diseaseData || []).filter(
										(r) => r.value === row.expertTags[0]
									)[0]?.label
								}
							</div>
						) : row.diagnosisDetails === null ? (
							row.cognitiveDetails && row.cognitiveDetails.cognitiveMessage ? (
								<div className="bgDanger whiteText smPadding smBorderRadius">
									{row.cognitiveDetails.cognitiveMessage}
								</div>
							) : (
								<div className="bgDanger whiteText smPadding smBorderRadius">
									No Data Found
								</div>
							)
						) : (
							<div className="bgSuccess whiteText smPadding smBorderRadius">
								{row.diagnosisDetails[0]?.causeInfo[0]?.name}
							</div>
						)}
					</div>
				);
			} else {
				resultData = (
					<div>
						{row.child[0].expertTags && row.child[0].expertTags.length !== 0 ? (
							<div className="bgSuccess whiteText smPadding smBorderRadius">
								{
									(props?.diseaseData || []).filter(
										(r) => r.value === row.expertTags[0]
									)[0]?.label
								}
							</div>
						) : row.child[0].diagnosisDetails === null ? (
							row.child[0].cognitiveDetails &&
							row.child[0].cognitiveDetails.cognitiveMessage ? (
								<div className="bgDanger whiteText smPadding smBorderRadius">
									{row.child[0].cognitiveDetails.cognitiveMessage}
								</div>
							) : (
								<div className="bgDanger whiteText smPadding smBorderRadius">
									No Data Found
								</div>
							)
						) : (
							<div className="bgSuccess whiteText smPadding smBorderRadius">
								{row.child[0].diagnosisDetails[0]?.causeInfo[0]?.name}
							</div>
						)}
					</div>
				);
			}
			return {
				r_ind: index,
				id: row.id,
				Username: `${
					row.userdata &&
					row.userdata[0]?.firstName + " " + row.userdata[0]?.lastName
				}`,
				MobileNumber:
					row.userdata &&
					row.userdata[0]?.phone.substring(3, row.userdata[0]?.phone.length),
				image: (
					<img
						src={constants.mediaUrl + row.imageUrl}
						alt="Not Found"
						className="cropDoctorResults imagePreview"
						onClick={() => {
							setShowModal(true);
							setImage(row.imageUrl);
						}}
					/>
				),
				result: resultData !== undefined ? resultData : resData,
				tagName: row?.tfStats?.stage3Predictions[0]?.tagName
					? row?.tfStats?.stage3Predictions[0]?.tagName
					: "",
				probability: row?.tfStats?.stage3Predictions[0]?.probability
					? row?.tfStats?.stage3Predictions[0]?.probability.toFixed(3)
					: 0,
				diseasePresent: row?.isDiseasePresent === false ? "false" : "true",
				modelDetected: row?.isModelDetected === false ? "false" : "true",
				updatedCropName:
					props?.cropData?.filter((crop) => crop.value === row.cropId)[0]
						?.label || [],
				cropName:
					row?.tfStats?.stage1Predictions[0]?.probability <
					row?.tfStats?.stage2Predictions[0]?.probability
						? row?.tfStats?.stage2Predictions[0]?.tagName
						: row?.tfStats?.stage1Predictions[0]?.tagName,
				createdon: dateFormat(row.createdOn, "dd/mm/yyyy, h:MM:ss TT"),
				view: (
					<Link to={`/crop-doctor/edit-disease/${row.id}`} target="_blank">
						<i className="fa fa-folder-open"></i>
					</Link>
				),
				changeDisease: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "130px" }}>
						<CustomSelect
							data={props?.diseaseData || []}
							placeholder="Select Disease"
							label="Select Disease"
							showLabel={true}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (
									(option.label === "Object image" &&
										option.value === "6267f09eee0e770001878578") ||
									(option.label === "Far image" &&
										option.value === "626fce9b21e4170001a03338") ||
									(option.label === "Blurred image" &&
										option.value === "6268cf7cee0e77000187857b") ||
									(option.label === "Healthy Crop" &&
										option.value === "611e3a4d9f45050001422104")
								) {
									if (modified.length !== 0) {
										modified = modified.map((r) => {
											return r.id === row.id
												? {
														...r,
														cropId: "5f68a9f680300e5cb8be89c4",
														cropName: "other",
														isDiseasePresent: "false",
														isModelDetected: "false",
												  }
												: r;
										});
									}
									setDisease({ ...option, index: index });
								} else {
									setDisease({ label: "", value: "", index: "" });
								}
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id
											? {
													...r,
													diseaseId: option.value,
													diseaseName: option.label,
											  }
											: r
									);
									if (
										option.value === "6267f09eee0e770001878578" ||
										option.value === "626fce9b21e4170001a03338" ||
										option.value === "6268cf7cee0e77000187857b" ||
										option.value === "611e3a4d9f45050001422104"
									) {
										modified = modified.map((r) =>
											r.id === row.id
												? {
														...r,
														showDiseaseError: false,
												  }
												: r
										);
									} else if (isNoDiseaseFound(option.value, diseases)) {
										modified = modified.map((r) =>
											r.id === row.id
												? {
														...r,
														showDiseaseError: true,
												  }
												: r
										);
									} else {
										modified = modified.map((r) =>
											r.id === row.id
												? {
														...r,
														showDiseaseError: false,
												  }
												: r
										);
									}
								}
								props.setModifiedRows(modified);
							}}
							search={true}
							name={row.id + "disease-select"}
							value={
								props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.diseaseName || "Select Disease",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.diseaseId || "123",
								}
							}
						/>
					</div>
				),
				changeCrop: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "130px" }}>
						<CustomSelect
							name={row.id + "crop-name"}
							data={props.cropData}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id
											? {
													...r,
													cropId: option.value,
													cropName: option.label,
											  }
											: r
									);
									props.setModifiedRows(modified);
								}
							}}
							search={true}
							placeholder="Select Crop"
							label="Select Crop"
							showLabel={true}
							//custom={true}
							value={
								(disease.label === "Object image" &&
									disease.value === "6267f09eee0e770001878578" &&
									index === disease.index && {
										label: "other",
										value: "5f68a9f680300e5cb8be89c4",
									}) ||
								(props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.cropName || "Select Crop",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.cropId || "123",
								})
							}
						/>
					</div>
				),
				sendNotification: props.selectedRows.indexOf(row.id) !== -1 && (
					<label style={{ marginBottom: 0 }}>
						<input
							type="checkbox"
							checked={
								props.modifiedRows.length !== 0 &&
								props.modifiedRows.filter((r) => r.id === row.id)[0]
									?.isNotification
							}
							onChange={() => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id
											? { ...r, isNotification: !r.isNotification }
											: r
									);
									props.setModifiedRows(modified);
								}
							}}
							style={{ marginRight: "5px" }}
						/>
						Send Push Notification
					</label>
				),
				trainedStatus: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "100px" }}>
						<CustomSelect
							name="select-type"
							data={[
								{ label: "YES", value: "YES" },
								{ label: "NO", value: "NO" },
							]}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id ? { ...r, trainedStatus: option.value } : r
									);
									props.setModifiedRows(modified);
								}
							}}
							search={true}
							placeholder="Train"
							label="Train"
							showLabel={true}
							custom={true}
							value={
								props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.trainedStatus || "Train",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.trainedStatus || "123",
								}
							}
						/>
					</div>
				),
				EstimatedCropArea:
					row.metricStress && row.metricStress.estimatedCropArea,
				EstimatedAffectedArea:
					row.metricStress && row.metricStress.estimatedStress,
				isUpdated: row.updateMsg ? (
					<p style={{ color: "green" }}>
						<b>Yes</b>
					</p>
				) : (
					<p style={{ color: "red" }}>
						<b>No</b>
					</p>
				),
				updatedByUserName:
					row.updatedByUserName === null
						? "Not Attended"
						: row.updatedByUserName,
				isDiseasePresent: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "150px" }}>
						<CustomSelect
							name="select-type"
							data={[
								{ label: "Present", value: "true" },
								{ label: "Not Present", value: "false" },
							]}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id
											? { ...r, isDiseasePresent: option.value }
											: r
									);
									props.setModifiedRows(modified);
								}
							}}
							search={true}
							placeholder="Is Disease Present"
							label="Disease Detected"
							showLabel={true}
							custom={false}
							value={
								(disease.label === "Object image" &&
									disease.value === "6267f09eee0e770001878578" &&
									index === disease.index && {
										label: "Not Present",
										value: "false",
									}) ||
								(disease.label === "Far image" &&
									disease.value === "626fce9b21e4170001a03338" &&
									index === disease.index && {
										label: "Not Present",
										value: "false",
									}) ||
								(disease.label === "Blurred image" &&
									disease.value === "6268cf7cee0e77000187857b" &&
									index === disease.index && {
										label: "Not Present",
										value: "false",
									}) ||
								(disease.label === "Healthy Crop" &&
									disease.value === "611e3a4d9f45050001422104" &&
									index === disease.index && {
										label: "Not Present",
										value: "false",
									}) ||
								(props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.isDiseasePresent === false
											? props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isDiseasePresent === false
												? "Not Present"
												: "Present"
											: props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isDiseasePresent === "false"
											? "Not Present"
											: "Present" || "Is Disease Present",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.isDiseasePresent === false
											? props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isDiseasePresent === false
												? "false"
												: "true"
											: props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isDiseasePresent === "false"
											? "false"
											: "true" || "Is Disease Present",
								})
							}
						/>
					</div>
				),
				isModelDetected: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "150px" }}>
						<CustomSelect
							name="select-type"
							data={[
								{ label: "Detected", value: "true" },
								{ label: "Not Detected", value: "false" },
							]}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id
											? { ...r, isModelDetected: option.value }
											: r
									);
									props.setModifiedRows(modified);
								}
							}}
							search={true}
							placeholder="Is Model Detected"
							label="Model Detected"
							showLabel={true}
							custom={false}
							value={
								(disease.label === "Object image" &&
									disease.value === "6267f09eee0e770001878578" &&
									index === disease.index && {
										label: "Not Detected",
										value: "false",
									}) ||
								(disease.label === "Far image" &&
									disease.value === "626fce9b21e4170001a03338" &&
									index === disease.index && {
										label: "Not Detected",
										value: "false",
									}) ||
								(disease.label === "Blurred image" &&
									disease.value === "6268cf7cee0e77000187857b" &&
									index === disease.index && {
										label: "Not Detected",
										value: "false",
									}) ||
								(disease.label === "Healthy Crop" &&
									disease.value === "611e3a4d9f45050001422104" &&
									index === disease.index && {
										label: "Not Detected",
										value: "false",
									}) ||
								(props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.isModelDetected === false
											? props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isModelDetected === false
												? "Not Detected"
												: "Detected"
											: props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isModelDetected === "false"
											? "Not Detected"
											: "Detected" || "Is Model Detected",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.isModelDetected === false
											? props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isModelDetected === false
												? "false"
												: "true"
											: props.modifiedRows.filter((r) => r.id === row.id)[0]
													?.isModelDetected === "false"
											? "false"
											: "true" || "Is Model Detected",
								})
							}
						/>
					</div>
				),
				update: props.selectedRows.indexOf(row.id) !== -1 && (
					<button
						id={row.id}
						className="btn btn-sm btn-success"
						onClick={() => {
							let selectedRow = props.modifiedRows.filter(
								(r) => r.id === row.id
							)[0];
							props.updateIndividual(selectedRow);
						}}
					>
						Update
					</button>
				),
				// treatmentDesc: props.selectedRows.indexOf(row.id) !== -1 &&
				//   row.diseaseData &&
				//   row.diseaseData.length !== 0 && (
				//     <button
				//       className="btn btn-sm btn-primary"
				//       onClick={async () => {
				//         setCollection({
				//           bioDesc:
				//             row.diseaseData[0]?.treatment?.biologicalTreatment
				//               ?.treatmentDescription,
				//           chemDesc:
				//             row.diseaseData[0]?.treatment?.chemicalTreatment
				//               ?.treatmentDescription,
				//           diseaseId: row.diseaseData[0].id,
				//         });
				//         setShowDescModal(true);

				//         await getProducts(row.diseaseData[0].id);
				//       }}
				//     >
				//       Notification Details
				//     </button>
				//   ),
				changePlantPart: props.selectedRows.indexOf(row.id) !== -1 && (
					<div style={{ width: "150px" }}>
						<CustomSelect
							name={row.id + "crop-part"}
							data={plantParts}
							onSelect={(option) => {
								let modified = [...props.modifiedRows];
								if (modified.length !== 0) {
									modified = modified.map((r) =>
										r.id === row.id ? { ...r, partOfPlant: option.value } : r
									);
									props.setModifiedRows(modified);
								}
							}}
							search={true}
							placeholder="Select Plant Part"
							label="Select Plant Part"
							showLabel={true}
							//custom={true}
							value={
								props.modifiedRows.length !== 0 && {
									label:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.partOfPlant || "Select Plant Part",
									value:
										props.modifiedRows.filter((r) => r.id === row.id)[0]
											?.partOfPlant || "123",
								}
							}
						/>
					</div>
				),
				source: row.source === "cv" ? "Custom Vision" : "Tensor Flow",
				cityRVillage:
					(row?.locationDetails?.length &&
						(row?.locationDetails[0].village ||
							row?.locationDetails[0].city ||
							"N/A")) ||
					"N/A",
				county:
					(row?.locationDetails?.length &&
						(row?.locationDetails[0].county || "N/A")) ||
					"N/A",
				district:
					(row?.locationDetails?.length &&
						(row?.locationDetails[0].district ||
							row?.locationDetails[0].cityDistrict ||
							"N/A")) ||
					"N/A",
				state:
					(row?.locationDetails?.length &&
						(row?.locationDetails[0].state || "N/A")) ||
					"N/A",
			};
		});
		//Returning Data Table
		return (
			<>
				<ImageModal
					image={image}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
				{/* <CollectionModal
          collection={collection}
          showModal={showDescModal}
          setShowModal={setShowDescModal}
          isBioProductsLoading={isBioProductsLoading}
          isChemProductsLoading={isChemProductsLoading}
          chemProducts={productsInfo.chemProducts}
          bioProducts={productsInfo.bioProducts}
        />*/}
				{/* {rows.filtered && !rows.notUpdatedData ? (
          <NormalDataTable
            title="Crop Doctor Results"
            columns={columns}
            data={data}
            length={rowData.length}
            selectableRows
            paginationDefaultPage={props.pagenum}
            paginationPerPage={props.pagesize}
            setActivePage={(num) => props.setPagenum(num)}
            setPageAmount={(num) => props.setPagesize(num)}
            isFiltered={true}
            selectableRowsNoSelectAll={false}
            selectableRowSelected={(row) => props.selectedRows.includes(row.id)}
            expandableRows
            expandableRowExpanded={() => true}
            expandableRowsHideExpander
            expandableRowsComponent={<ExpandableComponent />}
            onSelectedRowsChange={(selected) => {
              props.setSelectedRows(selected.selectedRows.map((r) => r.id));
              if (selected.allSelected === true) {
                let modifiedRows = rowData.map((selectedResult) => {
                  return {
                    id: selectedResult.id,
                    diseaseId:
                      selectedResult.expertTags.length !== 0
                        ? selectedResult.expertTags[0]
                        : selectedResult.diagnosisDetails &&
                          selectedResult.diagnosisDetails[0].causeInfo
                        ? selectedResult.diagnosisDetails[0].causeInfo[0].id
                        : "",
                    diseaseName:
                      selectedResult.expertTags.length !== 0
                        ? props.diseaseData?.filter(
                            (r) => r.value === selectedResult.expertTags[0]
                          )[0]?.label
                        : selectedResult.diagnosisDetails &&
                          selectedResult.diagnosisDetails[0].causeInfo
                        ? selectedResult.diagnosisDetails[0].causeInfo[0].name
                        : "",
                    cropId: selectedResult.cropId,
                    cropName: props.cropData.filter(
                      (r) => r.value === selectedResult.cropId
                    )[0]?.label,
                    title: selectedResult.title,
                    image: selectedResult.imageUrl,
                    tags: null,
                    isNotification: true,
                    showDiseaseError: false,
                    trainedStatus: selectedResult.trainedStatus,
                    partOfPlant: selectedResult.partOfPlant,
                    isDiseasePresent: selectedResult.isDiseasePresent,
                    isModelDetected: selectedResult.isModelDetected,
                  };
                });
                props.setModifiedRows(modifiedRows);
              } else {
                let selectedResult = rowData.filter(
                  (row) => row.id === selected.selectedRows[0]?.id
                )[0];
                let modified = [...props.modifiedRows];
                if (selected.selectedRows.length > props.modifiedRows.length) {
                  modified = [
                    ...modified,
                    {
                      id: selectedResult.id,
                      diseaseId:
                        selectedResult.expertTags.length !== 0
                          ? selectedResult.expertTags[0]
                          : selectedResult.diagnosisDetails &&
                            selectedResult.diagnosisDetails[0].causeInfo
                          ? selectedResult.diagnosisDetails[0].causeInfo[0].id
                          : "",
                      diseaseName:
                        selectedResult.expertTags.length !== 0
                          ? props.diseaseData?.filter(
                              (r) => r.value === selectedResult.expertTags[0]
                            )[0]?.label
                          : selectedResult.diagnosisDetails &&
                            selectedResult.diagnosisDetails[0].causeInfo
                          ? selectedResult.diagnosisDetails[0].causeInfo[0].name
                          : "",
                      cropId: selectedResult.cropId,
                      cropName: props.cropData.filter(
                        (r) => r.value === selectedResult.cropId
                      )[0]?.label,
                      title: selectedResult.title,
                      image: selectedResult.imageUrl,
                      tags: null,
                      isNotification: true,
                      showDiseaseError: false,
                      partOfPlant: selectedResult.partOfPlant,
                      trainedStatus: selectedResult.trainedStatus,
                      isDiseasePresent: selectedResult.isDiseasePresent,
                      isModelDetected: selectedResult.isModelDetected,
                    },
                  ];
                } else {
                  modified = modified.filter((row) =>
                    selected.selectedRows.some((r) => r.id === row.id)
                  );
                }
                props.setModifiedRows(modified);
              }
            }}
          />
        ) : ( */}
				<PaginationDataTable
					Type={CROP_DOC}
					activePage={props.pagenum}
					pageAmount={props.pagesize}
					title="Crop Doctor Results"
					setActivePage={(num) => props.setPagenum(num)}
					setPageAmount={(num) => props.setPagesize(num)}
					callHandle={props.callHandle}
					columns={columns}
					data={data}
					searchValue=""
					totalCount={totalResults?.data[0]?.filterCount}
					selectableRows={readAccess === "ReadOnly" ? false : true}
					selectableRowsNoSelectAll={false}
					clearSelectedRows={false}
					selectableRowSelected={(row) => props.selectedRows.includes(row.id)}
					expandableRows
					expandableRowExpanded={() => true}
					expandableRowsHideExpander
					expandableRowsComponent={<ExpandableComponent />}
					onSelectedRowsChange={(selected) => {
						props.setSelectedRows(selected.selectedRows.map((r) => r.id));
						if (
							selected.allSelected === true &&
							props.modifiedRows.length === 0
						) {
							let modifiedRows = totalResults?.data.map((selectedResult) => {
								return {
									id: selectedResult.id,
									diseaseId:
										selectedResult.expertTags.length !== 0
											? selectedResult.expertTags[0]
											: selectedResult.diagnosisDetails &&
											  selectedResult.diagnosisDetails[0].causeInfo
											? selectedResult.diagnosisDetails[0].causeInfo[0].id
											: "",
									diseaseName:
										selectedResult.expertTags.length !== 0
											? (props?.diseaseData || []).filter(
													(r) => r.value === selectedResult.expertTags[0]
											  )[0]?.label
											: selectedResult.diagnosisDetails &&
											  selectedResult.diagnosisDetails[0].causeInfo
											? selectedResult.diagnosisDetails[0].causeInfo[0].name
											: "",
									cropId: selectedResult.cropId,
									cropName: props.cropData.filter(
										(r) => r.value === selectedResult.cropId
									)[0]?.label,
									title: selectedResult.title,
									image: selectedResult.imageUrl,
									tags: null,
									isNotification: true,
									showDiseaseError: false,
									partOfPlant: selectedResult.partOfPlant,
									trainedStatus: selectedResult.trainedStatus,
									isDiseasePresent: selectedResult.isDiseasePresent,
									isModelDetected: selectedResult.isModelDetected,
								};
							});
							props.setModifiedRows(modifiedRows);
						} else {
							let selectedResult = totalResults?.data?.filter(
								(row) => row.id === selected.selectedRows[0]?.id
							)[0];
							let modified = [...props.modifiedRows];
							if (selected.selectedRows.length > props.modifiedRows.length) {
								modified = [
									...modified,
									{
										id: selectedResult.id,
										diseaseId:
											selectedResult.expertTags.length !== 0
												? selectedResult.expertTags[0]
												: selectedResult.diagnosisDetails &&
												  selectedResult.diagnosisDetails[0].causeInfo
												? selectedResult.diagnosisDetails[0].causeInfo[0].id
												: "",
										diseaseName:
											selectedResult.expertTags.length !== 0
												? (props?.diseaseData || []).filter(
														(r) => r.value === selectedResult.expertTags[0]
												  )[0]?.label
												: selectedResult.diagnosisDetails &&
												  selectedResult.diagnosisDetails[0].causeInfo
												? selectedResult.diagnosisDetails[0].causeInfo[0].name
												: "",
										cropId: selectedResult.cropId,
										cropName: props.cropData.filter(
											(r) => r.value === selectedResult.cropId
										)[0]?.label,
										title: selectedResult.title,
										image: selectedResult.imageUrl,
										tags: null,
										isNotification: true,
										showDiseaseError: false,
										partOfPlant: selectedResult.partOfPlant,
										trainedStatus: selectedResult.trainedStatus,
										isDiseasePresent: selectedResult.isDiseasePresent,
										isModelDetected: selectedResult.isModelDetected,
									},
								];
							} else {
								modified = modified.filter((row) =>
									selected.selectedRows.some((r) => r.id === row.id)
								);
							}
							props.setModifiedRows(modified);
						}
					}}
				/>
				{/* )} */}
			</>
		);
	} else return <NoDataFound msg="No Records to display" />;
};

export default TotalData;
