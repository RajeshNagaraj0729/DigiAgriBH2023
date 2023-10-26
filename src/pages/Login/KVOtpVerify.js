import React from "react";
import { useState ,useEffect} from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import TextInput from "../../components/Common/TextInput";
import Logo from "../../assets/images/bighaat-logo.png";
import { Alert } from "rsuite";
import { verifyKVLogin } from "../../url/baseUrl";
import { sendKVOtp } from "../../url/baseUrl";
import axios from "axios";

const KVOtpVerify = () => {
	const [mobileno, setMobileno] = useState("");
	const [otp, setOtp] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [isLoggedIn, setIsloggedIn] = useState(false);
	const history = useHistory();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  //API call for resendOTP
  const resendOTP = (e) => {
    const params = new URL(document.location).searchParams;
		const mobileno = params.get("phone");
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
					}
					setMobileno("");
				})
				.catch((error) => setErrMsg(error?.data));
		}
    setMinutes(0);
    setSeconds(30);
  };

	const handleOtpSubmit = (e) => {
		const params = new URL(document.location).searchParams;
		const mobileno = params.get("phone");
		e.preventDefault();
		if (mobileno) {
			axios
				.post(verifyKVLogin, {
					phone: mobileno,
					otpCode: otp,
				})
				.then((result) => {
					Alert.success("Successfully LoggedIn");
					localStorage.setItem("admin", "kvadmin");
					localStorage.setItem("user", JSON.stringify(result?.data));
					localStorage.setItem("isLoggedIn", true);
					history.push("/digi-home");
				})
				.catch((error) => {
					setErrMsg(error?.data);
					Alert.error("Invalid OTP");
				});
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
										<form onSubmit={handleOtpSubmit} noValidate>
											<div>
												<p style={{ color: "red", fontSize: "12px" }}>
													{errMsg}
												</p>
											</div>
											<TextInput
												labelName="Verify With OTP"
												id="otp"
												divClass="form-group"
												type="text"
												inputClass="form-control"
												value={otp}
												onChange={(e) => {
													setOtp(e.target.value);
												}}
											/>
											<button type="submit" className="btn btn-primary">
												Submit
											</button>
                      <div className="mt-2 mb-4">
											{seconds > 0 || minutes > 0 ? (
												<p>
													Time Remaining:{" "}
													{minutes < 10 ? `0${minutes}` : minutes}:
													{seconds < 10 ? `0${seconds}` : seconds}
												</p>
											) : (
												<p style={{fontSize:"12px", color:"#999"}}>Didn't receive code?</p>
											)}
											<button
												disabled={seconds > 0 || minutes > 0}
												style={{
													color:
														seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
												}}
												onClick={resendOTP}
											>
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

export default KVOtpVerify;
