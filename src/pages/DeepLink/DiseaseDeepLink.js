/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import DiseaseDeepLinkTable from "../../services/TablesData/DiseaseDeepLinkTable";
import {
	createDeepLink,
	fetchDeepLinks,
} from "../../redux/actions/DeepLink/deepLink";
import {
	dynamicLinkGenerationApi,
	fetchDiseaseCauseByIdApi,
} from "../../services/Deeplinking";

//Deeplinking Implementation

const DiseaseDeepLink = () => {
	const diseases = useSelector((state) => state.cropDocInfo).diseases;

	const diseaseDeeplinks = useSelector(
		(state) => state.deepLinks?.diseaseDeeplinks
	);
	const [loading, setLoading] = useState(false);
	const [selectedDisease, setSelectedDisease] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		deepLinkList();
	}, []);

	const deepLinkList = async () => {
		await dispatch(fetchDeepLinks("pestCareDisease"))
			.then(() => {})
			.catch((err) => {
				Alert.error(err.message);
			});
	};

	const diseaseData = diseases.filter(
		(c) => !diseaseDeeplinks.some((d) => c.id === d.linkId)
	);

	const submitHandle = async (e) => {
		e.preventDefault();
		setLoading(true);
		let getDiseaseCauseId;
		try {
			getDiseaseCauseId = await fetchDiseaseCauseByIdApi(selectedDisease.value);
		} catch (error) {
			console.error(error);
		}
		const responseDiseaseLinkData = await dynamicLinkGenerationApi(
			getDiseaseCauseId[0].id,
			"pestCareDisease",
			"UNGUESSABLE"
		);
		const data = {
			linkId: selectedDisease.value,
			linkType: "pestCareDisease",
			linkName: selectedDisease.label,
			deepLinkUrl: responseDiseaseLinkData?.shortUrl,
			generatedBy: null,
			linkFormat: "UNGUESSABLE",
			generatedFrom: "web",
		};

		await dispatch(createDeepLink(data))
			.then(() => {
				Alert.success("Updated Successfully");
				window.location.reload();
			})
			.catch((err) => {
				Alert.error(err.message);
			});
		setLoading(false);
	};

	return (
		<div className="row">
			<div className="col-12">
				<div className="row">
					<div className="col-12">
						<h2 className="mainHeading">Disease Deep links</h2>
					</div>
				</div>
				<div className="tableMainSection cardShadow space-md-inr">
					<form>
						<div className="row">
							<div className="col-12 col-sm-4">
								<CustomSelect
									placeholder="Select diseases"
									search={true}
									data={
										diseaseData.length !== 0
											? diseaseData.map((row) => {
													return {
														label: row.name,
														value: row.id,
													};
											  })
											: []
									}
									onSelect={(option) => {
										if (option) setSelectedDisease(option);
										else setSelectedDisease([]);
									}}
									disabled={true}
								/>
							</div>
							<div className="col-12 col-sm-4">
								<OverlayTrigger
									overlay={
										diseaseData.length === 0 ? (
											<Tooltip id="tooltip-disabled">
												All diseases links generated
											</Tooltip>
										) : !selectedDisease ? (
											<Tooltip id="tooltip-top">Select diseases</Tooltip>
										) : (
											<Tooltip id="tooltip-top">
												Click to generate deep links
											</Tooltip>
										)
									}
								>
									<span className="d-inline-block">
										<button
											disabled={
												loading || diseaseData.length === 0 || !selectedDisease
											}
											className="btn btn-md btn-primary"
											onClick={submitHandle}
											style={
												diseaseData.length === 0 || !selectedDisease
													? { pointerEvents: "none" }
													: {}
											}
										>
											Generate Deep Link
										</button>
									</span>
								</OverlayTrigger>
							</div>
						</div>
					</form>
				</div>
				<div className="tableMainSection cardShadow topUsersMainSec">
					{/* Table for Vision Tags */}
					<div className="visionTagsSec">
						{diseaseDeeplinks?.length !== 0 ? (
							<DiseaseDeepLinkTable data={diseaseDeeplinks} />
						) : (
							"No Records Found"
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiseaseDeepLink;
