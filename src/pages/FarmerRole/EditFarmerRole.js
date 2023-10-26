/*
React Imports
 */
import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";

/*
Custom Component Imports
 */
import { updateExecutiveData } from "../../redux/actions/FarmerRole/farmerRole";
import CustomSelect from "../../components/Select/Select";
import { statusOptions } from "./Zonal";

//Initial Object for update

let updatePayload = {
  id: "",
  type: "VLE",
  name: "",
  village: "",
  pincode: 0,
  phone: "",
  isActive: true,
  createdBy: "",
  createdByCode: "ADMIN",
  updatedBy: "",
  updatedByCode: "ADMIN",
};

/**
 * Edit Banner Implementation
 * @param {Object} props
 * props from Banners Page
 */
const EditFarmerRole = (props) => {
  const { dataToEdit, updateType, loggedInUser } = props;

  const store = useStore();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(false);

  const loginUserData = useSelector((state) => state.farmerRole.loginData);
  const dispatch = useDispatch();
  const selectedRole = dataToEdit;

  const [name, setName] = useState(selectedRole.name);
  const [village, setVillage] = useState(selectedRole.village);
  const [pincode, setPincode] = useState(selectedRole.pincode);
  const [phone, setPhone] = useState(selectedRole.phone);
  const [isActive, setIsActive] = useState(
    statusOptions.find((status) => status.value === selectedRole.isActive)
  );
  const [disableUpload, setDisableUpload] = useState(true);

  //Edit banner submit
  const handleSubmit = async () => {
    updatePayload.id = selectedRole.id;
    updatePayload.type = updateType;
    updatePayload.name = name;
    updatePayload.village = village;
    updatePayload.pincode = parseInt(pincode);
    updatePayload.phone = phone;
    updatePayload.isActive = isActive.value;
    updatePayload.createdBy = selectedRole.createdBy;
    updatePayload.createdByCode = selectedRole.createdByCode;

    if (loggedInUser === "farmlync") {
      updatePayload.updatedBy = "";
      updatePayload.updatedByCode = "ADMIN";
    } else {
      updatePayload.updatedBy = loginUserData.userId;
      updatePayload.updatedByCode = loginUserData.userType;
    }

    await dispatch(updateExecutiveData(updatePayload))
      .then(() => {
        handleModalClose();
        Alert.success("Updated Successfully");
        window.location.reload();
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  //Modal Show
  const handleModalShow = () => {
    setShowModal(true);
    setName(selectedRole.name);
    setVillage(selectedRole.village);
    setPhone(selectedRole.phone);
    setPincode(selectedRole.pincode);
    setIsActive(
      statusOptions.find((status) => status.value === selectedRole.isActive)
    );
    setDisable(true);
  };

  //Modal Close
  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (
      name !== "" &&
      village !== "" &&
      phone !== "" &&
      pincode !== "" &&
      (name !== selectedRole.name ||
        village !== selectedRole.village ||
        phone !== selectedRole.phone ||
        parseInt(pincode) !== selectedRole.pincode ||
        isActive.value !== selectedRole.isActive)
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, village, phone, pincode, isActive]);

  return (
    <div>
      <button
        onClick={handleModalShow}
        className="btn btn-sm btn-warning"
        disabled={props.disable}
      >
        Edit
      </button>

      {/* Submit Modal Implementation */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        overflow={false}
        size={window.innerWidth < "991" ? "xs" : "sm"}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-9">
              <Modal.Title className="mpdalTitle">Edit Data</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Name:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
            </div>

            <div className="col-12">
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Village:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setVillage(e.target.value);
                    }}
                    value={village}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
            </div>

            <div className="col-12">
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Phone:</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    maxLength={10}
                    disabled={true}
                    value={phone}
                    className="inputStyle"
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
                <div className="col-1"></div>
              </div>
            </div>

            <div className="col-12">
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Pincode:</label>
                </div>
                <div className="col-6">
                  <input
                    type="number"
                    maxLength={6}
                    value={pincode}
                    className="inputStyle"
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
                <div className="col-1"></div>
              </div>
            </div>

            <div className="col-12">
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Status:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={statusOptions}
                    placeholder="Select ..."
                    search={false}
                    onSelect={(value) => {
                      setIsActive(value);
                    }}
                    value={isActive}
                  />
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-danger"
            onClick={handleModalClose}
            style={{ margin: "5px" }}
          >
            Close
          </Button>
          <Button
            className={
              disable ? "btn btn-sm btn-light" : "btn btn-sm btn-primary"
            }
            disabled={disable}
            onClick={() => {
              handleSubmit();
              setDisable(true);
            }}
            style={{ margin: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditFarmerRole;
