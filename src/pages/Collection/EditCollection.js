/**
 * React imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";

/**
 * Custom imports
 */
import { updateCollection } from "../../redux/actions/Collection/collection";

//Collection Object
const initialValue = {
  title: "",
  name: "",
  displayOrder: "",
  url: "",
};

/**
 *
 * @param {props} props
 */
const EditCollection = (props) => {
  const dispatch = useDispatch();
  const store = useStore();
  const collection = useSelector((state) => state.collection);
  const selectedCollection = collection.data.filter(
    (r) => r.id === props.id
  )[0];

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [title, setTitle] = useState(selectedCollection.title);
  const [name, setName] = useState(selectedCollection.name);
  const [url, setUrl] = useState(selectedCollection.url);
  const [displayOrder, setDisplayOrder] = useState(
    selectedCollection.displayOrder
  );

  //Update collection submit
  const handleSubmit = async () => {
    initialValue.title = title;
    initialValue.name = name;
    initialValue.displayOrder = displayOrder;
    initialValue.id = props.id;
    initialValue.url = url;
    await dispatch(updateCollection(initialValue, props.language)).then(() => {
      if (store.getState().collection.updateMsg === "Success") {
        handleModalClose();
        window.location.reload();
      }
    });
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <button
        onClick={handleModalShow}
        className="btn btn-sm btn-warning"
        disabled={props.disable}
      >
        Edit
      </button>

      {/* Submit Modal Implementation */}
      <Modal
        show={showModal}
        onHide={handleModalClose}
        overflow={false}
        size={window.innerWidth < "991" ? "xs" : "sm"}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-9">
              <Modal.Title className="mpdalTitle">Edit Collection</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Title:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setDisable(false);
                    }}
                    value={title}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Name:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                      setDisable(false);
                    }}
                    value={name}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Url:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setDisable(false);
                    }}
                    value={url}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">
                    Collection Position:
                  </label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setDisplayOrder(e.target.value);
                      setDisable(false);
                    }}
                    value={displayOrder}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-danger"
            onClick={handleModalClose}
            style={{ margin: "5px" }}
          >
            Close
          </Button>
          <Button
            className={
              disable ? "btn btn-sm btn-light" : "btn btn-sm btn-primary"
            }
            disabled={disable}
            onClick={handleSubmit}
            style={{ margin: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditCollection;
