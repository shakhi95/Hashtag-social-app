import React from "react";
import { BsBoxArrowUpRight, BsJustify } from "react-icons/bs";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import { logOut, setSidebar } from "../actions";

const Navbar = ({ isLogedIn, logOut, setSidebar, showSidebar }) => {
  //
  return (
    <div className="bg-dark py-2">
      <div className="container d-flex align-items-center">
        <div>
          {isLogedIn && (
            <>
              <button
                className={`btn btn-sm btn-outline-primary rounded-pill me-2 d-md-none ${
                  showSidebar ? "active" : ""
                }`}
                onClick={() => setSidebar(!showSidebar)}
              >
                <BsJustify /> مـنو
              </button>
              <Link
                to="/login"
                className="btn btn-sm btn-outline-danger rounded-pill"
                onClick={logOut}
              >
                <BsBoxArrowUpRight /> خـروج
              </Link>
            </>
          )}
        </div>
        <div className="ms-auto">
          <Link to="/">
            <img
              src={logo}
              alt="hashtag-logo"
              style={{ height: "37px", width: "105px", objectFit: "contain" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, ui }) => {
  return { isLogedIn: user.userLog.isLogedIn, showSidebar: ui.showSidebar };
};

export default connect(mapStateToProps, { logOut, setSidebar })(Navbar);
