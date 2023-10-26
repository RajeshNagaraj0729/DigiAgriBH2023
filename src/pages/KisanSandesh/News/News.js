/**
 * React Imports
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import { Button } from "react-bootstrap";
import dateFormat from "dateformat";

/**
 * Custom Imports
 */
import { PageLoader } from "../../../components/Loading/Loading";
import {
  getNews,
  deleteNews,
  createNews,
  updateNewsPublish,
} from "../../../redux/actions/KisanSandesh/kisanSandesh";
import * as constants from "../../../constants";
import EditNews from "./EditNews";
import CustomSelect, {
  CustomCreatable,
} from "../../../components/Select/Select";
import { getDistricts, getStates } from "../../../services/statesAndDistricts";
import { getLanguages } from "../../../services/Languages";
import NewsDataTable from "../../../services/TablesData/NewsDataTable";
import ExcelFileDownload from "../../../components/DownloadOptions/ExcelFileDownload";

//Initial Object for news create
const initialNews = {
  title: "",
  description: "",
  imageUrl: "",
  likes: 0,
  views: 0,
  iconUrl: "",
  newsUrl: "",
  district: "",
  state: "",
  language: "",
  cropId: "",
  diseaseCauseId: "",
  isDeleted: false,
  sourceName: "",
  iconHeight: 0,
  iconWidth: 0,
  isSourceNameRequired: true,
  tags: [],
};

/**
 * Component for News
 */
