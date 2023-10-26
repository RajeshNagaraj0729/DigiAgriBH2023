//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import { Alert, Button } from "rsuite";

//Custom Imports
import {
  fetchUsersData,
  fetchUserDatabyFilter,
  sendNotification,
} from "../../redux/actions/UsersData/fetchusersdata";
import UsersDataTable from "../../services/TablesData/UsersDataTable";
import Error from "../Error/Error";
import "../../components/Search/SearchStyle.css";
import Filter from "../../layouts/Filtering/Filter";
import { getStates } from "../../services/statesAndDistricts";
import {
  getLanguages,
  languages,
  additionalLanguages,
} from "../../services/Languages";
import NoDataFound from "../../components/NoData/NoDataFound";
import TextInput from "../../components/Common/TextInput";
import CustomSelect from "../../components/Select/Select";

//Redering Users Notification
const UserNotificaton = () => {
  const dispatch = useDispatch();
  const crops = useSelector((state) => state.cropDocInfo.crops);
  const users = useSelector((state) => state.users);
  const cropDocStats = useSelector((state) => state.dashboardData);

  const [pagination, setPagination] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [language, setLanguage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedType, setSelectedType] = useState({
    label: "Text",
    value: "Text",
  });
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState({
    label: cropDocStats.currentVersionName
      ? cropDocStats.currentVersionName
      : "Loading..",
    value: cropDocStats.currentVersionName
      ? cropDocStats.currentVersionName
      : "Loading..",
  });
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPostCode, setSelectedPostCode] = useState("");
  const [pagenum, setPagenum] = useState(1);
  const [pageAmount, setPageAmount] = useState(10);

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
    userVersion,
    pagenum,
    pagesize,
    title,
    message,
    type,
    isNotification
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
        false,
        false,
        userVersion,
        title,
        message,
        type,
        isNotification
      )
    );
  };

  //Date filter submit
  const handleDateFilterSubmit = (pagenum, pagesize) => {
    setPagination(false);
    searchByFilter(
      "",
      "",
      searchValue || "",
      selectedCrop ? selectedCrop.value : "",
      selectedState ? selectedState.value : "",
      language ? language.value : "",
      selectedDistrict ? selectedDistrict.value : "",
      selectedPostCode ? selectedPostCode : 0,
      version ? version.value : "",
      pagenum,
      pagesize
    );
    setFrom("");
    setTo("");
    setUrl("");
    setTitle("");
    setSelectedType({
      label: "Text",
      value: "Text",
    });
  };

  //Send Notification function
  const sendMultipleNotifications = async () => {
    if (to && !from) {
      Alert.error("Input From date");
    } else if (to && from && to <= from) {
      Alert.error("To Date should be greater than From Date");
    } else {
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
        version ? version.value : "",
        pagenum,
        pageAmount,
        title,
        url,
        selectedType.value,
        true
      );
      setFrom("");
      setTo("");
      setUrl("");
      setTitle("");
      setSelectedType({
        label: "Text",
        value: "Text",
      });
    }
  };

  useEffect(() => {
    searchByFilter("", "", null);
  }, []);

  //Users Error
  if (users.errmsg) {
    return <Error msg={users.errmsg} />;
  }

  //Users data returning
  else {
    const data = pagination ? users.data : users.filteredData;
    //Excel data loading
    const excel_data = data?.map((row) => {
      return {
        Username: row.firstName + " " + row.lastName,
        MobileNumber: row.phone,
        Address:
          (row.detailedLocationInfo.suburb !== null &&
          row.detailedLocationInfo.suburb !== ""
            ? row.detailedLocationInfo.suburb + ", "
            : "") +
          (row.detailedLocationInfo.city_district != null &&
          row.detailedLocationInfo.city_district !== ""
            ? row.detailedLocationInfo.city_district + ", "
            : "") +
          (row.detailedLocationInfo.city != null &&
          row.detailedLocationInfo.city !== ""
            ? row.detailedLocationInfo.city + ", "
            : "") +
          (row.detailedLocationInfo.village != null &&
          row.detailedLocationInfo.village !== ""
            ? row.detailedLocationInfo.village + ", "
            : "") +
          (row.detailedLocationInfo.county != null &&
          row.detailedLocationInfo.county !== ""
            ? row.detailedLocationInfo.county + ", "
            : "") +
          (row.detailedLocationInfo.district != null &&
          row.detailedLocationInfo.district !== ""
            ? row.detailedLocationInfo.district + ", "
            : "") +
          (row.detailedLocationInfo.state != null &&
          row.detailedLocationInfo.state !== ""
            ? row.detailedLocationInfo.state
            : ""),
        State:
          row.detailedLocationInfo.state != null &&
          row.detailedLocationInfo.state !== ""
            ? row.detailedLocationInfo.state
            : "N/A",
        Language: [...languages, ...additionalLanguages].filter(
          (lang) => lang.code === row.language
        )[0].name,
        Crops:
          row.crops &&
          row.crops.map((crop, key) => {
            var cropName = crops.filter((r) => r.id === crop.cropId)[0]
              ?.cropName;
            if (key !== row.crops.length - 1 && cropName) {
              if (cropName) {
                return cropName + ", ";
              } else return "";
            } else {
              return cropName;
            }
          }),
        District:
          row.detailedLocationInfo.district != null &&
          row.detailedLocationInfo.district !== ""
            ? row.detailedLocationInfo.district
            : "N/A",
        Pincode:
          row.detailedLocationInfo.postcode != null &&
          row.detailedLocationInfo.postcode !== 0
            ? row.detailedLocationInfo.postcode
            : "N/A",
        LastOpened: dateFormat(row.lastOpened, "dd/mm/yyyy, h:MM:ss TT"),
        KisanVedikaPostsCount: row.postData?.length,
        CropDoctorPostsCount: row.cropdocData?.length,
      };
    });

    return (
      <div>
        {/*Filtering Layout */}
        <Filter
          //   dateFilter={true}
          //   from={from}
          //   setFrom={setFrom}
          //   to={to}
          //   setTo={setTo}
          handleSubmit={() => {
            setPagenum(1);
            setPageAmount(10);
            handleDateFilterSubmit(1, 10);
            setIsSubmitted(true);
          }}
          excel_data={excel_data}
          enableExcel={true}
          excel_fileName="Users Data"
          setSearchValue={(e) => setSearchValue(e)}
          searchValue={searchValue}
          search={true}
          searchPlaceholder="Username, Mobile, City"
          searchDisable={
            !from &&
            !to &&
            !searchValue &&
            !selectedCrop &&
            !selectedState &&
            !language &&
            !version &&
            !selectedDistrict &&
            !selectedPostCode
          }
          versionFilter={true}
          version={version}
          setVersion={setVersion}
          versions={[
            {
              label: cropDocStats.currentVersionName
                ? cropDocStats.currentVersionName
                : "Loading..",
              value: cropDocStats.currentVersionName
                ? cropDocStats.currentVersionName
                : "Loading..",
            },
          ]}
          clearFilter={() => {
            setPagenum(1);
            setPageAmount(10);
            searchByFilter("", "", null);
            setSearchValue("");
            setPagination(true);
            setSelectedCrop("");
            setSelectedState("");
            setLanguage("");
            setIsSubmitted(false);
            setFrom("");
            setTo("");
            setUrl("");
            setTitle("");
            setSelectedType({
              label: "Text",
              value: "Text",
            });
            setVersion({
              label: cropDocStats.currentVersionName
                ? cropDocStats.currentVersionName
                : "Loading..",
              value: cropDocStats.currentVersionName
                ? cropDocStats.currentVersionName
                : "Loading..",
            });
            setSelectedDistrict("");
            setSelectedPostCode("");
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
        />

        {/* Users Data Table */}
        {!isSubmitted ? (
          <NoDataFound msg="Apply filter to view results" />
        ) : (
          <>
            {users.filteredData?.length !== 0 && (
              <div
                className="row mb-3"
                style={{
                  backgroundColor: "white",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              >
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <TextInput
                    labelName="From:"
                    id="from"
                    value={from}
                    labelClass="bannerLableStyle"
                    divClass="form-group mb-sm-0"
                    type="date"
                    inputClass="inputStyle"
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                    min={dateFormat(Date.now(), "yyyy-mm-dd")}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <TextInput
                    labelName="To:"
                    id="to"
                    value={to}
                    labelClass="bannerLableStyle"
                    divClass="form-group mb-sm-0"
                    type="date"
                    inputClass="inputStyle"
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                    min={from || dateFormat(Date.now(), "yyyy-mm-dd")}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <TextInput
                    labelName={"Title:"}
                    id="title"
                    value={title}
                    labelClass="bannerLableStyle"
                    divClass="form-group mb-sm-0"
                    type="text"
                    inputClass="inputStyle"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                  <div className={"form-group"}>
                    <label htmlFor={"not-type"} className="bannerLableStyle">
                      Select Type:
                    </label>
                    <CustomSelect
                      data={[
                        { label: "Text", value: "Text" },
                        { label: "Url", value: "Url" },
                      ]}
                      placeholder="Select type"
                      onSelect={(option) => setSelectedType(option)}
                      value={selectedType}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                  <TextInput
                    labelName={
                      selectedType.value === "Text" ? "Message:" : "Url:"
                    }
                    id="url"
                    value={url}
                    labelClass="bannerLableStyle"
                    divClass="form-group mb-sm-0"
                    type="text"
                    inputClass="inputStyle"
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                  />
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-flex align-items-center">
                  <Button
                    className="btn btn-sm btn-primary"
                    onClick={sendMultipleNotifications}
                    disabled={!title || !from || !to || !url}
                  >
                    Send Notification
                  </Button>
                </div>
              </div>
            )}
            <UsersDataTable
              callHandle={
                pagination ? handlefetchusers : handleDateFilterSubmit
              }
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
              includeCD={false}
              includeKV={false}
            />
          </>
        )}
      </div>
    );
  }
};

export default UserNotificaton;
