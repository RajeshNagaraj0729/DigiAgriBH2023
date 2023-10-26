import React from "react";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import TextInput from "../../components/Common/TextInput";
import Logo from "../../assets/images/bighaat-logo.png";

import { Alert } from "rsuite";
import { requestforOtp } from "../../url/baseUrl";
import axios from "axios";

const PasswordForgot = () => {
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const history = useHistory();

  const handleForgotEmailSubmit = (e) => {
    e.preventDefault();
    if (username) {
      axios
        .post(requestforOtp, null, {
          params: { userName: username, changeType: "FORGOT" },
        })
        .then((result) => {
          let user = username;
          Alert.success("Code Sent on Your Registered Email");
          setUsername("");
          history.push(`/password-reset?username=${user}`);
        })
        .catch((error) => setErrMsg(error?.data));
    }
  };

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
                    <form onSubmit={handleForgotEmailSubmit} noValidate>
                      <div>
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errMsg}
                        </p>
                      </div>
                      <TextInput
                        labelName="Please Provide Your Registered UserName"
                        id="username"
                        divClass="form-group"
                        type="text"
                        inputClass="form-control"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-12 d-flex justify-content-center">
                      <Link to="login" className="kvFarmLyncLoginTxt">
                        <i className="fa fa-sign-out fa-rotate-180"></i> Normal
                        Login
                      </Link>
                    </div>
                  </div> */}
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

export default PasswordForgot;
