/*
React Imports
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Alert } from "rsuite";

/*
Custom Component Imports
 */
import { CROP_DOC } from "../../redux/actions/storepage";
import * as constants from "../../constants";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import NoDataFound from "../../components/NoData/NoDataFound";
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import CustomSelect from "../../components/Select/Select";
import { PageLoader } from "../../components/Loading/Loading";
import Error from "../../pages/Error/Error";
import { isNoDiseaseFound } from "../CommonServices";
import { plantParts } from "../PlantParts";

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

/**
 * Crop Doc Total Results Table
 * @param {Object} props
 * props from Crop Doc Total Results Page
 */
const KVTotalData = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  // const rows = useSelector((state) => state.totalResults);
  const rows = useSelector((state) => state.kisanVedika.kvTrainingPost);
  const stats = useSelector((state) => state.dashboardData);
  const diseases = useSelector((state) => state.cropDocInfo.diseases);
  if (rows.isLoading) {
    return <PageLoader />;
  }

  if (rows.errmsg) {
    return <Error msg={rows.errmsg} />;
  }

  const rowData = rows;

  //Component on checkbox select component
  const ExpandableComponent = ({ data }) => {
    return (
      <div
        className="row col-12"
        style={{
          borderBottomColor: "#e9ecef",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          paddingBottom: "5px",
          backgroundColor: data.r_ind % 2 === 0 ? "white" : "#fafafa",
        }}
      >
        {/* <div className="col-1">{data.treatmentDesc}</div> */}
        <div
          className="col-11 d-flex align-items-center"
          style={{
            backgroundColor:
              props.validate &&
              props.selectedRows.includes(data.id) &&
              !props.modifiedRows.filter((r) => r.id === data.id)[0]
                ?.diseaseId &&
              "#ffcdd2",
            borderRadius: "5px",
          }}
        >
          {/* <div className="mr-3">{data.sendNotification}</div> */}
          <div className="mr-3">{data.trainedStatus}</div>
          <div className="mr-3">{data.changeDisease}</div>
          <div className="mr-3">{data.changeCrop}</div>
          <div className="mr-3">{data.changePlantPart}</div>
          <div>{data.update}</div>
        </div>
        {props.selectedRows.includes(data.id) &&
          props.modifiedRows.filter((r) => r.id === data.id)[0]
            ?.showDiseaseError && (
            <div
              style={{
                color: "red",
                fontSize: "14px",
                marginLeft: "600px",
              }}
            >
              This disease_cause doesn't have master disease detail. Provide
              suggestion in view result page
            </div>
          )}
      </div>
    );
  };

  if (rowData.length !== 0) {
    // columns names
    const columns = [
      {
        name: "User Name",
        selector: "Username",
        left: true,
      },
      {
        name: "Mobile Number",
        selector: "MobileNumber",
        center: true,
      },
      // {
      //   name: "Source",
      //   selector: "source",
      //   center: true,
      // },
      {
        name: "Image",
        selector: "image",
        width: "200px",
      },
      // {
      //   name: "Result",
      //   selector: "result",
      //   center: true,
      //   width: "250px",
      // },
      // {
      //   name: "CropName",
      //   selector: "cropName",
      //   center: true,
      //   width: "250px",
      // },

      {
        name: "Attended",
        selector: "isUpdated",
        center: true,
      },
      {
        name: "Created On",
        selector: "createdon",
        sortable: true,
      },
      {
        name: "State",
        selector: "state",
        center: true,
      },
      // {
      //   name: "Estimated Crop Area",
      //   selector: "EstimatedCropArea",
      //   center: true,
      // },
      // {
      //   name: "Estimated Affected Area",
      //   selector: "EstimatedAffectedArea",
      //   center: true,
      // },
      // {
      //   name: "View Result",
      //   selector: "view",
      //   center: true,
      // },
    ];

    let resData;
    let resultData;
    //Fetching rows for table
    let data = rowData.map((row, index) => {
      return {
        r_ind: index,
        id: row.id,
        Username: `${
          row.userdata &&
          row.userdata[0]?.firstName + " " + row.userdata[0]?.lastName
        }`,
        MobileNumber:
          row.userdata &&
          row.userdata[0]?.phone.substring(3, row.userdata[0]?.phone.length),
        image: (
          <img
            src={constants.mediaUrl + row.medias[0]?.mediaUrl}
            alt="Not Found"
            className="cropDoctorResults imagePreview"
            onClick={() => {
              setShowModal(true);
              setImage(row.medias[0]?.mediaUrl);
            }}
          />
        ),
        // result: resultData !== undefined ? resultData : resData,
        // cropName:
        //   row?.tfStats?.stage1Predictions[0]?.probability <
        //   row?.tfStats?.stage2Predictions[0]?.probability
        //     ? row?.tfStats?.stage2Predictions[0]?.tagName
        //     : row?.tfStats?.stage1Predictions[0]?.tagName,
        createdon: dateFormat(row.userdata[0]?.createdAt, "dd/mm/yyyy"),
        // view: (
        //   <Link to={`/crop-doctor/edit-disease/${row.id}`} target="_blank">
        //     <i className="fa fa-folder-open"></i>
        //   </Link>
        // ),
        changeDisease: props.selectedRows.indexOf(row.id) !== -1 && (
          <div style={{ width: "150px" }}>
            <CustomSelect
              data={props.diseaseData}
              placeholder="Select Disease"
              onSelect={(option) => {
                let modified = [...props.modifiedRows];
                if (modified.length !== 0) {
                  modified = modified.map((r) =>
                    r.id === row.id
                      ? {
                          ...r,
                          diseaseId: option.value,
                          diseaseName: option.label,
                        }
                      : r
                  );
                  if (isNoDiseaseFound(option.value, diseases)) {
                    modified = modified.map((r) =>
                      r.id === row.id
                        ? {
                            ...r,
                            showDiseaseError: true,
                          }
                        : r
                    );
                  } else {
                    modified = modified.map((r) =>
                      r.id === row.id
                        ? {
                            ...r,
                            showDiseaseError: false,
                          }
                        : r
                    );
                  }
                }
                props.setModifiedRows(modified);
              }}
              search={true}
              name={row.id + "disease-select"}
              value={
                props.modifiedRows.length !== 0 && {
                  label:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.diseaseName || "Select Disease",
                  value:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.diseaseId || "123",
                }
              }
            />
          </div>
        ),
        changeCrop: props.selectedRows.indexOf(row.id) !== -1 && (
          <div style={{ width: "150px" }}>
            <CustomSelect
              name={row.id + "crop-name"}
              data={props.cropData}
              onSelect={(option) => {
                let modified = [...props.modifiedRows];
                if (modified.length !== 0) {
                  modified = modified.map((r) =>
                    r.id === row.id
                      ? {
                          ...r,
                          cropId: option.value,
                          cropName: option.label,
                        }
                      : r
                  );
                  props.setModifiedRows(modified);
                }
              }}
              search={true}
              placeholder="Select Crop"
              //custom={true}
              value={
                props.modifiedRows.length !== 0 && {
                  label:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.cropName || "Select Crop",
                  value:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.cropId || "123",
                }
              }
            />
          </div>
        ),
        // sendNotification: props.selectedRows.indexOf(row.id) !== -1 && (
        //   <label style={{ marginBottom: 0 }}>
        //     <input
        //       type="checkbox"
        //       checked={
        //         props.modifiedRows.length !== 0 &&
        //         props.modifiedRows.filter((r) => r.id === row.id)[0]
        //           .isNotification
        //       }
        //       onChange={() => {
        //         let modified = [...props.modifiedRows];
        //         if (modified.length !== 0) {
        //           modified = modified.map((r) =>
        //             r.id === row.id
        //               ? { ...r, isNotification: !r.isNotification }
        //               : r
        //           );
        //           props.setModifiedRows(modified);
        //         }
        //       }}
        //       style={{ marginRight: "5px" }}
        //     />
        //     Send Push Notification
        //   </label>
        // ),
        trainedStatus: props.selectedRows.indexOf(row.id) !== -1 && (
          <div style={{ width: "180px" }}>
            <CustomSelect
              name="select-type"
              data={[
                { label: "true", value: "true" },
                { label: "false", value: "false" },
              ]}
              onSelect={(option) => {
                let modified = [...props.modifiedRows];
                if (modified.length !== 0) {
                  modified = modified.map((r) =>
                    r.id === row.id ? { ...r, isTrained: option.value } : r
                  );
                  props.setModifiedRows(modified);
                }
              }}
              search={true}
              placeholder="Train"
              custom={true}
              value={
                props.modifiedRows.length !== 0 && {
                  label:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.isTrained || "Train",
                  value:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.isTrained || "123",
                }
              }
            />
          </div>
        ),
        EstimatedCropArea:
          row.metricStress && row.metricStress.estimatedCropArea,
        EstimatedAffectedArea:
          row.metricStress && row.metricStress.estimatedStress,
        isUpdated:
          row.trainedPost.length !== 0 && row.trainedPost[0].isTrained ? (
            <p style={{ color: "green" }}>
              <b>True</b>
            </p>
          ) : (
            <p style={{ color: "red" }}>
              <b>False</b>
            </p>
          ),
        update: props.selectedRows.indexOf(row.id) !== -1 && (
          <button
            id={row.id}
            className="btn btn-sm btn-success"
            onClick={() => {
              let selectedRow = props.modifiedRows.filter(
                (r) => r.id === row.id
              )[0];
              props.updateIndividual(selectedRow);
            }}
          >
            Update
          </button>
        ),
        // treatmentDesc: props.selectedRows.indexOf(row.id) !== -1 &&
        //   row.diseaseData &&
        //   row.diseaseData.length !== 0 && (
        //     <button
        //       className="btn btn-sm btn-primary"
        //       onClick={async () => {
        //         setCollection({
        //           bioDesc:
        //             row.diseaseData[0]?.treatment?.biologicalTreatment
        //               ?.treatmentDescription,
        //           chemDesc:
        //             row.diseaseData[0]?.treatment?.chemicalTreatment
        //               ?.treatmentDescription,
        //           diseaseId: row.diseaseData[0].id,
        //         });
        //         setShowDescModal(true);

        //         await getProducts(row.diseaseData[0].id);
        //       }}
        //     >
        //       Notification Details
        //     </button>
        //   ),
        changePlantPart: props.selectedRows.indexOf(row.id) !== -1 && (
          <div style={{ width: "180px" }}>
            <CustomSelect
              name={row.id + "crop-part"}
              data={plantParts}
              onSelect={(option) => {
                let modified = [...props.modifiedRows];
                if (modified.length !== 0) {
                  modified = modified.map((r) =>
                    r.id === row.id ? { ...r, partOfPlant: option.value } : r
                  );
                  props.setModifiedRows(modified);
                }
              }}
              search={true}
              placeholder="Select Plant Part"
              //custom={true}
              value={
                props.modifiedRows.length !== 0 && {
                  label:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.partOfPlant || "Select Plant Part",
                  value:
                    props.modifiedRows.filter((r) => r.id === row.id)[0]
                      ?.partOfPlant || "123",
                }
              }
            />
          </div>
        ),
        // source: row.source === "cv" ? "Custom Vision" : "Tensor Flow",
        state:
          row.userdata[0] && row.userdata[0]?.detailedLocationInfo
            ? row.userdata[0]?.detailedLocationInfo.state != null &&
              row.userdata[0]?.detailedLocationInfo.state !== ""
              ? row.userdata[0]?.detailedLocationInfo.state
              : "N/A"
            : "N/A",
      };
    });
    //Returning Data Table
    return (
      <>
        <ImageModal
          image={image}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        {/* <CollectionModal
          collection={collection}
          showModal={showDescModal}
          setShowModal={setShowDescModal}
          isBioProductsLoading={isBioProductsLoading}
          isChemProductsLoading={isChemProductsLoading}
          chemProducts={productsInfo.chemProducts}
          bioProducts={productsInfo.bioProducts}
        />*/}

        {props.isFiltered ? (
          <NormalDataTable
            title="KV Training"
            columns={columns}
            data={data}
            length={rowData.length}
            selectableRows
            paginationDefaultPage={props.pagenum}
            paginationPerPage={props.pagesize}
            setActivePage={(num) => props.setPagenum(num)}
            setPageAmount={(num) => props.setPagesize(num)}
            isFiltered={true}
            selectableRowsNoSelectAll={false}
            selectableRowSelected={(row) => props.selectedRows.includes(row.id)}
            expandableRows
            expandableRowExpanded={() => true}
            expandableRowsHideExpander
            expandableRowsComponent={<ExpandableComponent />}
            onSelectedRowsChange={(selected) => {
              props.setSelectedRows(selected.selectedRows.map((r) => r.id));
              if (selected.allSelected === true) {
                let modifiedRows = rowData.map((selectedResult) => {
                  return {
                    id: selectedResult.id,
                    postId: selectedResult.postId,
                    userId: selectedResult.userId,
                    medias: selectedResult.medias,
                    postContext: {
                      cropId: selectedResult.postContext.cropId,
                    },
                    locale: selectedResult.locale,
                    cropId: selectedResult.cropId,
                    diseaseId: selectedResult.trainedPost[0]?.diseaseId,
                    partOfPlant: selectedResult.partOfPlant,
                    // postedAt: "2021-10-20T14:42:04.009Z",
                    //updatedAt: "2021-10-20T14:42:04.009Z",
                    isTrained: selectedResult.isTrained,
                    diseaseName:
                      selectedResult.trainedPost.length !== 0
                        ? props.diseaseData.filter(
                            (r) =>
                              r.value ===
                              selectedResult.trainedPost[0]?.diseaseId
                          )[0]?.label
                        : "",
                    cropName:
                      selectedResult.trainedPost.length !== 0
                        ? props.cropData.filter(
                            (r) =>
                              r.value === selectedResult.trainedPost[0]?.cropId
                          )[0]?.label
                        : "",
                  };
                });
                props.setModifiedRows(modifiedRows);
              } else {
                let selectedResult = rowData.filter(
                  (row) => row.id === selected.selectedRows[0]?.id
                )[0];
                let modified = [...props.modifiedRows];
                if (selected.selectedRows.length > props.modifiedRows.length) {
                  modified = [
                    ...modified,
                    {
                      id: selectedResult.id,
                      postId: selectedResult.postId,
                      userId: selectedResult.userId,
                      medias: selectedResult.medias,
                      postContext: selectedResult.postContext,
                      locale: selectedResult.locale,
                      cropId: selectedResult.cropId,
                      diseaseId: selectedResult.trainedPost[0]?.diseaseId,
                      partOfPlant: selectedResult.partOfPlant,
                      // postedAt: "2021-10-20T14:42:04.009Z",
                      //updatedAt: "2021-10-20T14:42:04.009Z",
                      isTrained: selectedResult.isTrained,
                      diseaseName:
                        selectedResult.trainedPost.length !== 0
                          ? props.diseaseData.filter(
                              (r) =>
                                r.value ===
                                selectedResult.trainedPost[0]?.diseaseId
                            )[0]?.label
                          : "",
                      cropName:
                        selectedResult.trainedPost.length !== 0
                          ? props.cropData.filter(
                              (r) =>
                                r.value ===
                                selectedResult.trainedPost[0]?.cropId
                            )[0]?.label
                          : "",
                    },
                  ];
                } else {
                  modified = modified.filter((row) =>
                    selected.selectedRows.some((r) => r.id === row.id)
                  );
                }
                props.setModifiedRows(modified);
              }
            }}
          />
        ) : (
          <PaginationDataTable
            Type={CROP_DOC}
            activePage={props.pagenum}
            pageAmount={props.pagesize}
            title="KV Training"
            setActivePage={(num) => props.setPagenum(num)}
            setPageAmount={(num) => props.setPagesize(num)}
            callHandle={props.callHandle}
            columns={columns}
            data={data}
            searchValue=""
            totalCount={
              rows.notUpdatedData
                ? stats.cropDocUnAttendedCount
                : props.totalCount
            }
            selectableRows
            selectableRowsNoSelectAll={false}
            selectableRowSelected={(row) => props.selectedRows.includes(row.id)}
            expandableRows
            expandableRowExpanded={() => true}
            expandableRowsHideExpander
            expandableRowsComponent={<ExpandableComponent />}
            onSelectedRowsChange={(selected) => {
              props.setSelectedRows(selected.selectedRows.map((r) => r.id));
              if (selected.allSelected === true) {
                let modifiedRows = rowData.map((selectedResult) => {
                  return {
                    id: selectedResult.id,
                    postId: selectedResult.postId,
                    userId: selectedResult.userId,
                    medias: selectedResult.medias,
                    postContext: selectedResult.postContext,
                    locale: selectedResult.locale,
                    cropId: selectedResult.cropId,
                    diseaseId: selectedResult.trainedPost[0]?.diseaseId,
                    partOfPlant: selectedResult.partOfPlant,
                    // postedAt: "2021-10-20T14:42:04.009Z",
                    //updatedAt: "2021-10-20T14:42:04.009Z",
                    isTrained: selectedResult.isTrained,
                    diseaseName:
                      selectedResult.trainedPost.length !== 0
                        ? props.diseaseData.filter(
                            (r) =>
                              r.value ===
                              selectedResult.trainedPost[0]?.diseaseId
                          )[0]?.label
                        : "",
                    cropName:
                      selectedResult.trainedPost.length !== 0
                        ? props.cropData.filter(
                            (r) =>
                              r.value === selectedResult.trainedPost[0]?.cropId
                          )[0]?.label
                        : "",
                  };
                });
                props.setModifiedRows(modifiedRows);
              } else {
                let selectedResult = rowData.filter(
                  (row) => row.id === selected.selectedRows[0]?.id
                )[0];
                let modified = [...props.modifiedRows];
                if (selected.selectedRows.length > props.modifiedRows.length) {
                  modified = [
                    ...modified,
                    {
                      id: selectedResult.id,
                      postId: selectedResult.postId,
                      userId: selectedResult.userId,
                      medias: selectedResult.medias,
                      postContext: selectedResult.postContext,
                      locale: selectedResult.locale,
                      cropId: selectedResult.cropId,
                      diseaseId: selectedResult.trainedPost[0]?.diseaseId,
                      partOfPlant: selectedResult.partOfPlant,
                      // postedAt: "2021-10-20T14:42:04.009Z",
                      //updatedAt: "2021-10-20T14:42:04.009Z",
                      isTrained: selectedResult.isTrained,
                      diseaseName:
                        selectedResult.trainedPost.length !== 0
                          ? props.diseaseData.filter(
                              (r) =>
                                r.value ===
                                selectedResult.trainedPost[0]?.diseaseId
                            )[0]?.label
                          : "",
                      cropName:
                        selectedResult.trainedPost.length !== 0
                          ? props.cropData.filter(
                              (r) =>
                                r.value ===
                                selectedResult.trainedPost[0]?.cropId
                            )[0]?.label
                          : "",
                    },
                  ];
                } else {
                  modified = modified.filter((row) =>
                    selected.selectedRows.some((r) => r.id === row.id)
                  );
                }
                props.setModifiedRows(modified);
              }
            }}
          />
        )}
      </>
    );
  } else return <NoDataFound msg="No Records to display" />;
};

export default KVTotalData;
