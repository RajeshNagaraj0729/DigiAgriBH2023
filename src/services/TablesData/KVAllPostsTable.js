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

const KVAllPostsTable = (props) => {
  const {
    posts,
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
      name: "Post Id",
      selector: "postId",
      center: true,
    },
    {
      name: "Post Title",
      selector: "postTitle",
      center: true,
    },
    {
      name: "Posted By",
      selector: "postedBy",
      center: true,
    },
    {
      name: "Crop",
      selector: "cropName",
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
  ];

  let kvPosts = posts.map((data) => {
    return {
      postId: data?.id,
      postTitle: data?.title,
      postedBy: data?.users[0]?.firstName + " " + data.users[0]?.lastName,
      cropName: data?.crops[0]?.cropName,
      images: (
        <button
          className="btn btn-sm btn-primary"
          style={{ color: "white", backgroundColor: "#007bff" }}
          onClick={() => {
            setShowModal(true);
            setModalImages(
              data.media.map((r) => {
                return {
                  mediaUrl: r.mediaUrl.startsWith("https://")
                    ? r.mediaUrl
                    : constants.mediaUrl + r.mediaUrl,
                  mediaType: r.mediaType,
                };
              })
            );
          }}
        >
          View Images
        </button>
      ),
      postedAt: dateFormat(data.postedAt, "dd/mm/yyyy, h:MM:ss TT"),
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
        title="Kisan Vedika Posts"
        setActivePage={pageNumHandler}
        setPageAmount={pageSizeHandler}
        dispatch={dispatch}
        callHandle={apiHandler}
        columns={columns}
        data={kvPosts}
        searchValue=""
        totalCount={
          pageNum * pageSize === pageNum * posts.length
            ? 200
            : posts.length < pageSize
            ? pageNum * pageSize - posts.length
            : posts.length
        }
      />
    </div>
  );
};

export default KVAllPostsTable;
