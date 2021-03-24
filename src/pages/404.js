import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logOut } from "../actions";
import img404 from "../assets/404.png";

const Page404 = ({ logOut, showMssg }) => {
  //
  const { pathname } = useLocation();

  const renderMssg = () => {
    if (showMssg && pathname === "/nodata404") {
      return (
        <>
          <h5 className="text-danger">اطلاعات کاربر در API یافت نشد.</h5>
          <div className="d-flex justify-content-center mt-3">
            <Link
              to="/login"
              className="btn btn-primary py-0 me-1"
              onClick={logOut}
            >
              صفحه ورود
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary py-0"
              onClick={logOut}
            >
              صفحه ثبت نام
            </Link>
          </div>
        </>
      );
    }
    if (showMssg && pathname === "/noapi404") {
      return (
        <>
          <h5 className="text-danger">ارتباط با API برقرار نشد.</h5>
          <Link to="/" className="btn btn-danger mt-2 py-0">
            صفحه اصلی
          </Link>
        </>
      );
    }

    return (
      <>
        <h4>صفحه مورد نظر یافت نشد.</h4>
        <Link to="/" className="btn btn-danger mt-2 py-0">
          صفحه اصلی
        </Link>
      </>
    );
  };

  return (
    <div className="container min-vh-100 py-4">
      <div className="row">
        <div className="col-sm-9 col-md-6 col-lg-4 mx-auto text-center">
          <img
            src={img404}
            alt="error"
            style={{ width: "100%", objectFit: "contain" }}
          />
          {renderMssg()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  const {
    userProfile,
    userLog: { isLogedIn },
  } = user;

  const showMssg = isLogedIn && Object.keys(userProfile).length === 0;

  return { showMssg };
};

export default connect(mapStateToProps, { logOut })(Page404);
