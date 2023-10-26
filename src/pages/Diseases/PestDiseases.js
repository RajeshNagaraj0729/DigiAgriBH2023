import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";

import { fetchAllDiseasesApi } from "../../redux/actions/AddPlantRecords/addPlantRecords";
import AllDiseasesDataTable from "../../services/TablesData/AllDiseasesDataTable";

const PestDiseases = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const diseasesData = useSelector(
    (state) => state.plantRecords.allDiseasesData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    loadDiseases(1, 10);
  }, []);

  const loadDiseases = async (num, size) => {
    try {
      await dispatch(fetchAllDiseasesApi(num, size));
    } catch (error) {
      Alert.error(error);
    }
  };

  return (
    <div>
      <AllDiseasesDataTable
        diseasesData={!!diseasesData ? diseasesData : []}
        pageNum={pageNum}
        pageSize={pageSize}
        apiHandler={loadDiseases}
        pageNumHandler={setPageNum}
        pageSizeHandler={setPageSize}
      />
    </div>
  );
};

export default PestDiseases;
