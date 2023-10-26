/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/*
Custom Component Imports
 */

import CustomSelect from "../../components/Select/Select";
import { updateCategory } from "../../redux/actions/KisanBazaar/category";
import { categoryImageUpload } from "../../redux/actions/KisanBazaar/categoryImageUpload";
import { validateImageUrl } from "../../services/CommonServices";
import TextInput from "../../components/Common/TextInput";

//Initial Object for update
const initialValue = {
  id: "",
  name: "",
  description: "",
  isActive: "",
  media: [
    {
      mediaUrl: "",
      mediaType: "image",
    },
  ],
};

/**
 * Edit News Implementation
 * @param {Object} props
 * props from News Page
 */
const EditCategoryIcon = (props) => {
  const store = useStore();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [id, setId] = useState(props.data?.id);
  const [name, setName] = useState(props.data?.name);
  const [description, setDescription] = useState(props.data?.description);
  const [imageUrl, setImageUrl] = useState(props.data?.media[0]?.mediaUrl);
  const [isActive, setIsActive] = useState("");

  //Edit News Icon submit
  const handleSubmit = async () => {
    if (typeof imageUrl === "object") {
      Alert.error("Please upload the selected image");
    } else if (!validateImageUrl(imageUrl)) {
      Alert.error("Upload valid image (.jpg, .jpeg, .png)");
    } else {
      initialValue.id = id;
      initialValue.name = name;
      initialValue.description = description;
      initialValue.isActive = isActive;
      initialValue.media[0].mediaUrl = imageUrl;

      await dispatch(updateCategory(initialValue))
        .then(() => {
          handleModalClose();
          Alert.success("Updated Successfully");
        })
        .catch((err) => {
          Alert.error(err.message);
        });
    }
    window.location.reload();
  };

  //Upload Media Image

  const uploadcategoryImages = async (file) => {
    setIsImageLoading(true);
    await dispatch(categoryImageUpload(file))
      .then(() => {
        setImageUrl(store.getState().categoryImages?.categoryImageUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  //Modal Show
  const handleModalShow = () => {
    setShowModal(true);
  };

  //Modal Close
  const handleModalClose = () => {
    setShowModal(false);
    setDisableUpload(true);
    setDisable(true);
  };

  //Check for empty values
  useEffect(() => {
    if (name && description) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, description]);

  return (
    <div>
      <button
        onClick={() => {
          handleModalShow();
          setId(props.data?.id);
          setName(props.data?.name);
          setDescription(props.data?.description);
          setImageUrl(props.data?.media[0]?.mediaUrl);
        }}
        className="btn btn-sm btn-warning"
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
              <Modal.Title className="mpdalTitle">Edit Category</Modal.Title>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Name:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    className="inputStyle"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-md-4 align-self-center">
                  <label className="bannerLableStyle">Is Active:</label>
                </div>
                <div className="col-12 col-md-8">
                  <CustomSelect
                    placeholder="Select Type"
                    data={[
                      {
                        label: "True",
                        value: true,
                      },
                      {
                        label: "False",
                        value: false,
                      },
                    ]}
                    onSelect={(option) => {
                      setIsActive(option.value);
                    }}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Description:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                    className="inputStyle"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Media Url:</label>
                </div>
                <div className="col-12 col-md-8">
                  {isImageLoading ? (
                    <Spinner color="success" size="sm" />
                  ) : (
                    <TextInput
                      /* labelName="Media Url:" */
                      id={"icon-imageurl"}
                      /* labelClass="bannerLableStyle" */
                      divClass="form-group"
                      type="text"
                      inputClass="inputStyle"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="col-4 align-self-center">&nbsp;</div>
                <div className="col-8 col-lg-4 d-flex mb-2">
                  <label
                    htmlFor={"category-file-upload"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                  >
                    <i className="fa fa-picture-o"></i> Select
                  </label>
                  <Button
                    id={"category-upload"}
                    className="custom-file-upload btn btn-sm btn-light mx-1"
                    disabled={disableUpload}
                    onClick={async () => {
                      setDisableUpload(true);
                      await uploadcategoryImages(imageUrl);
                    }}
                  >
                    <i className="fa fa-cloud-upload"></i> Upload
                  </Button>
                </div>
                <input
                  id={"category-file-upload"}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files[0].type.startsWith("image/")) {
                      Alert.error("Please upload a valid image");
                    } else {
                      setDisableUpload(false);
                      setImageUrl(e.target.files[0]);
                    }
                  }}
                  onClick={(e) => (e.target.value = "")}
                />
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
            onClick={() => {
              handleSubmit();
              setDisable(true);
            }}
            style={{ margin: "5px" }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditCategoryIcon;
