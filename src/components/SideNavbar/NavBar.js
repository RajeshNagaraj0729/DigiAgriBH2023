/*
React Imports
 */
import React, { useEffect, useState } from "react";
import { Sidenav, Nav, Dropdown, Icon, Sidebar, Navbar } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { NavLink, useLocation } from "react-router-dom";
import * as constants from "../../constants";

let showMenus = false;

// Nav Link Active Implementation
const NavItemLink = React.forwardRef((props, ref) => {
	const location = useLocation();
	return (
		<Nav.Item
			{...props}
			ref={ref}
			active={props.to === location.pathname}
			componentClass={NavLink}
			style={props.admin !== props.viewFor ? { display: "none" } : {}}
		/>
	);
});

//DropDown Active Implementation
const DropDownItemLink = React.forwardRef((props, ref) => {
	const location = useLocation();
	return (
		<Dropdown.Item
			{...props}
			ref={ref}
			active={
				props.to === location.pathname && props.setActiveKey(props.eventKey)
			}
			componentClass={NavLink}
		/>
	);
});

const NavToggle = ({ expand, onChange }) => {
	return (
		<Navbar appearance="subtle" className="nav-toggle">
			<Navbar.Body>
				<Nav pullRight>
					<Nav.Item
						onClick={onChange}
						style={{ width: 56, textAlign: "center" }}
					>
						<Icon icon={expand ? "angle-left" : "angle-right"} />
					</Nav.Item>
				</Nav>
			</Navbar.Body>
		</Navbar>
	);
};

/**
 * SideNAv Implementation
 * @param {Object} props
 * props from main
 */
