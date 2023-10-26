import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

import CustomVisionTable from "../../services/TablesData/CustomVisionTable";
import ExcelFileDownload from "../../components/DownloadOptions/ExcelFileDownload";
import {
  CROP_DOC_UPLOAD,
  uploadCropdocImage,
} from "../../redux/actions/CropDoc/fetchrows";
import * as constants from "../../constants";

const CustomVisionTest = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [value, setValue] = useState("");
  const [loadingPercent, setLoadingPercent] = useState(0);

  const visionData = useSelector(
    (state) => state.totalResults
  ).customVisionData;

  const dispatch = useDispatch();

  const uploadImages = async () => {
    let length = selectedImages.length;
    if (length === 0) {
      Alert.error("Select atleast 1 image");
    } else {
      refreshData();
      setIsUploading(true);
      let error = false;

      for (var i = 0; i < length; i++) {
        setLoadingPercent(parseInt((i / length) * 100));
        await dispatch(uploadCropdocImage(userId, selectedImages[i])).catch(
          (err) => {
            error = true;
            Alert.error("Can't diagnose image");
          }
        );
        if (error) {
          break;
        }
      }
      setIsUploading(false);
    }
  };

  const refreshData = async () => {
    await dispatch({
      type: CROP_DOC_UPLOAD,
      refresh: true,
    });
  };

  const data = visionData?.map((row) => {
    return {
      imageName: row.imageUrl.split("/")[1]?.split("$")[0],
      imageUrl: constants.mediaUrl + row.imageUrl + constants.sasToken,
      result: row.visionPredictions
        ?.slice(0, 10)
        ?.map((r) => r.tagName + ": " + r.probability * 100)
        .join(", "),
    };
  });

  return (
    <div style={isUploading ? { height: "100vh", overflowY: "hidden" } : {}}>
      {isUploading && (
        <div
          style={{
            width: "calc(100% - 290px)",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 2,
          }}
          className="d-flex justify-content-center"
        >
          <div
            style={{
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Spinner
              color="white"
              style={{ width: "3rem", height: "3rem", justifySelf: "center" }}
            />
            <p
              style={{
                color: "white",
                fontSize: "20px",
              }}
            >
              {loadingPercent}% Done
            </p>
          </div>
        </div>
      )}
      <div className="tableMainSection cardShadow p-3">
        <input
          type="file"
          accept="image/*"
          multiple
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSelectedImages(e.target.files);
          }}
        />
        <button
          className="btn btn-sm btn-primary"
          disabled={isUploading}
          onClick={uploadImages}
        >
          Upload <i className="fa fa-upload"></i>
        </button>
      </div>
      <div className="d-flex mb-3">
        <ExcelFileDownload
          data={data}
          fileName={"Custom Vision Results"}
          name="Export Data"
        />
        <button
          className="btn btn-sm btn-warning ml-3"
          onClick={() => {
            refreshData();
            setValue("");
            setSelectedImages([]);
          }}
        >
          Refresh Data <i className="fa fa-refresh"></i>
        </button>
      </div>
      <CustomVisionTable data={data} />
    </div>
  );
};

export default CustomVisionTest;
