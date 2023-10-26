/*
React Imports
 */
import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import JSZipUtils from "jszip-utils";
import { Button } from "reactstrap";

/**
 * Image Download Implementation
 * @param {Object} props
 */
const ImagesDownload = (props) => {
	const links = props.links;
	const buttonName = "Download All Images ";
	const [buttonname, setButtonName] = useState(buttonName);
	const [disable, setDisable] = useState(false);
	const [cnt, setCount] = useState(0);

	//To Disable Button when loading images
	useEffect(() => {
		if (disable) {
			setButtonName("Loading...  " + cnt + "/" + props.links.length);
		}
		if (cnt === props.links.length) {
			setDisable(false);
			setButtonName("Download All Images ");
		}
	}, [cnt, buttonname, disable, props.links.length]);

	// Zip all the Images and download
	const download = () => {
		setButtonName("Loading...");
		setDisable(true);
		var zip = new JSZip();
		var img = zip.folder("images");
		var zipFilename = props.foldername;
		let count = 0;
		setCount(count);
		links.forEach(function (url, i) {
			JSZipUtils.getBinaryContent(url, function (err, data) {
				count++;
				setCount(count);
				if (err) {
					console.error("Image not found");
				} else {
					var name = count.toString() + ".jpg";
					img.file(name, data, { binary: true });
					if (count === links.length) {
						zip.generateAsync({ type: "blob" }).then(function (content) {
							saveAs(content, zipFilename);
						});
					}
				}
			});
		});
	};

	// Returning Image Download Button
	return (
		<div className="btnStyle">
			<Button onClick={download} disabled={disable} color="success" size="sm">
				{buttonname}
				{buttonname === "Download All Images " ? (
					<i className="fa fa-download" aria-hidden="true"></i>
				) : (
					" "
				)}
			</Button>
		</div>
	);
};

export default ImagesDownload;
