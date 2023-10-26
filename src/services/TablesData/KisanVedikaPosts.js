/*
React Imports
 */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { Modal } from "rsuite";
import Carousel from "react-bootstrap/Carousel";
import moment from "moment-timezone";

/*
Custom Component Imports
 */
import DataTable from "../../components/DataTables/PaginationDataTable";
import * as constants from "../../constants";
import { Link } from "react-router-dom";
import { PageLoader } from "../../components/Loading/Loading";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import DeleteRow from "../../components/Common/DeleteRow";
import { UTCtolocalDate } from "../../Utils/dataUtils";
import { validateShowMobileNumberFunctionToUsers } from "../../Utils/utils";

export const POSTS = "POSTS";

const CustomCarousel = (props) => {
	return (
		<Carousel>
			{props.data.map((r, i) => {
				return (
					<Carousel.Item>
						<h3
							className="d-flex align-items-center justify-content-center"
							style={{ color: "red" }}
						>
							{r.mediaType === "video" && "Video File!"}
							{r.mediaType === "youtube" && "Youtube Video!"}
						</h3>
						<div className="d-flex align-items-center justify-content-center">
							{r.mediaType === "video" ? (
								<video width="70%" height="500" controls>
									<source src={r.mediaUrl} type="video/mp4" />
								</video>
							) : r.mediaType === "youtube" ? (
								<iframe
									width="70%"
									height="500"
									allowFullScreen
									src={`https://www.youtube.com/embed/${r.mediaUrl}?controls=1`}
								></iframe>
							) : (
								<img
									className="d-block w-100"
									src={r.mediaUrl}
									alt="Not Uploaded"
									style={{ height: "500px" }}
								/>
							)}
						</div>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
};

const CarouselModal = (props) => {
	return (
		<Modal
			overflow={false}
			show={props.showModal}
			onHide={() => props.setShowModal(false)}
		>
			<Modal.Body>
				<CustomCarousel data={props.images} />
			</Modal.Body>
		</Modal>
	);
};

/**
 * Table for News Icons
 * @param {props} props
 */
const KVPostsTable = (props) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [modalImages, setModalImages] = useState([]);

	const loggedInUsers = JSON.parse(window.localStorage.getItem("user"));
	const mobileNo = loggedInUsers?.phone;

	if (props.loading) {
		return <PageLoader />;
	}

	// Column names
	const columns = [
		{
			name: "Username",
			selector: "username",
			center: true,
		},
		{
			name: "Mobile No.",
			selector: "mobileno",
			center: true,
			omit: !validateShowMobileNumberFunctionToUsers(mobileNo),
		},
		{
			name: "Title",
			selector: "title",
			center: true,
		},
		{
			name: "Crop Name",
			selector: "cropname",
			center: true,
		},
		{
			name: "Location",
			selector: "location",
			center: true,
		},
		{
			name: "Images",
			selector: "images",
			center: true,
		},
		{
			name: "Posted At",
			selector: "postedAt",
			center: true,
		},
		{
			name: "Reply Count",
			selector: "replyCount",
			center: true,
		},
		{
			name: "View Result",
			selector: "viewResult",
		},
		{
			name: "",
			selector: "deletePost",
		},
	];

	const getUserLocationByTags = (tags) => {
		try {
			let location = "N/A";
			if (tags.length > 0) {
				if (!!tags[2]) {
					location = tags[2];
				} else if (!!tags[3]) {
					location = tags[3];
				}
			}
			return location;
		} catch (error) {}
	};

	// Fetching Row Data
	const data = props.data.map((row) => {
		const mediaType = row?.media[0]?.mediaType || "image";
		return {
			username: row.users[0]
				? row.users[0].firstName + " " + row.users[0].lastName
				: "N/A",
			mobileno: row.users[0] ? row.users[0].phone : "N/A",
			postedAt: UTCtolocalDate(row.postedAt),
			//postedAt: moment.tz(row.postedAt, 'Asia/kolkata').format('DD/MM/YYYY, h:mm:ss a'),
			//postedAt: dateFormat(row.postedAt, "dd/mm/yyyy, h:MM:ss TT"),
			title: row.title,
			cropname: row.crops[0]?.cropName,
			location: getUserLocationByTags(row.tags),
			images:
				row.media.length === 0 ? (
					<div className="bgDanger whiteText smPadding smBorderRadius">
						No Images found
					</div>
				) : (
					<>
						{mediaType === "youtube" ? (
							<>
								<button
									className="btn btn-sm btn-primary"
									style={{ color: "white", backgroundColor: "#FF0000" }}
									onClick={() => {
										setShowModal(true);
										setModalImages(
											row.media.map((r) => {
												return {
													mediaUrl:
														r.mediaUrl.startsWith("https://") ||
														r.mediaType === "youtube"
															? r.mediaUrl
															: constants.mediaUrl +
															  r.mediaUrl +
															  constants.sasToken,
													mediaType: r.mediaType,
												};
											})
										);
									}}
								>
									Youtube Video
								</button>
							</>
						) : (
							<button
								className="btn btn-sm btn-primary"
								style={{ color: "white", backgroundColor: "#007bff" }}
								onClick={() => {
									setShowModal(true);
									setModalImages(
										row.media.map((r) => {
											return {
												mediaUrl:
													r.mediaUrl.startsWith("https://") ||
													r.mediaType === "youtube"
														? r.mediaUrl
														: constants.mediaUrl +
														  r.mediaUrl +
														  constants.sasToken,
												mediaType: r.mediaType,
											};
										})
									);
								}}
							>
								View Images
							</button>
						)}
					</>
				),
			replyCount: row.replyCount,
			viewResult: (
				<Link to={`/kisan-vedika/posts/${row.id}`} target="_blank">
					<i className="fa fa-folder-open"></i>
				</Link>
			),
			deletePost: (
				<DeleteRow
					id={row.id}
					name={row.title}
					deleterow={props.deletePost}
					outlined={true}
				/>
			),
		};
	});

	// Returning data table
	return (
		<div>
			<CarouselModal
				showModal={showModal}
				setShowModal={setShowModal}
				images={modalImages}
			/>
			<DataTable
				title="Kisan Vedika Posts"
				Type={POSTS}
				activePage={props.pagenum}
				pageAmount={props.pagesize}
				setActivePage={props.setPagenum}
				setPageAmount={props.setPagesize}
				dispatch={dispatch}
				callHandle={props.callHandle}
				columns={columns}
				data={data}
				searchValue=""
				totalCount={props.totalCount}
			/>
		</div>
	);
};

export default KVPostsTable;
