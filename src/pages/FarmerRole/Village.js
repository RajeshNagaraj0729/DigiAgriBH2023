//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { Alert } from "rsuite";

//Custom Imports
import {
  fetchVleData,
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
import FarmersList from "./FarmersList";

let villagePayload = {
  type: "VLE",
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

const Village = (props) => {
  const dispatch = useDispatch();
  const vleData = useSelector((state) => state.farmerRole.getVleData);
  const loginUserData = useSelector((state) => state.farmerRole.loginData);
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(statusOptions[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    if (admin === "farmlync") {
      handlefetchVledata();
    } else {
      handlefetchVledata(loginUserData.userType, loginUserData.userId);
    }
  }, [admin, loginUserData]);

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

  const handlefetchVledata = async (type, value) => {
    setIsLoading(true);
    await dispatch(fetchVleData(type, value));
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    villagePayload.type = "VLE";
    villagePayload.name = name;
    villagePayload.village = village;
    villagePayload.pincode = parseInt(pincode);
    villagePayload.phone = phone;
    villagePayload.isActive = isActive.value;

    if (admin === "farmlync") {
      villagePayload.createdBy = "";
      villagePayload.createdByCode = "ADMIN";
      villagePayload.updatedBy = "";
      villagePayload.updatedByCode = "ADMIN";
    } else {
      villagePayload.createdBy = loginUserData.userId;
      villagePayload.createdByCode = loginUserData.userType;
      villagePayload.updatedBy = loginUserData.userId;
      villagePayload.updatedByCode = loginUserData.userType;
    }

    await dispatch(createExecutiveData(villagePayload))
      .then(() => {
        Alert.success("Village executive created successfully");
        window.location.reload();
      })
      .catch((err) => {
        setError(err);
        Alert.error(err.message);
      });
  };

  const delExecutive = (id) => {
    dispatch(deleteExecutiveData(id, "VLE")).then(() => {
      Alert.success("Village executive deleted successfully");
      window.location.reload();
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-6  d-flex align-items-center">
          <h2 className="mainHeading">Village Level Executive</h2>
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
                labelName="Village:"
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
                    <th>Village</th>
                    <th>Pincode</th>
                    <th>Phone</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Farmers Created</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {vleData?.map((item, index) => (
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
                        <FarmersList
                          farmersCount={item.farmersCount}
                          vleId={item.id}
                          vleName={item.name}
                        />
                      </td>
                      <td>
                        <EditFarmerRole
                          dataToEdit={item}
                          updateType="VLE"
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
                  {vleData.length === 0 && (
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

export default Village;
