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
import { updateProductAds } from "../../redux/actions/ProductAds/ads";
import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

//Collection Object
let homeProduct = {
  id: "",
  title: "",
  url: "",
  name: "",
  displayOrder: 0,
  imageUrl: null,
  isDeleted: false,
  showIn: "kisan-vedika",
  properties: {
    units: "",
    price: "",
    afterDiscount: "",
  },
  translations: {
    te: {
      title: "",
      name: "",
    },
    hi: {
      title: "",
      name: "",
    },
  },
};

/**
 *
 * @param {props} props
 */
const EditKVProducts = (props) => {
  const dispatch = useDispatch();
  const store = useStore();

  const productAdsData = useSelector((state) => state.ads)?.getProductAds;
  const productAds = productAdsData.filter((r) => r.id === props.id)[0];

  const [showModal, setShowModal] = useState(false);
  const [disable, setDisable] = useState(true);
  const [disableUpload, setDisableUpload] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [title, setTitle] = useState(productAds.title);
  const [name, setName] = useState(productAds.name);
  const [url, setUrl] = useState(productAds.url);
  const [units, setUnits] = useState(productAds.properties.units);
  const [price, setPrice] = useState(productAds.properties.price);
  const [afterDiscount, setAfterDiscount] = useState(
    productAds.properties.afterDiscount
  );
  const [imageUrl, setImageUrl] = useState(productAds.imageUrl);
  const [tTitle, setTTitle] = useState({
    te: productAds.translations.te.title,
    hi: productAds.translations.hi.title,
  });
  const [tName, setTName] = useState({
    te: productAds.translations.te.name,
    hi: productAds.translations.hi.name,
  });

  //Update collection submit
  const handleSubmit = async () => {
    homeProduct.title = title;
    homeProduct.name = name;
    homeProduct.url = url;
    homeProduct.imageUrl = imageUrl;
    homeProduct.properties.units = units;
    homeProduct.properties.price = price;
    homeProduct.properties.afterDiscount = afterDiscount;
    homeProduct.id = props.id;
    homeProduct.translations.te.title = tTitle.te;
    homeProduct.translations.hi.title = tTitle.hi;
    homeProduct.translations.te.name = tName.te;
    homeProduct.translations.hi.name = tName.hi;

    await dispatch(updateProductAds(homeProduct))
      .then(() => {
        handleModalClose();
        props.refreshList();
      })
      .catch((err) => Alert.error(err.message));
  };

  const uploadImage = async (file, cantainerName) => {
    setIsImageLoading(true);
    await dispatch(productAdsImageUpload(file, cantainerName))
      .then(() => {
        setImageUrl(store.getState().adsImages?.productAdsImageUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
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
              <Modal.Title className="mpdalTitle">
                Edit Kv Product Ads
              </Modal.Title>
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
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Redirect Link:</label>
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
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle"> Product Media:</label>
                </div>
                <div className="col-7 d-flex">
                  {isImageLoading ? (
                    <div className="col-8">
                      <Spinner color="success" size="sm" />
                    </div>
                  ) : (
                    <input
                      type="text"
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                      }}
                      value={imageUrl}
                      className="inputStyle"
                    />
                  )}
                  <div className="d-flex">
                    <label
                      htmlFor={"kvProductsAds" + props.id}
                      className="custom-file-upload btn btn-sm btn-light m-auto"
                    >
                      <i className="fa fa-picture-o"></i> Select
                    </label>
                    <Button
                      className="custom-file-upload btn btn-sm btn-light m-auto"
                      disabled={disableUpload}
                      onClick={async () => {
                        setDisableUpload(true);
                        setDisable(false);
                        await uploadImage(imageUrl, "products");
                      }}
                    >
                      <i className="fa fa-cloud-upload"></i> Upload
                    </Button>
                  </div>
                  <input
                    id={"kvProductsAds" + props.id}
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
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Quantity:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setUnits(e.target.value);
                      setDisable(false);
                    }}
                    value={units}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">Actual Price:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setDisable(false);
                    }}
                    value={price}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-1"></div>
                <div className="col-4 align-self-center">
                  <label className="bannerLableStyle">After Discount:</label>
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    onChange={(e) => {
                      setAfterDiscount(e.target.value);
                      setDisable(false);
                    }}
                    value={afterDiscount}
                    className="inputStyle"
                  />
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <h5 className="subHeading">Telugu Translations</h5>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-4">
                      <label className="bannerLableStyle align-self-center">
                        Title:
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setTTitle({ ...tTitle, te: e.target.value });
                          setDisable(false);
                        }}
                        value={tTitle.te}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4">
                      <label className="bannerLableStyle align-self-center">
                        Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setTName({ ...tName, te: e.target.value });
                          setDisable(false);
                        }}
                        value={tName.te}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h5 className="subHeading">Hindi Translations</h5>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-4">
                      <label className="bannerLableStyle align-self-center">
                        Title:
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setTTitle({ ...tTitle, hi: e.target.value });
                        }}
                        value={tTitle.hi}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-4">
                      <label className="bannerLableStyle align-self-center">
                        Name:
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="inputStyle"
                        onChange={(e) => {
                          setTName({ ...tName, hi: e.target.value });
                        }}
                        value={tName.hi}
                      />
                    </div>
                  </div>
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
    </div>
  );
};

export default EditKVProducts;
