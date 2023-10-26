/*
React Imports
 */
import React from "react";
import { useDispatch, useStore, useSelector } from "react-redux";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import EditCriteria from "../../pages/InAppNotification/EditCriteria";
import DeleteCriteria from "../../pages/InAppNotification/DeleteCriteria";

/**
 * Table for Vision tags
 * @param {props} props
 */
const AppCriteriaNotificationTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Notification",
      selector: "notificationId",
    },
    {
      name: "Crop",
      selector: "cropId",
    },
    {
      name: "State",
      selector: "state",
    },
    {
      name: "Language",
      selector: "language",
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
  const crops = useSelector((state) => state.cropDocInfo.crops);
  const appNotification = useSelector(
    (state) => state.notification
  )?.getAppNotification;
  // Fetching Row Data
  const data = props.data?.map((row) => {
    const cropName = crops.find((c) => c.id === row.filterCriteria.cropId);
    const notificationName = appNotification.find(
      (name) => name.id === row.notificationId
    );
    return {
      notificationId: notificationName?.title ? notificationName?.title : "N/A",
      cropId: cropName.cropName,
      state: row.filterCriteria.state,
      language:
        row.filterCriteria.language === "en"
          ? "English"
          : row.filterCriteria.language === "te"
          ? "Telugu"
          : row.filterCriteria.language === "hi"
          ? "Hindi"
          : "N/A",
      update: <EditCriteria data={row} outlined={true} />,
      delete: <DeleteCriteria data={row} outlined={true} />,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="In App Criteria Notification Data"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default AppCriteriaNotificationTable;
