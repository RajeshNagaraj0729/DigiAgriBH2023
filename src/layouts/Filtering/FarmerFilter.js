/**
 * React imports
 */
import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import dateFormat from "dateformat";
import { Input } from "rsuite";
/**
 * Cutsom imports
 */
import TextInput from "../../components/Common/TextInput";
import ExcelFileDownload from "../../components/DownloadOptions/ExcelFileDownload";
import ImagesDownload from "../../components/DownloadOptions/ImagesDownload";
import CustomSelect from "../../components/Select/Select";

/**
 * filter layout for cropdoc and userdata
 * @param {props} props
 */
const FarmerFilter = (props) => {
  return (
    <div>
      <div className="tableMainSection cardShadow space-md-inr">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <div>&nbsp;</div>
            <div>
              <Input
                placeholder="Name"
                value={props.name}
                onChange={(e) => props.setName(e)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <div>&nbsp;</div>
            <div>
              <Input
                placeholder="Village"
                value={props.village}
                onChange={(e) => props.setVillage(e)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <div>&nbsp;</div>
            <div>
              <Input
                placeholder="Pincode"
                value={props.pincode}
                //onChange={(e) => props.setPincode(e)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <div>&nbsp;</div>
            <div>
              <Input
                placeholder="Phone"
                value={props.phone}
                //onChange={(e) => props.setPhone(e)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <div>&nbsp;</div>
            <div>
              <CustomSelect
                data={[
                  { label: "Yes", value: "YES" },
                  { label: "No", value: "NO" },
                ]}
                placeholder="IsActive"
                //onSelect={(value) => props.setIsActive(value)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 justify-content-start align-items-center">
            <div>&nbsp;</div>
            <div>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Input some value</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <Button
                    className="btn-md mr-1"
                    onClick={() => props.handleSubmit()}
                    disabled={props.searchDisable}
                    style={{ cursor: "pointer" }}
                  >
                    Submit
                  </Button>
                </span>
              </OverlayTrigger>
              <Button
                className="btn-md btn-danger"
                onClick={() => props.clearFilter()}
              >
                Clear{/* <i className="fa fa-remove"></i> */}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerFilter;
