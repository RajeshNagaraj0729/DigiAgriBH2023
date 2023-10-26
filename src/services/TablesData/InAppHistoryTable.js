import React from "react";
import { useDispatch } from "react-redux";

import PaginationDataTable from "../../components/DataTables/PaginationDataTable";

const InAppHistoryTable = (props) => {
  const {
    inAppData,
    pageNum,
    pageSize,
    apiHandler,
    pageNumHandler,
    pageSizeHandler,
  } = props;

  const dispatch = useDispatch();

  const columns = [
    {
      name: "Notification",
      selector: "notificationTitle",
      center: true,
    },
    {
      name: "Accepted Count",
      selector: "acceptedCount",
      center: true,
    },
    {
      name: "Canceled Count",
      selector: "canceledCount",
      center: true,
    },
  ];

  let historyData = inAppData.map((data) => {
    return {
      notificationTitle: data.title,
      acceptedCount: data.acceptedCount,
      canceledCount: data.canceledCount,
    };
  });

  return (
    <PaginationDataTable
      activePage={pageNum}
      pageAmount={pageSize}
      title="In App History"
      setActivePage={pageNumHandler}
      setPageAmount={pageSizeHandler}
      dispatch={dispatch}
      callHandle={apiHandler}
      columns={columns}
      data={historyData}
      searchValue=""
      totalCount={
        pageNum * pageSize === pageNum * inAppData.length
          ? 500
          : inAppData.length < pageSize
          ? pageNum * pageSize - inAppData.length
          : inAppData.length
      }
    />
  );
};

export default InAppHistoryTable;
