//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";
import dateFormat from "dateformat";

//Custom Imports
import {
	fetchAnalyticsCrops,
	fetchAnalyticsStates,
	fetchAnalyticsDistricts,
	fetchAnalyticsDiseases,
	fetchAnalyticsResults,
	fetchAnalyticsCount,
	fetchAnalyticsDiseaseType,
	fetchAnalyticsCropType,
	fetchDiseaseAnalyticsResults,
	fetchCropsAnalyticsResults,
	fetchAnalyticsStageCount,
	fetchCropDocDailyStatsCount,
	fetchAnalyticsResultsForExcelData,
} from "../../redux/actions/Analytics/analytics";
import AnalyticsDataTable from "../../services/TablesData/AnalyticsDataTable";
import Error from "../Error/Error";
import "../../components/Search/SearchStyle.css";
import AnalyticsFilter from "../../layouts/Filtering/AnalyticsFilter";
import { getLanguages } from "../../services/Languages";
import Card from "../../components/Card/Card";
import * as Constants from "../../constants";
import Analytics from "../../layouts/Stats/Analytics";

import StageGroupedBar from "../../components/Chart/StageChart";

import CustomSelect from "../../components/Select/Select";
import ErrorComponent from "../../components/Error/Error";
//Redering Users Data
const Analytic = (props) => {
	const [pagination, setPagination] = useState(true);
	const [from, setFrom] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [to, setTo] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [searchValue, setSearchValue] = useState("");
	const [selectedCrop, setSelectedCrop] = useState("");
	const [selectedDisease, setSelectedDisease] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [language, setLanguage] = useState("");
	const [pagenum, setPagenum] = useState(1);
	const [pageAmount, setPageAmount] = useState(10);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [fromDate, setFromDate] = useState(
		dateFormat(Date.now(), "yyyy-mm-dd")
	);
	const [toDate, setToDate] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [isStatsLoading, setIsStatsLoading] = useState(true);
	const [stageChartOption, setStageChartOption] = useState({
		label: "Stage 1",
		value: "stage1Predictions",
	});
	const [stageChartValue, setStageChartValue] = useState({
		label: ">60",
		value: 60,
	});
	const [analyticsDataForExcel, setAnalyticsDataForExcel] = useState([]);

	const dispatch = useDispatch();
	const crops = useSelector((state) => state.analytics.getAnalyticsCrops);
	const states = useSelector((state) => state.analytics.getAnalyticsStates);
	const districts = useSelector(
		(state) => state.analytics.getAnalyticsDistricts
	);
	const disease = useSelector((state) => state.analytics.getAnalyticsDiseases);
	const results = useSelector((state) => state.analytics.getAnalyticsresult);
	const count = useSelector((state) => state.analytics.getAnalyticsCount);
	const totalGridCount = results ? results[0]?.filterCount : 10;
	const diseaseByType = useSelector(
		(state) => state.analytics.getAnalyticsDiseaseType
	);
	const cropByType = useSelector(
		(state) => state.analytics.getAnalyticsCropType
	);

	const getDiseaseAnalyticsResults = useSelector(
		(state) => state.analytics.getDiseaseAnalyticsResults
	);

	const getCropsAnalyticsResults = useSelector(
		(state) => state.analytics.getCropsAnalyticsResults
	);

	const getAnalyticsStageCount = useSelector(
		(state) => state.analytics.getAnalyticsStageCount
	);

	const cropDocDailyStatsCount = useSelector(
		(state) => state.analytics.cropDocStatsCount
	);

	const stageChartOptionSelect = (options) => {
		setStageChartOption(options);
	};

	const stageChartValueSelect = (options) => {
		setStageChartValue(options);
	};

	useEffect(() => {
		fetchAnalyticsStageCountResult(
			stageChartOption.value,
			stageChartValue.value
		);
	}, [stageChartOption.value, stageChartValue.value]);

	const fetchAnalyticsStageCountResult = async (stage, value) => {
		await dispatch(fetchAnalyticsStageCount(stage, value));
	};
	//pagination handler

	const handlefetchusers = async (number, amount) => {
		setIsLoading(true);
		let crop = selectedCrop ? selectedCrop.value : "";
		let state = selectedState ? selectedState.value : "";
		let district = selectedDistrict ? selectedDistrict.value : "";
		let diesease = selectedDisease ? selectedDisease.value : "";
		await dispatch(
			fetchAnalyticsResults(
				from,
				to,
				crop,
				state,
				district,
				diesease,
				number,
				amount,
				true
			)
		);
		setIsLoading(false);
	};

	useEffect(() => {
		getCropsData();
		handlefetchusers(pagenum, pageAmount);
	}, []);

	useEffect(() => {
		if (results?.length && totalGridCount && from && to) {
			fetchAnalyticsResultsForExcelData(
				from,
				to,
				totalGridCount,
				pagenum,
				selectedCrop.value,
				selectedState.value,
				selectedDistrict.value,
				selectedDisease.value,
				true
			)
				.then((resp) => {
					setAnalyticsDataForExcel(resp);
				})
				.catch((error) => {
					console.error("Error in Fetching Excel Data==", error);
				});
		}
	}, [totalGridCount]);

	const getCropsData = async () => {
		setIsLoading(true);
		await dispatch(fetchAnalyticsCrops());
		await dispatch(fetchAnalyticsStates());
		await dispatch(fetchAnalyticsDistricts());
		await dispatch(fetchAnalyticsDiseases());
		await dispatch(fetchAnalyticsCount());
		await dispatch(fetchAnalyticsDiseaseType());
		await dispatch(fetchAnalyticsCropType());
		await dispatch(fetchDiseaseAnalyticsResults());
		await dispatch(fetchCropsAnalyticsResults());
		setIsLoading(false);
	};

	const searchByFilter = async (
		from,
		to,
		crop,
		state,
		disease,
		district,
		number,
		amount,
		reset
	) => {
		setIsLoading(true);
		await dispatch(
			fetchAnalyticsResults(
				from,
				to,
				crop,
				state,
				disease,
				district,
				number,
				amount,
				reset
			)
		)
			.then(() => {})
			.catch((err) => {
				setError(err);
			});
		setIsLoading(false);
	};

	//Date filter submit
	const handleDateFilterSubmit = () => {
		if (to && !from) {
			Alert.error("Input From date");
		} else if (to && from && to < from) {
			Alert.error("To Date should be greater than From Date");
		} else {
			setPagination(false);
			setIsLoading(true);
			searchByFilter(
				from !== "" && from !== undefined ? new Date(from).toISOString() : "",
				to !== "" && to !== undefined
					? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
					: "",
				selectedCrop ? selectedCrop.value : "",
				selectedState ? selectedState.value : "",
				selectedDistrict ? selectedDistrict.value : "",
				selectedDisease ? selectedDisease.value : "",
				pagenum,
				pageAmount,
				true
			);
			setIsLoading(false);
		}
	};

	const getCropDocDailyStatsCount = async (fromDate, toDate) => {
		setIsStatsLoading(true);
		try {
			await dispatch(fetchCropDocDailyStatsCount(fromDate, toDate));
			setIsStatsLoading(false);
		} catch (err) {
			setIsStatsLoading(false);
			Alert.error(err.message);
		}
		setIsStatsLoading(false);
	};

	useEffect(() => {
		if (fromDate > toDate) {
			Alert.error("From Date should be less than to date");
		} else {
			if (fromDate !== "" && toDate !== "") {
				getCropDocDailyStatsCount(
					new Date(fromDate).toISOString(),
					new Date(toDate).toISOString()
				);
			}
		}
	}, [fromDate, toDate]);

	//Results Error
	if (error) {
		Alert.error(error);
	} else {
		//Excel data loading
		const excel_data =
			analyticsDataForExcel &&
			analyticsDataForExcel?.map((row) => {
				return {
					Crops: row?.cropData?.cropName ? row?.cropData?.cropName : "N?A",
					Image: Constants.mediaUrl + row.imageUrl,
					Diseases: row?.cropDocData?.diagnosisDetails?.length
						? row?.cropDocData?.diagnosisDetails[0]?.causeInfo[0]?.name
						: "N/A",
					State: row.state != null && row.state !== "" ? row.state : "N/A",
					District:
						row.district != null && row.district !== "" ? row.district : "N/A",
				};
			});

		return (
			<div>
				<div className="row">
					<div className="col-12">
						<div className="d-flex justify-content-start py-0">
							<h2 className="mainHeading">Analytics Report</h2>
						</div>
					</div>
				</div>
				{/* Statistical data */}
				<div className="row">
					<div className="col-12">
						<Analytics
							detected={count.detected ? count.detected : "isLoading"}
							unDetected={count.unDetected ? count.unDetected : "isLoading"}
							diseaseByType={diseaseByType ? diseaseByType : "isLoading"}
							cropByType={cropByType ? cropByType : "isLoading"}
							total={
								count.totalLocationEnabledUsers
									? count.totalLocationEnabledUsers
									: "isLoading"
							}
							getDiseaseAnalyticsResults={
								getDiseaseAnalyticsResults
									? getDiseaseAnalyticsResults
									: "isLoading"
							}
							getCropsAnalyticsResults={
								getCropsAnalyticsResults
									? getCropsAnalyticsResults
									: "isLoading"
							}
							fromDate={fromDate}
							toDate={toDate}
							setFromDate={setFromDate}
							setToDate={setToDate}
							cropDocDailyStatsCount={
								isStatsLoading ? "isLoading" : cropDocDailyStatsCount
							}
						/>
					</div>
				</div>

				<div className="dashedLine"></div>
				<div className="row">
					<div className="col-12 col-md-12 col-lg-12">
						<div className="tableMainSection cardShadow">
							{props.chartDataError ? (
								<ErrorComponent msg={props.chartDataError} />
							) : props.chartData === "isLoading" ? (
								<div
									className="col-12 d-flex align-items-center justify-content-center"
									style={{ height: "100%" }}
								>
									<Spinner />
								</div>
							) : (
								<div className="col-12">
									<div
										className="tableFix"
										style={{
											height: "400px",
										}}
									>
										<StageGroupedBar
											data={getAnalyticsStageCount}
											// num={stageChartOption.value}
										/>
									</div>
								</div>
							)}
							<div
								style={{
									display: "flex",
									paddingLeft: "15px",
									paddingBottom: "15px",
								}}
							>
								<div style={{ width: "150px", marginRight: "15px" }}>
									<CustomSelect
										placeholder="Select Type"
										search={false}
										onSelect={stageChartOptionSelect}
										data={[
											{
												label: "Stage 1",
												value: "stage1Predictions",
											},
											{
												label: "Stage 2",
												value: "stage2Predictions",
											},
											{
												label: "Stage 3",
												value: "stage3Predictions",
											},
										]}
										value={stageChartOption}
										name="select-type"
									/>
								</div>

								<div style={{ width: "150px" }}>
									<CustomSelect
										placeholder="Select Type"
										search={false}
										onSelect={stageChartValueSelect}
										data={[
											{
												label: ">60",
												value: 60,
											},
											{
												label: ">70",
												value: 70,
											},
											{
												label: ">80",
												value: 80,
											},
										]}
										value={stageChartValue}
										name="select-type"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="dashedLine"></div>
				{/*Filtering Layout */}
				<AnalyticsFilter
					dateFilter={true}
					from={from}
					setFrom={setFrom}
					to={to}
					setTo={setTo}
					handleSubmit={() => {
						handleDateFilterSubmit();
					}}
					excel_data={excel_data}
					excel_fileName="Analytics Data"
					setSearchValue={(e) => setSearchValue(e)}
					searchValue={searchValue}
					searchDisable={
						!from &&
						!to &&
						!selectedCrop &&
						!selectedState &&
						!selectedDistrict &&
						!selectedDisease
					}
					search={true}
					clearFilter={() => {
						setPagenum(1);
						setPageAmount(10);
						handlefetchusers(pagenum, pageAmount);
						setFrom(dateFormat(Date.now(), "yyyy-mm-dd"));
						setTo(dateFormat(Date.now(), "yyyy-mm-dd"));
						setSearchValue("");
						setPagination(true);
						setSelectedCrop("");
						setSelectedState("");
						setLanguage("");
						setIsSubmitted(false);
						setSelectedDistrict("");
						setSelectedDisease("");
					}}
					crops={crops.crops?.map((r) => {
						return {
							label: r,
							value: r,
						};
					})}
					selectedCrop={selectedCrop}
					setSelectedCrop={setSelectedCrop}
					states={states.states?.map((r) => {
						return {
							label: r,
							value: r,
						};
					})}
					selectedState={selectedState}
					setSelectedState={setSelectedState}
					languages={getLanguages()}
					language={language}
					setLanguage={setLanguage}
					districts={districts.districts?.map((r) => {
						return {
							label: r,
							value: r,
						};
					})}
					selectedDistrict={selectedDistrict}
					setSelectedDistrict={setSelectedDistrict}
					disease={disease.diseases?.map((r) => {
						return {
							label: r,
							value: r,
						};
					})}
					selectedDisease={selectedDisease}
					setSelectedDisease={setSelectedDisease}
				/>
				{/* Implemented pagenation so i don't see any use of this 
            will remove code i get confirmation
        */}
				{/* {!pagination && (
          <div className="row mb-md-0 mb-4 mb-xl-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0"></div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0"></div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0"></div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseBlueCard"
                cardHeading="Total Filtered Results"
                cardText={""}
                number={results.length}
                isLoading={results.isLoading ? true : false}
              />
            </div>
          </div>
        )} */}

				{/* Users Data Table */}
				<AnalyticsDataTable
					callHandle={handlefetchusers}
					pagination={pagination}
					results={results}
					pagenum={pagenum}
					pageAmount={pageAmount}
					setPagenum={setPagenum}
					setPageAmount={setPageAmount}
					total={totalGridCount}
					isLoading={isLoading}
				/>
			</div>
		);
	}
};

export default Analytic;
