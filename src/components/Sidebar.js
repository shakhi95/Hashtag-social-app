import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { fetchUser, setSidebar } from "../actions";
import { avatars, sidebarLinks } from "../utils/data";
import unknown from "../assets/avatars/unknown.png";

const Sidebar = ({
  userUnqId,
  userLoading,
  userProfile,
  fetchUser,
  setSidebar,
}) => {
  //
  const showSpinner = userLoading || Object.keys(userProfile).length === 0;
  const { pathname } = useLocation();

  useEffect(() => {
    if (Object.keys(userProfile).length === 0) {
      fetchUser(userUnqId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLinks = () => {
    return sidebarLinks.map(({ path, text, icon }, index) => {
      return (
        <Link
          key={index}
          to={path}
          className={`btn btn-outline-primary rounded-pill border-0 text-start w-100 my-1 ${
            pathname === path ? "active" : ""
          }`}
          onClick={() => setSidebar(false)}
        >
          {icon}
          {text}
        </Link>
      );
    });
  };

  return (
    <div
      className="bg-dark text-white py-4 px-3"
      style={{ border: "3px solid #0d6efd", borderRadius: "1rem" }}
    >
      <div className="d-flex flex-column align-items-center">
        <div style={{ width: "120px" }}>
          <img
            src={showSpinner ? unknown : avatars[userProfile.avatarId]}
            alt="user avatar"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>
        <h5 className="mt-2 text-capitalize">
          {showSpinner ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            userProfile.fullname
          )}
        </h5>
        <small
          className="bg-light text-dark fw-bold px-3 rounded-pill mb-3"
          style={{ fontFamily: "sans-serif" }}
        >
          {showSpinner ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            userProfile.username
          )}
        </small>
        {renderLinks()}
        <a
          href="https://github.com/shakhi95/Hashtag-social-app"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline-primary rounded-pill border-0 text-start w-100 my-1"
          onClick={() => setSidebar(false)}
        >
          <FaGithub className="me-2 me-md-3" />
          گیت هاب پروژه
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user: {
    userLog: { userUnqId },
    userProfile,
    userLoading,
  },
}) => {
  //
  return { userUnqId, userLoading, userProfile };
};

export default connect(mapStateToProps, { fetchUser, setSidebar })(Sidebar);
