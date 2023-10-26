// import React from "react";

/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */

import TextInput from "../../components/Common/TextInput";
import DeleteBanner from "../../components/Common/DeleteRow";
import { PageLoader } from "../../components/Loading/Loading";
import ErrorComponent from "../../components/Error/Error";
import EditKVProducts from "./EditKVProducts";

import * as constants from "../../constants";

import {
  fetchProductAds,
  createProductAds,
  deleteProductAds,
} from "../../redux/actions/ProductAds/ads";

import { productAdsImageUpload } from "../../redux/actions/ProductAds/productsAdsImageUpload";

//initial object for crop
let kvProduct = {
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
    ta: {
      title: "",
      name: "",
    },
    kn: {
      title: "",
      name: "",
    },
  },
};

const KvProducts = () => {
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const store = useStore();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [kvProductsLoading, setKvProductsLoading] = useState(true);

  const [units, setUnits] = useState("");
  const [price, setPrice] = useState("");
  const [afterDiscount, setAfterDiscount] = useState("");

  const [submitDisable, setSubmitDisable] = useState(true);
  const [tTitle, setTTitle] = useState({ te: "", hi: "", ta: "", kn: "" });
  const [tName, setTName] = useState({ te: "", hi: "", ta: "", kn: "" });

  const [disableUpload, setDisableUpload] = useState(true);

  const productAds = useSelector((state) => state.ads)?.getProductAds;

  // const productAdsimages = useSelector((state) => state.adsImages)
  //   ?.productAdsImageUrl;

  useEffect(() => {
    productAdsList();
  }, []);

  useEffect(() => {
    if (title && url && afterDiscount) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [title, url, afterDiscount]);

  const productAdsList = async () => {
    setKvProductsLoading(true);
    await dispatch(fetchProductAds("kisan-vedika"))
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
    setKvProductsLoading(false);
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

  const delProductAds = async (id) => {
    await dispatch(deleteProductAds(id))
      .then(() => {
        productAdsList();
      })
      .catch((err) => Alert.error(err.message));
  };

  const submitCategory = async () => {
    kvProduct.title = title;
    kvProduct.name = name;
    kvProduct.url = url;
    kvProduct.imageUrl = imageUrl;
    kvProduct.properties.units = units;
    kvProduct.properties.price = price;
    kvProduct.properties.afterDiscount = afterDiscount;
    kvProduct.translations.te.title = tTitle.te;
    kvProduct.translations.hi.title = tTitle.hi;
    kvProduct.translations.ta.title = tTitle.ta;
    kvProduct.translations.kn.title = tTitle.kn;
    kvProduct.translations.te.name = tName.te;
    kvProduct.translations.hi.name = tName.hi;
    kvProduct.translations.ta.name = tName.ta;
    kvProduct.translations.kn.name = tName.kn;

    await dispatch(createProductAds(kvProduct))
      .then(() => {
        Alert.success("KvProduct Created Successfully");
      })
      .catch((err) => {
        Alert.error(err.message);
      });
    window.location.reload();
  };
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Add KV Product</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row mb-2">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="col-7">
                <div className="form-group">
                  <label className="bannerLableStyle align-self-center">
                    Product Media:
                  </label>
                  {isImageLoading ? (
                    <Spinner color="success" size="sm" />
                  ) : (
                    <TextInput
                      //labelName="Media Url:"
                      id={"icon-productimageurl"}
                      //labelClass="bannerLableStyle"
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
              </div>
              <div className="col-5 d-flex m-auto">
                <label
                  htmlFor={"icon-file-upload"}
                  className="custom-file-upload btn btn-sm btn-light mx-1"
                >
                  <i className="fa fa-picture-o"></i> Select
                </label>
                <Button
                  className="custom-file-upload btn btn-sm btn-light mx-1"
                  disabled={disableUpload}
                  onClick={async () => {
                    setDisableUpload(true);
                    await uploadImage(imageUrl, "products");
                  }}
                >
                  <i className="fa fa-cloud-upload"></i> Upload
                </Button>
              </div>
              <input
                id={"icon-file-upload"}
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
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                After Discount:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setAfterDiscount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Name:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Quantity:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Redirect Link:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Actual Price:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <h5 className="subHeading">Telugu Translations</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTTitle({ ...tTitle, te: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Name:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTName({ ...tName, te: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h5 className="subHeading">Hindi Translations</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTTitle({ ...tTitle, hi: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Name:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTName({ ...tName, hi: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <h5 className="subHeading">Tamil Translations</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTTitle({ ...tTitle, ta: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Name:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTName({ ...tName, ta: e.target.value });
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <h5 className="subHeading">Kannada Translations</h5>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Title:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTTitle({ ...tTitle, kn: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <div className="form-group">
              <label className="bannerLableStyle align-self-center">
                Name:
              </label>
              <input
                type="text"
                className="inputStyle"
                onChange={(e) => {
                  setTName({ ...tName, kn: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Button
              className="btn btn-md"
              disabled={submitDisable}
              onClick={() => {
                submitCategory();
                setSubmitDisable(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
        {kvProductsLoading ? (
          <PageLoader />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Actual Price</th>
                <th>After Discount</th>
                <th>Url</th>
                <th>Telugu Title</th>
                <th>Hindi Title</th>
                <th>Tamil Title</th>
                <th>Kannada Title</th>
                <th>Telugu Name</th>
                <th>Hindi Name</th>
                <th>Tamil Name</th>
                <th>Kannada Name</th>
                <th style={{ width: "100px" }}></th>
                <th style={{ width: "100px" }}></th>
              </tr>
            </thead>
            <tbody>
              {productAds.map((row, index) => {
                return (
                  <tr key={index} style={{ height: "50px" }}>
                    <td>{row.title}</td>
                    <td>{row.name}</td>
                    <td>
                      <a
                        target="_blank"
                        href={
                          row.length !== 0 &&
                          row.imageUrl?.startsWith("products")
                            ? constants.mediaUrl + row.imageUrl
                            : row.imageUrl
                        }
                        rel="noreferrer"
                      >
                        <img
                          src={
                            row.length !== 0 &&
                            row.imageUrl?.startsWith("products")
                              ? constants.mediaUrl + row.imageUrl
                              : row.imageUrl
                          }
                          alt="Not Uploaded"
                          className="cropDoctorResults"
                        />
                      </a>
                    </td>
                    <td>{row.properties.units}</td>
                    <td>{row.properties.price}</td>
                    <td>{row.properties.afterDiscount}</td>
                    <td>
                      <a href={row.url} target="_blank" rel="noreferrer">
                        {row.url}
                      </a>
                    </td>
                    <td>{row.translations.te.title}</td>
                    <td>{row.translations.hi.title}</td>
                    <td>{row.translations.ta.title}</td>
                    <td>{row.translations.kn.title}</td>
                    <td>{row.translations.te.name}</td>
                    <td>{row.translations.hi.name}</td>
                    <td>{row.translations.ta.name}</td>
                    <td>{row.translations.kn.name}</td>
                    <td style={{ width: "100px" }}>
                      <EditKVProducts
                        id={row.id}
                        refreshList={productAdsList}
                      />
                    </td>
                    <td style={{ width: "100px" }}>
                      <DeleteBanner
                        id={row.id}
                        name={row.name}
                        deleterow={delProductAds}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default KvProducts;
