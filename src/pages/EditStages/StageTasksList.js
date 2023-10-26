import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import CustomSelect from "../../components/Select/Select";
import { getTasksByStageApi } from "../../redux/actions/AddStageRecords/stageRecords";
import { getMandiPlants } from "../../redux/actions/Mandis/mandiPrices";
import { PageLoader } from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoData/NoDataFound";
import { getStagesByCropIdApi } from "../../services/apiService";
import EditStageTasks from "./EditStageTasks";

const StageTasksList = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const crops = useSelector((state) => state.mandis?.mandiPlants);
  const stageTasks = useSelector((state) => state.stageRecords).tasksByStage;

  const dispatch = useDispatch();

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      await dispatch(getMandiPlants());
    } catch (error) {}
  };

  const onCropChangeHandler = async (option) => {
    try {
      setStages([]);
      setSelectedStage("");
      const response = await getStagesByCropIdApi(option.value);
      setStages(response);
      if (option) {
        setSelectedCrop(option);
      } else {
        setSelectedCrop([]);
      }
    } catch (error) {}
  };

  const onStageChangeHandler = async (option) => {
    try {
      setIsLoading(true);
      await dispatch(getTasksByStageApi(option.value));
      setIsLoading(false);
      if (option) {
        setSelectedStage(option);
      } else {
        setSelectedStage([]);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const afterRowUpdateHandler = async (stageId) => {
    try {
      setIsLoading(true);
      await dispatch(getTasksByStageApi(stageId));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Stage tasks data by crop & stage</h2>
        </div>
      </div>
      <div className="tableMainSection cardShadow p-3 row">
        <div className="col-12 col-sm-6 col-md-4">
          <label className="bannerLableStyle">Crop:</label>
          <CustomSelect
            placeholder="Select Crop"
            value={selectedCrop}
            data={
              crops.length !== 0
                ? crops.map((row) => {
                    return {
                      label: row.cropName,
                      value: row.id,
                    };
                  })
                : []
            }
            onSelect={onCropChangeHandler}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <label className="bannerLableStyle">Stages:</label>
          <CustomSelect
            placeholder="Select Stage"
            value={selectedStage}
            data={
              stages.length !== 0
                ? stages.map((row) => {
                    return {
                      label: row.stageName,
                      value: row.id,
                    };
                  })
                : []
            }
            onSelect={onStageChangeHandler}
          />
        </div>
      </div>
      {selectedCrop !== "" && selectedStage !== "" ? (
        <div className="tableMainSection cardShadow farmerRegistrationTable">
          <div className="col-sm-8">
            <h5 className="subHeading p-3 mb-0">
              Stage tasks of {selectedStage.label}
            </h5>
          </div>
          <div className="col-12">
            {isLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Task Category</th>
                    <th>Task Description</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {stageTasks?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.taskName}</td>
                      <td>{item.taskCategory}</td>
                      <td>{item.taskDescription}</td>
                      <td>
                        <EditStageTasks
                          dataToEdit={item}
                          afterUpdateAction={afterRowUpdateHandler}
                        />
                      </td>
                    </tr>
                  ))}
                  {stageTasks.length === 0 && (
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
          Select crop & stage to view stage tasks data
        </div>
      )}
    </div>
  );
};

export default StageTasksList;
