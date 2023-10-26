import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../components/Common/DeleteRow";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import EditWSFBanner from "../../pages/Banners/WSFBanners/EditWSFBanner";
import dateFormat from "dateformat";
import * as constants from "../../constants";

const WSFBannerDataTable = (props) => {
	const dispatch = useDispatch();
	const banners = useSelector(
		(state) => state.nativeStore?.nativeHomeBannerdata
	);
	const [bannersSortedData, setBannersSortedData] = useState([]);

	useEffect(() => {
		if (banners && banners.length) {
			const sortedData = banners.map((item) => {
				if (
					new Date(item.activeTo).setHours(0, 0, 0, 0) >=
						new Date().setHours(0, 0, 0, 0) &&
					new Date(item.activeFrom).setHours(0, 0, 0, 0) <=
						new Date().setHours(0, 0, 0, 0)
				) {
					item.isActive = 1;
				} else {
					item.isActive = 0;
				}
				return item;
			});
			setBannersSortedData(
				sortedData.sort((a, b) => a.isActive - b.isActive).reverse()
			);
		}
	}, [banners]);

	const columns = [
		{
			name: "Banner Position",
			selector: "bannerPosition",
			center: true,
		},
		{
			name: "Banner Name",
			selector: "bannerName",
			center: true,
		},
		{
			name: "Active From",
			selector: "activeFrom",
			center: true,
		},
		{
			name: "Active To",
			selector: "activeTo",
			center: true,
		},
		{
			name: "Banner Media",
			selector: "bannerMedia",
			center: true,
		},
		{
			name: "Status",
			selector: "status",
			center: true,
		},
		{
			name: "Update",
			selector: "update",
			center: true,
		},
		{
			name: "Delete",
			selector: "delete",
			center: true,
		},
	];

	let nativeHomeBannerData = props.results?.map((row) => {
		return {
			bannerPosition: row.displayOrder,
			bannerName: row.bannerName,
			activeFrom: dateFormat(row.activeFrom, "dd/mm/yyyy"),
			activeTo: dateFormat(row.activeTo, "dd/mm/yyyy"),
			bannerMedia: (
				<a
					target="_blank"
					href={
						row.bannerMedia.length !== 0 &&
						row.bannerMedia[0]?.startsWith("banners")
							? constants.mediaUrl + row.bannerMedia[0] + constants.sasToken
							: row.bannerMedia[0]
					}
					rel="noreferrer"
				>
					<img
						src={
							row.bannerMedia.length !== 0 &&
							row.bannerMedia[0]?.startsWith("banners")
								? constants.mediaUrl + row.bannerMedia[0] + constants.sasToken
								: row.bannerMedia[0]
						}
						alt="Not Uploaded"
						className="cropDoctorResults"
					/>
				</a>
			),
			status: row.isActive ? (
				<div className="bgSuccess whiteText smPadding smBorderRadius">
					Active
				</div>
			) : (
				<div className="bgDanger whiteText smPadding smBorderRadius">
					Inactive
				</div>
			),
			update: (
				<EditWSFBanner
					id={row.id}
					language={props.language}
					pagenum={props.pagenum}
					pageAmount={props.pageAmount}
					type={props.type}
				/>
			),
			delete: (
				<Delete
					deleterow={props.delBanner}
					id={row.id}
					name={row.bannerName}
					outlined={true}
				/>
			),
		};
	});

	return (
		<>
			<PaginationDataTable
				activePage={props.pagenum}
				pageAmount={props.pageAmount}
				setActivePage={props.setPagenum}
				setPageAmount={props.setPageAmount}
				dispatch={dispatch}
				callHandle={props.callHandle}
				columns={columns}
				data={nativeHomeBannerData}
				searchValue=""
				totalCount={props.total}
				language={props.language}
				type={props.type}
			/>
		</>
	);
};

export default WSFBannerDataTable;
