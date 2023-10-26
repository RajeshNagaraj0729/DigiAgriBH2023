/*
React Imports
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/*
Custom Component Imports
 */
import CropDocUsersTable from "../../services/TablesData/CropDocUsersTable";
import Error from "../Error/Error";
import {
  fetchCropDocUsers,
  fetchCropDocUsersBySearch,
} from "../../redux/actions/CropDoc/fetchCropDocUsers";
import { CROP_DOC_USERS } from "../../redux/actions/storepage";
import { PageLoader } from "../../components/Loading/Loading";
import Search from "../../components/Search/Search";

//Crop Doc Users Wise Page
const Users = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const users = useSelector((state) => state.cropDoc);

  //Fetched Results Loading
  if (users.isLoading) {
    return <PageLoader />;
  }

  //Fetched Results Error
  else if (users.errmsg) {
    return <Error msg={users.errmsg} />;
  }

  //If data is fetched returning the Crop Doc User Wise components
  else {
    // Fetching pagewise handle
    const handlefetchusers = (active, amount) => {
      dispatch(fetchCropDocUsers(active, amount));
    };

    // Handle for Search bar
    const handleSubmit = () => {
      dispatch({
        type: CROP_DOC_USERS,
        activePage: 1,
        pageAmount: 10,
      });
      dispatch(fetchCropDocUsersBySearch(searchValue, 1, 10));
    };

    //Pagewise handle for search bar
    const callSearchHandler = (searchValue, activePage, pageAmount) => {
      dispatch(fetchCropDocUsersBySearch(searchValue, activePage, pageAmount));
    };
    return (
      <div>
        {/* Search Bar Implementation */}
        <div className="row mb-3">
          <Search
            onChange={(e) => setSearchValue(e.target.value)}
            divClass="col-12 justify-content-end"
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Crop Doc UserWise Table */}
        <CropDocUsersTable
          callHandle={handlefetchusers}
          search={searchValue}
          callSearchHandler={callSearchHandler}
        />
      </div>
    );
  }
};

export default Users;
