/**
 * React imports
 */
import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Input } from "rsuite";
import dateFormat from "dateformat";

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
const KvFilter = (props) => {
  return (
    <div>
      <div className="row mb-3">
        {/* Excel file download */}
        <div className="d-flex col-12 col-sm-12 col-md-6 col-lg-6 align-items-center">
          {/* {props.imageDownload && (
            <ImagesDownload
              name="Download All Images"
              links={props.links}
              foldername="All Images"
            />
          )} */}
          {/* {props.excel_data && (
            <ExcelFileDownload
              data={props.excel_data}
              fileName={props.excel_fileName}
              name="Export Data"
            />
          )} */}
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6"></div>
      </div>

      <div className="tableMainSection cardShadow space-md-inr">
        <div className="row">
          {/* Dates filter */}
          {props.dateFilter && (
            <>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <TextInput
                  labelName="From:"
                  id="from"
                  value={props.from}
                  labelClass="bannerLableStyle"
                  divClass="form-group mb-sm-0"
                  type="date"
                  inputClass="inputStyle"
                  onChange={(e) => {
                    props.setFrom(e.target.value);
                  }}
                  max={dateFormat(Date.now(), "yyyy-mm-dd")}
                />
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <TextInput
                  labelName="To:"
                  id="to"
                  value={props.to}
                  labelClass="bannerLableStyle"
                  divClass="form-group mb-0"
                  type="date"
                  inputClass="inputStyle"
                  onChange={(e) => {
                    props.setTo(e.target.value);
                  }}
                  min={props.from}
                  max={dateFormat(Date.now(), "yyyy-mm-dd")}
                />
              </div>
            </>
          )}
          {props.versionFilter && (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div>&nbsp;</div>
              <div>
                <CustomSelect
                  data={props.versions}
                  placeholder="Select Version"
                  search={false}
                  onSelect={(value) => props.setVersion(value)}
                  name="select-lang"
                  value={props.version}
                />
              </div>
            </div>
          )}
          {props.languages && (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div>&nbsp;</div>
              <div>
                <CustomSelect
                  data={props.languages}
                  placeholder="Select Language"
                  search={false}
                  onSelect={(value) => props.setLanguage(value)}
                  name="select-lang"
                  value={props.language}
                />
              </div>
            </div>
          )}
          {props.crops && (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div>&nbsp;</div>
              <div>
                <CustomSelect
                  data={props.crops}
                  placeholder="Select Crop"
                  search={false}
                  onSelect={(value) => props.setSelectedCrop(value)}
                  name="select-crop"
                  value={props.selectedCrop}
                />
              </div>
            </div>
          )}
          {props.states && (
            <>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <CustomSelect
                    data={props.states}
                    placeholder="Select State"
                    onSelect={(value) => props.setSelectedState(value)}
                    name="select-state"
                    value={props.selectedState}
                    search
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <CustomSelect
                    data={props.districts}
                    placeholder="Select District"
                    onSelect={(value) => props.setSelectedDistrict(value)}
                    name="select-district"
                    value={props.selectedDistrict}
                    search
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <Input
                    placeholder="Pincode"
                    value={props.selectedPostCode}
                    onChange={(e) => props.setSelectedPostCode(e)}
                  />
                </div>
              </div>
            </>
          )}

          {props.filterType && (
            <>
              {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <CustomSelect
                    data={[
                      { label: "Detected", value: "Detected" },
                      { label: "UnDetected", value: "UnDetected" },
                    ]}
                    placeholder="Select Type"
                    search={false}
                    onSelect={(value) => props.selectType(value)}
                    name="select-type"
                    value={props.filterTypeValue}
                  />
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <label style={{ alignSelf: "center", marginTop: "5px" }}>
                    <input
                      type="checkbox"
                      style={{ marginRight: "4px" }}
                      checked={props.includeMetricStress}
                      onChange={() =>
                        props.setIncludeMetricStress(!props.includeMetricStress)
                      }
                    />
                    With Metric Stress
                  </label>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <label style={{ alignSelf: "center", marginTop: "5px" }}>
                    <input
                      type="checkbox"
                      style={{ marginRight: "4px" }}
                      checked={props.includeTensorFlow}
                      onChange={() =>
                        props.setIncludeTensorFlow(!props.includeTensorFlow)
                      }
                    />
                    Show Tensor Flow
                  </label>
                </div>
              </div> */}
              {/* <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div>&nbsp;</div>
                <div>
                  <CustomSelect
                    data={[
                      { label: "true", value: true },
                      { label: "false", value: false },
                    ]}
                    placeholder="IsTrained"
                    search={false}
                    onSelect={(value) => props.setIsTrained(value)}
                    name="select-type"
                    value={props.isTrained}
                  />
                </div>
              </div> */}
            </>
          )}
          {props.search && (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div>&nbsp;</div>
              <div>
                <Input
                  placeholder={props.searchPlaceholder}
                  value={props.searchValue}
                  onChange={(e) => props.setSearchValue(e)}
                />
              </div>
            </div>
          )}
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

export default KvFilter;
