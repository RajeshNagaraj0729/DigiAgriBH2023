/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { Modal, Alert } from "rsuite";
import { Button } from "react-bootstrap";
import parse from "html-react-parser";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import * as constants from "../../constants";
import {
	createComment,
	deleteComment,
	fetchCommentsByPostId,
	fetchDiseaseTagsByPostId,
	fetchUserTagsByPostId,
	updateComment,
} from "../../redux/actions/KisanVedika/kisanVedika";
import NoDataFound from "../../components/NoData/NoDataFound";
import TagsInput from "../../components/TagsInput/TagsInput";
import CustomSelect from "../../components/Select/Select";
import { getLanguages } from "../../services/Languages";
import { getPostByPostId } from "../../url/baseUrl";
import { validateShowMobileNumberFunctionToUsers } from "../../Utils/utils";

/**
 * Regex constants
 */
const URL_REGEX =
	/(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
const AT_REGEX = /@\[.*?\]+\([a-zA-Z0-9]*\)/g;
const HASH_REGEX =
	/#\[[a-zA-Z0-9\s,.|/_]*(\([a-zA-Z0-9\s,.|/_]*\))?\]+\([a-zA-Z0-9]*\)/g;

//Comment obj to post
const commentData = {
	postId: null,
	userId: null,
	comment: "",
	upVotes: [],
	media: [],
	isAccepted: false,
	isDeleted: false,
	mentions: {
		users: [],
		diseases: [],
	},
	commentFormat: "",
};

//Update comment obj
const updateCommentData = {
	commentId: "",
	comment: "",
	mentions: {
		users: [],
		diseases: [],
	},
	commentFormat: "",
};

//Delete comment obj
const deleteCommentData = {
	commentId: "",
};

const KVPostById = (props) => {
	const userId = JSON.parse(localStorage.getItem("user"))?.userId;
	const [comment, setComment] = useState("");
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [commentId, setCommentId] = useState("");
	const [updatedComment, setUpdatedComment] = useState("");
	const [deleteCommentId, setDeleteCommentId] = useState("");
	const [isCommentSelected, setIsCommentSelected] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [submitDisable, setSubmitDisable] = useState(false);
	const [mentions, setMentions] = useState({
		users: [],
		diseases: [],
	});
	const [updatedMentions, setUpdatedMentions] = useState({
		users: [],
		diseases: [],
	});
	const [language, setLanguage] = useState({ label: "English", value: "en" });
	const [plainTextComment, setPlainTextComment] = useState("");
	const [updatedPlainTextComment, setUpdatedPlainTextComment] = useState("");
	const [postById, setPostById] = useState({});
	const [pageLoading, setPageLoading] = useState(true);
	const dispatch = useDispatch();
	const kisanVedika = useSelector((state) => state.kisanVedika);
	//const postById = kisanVedika.postsData.filter((r) => r.id === props.id)[0];

	const loggedInUsers = JSON.parse(window.localStorage.getItem("user"));
	const mobileNo = loggedInUsers?.phone;
	const displayMobileNum = !validateShowMobileNumberFunctionToUsers(mobileNo);

	useEffect(() => {
		if (comment) {
			setSubmitDisable(false);
		} else {
			setSubmitDisable(true);
		}
	}, [comment]);

	useEffect(() => {
		getPostInfo(props.id);
		getComments(props.id);
		getUserTagsForPost(props.id, language.value);
	}, []);

	useEffect(() => {
		getDiseaseTagsForPost(props.id, language.value);
	}, [language]);

	/**
	 * Get User Tags
	 * @param {string} postId
	 * @param {string} language
	 */
	const getUserTagsForPost = async (postId, language) => {
		await dispatch(fetchUserTagsByPostId(postId, language)).catch((err) => {
			Alert.error(err.message);
		});
	};

	/**
	 * Get Disease Tags
	 * @param {string} postId
	 * @param {string} language
	 */
	const getDiseaseTagsForPost = async (postId, language) => {
		await dispatch(fetchDiseaseTagsByPostId(postId, language)).catch((err) => {
			Alert.error(err.message);
		});
	};

	/**
	 * Get Post Info
	 * @param {string} postId
	 */
	const getPostInfo = async (postId) => {
		try {
			await fetch(`${getPostByPostId}?postId=${postId}`, {
				headers: {
					Authorization: `Bearer ${constants.userToken}`,
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((resp) => {
					setPostById(resp);
					setPageLoading(false);
				})
				.catch((error) => {
					console.error("error==", error);
					throw error;
				});
		} catch (error) {
			console.error("Error=", error);
			Alert.error(error.message);
		}
	};

	/**
	 * Get Comments for Post
	 * @param {string} postId
	 */
	const getComments = async (postId) => {
		setCommentsLoading(true);
		await dispatch(fetchCommentsByPostId(postId)).catch((err) =>
			Alert.error(err.message)
		);
		setCommentsLoading(false);
	};

	/**
	 * Submit comment
	 */
	const postComment = async () => {
		setSubmitDisable(true);
		if (!comment) {
			Alert.error("Please enter comment");
		} else if (!userId) {
			Alert.error("Login is invalid");
		} else {
			commentData.userId = userId;
			commentData.postId = props.id;
			commentData.commentFormat = comment;
			commentData.mentions = mentions;
			commentData.comment = plainTextComment;
			await dispatch(createComment(commentData))
				.then(() => {
					Alert.success("Comment posted successfully");
					window.location.reload();
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	/**
	 * Update Comment
	 */
	const updateCommentSubmit = async () => {
		const selectedComment = kisanVedika.postComments.filter(
			(r) => r.id === commentId
		)[0];
		if (!updatedComment) {
			Alert.error("Enter text to update");
		} else if (selectedComment.comment === updatedComment) {
			Alert.error("Modify the comment to update");
		} else {
			updateCommentData.commentId = commentId;
			updateCommentData.commentFormat = updatedComment;
			updateCommentData.mentions = updatedMentions;
			updateCommentData.comment = updatedPlainTextComment;
			await dispatch(updateComment(updateCommentData))
				.then(() => {
					setCommentId("");
					setUpdatedComment("");
					setUpdatedMentions({ users: [], diseases: [] });
					setUpdatedPlainTextComment("");
					setIsCommentSelected(false);
					Alert.success("Comment updated successfully");
					getComments(props.id);
				})
				.catch((err) => {
					Alert.error(err.message);
				});
		}
	};

	/**
	 * Delete Comment
	 */
	const deleteCommentSubmit = async () => {
		deleteCommentData.commentId = deleteCommentId;
		await dispatch(deleteComment(deleteCommentData))
			.then(() => {
				setShowModal(false);
				setDeleteCommentId("");
				Alert.success("Comment deleted successfully");
				getComments(props.id);
			})
			.catch((err) => Alert.error(err.message));
	};

	/**
	 * Close method for update comment
	 */
	const onUpdateCommentClose = () => {
		setCommentId("");
		setUpdatedComment("");
		setIsCommentSelected(false);
		setUpdatedMentions({
			users: [],
			diseases: [],
		});
	};

	const onEditCommentClick = (id, comment) => {
		setCommentId(id);
		setUpdatedComment(comment);
		setIsCommentSelected(true);
	};

	/**
	 * render comment string
	 * @param {string} comment
	 * @returns
	 */
	const renderText = (comment) => {
		let splitVal;
		while ((splitVal = HASH_REGEX.exec(comment)) !== null) {
			const hashtag = splitVal[0].split("](");
			comment = comment.replace(
				splitVal[0],
				`<span style="color: #2A6049">#${hashtag[0].slice(2)} </span>`
			);
		}
		while ((splitVal = AT_REGEX.exec(comment)) !== null) {
			const usertag = splitVal[0].split("](");
			comment = comment.replace(
				splitVal[0],
				`<span style="color: #ECAC00">@${usertag[0].slice(2)} </span>`
			);
		}
		comment = comment
			.split(/\s/)
			.map((part) => {
				if (URL_REGEX.test(part)) {
					return `<a href=${part} target="_blank" style="color: #0072CF; overflow-wrap: break-word;">${part} </a>`;
				} else return part + " ";
			})
			.join("");
		return comment;
	};

	//   const renderComment = (txt) => {
	//      let comment = txt.split(" ").map((part) => {
	//         if (AT_REGEX.test(part)) {
	//            const user = part.split("](");
	//            return (
	//               <span
	//                  onClick={() => console.log(user[1].slice(0, -1))}
	//                  style={{ color: "#22904f" }}
	//               >
	//                  @{user[0].slice(2)}{" "}
	//               </span>
	//            );
	//         } else if (HASH_REGEX.test(part)) {
	//            const hashtag = part.split("](");
	//            return (
	//               <span
	//                  onClick={() => console.log(hashtag[1].slice(0, -1))}
	//                  style={{ color: "#f4c444" }}
	//               >
	//                  #{hashtag[0].slice(2)}{" "}
	//               </span>
	//            );
	//         } else if (URL_REGEX.test(part)) {
	//            return (
	//               <a href={part} target="_blank">
	//                  {part}{" "}
	//               </a>
	//            );
	//         } else return <span>{part + " "}</span>;
	//      });
	//      return [].concat(...comment);
	// };
	if (pageLoading) {
		return (
			<div className="d-flex justify-content-center">
				<Spinner
					style={{
						width: "1.5rem",
						height: "1.5rem",
						fontSize: "1rem",
						color: "green",
					}}
					size="sm"
				/>
			</div>
		);
	}

	if (Object.keys(postById).length != 0) {
		return (
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
				<div className="row">
					<div className="col-6">
						<div className="userNameSec">
							<div>
								<img
									src={
										constants.mediaUrl +
										postById.users[0]?.profilePic +
										constants.sasToken
									}
									height="50px"
									width="50px"
									style={{ borderRadius: "50%" }}
									alt={postById.users[0]?.profilePic}
								/>
							</div>
							<div>
								<h2 className="userNameStyle">
									{postById.users[0]?.firstName +
										" " +
										postById.users[0]?.lastName}
								</h2>
								<p className="userMobileStyle" hidden={displayMobileNum}>
									{postById.users[0]?.phone}
								</p>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div style={{ width: "200px", margin: 10, float: "right" }}>
							<CustomSelect
								data={getLanguages()}
								placeholder="Select Language"
								search={false}
								onSelect={(value) => setLanguage(value)}
								value={language}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-12 col-lg-5">
						{postById.media.length === 0 ? (
							"No Images Found"
						) : (
							<Carousel
								style={{
									backgroundColor: "black",
									marginBottom: "10px",
								}}
							>
								{postById.media.map((r, i) => {
									return (
										<Carousel.Item>
											<h3
												className="d-flex align-items-center justify-content-center"
												style={{ color: "red" }}
											>
												{r.mediaType === "video" && "Video File!"}
												{r.mediaType === "youtube" && "Youtube Video!"}
											</h3>
											<div className="d-flex align-items-center justify-content-center">
												{r.mediaType === "video" ? (
													<video width="70%" height="500" controls>
														<source
															src={
																r.mediaUrl.startsWith("https://")
																	? r.mediaUrl
																	: constants.mediaUrl +
																	  r.mediaUrl +
																	  constants.sasToken
															}
															type="video/mp4"
														/>
													</video>
												) : r.mediaType === "youtube" ? (
													<iframe
														width="70%"
														height="500"
														allowFullScreen
														src={`https://www.youtube.com/embed/${r.mediaUrl}?controls=1`}
													></iframe>
												) : (
													<img
														className="d-block w-100"
														src={
															r.mediaUrl.startsWith("https://")
																? r.mediaUrl
																: constants.mediaUrl +
																  r.mediaUrl +
																  constants.sasToken
														}
														alt="Not Uploaded"
														style={{ height: "500px" }}
													/>
												)}
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>
						)}

						<div
							className="tableMainSection cardShadow topUsersMainSec"
							style={{ maxHeight: "400px", overflowY: "auto" }}
						>
							<h5>Comments</h5>
							{commentsLoading ? (
								<div className="d-flex justify-content-center">
									<Spinner
										style={{
											width: "1.5rem",
											height: "1.5rem",
											fontSize: "1rem",
											color: "green",
										}}
										size="sm"
									/>
								</div>
							) : kisanVedika.postComments &&
							  kisanVedika.postComments.length !== 0 ? (
								kisanVedika.postComments.map((r) => {
									return (
										<div
											className="row m-2 p-1"
											style={{ backgroundColor: "#eee" }}
										>
											<div className="col-9">
												<div className="userNameSec col-12">
													<div>
														<img
															src={
																constants.mediaUrl +
																r.users[0]?.profilePic +
																constants.sasToken
															}
															height="30px"
															width="30px"
															style={{ borderRadius: "50%" }}
															alt={r.users[0]?.profilePic}
														/>
													</div>
													<div>
														<h6>
															{r.users[0]?.firstName +
																" " +
																r.users[0]?.lastName}
														</h6>

														<p
															className="userMobileStyle"
															hidden={displayMobileNum}
														>
															{r.users[0]?.phone}
														</p>
													</div>
												</div>
											</div>
											<div className="col-3">
												{userId === r.users[0]?.id && (
													<div className="d-flex" style={{ float: "right" }}>
														<button
															onClick={() =>
																onEditCommentClick(r.id, r.commentFormat)
															}
														>
															<i
																className="fa fa-pencil"
																style={{ color: "green" }}
															></i>
														</button>
														<button
															onClick={() => {
																setDeleteCommentId(r.id);
																setShowModal(true);
															}}
														>
															<i
																className="fa fa-trash"
																style={{ color: "#bb2124" }}
															></i>
														</button>
													</div>
												)}
											</div>
											<div className="col-12">
												{isCommentSelected && r.id === commentId ? (
													<div className="row">
														<div className="col-12">
															<TagsInput
																comment={updatedComment}
																setComment={setUpdatedComment}
																tagValues={{
																	users: kisanVedika.userTags || [],
																	diseases: kisanVedika.diseaseTags || [],
																}}
																setMentions={setUpdatedMentions}
																setPlainText={setUpdatedPlainTextComment}
															/>
															{/* <textarea
                                                className="inputStyle"
                                                value={updatedComment}
                                                onChange={(e) =>
                                                   setUpdatedComment(
                                                      e.target.value
                                                   )
                                                }
                                             /> */}
														</div>
														<div className="col-12 mb-2">
															<div
																className="d-flex align-items-center"
																style={{ float: "right" }}
															>
																<button
																	className="btn btn-sm btn-danger mr-1"
																	onClick={onUpdateCommentClose}
																>
																	Close
																</button>
																<button
																	className="btn btn-sm btn-success"
																	onClick={updateCommentSubmit}
																>
																	Update
																</button>
															</div>
														</div>
													</div>
												) : (
													parse(renderText(r.commentFormat))
												)}
											</div>
										</div>
									);
								})
							) : (
								<h6 className="d-flex justify-content-center">No Comments</h6>
							)}
						</div>
					</div>
					<div className="col-12 col-md-12 col-lg-7">
						<div className="tableMainSection cardShadow topUsersMainSec">
							<div className="mb-1 mb-md-3">
								<div className="modalBodyTextLeft">Post Title :</div>
								<div>
									<input
										type="text"
										className="inputStyle"
										value={postById.title}
										readOnly
										disabled
									/>
								</div>
							</div>
							<div className="mb-1 mb-md-3">
								<div className="modalBodyTextLeft">Post Description :</div>
								<div>
									<input
										type="text"
										className="inputStyle"
										value={postById.description}
										readOnly
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="tableMainSection cardShadow topUsersMainSec">
							<div className={"form-group"}>
								<label htmlFor={"post-comment"} className="bannerLableStyle">
									Comment:
								</label>
								<TagsInput
									comment={comment}
									setComment={setComment}
									tagValues={{
										users: kisanVedika.userTags || [],
										diseases: kisanVedika.diseaseTags || [],
									}}
									setMentions={setMentions}
									setPlainText={setPlainTextComment}
								/>
								{/* <textarea
                           value={comment}
                           cols="30"
                           rows="4"
                           name="post-comment"
                           className="inputStyle"
                           onChange={(e) => setComment(e.target.value)}
                        /> */}
							</div>
							<button
								className="btn btn-sm btn-primary"
								onClick={postComment}
								disabled={submitDisable}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <NoDataFound msg="Post Not Found" />;
	}
};

export default KVPostById;
