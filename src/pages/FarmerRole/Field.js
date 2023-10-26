//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { Alert } from "rsuite";

//Custom Imports
import {
  fetchFeData,
  createExecutiveData,
  deleteExecutiveData,
} from "../../redux/actions/FarmerRole/farmerRole";
import CustomSelect from "../../components/Select/Select";
import TextInput from "../../components/Common/TextInput";
import { PageLoader } from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoData/NoDataFound";
import DeleteRow from "../../components/Common/DeleteRow";
import "../../components/Search/SearchStyle.css";
import EditFarmerRole from "../FarmerRole/EditFarmerRole";
import { statusOptions } from "./Zonal";

let fieldPayload = {
  type: "FE",
  createdBy: "",
  createdByCode: "ADMIN",
  name: "",
  village: "",
  pincode: 0,
  phone: "",
  isActive: true,
  updatedBy: "",
  updatedByCode: "ADMIN",
};

const Field = (props) => {
  const dispatch = useDispatch();
  const feData = useSelector((state) => state.farmerRole.getFeData);
  const loginUserData = useSelector((state) => state.farmerRole.loginData);
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(statusOptions[0]);
  const admin = localStorage.getItem("admin");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);

  useEffect(() => {
    if (admin === "farmlync") {
      handlefetchFedata();
    } else {
      handlefetchFedata(loginUserData.userType, loginUserData.userId);
    }
  }, []);

  useEffect(() => {
    if (
      name !== "" &&
      village !== "" &&
      phone !== "" &&
      pincode !== "" &&
      phone.length === 10 &&
      pincode.length === 6
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [name, village, phone, pincode]);

  const handlefetchFedata = async (type, value) => {
    setIsLoading(true);
    await dispatch(fetchFeData(type, value));
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    fieldPayload.type = "FE";
    fieldPayload.name = name;
    fieldPayload.village = village;
    fieldPayload.pincode = parseInt(pincode);
    fieldPayload.phone = phone;
    fieldPayload.isActive = isActive.value;

    if (admin === "farmlync") {
      fieldPayload.createdBy = "";
      fieldPayload.createdByCode = "ADMIN";
      fieldPayload.updatedBy = "";
      fieldPayload.updatedByCode = "ADMIN";
    } else {
      fieldPayload.createdBy = loginUserData.userId;
      fieldPayload.createdByCode = loginUserData.userType;
      fieldPayload.updatedBy = loginUserData.userId;
      fieldPayload.updatedByCode = loginUserData.userType;
    }

    await dispatch(createExecutiveData(fieldPayload))
      .then(() => {
        Alert.success("Field executive created successfully");
        window.location.reload();
      })
      .catch((err) => {
        setError(err);
        Alert.error(err.message);
      });
  };

  const delExecutive = (id) => {
    dispatch(deleteExecutiveData(id, "FE")).then(() => {
      Alert.success("Field executive deleted successfully");
      window.location.reload();
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-6  d-flex align-items-center">
          <h2 className="mainHeading">Field Executive</h2>
        </div>
      </div>
      <div className="tableMainSection cardShadow space-md-inr">
        <form>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Name:"
                id="name"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={name}
                inputClass="inputStyle"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Mandal:"
                id="village"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                inputClass="inputStyle"
                value={village}
                onChange={(e) => {
                  setVillage(e.target.value);
                }}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Phone:"
                id="phone"
                value={phone}
                maxLength={10}
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="number"
                inputClass="inputStyle"
                onChange={(e) => {
                  if (e.target.value.length >= 11) {
                    Alert.info("Phone number cannot exceed 10 digits");
                    return false;
                  } else {
                    setPhone(e.target.value);
                  }
                }}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Pincode:"
                id="pincode"
                value={pincode}
                maxLength={6}
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="number"
                inputClass="inputStyle"
                onChange={(e) => {
                  if (e.target.value.length >= 7) {
                    Alert.info("Pincode cannot exceed 6 digits");
                    return false;
                  } else {
                    setPincode(e.target.value);
                  }
                }}
              />
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor={"news-crop"} className="bannerLableStyle">
                Status:
              </label>
              <CustomSelect
                data={statusOptions}
                //placeholder="Is Active"
                onSelect={(value) => {
                  setIsActive(value);
                }}
                value={isActive}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                className="btn btn-md btn-primary"
                disabled={submitDisable}
                onClick={() => {
                  handleSubmit();
                  setSubmitDisable(false);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="tableMainSection cardShadow farmerRegistrationTable">
            {isLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mandal</th>
                    <th>Pincode</th>
                    <th>Phone</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {feData?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.village}</td>
                      <td>{item.pincode}</td>
                      <td>{item.phone}</td>
                      <td>
                        {item.createdUser[0].name} ({item.createdByCode})
                      </td>
                      <td>
                        {item.isActive ? (
                          <span className="successText">Active</span>
                        ) : (
                          <span className="dangerText">Inactive</span>
                        )}
                      </td>
                      <td>
                        <EditFarmerRole
                          dataToEdit={item}
                          updateType="FE"
                          loggedInUser={admin}
                        />
                      </td>
                      <td>
                        <DeleteRow
                          id={item.id}
                          name={item.name}
                          deleterow={delExecutive}
                        />
                      </td>
                    </tr>
                  ))}
                  {feData.length === 0 && (
                    <tr>
                      <td colSpan="10">
                        <NoDataFound msg="No data found" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Field;
