import React from "react";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import TextInput from "../../components/Common/TextInput";
import Logo from "../../assets/images/bighaat-logo.png";
//import { useDispatch } from "react-redux";
//import { fetchUserByMobileNo } from "../../redux/actions/KisanVedika/kisanVedika";
//import localStorage from "redux-persist/es/storage";
import { Alert } from "rsuite";
import axios from "axios";
import { sendKVOtp } from "../../url/baseUrl";

const KVLogin = () => {
	const [mobileno, setMobileno] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const history = useHistory();
	// const [isLoggedIn, setIsloggedIn] = useState(false);

	//const dispatch = useDispatch();

	// const handleSubmit = async (e) => {
	//   e.preventDefault();
	//   if (mobileno.length !== 10 || isNaN(mobileno)) {
	//     setErrMsg("Enter valid mobile number");
	//   } else {
	//     setErrMsg("");
	//     await dispatch(fetchUserByMobileNo(mobileno))
	//       .then(async () => {
	//         await localStorage.setItem("isLoggedIn", true);
	//         await localStorage.setItem("admin", "kvadmin");
	//         setIsloggedIn(true);
	//       })
	//       .catch((err) => Alert.error("Unable to find you number"));
	//   }
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		if (mobileno.length !== 10 || isNaN(mobileno)) {
			setErrMsg("Enter valid mobile number");
		} else {
			setErrMsg("");
			axios
				.post(sendKVOtp, {
					phone: mobileno,
					changeType: "kv",
				})
				.then((result) => {
					if (result?.data?.isUserExists == false) {
						Alert.error("User does not Exists");
					} else {
						let phone = mobileno;
						Alert.success("OTP Sent on Your Number");
						history.push(`/kisan-vedika-otp-verify?phone=${phone}`);
					}
					setMobileno("");
				})
				.catch((error) => setErrMsg(error?.data));
		}
	};

	// if (isLoggedIn) {
	// 	return <Redirect to="kisan-vedika/posts" />;
	// }
	return (
		<div className="loginPageBg">
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-12 col-md-1 col-lg col-xl"></div>
					<div className="col-12 col-sm-12 col-md-10 col-lg-7 col-xl-7 mx-auto">
						<div className="loginBg container-fluid">
							<div className="row">
								<div className="col-12 col-sm-6 col-lg-7 col-xl-7 farmerImgSec"></div>
								<div className="col-12 col-sm-6 col-lg-5 col-xl-5">
									<div className="bigHaatFormSec">
										<img src={Logo} alt="bighaat" />
										<form onSubmit={handleSubmit} noValidate>
											<div>
												<p style={{ color: "red", fontSize: "12px" }}>
													{errMsg}
												</p>
											</div>
											<TextInput
												labelName="Mobile Number:"
												id="mobileno"
												divClass="form-group"
												type="text"
												inputClass="form-control"
												value={mobileno}
												onChange={(e) => {
													setMobileno(e.target.value);
												}}
											/>
											<button type="submit" className="btn btn-primary">
												Send OTP
											</button>
										</form>
									</div>
									<div className="row mt-3">
										<div className="col-12 d-flex justify-content-center">
											<Link to="register_user" className="kvFarmLyncLoginTxt">
												<i className="fa"></i> Create New Account
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-sm-12 col-md-1 col-lg col-xl"></div>
				</div>
			</div>
		</div>
	);
};

export default KVLogin;
