import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
import Carousel from "react-bootstrap/Carousel";
import dateFormat from "dateformat";

import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import * as constants from "../../constants";

const CustomCarousel = (props) => {
  const { data } = props;

  return (
    <Carousel>
      {data.map((r, i) => {
        return (
          <Carousel.Item>
            <div className="d-flex align-items-center justify-content-center">
              {r.mediaType === "video" ? (
                <video width="70%" height="500" controls>
                  <source src={r.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  className="d-block w-100"
                  src={r.mediaUrl}
                  alt="Not Uploaded"
                  style={{ height: "500px" }}
                />
              )}
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

const CarouselModal = (props) => {
  const { images, showModal, setShowModal } = props;
  return (
    <Modal overflow={false} show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Body>
        <CustomCarousel data={images} />
      </Modal.Body>
    </Modal>
  );
};

const KisanBazaarAdsTable = (props) => {
  const {
    adsData,
    pageNum,
    pageSize,
    apiHandler,
    pageNumHandler,
    pageSizeHandler,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      name: "Ad Id",
      selector: "adId",
      center: true,
    },
    {
      name: "Ad Title",
      selector: "adTitle",
      center: true,
    },
    {
      name: "Posted By",
      selector: "postedBy",
      center: true,
    },
    {
      name: "Images",
      selector: "images",
      center: true,
    },
    {
      name: "Posted At",
      selector: "postedAt",
      center: true,
    },
    {
      name: "Address",
      selector: "address",
      center: true,
    },
    {
      name: "Sold Out",
      selector: "soldOut",
      center: true,
    },
  ];

  let kisanBazaarAds = adsData.map((data) => {
    return {
      adId: data.id,
      adTitle: data.title,
      postedBy: data.users[0].firstName + " " + data.users[0].lastName,
      images: (
        <button
          className="btn btn-sm btn-primary"
          style={{ color: "white", backgroundColor: "#007bff" }}
          onClick={() => {
            setShowModal(true);
            setModalImages(
              data.media.map((r) => {
                return {
                  mediaUrl: constants.mediaUrl + r.mediaUrl,
                  mediaType: r.mediaType,
                };
              })
            );
          }}
        >
          View Images
        </button>
      ),
      postedAt: dateFormat(data.createdAt, "dd/mm/yyyy, h:MM:ss TT"),
      address: data.contactDetails.address,
      soldOut: data.isSold ? "True" : "False",
    };
  });

  return (
    <div>
      <CarouselModal
        showModal={showModal}
        setShowModal={setShowModal}
        images={modalImages}
      />
      <PaginationDataTable
        activePage={pageNum}
        pageAmount={pageSize}
        title="Kisan Bazaar Ads"
        setActivePage={pageNumHandler}
        setPageAmount={pageSizeHandler}
        dispatch={dispatch}
        callHandle={apiHandler}
        columns={columns}
        data={kisanBazaarAds}
        searchValue=""
        totalCount={
          pageNum * pageSize === pageNum * adsData.length
            ? 200
            : adsData.length < pageSize
            ? pageNum * pageSize - adsData.length
            : adsData.length
        }
      />
    </div>
  );
};

export default KisanBazaarAdsTable;
