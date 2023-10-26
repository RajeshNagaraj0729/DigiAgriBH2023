const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const runEnv = process.env.run_env;

const baseAPIUrl =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_API_URL)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_API_URL)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_API_URL)
		: JSON.stringify(process.env.REACT_APP_DEV_API_URL);

const appUserToken =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_USER_TOKEN)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_USER_TOKEN)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_USER_TOKEN)
		: JSON.stringify(process.env.REACT_APP_DEV_USER_TOKEN);

const appMediaUrl =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_MEDIA_URL)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_MEDIA_URL)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_MEDIA_URL)
		: JSON.stringify(process.env.REACT_APP_DEV_MEDIA_URL);

const downloadUrl =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_DOWNLOAD_URL)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_DOWNLOAD_URL)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_DOWNLOAD_URL)
		: JSON.stringify(process.env.REACT_APP_DEV_DOWNLOAD_URL);

const sassToken =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_SASS_TOKEN)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_SASS_TOKEN)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_SASS_TOKEN)
		: JSON.stringify(process.env.REACT_APP_DEV_SASS_TOKEN);

const PhopneNumberForMobileAccess =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_Phone)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_Phone)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_Phone)
		: JSON.stringify(process.env.REACT_APP_DEV_Phone);

const PhopneNumberForExcelAccess =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_DEV_EXCEL_Phone)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_DEV_EXCEL_Phone)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_DEV_EXCEL_Phone)
		: JSON.stringify(process.env.REACT_APP_DEV_EXCEL_Phone);

const userDataAccess =
	runEnv === "PROD"
		? JSON.stringify(process.env.REACT_APP_PROD_USER_DATA_ACCESS)
		: runEnv === "QA"
		? JSON.stringify(process.env.REACT_APP_QA_USER_DATA_ACCESS)
		: runEnv === "BETA"
		? JSON.stringify(process.env.REACT_APP_BETA_USER_DATA_ACCESS)
		: JSON.stringify(process.env.REACT_APP_DEV_USER_DATA_ACCESS);

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.[name].js",
		publicPath: "/",
	},
	target: "web",
	resolve: {
		extensions: [".js", ".jsx", ".json", "mjs"],
	},
	module: {
		rules: [
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(css|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "public", "index.html"),
			favicon: "public/favicon.ico",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "public/web.config",
					to: "web.config",
				},
				{
					from: "public/favicon.ico",
					to: "public/favicon.ico",
				},
				{
					from: "public/logo512.png",
					to: "public/logo512.png",
				},
				{
					from: "public/favicon.png",
					to: "public/favicon.png",
				},
				{
					from: "public/manifest.json",
					to: "public/manifest.json",
				},
			],
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
		new webpack.DefinePlugin({
			"process.env.REACT_APP_PUBLIC_URL": baseAPIUrl,
			"process.env.REACT_APP_USER_TOKEN": appUserToken,
			"process.env.REACT_APP_MEDIA_URL": appMediaUrl,
			"process.env.REACT_APP_DOWNLOAD_URL": downloadUrl,
			"process.env.REACT_APP_SASS_TOKEN": sassToken,
			"process.env.REACT_APP_DEV_Phone": PhopneNumberForMobileAccess,
			"process.env.REACT_APP_DEV_EXCEL_Phone": PhopneNumberForExcelAccess,
			"process.env.REACT_APP_USER_DATA_ACCESS": userDataAccess,
		}),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
};
