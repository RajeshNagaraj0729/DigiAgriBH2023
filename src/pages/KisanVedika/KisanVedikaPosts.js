import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "rsuite";
import Card from "../../components/Card/Card";
import Filter from "../../layouts/Filtering/Filter";
import {
	deletePost,
	fetchKVPosts,
	fetchKVPostsCount,
	getCurrentDayPostCount,
	fetchKVPostsForExcelData,
} from "../../redux/actions/KisanVedika/kisanVedika";
import KVPostsTable from "../../services/TablesData/KisanVedikaPosts";
import * as constants from "../../constants";
import moment from "moment-timezone";
import {
	UTCtolocalDate,
	localToUTCStartDate,
	localToUTCEndDate,
} from "../../Utils/dataUtils";
import { validateShowExcelFunctionToUsers,validateShowMobileNumberFunctionToUsers } from "../../Utils/utils";

const KVPosts = () => {
	const [pagenum, setPagenum] = useState(1);
	const [pagesize, setPagesize] = useState(10);
	const [from, setFrom] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [to, setTo] = useState(dateFormat(Date.now(), "yyyy-mm-dd"));
	const [searchValue, setSearchValue] = useState("");
	const [selectedCrop, setSelectedCrop] = useState("");
	const [kvExcelData, setKvExcelData] = useState([]);
	const [replyCountFilter, setReplyCountFilter] = useState("");

	const dispatch = useDispatch();
	const kisanVedika = useSelector((state) => state.kisanVedika);
	const crops = useSelector((state) => state.cropDocInfo.crops);
	const userInfo = useSelector((state) => state.loggedInUser);
	const userData = localStorage.getItem("user");
	//loggedInUser

  const excelUsers=JSON.parse(window.localStorage.getItem('user'));
  const mobileNo = excelUsers?.phone;
  const hasExcelAccess = mobileNo ? validateShowExcelFunctionToUsers(mobileNo) : false;
	let totalCountForGrid = kisanVedika?.postsData[0]?.totalPostsCount || 0;
	const getKisanVedikaPosts = async (pageNum, pageSize) => {
		await dispatch(
			fetchKVPosts(
				pageNum,
				pageSize,
				searchValue || "",
				from || "",
				to || "",
				selectedCrop ? selectedCrop.value : "",
				replyCountFilter
			)
		).catch((err) => {
			Alert.error(err.message);
		});
	};

	const handleFilterSubmit = () => {
		getKisanVedikaPosts(
			pagenum,
			pagesize,
			from !== "" && from !== undefined
				? new Date(from).toISOString()
				: new Date(new Date()).toISOString(),
			to !== "" && to !== undefined
				? new Date(new Date(to).setHours(23, 59, 59, 999)).toISOString()
				: new Date(new Date()).toISOString(),
			searchValue || "",
			selectedCrop ? selectedCrop.value : "",
			replyCountFilter ? replyCountFilter.value : ""
		);
	};

	const deletePostSubmit = async (postId) => {
		const post = {
			postId: postId,
		};
		await dispatch(deletePost(post))
			.then(() => {
				Alert.success("Post deleted successfully");
				// window.location.reload();
				getKisanVedikaPosts(pagenum, pagesize, "", "", "", "");
			})
			.catch((err) => {
				Alert.error(err.message);
			});
	};

	const getKVStats = () => {
		dispatch(fetchKVPostsCount()).catch((err) => Alert.error(err.message));
		dispatch(getCurrentDayPostCount()).catch((err) => Alert.error(err.message));
	};

	useEffect(() => {
		getKisanVedikaPosts(pagenum, pagesize, "", "", "", "", "");
		getKVStats();
	}, []);

  useEffect(() => {
    if(totalCountForGrid && totalCountForGrid > 0 && hasExcelAccess) {
      fetchKVPostsForExcelData(
        from ? localToUTCStartDate(from) : "",
        to ? localToUTCEndDate(to) : "",
        selectedCrop ? selectedCrop.value : "",
        replyCountFilter,
        searchValue,
        totalCountForGrid).then((response)=>{
          if(response){
            setKvExcelData(response)
          }
        })
      
    }
  }, [totalCountForGrid]);
  const excel_data = kvExcelData && kvExcelData?.length > 0 && kvExcelData?.map((row) => {
    return {
      Username: row?.users[0]
        ? row.users[0].firstName + " " + row?.users[0]?.lastName
        : "N/A",
      Mobileno: row?.users[0] ? row?.users[0]?.phone : "N/A",
      //postedAt: moment.tz(row.postedAt, 'Asia/kolkata').format('MMM Do YYYY, h:mm:ss a'), 
      postedAt:UTCtolocalDate(row?.postedAt),
      //PostedAt: dateFormat(row.postedAt, "dd/mm/yyyy, h:MM:ss TT"),
      Title: row?.title,
      CropName: row?.crops[0]?.cropName,
    };
  });
  return (
    <div>
      <div className="row mb-4 mb-md-0 mb-lg-1 mb-xl-4">
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="KV Total Posts"
            cardText="Count"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textSuccess"
            number={kisanVedika.kvPostsCount}
            isLoading={kisanVedika.kvPostsCount === null ? true : false}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3 mb-sm-3 mb-md-0">
          <Card
            cardStyle="whiteCardBg"
            cardHeading="KV Today's Posts"
            cardText="Count"
            cardHeadingStyle="whiteCardBgHeadingColor"
            cardTextStyle="whiteCardBgTxtColor"
            numberStyle="textPrimary"
            number={kisanVedika.kvTodayPostsCount}
            isLoading={kisanVedika.kvTodayPostsCount === null ? true : false}
          />
        </div>
      </div>
      {/*Filtering Layout */}
      <Filter  
        search={validateShowMobileNumberFunctionToUsers(mobileNo)}
        searchPlaceholder={"Mobileno, Username, titles"}
        dateFilter={true}
        from={from}
        setFrom={setFrom}
        to={to}
        enableExcel={validateShowExcelFunctionToUsers(mobileNo)}
        excel_data={excel_data}
        excel_fileName="Kisan_Vedika_Info"
        setTo={setTo}
        handleSubmit={() => {
          handleFilterSubmit();
        }}
        setSearchValue={(e) => setSearchValue(e)}
        searchValue={searchValue}
        searchDisable={!from && !to && !searchValue && !selectedCrop}
        clearFilter={() => {
          setPagenum(1);
          setPagesize(10);
          getKisanVedikaPosts(1, 10);
          setFrom(dateFormat(Date.now(), "yyyy-mm-dd"));
          setTo(dateFormat(Date.now(), "yyyy-mm-dd"));
          setSearchValue("");
          setSelectedCrop("");
          setReplyCountFilter('');
        }}
        crops={crops.map((row) => {
          return {
            label: row.cropName,
            value: row.id,
          };
        })}
        selectedCrop={selectedCrop}
        setSelectedCrop={setSelectedCrop}
        replyCountFilter ={true}
        replyCountFilterValue = {replyCountFilter}
        selectType={(value) => {
        setReplyCountFilter(value)
        }}
        // imageDownload={true}
        // links={[].concat(
        // 	...kisanVedika.postsData
        // 		.map((row) =>
        // 			row.media.map(
        // 				(link) =>
        // 					constants.downloadUrl + link.mediaUrl ,
        // 			),
        // 		)
        // 		.filter((r) => r.length !== 0),
        // )}
      />
      <KVPostsTable
        data={kisanVedika.postsData}
        pagenum={pagenum}
        pagesize={pagesize}
        setPagenum={setPagenum}
        setPagesize={setPagesize}
        callHandle={getKisanVedikaPosts}
        totalCount={totalCountForGrid}
        // totalCount={
        //   isNaN(kisanVedika.kvPostsCount)
        //     ? kisanVedika.postsData[0]?.totalPostsCount
        //     : kisanVedika.kvPostsCount
        // }
        loading={kisanVedika.isLoading}
        isFiltered={kisanVedika.isFiltered}
        deletePost={deletePostSubmit}
      />
    </div>
  );
};

export default KVPosts;
