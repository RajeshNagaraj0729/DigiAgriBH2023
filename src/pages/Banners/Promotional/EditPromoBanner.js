/**
 * React imports
 */
import React, { useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import { updatePromoBanner } from "../../../redux/actions/Banners/Promotional/promotionalBanners";
import CustomSelect from "../../../components/Select/Select";
import * as constants from "../../../constants";
import { fileUpload } from "../../../redux/actions/Banners/fileUpload";

//Promo Banner Object
const initialValue = {
  id: "",
  type: "",
  imageUrl: "",
  isActive: true,
  smsContent: "",
  extraInfo: {
    content: {
      heading: "",
      paragraph: "",
      footer: "",
    },
    couponCode: "",
    disClaimer: "",
    media: "",
    steps: [],
  },
};

/**
 *
 * @param {props} props
 */
const EditPromoBanner = (props) => {
  const dispatch = useDispatch();
  const store = useStore();
  const promoBanners = useSelector((state) => state.promoBanners);
  const selectedBanner = promoBanners.data.filter((r) => r.id === props.id)[0];

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [type, setType] = useState(selectedBanner.type);
  const [smsContent, setSmsContent] = useState(selectedBanner.msgContent);
  const [content, setContent] = useState(selectedBanner.extraInfo.content);
  const [couponCode, setCouponCode] = useState(
    selectedBanner.extraInfo.couponCode
  );
  const [status, setStatus] = useState({
    label: selectedBanner.isActive ? "Active" : "InActive",
    value: selectedBanner.isActive,
  });
  const [disclaimer, setDisclaimer] = useState(
    selectedBanner.extraInfo.disClaimer
  );
  const [steps, setSteps] = useState(selectedBanner.extraInfo.steps);
  const [media, setMedia] = useState(selectedBanner.extraInfo.media);
  const [image, setImage] = useState(selectedBanner.imageUrl);
  const [showEditStepsModal, setShowEditStepsModal] = useState(false);
  const [isStepImageLoading, setIsStepImageLoading] = useState({
    loading: false,
    id: 0,
  });

  //Update Promo Banner Submit function
  const handleSubmit = async () => {
    initialValue.id = props.id;
    initialValue.type = type;
    initialValue.imageUrl = image;
    initialValue.isActive = status.value;
    initialValue.smsContent = smsContent;
    initialValue.extraInfo = {
      content: content,
      couponCode: couponCode,
      media: media,
      steps: steps,
      disClaimer: disclaimer,
    };

    await dispatch(updatePromoBanner(initialValue, props.language)).then(() => {
      handleModalClose();
      window.location.reload();
    });
  };

  //Upload step Image
  const uploadStepImage = async (file, id) => {
    setIsStepImageLoading({ loading: true, id: id });
    await dispatch(fileUpload(file)).then(() => {
      setIsStepImageLoading({ loading: false, id: 0 });
    });
  };

  //Upload Media Image
  const uploadMediaImage = async (file) => {
    await dispatch(fileUpload(file));
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
              <Modal.Title className="mpdalTitle">Edit Banner</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">ImageUrl:</label>
                </div>
                <div className="col-6 d-flex">
                  <div>
                    <input
                      type="text"
                      onChange={(e) => {
                        setImage(e.target.value);
                        setDisable(false);
                      }}
                      value={image}
                      className="inputStyle"
                    />
                  </div>
                  <div className="d-flex">
                    <label
                      for="image-upload"
                      className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                    >
                      <i className="fa fa-picture-o"></i>
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                      onClick={async () =>
                        await uploadMediaImage(image).then(() => {
                          setImage(store.getState().fileUpload.data);
                          setDisable(false);
                        })
                      }
                    >
                      <i className="fa fa-cloud-upload"></i>
                    </Button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Media:</label>
                </div>
                <div className="col-6 d-flex">
                  <div>
                    <input
                      type="text"
                      onChange={(e) => {
                        setMedia(e.target.value);
                        setDisable(false);
                      }}
                      value={media.name ? media.name : media}
                      className="inputStyle"
                    />
                  </div>
                  <div className="d-flex">
                    <label
                      for="media-upload"
                      className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                    >
                      <i className="fa fa-picture-o"></i>
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                      onClick={async () =>
                        await uploadMediaImage(media).then(() => {
                          setMedia(store.getState().fileUpload.data);
                          setDisable(false);
                        })
                      }
                    >
                      <i className="fa fa-cloud-upload"></i>
                    </Button>
                  </div>
                  <input
                    id="media-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Type:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setType(e.target.value);
                      setDisable(false);
                    }}
                    value={type}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Msg Content:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setSmsContent(e.target.value);
                      setDisable(false);
                    }}
                    value={smsContent}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Coupon Code:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setDisable(false);
                    }}
                    value={couponCode}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Content Heading:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setContent({
                        ...content,
                        heading: e.target.value,
                      });
                      setDisable(false);
                    }}
                    value={content.heading}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Content Paragraph:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setContent({
                        ...content,
                        paragraph: e.target.value,
                      });
                      setDisable(false);
                    }}
                    value={content.paragraph}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Content Footer:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setContent({
                        ...content,
                        footer: e.target.value,
                      });
                      setDisable(false);
                    }}
                    value={content.footer}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row  mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Disclaimer:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setDisclaimer(e.target.value);
                      setDisable(false);
                    }}
                    value={disclaimer}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Status:</label>
                </div>
                <div className="col-6">
                  <CustomSelect
                    data={[
                      { label: "Active", value: true },
                      { label: "InActive", value: false },
                    ]}
                    search={false}
                    value={status}
                    onSelect={(value) => {
                      setStatus(value);
                      setDisable(false);
                    }}
                    name="select-type"
                    placeholder="Select Status"
                  />
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <Button
                    className="btn btn-sm btn-success"
                    onClick={() => {
                      setShowEditStepsModal(true);
                      handleModalClose();
                    }}
                  >
                    Edit Steps
                  </Button>
                </div>
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

      {/* Edit Steps Modal */}
      <Modal
        show={showEditStepsModal}
        onHide={() => {
          setShowEditStepsModal(false);
          setShowModal(true);
        }}
        overflow={false}
        size={window.innerWidth < "991" ? "xs" : "sm"}
      >
        <Modal.Header closeButton>
          <div className="row">
            <div className="col-9">
              <Modal.Title className="mpdalTitle">Edit Steps</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              {steps.map((step, index) => {
                return (
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-2 d-flex align-items-center">
                      <label className="bannerLableStyle">
                        Step {index + 1}:
                      </label>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                      {isStepImageLoading.loading &&
                      isStepImageLoading.id === index ? (
                        <Spinner color="success" size="sm" />
                      ) : (
                        <img
                          src={
                            constants.mediaUrl + step.image + constants.sasToken
                          }
                          height="50px"
                          width="50px"
                          alt={step.image.name || "Not Found"}
                        />
                      )}
                      <div className="d-flex">
                        <label
                          for={props.id + "editStep-upload" + index.toString()}
                          className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                        >
                          <i className="fa fa-picture-o"></i>
                        </label>
                        <Button
                          className="custom-file-upload btn btn-sm btn-light d-flex align-self-end m-2"
                          onClick={async () => {
                            try {
                              await uploadStepImage(step.image, index).then(
                                () => {
                                  let newSteps = [...steps];
                                  newSteps[index].image =
                                    store.getState().fileUpload.data;
                                  setSteps(newSteps);
                                  setDisable(false);
                                }
                              );
                            } catch (err) {
                              console.error(err.message);
                            }
                          }}
                        >
                          <i className="fa fa-cloud-upload"></i>
                        </Button>
                      </div>
                      <input
                        id={props.id + "editStep-upload" + index.toString()}
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          let newSteps = [...steps];
                          newSteps[index].image = e.target.files[0];
                          setSteps(newSteps);
                          setDisable(false);
                        }}
                      />
                    </div>
                    <div className="col-5 d-flex align-items-center">
                      <input
                        type="text"
                        onChange={(e) => {
                          let newSteps = [...steps];
                          newSteps[index].content = e.target.value;
                          setSteps(newSteps);
                          setDisable(false);
                        }}
                        value={step.content}
                        className="inputStyle"
                      />
                    </div>
                    <div className="col-1"></div>
                  </div>
                );
              })}
            </div>
            <div className=" col-12 d-flex mt-3 align-items-center justify-content-center">
              <Button
                className="btn btn-sm btn-primary m-2"
                onClick={() => {
                  setSteps(steps.concat({ content: "", image: "" }));
                  setDisable(false);
                }}
              >
                Add Step
              </Button>
              <Button
                className="btn btn-sm btn-danger m-2"
                onClick={() => {
                  setSteps(steps.slice(0, -1));
                  setDisable(false);
                }}
                disabled={steps.length === 0}
              >
                Remove Step
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setShowEditStepsModal(false);
              setShowModal(true);
            }}
            style={{ margin: "5px" }}
          >
            Close
          </Button>
          <Button
            className={
              disable ? "btn btn-sm btn-light" : "btn btn-sm btn-primary"
            }
            disabled={disable}
            onClick={() => {
              setShowModal(true);
            }}
            style={{ margin: "5px" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditPromoBanner;
