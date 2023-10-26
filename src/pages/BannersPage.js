import React, { useEffect, useState } from "react";
import Select from "react-select";
import Banners from "./Banners/HomeBanners/HomeBanners";
import KVBanners from "./Banners/KVBanners/KVBanners";
import MapBanners from "./Banners/MapBanners/MapBanners";
import NativeHomeBanners from "./Banners/NativeHomeBanners/NativeHomeBanners";
import WSFHeroBanner from "./Banners/WSFBanners/WSFHeroBanners";
import WSF_Exclusive from "./Banners/WSFBanners/WSFExclusive";
import WSF_Discount from "./Banners/WSFBanners/WSFDiscount";
import WSFSeries1 from "./Banners/WSFBanners/WSFSeries1";
import WSF_Series2 from "./Banners/WSFBanners/WSFSeries2";

const typeOptions = [
	{ label: "Home", value: "home" },
	{ label: "KV", value: "kisan-banners" },
	{ label: "Map", value: "map-banners" },
	{ label: "Native", value: "native" },
	{ label: "WSF HeroBanner", value: "website.herobanner" },
	{ label: "WSF Exclusive", value: "website.exclusive" },
	{ label: "WSF Discount", value: "website.discount" },
	{ label: "WSF Series1", value: "website.series1" },
	{ label: "WSF Series2", value: "website.series2" },
];
const BannersPage = (props) => {
	const [selectedType, setSelectedType] = useState(() => {
		// Initialize with the value from local storage, or the default value
		const savedType = localStorage.getItem("selectedType");
		return savedType
			? typeOptions.find((option) => option.value === savedType)
			: typeOptions[0];
	});

	useEffect(() => {
		localStorage.setItem("selectedType", selectedType.value); // Saving the selectedType to local storage whenever it changes
	}, [selectedType]);

	const bannerTypeComponents = {
		home: <Banners />,
		"kisan-banners": <KVBanners />,
		"map-banners": <MapBanners />,
		native: <NativeHomeBanners />,
		"website.herobanner": <WSFHeroBanner />,
		"website.exclusive": <WSF_Exclusive />,
		"website.discount": <WSF_Discount />,
		"website.series1": <WSFSeries1 />,
		"website.series2": <WSF_Series2 />,
	};

	const selectedBannerComponent = bannerTypeComponents[selectedType.value];

	return (
		<div>
			<div className="row">
				<div className="col-6">
					<div style={{ width: "200px", marginBottom: 10, float: "right" }}>
						<Select
							options={typeOptions}
							value={selectedType}
							onChange={(selected) => {
								setSelectedType(selected);
							}}
						/>
					</div>
				</div>
			</div>
			{selectedBannerComponent}
		</div>
	);
};

export default BannersPage;
