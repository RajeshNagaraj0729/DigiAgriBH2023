import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextInput from "../../components/Common/TextInput";
import Logo from "../../assets/images/bighaat-logo.png";
import { Alert } from "rsuite";
import axios from "axios";
import { resetPassWord } from "../../url/baseUrl";
import { requestforOtp } from "../../url/baseUrl";

const PWReset = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [pwd, setPwd] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    const params = new URL(document.location).searchParams;
    const username = params.get("username");
    e.preventDefault();
    if (pwd.confirmPassword !== pwd.newPassword) {
      Alert.error("Password Do Not Match");
    }
    //else if (pwd?.newPassword.length < 7) {
    //   Alert.error("Password should be Greater than 7");
    // }
    else {
      axios
        .post(resetPassWord, {
          userName: username,
          otpCode: code,
          newPassword: pwd.newPassword,
          changeType: "FORGOT",
        })
        .then((result) => {
          Alert.success("Password Changed");
          history.push("/login");
        })
        .catch((error) => {
          Alert.error("Error in Changing the Password");
        });
    }
    setUsername("");
    setCode("");
    setPwd("");
  };

  const resendOTP = (e) => {
    const params = new URL(document.location).searchParams;
    const username = params.get("username");
    e.preventDefault();
    if (username) {
      axios
        .post(requestforOtp, null, {
          params: { userName: username, changeType: "FORGOT" },
        })
        .then((result) => {
          Alert.success("Code Sent on Your Registered Email");
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
                    <form onSubmit={handleSubmit} noValidate>
                      <div>
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {errMsg}
                        </p>
                      </div>
                      <TextInput
                        labelName="New Password"
                        id="new_password"
                        divClass="form-group"
                        type="password"
                        inputClass="form-control"
                        value={pwd.newPassword}
                        onChange={(e) =>
                          setPwd({ ...pwd, newPassword: e.target.value })
                        }
                      />
                      <TextInput
                        labelName="Re-Type Password"
                        id="re_type_password"
                        divClass="form-group"
                        type="password"
                        inputClass="form-control"
                        value={pwd.confirmPassword}
                        onChange={(e) =>
                          setPwd({
                            ...pwd,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        labelName="Enter Code"
                        id="passwordresetcode"
                        divClass="form-group"
                        type="text"
                        inputClass="form-control"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                      <div className="mt-2 mb-4 float-right">
                        <button type="submit" onClick={resendOTP}>
                          Resend OTP
                        </button>
                      </div>
                    </form>
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

export default PWReset;
