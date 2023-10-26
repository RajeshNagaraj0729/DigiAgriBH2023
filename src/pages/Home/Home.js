/*
React Imports
 */
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";

/*
Custom Component Imports
 */
import Dashboard from "../../layouts/Stats/Dashboard";
import "../../App.css";
import "../../components/Card/CardStyle.css";
import ExcelFileDownload from "../../components/DownloadOptions/ExcelFileDownload";
import NewUsersData from "../../services/TablesData/DashBoardTable";
import ErrorComponent from "../../components/Error/Error";
import Filter from "../../layouts/Filtering/Filter";
import { Alert } from "rsuite";
import * as DashboardApi from "../../redux/actions/Dashboard/dashboardData";

/**
 * Dashboard Page Results
 */
const Home = () => {
  const newUsers = useSelector((state) => state.dashboardData).newUsers;
  //const stats = useSelector((state) => state.dashboardData).stats;
  const topUsers = useSelector((state) => state.dashboardData).topUsers;
  const chartData = useSelector((state) => state.dashboardData).chartData;
  const cropDocStats = useSelector((state) => state.dashboardData);
  const [from, setFrom] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
  const [to, setTo] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
  const [smsCredits, setSMSCredits] = useState("");

  const dispatch = useDispatch();

  //Loading Excel Data
  const excel_data = newUsers.data?.map((row) => {
    return {
      Username: `${row.firstName + row.lastName}`,
      MobileNumber: row.phone,
      Status: row.isVerified ? "Verified" : "Not Verified",
      CreatedOn: dateFormat(row.createdAt, "dd/mm/yyyy, h:MM:ss TT"),
    };
  });

  const getStats = (from, to) => {
    if (to && !from) {
      Alert.error("Input From date");
    } else if (to && from && to < from) {
      Alert.error("To Date should be greater than From Date");
    } else {
      dispatch(
        DashboardApi.getCurrentVersionUsersCount(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
      dispatch(
        DashboardApi.getNewUsersCount(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
      dispatch(
        DashboardApi.getKisanVedikaPostsCount(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
      dispatch(
        DashboardApi.getCropDocUsersCount(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
      dispatch(
        DashboardApi.fetchRecentLoggedInUsers(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
      dispatch(
        DashboardApi.getTotalCropDocDayCountFilter(
          from !== "" && from !== undefined
            ? new Date(from).toISOString()
            : null,
          to !== "" && to !== undefined
            ? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
            : null
        )
      ).catch((err) => {
        Alert.error(err.message);
      });
    }
  };

  useEffect(() => {
    getStats("", "");
  }, []);

  useEffect(() => {
    getTextLocalCredits();
  }, []);

  const getTextLocalCredits = async () => {
    try {
      let resData = "";
      const url =
        "https://api.textlocal.in/balance/?apikey=suCFefHz71I-o2sxaGF6cNtKXUJmFNJd3eXawaa4Mb";
      await fetch(`${url}`, {
        headers: { "Content-Type": `application/x-www-form-urlencoded` },
      })
        .then((response) => response.json())
        .then((data) => {
          resData = data;
        })
        .catch((error) => {
          throw new Error(error);
        });
      setSMSCredits(resData.balance.sms);
    } catch (error) {}
  };

  //Returning Dashboard components
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">User Activity</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Filter
            dateFilter={true}
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            clearFilter={() => {
              setFrom(dateFormat(Date.now(), "yyyy-mm-dd"));
              setTo(dateFormat(Date.now(), "yyyy-mm-dd"));
              getStats("", "");
            }}
            searchDisable={from === "" && to === ""}
            handleSubmit={() => getStats(from, to)}
          />
        </div>
      </div>

      {/* Render Dashboard components */}
      <div className="row">
        <div className="col-12">
          <Dashboard
            totalData={
              cropDocStats.totalCropDocCount !== null
                ? cropDocStats.totalCropDocCount
                : "isLoading"
            }
            validData={
              cropDocStats.totalCropDocWithDiseaseCount !== null
                ? cropDocStats.totalCropDocWithDiseaseCount
                : "isLoading"
            }
            inValidData={
              cropDocStats.totalCropDocWithoutDiseaseCount !== null
                ? cropDocStats.totalCropDocWithoutDiseaseCount
                : "isLoading"
            }
            newData={
              cropDocStats.totalCropDocDayCount !== null
                ? cropDocStats.totalCropDocDayCount
                : "isLoading"
            }
            cropDocUserCount={
              cropDocStats.cropDocUsersCount !== null
                ? cropDocStats.cropDocUsersCount
                : "isLoading"
            }
            currentVersionCount={
              cropDocStats.currentVersionCount !== null
                ? cropDocStats.currentVersionCount
                : "isLoading"
            }
            postsCount={
              cropDocStats.postsCount !== null
                ? cropDocStats.postsCount
                : "isLoading"
            }
            //totalUsers={stats.data ? stats.data.totalUsers : "isLoading"}
            recentUsers={newUsers.data ? newUsers.data.length : "isLoading"}
            newUsers={
              cropDocStats.newUsersCount !== null
                ? cropDocStats.newUsersCount
                : "isLoading"
            }
            topUsers={topUsers.data.length !== 0 ? topUsers.data : "isLoading"}
            chartData={
              chartData.data.length !== 0 ? chartData.data : "isLoading"
            }
            //statsError={stats.errmsg}
            topUsersError={topUsers.errmsg}
            chartDataError={chartData.errmsg}
            currentVersionName={
              cropDocStats.currentVersionName
                ? cropDocStats.currentVersionName
                : "Loading.."
            }
            cdDayWiseCount={
              cropDocStats.cropDocDayWiseFilterCount !== null
                ? cropDocStats.cropDocDayWiseFilterCount
                : "isLoading"
            }
            smsCreditsData={smsCredits === "" ? "isLoading" : smsCredits}
          />
        </div>
      </div>
      <div className="dashedLine"></div>

      {/* Excel Component */}
      <div className="row mb-2">
        <div
          className="col-12"
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <ExcelFileDownload
            data={excel_data}
            fileName="New Users"
            name="Export Data"
          />
        </div>
      </div>

      {/* Recentlu logged in Users data */}
      <div className="row">
        <div className="col-12">
          <div className="tableMainSection cardShadow">
            {newUsers.errmsg ? (
              <ErrorComponent msg={newUsers.errmsg} />
            ) : (
              <NewUsersData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
