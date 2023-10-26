//React Imports
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Spinner } from "reactstrap";
import { Alert } from "rsuite";
import TextInput from "../../components/Common/TextInput";
import { fileUpload } from "../../redux/actions/Banners/fileUpload";

//Custom Imports
// import CustomSelect from "../../../components/Select/Select";
// import EditBanner from "./EditHomeBanner";
// import TextInput from "../../../components/Common/TextInput";
// import {
//     deleteBanner,
//     getProductByHandle,
// } from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
// import { fileUpload } from "../../../redux/actions/Banners/fileUpload";
// import { postBanner } from "../../../redux/actions/Banners/HomeBanners/HomeBanners";
// import * as constants from "../../../constants";


// import "../BannersStyle.css";
// import "../../../App.css";

/**
 * banner object
 */
const banner = {
    bannerMedia: [],
    redirectLink: "",
    isDeleted: false,
    language: "",
    translations: {
        te: {
            bannerMedia: [],
        },
        hi: {
            bannerMedia: [],
        },
        ta: {
            bannerMedia: [],
        },
        kn: {
            bannerMedia: [],
        },
    },
    type: "home",
    bannerDimensions: {
        height: 0,
        width: 0,
    },
    specificAttributes: {
        viewLimit: 0,
        state: [],
        district: [],
        crop: [],
        disease: [],
    },
    label: "",
    contextType: "",
    contextId: "",
};

/**
 *
 * @param {props} props
 */
