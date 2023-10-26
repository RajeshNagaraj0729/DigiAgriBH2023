const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		port: "3000",
		static: {
			directory: path.join(__dirname, "public"),
		},
		open: true,
		hot: true,
		liveReload: true,
		historyApiFallback: true,
	},
	devtool: "inline-source-map",
});
