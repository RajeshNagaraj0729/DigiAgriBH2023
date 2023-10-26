/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import PestCareDeepLinkTable from "../../services/TablesData/PestCareDeepLinkTable";
import {
  createDeepLink,
  fetchDeepLinks,
} from "../../redux/actions/DeepLink/deepLink";
import { dynamicLinkGenerationApi } from "../../services/Deeplinking";

//Deeplinking Implementation

const PestCareDeepLink = () => {
  const crops = useSelector((state) => state.mandis?.mandiPlants);
  const pestCareDeepLinks = useSelector(
    (state) => state.deepLinks?.pestCareDeeplinks
  );
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    deepLinkList();
  }, []);

  const deepLinkList = async () => {
    await dispatch(fetchDeepLinks("pestCareWithCrop"))
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  const cropsData = crops.filter(
    (c) =>
      c.isPestCareEnabled === true &&
      !pestCareDeepLinks.some((d) => c.id === d.linkId)
  );

  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responsePestLinkData = await dynamicLinkGenerationApi(
      selectedCrop.value,
      "pestCareWithCrop",
      "UNGUESSABLE"
    );

    const data = {
      linkId: selectedCrop.value,
      linkType: "pestCareWithCrop",
      linkName: selectedCrop.label,
      deepLinkUrl: responsePestLinkData?.shortUrl,
      generatedBy: null,
      linkFormat: "UNGUESSABLE",
      generatedFrom: "web",
    };

    await dispatch(createDeepLink(data))
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
        <div className="row">
          <div className="col-12">
            <h2 className="mainHeading">Pest Care Deep links</h2>
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
                    if (option) setSelectedCrop(option);
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
        </div>
        <div className="tableMainSection cardShadow topUsersMainSec">
          {/* Table for Vision Tags */}
          <div className="visionTagsSec">
            {pestCareDeepLinks?.length !== 0 ? (
              <PestCareDeepLinkTable data={pestCareDeepLinks} />
            ) : (
              "No Records Found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestCareDeepLink;
