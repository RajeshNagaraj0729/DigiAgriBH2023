/*
React Imports
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
/*
Custom Component Imports
 */
import { TOTAL_USERS } from "../../redux/actions/storepage";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import { PageLoader } from "../../components/Loading/Loading";
import * as constants from "../../constants";

const ImageModal = (props) => {
  return (
    <Modal
      overflow={false}
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
    >
      <Modal.Body>
        <img
          src={constants.mediaUrl + props.image}
          alt="Not Found"
          style={{ width: "100%", height: "500px" }}
        />
      </Modal.Body>
    </Modal>
  );
};

const FarmerDataTable = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");

  if (props.isLoading) {
    return <PageLoader />;
  }

  // const data = props.pagination ? results : results;
  if (props.results?.length !== 0) {
    //Column names for table
    const columns = [
      {
        name: "Name",
        selector: "name",
        center: true,
      },
      {
        name: "Village",
        selector: "village",
        center: true,
      },
      {
        name: "Pincode",
        selector: "pincode",
        center: true,
      },
      {
        name: "Phone",
        selector: "phone",
        center: true,
      },
      {
        name: "IsActive",
        selector: "isActive",
        center: true,
      },
      {
        name: "Update",
        selector: "update",
        center: true,
      },
      {
        name: "Delete",
        selector: "delete",
        center: true,
      },
    ];

    // Fetching Row Data
    let rows = props.results?.map((row) => {
      return {
        name: row.name != null && row.name !== "" ? row.name : "N/A",
        village:
          row.village != null && row.village !== "" ? row.village : "N/A",
        pincode:
          row.pincode != null && row.pincode !== "" ? row.pincode : "N/A",
        phone: row.phone != null && row.phone !== "" ? row.phone : "N/A",
        isActive: row.isActive ? "True" : "False",
        // update: <EditCriteria data={row} outlined={true} />,
        // delete: <DeleteCriteria data={row} outlined={true} />,
        update: "N/A",
        delete: "N/A",
      };
    });

    // Returning data table
    if (props.pagination) {
      return (
        <>
          <ImageModal
            image={image}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <NormalDataTable
            title="Role Details"
            columns={columns}
            data={rows}
            length={props.results.length}
          />
        </>
      );
    } else {
      return (
        <>
          <ImageModal
            image={image}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <PaginationDataTable
            Type={TOTAL_USERS}
            activePage={props.pagenum}
            pageAmount={props.pageAmount}
            title="Role Details"
            setActivePage={props.setPagenum}
            setPageAmount={props.setPageAmount}
            dispatch={dispatch}
            callHandle={props.callHandle}
            columns={columns}
            data={rows}
            searchValue=""
            totalCount={props.total}
          />
        </>
      );
    }
  } else {
    return <NoDataFound msg="No Data Found" />;
  }
};

export default FarmerDataTable;
