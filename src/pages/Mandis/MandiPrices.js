import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";
import { PageLoader } from "../../components/Loading/Loading";
import {
  getMandiPricesData,
  createMandiPrices,
  createMandiPricesInProd,
  getLastUploadedDate,
} from "../../redux/actions/Mandis/mandiPrices";
import MandiPriceTable from "../../services/TablesData/MandiPriceTable";
import Card from "../../components/Card/Card";
import { Modal } from "rsuite";
import { Button } from "react-bootstrap";
import dateFormat from "dateformat";

const MandiPrices = () => {
  const mandiPrices = useSelector((state) => state.mandis);
  const crops = mandiPrices?.mandiPlants;
  const [isPricesLoading, setIsPricesLoading] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const cropNames = crops
    ?.filter((crop) => crop.cropName !== "Other")
    .map((crop) => crop.cropName);
  const [isUploading, setIsUploading] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [isUploadingInProd, setIsUploadingInProd] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastUploadedDateLoading, setLastUploadedDateLoading] = useState(true);

  const matchCropsInMandis = () => {
    return mandiPrices?.mandiPrices
      ?.filter(
        (r) =>
          cropNames?.some(
            (x) =>
              x
                .toLowerCase()
                .replace(" ", "")
                .includes(r.commodity.toLowerCase().replace(" ", "")) ||
              r.commodity
                .toLowerCase()
                .replace(" ", "")
                .includes(x.toLowerCase().replace(" ", "")) ||
              r.commodity === "Bhindi(Ladies Finger)" ||
              r.commodity === "Chili Red" ||
              r.commodity === "Lemon" ||
              r.commodity === "Orange"
          ) && r.commodity !== "Sweet Potato"
      )
      .map((row) => {
        return {
          ...row,
          commodity: cropNames?.filter(
            (x) =>
              x
                .toLowerCase()
                .replace(" ", "")
                .includes(row.commodity.toLowerCase().replace(" ", "")) ||
              row.commodity
                .toLowerCase()
                .replace(" ", "")
                .includes(x.toLowerCase().replace(" ", "")) ||
              (row.commodity === "Bhindi(Ladies Finger)" && x === "Okra") ||
              (row.commodity === "Chili Red" && x === "Red Chilli") ||
              ((row.commodity === "Lemon" || row.commodity === "Orange") &&
                x === "Citrus")
          )[0],
          createdAt: mandiPrices.mandiCreatedAt,
        };
      });
  };

  const getMandiPrices = async () => {
    setIsPricesLoading(true);
    await dispatch(getMandiPricesData()).catch((err) =>
      Alert.error(err.message)
    );
    setIsPricesLoading(false);
  };

  const submitMandiPrices = async () => {
    setIsUploading(true);
    const data = matchCropsInMandis();
    await dispatch(createMandiPrices(data))
      .then(() => {
        Alert.success("Mandis uploaded successfully in beta");
      })
      .catch((err) => {
        Alert.error(err.message);
      });
    setIsUploading(false);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  const submitMandiPricesInProd = async () => {
    handleModalClose();
    setIsUploadingInProd(true);
    const data = matchCropsInMandis();
    await dispatch(createMandiPricesInProd(data))
      .then(() => {
        Alert.success("Mandis uploaded successfully in prod");
      })
      .catch((err) => {
        Alert.error(err.message);
      });
    setIsUploadingInProd(false);
  };

  const getMandisLastUploadedDate = async () => {
    setLastUploadedDateLoading(true);
    await dispatch(getLastUploadedDate()).catch((err) => {
      Alert.error(err.message);
    });
    setLastUploadedDateLoading(false);
  };

  useEffect(() => {
    getMandisLastUploadedDate();
  }, []);
  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        overflow={false}
        size={window.innerWidth < "991" ? "xs" : "sm"}
      >
        <Modal.Body className="modalBodyText">
          Are you sure to you want to upload to prod?
        </Modal.Body>
        <Modal.Footer style={{ textAlign: "center" }}>
          <Button
            className="btn btn-sm btn-primary"
            type="submit"
            style={{ margin: "5px" }}
            onClick={submitMandiPricesInProd}
          >
            OK
          </Button>
          <Button
            className="btn btn-sm btn-danger"
            onClick={handleModalClose}
            style={{ margin: "5px" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-12">
          <div className="row mb-4 mb-md-0 mb-lg-1 mb-xl-4">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="whiteCardBg"
                cardHeading="Total Mandis"
                cardText="Count"
                cardHeadingStyle="whiteCardBgHeadingColor"
                cardTextStyle="whiteCardBgTxtColor"
                numberStyle="textSuccess"
                number={mandiPrices?.mandiPrices.length}
                isLoading={isPricesLoading}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="whiteCardBg"
                cardHeading="Filtered Mandis"
                cardText="Count"
                cardHeadingStyle="whiteCardBgHeadingColor"
                cardTextStyle="whiteCardBgTxtColor"
                numberStyle="textPrimary"
                number={matchCropsInMandis().length}
                isLoading={isPricesLoading}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="whiteCardBg"
                cardHeading="Refreshed At"
                cardText={
                  isPricesLoading
                    ? "Loading.."
                    : dateFormat(
                        new Date(
                          new Date(mandiPrices.mandiCreatedAt).setMinutes(
                            new Date(mandiPrices.mandiCreatedAt).getMinutes() -
                              330
                          )
                        ),
                        "dd-mm-yyyy hh:MM:ss TT"
                      )
                }
                cardHeadingStyle="whiteCardBgHeadingColor"
                cardTextStyle="whiteCardBgTxtColor"
                numberStyle="textPrimary"
                number={null}
                isLoading={false}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3 mb-3 mb-sm-3 mb-md-0">
              <Card
                cardStyle="whiteCardBg"
                cardHeading="Last Uploaded At"
                cardText={
                  lastUploadedDateLoading
                    ? "Loading.."
                    : dateFormat(
                        mandiPrices.lastUploadedDate,
                        "dd-mm-yyyy hh:MM:ss TT"
                      )
                }
                cardHeadingStyle="whiteCardBgHeadingColor"
                cardTextStyle="whiteCardBgTxtColor"
                numberStyle="textPrimary"
                number={null}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-3 ">
          <button
            className="btn btn-sm btn-success m-1"
            onClick={submitMandiPrices}
            disabled={isUploading}
            style={{ width: "150px" }}
          >
            {isUploading ? (
              <Spinner
                style={{ width: "1rem", height: "1rem", fontSize: "1rem" }}
                size="sm"
              />
            ) : (
              <>
                <i className="fa fa-upload"></i> Bulk Upload In Beta
              </>
            )}
          </button>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-3">
          <button
            className="btn btn-sm btn-success m-1"
            onClick={handleModalClose}
            disabled={isUploadingInProd}
            style={{ width: "150px" }}
          >
            {isUploadingInProd ? (
              <Spinner
                style={{ width: "1rem", height: "1rem", fontSize: "1rem" }}
                size="sm"
              />
            ) : (
              <>
                <i className="fa fa-upload"></i> Bulk Upload In Prod
              </>
            )}
          </button>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-3">
          <button
            className="btn btn-sm btn-warning m-1"
            onClick={getMandiPrices}
            style={{ width: "100px" }}
          >
            <i className="fa fa-refresh"></i> Refresh
          </button>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 mb-3">
          <a
            type="button"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(matchCropsInMandis())
            )}`}
            download="mandi_prices.json"
          >
            {`Download Json`}
          </a>
        </div>
      </div>

      <div
        className="d-flex justify-items-end m-2 align-items-center"
        style={{
          width: "500px",
          position: "absolute",
          right: 15,
          zIndex: 2,
        }}
      >
        <label style={{ marginBottom: 0, width: "250px", marginRight: "30px" }}>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            onChange={() => setShowTotal(!showTotal)}
          />
          Show Total Data
        </label>
        Search:<div>&nbsp;</div>
        <div>&nbsp;</div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="crop, state, district, market"
          className="inputStyle"
        />
      </div>
      {isPricesLoading ? (
        <PageLoader />
      ) : (
        <MandiPriceTable
          data={mandiPrices?.mandiPrices}
          searchValue={search}
          crops={crops?.map((crop) => crop.cropName)}
          showTotal={showTotal}
        />
      )}
    </div>
  );
};

export default MandiPrices;