const DigiHome = (props) => {
    const [translations, setTranslations] = useState({
        te: {
            bannerMedia: [],
        },
        hi: {
            bannerMedia: [],
        },
        ta: {
            bannerMedia: [],
        },
        kn: {
            bannerMedia: [],
        },
    });
    const dispatch = useDispatch();
    const store = useStore();
    const [bannersSortedData, setBannersSortedData] = useState([]);
    const [bannerName, setBannerName] = useState("");
    // const [tagName, setTagName] = useState("");
    // const [activeFrom, setActiveFrom] = useState("");
    // const [activeTo, setActiveTo] = useState("");
    // const [redirectLink, setRedirectLink] = useState("");
    const [bannerMedia, setBannerMedia] = useState("");
    const [isMediaLoading, setIsMediaLoading] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);
    const [disableUpload, setDisableUpload] = useState(true);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const [postLanguage, setPostLanguage] = useState({
        label: "English",
        value: "en",
    });

    /**
     * file upload function
     * @param {events} e
     */
    const uploadFile = async (file, lang) => {
        setIsMediaLoading(true);
        await dispatch(fileUpload(file)).then(() => {
            if (!store.getState().fileUpload.isLoading) {
                Alert.success("Banner media added successfully");
                setIsMediaLoading(false);
            }
        });
    };

    //Validate banner media
    const validateBannerMedia = () => {
        if (
            bannerMedia !== "" &&
            !bannerMedia.toLowerCase().endsWith(".jpg") &&
            !bannerMedia.toLowerCase().endsWith(".png") &&
            !bannerMedia.toLowerCase().endsWith(".jpeg")
        ) {
            return false;
        }
        if (
            translations.te.bannerMedia.length !== 0 &&
            !translations.te.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
            !translations.te.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
            !translations.te.bannerMedia[0].toLowerCase().endsWith(".png")
        ) {
            return false;
        }
        if (
            translations.hi.bannerMedia.length !== 0 &&
            !translations.hi.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
            !translations.hi.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
            !translations.hi.bannerMedia[0].toLowerCase().endsWith(".png")
        ) {
            return false;
        }
        if (
            translations.ta.bannerMedia.length !== 0 &&
            !translations.ta.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
            !translations.ta.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
            !translations.ta.bannerMedia[0].toLowerCase().endsWith(".png")
        ) {
            return false;
        }
        if (
            translations.kn.bannerMedia.length !== 0 &&
            !translations.kn.bannerMedia[0].toLowerCase().endsWith(".jpg") &&
            !translations.kn.bannerMedia[0].toLowerCase().endsWith(".jpeg") &&
            !translations.kn.bannerMedia[0].toLowerCase().endsWith(".png")
        ) {
            return false;
        }
        return true;
    };

    // const validateRedirectLink = () => {
    //   if (
    //     !redirectLink.startsWith("http://") &&
    //     !redirectLink.startsWith("https://")
    //   ) {
    //     return false;
    //   }
    //   return true;
    // };

    /**
     * Create banner submit implementation
     */
    const handleSubmit = async () => {
        if (isImageSelected && !isUploadClicked) {
            Alert.error("Please upload the selected image");
        } else if (!validateBannerMedia()) {
            Alert.error("Please enter a valid banner media");
        } else if (
            new Date(activeFrom).setHours(0, 0, 0, 0) >
            new Date(activeTo).setHours(0, 0, 0, 0)
        ) {
            Alert.error("Active From date is greater than Active To date");
        } else {
            banner.tags = [];
            banner.bannerName = bannerName;
            // banner.tags.push(tagName);
            // banner.activeFrom = new Date(activeFrom).toISOString();
            // banner.activeTo = new Date(activeTo).toISOString();
            // banner.redirectLink = redirectLink;
            // banner.translations = translations;
            banner.language = postLanguage.value;
            banner.bannerDimensions = {
                height: 0,
                width: 0,
            };
            banner.contextType = bannerType.value;
            banner.contextId =
                bannerType.value === "collection"
                    ? `handleName=${contextId}::/handleTitle=${bannerName}`
                    : contextId;

            await dispatch(postBanner(banner))
                .then(() => {
                    // window.location.reload();
                    Alert.success("Successfully added banner");
                    //setLanguage(postLanguage);
                    // setBannerName("");
                    setBannerMedia("");
                    // setTagName("");
                    // setActiveTo("");
                    // setActiveFrom("");
                    // setRedirectLink("");
                    setBannerType(bannerTypesData[3]);
                    setContextId("");
                    // setTranslations({
                    //     te: {
                    //         bannerMedia: [],
                    //     },
                    //     hi: {
                    //         bannerMedia: [],
                    //     },
                    //     ta: {
                    //         bannerMedia: [],
                    //     },
                    //     kn: {
                    //         bannerMedia: [],
                    //     },
                    // });
                    setSubmitDisable(true);
                    setDisableUpload(true);
                    // getHomeBanners(postLanguage.value);
                    setIsUploadClicked(false);
                    setIsImageSelected(false);
                })
                .catch((err) => {
                    Alert.error(err.message);
                });
        }
    };

    /**
     * Delete banner implementation
     * @param {ObjectId} id
     */

    return (
        <div>
            <div className="row">
                <div className="col-6  d-flex align-items-center">
                    <h2 className="mainHeading">Crop & Disease</h2>
                </div>
                <div className="col-6">
                    <div style={{ width: "200px", marginBottom: 10, float: "right" }}>

                    </div>
                </div>
            </div>
            <div className="tableMainSection cardShadow space-md-inr">
                <form>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-4">

                            <div className="row">
                                <div className="col-7">
                                    {isMediaLoading ? (
                                        <Spinner color="success" size="sm" />
                                    ) : (
                                        <TextInput
                                            labelName="Media"
                                            id={postLanguage.value + "bannermedia"}
                                            labelClass="bannerLableStyle"
                                            divClass="form-group"
                                            type="text"
                                            inputClass="inputStyle"
                                            value={
                                                postLanguage.value === "en"
                                                    ? bannerMedia
                                                    : translations[postLanguage.value].bannerMedia
                                                        .length !== 0
                                                        ? translations[postLanguage.value].bannerMedia[0]
                                                        : ""
                                            }
                                            onChange={(e) => {
                                                if (postLanguage.value === "en") {
                                                    setBannerMedia(e.target.value);
                                                    banner.bannerMedia = [];
                                                    banner.bannerMedia[0] = e.target.value;
                                                } else {
                                                    let duptranslations = {
                                                        te: {
                                                            bannerMedia: [],
                                                        },
                                                        hi: {
                                                            bannerMedia: [],
                                                        },
                                                        ta: {
                                                            bannerMedia: [],
                                                        },
                                                        kn: {
                                                            bannerMedia: [],
                                                        },
                                                    };
                                                    duptranslations[postLanguage.value].bannerMedia[0] =
                                                        e.target.value;
                                                    setTranslations(duptranslations);
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="col-5 d-flex m-auto">
                                    <label
                                        htmlFor={postLanguage.value + "lang-file-upload"}
                                        className="custom-file-upload btn btn-sm btn-light m-auto"
                                    >
                                        <i className="fa fa-picture-o"></i> Select
                                    </label>
                                    <Button
                                        className="custom-file-upload btn btn-sm btn-light m-auto"
                                        disabled={disableUpload}
                                        onClick={async () => {
                                            setDisableUpload(true);
                                            try {
                                                if (postLanguage.value === "en") {
                                                    await uploadFile(bannerMedia).then(() => {
                                                        setIsUploadClicked(true);
                                                        setBannerMedia(store.getState().fileUpload.data);
                                                        banner.bannerMedia = [];
                                                        banner.bannerMedia[0] =
                                                            store.getState().fileUpload.data;
                                                    });
                                                } else {
                                                    await uploadFile(
                                                        translations[postLanguage.value].bannerMedia[0]
                                                    )
                                                        .then(() => {
                                                            setIsUploadClicked(true);
                                                            let duptranslations = {
                                                                te: {
                                                                    bannerMedia: [],
                                                                },
                                                                hi: {
                                                                    bannerMedia: [],
                                                                },
                                                                ta: {
                                                                    bannerMedia: [],
                                                                },
                                                                kn: {
                                                                    bannerMedia: [],
                                                                },
                                                            };
                                                            duptranslations[postLanguage.value].bannerMedia[0] =
                                                                store.getState().fileUpload.data;
                                                            setTranslations(duptranslations);
                                                        });
                                                }
                                            } catch (err) {
                                                console.error(err.message);
                                            }
                                        }}
                                    >
                                        <i className="fa fa-cloud-upload"></i> Upload
                                    </Button>
                                </div>
                                <input
                                    id={postLanguage.value + "lang-file-upload"}
                                    type="file"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (!e.target.files[0].type.startsWith("image/")) {
                                            Alert.error("Please upload a valid image");
                                        } else {
                                            setIsImageSelected(true);
                                            setDisableUpload(false);
                                            if (postLanguage.value === "en") {
                                                setBannerMedia(e.target.files[0]);
                                            } else {
                                                let duptranslations = {
                                                    te: {
                                                        bannerMedia: [],
                                                    },
                                                    hi: {
                                                        bannerMedia: [],
                                                    },
                                                    ta: {
                                                        bannerMedia: [],
                                                    },
                                                    kn: {
                                                        bannerMedia: [],
                                                    },
                                                };
                                                duptranslations[postLanguage.value].bannerMedia.push(
                                                    e.target.files[0]
                                                );

                                                setTranslations(duptranslations);
                                            }
                                        }
                                    }}
                                    onClick={(e) => (e.target.value = "")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Button
                                className="btn btn-md btn-primary"
                                disabled={submitDisable}
                                onClick={() => {
                                    handleSubmit();
                                    setSubmitDisable(true);
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DigiHome;
