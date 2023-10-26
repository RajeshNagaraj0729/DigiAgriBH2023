import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import CustomSelect from "../../components/Select/Select";
import { PageLoader } from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoData/NoDataFound";
import {
  getDiseasesCausesList,
  getDiseasesListByCause,
} from "../../redux/actions/AddDiseaseRecords/diseaseRecords";
import EditDisease from "./EditDisease";
import { Alert } from "rsuite";

const DiseasesList = () => {
  const [selectedDiseaseCause, setSelectedDiseaseCause] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const diseases = useSelector((state) => state.diseaseRecords)?.diseases;
  const diseaseCauses = useSelector(
    (state) => state.diseaseRecords
  )?.diseaseCauses;

  const dispatch = useDispatch();

  useEffect(() => {
    loadDiseaseCauses();
  }, []);

  const loadDiseaseCauses = async () => {
    try {
      await dispatch(getDiseasesCausesList());
    } catch (error) {}
  };

  const onDiseaseCauseChangeHandler = async (option) => {
    try {
      setIsLoading(true);
      await dispatch(getDiseasesListByCause(option.value));
      if (option) setSelectedDiseaseCause(option);
      else setSelectedDiseaseCause([]);
    } catch (error) {
      Alert.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const afterRowUpdateHandler = async (diseaseCauseId) => {
    try {
      setIsLoading(true);
      await dispatch(getDiseasesListByCause(diseaseCauseId));
    } catch (error) {
      Alert.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Diseases data by Cause</h2>
        </div>
      </div>
      <div className="tableMainSection cardShadow p-3 row">
        <div className="col-12 col-sm-6 col-md-4">
          <label className="bannerLableStyle">Disease Cause:</label>
          <CustomSelect
            placeholder="Select Disease Cause"
            value={selectedDiseaseCause}
            data={
              diseaseCauses.length !== 0
                ? diseaseCauses.map((row) => {
                    return {
                      label: row.name,
                      value: row.id,
                    };
                  })
                : []
            }
            onSelect={onDiseaseCauseChangeHandler}
          />
        </div>
      </div>
      {selectedDiseaseCause !== "" ? (
        <div className="tableMainSection cardShadow farmerRegistrationTable">
          <div className="col-sm-8">
            <h5 className="subHeading p-3 mb-0">
              Diseases of {selectedDiseaseCause.label}
            </h5>
          </div>
          <div className="col-12">
            {isLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Cause Description</th>
                    <th>Preventive Measures</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {diseases?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.causeDescription}</td>
                      <td>{item.priventiveMeasures}</td>
                      <td>
                        <EditDisease
                          dataToEdit={item}
                          afterUpdateAction={afterRowUpdateHandler}
                        />
                      </td>
                    </tr>
                  ))}
                  {diseases.length === 0 && (
                    <tr>
                      <td colSpan="10">
                        <NoDataFound msg="No data found" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center col-12 nodata">
          Select disease cause to view disease data
        </div>
      )}
    </div>
  );
};

export default DiseasesList;
