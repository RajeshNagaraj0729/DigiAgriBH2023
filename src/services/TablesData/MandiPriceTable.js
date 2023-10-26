/*
React Imports
 */
import React from "react";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";

/**
 * Table for Mandi Price Table
 * @param {props} props
 */
const MandiPriceTable = (props) => {
	// Column names
	const columns = [
		{
			name: "Crop",
			selector: "crop",
			center: true,
		},
		{
			name: "District",
			selector: "district",
			center: true,
		},
		{
			name: "Market",
			selector: "market",
			center: true,
		},
		{
			name: "State",
			selector: "state",
			center: true,
		},
		{
			name: "Max Price",
			selector: "maxPrice",
			center: true,
			sortable: true,
		},
		{
			name: "Min Price",
			selector: "minPrice",
			center: true,
			sortable: true,
		},
		{
			name: "Modal Price",
			selector: "modalPrice",
			center: true,
			sortable: true,
		},
	];

	// Fetching Row Data
	let data = props.data?.map((row) => {
		return {
			crop: row.commodity,
			district: row.district,
			state: row.state,
			maxPrice: row.max_price,
			minPrice: row.min_price,
			modalPrice: row.modal_price,
			market: row.market,
		};
	});

	if (!props.showTotal) {
		data = data.filter(
			(r) =>
				props.crops?.some(
					(x) =>
						x
							.toLowerCase()
							.replace(" ", "")
							.includes(r.crop.toLowerCase().replace(" ", "")) ||
						r.crop
							.toLowerCase()
							.replace(" ", "")
							.includes(x.toLowerCase().replace(" ", "")) ||
						r.crop === "Bhindi(Ladies Finger)" ||
						r.crop === "Chili Red" ||
						r.crop === "Lemon" ||
						r.crop === "Orange",
				) && r.crop !== "Sweet Potato",
		);
	}

	if (props.searchValue) {
		data = data?.filter(
			(r) =>
				r.crop
					.toLowerCase()
					.replace(" ", "")
					.includes(props.searchValue.replace(" ", "").toLowerCase()) ||
				r.district
					.toLowerCase()
					.replace(" ", "")
					.includes(props.searchValue.replace(" ", "").toLowerCase()) ||
				r.state
					.toLowerCase()
					.replace(" ", "")
					.includes(props.searchValue.replace(" ", "").toLowerCase()) ||
				r.market
					.toLowerCase()
					.replace(" ", "")
					.includes(props.searchValue.replace(" ", "").toLowerCase()),
		);
	}

	// Returning data table
	return (
		<NormalDataTable
			title="Mandi Prices"
			columns={columns}
			data={data}
			length={data.length}
			customStyles={{ rows: { style: { height: "80px" } } }}
		/>
	);
};

export default MandiPriceTable;
