import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import CustomSelect from "../../components/Select/Select";
import { getStagesByCropApi } from "../../redux/actions/AddStageRecords/stageRecords";
import { getMandiPlants } from "../../redux/actions/Mandis/mandiPrices";
import { PageLoader } from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoData/NoDataFound";
import EditStage from "./EditStage";

const StagesList = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const crops = useSelector((state) => state.mandis?.mandiPlants);
  const stages = useSelector((state) => state.stageRecords).stagesByCrop;

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
      setIsLoading(true);
      await dispatch(getStagesByCropApi(option.value));
      setIsLoading(false);
      if (option) setSelectedCrop(option);
      else setSelectedCrop([]);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const afterRowUpdateHandler = async (cropId) => {
    try {
      setIsLoading(true);
      await dispatch(getStagesByCropApi(cropId));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Stages data by crop</h2>
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
      </div>
      {selectedCrop !== "" ? (
        <div className="tableMainSection cardShadow farmerRegistrationTable">
          <div className="col-sm-8">
            <h5 className="subHeading p-3 mb-0">
              Stages of {selectedCrop.label}
            </h5>
          </div>
          <div className="col-12">
            {isLoading ? (
              <PageLoader />
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Stage Name</th>
                    <th>Description</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {stages?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.stageName}</td>
                      <td>{item.description}</td>
                      <td>
                        <EditStage
                          dataToEdit={item}
                          afterUpdateAction={afterRowUpdateHandler}
                        />
                      </td>
                    </tr>
                  ))}
                  {stages.length === 0 && (
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
          Select crop to view stage data
        </div>
      )}
    </div>
  );
};

export default StagesList;
