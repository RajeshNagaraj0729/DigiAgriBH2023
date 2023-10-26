/*
React Imports
 */
import React, { useState } from "react";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import localStorage from "redux-persist/es/storage";
import axios from "axios";

import "../Login/LoginStyle.css";
import { loginBHAdminUser } from "../../url/baseUrl";

/*
Custom Component Imports
 */
import Logo from "../../assets/images/bighaat-logo.png";
import TextInput from "../../components/Common/TextInput";

/**
 * Login Page Results
 */
const Login = () => {
	const [username, setUsername] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const location = useLocation();
	const [isLoggedIn, setIsloggedIn] = useState(false);
	const [admin, setAdmin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(loginBHAdminUser, {
        userName: username,
        password: pwd,
      })
      .then((result) => {
        if (result?.data?.roleName === "Banner") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "banner");
          setAdmin("banner");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "User") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "user");
          setAdmin("user");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "Dev") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "dev");
          setAdmin("dev");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "Prakshep") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "prakshep");
          setAdmin("prakshep");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "Analytics") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "analytics");
          setAdmin("analytics");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "Translate") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "translate");
          setAdmin("translate");
          setIsloggedIn(true);
        } else if (result?.data?.roleName === "FarmLync") {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "farmlync");
          setAdmin("farmlync");
          setIsloggedIn(true);
        } else {
          localStorage.setItem("user", JSON.stringify(result?.data));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("admin", "normal");
          setAdmin("normal");
          setIsloggedIn(true);
        }
      })
      .catch((error) => {
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (username.length === 0 && pwd.length === 0) {
          setErrMsg("*Enter User Name and password");
        } else if (username.length === 0) {
          setErrMsg("*Enter User Name");
        } else if (pwd.length === 0) {
          setErrMsg("*Enter Password");
        } else if (error.response?.status === 400) {
          setErrMsg("*Incorrect Username or Password");
        } else {
          setErrMsg("Login Failed");
        }
      });
  };

	/**
	 * Check for login status
	 * If previously navigated redirect to that page
	 * else redirect to home page
	 */
	if (isLoggedIn) {
		if (location.state && location.state.from) {
			return <Redirect to={location.state.from} />;
		} else {
			if (admin === "normal") {
				return <Redirect to="/home" />;
			} else if (admin === "user") {
				return <Redirect to="/users/user-data" />;
			} else if (admin === "dev") {
				return <Redirect to="/mandi-prices" />;
			} else if (admin === "prakshep") {
				return <Redirect to="/prakshep" />;
			} else if (admin === "analytics") {
				return <Redirect to="/analytics" />;
			} else if (admin === "farmlync") {
				return <Redirect to="/zonal-ad" />;
			} else if (admin === "translate") {
				return <Redirect to="/stages/stages-list" />;
			} else {
				return <Redirect to="/home-banners" />;
			}
		}
	}

	// returning form for authentication
	else
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
											<form noValidate onSubmit={handleSubmit}>
												<div>
													<p style={{ color: "red", fontSize: "12px" }}>
														{errMsg}
													</p>
												</div>
												<TextInput
													labelName="User Name:"
													id="userName"
													divClass="form-group"
													type="text"
													inputClass="form-control"
													value={username}
													onChange={(e) => {
														setUsername(e.target.value);
													}}
												/>
												<TextInput
													labelName="Password:"
													id="password"
													divClass="form-group"
													type="password"
													inputClass="form-control"
													value={pwd}
													onChange={(e) => {
														setPwd(e.target.value);
													}}
												/>
												<button type="submit" className="btn btn-primary">
													Submit
												</button>
											</form>
										</div>
										<div className="col-12 d-flex justify-content-center">
											<Link to="forgot-password" className="kvFarmLyncLoginTxt">
												Forgot Password <i className="fa fa-sign-in"></i>
											</Link>
										</div>
										<div className="row mt-3">
											<div className="col-12 d-flex justify-content-center">
												<Link
													to="kisan-vedika-login"
													className="kvFarmLyncLoginTxt"
												>
													Kisan Vedika Login <i className="fa fa-sign-in"></i>
												</Link>
											</div>
											{/* <div className="col-6 justify-content-center">
                        <Link
                          to="farmlync-login"
                          className="kvFarmLyncLoginTxt"
                        >
                          <i className="fa fa-sign-in"></i> FarmLync Login
                        </Link>
                      </div> */}
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

export default Login;
