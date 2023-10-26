import React from "react";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../../components/Common/TextInput";
import Logo from "../../assets/images/bighaat-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { loginData } from "../../redux/actions/FarmerRole/farmerRole";
import localStorage from "redux-persist/es/storage";
import { Alert } from "rsuite";

const FarmerLogin = () => {
  const [mobileno, setMobileno] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const feData = useSelector((state) => state.farmerRole);
  const type = feData.loginData.userType;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobileno.length !== 10 || isNaN(mobileno)) {
      setErrMsg("Enter valid mobile number");
    } else {
      setErrMsg("");
      await dispatch(loginData(mobileno))
        .then(async () => {
          await localStorage.setItem("isLoggedIn", true);
          setIsloggedIn(true);
        })
        .catch((err) => {
          Alert.error("Unable to find your number");
        });
    }
  };

  if (isLoggedIn && type === "ZM") {
    return <Redirect to="field-zm" />;
  } else if (isLoggedIn && type === "FE") {
    return <Redirect to="village-fe" />;
  } else {
    <Redirect to="zonal-ad" />;
  }

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
                        onChange={(e) => {
                          setMobileno(e.target.value);
                        }}
                      />
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 justify-content-left">
                      <Link to="login" className="kvFarmLyncLoginTxt">
                        <i className="fa fa-sign-in"></i> Normal Login
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

export default FarmerLogin;
