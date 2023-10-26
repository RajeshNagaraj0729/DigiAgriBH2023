//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { ProgressBar } from "react-bootstrap";
import dateFormat from "dateformat";
import exportFromJSON from "export-from-json";

//Custom Imports
import {
  fetchUsersData,
  fetchUserDatabyFilter,
} from "../../redux/actions/UsersData/fetchusersdata";
import UsersDataTable from "../../services/TablesData/UsersDataTable";
import Error from "../Error/Error";
import "../../components/Search/SearchStyle.css";
import Filter from "../../layouts/Filtering/Filter";
import {
  additionalLanguages,
  getLanguages,
  languages,
} from "../../services/Languages";
import Card from "../../components/Card/Card";
import { getUsersDataApi } from "../../services/CommonServices";

//Redering Users Data
const UsersData = () => {
  const [pagination, setPagination] = useState(true);
  const users = useSelector((state) => state.users);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [language, setLanguage] = useState("");
  const [pagenum, setPagenum] = useState(1);
  const [pageAmount, setPageAmount] = useState(10);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPostCode, setSelectedPostCode] = useState("");
  const [inProgress, setInProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(false);
  const [fetchedCount, setFetchedCount] = useState(0);
  const [disableFetchData, setDisablefetchData] = useState(false);
  const [label, setLabel] = useState("");
  const [includeCD, setincludeCD] = useState(false);
  const [includeKV, setincludeKV] = useState(false);

  const dispatch = useDispatch();
  const crops = useSelector((state) => state.cropDocInfo.crops);
  const cropDocStats = useSelector((state) => state.dashboardData);
  const getExportData = (exportData) => {
    //Excel data loading
    return exportData?.map((row) => {
      return {
        Username: row.firstName + " " + row.lastName,
        MobileNumber: row.phone,
        Address:
          (row.detailedLocationInfo?.suburb !== null &&
          row.detailedLocationInfo?.suburb !== ""
            ? row.detailedLocationInfo?.suburb + ", "
            : "") +
          (row.detailedLocationInfo?.city_district != null &&
          row.detailedLocationInfo?.city_district !== ""
            ? row.detailedLocationInfo?.city_district + ", "
            : "") +
          (row.detailedLocationInfo?.city != null &&
          row.detailedLocationInfo?.city !== ""
            ? row.detailedLocationInfo?.city + ", "
            : "") +
          (row.detailedLocationInfo?.village != null &&
          row.detailedLocationInfo?.village !== ""
            ? row.detailedLocationInfo?.village + ", "
            : "") +
          (row.detailedLocationInfo?.county != null &&
          row.detailedLocationInfo?.county !== ""
            ? row.detailedLocationInfo?.county + ", "
            : "") +
          (row.detailedLocationInfo?.district != null &&
          row.detailedLocationInfo?.district !== ""
            ? row.detailedLocationInfo?.district + ", "
            : "") +
          (row.detailedLocationInfo?.state != null &&
          row.detailedLocationInfo?.state !== ""
            ? row.detailedLocationInfo?.state
            : ""),
        State:
          row.detailedLocationInfo?.state != null &&
          row.detailedLocationInfo?.state !== ""
            ? row.detailedLocationInfo?.state
            : "N/A",
        Language: [...languages, ...additionalLanguages].filter(
          (lang) => lang.code === row.language
        )[0]?.name,
        Crops:
          row.crops &&
          row.crops.map((crop, key) => {
            var cropName = crops.filter((r) => r.id === crop.cropId)[0]
              ?.cropName;
            if (key !== row.crops?.length - 1 && cropName) {
              if (cropName) {
                return cropName + ", ";
              } else return "";
            } else {
              return cropName;
            }
          }),
        District:
          row.detailedLocationInfo?.district != null &&
          row.detailedLocationInfo?.district !== ""
            ? row.detailedLocationInfo?.district
            : "N/A",
        Pincode:
          row.detailedLocationInfo?.postcode != null &&
          row.detailedLocationInfo?.postcode !== 0
            ? row.detailedLocationInfo?.postcode
            : "N/A",
        LastOpened: dateFormat(row.lastOpened, "dd/mm/yyyy, h:MM:ss TT"),
        KisanVedikaPostsCount: row.postData?.length,
        CropDoctorPostsCount: row.cropdocData?.length,
      };
    });
  };

  //pagination handler
  const handlefetchusers = (active, amount) => {
    dispatch(fetchUsersData(active, amount));
  };

  const searchByFilter = (
    from,
    to,
    searchValue,
    crop,
    state,
    lang,
    district,
    postcode,
    pagenum,
    pagesize
  ) => {
    dispatch(
      fetchUserDatabyFilter(
        from,
        to,
        searchValue,
        crop,
        state,
        lang,
        district,
        postcode,
        pagenum,
        pagesize,
        includeCD,
        includeKV
      )
    );
  };

  //Date filter submit
  const handleDateFilterSubmit = (pagenum, pagesize) => {
    if (to && !from) {
      Alert.error("Input From date");
    } else if (to && from && to < from) {
      Alert.error("To Date should be greater than From Date");
    } else {
      setPagination(false);
      searchByFilter(
        from !== "" && from !== undefined ? new Date(from).toISOString() : "",
        to !== "" && to !== undefined
          ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
          : "",
        searchValue || "",
        selectedCrop ? selectedCrop.value : "",
        selectedState ? selectedState.value : "",
        language ? language.value : "",
        selectedDistrict ? selectedDistrict.value : "",
        selectedPostCode ? selectedPostCode : 0,
        pagenum,
        pagesize,
        includeCD,
        includeKV
      );
    }
  };

  // useEffect(() => {
  //   setExportData([].concat(...exportData, users.filteredData));
  // }, [users.filteredData]);

  const getTotalDataToExport = async () => {
    // setExportData([]);
    setInProgress(users.filteredData[0]?.totalCount);
    setProgressBar(true);
    let exportData = [];
    for (
      let i = 1;
      i <= Math.ceil(users.filteredData[0]?.totalCount / 1000);
      i++
    ) {
      const data = await getUsersDataApi(
        from !== "" && from !== undefined ? new Date(from).toISOString() : "",
        to !== "" && to !== undefined
          ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
          : "",
        searchValue || "",
        selectedCrop ? selectedCrop.value : "",
        selectedState ? selectedState.value : "",
        language ? language.value : "",
        selectedDistrict ? selectedDistrict.value : "",
        selectedPostCode ? selectedPostCode : 0,
        i,
        1000,
        includeCD,
        includeKV
      );
      setFetchedCount(i * 1000);
      exportData = [].concat(...exportData, data);
    }
    setProgressBar(false);
    setLabel("Downloading..");
    setDisablefetchData(true);
    exportFromJSON({
      data: getExportData(exportData),
      fileName: "usersdata",
      exportType: "csv",
    });
  };

  // //Send Individual Notification
  // const sendIndNotification = async (value) => {
  //   await dispatch(sendNotification(value))
  //     .then(() => {
  //       return true;
  //     })
  //     .catch((err) => {
  //       Alert.error(err.message);
  //       return false;
  //     });
  // };

  // //Send Notification function
  // const sendMultipleNotifications = async () => {
  //   for (let i = 0; i < users.filteredData?.length; i++) {
  //     const done = await sendIndNotification(users[i]);
  //     if (!done) {
  //       break;
  //     }
  //   }
  // };

  // const searchPinCode = (value) => {
  //   dispatch(getPostCodes(value)).catch((err) => Alert.error(err.message));
  // };

  //Users Error
  if (users.errmsg) {
    return <Error msg={users.errmsg} />;
  }

  //Users data returning
  else {
    return (
      <div>
        {/*Filtering Layout */}
        <Filter
          dateFilter={true}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          handleSubmit={() => {
            setPagenum(1);
            setPageAmount(10);
            setInProgress(0);
            // setExportData([]);
            setFetchedCount(0);
            setProgressBar(false);
            setDisablefetchData(false);
            setLabel("Get Total Data");
            handleDateFilterSubmit(1, 10);
          }}
          setSearchValue={(e) => setSearchValue(e)}
          searchValue={searchValue}
          searchDisable={
            !from &&
            !to &&
            !searchValue &&
            !selectedCrop &&
            !selectedState &&
            !language &&
            !selectedDistrict &&
            !selectedPostCode &&
            !includeCD &&
            !includeKV
          }
          search={true}
          searchPlaceholder="Username, Mobile, City"
          clearFilter={() => {
            setPagenum(1);
            setPageAmount(10);
            handlefetchusers(1, 10);
            setInProgress(0);
            // setExportData([]);
            setFetchedCount(0);
            setProgressBar(false);
            setDisablefetchData(false);
            setFrom("");
            setTo("");
            setSearchValue("");
            setPagination(true);
            setSelectedCrop("");
            setSelectedState("");
            setLanguage("");
            setSelectedDistrict("");
            setSelectedPostCode("");
            setincludeCD(false);
            setincludeKV(false);
          }}
          crops={crops.map((row) => {
            return {
              label: row.cropName,
              value: row.id,
            };
          })}
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          states={users.states?.map((r) => {
            return {
              label: r,
              value: r,
            };
          })}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          languages={getLanguages()}
          language={language}
          setLanguage={setLanguage}
          districts={users.districts?.map((r) => {
            return {
              label: r,
              value: r,
            };
          })}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          postCodes={users.postCodes?.map((r) => {
            return {
              label: r,
              value: r,
            };
          })}
          selectedPostCode={selectedPostCode}
          setSelectedPostCode={setSelectedPostCode}
          showKVCDCounts={true}
          includeCD={includeCD}
          includeKV={includeKV}
          setincludeCD={setincludeCD}
          setincludeKV={setincludeKV}
        />

        {!pagination && (
          <div className="row mb-md-0 mb-4 mb-xl-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-8 col-xl-9 mb-3 mb-sm-3 mb-md-0 ">
              <div
                className="align-items-center tableMainSection cardShadow space-md-inr h-100"
                style={{ display: "grid" }}
              >
                {progressBar ? (
                  <div>
                    Loading...
                    <ProgressBar
                      animated
                      now={(fetchedCount / inProgress) * 100}
                      variant="success"
                      label={`${fetchedCount}/${inProgress}`}
                    />
                  </div>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={getTotalDataToExport}
                    disabled={disableFetchData || users.isLoading}
                  >
                    {label}
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="diseaseBlueCard"
                cardHeading="Total Filtered Users"
                cardText={""}
                number={users.filteredData?.length}
                isLoading={users.isLoading && !progressBar ? true : false}
              />
            </div>
          </div>
        )}

        {/* Users Data Table */}
        {
          <UsersDataTable
            callHandle={pagination ? handlefetchusers : handleDateFilterSubmit}
            pagination={pagination}
            crops={crops.map((row) => {
              return {
                label: row.cropName,
                value: row.id,
              };
            })}
            pagenum={pagenum}
            pageAmount={pageAmount}
            setPagenum={setPagenum}
            setPageAmount={setPageAmount}
            includeCD={includeCD}
            includeKV={includeKV}
          />
        }
      </div>
    );
  }
};

export default UsersData;
