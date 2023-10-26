import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";

import { fetchInAppNotificationHistoryApi } from "../../redux/actions/Notification/notification";
import InAppHistoryTable from "../../services/TablesData/InAppHistoryTable";

const InAppHistory = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const inAppHistoryData = useSelector(
    (state) => state.notification.activityHistory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    loadInAppNotificationHistory(1, 10);
  }, []);

  const loadInAppNotificationHistory = async (num, size) => {
    try {
      await dispatch(fetchInAppNotificationHistoryApi(num, size));
    } catch (error) {
      Alert.error(error);
    }
  };

  return (
    <div>
      <InAppHistoryTable
        inAppData={!!inAppHistoryData ? inAppHistoryData : []}
        pageNum={pageNum}
        pageSize={pageSize}
        apiHandler={loadInAppNotificationHistory}
        pageNumHandler={setPageNum}
        pageSizeHandler={setPageSize}
      />
    </div>
  );
};

export default InAppHistory;
