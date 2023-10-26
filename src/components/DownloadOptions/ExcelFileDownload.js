/*
React Imports
 */
import React from "react";
import exportFromJSON from "export-from-json";
import { Button } from "reactstrap";
import { Oval } from "react-loader-spinner";

/**
 * Exporting Excel data
 * @param {Object} props
 */
const ExcelFileDownload = (props) => {
	const data = props.data || [];
	const fileName = props.fileName;
	const exportType = "csv";
	const isLoading = props.isLoading || false;
	// Returning Button to Export Data
	return (
		<div className="btnStyle">
			<Button
				disabled={isLoading || !data?.length}
				onClick={() => {
					exportFromJSON({ data, fileName, exportType });
				}}
				size="sm"
			>
				{isLoading ? (
					<Oval
						color="#fff"
						height={16}
						width={16}
						ariaLabel="fetching-data"
						visible={true}
						strokeWidth={6}
					/>
				) : (
					<>
						{props.name} <i className="fa fa-file-excel-o"></i>
					</>
				)}
			</Button>
		</div>
	);
};

export default ExcelFileDownload;
