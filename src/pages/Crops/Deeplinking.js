/**
 * React imports
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import DeeplinkingTable from "../../services/TablesData/DeeplinkingTable";
import { updateDynamicLink } from "../../redux/actions/UsersData/fetchusersdata";
import { dynamicLinkGenerationApi } from "../../services/Deeplinking";

//Deeplinking Implementation

const Deeplinking = () => {
  const crops = useSelector((state) => state.mandis?.mandiPlants);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");

  const dispatch = useDispatch();

  const cropsData = crops.filter(
    (r) => r.deepLinks?.cropCareLink === "" && r.deepLinks?.pestCareLink === ""
  );

  const deeplinkData = crops.filter(
    (r) => r.deepLinks?.cropCareLink !== "" && r.deepLinks?.pestCareLink !== ""
  );

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responseCropLinkData = await dynamicLinkGenerationApi(
      selectedCrop,
      "cropCareWithCrop",
      "UNGUESSABLE"
    );
    const responsePestLinkData = await dynamicLinkGenerationApi(
      selectedCrop,
      "pestCareWithCrop",
      "UNGUESSABLE"
    );

    await dispatch(
      updateDynamicLink(
        selectedCrop,
        responseCropLinkData?.shortUrl,
        responsePestLinkData?.shortUrl
      )
    )
      .then(() => {
        Alert.success("Updated Successfully");
        window.location.reload();
      })
      .catch((err) => {
        Alert.error(err.message);
      });
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-12">
        {/*<div className="row">
          <div className="col-12">
            <h2 className="mainHeading">Deep linking</h2>
          </div>
        </div>
       <div className="tableMainSection cardShadow space-md-inr">
          <form>
            <div className="row">
              <div className="col-12 col-sm-4">
                <CustomSelect
                  placeholder="Select Crops"
                  search={true}
                  data={
                    cropsData.length !== 0
                      ? cropsData.map((row) => {
                          return {
                            label: row.cropName,
                            value: row.id,
                          };
                        })
                      : []
                  }
                  onSelect={(option) => {
                    if (option) setSelectedCrop(option.value);
                    else setSelectedCrop([]);
                  }}
                  disabled={true}
                />
              </div>
              <div className="col-12 col-sm-4">
                <OverlayTrigger
                  overlay={
                    cropsData.length === 0 ? (
                      <Tooltip id="tooltip-disabled">
                        All crop links generated
                      </Tooltip>
                    ) : !selectedCrop ? (
                      <Tooltip id="tooltip-top">Select Crop</Tooltip>
                    ) : (
                      <Tooltip id="tooltip-top">
                        Click to generate deep links
                      </Tooltip>
                    )
                  }
                >
                  <span className="d-inline-block">
                    <button
                      disabled={
                        loading || cropsData.length === 0 || !selectedCrop
                      }
                      className="btn btn-md btn-primary"
                      onClick={submitHandle}
                      style={
                        cropsData.length === 0 || !selectedCrop
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    >
                      Generate Deep Link
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </form>
        </div> */}
        <div className="tableMainSection cardShadow topUsersMainSec">
          {/* Table for Vision Tags */}
          <div className="visionTagsSec">
            {deeplinkData?.length !== 0 ? (
              <DeeplinkingTable data={deeplinkData} />
            ) : (
              "No Records Found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deeplinking;
