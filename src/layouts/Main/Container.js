//React Imports
import React from "react";
import { Container, Content, Header } from "rsuite";

//Custom Imports
import Logo from "../../assets/images/bighaat-header-logo.png";
import NavBar from "../../components/SideNavbar/NavBar";
import "../../App.css";
import * as constants from "../../constants";

/**
 * Displaying Navbar and header for all pages except login page.
 * @param {Object} props
 */
const MainContainer = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Container>
      <Header>
        <div className="container-fluid mainContainer">
          <div className="row">
            <div className="dashHeader dashFixedHeader dashHeaderShadow">
              <div className="col-2 col-md-3 col-lg-3 col-xl-2">
                {/* <div className="navigationIconSec">
                  {window.innerWidth > "991" && (
                    <button
                      onClick={() => props.setIsNavOpen(!props.isNavOpen)}
                      className={props.isNavOpen ? "navOpen" : "navClose"}
                    >
                      <i className={"fa fa-bars"}></i>
                    </button>
                  )}
                </div> */}
                <a href="/home" className="headerLogo">
                  <img src={Logo} alt="bighaat" />
                </a>
              </div>
              <div className="col-9 col-md-8 col-lg-8 col-xl-9">
                <div className="mr-5 mt-1" style={{ float: "right" }}>
                  {user && (
                    <div className="userNameSec">
                      {/* <div>
                        <img
                          src={
                            constants.mediaUrl + user?.pp + constants.sasToken
                          }
                          height="30px"
                          width="30px"
                          style={{ borderRadius: "50%" }}
                          alt={user?.pp}
                        />
                      </div> */}
                      <div>
                        <h2 className="userNameStyle">{user?.userName}</h2>
                        <p className="userMobileStyle">{user?.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-1 col-md-1 col-lg-1 col-xl-1">
                <div style={{ float: "right" }}>
                  <button
                    onClick={() => props.logout()}
                    className="logoutStyle"
                  >
                    <i className="fa fa-sign-out"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Header>

      {/* <div
            className={
              props.isNavOpen
                ? "col-2 col-sm-1 col-md-1 col-lg-3 col-xl-2"
                : "col minNavStyle"
            }
          > */}
      <div className="show-fake-browser sidebar-page">
        <Container>
          <NavBar
            isOpen={props.isNavOpen}
            activeKey={props.activeKey}
            setActiveKey={props.setActiveKey}
            openKeys={props.openKeys}
            setOpenKeys={props.setOpenKeys}
            setIsOpen={() => props.setIsNavOpen(!props.isNavOpen)}
            userData ={user}
          />
          {/* </div> */}
          {/* <div
            className={
              props.isNavOpen
                ? "col-10 col-sm-11 col-md-11 col-lg-9 col-xl-10 contentInrMain"
                : "col-11Large contentInrMain"
            }
          > */}
          <Content className="content">
            <div
              className="container-fluid bodyMainContainer"
              style={{
                paddingLeft: "15px",
                backgroundColor: "#f1f4f6",
              }}
            >
              {props.component}
            </div>
          </Content>
        </Container>
      </div>
      {/* </div> */}
    </Container>
  );
};

export default MainContainer;