const News = () => {
  const news = useSelector((state) => state.kisanSandesh);
  const crops = useSelector((state) => state.cropDocInfo).crops;
  const diseases = useSelector((state) => state.cropDocInfo).diseases;

  const dispatch = useDispatch();

  const [submitDisable, setSubmitDisable] = useState(true);
  const [newsUrl, setNewsUrl] = useState("");
  const [language, setLanguage] = useState({ label: "English", value: "en" });
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postLanguage, setPostLanguage] = useState({
    label: "English",
    value: "en",
  });
  const [crop, setCrop] = useState("");
  const [pest, setPest] = useState("");
  const [source, setSource] = useState("");
  const [isSourceNameRequired, setIsSourceNameRequired] = useState(true);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  //Fetching news
  const fetchNews = async (lang) => {
    await dispatch(getNews(lang)).catch((err) => {
      Alert.error(err.message);
    });
  };

  //Get news
  useEffect(() => {
    fetchNews(language.value);
  }, [language]);

  //Check for create news
  useEffect(() => {
    if (newsUrl !== "" && source !== "") {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [newsUrl, source]);

  //Loading Excel Data
  const excelData = news.newsData.map((row) => {
    return {
      title: row.title,
      newsUrl: row.newsUrl,
      sourceName: row.sourceName,
      views: row.views,
      publishedDate: row.createdOn,
    };
  });

  /**
   * Create News submit implementation
   */
  const handleSubmit = async () => {
    initialNews.newsUrl = newsUrl;
    initialNews.state = state.value ? state.value : "";
    initialNews.district = district.value ? district.value : "";
    initialNews.cropId = crop.value ? crop.value : null;
    initialNews.diseaseCauseId = pest.value ? pest.value : null;
    initialNews.language = postLanguage.value;
    initialNews.iconUrl = source.value;
    initialNews.sourceName = source.label;
    initialNews.iconHeight = news.newsIcons?.filter(
      (r) => r.imageUrl === source.value
    )[0]?.height;
    initialNews.iconWidth = news.newsIcons?.filter(
      (r) => r.imageUrl === source.value
    )[0]?.width;
    initialNews.isSourceNameRequired = isSourceNameRequired;
    initialNews.tags = tags
      .map((r) => r.label)
      .concat(state.value ? state.value : "")
      .concat(district.value ? district.value : "")
      .concat(
        crop.value ? crops.filter((r) => r.id === crop.value)[0].cropName : null
      )
      .concat(
        pest.value ? diseases.filter((r) => r.id === pest.value)[0].name : null
      )
      .filter((r) => r);
    dispatch(createNews(initialNews))
      .then(() => {
        setSubmitDisable(true);
        setNewsUrl("");
        setState("");
        setDistrict("");
        setCrop("");
        setPest("");
        setSource("");
        setTags([]);
        setIsSourceNameRequired(true);
        Alert.success("Successfully created news");
        setLanguage(postLanguage);
        fetchNews(postLanguage.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  /**
   * Delete News implementation
   * @param {ObjectId} id
   */
  const delNews = (id) => {
    dispatch(deleteNews(id))
      .then(() => {
        Alert.success("Successfully deleted news");
        fetchNews(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  //Date format convertion
  const getDate = (date) => {
    try {
      if (date) {
        let d = dateFormat(
          new Date(date.replace("IST", "").replace("\\", "")),
          "yyyy-mm-dd HH:MM TT"
        );
        if (d) {
          return d;
        } else {
          Alert.error("Invalid date format");
        }
      }
    } catch (err) {
      Alert.error(err);
    }
  };

  //Set publish
  const setPublish = async (id, flag) => {
    await dispatch(updateNewsPublish(id, flag))
      .then(() => {
        Alert.success("Successfully updated news");
        fetchNews(language.value);
      })
      .catch((err) => {
        Alert.error(err.message);
      });
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="col-6 d-flex align-items-center">
          <h2 className="mainHeading">News</h2>
        </div>
        <div className="col-6">
          <div style={{ width: "200px", float: "right" }}>
            <CustomSelect
              data={[
                ...getLanguages(),
                {
                  label: "All",
                  value: "all",
                },
              ]}
              placeholder="Select Language"
              search={false}
              onSelect={(value) => {
                setPostLanguage(value);
              }}
              value={postLanguage}
            />
          </div>
        </div>
      </div>

      <div className="tableMainSection cardShadow space-md-inr">
        <form>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <div className={"form-group"}>
                <label htmlFor={"news-url"} className="bannerLableStyle">
                  News Url:
                </label>
                <textarea
                  value={newsUrl}
                  cols="30"
                  rows="3"
                  name="news-url"
                  className="inputStyle"
                  onChange={(e) => setNewsUrl(e.target.value)}
                />
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isSourceNameRequired}
                    onChange={(e) =>
                      setIsSourceNameRequired(!isSourceNameRequired)
                    }
                  />{" "}
                  Source Name Required
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className={"form-group"}>
                <label htmlFor={"news-state"} className="bannerLableStyle">
                  State: (Optional)
                </label>
                <CustomSelect
                  data={getStates()}
                  placeholder="Select State"
                  search={true}
                  onSelect={(value) => {
                    setState(value);
                    setDistrict("");
                  }}
                  value={state}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor={"news-crop"} className="bannerLableStyle">
                  Crop: (Optional)
                </label>
                <CustomSelect
                  data={
                    crops
                      ? crops.map((row) => {
                          return {
                            label: row.cropName,
                            value: row.id,
                          };
                        })
                      : []
                  }
                  placeholder="Select Crop"
                  search={true}
                  onSelect={(value) => {
                    setCrop(value);
                  }}
                  value={crop}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor={"news-state"} className="bannerLableStyle">
                  News Source:
                </label>
                <CustomSelect
                  data={
                    news.newsIcons
                      ? news.newsIcons.map((r) => {
                          return {
                            label: r.source,
                            value: r.imageUrl,
                          };
                        })
                      : []
                  }
                  placeholder="Select News Source"
                  search={true}
                  onSelect={(value) => {
                    setSource(value);
                  }}
                  value={source}
                />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <div className={"form-group"}>
                <label htmlFor={"news-district"} className="bannerLableStyle">
                  District: (Optional)
                </label>
                <CustomSelect
                  data={state.value ? getDistricts(state.value) : []}
                  placeholder="Select District"
                  search={false}
                  onSelect={(value) => {
                    setDistrict(value);
                  }}
                  value={district}
                />
              </div>
              <div className={"form-group"}>
                <label htmlFor={"news-district"} className="bannerLableStyle">
                  Pest: (Optional)
                </label>
                <CustomSelect
                  data={
                    diseases
                      ? diseases.map((row) => {
                          return {
                            label: row.name,
                            value: row.id,
                          };
                        })
                      : []
                  }
                  placeholder="Select Pest"
                  search={true}
                  onSelect={(value) => {
                    setPest(value);
                  }}
                  value={pest}
                />
              </div>

              <div className={"form-group"}>
                <label htmlFor={"tips-tags"} className="bannerLableStyle">
                  Tags: (Optional)
                </label>
                <CustomCreatable
                  name={"news-tags"}
                  isMulti={true}
                  value={tags}
                  placeholder="Add Tags"
                  onSelect={(values) => {
                    setTags(values);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                className="btn btn-sm btn-primary"
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

      <div className="row">
        <div className="col-12">
          <div
            className="d-flex justify-items-end m-2"
            style={{
              width: "400px",
              position: "absolute",
              right: 15,
              zIndex: 2,
            }}
          >
            {/* Excel Component */}
            <div className="row mb-2">
              <div
                className="col-12"
                style={{ justifyContent: "flex-end", display: "flex" }}
              >
                <ExcelFileDownload
                  data={excelData}
                  fileName="Ks_News"
                  name="Export Data"
                />
              </div>
            </div>

            <div style={{ width: "200px", marginRight: "5px" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search by source name"
                className="inputStyle"
              />
            </div>
            <div style={{ width: "200px" }}>
              <CustomSelect
                data={[
                  ...getLanguages(),
                  {
                    label: "All",
                    value: "all",
                  },
                ]}
                placeholder="Select Language"
                search={false}
                onSelect={(value) => setLanguage(value)}
                value={language}
              />
            </div>
          </div>
          <div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
            {news.newsLoading ? (
              <PageLoader />
            ) : (
              <>
                <NewsDataTable
                  data={news.newsData}
                  language={language.value}
                  setPublish={setPublish}
                  getDate={getDate}
                  delNews={delNews}
                  crops={crops}
                  diseases={diseases}
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

export default News;
