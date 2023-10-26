import React, { useState } from "react";
import { Alert, Modal } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import { fetchFarmersListByVleId } from "../../redux/actions/FarmerRole/farmerRole";
import { PageLoader } from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoData/NoDataFound";

const landOwnerShipOptions = [
  {
    id: "owner",
    title: "Owner",
  },
  {
    id: "tenant",
    title: "Tenant",
  },
];

const FarmersList = (props) => {
  const { farmersCount, vleId, vleName } = props;

  const [showModal, setShowModal] = useState(false);
  const [isFarmersLoading, setIsFarmersLoading] = useState(false);

  const farmersData = useSelector((state) => state.farmerRole.farmersList);

  const dispatch = useDispatch();

  const handleModalShow = () => {
    getFarmersList();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getFarmersList = async () => {
    try {
      setIsFarmersLoading(true);
      await dispatch(fetchFarmersListByVleId(vleId)).then(() => {
        setIsFarmersLoading(false);
      });
    } catch (error) {
      Alert.error(error.message);
    }
  };

  const getAddressDetails = (locData) => {
    let address = "";

    if (!!locData.county) {
      address = locData.county + ", ";
    }

    if (!!locData.district) {
      address = locData.district + ", ";
    }

    if (!!locData.state) {
      address = address + locData.state + ", ";
    }

    if (!!locData.country) {
      address = address + locData.country + ", ";
    }

    if (!!locData.postcode) {
      address = address + locData.postcode;
    }

    return address;
  };

  return (
    <div>
      <button onClick={handleModalShow} className="btn btn-sm btn-info">
        Click here ({farmersCount})
      </button>
      {showModal && (
        <Modal
          show={showModal}
          onHide={handleModalClose}
          overflow={false}
          size={"lg"}
        >
          <Modal.Header closeButton>
            <div className="row">
              <div className="col-9">
                <Modal.Title className="mpdalTitle">
                  Farmers created by {vleName}
                </Modal.Title>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                {isFarmersLoading ? (
                  <PageLoader />
                ) : (
                  <div className="tableMainSection cardShadow farmerRegistrationTable farmerRegistrationPopupTable">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Village</th>
                          <th>Pincode</th>
                          <th>Ownership</th>
                          <th>Acreage</th>
                          <th>Address Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {farmersData?.map((farmer, index) => (
                          <tr key={farmer.id}>
                            <td>{index + 1}</td>
                            <td>{farmer.firstName}</td>
                            <td>{farmer.phone}</td>
                            <td>{farmer.village}</td>
                            <td>{farmer.pinCode}</td>
                            <td>
                              {
                                landOwnerShipOptions.find(
                                  (los) => los.id === farmer.ownOrTenant
                                ).title
                              }
                            </td>
                            <td>{farmer.totalAcreage}</td>
                            <td>
                              {getAddressDetails(farmer.detailedLocationInfo)}
                            </td>
                          </tr>
                        ))}
                        {farmersData?.length === 0 && (
                          <tr>
                            <td colSpan="10">
                              <NoDataFound msg="No farmers created yet" />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default FarmersList;
