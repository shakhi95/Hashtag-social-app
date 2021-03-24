import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import outFirstImg from "../assets/outFirst.png";
import signupImg from "../assets/signup.jpg";
import { SignupForm } from "../components";

const Signup = ({ isLogedIn }) => {
  //

  if (isLogedIn) {
    return (
      <div className="container min-vh-100 py-4">
        <div className="row">
          <div className="col-sm-9 col-md-6 col-lg-4 mx-auto text-center">
            <img
              src={outFirstImg}
              alt="outFirstImg"
              style={{ width: "100%", objectFit: "contain" }}
            />
            <h5>
              برای <strong>ثبت نام</strong> کاربر جدید ابتدا از حساب خود خارج
              شوید.
            </h5>
            <Link to="/" className="btn btn-danger mt-2 py-0">
              صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row align-items-start min-vh-100 py-4">
        <div className="col-md-7">
          <SignupForm />
        </div>
        <div className="col-md-5 d-none d-md-block">
          <img
            src={signupImg}
            alt="signup"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isLogedIn: state.user.userLog.isLogedIn };
};

export default connect(mapStateToProps)(Signup);
