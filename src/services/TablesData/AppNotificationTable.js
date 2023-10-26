/*
React Imports
 */
import React from "react";
import dateFormat from "dateformat";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import EditAppNotification from "../../pages/InAppNotification/EditAppNotification";
import DeleteAppNotification from "../../pages/InAppNotification/DeleteAppNotification";
import * as constants from "../../constants";
import {
  notificationTypes,
  sourceTypes,
} from "../../pages/InAppNotification/AppNotification";

/**
 * Table for Vision tags
 * @param {props} props
 */
const AppNotificationTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Type",
      selector: "type",
      center: true,
    },
    {
      name: "Title",
      selector: "title",
    },
    {
      name: "Active From",
      selector: "activeFrom",
      center: true,
    },
    {
      name: "Active To",
      selector: "activeTo",
      center: true,
    },
    {
      name: "Media Url",
      selector: "mediaUrl",
      center: true,
    },
    {
      name: "Redirect Link",
      selector: "redirectLink",
      center: true,
    },
    {
      name: "Handle Name",
      selector: "handleName",
      center: true,
    },
    {
      name: "Status",
      selector: "status",
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
  const data = props.data?.map((row) => {
    let redirectLink = "N/A";

    if (row.type === "type_1") {
      redirectLink = sourceTypes.find(
        (type) => type.value === row.redirectLink
      ).label;
    } else {
      if (!!row.redirectLink) {
        redirectLink = (
          <a target="_blank" href={row.redirectLink} rel="noreferrer">
            {row.redirectLink}
          </a>
        );
      }
    }

    return {
      type: notificationTypes.find((type) => type.value === row.type).label,
      title: row.title,
      activeFrom: dateFormat(row.activeFrom, "dd/mm/yyyy"),
      activeTo: dateFormat(row.activeTo, "dd/mm/yyyy"),
      mediaUrl: !!row.mediaUrl ? (
        <img
          src={constants.mediaUrl + row.mediaUrl}
          alt="Not Found"
          className="cropDoctorResults imagePreview"
        />
      ) : (
        "N/A"
      ),
      redirectLink: redirectLink,
      handleName: row.handleName ? row.handleName : "N/A",
      status:
        new Date(row.activeTo).setHours(0, 0, 0, 0) >=
          new Date().setHours(0, 0, 0, 0) &&
        new Date(row.activeFrom).setHours(0, 0, 0, 0) <=
          new Date().setHours(0, 0, 0, 0) ? (
          <div className="bgSuccess whiteText smPadding smBorderRadius">
            Active
          </div>
        ) : (
          <div className="bgDanger whiteText smPadding smBorderRadius">
            Inactive
          </div>
        ),
      update: <EditAppNotification data={row} outlined={true} />,
      delete: <DeleteAppNotification data={row} outlined={true} />,
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="In App Notification Data"
      columns={columns}
      data={data}
      length={props.data?.length}
    />
  );
};

export default AppNotificationTable;
