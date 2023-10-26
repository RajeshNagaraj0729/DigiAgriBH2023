/*
React Imports
 */
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Spinner } from "reactstrap";
import { Modal } from "rsuite";

/*
Custom Component Imports
 */
import Statistics from "../../layouts/Stats/CropDoc";
import * as Constants from "../../constants";
import "../../App.css";
import "../TotalResults/EditDiseaseStyle.css";
import KVTotalData from "../../services/TablesData/KVTotalData";
import Error from "../Error/Error";
import { PageLoader } from "../../components/Loading/Loading";
import KvFilter from "../../layouts/Filtering/KvFilter";
import { Alert } from "rsuite";
import {
  fetchKvTrainingPosts,
  changeKVResultDiseaseName,
} from "../../redux/actions/KisanVedika/kisanVedika";

/**
 * Crop Doctor Total Results Page
 */
const KVResults = () => {
  const dispatch = useDispatch();
  const cropDocInfo = useSelector((state) => state.cropDocInfo);
  const cropDoc = useSelector((state) => state.totalResults);
  const kvResults = useSelector((state) => state.kisanVedika.kvTrainingPost);
  const kisanVedikaPostCount = useSelector(
    (state) => state.kisanVedika.kvPostsCount
  );
  const diseases = cropDocInfo.diseases;
  const crops = cropDocInfo.crops;
  const stats = useSelector((state) => state.dashboardData);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterType, setFilterType] = useState("");
  const [includeMetricStress, setIncludeMetricStress] = useState(false);
  const [isTrained, setIsTrained] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [modifiedRows, setModifiedRows] = useState([]);

  const [validate, setValidate] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [pagenum, setPagenum] = useState(1);
  const [pagesize, setPagesize] = useState(10);
  const [includeTensorFlow, setIncludeTensorFlow] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (modifiedRows.length === 0) {
      setValidate(false);
    }
  }, [modifiedRows]);

  useEffect(() => {
    handlefetchrows(1, 10, true);
  }, []);

  // const fetchKVData = async () => {
  //   await dispatch(fetchKvTrainingPosts(1, 10)).catch((err) => {
  //     Alert.error(err.message);
  //   });
  // };

  //Dispatching filter criteria
  const handlefetchrows = async (number, amount, reset) => {
    if (!reset && from && !to) {
      Alert.error("Please provide TO Date");
    } else {
      setIsLoading(true);
      await dispatch(
        fetchKvTrainingPosts(
          number,
          amount,
          !reset && from ? dateFormat(from, "mm-dd-yyyy") : "",
          !reset && to ? dateFormat(to, "mm-dd-yyyy") : "",
          reset ? "" : searchValue,
          reset ? "" : isTrained,
          reset ? "" : filterType
        )
      ).catch((err) => {
        Alert.error(err.message);
      });

      if (from || to || searchValue || isTrained) {
        setIsFiltered(true);
      } else {
        setIsFiltered(false);
      }
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  //If data is fetched returning the Crop Doctor Total Results components
  else {
    const data = kvResults;
    //Validation for multiple
    const validateMultipleUpdate = () => {
      for (var element in modifiedRows) {
        if (!modifiedRows[element].diseaseId) {
          return true;
        }
      }
      return false;
    };

    //Update Multiple rows
    const updateMultiple = async () => {
      let check = validateMultipleUpdate();
      if (check) {
        setValidate(true);
        setShowValidateModal(true);
      } else {
        setValidate(false);
        for (var element in modifiedRows) {
          if (modifiedRows[element].diseaseId) {
            const modifiedDisease = {
              // id: modifiedRows[element].id,
              postId: modifiedRows[element].id,
              userId: modifiedRows[element].userId,
              medias: modifiedRows[element].medias,
              postContext: modifiedRows[element].postContext,
              locale: modifiedRows[element].locale,
              cropId: modifiedRows[element].cropId,
              diseaseId: modifiedRows[element].diseaseId,
              partOfPlant: modifiedRows[element].partOfPlant,
              // postedAt: "2021-10-20T14:42:04.009Z",
              //updatedAt: "2021-10-20T14:42:04.009Z",
              isTrained:
                modifiedRows[element].isTrained === "true"
                  ? true
                  : modifiedRows[element].isTrained === "false"
                  ? false
                  : false,
            };
            await dispatch(changeKVResultDiseaseName(modifiedDisease)).catch(
              (err) => {
                Alert.error("Can't Update");
                //break;
              }
            );
          }
        }
        handlefetchrows(pagenum, pagesize);
        resetSelectedValues();
      }
    };

    //Individual Update
    const updateIndividual = async (row) => {
      if (row.diseaseId) {
        const modifiedDisease = {
          // id: row.id,
          postId: row.id,
          userId: row.userId,
          medias: row.medias,
          postContext: row.postContext,
          locale: row.locale,
          cropId: row.cropId,
          diseaseId: row.diseaseId,
          partOfPlant: row.partOfPlant,
          // postedAt: "2021-10-20T14:42:04.009Z",
          //updatedAt: "2021-10-20T14:42:04.009Z",
          isTrained:
            row.isTrained === "true"
              ? true
              : row.isTrained === "false"
              ? false
              : false,
        };

        await dispatch(changeKVResultDiseaseName(modifiedDisease))
          .then(() => {
            let index = selectedRows.indexOf(row.id);
            selectedRows.splice(index, 1);
            index = modifiedRows.map((r) => r.id).indexOf(row.id);
            modifiedRows.splice(index, 1);
            handlefetchrows(pagenum, pagesize);
          })
          .catch((err) => {
            Alert.error("Can't Update");
          });
      } else {
        Alert.error("Update Disease name");
      }
    };

    //Loading Excel Data
    // let excel_data = data.map((row) => {
    //   return {
    //     Username: `${row.userdata[0]?.firstName + row.userdata[0]?.lastName}`,
    //     MobileNumber: row.userdata[0]?.phone.substring(
    //       3,
    //       row.userdata[0]?.phone.length
    //     ),
    //     Image: Constants.mediaUrl + row.imageUrl,
    //     Result:
    //       row.diagnosisDetails === null
    //         ? row.cognitiveDetails && row.cognitiveDetails.cognitiveMessage
    //           ? row.cognitiveDetails.cognitiveMessage
    //           : "No Data Found"
    //         : row.diagnosisDetails[0]?.causeInfo[0]?.name,
    //     Address:
    //       row.userdata[0] && row.userdata[0].detailedLocationInfo
    //         ? (row.userdata[0].detailedLocationInfo.suburb !== null &&
    //           row.userdata[0].detailedLocationInfo.suburb !== ""
    //             ? row.userdata[0].detailedLocationInfo.suburb + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.city_district != null &&
    //           row.userdata[0].detailedLocationInfo.city_district !== ""
    //             ? row.userdata[0].detailedLocationInfo.city_district + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.city != null &&
    //           row.userdata[0].detailedLocationInfo.city !== ""
    //             ? row.userdata[0].detailedLocationInfo.city + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.village != null &&
    //           row.userdata[0].detailedLocationInfo.village !== ""
    //             ? row.userdata[0].detailedLocationInfo.village + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.county != null &&
    //           row.userdata[0].detailedLocationInfo.county !== ""
    //             ? row.userdata[0].detailedLocationInfo.county + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.district != null &&
    //           row.userdata[0].detailedLocationInfo.district !== ""
    //             ? row.userdata[0].detailedLocationInfo.district + ", "
    //             : "") +
    //           (row.userdata[0].detailedLocationInfo.state != null &&
    //           row.userdata[0].detailedLocationInfo.state !== ""
    //             ? row.userdata[0].detailedLocationInfo.state
    //             : "")
    //         : "N/A",
    //     CreatedOn: dateFormat(row.createdOn, "dd/mm/yyyy, h:MM:ss TT"),
    //     EstimatedCropArea:
    //       row.metricStress && row.metricStress.estimatedCropArea,
    //     EstimatedAffectedArea:
    //       row.metricStress && row.metricStress.estimatedStress,
    //     Source: row.source === "cv" ? "Custom Vision" : "Tensor Flow",
    //   };
    // });
    // excel_data = excel_data.map((row) => {
    //   return {
    //     Username: row.Username,
    //     MobileNumber: row.MobileNumber,
    //     Image: row.Image,
    //     Result: row.Result,
    //     Address: row.Address || "N/A",
    //     CreatedOn: row.CreatedOn,
    //     EstimatedCropArea: row.EstimatedCropArea,
    //     EstimatedAffectedArea: row.EstimatedAffectedArea,
    //   };
    // });

    //Reseting selected and modified rows
    const resetSelectedValues = () => {
      setModifiedRows([]);
      setSelectedRows([]);
    };

    //Reseting pagenum and pagesize
    const initialPageDetails = () => {
      setPagenum(1);
      setPagesize(10);
    };

    //Date filter submit
    const handleDataFilterSubmit = () => {
      resetSelectedValues();
      initialPageDetails();
      handlefetchrows(1, 10);
    };

    //Returning components
    return (
      <div>
        <Modal
          overflow={false}
          show={showValidateModal}
          onHide={() => setShowValidateModal(false)}
        >
          <Modal.Header closeButton>
            <div className="row">
              <div className="col-9">
                <Modal.Title className="mpdalTitle">Alert</Modal.Title>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modalBodyTextDiseaseName">
              <h6>Missed To Update Disease Name</h6>
            </div>
            <div className="modalBodyTextLeft">
              If disease name is not selected, update will not appear in crop
              doctor widget screen in app
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-sm btn-danger"
              onClick={() => setShowValidateModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {(stats.totalCropDocCount === null ||
          stats.totalCropDocCount === undefined) && (
          <div
            style={{
              width: "calc(100% - 290px)",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 2,
            }}
            className="d-flex justify-content-center"
          >
            <div
              style={{
                marginTop: "250px",
                textAlign: "center",
              }}
            >
              <Spinner
                color="white"
                style={{
                  width: "3rem",
                  height: "3rem",
                  justifySelf: "center",
                }}
              />
              <p
                style={{
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Loading...
              </p>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-start py-0">
              <h2 className="mainHeading">KV Training</h2>
            </div>
          </div>
        </div>

        {/* Data filter */}
        <KvFilter
          from={from}
          to={to}
          dateFilter={true}
          setFrom={(e) => setFrom(e)}
          setTo={(e) => setTo(e)}
          handleSubmit={handleDataFilterSubmit}
          // excel_data={excel_data}
          excel_fileName="Users Details"
          setSearchValue={(e) => setSearchValue(e)}
          searchValue={searchValue}
          search={true}
          searchPlaceholder="Username, Mobile no."
          imageDownload={true}
          filterType={true}
          filterTypeValue={filterType}
          selectType={(value) => setFilterType(value)}
          links={data.map((link) => Constants.downloadUrl + link.imageUrl)}
          includeMetricStress={includeMetricStress}
          setIncludeMetricStress={setIncludeMetricStress}
          clearFilter={() => {
            setFrom("");
            setTo("");
            setSearchValue("");
            setModifiedRows([]);
            setSelectedRows([]);
            setFilterType("");
            setIncludeMetricStress(false);
            setIsTrained("");
            setIncludeTensorFlow(false);
            initialPageDetails();
            handlefetchrows(1, 10, true);
          }}
          searchDisable={
            searchValue === "" &&
            from === "" &&
            to === "" &&
            filterType === "" &&
            !includeMetricStress &&
            isTrained === "" &&
            !includeTensorFlow
          }
          isTrained={isTrained}
          setIsTrained={setIsTrained}
          includeTensorFlow={includeTensorFlow}
          setIncludeTensorFlow={setIncludeTensorFlow}
        />

        {/* Crop Doctor Total Results Table */}
        <div className="row">
          {selectedRows.length !== 0 && (
            <div className="updateBtnMainStyle">
              <div className="updateBtnStyle">
                <Button
                  className="btn btn-sm btn-success"
                  style={{ float: "right" }}
                  onClick={updateMultiple}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
          <div className="col-12">
            <KVTotalData
              validate={validate}
              totalCount={kisanVedikaPostCount ? kisanVedikaPostCount : 10}
              callHandle={handlefetchrows}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              modifiedRows={modifiedRows}
              setModifiedRows={setModifiedRows}
              diseaseData={
                diseases.length !== 0 &&
                diseases.map((row) => {
                  return {
                    label: row.name,
                    value: row.id,
                  };
                })
              }
              cropData={
                crops.length !== 0 &&
                crops.map((row) => {
                  return {
                    label: row.cropName,
                    value: row.id,
                  };
                })
              }
              updateIndividual={updateIndividual}
              pagenum={pagenum}
              pagesize={pagesize}
              setPagenum={(num) => {
                setPagenum(num);
              }}
              setPagesize={(num) => {
                setPagesize(num);
              }}
              isFiltered={isFiltered}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default KVResults;
