//List of Mobile Number who have access to Excel-Data on Kisan-Vedika
const phoneNumForExcelAccess = process.env.REACT_APP_DEV_EXCEL_Phone;
const listOfPhopneNumber = phoneNumForExcelAccess.split(",");

export const validateShowExcelFunctionToUsers = (mobileNo) => {
	if (mobileNo) {
		let valid = listOfPhopneNumber.some((curreElem) => {
			return mobileNo === curreElem;
		});
		return valid;
	} else {
		return false;
	}
};

//Only these Mobile Number have the visibility of the Mobile Number Column and search-box inside Kisan-Vedika Screen.
const phoneNumInString = process.env.REACT_APP_DEV_Phone;
const listOfPhopneNumberForUsers = phoneNumInString.split(",");

export const validateShowMobileNumberFunctionToUsers = (mobileNo) => {
	if (mobileNo) {
		let valid = listOfPhopneNumberForUsers.some((curreElem) => {
			return mobileNo === curreElem;
		});
		return valid;
	} else {
		return false;
	}
};

export const postToDiscord = async ({ payload }) => {
	const formData = await JSON.stringify(payload, undefined, 0).replace(
		/\"/g,
		"'"
	);
	await fetch(
		"https://discord.com/api/webhooks/1055091541305196544/Lf48PqPYIoKkXioVzdSa0NnlecqRaMJYqRBCqoTpEr_paKb3zfm5by3tZCcS1h0T472A",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: "",
				tts: false,
				embeds: [
					{
						title: "Error Trace",
						description: formData,
					},
				],
			}),
		}
	)
		.then((resp) => {
			console.log("RESP===", resp);
		})
		.catch((error) => {
			console.log("Error===", error);
			throw new Error(error);
		});
};

export const usersFromLocalStorage = JSON.parse(
	window.localStorage.getItem("user")
);

//Method for Removing Queryparam from any URl
export const removeQueryParamFromUrl = (url) => {
	const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
	if (!urlPattern.test(url)) {
		console.error("Invalid URL:", url);
		return null;
	}
	const urlObj = new URL(url);
	urlObj.search = "";
	const result = urlObj.toString();
	return result;
};
