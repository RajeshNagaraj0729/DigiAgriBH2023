import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PaginationDataTable from "../../components/DataTables/PaginationDataTable";
import * as constants from "../../constants";

const BlogsTable = (props) => {
  const {
    blogs,
    pageNum,
    pageSize,
    apiHandler,
    pageNumHandler,
    pageSizeHandler,
  } = props;

  const dispatch = useDispatch();
  const columns = [
    {
      name: "Title",
      selector: "title",
      center: true,
    },
    {
      name: "Image",
      selector: "imageurl",
      center: true,
    },
    {
      name: "Blog Url",
      selector: "blogurl",
      center: true,
    },
    {
        name:"Views",
        selector:"views",
        centre:true,
    }
  ];

  let Blogs = blogs.map((data) => {
    return {
      title: data.title,
      imageurl: (
        <a
          target="_blank"
          href={
            data.imageUrl?.startsWith("blogs/")
              ? constants.mediaUrl + data.imageUrl + constants.sasToken
              : data.imageUrl
          }
          rel="noreferrer"
        >
          <img
            src={
              data.imageUrl?.startsWith("news/")
                ? constants.mediaUrl + data.imageUrl + constants.sasToken
                : data.imageUrl
            }
            alt="Not Uploaded"
            className="newsImgStyle"
          />
        </a>
      ),
      blogurl: (
        <a
          target="_blank"
          href={`https://www.bighaat.com/blogs/kb/${data.handle}`}
          rel="noreferrer"
        >
          
          Blog - Link
        </a>
      ),
      views:data.views
    };
  });

  return (
    <div>
      <PaginationDataTable
        activePage={pageNum}
        pageAmount={pageSize}
        title="Blogs"
        setActivePage={pageNumHandler}
        setPageAmount={pageSizeHandler} 
        dispatch={dispatch}
        callHandle={apiHandler}
        columns={columns}
         data={Blogs}
        searchValue=""
        totalCount={
          pageNum * pageSize === pageNum * blogs.length
            ? 500
            : blogs.length < pageSize
            ?pageNum * pageSize  - blogs.length
            : blogs.length
        }

      />
      </div>
  );
};

export default BlogsTable;