import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import ExcelFileDownload from "../../../components/DownloadOptions/ExcelFileDownload";

import { fetchBlogsApi } from "../../../redux/actions/KisanSandesh/kisanSandesh";
import BlogsTable from "../../../services/TablesData/BlogsTable";

const Blogs = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const blogs = useSelector((state) => state.kisanSandesh.allBlogs);

  const dispatch = useDispatch();

  useEffect(() => {
    loadBlogs(1, 10);
  }, []);

  //Loading Excel Data
  const excelData = blogs.map((row) => {
    return {
      title: row.title,
      blogUrl: `https://www.bighaat.com/blogs/kb/${row.handle}`,
      views: row.views,
    };
  });

  const loadBlogs = async (num, size) => {
    try {
      await dispatch(fetchBlogsApi(num, size));
    } catch (error) {
      Alert.error(error);
    }
  };

  return (
    <div>
      {/* Excel Component */}
      <div className="row mb-2">
        <div
          className="col-12"
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <ExcelFileDownload
            data={excelData}
            fileName="Ks_Blogs"
            name="Export Data"
          />
        </div>
      </div>

      <BlogsTable
        blogs={!!blogs ? blogs : []}
        pageNum={pageNum}
        pageSize={pageSize}
        apiHandler={loadBlogs}
        pageNumHandler={setPageNum}
        pageSizeHandler={setPageSize}
      />
    </div>
  );
};

export default Blogs;
