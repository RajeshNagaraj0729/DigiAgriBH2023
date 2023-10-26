/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useStore, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Spinner } from "reactstrap";

/**
 * Custom Imports
 */
import CustomSelect from "../../components/Select/Select";
import SubCategoryTable from "../../services/TablesData/SubCategoryTable";
import TextInput from "../../components/Common/TextInput";

import * as constants from "../../constants";
import {
  createSubCategory,
  fetchCategory,
  fetchSubCategory,
} from "../../redux/actions/KisanBazaar/category";
import { categoryImageUpload } from "../../redux/actions/KisanBazaar/categoryImageUpload";

//initial object for sub category
let subCategory = {
  catId: null,
  code: "",
  name: "",
  description: "",
  isActive: "",
  media: [
    {
      mediaUrl: "",
      mediaType: "image",
    },
  ],
  translations: {
    te: {
      name: "",
      description: "",
    },
    hi: {
      name: "",
      description: "",
    },
    ta: {
      name: "",
      description: "",
    },
    kn: {
      name: "",
      description: "",
    },
  },
};

const SubCategory = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [categoryId, setCategoryId] = useState(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState("");
  const [submitDisable, setSubmitDisable] = useState(true);
  const [tName, setTName] = useState({ te: "", hi: "" ,ta:"",kn:""});
  const [tDescription, setTDescription] = useState({ te: "", hi: "" ,ta:"",kn:""});
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [image, setImage] = useState("");
  const [disableUpload, setDisableUpload] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const categories = useSelector((state) => state.category)?.getCategory;

  const categoriesAll = useSelector((state) => state.category)?.getSubCategory;

  useEffect(() => {
    if (code && name && description) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
      categoriesList();
      categoriesAllList();
    }
  }, [code, name, description]);

  const categoriesList = async () => {
    await dispatch(fetchCategory())
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  const categoriesAllList = async () => {
    await dispatch(fetchSubCategory())
      .then(() => {})
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  const uploadImage = async (file) => {
    setIsImageLoading(true);
    await dispatch(categoryImageUpload(file))
      .then(() => {
        setImage(store.getState().categoryImages?.categoryImageUrl);
        setIsImageLoading(false);
      })
      .catch((err) => {
        setIsImageLoading(false);
        Alert.error(err.message);
      });
  };

  const submitSubCategory = async () => {
    subCategory.catId = categoryId;
    subCategory.code = code;
    subCategory.name = name;
    subCategory.description = description;
    subCategory.isActive = isActive;
    subCategory.media[0].mediaUrl = image;
    subCategory.translations.te.name = tName.te;
    subCategory.translations.hi.name = tName.hi;
    subCategory.translations.ta.name = tName.ta;
    subCategory.translations.kn.name = tName.kn;
    subCategory.translations.te.description = tDescription.te;
    subCategory.translations.hi.description = tDescription.hi;
    subCategory.translations.ta.description = tDescription.ta;
    subCategory.translations.kn.description = tDescription.kn;

    await dispatch(createSubCategory(subCategory))
      .then(() => {
        Alert.success("Sub Category Created Successfully");
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
          <h2 className="mainHeading">Add Sub Category</h2>
        </div>
      </div>

      <div className="tableMainSection cardShadow p-3">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Category:</label>
              </div>
              <div className="col-12 col-md-8">
                <CustomSelect
                  placeholder="Select Category"
                  data={
                    categories
                      ? categories.map((row) => {
                          return {
                            label: row.name,
                            value: row.id,
                          };
                        })
                      : []
                  }
                  onSelect={(option) => {
                    setCategoryId(option.value);
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Code</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
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
            <div className="row">
              <div className="col-12 col-md-4 align-self-center">
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
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  />
                )}
              </div>
              <div className="col-12 col-md-4 align-self-center">&nbsp;</div>
              <div className="col-12 col-md-8 col-lg-4 d-flex mb-2">
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
                    await uploadImage(image);
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
                    setImage(e.target.files[0]);
                    var reader = new FileReader();
                    reader.onload = function (e) {
                      var img = new Image();
                      img.onload = function () {
                        setHeight(img.height);
                        setWidth(img.width);
                      };
                      img.src = reader.result;
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                onClick={(e) => (e.target.value = "")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Telugu Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-md-8">
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
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setTDescription({ ...tDescription, te: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Hindi Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-md-8">
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

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setTDescription({ ...tDescription, hi: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Tamil Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-md-8">
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

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setTDescription({ ...tDescription, ta: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="subHeading">Kannada Translations</h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Name:</label>
              </div>
              <div className="col-12 col-md-8">
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

          <div className="col-12 col-sm-6">
            <div className="row mb-3">
              <div className="col-12 col-md-4 align-self-center">
                <label className="bannerLableStyle">Description:</label>
              </div>
              <div className="col-12 col-md-8">
                <input
                  type="text"
                  className="inputStyle"
                  onChange={(e) => {
                    setTDescription({ ...tDescription, kn: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
            <Button
              className="btn btn-sm"
              disabled={submitDisable}
              onClick={() => {
                submitSubCategory();
                setSubmitDisable(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="tableMainSection cardShadow topUsersMainSec">
          <div className="visionTagsSec">
            {categoriesAll?.length !== 0 ? (
              <SubCategoryTable data={categoriesAll} />
            ) : (
              "No Records Found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
