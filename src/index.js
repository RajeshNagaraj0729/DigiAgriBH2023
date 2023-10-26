import React from "react";
import ReactDOM from "react-dom";
require("bootstrap");
require("bootstrap/dist/css/bootstrap.css");
require("font-awesome/css/font-awesome.css");
import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
