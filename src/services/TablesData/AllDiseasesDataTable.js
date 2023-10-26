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

const AllDiseasesDataTable = (props) => {
  const {
    diseasesData,
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
      name: "Disease Id",
      selector: "diseaseId",
      center: true,
    },
    {
      name: "Disease Name",
      selector: "diseaseName",
      center: true,
    },
    {
      name: "Images",
      selector: "images",
      center: true,
    },
  ];

  let diseases = diseasesData.map((data) => {
    return {
      diseaseId: data.id,
      diseaseName: data.name,
      images: (
        <button
          className="btn btn-sm btn-primary"
          style={{ color: "white", backgroundColor: "#007bff" }}
          onClick={() => {
            setShowModal(true);
            setModalImages(
              data.imageUrls.map((r) => {
                return {
                  mediaUrl: constants.mediaUrl + r,
                  mediaType: "image",
                };
              })
            );
          }}
        >
          View Images
        </button>
      ),
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
        title="Diseases"
        setActivePage={pageNumHandler}
        setPageAmount={pageSizeHandler}
        dispatch={dispatch}
        callHandle={apiHandler}
        columns={columns}
        data={diseases}
        searchValue=""
        totalCount={
          pageNum * pageSize === pageNum * diseasesData.length
            ? 500
            : diseasesData.length < pageSize
            ? pageNum * pageSize - diseasesData.length
            : diseasesData.length
        }
      />
    </div>
  );
};

export default AllDiseasesDataTable;