const NavBar = (props) => {
	const [width, setWidth] = useState(window.innerWidth);
	const [expand, setExpand] = useState(false);
	const admin = localStorage.getItem("admin");
	const handleSelect = (e) => {
		props.setActiveKey(e);
	};
	const { userData = {} } = props;
	const listOfAvilableAccess = constants?.userDataAccess || "";
	const shouldDisplayAccessScreen = userData?.userName === listOfAvilableAccess;
	//Setting device width
	useEffect(() => {
		setWidth(window.innerWidth);
	}, [width]);

	// Returning SideNav
	return (
		<div className="navigationMainSec" style={{ paddingTop: "60px" }}>
			<Sidebar
				style={{ display: "flex", flexDirection: "column" }}
				width={expand && width >= "991" ? 260 : 56}
				collapsible
			>
				<Sidenav
					expanded={width < "991" ? false : expand}
					activeKey={props.activeKey}
					onSelect={handleSelect}
					//defaultOpenKeys={props.openKeys}
					openKeys={props.openKeys}
					onOpenChange={(openKeys) => {
						props.setOpenKeys(openKeys);
					}}
					appearance="subtle"
				>
					<Sidenav.Body>
						<Nav>
							<NavItemLink
								eventKey="1"
								icon={<Icon icon="bar-chart" />}
								to="/home"
								viewFor="normal"
								admin={admin}
							>
								Dashboard
							</NavItemLink>

							<NavItemLink
								eventKey="2-1"
								icon={<Icon icon="database" />}
								to="/users/user-data"
								viewFor="user"
								admin={admin}
							>
								User Data
							</NavItemLink>

							<NavItemLink
								eventKey="11"
								icon={<Icon icon="inr" />}
								to="/mandi-prices"
								viewFor="dev"
								admin={admin}
							>
								Mandi Prices
							</NavItemLink>

							<Dropdown
								placement="rightStart"
								eventKey="2"
								title="Users"
								icon={<Icon icon="user" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="2-1"
									to="/users/user-data"
									icon={<Icon icon="database" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									User Data
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="2-2"
									to="/users/user-notification"
									icon={<Icon icon="bell" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									User Notification
								</DropDownItemLink>
								{shouldDisplayAccessScreen ? (
									<DropDownItemLink
										eventKey="2-3"
										to="/user-userdata"
										icon={<Icon icon="task" />}
										handleSelect={handleSelect}
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										User Data Access Page
									</DropDownItemLink>
								) : (
									<></>
								)}
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="3"
								title="Crop Doctor Results"
								icon={<Icon icon="leaf" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="3-1"
									to="/crop-doctor-total-results"
									icon={<Icon icon="task" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Total Results
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="3-2"
									to="/crop-doctor-analytics"
									icon={<Icon icon="task" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Analytics Results
								</DropDownItemLink>
								{/* commented the below as we currently not using  */}
								{/* <DropDownItemLink
                  eventKey="3-3"
                  to="/prakshep-analytics"
                  icon={<Icon icon="task" />}
                  handleSelect={handleSelect}
                  setActiveKey={(e) => {
                    props.setActiveKey(e);
                    return true;
                  }}
                >
                  Prakshep Stats
                </DropDownItemLink> */}
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="10"
								title="Kisan Vedika"
								icon={<Icon icon="leaf" />}
								style={admin !== "kvadmin" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="10-1"
									to="/kisan-vedika/posts"
									icon={<Icon icon="window-restore" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									KVPosts
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="10-2"
									to="/kisan-vedika/results"
									icon={<Icon icon="window-restore" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									KV Training
								</DropDownItemLink>
							</Dropdown>

							{showMenus && (
								<NavItemLink
									eventKey="12"
									icon={<Icon icon="task" />}
									to="/test-custom-vision"
									viewFor="kvadmin"
									admin={admin}
								>
									Custom Vision
								</NavItemLink>
							)}

							<Dropdown
								placement="rightStart"
								eventKey="6"
								title="Diseases"
								icon={<Icon icon="bug" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="6-1"
									icon={<Icon icon="plus" />}
									to="/diseases/add-problem-cause"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Add Problem Cause
								</DropDownItemLink>
								{showMenus && (
									<DropDownItemLink
										eventKey="6-2"
										icon={<Icon icon="plus" />}
										to="/diseases/add-disease"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Add Disease
									</DropDownItemLink>
								)}
								<DropDownItemLink
									eventKey="6-3"
									icon={<Icon icon="task" />}
									to="/diseases/all-diseases"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									All Diseases
								</DropDownItemLink>
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="7"
								title="Crops"
								icon={<Icon icon="pagelines" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="7-1"
									icon={<Icon icon="plus" />}
									to="/crops/add-crop"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Add Crop
								</DropDownItemLink>
							</Dropdown>

							{showMenus && (
								<Dropdown
									placement="rightStart"
									eventKey="8"
									title="Stages"
									icon={<Icon icon="signal" />}
									style={admin !== "normal" ? { display: "none" } : {}}
									trigger="hover"
								>
									<DropDownItemLink
										eventKey="8-1"
										icon={<Icon icon="plus" />}
										to="/stages/add-stage-type"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Add Stage Type
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="8-1"
										icon={<Icon icon="plus" />}
										to="/stages/add-stage"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Add Stage
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="8-1"
										icon={<Icon icon="plus" />}
										to="/stages/add-stage-task"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Add Stage Task
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="8-3"
										icon={<Icon icon="plus" />}
										to="/stages/stages-json"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Stages Json
									</DropDownItemLink>
								</Dropdown>
							)}

							{showMenus && (
								<Dropdown
									placement="rightStart"
									eventKey="17"
									title="Edit Data"
									icon={<Icon icon="signal" />}
									style={admin !== "translate" ? { display: "none" } : {}}
									trigger="hover"
								>
									<DropDownItemLink
										eventKey="17-1"
										icon={<Icon icon="edit" />}
										to="/stages/stages-list"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Stages Data
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="17-2"
										icon={<Icon icon="edit" />}
										to="/stages/stage-tasks-list"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Stage Tasks Data
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="17-3"
										icon={<Icon icon="edit" />}
										to="/diseases/diseases-causes-list"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Diseases Causes Data
									</DropDownItemLink>
									<DropDownItemLink
										eventKey="17-4"
										icon={<Icon icon="edit" />}
										to="/diseases/diseases-list"
										setActiveKey={(e) => {
											props.setActiveKey(e);
											return true;
										}}
									>
										Diseases Data
									</DropDownItemLink>
								</Dropdown>
							)}

							<Dropdown
								placement="rightStart"
								eventKey="9"
								title="Kisan Sandesh"
								icon={<Icon icon="frame" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="9-1"
									icon={<Icon icon="plus" />}
									to="/kisan-sandesh/news/news-icon"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									News Icon
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="9-1"
									icon={<Icon icon="newspaper-o" />}
									to="/kisan-sandesh/news"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									News
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="9-1"
									icon={<Icon icon="play-circle" />}
									to="/kisan-sandesh/videos"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Videos
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="9-1"
									icon={<Icon icon="lightbulb-o" />}
									to="/kisan-sandesh/tips"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Tips
								</DropDownItemLink>

								<DropDownItemLink
									eventKey="9-1"
									icon={<Icon icon="file-text" />}
									to="/kisan-sandesh/blogs"
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Blogs
								</DropDownItemLink>
							</Dropdown>
							<Dropdown
								placement="rightStart"
								eventKey="4"
								title="All Banners"
								icon={<Icon icon="newspaper-o" />}
								style={admin !== "banner" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="4-1"
									to="/all-banners-page"
									icon={<Icon icon="list-alt" />}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									All Banners
								</DropDownItemLink>
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="4"
								title="Native Store"
								icon={<Icon icon="newspaper-o" />}
								style={admin !== "banner" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="4-1"
									to="/native-dynamic-collections-details"
									icon={<Icon icon="list-alt" />}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Native Dynamic Collection Details
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="4-1"
									to="/native-home-category"
									icon={<Icon icon="list-alt" />}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Native Home Category
								</DropDownItemLink>
							</Dropdown>
							<Dropdown
								placement="rightStart"
								eventKey="10"
								title="Prakashep"
								icon={<Icon icon="map" />}
								style={admin !== "prakshep" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="10-1"
									to="/prakshep"
									icon={<Icon icon="window-restore" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Map Banners
								</DropDownItemLink>
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="10"
								title="Bussiness Analytics"
								icon={<Icon icon="map" />}
								style={admin !== "analytics" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="10-1"
									to="/analytics"
									icon={<Icon icon="window-restore" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Analytics Results
								</DropDownItemLink>
							</Dropdown>

							<NavItemLink
								eventKey="16-1"
								icon={<Icon icon="user" />}
								to="/zonal-ad"
								viewFor="farmlync"
								admin={admin}
							>
								Zonal Manager
							</NavItemLink>

							<NavItemLink
								eventKey="16-2"
								icon={<Icon icon="user" />}
								to="/field-ad"
								viewFor="farmlync"
								admin={admin}
							>
								Field Executive
							</NavItemLink>

							<NavItemLink
								eventKey="16-3"
								icon={<Icon icon="user" />}
								to="/village-ad"
								viewFor="farmlync"
								admin={admin}
							>
								Village Level Executive
							</NavItemLink>

							<NavItemLink
								eventKey="16-2"
								icon={<Icon icon="user" />}
								to="/field-zm"
								viewFor="ZM"
								admin={admin}
							>
								Field Executive
							</NavItemLink>

							<NavItemLink
								eventKey="16-2"
								icon={<Icon icon="user" />}
								to="/village-zm"
								viewFor="ZM"
								admin={admin}
							>
								Village Level Executive
							</NavItemLink>

							<NavItemLink
								eventKey="16-3"
								icon={<Icon icon="user" />}
								to="/village-fe"
								viewFor="FE"
								admin={admin}
							>
								Village Level Executive
							</NavItemLink>

							<NavItemLink
								eventKey="5"
								icon={<Icon icon="database" />}
								to="/collection-details"
								viewFor="banner"
								admin={admin}
							>
								Collection Details
							</NavItemLink>
							<Dropdown
								placement="rightStart"
								eventKey="17"
								title="Kisan Vedika"
								icon={<Icon icon="leaf" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="17-1"
									to="/kv-posts"
									icon={<Icon icon="task" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									All Posts
								</DropDownItemLink>
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="13"
								title="Kisan Bazaar"
								icon={<Icon icon="shopping-bag" />}
								style={admin !== "normal" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="13-1"
									to="/category"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Category
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="13-2"
									to="/sub-category"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Sub Category
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="13-3"
									to="/kb-ads"
									icon={<Icon icon="task" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Ads
								</DropDownItemLink>
							</Dropdown>

							<Dropdown
								placement="rightStart"
								eventKey="14"
								title="ProductAds"
								icon={<Icon icon="logo-ads" />}
								style={admin !== "banner" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="14-1"
									to="/home-products"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Home Product Ads
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="14-2"
									to="/kv-products"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									KisanVedika Product Ads
								</DropDownItemLink>
							</Dropdown>
							<Dropdown
								placement="rightStart"
								eventKey="13"
								title="Native Store"
								icon={<Icon icon="link" />}
								style={admin !== "banner" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="12-1"
									to="/crop-care-deep-linking"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Crop Care Deep Link
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="12-2"
									to="/pest-care-deep-linking"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Pest Care Deep Link
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="12-3"
									to="/disease-deep-linking"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Diseases Deep Link
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="12-4"
									to="/product-deep-linking"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Product Deep Link
								</DropDownItemLink>
								<DropDownItemLink
									eventKey="12-4"
									to="/dynamic-link"
									icon={<Icon icon="plus" />}
									handleSelect={handleSelect}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Bulk Deep Links
								</DropDownItemLink>
							</Dropdown>
							<Dropdown
								placement="rightStart"
								eventKey="4"
								title="Banners"
								icon={<Icon icon="newspaper-o" />}
								style={admin !== "banner" ? { display: "none" } : {}}
								trigger="hover"
							>
								<DropDownItemLink
									eventKey="4-2"
									to="/promotional-banners"
									icon={<Icon icon="bullhorn" />}
									setActiveKey={(e) => {
										props.setActiveKey(e);
										return true;
									}}
								>
									Promotional Banners
								</DropDownItemLink>
							</Dropdown>
							{/* commented the below as we currently not using  */}
							{/* <Dropdown
                placement="rightStart"
                eventKey="15"
                title="In App Notification"
                icon={<Icon icon="shopping-bag" />}
                style={admin !== "normal" ? { display: "none" } : {}}
                trigger="hover"
              >
                <DropDownItemLink
                  eventKey="15-1"
                  to="/inAppNotification"
                  icon={<Icon icon="plus" />}
                  handleSelect={handleSelect}
                  setActiveKey={(e) => {
                    props.setActiveKey(e);
                    return true;
                  }}
                >
                  App Notification
                </DropDownItemLink>
                <DropDownItemLink
                  eventKey="15-2"
                  to="/inAppCriteria"
                  icon={<Icon icon="plus" />}
                  handleSelect={handleSelect}
                  setActiveKey={(e) => {
                    props.setActiveKey(e);
                    return true;
                  }}
                >
                  In App Criteria
                </DropDownItemLink>
                <DropDownItemLink
                  eventKey="15-3"
                  to="/inAppHistory"
                  icon={<Icon icon="task" />}
                  handleSelect={handleSelect}
                  setActiveKey={(e) => {
                    props.setActiveKey(e);
                    return true;
                  }}
                >
                  In App History
                </DropDownItemLink>
              </Dropdown> */}
						</Nav>
					</Sidenav.Body>
				</Sidenav>
				<NavToggle expand={expand} onChange={() => setExpand(!expand)} />
			</Sidebar>
		</div>
	);
};
export default NavBar;
