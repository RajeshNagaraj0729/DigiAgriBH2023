/**
 * React Imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { Button } from "react-bootstrap";

/**
 * Delete component with modal and button
 * @param {Object} props
 */
const Delete = (props) => {
	const [showModal, setShowModal] = useState(false);

	const handleModalClose = () => {
		setShowModal(!showModal);
	};

	const handleSubmit = () => {
		props.deleterow(props.id);
		setShowModal(!showModal);
	};

	return (
		<div>
			<button
				onClick={() => setShowModal(!showModal)}
				className="btn btn-sm btn-danger"
				disabled={props.disable}
				style={
					props.outlined
						? { color: "black", whiteSpace: "nowrap" }
						: { color: "white", whiteSpace: "nowrap" }
				}
			>
				Delete
			</button>
			<Modal
				show={showModal}
				onHide={handleModalClose}
				overflow={false}
				size={window.innerWidth < "991" ? "xs" : "sm"}
			>
				<Modal.Body className="modalBodyText">
					Are you sure to delete{" "}
					<span className="modalBodyTextDiseaseName">{props.name}</span>?
				</Modal.Body>
				<Modal.Footer style={{ textAlign: "center" }}>
					<Button
						className="btn btn-sm btn-primary"
						type="submit"
						style={{ margin: "5px" }}
						onClick={handleSubmit}
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
		</div>
	);
};

export default Delete;
