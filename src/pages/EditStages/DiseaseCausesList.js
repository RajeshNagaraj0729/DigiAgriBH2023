import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "rsuite";

import { PageLoader } from "../../components/Loading/Loading";
import { getDiseasesCausesList } from "../../redux/actions/AddDiseaseRecords/diseaseRecords";
import DiseaseCauseTable from "../../services/TablesData/DiseaseCauseTable";

const DiseaseCausesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const diseaseCauses = useSelector(
    (state) => state.diseaseRecords
  )?.diseaseCauses;

  const dispatch = useDispatch();

  useEffect(() => {
    loadDiseaseCauses();
  }, []);

  const loadDiseaseCauses = async () => {
    try {
      setIsLoading(true);
      await dispatch(getDiseasesCausesList());
    } catch (error) {
      Alert.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Diseases Causes</h2>
        </div>
      </div> */}
      <div className="tableMainSection cardShadow farmerRegistrationTable">
        <div className="col-12">
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              <div
                className="d-flex justify-items-end m-2"
                style={{
                  width: "200px",
                  position: "absolute",
                  right: 15,
                  zIndex: 2,
                }}
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search disease cause"
                  className="inputStyle"
                />
              </div>
              <DiseaseCauseTable
                data={diseaseCauses || []}
                afterUpdateAction={loadDiseaseCauses}
                searchValue={search}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseCausesList;
