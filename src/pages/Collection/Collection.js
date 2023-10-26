/**
 * React imports
 */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector, useStore } from "react-redux";

/**
 * Custom Imports
 */
import "../Banners/BannersStyle.css";
import "../../App.css";
import TextInput from "../../components/Common/TextInput";
import DeleteBanner from "../../components/Common/DeleteRow";
import { PageLoader } from "../../components/Loading/Loading";
import ErrorComponent from "../../components/Error/Error";
import EditCollection from "./EditCollection";
import {
  fetchCollection,
  createCollection,
  deleteCollection,
} from "../../redux/actions/Collection/collection";
import CustomSelect from "../../components/Select/Select";
import { getLanguages } from "../../services/Languages";

//Collection Object
const collectionObj = {
  title: "",
  name: "",
  displayOrder: 0,
  url: "",
  isDeleted: false,
};

//Collection Implementation
const Collection = () => {
  const collection = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  const store = useStore();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [language, setLanguage] = useState({ label: "English", value: "en" });

  /**
   * get collection function
   * @param {string} lang
   */
  const getCollection = async (lang) => {
    await dispatch(fetchCollection(lang));
  };

  useEffect(() => {
    getCollection(language.value);
  }, [language]);

  //Check fields for creation
  useEffect(() => {
    if (title !== "" && name !== "" && url !== "" && displayOrder !== "") {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, [title, name, url, displayOrder]);

  /**
   * Delete collection Implementation
   * @param {ObjectId} id
   */
  const delCollection = async (id) => {
    await dispatch(deleteCollection(id)).then(() => {
      if (store.getState().collection.deleteMsg === "Success") {
        window.location.reload();
      }
    });
  };

  /**
   * Create collection submit
   * @param {events} e
   */
  const createCollectionSubmit = async (e) => {
    e.preventDefault();
    collectionObj.name = name;
    collectionObj.url = url;
    collectionObj.title = title;
    collectionObj.displayOrder = displayOrder;
    await dispatch(createCollection(collectionObj)).then(() => {
      if (store.getState().collection.createMsg === "Success") {
        window.location.reload();
      }
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <h2 className="mainHeading">Product Collection</h2>
          </div>
        </div>
        <div className="tableMainSection cardShadow space-md-inr">
          <form onSubmit={createCollectionSubmit}>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <TextInput
                  labelName="Title:"
                  id="title"
                  labelClass="bannerLableStyle"
                  divClass="form-group"
                  type="text"
                  inputClass="inputStyle"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <TextInput
                  labelName="Name:"
                  id="name"
                  labelClass="bannerLableStyle"
                  divClass="form-group"
                  type="text"
                  inputClass="inputStyle"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <TextInput
                  labelName="Display Order:"
                  id="displayOrder"
                  labelClass="bannerLableStyle"
                  divClass="form-group"
                  type="text"
                  inputClass="inputStyle"
                  onChange={(e) => setDisplayOrder(e.target.value)}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                <TextInput
                  labelName="Url:"
                  id="url"
                  labelClass="bannerLableStyle"
                  divClass="form-group"
                  type="text"
                  inputClass="inputStyle"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12  col-sm-6 col-md-3">
                <input
                  type="submit"
                  className="btn btn-md btn-primary"
                  value="Submit"
                  disabled={submitDisable}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="tableMainSection cardShadow space-md-inr111 createBannerTable">
          <div style={{ width: "200px", margin: 10, float: "right" }}>
            <CustomSelect
              data={getLanguages()}
              placeholder="Select Language"
              search={false}
              onSelect={(value) => setLanguage(value)}
              value={language}
            />
          </div>
          {collection.isLoading ? (
            <PageLoader />
          ) : collection.errmsg ? (
            <ErrorComponent msg={collection.errmsg} />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Display Order</th>
                  <th>Url</th>
                  <th style={{ width: "100px" }}></th>
                  <th style={{ width: "100px" }}></th>
                </tr>
              </thead>
              <tbody>
                {collection.data.map((row, index) => {
                  return (
                    <tr key={index} style={{ height: "50px" }}>
                      <td>{row.title}</td>
                      <td>{row.name}</td>
                      <td>{row.displayOrder}</td>
                      <td>
                        <a href={row.url} target="_blank" rel="noreferrer">
                          {row.url}
                        </a>
                      </td>
                      <td style={{ width: "100px" }}>
                        <EditCollection id={row.id} language={language.value} />
                      </td>
                      <td style={{ width: "100px" }}>
                        <DeleteBanner
                          id={row.id}
                          name={row.name}
                          deleterow={delCollection}
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
    </div>
  );
};

export default Collection;
