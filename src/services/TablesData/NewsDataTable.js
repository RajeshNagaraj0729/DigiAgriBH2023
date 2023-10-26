/*
React Imports
 */
import React from "react";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";

/*
Custom Component Imports
 */
import NormalDataTable from "../../components/DataTables/NormalDataTable";
import * as constants from "../../constants";
import EditNews from "../../pages/KisanSandesh/News/EditNews";
import DeleteRow from "../../components/Common/DeleteRow";
import "../../index.css";

/**
 * Table for News Icons
 * @param {props} props
 */

//Title	Description	Full Description	News Url	Source	Image	Location	Plant Details	Published
const NewsDataTable = (props) => {
  // Column names
  const columns = [
    {
      name: "Id",
      selector: "id",
    },
    {
      name: "Title",
      selector: "title",
      center: true,
    },
    {
      name: "Description",
      selector: "description",
    },
    {
      name: "Full Description",
      selector: "fullDescription",
      center: true,
    },
    {
      name: "News Url",
      selector: "newsUrl",
      center: true,
    },
    {
      name: "Source",
      selector: "source",
      center: true,
    },
    {
      name: "Image",
      selector: "image",
      center: true,
    },
    {
      name: "Location",
      selector: "location",
      center: true,
    },
    {
      name: "Views",
      selector: "views",
      center: true,
    },
    {
      name: "Plant Details",
      selector: "plantDetails",
      center: true,
    },
    {
      name: "Published",
      selector: "published",
      center: true,
    },
    {
      name: " ",
      selector: "edit",
    },
  ];

  let data = props.data;
  if (props.searchValue) {
    data = data.filter((r) =>
      r.sourceName.toLowerCase().includes(props.searchValue.toLowerCase())
    );
  }

  // Fetching Row Data
  data = data.sort((a, b) => b.createdOn.localeCompare(a.createdOn)).map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      fullDescription: item.fullDescription
        ? item.fullDescription.substring(0, 200) +
          (item.fullDescription.length > 200 ? "..." : "")
        : "",
      newsUrl: (
        <a
          target="_blank"
          href={item.newsUrl}
          rel="noreferrer"
          className="newsUrlStyle"
        >
          {item.newsUrl}
        </a>
      ),
      source: (
        <div style={{ display: "block" }}>
          <div style={{ textAlign: "center" }}>{item.sourceName}</div>
          <div>
            <a
              target="_blank"
              href={
                item.iconUrl?.startsWith("news/")
                  ? constants.mediaUrl + item.iconUrl + constants.sasToken
                  : item.iconUrl
              }
              rel="noreferrer"
            >
              <img
                src={
                  item.iconUrl?.startsWith("news/")
                    ? constants.mediaUrl + item.iconUrl + constants.sasToken
                    : item.iconUrl
                }
                alt="Not Uploaded"
                className="iconImage"
              />
            </a>
          </div>
        </div>
      ),
      image: (
        <a
          target="_blank"
          href={
            item.imageUrl?.startsWith("news/")
              ? constants.mediaUrl + item.imageUrl + constants.sasToken
              : item.imageUrl
          }
          rel="noreferrer"
        >
          <img
            src={
              item.imageUrl?.startsWith("news/")
                ? constants.mediaUrl + item.imageUrl + constants.sasToken
                : item.imageUrl
            }
            alt="Not Uploaded"
            className="newsImgStyle"
          />
        </a>
      ),
      location: (
        <>
          <p>
            <b>State:</b> {item.state}
          </p>
          <p>
            <b>District :</b> {item.district}
          </p>
        </>
      ),
      views:item.views,
      plantDetails: (
        <>
          <p>
            <b>Crop:</b>{" "}
            {props.crops.filter((r) => r.id === item.cropId)[0]?.cropName}
          </p>
          <p>
            <b>Pest:</b>{" "}
            {
              props.diseases.filter((r) => r.id === item.diseaseCauseId)[0]
                ?.name
            }
          </p>
        </>
      ),
      published: (
        <div style={{ display: "block" }}>
          {item.isPublished ? (
            <button
              className="btn btn-sm btn-success"
              onClick={() => props.setPublish(item.id, false)}
              style={{ color: "black" }}
            >
              Published
            </button>
          ) : (
            <Button
              className="btn btn-sm btn-danger"
              onClick={() => {
                if (
                  !item.imageUrl ||
                  !item.title ||
                  !item.description ||
                  !item.fullDescription
                ) {
                  Alert.error("Data is insufficient to publish");
                } else {
                  props.setPublish(item.id, true);
                }
              }}
              style={{ color: "black" }}
            >
              Unpublished
            </Button>
          )}
          <div>{props.getDate(item.createdOn)}</div>
        </div>
      ),

      edit: (
        <>
          <EditNews id={item.id} language={props.language} outlined={true} />
          <br />
          <DeleteRow
            id={item.id}
            name={item.title}
            deleterow={props.delNews}
            outlined={true}
          />
        </>
      ),
    };
  });

  // Returning data table
  return (
    <NormalDataTable
      title="News"
      columns={columns}
      data={data}
      length={data.length}
    />
  );
};

export default NewsDataTable;
