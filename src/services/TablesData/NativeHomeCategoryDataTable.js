import React from "react";
import { useDispatch } from "react-redux";
import Delete from "../../components/Common/DeleteRow";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import { PageLoader } from "../../components/Loading/Loading";
import * as constants from "../../constants";
import EditNativeHomeCategory from "../../pages/Banners/NativeHomeCayegory/EditNativeHomeCategory";
const NativeHomeCategoryDataTable = (props) => {
	const dispatch = useDispatch();

	const columns = [
		{
			name: "Display Order",
			selector: "display_order",
			center: true,
		},
		{
			name: "Title",
			selector: "title",
			center: true,
		},
		{
			name: "Name",
			selector: "name",
			center: true,
		},
		{
			name: "Banner Media",
			selector: "banner_media",
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

	const nativeHomeCategoryData = props.results?.map((row) => {
		return {
			title: row.title,
			display_order: row.displayOrder,
			name: row.name,
			banner_media: (
				<a
					target="_blank"
					href={
						row.length !== 0 && row.imageUrl?.startsWith("products")
							? constants.mediaUrl + row.imageUrl
							: row.imageUrl
					}
					rel="noreferrer"
				>
					<img
						src={
							row.length !== 0 && row.imageUrl?.startsWith("products")
								? constants.mediaUrl + row.imageUrl
								: row.imageUrl
						}
						alt="Not Uploaded"
						className="cropDoctorResults"
					/>
				</a>
			),
			update: (
				<EditNativeHomeCategory
					id={row.id}
					pagenum={props.pagenum}
					pageAmount={props.pageAmount}
					notAllowedBannersPosition={props.results
						.filter((r) => r.displayOrder !== 0)
						.map((r) => r.displayOrder)}
				/>
			),
			delete: (
				<Delete
					deleterow={props.delBanner}
					id={row.id}
					name={row.name}
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
				data={nativeHomeCategoryData}
				searchValue=""
				totalCount={props.total}
			/>
		</>
	);
};

export default NativeHomeCategoryDataTable;
