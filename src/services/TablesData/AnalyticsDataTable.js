/* 
React Imports
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
/*
Custom Component Imports
 */
import { TOTAL_USERS } from "../../redux/actions/storepage";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
//import NormalDataTable from "../../components/DataTables/NormalDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import { PageLoader } from "../../components/Loading/Loading";
import * as constants from "../../constants";

const ImageModal = (props) => {
	return (
		<Modal
			overflow={false}
			show={props.showModal}
			onHide={() => props.setShowModal(false)}
		>
			<Modal.Body>
				<img
					src={constants.mediaUrl + props.image}
					alt="Not Found"
					style={{ width: "100%", height: "500px" }}
				/>
			</Modal.Body>
		</Modal>
	);
};

const AnalyticsDataTable = (props) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [image, setImage] = useState("");

	if (props.isLoading) {
		return <PageLoader />;
	}

	// const data = props.pagination ? results : results;
	if (props.results?.length !== 0) {
		//Column names for table
		const columns = [
			{
				name: "Crops",
				selector: "crops",
				center: true,
			},
			{
				name: "Image",
				selector: "image",
				center: true,
			},
			{
				name: "Disease",
				selector: "disease",
				center: true,
			},
			{
				name: "State",
				selector: "state",
				center: true,
			},
			{
				name: "District",
				selector: "district",
				center: true,
			},
		];

		// Fetching Row Data
		let rows = props.results?.map((row) => {
			return {
				state: row.state != null && row.state !== "" ? row.state : "N/A",
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

				crops: row?.cropData?.cropName ? row?.cropData?.cropName : "N/A",

				district:
					row.district != null && row.district !== "" ? row.district : "N/A",
				disease:
					row?.cropDocData?.diagnosisDetails?.length
						? row?.cropDocData?.diagnosisDetails[0]?.causeInfo[0]?.name
						: "N/A",
			};
		});

		//Address Null Implementation
		rows = rows?.map((row) => {
			return {
				state: row.state,
				crops: row.crops,
				district: row.district,
				disease: row.disease,
				image: row.image,
			};
		});

		// Returning data table
		return (
			<>
				<ImageModal
					image={image}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
				<PaginationDataTable
					Type={TOTAL_USERS}
					activePage={props.pagenum}
					pageAmount={props.pageAmount}
					title="Analytics Details"
					setActivePage={props.setPagenum}
					setPageAmount={props.setPageAmount}
					dispatch={dispatch}
					callHandle={props.callHandle}
					columns={columns}
					data={rows}
					searchValue=""
					totalCount={props.total}
				/>
			</>
		);
	} else {
		return <NoDataFound msg="No Data Found" />;
	}
};

export default AnalyticsDataTable;
