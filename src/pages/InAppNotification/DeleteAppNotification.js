/**
 * React imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom imports
 */
import { deleteAppNotification } from "../../redux/actions/Notification/notification";

/**
 *
 * @param {props} props
 */
const DeleteAppNotification = (props) => {
  const dispatch = useDispatch();
  const getAppNotification = useSelector((state) => state.notification)
    ?.getAppNotification;

  const inAppNotificationId = getAppNotification.filter(
    (r) => r.id === props.data.id
  )[0];
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const deleteCommentSubmit = async () => {
    await dispatch(deleteAppNotification(inAppNotificationId.id))
      .then(() => {
        setShowModal(false);
        Alert.success("App notification deleted successfully");
      })
      .catch((err) => Alert.error(err.message));
    window.location.reload();
  };
  return (
    <div>
      <button
        onClick={handleModalShow}
        className="btn btn-sm btn-danger"
        disabled={props.disable}
        style={props.outlined ? { color: "black" } : { color: "white" }}
      >
        Delete
      </button>

      {/* Submit Modal Implementation */}
      <div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          overflow={false}
          size={window.innerWidth < "991" ? "xs" : "sm"}
        >
          <Modal.Body className="modalBodyText">
            Are you sure to delete the comment?
          </Modal.Body>
          <Modal.Footer style={{ textAlign: "center" }}>
            <Button
              className="btn btn-sm btn-primary"
              type="submit"
              style={{ margin: "5px" }}
              onClick={deleteCommentSubmit}
            >
              OK
            </Button>
            <Button
              className="btn btn-sm btn-danger"
              onClick={() => setShowModal(false)}
              style={{ margin: "5px" }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteAppNotification;
