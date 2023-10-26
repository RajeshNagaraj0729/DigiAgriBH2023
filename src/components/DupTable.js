import React, { useState } from "react";
import exportFromJSON from "export-from-json";
import { Button } from "reactstrap";
import * as Constants from "../constants";
import dateFormat from "dateformat";
const ExcelFileDownload = (props) => {
  const fileName = "Data";
  const exportType = "csv";
  const [disable, setDisable] = useState(false);
  const data = props.data.map((row) => {
    return {
      CreatedOn: dateFormat(row.createdOn, "dd/mm/yyyy"),
      Username: `${row.userdata[0].firstName + row.userdata[0].lastName}`,
      MobileNumber: row.userdata[0].phone.substring(
        3,
        row.userdata[0].phone.length
      ),
      Image: Constants.mediaUrl + row.imageUrl + Constants.sasToken,
      Result:
        row.diagnosisDetails === null
          ? "No Data Found"
          : row.diagnosisDetails[0].causeInfo[0].name,
    };
  });
  return (
    <div className="btnStyle">
      <Button
        onClick={() => {
          exportFromJSON({ data, fileName, exportType });
          setDisable(true);
        }}
        disabled={disable}
        size="sm"
      >
        Export Data <i className="fa fa-file-excel-o"></i>
      </Button>
    </div>
  );
};

export default ExcelFileDownload;
