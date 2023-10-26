import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "react-bootstrap";
import CustomSelect from "../../components/Select/Select";

const deeplinkTypes = [
	{
		label: "Revenue",
		value: "revenue",
	},
	{
		label: "Installation",
		value: "installation",
	},
];

function DynamicLink() {
	// onchange states
	const [excelFile, setExcelFile] = useState(null);
	const [excelFileError, setExcelFileError] = useState(null);
	const [deeplinkType, setDeeplinkType] = useState(deeplinkTypes[0]);
	// submit state
	const [excelData, setExcelData] = useState(null);

	const fileType = [
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	];
	// onchange event
	const handleFile = (e) => {
		let selectedFile = e.target.files[0];
		if (selectedFile) {
			if (selectedFile && fileType.includes(selectedFile.type)) {
				let reader = new FileReader();
				reader.readAsArrayBuffer(selectedFile);
				reader.onload = (e) => {
					setExcelFileError(null);
					setExcelFile(e.target.result);
				};
			} else {
				setExcelFileError("Please select only excel file types");
				setExcelFile(null);
			}
		} else {
		}
	};

	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setExcelData(null);
		if (excelFile !== null) {
			const workbook = XLSX.read(excelFile, { type: "buffer" });
			const worksheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[worksheetName];
			const data = XLSX.utils.sheet_to_json(worksheet);

			const modifiedData = await Promise.all(
				data.map(async (row) => {
					const customDeepLinkUrl = `${row.deepLinkUrl}?utm_source=${row.utmSource}&utm_medium=${row.utmMedium}&utm_campaign=${row.utmCampaign}`;
					const firebaseApiUrl =
						"https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAKxriPK4Mml3n6oqOGCcvLow4reeUk-yo";

					let androidDeeplinkInfo = { androidPackageName: "com.BigHaat" };
					if (deeplinkType.value === "revenue") {
						androidDeeplinkInfo = {
							androidPackageName: "com.BigHaat",
							androidFallbackLink: customDeepLinkUrl,
						};
					}

					const firebaseDeeplinkPayload = {
						dynamicLinkInfo: {
							domainUriPrefix: "https://bighaat.page.link",
							link: `${customDeepLinkUrl}&deepLinkParam=${row.deepLinkParam}`,
							androidInfo: androidDeeplinkInfo,
							analyticsInfo: {
								googlePlayAnalytics: {
									utmSource: row.utmSource,
									utmMedium: row.utmMedium,
									utmCampaign: row.utmCampgain,
								},
							},
						},
						suffix: {
							option: "UNGUESSABLE",
						},
					};
					try {
						let shortLink = null;
						let retries = 0;
						const maxRetries = 3;
						while (retries < maxRetries) {
							const response = await fetch(firebaseApiUrl, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(firebaseDeeplinkPayload),
							});
							const result = await response.json();
							if (response.ok) {
								shortLink = result.shortLink;
								break;
							} else if (response.status === 503 && retries < maxRetries - 1) {
								retries++;
								await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
							} else {
								throw new Error(result.error.message);
							}
						}

						return {
							...row,
							url: shortLink,
						};
					} catch (error) {
						console.error("Error generating short link:", error);
						return {
							...row,
							url: null,
						};
					}
				})
			);

			setExcelData(modifiedData);
		} else {
			setExcelData(null);
		}
	};

	// handle download
	const handleDownload = () => {
		if (excelData !== null) {
			const worksheet = XLSX.utils.json_to_sheet(excelData);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
			XLSX.writeFile(workbook, "uploaded_data.xlsx");
		}
	};

	return (
		<div>
			<div className="row">
				<div className="col-12">
					<h2 className="mainHeading">Bulk Deep Links Generator</h2>
				</div>
			</div>
			<div className="tableMainSection cardShadow space-md-inr">
				<form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-12 col-sm-6 col-md-3">
							<label htmlFor="excelFile">
								<h5>Upload Excel file</h5>
							</label>
							<br />
							<div className="custom-file">
								<input
									type="file"
									className="form-control-file"
									id="excelFile"
									onChange={handleFile}
									required
								/>
								{excelFileError && (
									<div className="text-danger" style={{ marginTop: "5px" }}>
										{excelFileError}
									</div>
								)}
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-3">
							<CustomSelect
								data={deeplinkTypes}
								placeholder="Select Deeplink Type"
								search={false}
								onSelect={(value) => {
									setDeeplinkType(value);
								}}
								value={deeplinkType}
							/>
						</div>
						<div className="col-12 col-sm-6 col-md-3">
							<button type="submit" className="btn btn-success">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
			<hr />
			<div>
				<div className="tableMainSection cardShadow space-md-inr">
					{excelData !== null ? (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "10px",
							}}
						>
							<h5> Generated Deep Links</h5>
							<div className="download-button">
								<button className="btn btn-primary" onClick={handleDownload}>
									Download Excel
								</button>
							</div>
						</div>
					) : (
						<></>
					)}
					<div
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{excelData === null ? (
							<p>No file selected</p>
						) : (
							<div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
								<Table className="table">
									<thead>
										<tr>
											<th scope="col">Deep Link URL</th>
											<th scope="col">UTM Source</th>
											<th scope="col">UTM Medium</th>
											<th scope="col">UTM Campaign</th>
											<th scope="col">DeepLink Param</th>
											<th scope="col">URL</th>
										</tr>
									</thead>
									<tbody>
										{excelData.map((row, index) => (
											<tr key={index}>
												<td>{row.deepLinkUrl}</td>
												<td>{row.utmSource}</td>
												<td>{row.utmMedium}</td>
												<td>{row.utmCampaign}</td>
												<td>{row.deepLinkParam}</td>
												<td>{row.url}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DynamicLink;
