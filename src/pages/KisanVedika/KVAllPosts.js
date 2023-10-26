import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";

import { fetchKisanVedikaAllPostsApi } from "../../redux/actions/KisanVedika/kisanVedika";
import KVAllPostsTable from "../../services/TablesData/KVAllPostsTable";

const KVAllPosts = () => {
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const kvPosts = useSelector((state) => state.kisanVedika.allPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    loadKVPosts(1, 10);
  }, []);

  const loadKVPosts = async (num, size) => {
    try {
      await dispatch(fetchKisanVedikaAllPostsApi(num, size));
    } catch (error) {
      Alert.error(error);
    }
  };

  return (
    <div>
      <KVAllPostsTable
        posts={!!kvPosts ? kvPosts : []}
        pageNum={pageNum}
        pageSize={pageSize}
        apiHandler={loadKVPosts}
        pageNumHandler={setPageNum}
        pageSizeHandler={setPageSize}
      />
    </div>
  );
};

export default KVAllPosts;
