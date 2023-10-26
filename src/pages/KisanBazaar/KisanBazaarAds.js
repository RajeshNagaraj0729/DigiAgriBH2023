import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";

import { fetchKisanBazaarAdsApi } from "../../redux/actions/KisanBazaar/category";
import KisanBazaarAdsTable from "../../services/TablesData/KisanBazaarAdsTable";

const KisanBazaarAds = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const kbAds = useSelector((state) => state.category.kisanBazaarAds);

  const dispatch = useDispatch();

  useEffect(() => {
    loadKisanBazaarAds(1, 10);
  }, []);

  const loadKisanBazaarAds = async (num, size) => {
    try {
      await dispatch(fetchKisanBazaarAdsApi(num, size));
    } catch (error) {
      Alert.error(error);
    }
  };

  return (
    <div>
      <KisanBazaarAdsTable
        adsData={!!kbAds ? kbAds : []}
        pageNum={pageNum}
        pageSize={pageSize}
        apiHandler={loadKisanBazaarAds}
        pageNumHandler={setPageNum}
        pageSizeHandler={setPageSize}
      />
    </div>
  );
};

export default KisanBazaarAds;
