/**
 * React imports
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Button } from "react-bootstrap";
/**
 * Custom Imports
 */
import {
  createDeepLink,
  fetchDeepLinks,
} from "../../redux/actions/DeepLink/deepLink";
import { productDynamicLinkGenerationApi } from "../../services/Deeplinking";
import TextInput from "../../components/Common/TextInput";
import ProductDeepLinkTable from "../../services/TablesData/ProductDeepLinkTable";
import { PageLoader } from "../../components/Loading/Loading";

//Deeplinking Implementation

const ProductDeepLink = () => {
  const [loading, setLoading] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const [search, setSearch] = useState("");

  const productDeeplinks = useSelector(
    (state) => state.deepLinks?.productDeeplinks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      productUrl !== "" &&
      productName !== "" &&
      productImage !== "" &&
      productDescription !== ""
    ) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [productUrl, productDeeplinks, productImage, productDescription]);

  useEffect(() => {
    deepLinkList();
  }, []);

  const deepLinkList = async () => {
    setLoading(true);
    await dispatch(fetchDeepLinks("AgriStoreTab"))
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Alert.error(err.message);
      });
  };

  const submitHandle = async (e) => {
    try {
      const responseData = await productDynamicLinkGenerationApi(
        `${productUrl}?deepLinkParam=AgriStoreTab-${productUrl}`,
        productName,
        productDescription.substring(0, 200),
        productImage,
        "UNGUESSABLE"
      );

      const data = {
        linkId: null,
        linkType: "AgriStoreTab",
        linkName: productName,
        deepLinkUrl: responseData?.shortUrl,
        generatedBy: null,
        linkFormat: "UNGUESSABLE",
        generatedFrom: "web",
      };
      setSubmitDisable(true);
      await dispatch(createDeepLink(data))
        .then(() => {
          setSubmitDisable(false);
          Alert.success("Created Successfully");
          window.location.reload();
        })
        .catch((err) => {
          setSubmitDisable(false);
          Alert.error(err.message);
        });
    } catch (error) {
      setSubmitDisable(false);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2 className="mainHeading">Product Deep links</h2>
        </div>
      </div>
      <div className="tableMainSection cardShadow space-md-inr">
        <form>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Product name:"
                id="productName"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={productName}
                inputClass="inputStyle"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Product url:"
                id="productUrl"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={productUrl}
                inputClass="inputStyle"
                onChange={(e) => {
                  setProductUrl(e.target.value);
                }}
              />
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <TextInput
                labelName="Product image url:"
                id="productImage"
                labelClass="bannerLableStyle"
                divClass="form-group"
                type="text"
                value={productImage}
                inputClass="inputStyle"
                onChange={(e) => {
                  setProductImage(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <label htmlFor="productDescription" className="bannerLableStyle">
                Product description:
              </label>
              <textarea
                value={productDescription}
                cols="30"
                rows="3"
                name="productDescription"
                className="inputStyle"
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
            <div className="col-12">
              <Button
                className="btn btn-md btn-primary"
                disabled={submitDisable}
                onClick={() => {
                  submitHandle();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="tableMainSection cardShadow farmerRegistrationTable">
          <div className="col-12">
            {loading ? (
              <PageLoader />
            ) : (
              <>
                <div
                  className="d-flex justify-items-end m-2"
                  style={{
                    width: "200px",
                    position: "absolute",
                    right: 15,
                    zIndex: 2,
                  }}
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search product"
                    className="inputStyle"
                  />
                </div>
                <ProductDeepLinkTable
                  data={productDeeplinks || []}
                  searchValue={search}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeepLink;
