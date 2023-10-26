import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Modal } from "rsuite";
import { Button } from "reactstrap";

import {
	fetchUserInfo,
	getUserRoles,
	updateUser,
} from "../../redux/actions/Userdata/userdata";
import { usersFromLocalStorage } from "../../Utils/utils";

const Userdata = () => {
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});
	const User = useSelector((state) => state.User);
	const userRoles = useSelector((state) => state.User.userRoles);
	const { handleSubmit, register, setValue } = useForm();
	const dispatch = useDispatch();

	const getUser = async () => {
		await dispatch(fetchUserInfo());
	};

	useEffect(() => {
		dispatch(getUserRoles());
		getUser();
	}, []);

	useEffect(() => {
		if (selectedUser) {
			setValue("userName", selectedUser.userName);
			setValue("password", selectedUser.password);
			setValue("phone", selectedUser.phone);
			setValue("roleId", selectedUser.roleId);
			setValue("accessGrantedFor", selectedUser.accessGrantedFor);
			setValue("isActive", selectedUser.isActive);
		}
	}, [selectedUser]);

	const handleEditUserClick = (row) => {
		setSelectedUser(row);
		setShowModal(true);
	};
	const handleModalClose = () => {
		setShowModal(false);
	};

	const onSubmit = (data) => {
		data = {
			...data,
			id: selectedUser?.id,
			updatedBy: usersFromLocalStorage?.id,
		};
		dispatch(updateUser(data))
			.then(() => {
				Alert.success("User Data updated successfully");
			})
			.then(() => {
				getUser();
				handleModalClose();
			});
	};

	return (
		<div>
			<div className="col-12 d-flex flex-row-reverse">
				<Link to="create-user">
					<button className="btn btn-sm btn-primary">Add New User</button>
				</Link>
			</div>
			<br />

			<Table striped bordered hover>
				<thead>
					<tr>
						<th className="bg-success">User Name</th>
						<th className="bg-success">Phone</th>
						<th className="bg-success">Available Access</th>
						<th className="bg-success">Actions</th>
					</tr>
				</thead>
				<tbody>
					{User.data?.map((row, index) => (
						<tr key={index} style={{ height: "50px" }}>
							<td>{row?.userName}</td>
							<td>{row?.phone}</td>
							<td>{row?.accessGrantedFor}</td>
							<td style={{ width: "100px" }}>
								<div className="btnStyle">
									<Button
										onClick={() => handleEditUserClick(row)}
										size="sm"
										color="success"
										style={{ borderRadius: 16 }}
									>
										Edit
										<i
											className="fa fa-pencil"
											style={{ color: "white", paddingLeft: 12 }}
										></i>
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				overflow={false}
				size={window.innerWidth < "991" ? "xs" : "sm"}
			>
				<Modal.Header closeButton>
					<div className="row">
						<div className="col-9">
							<Modal.Title className="mpdalTitle">Edit User</Modal.Title>
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row">
							<div className="col-12">
								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLableStyle">User Name:</label>
									</div>
									<div className="col-6">
										<input
											type="text"
											{...register("userName")}
											className="inputStyle"
											disabled="disabled"
										/>
									</div>
									<div className="col-1"></div>
								</div>

								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLableStyle">Password:</label>
									</div>
									<div className="col-6">
										<input
											type="password"
											{...register("password")}
											className="inputStyle"
											disabled="disabled"
										/>
									</div>
									<div className="col-1"></div>
								</div>

								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLableStyle">Phone:</label>
									</div>
									<div className="col-6">
										<input
											type="text"
											{...register("phone")}
											className="inputStyle"
											disabled="disabled"
										/>
										{/* <label className="bannerLableStyle">phone</label> */}
									</div>
									<div className="col-1"></div>
								</div>

								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLableStyle">Role Name: </label>
									</div>
									<div className="col-6">
										<select
											{...register("roleId")}
											className="inputStyle"
											disabled="disabled"
										>
											{userRoles?.map((role) => {
												return (
													<option key={role?.roleName} value={role?.id}>
														{role?.roleName}
													</option>
												);
											})}
										</select>
									</div>
									<div className="col-1"></div>
								</div>

								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLabelStyle">
											Access Granted For:
										</label>
									</div>
									<div className="col-6">
										<input
											type="checkbox"
											value="kv"
											{...register("accessGrantedFor")}
											className="accessCheckboxStyle"
										/>
										<label className="checkboxLabelStyle">KV</label>
										<input
											style={{ marginLeft: "10px" }}
											type="checkbox"
											value="cd"
											{...register("accessGrantedFor")}
											className="accessCheckboxStyle"
										/>
										<label className="checkboxLabelStyle">CD</label>
									</div>
								</div>

								<div className="row mb-3">
									<div className="col-1"></div>
									<div className="col-4 align-self-center">
										<label className="bannerLabelStyle">isActive:</label>
									</div>
									<div className="col-6">
										<input
											type="checkbox"
											{...register("isActive")}
											className="accessCheckboxStyle"
										/>
										<label className="checkboxLabelStyle">Active</label>
									</div>
								</div>
							</div>
						</div>
						<Modal.Footer>
							<button
								className="btn btn-sm btn-danger"
								onClick={() => setShowModal(false)}
								style={{ margin: "5px" }}
							>
								Close
							</button>
							<button
								className="btn btn-sm btn-primary"
								style={{ margin: "5px" }}
								type="submit"
							>
								Update
							</button>
						</Modal.Footer>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Userdata;
