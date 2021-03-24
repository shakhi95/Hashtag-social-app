import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { connect } from "react-redux";

import { avatars } from "../utils/data";
import { checkIfEnglish } from "../utils/helpers";
import { signup, setMssg } from "../actions";

const SignupForm = ({
  handleSubmit,
  signup,
  userLoading,
  userMssg,
  setMssg,
}) => {
  //
  const [isDown, setIsDown] = useState(false);
  const [avatarId, setAvatarId] = useState("");

  const onSubmit = (formValues) => {
    signup({
      fullname: formValues.signup_fullname,
      username: formValues.signup_username,
      avatarId: avatarId || 0,
      password: formValues.signup_password1,
    });
  };

  return (
    <div
      className="border border-primary py-4 px-3 px-md-5"
      style={{ borderRadius: "1.5rem" }}
    >
      <h3 className="fw-bold text-center">ثـبت نـام کـاربر</h3>
      <div className="text-danger text-center mb-4">
        <small>از نوشتن اطلاعات حساس خودداری کنید!!</small>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="signup_fullname"
          component={renderInputs}
          label="نام و نام خانوادگی:"
          type="text"
          lan="fa"
        />
        <Field
          name="signup_username"
          component={renderInputs}
          label="نام کاربری -انگلیسی:"
          type="text"
        />
        {/* start of avatar gallery mess */}
        <label className="form-label">عـکس پروفایل:</label>
        <button
          type="button"
          className="btn btn-light bg-white border w-100 rounded-pill mb-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setIsDown(!isDown)}
        >
          {avatarId === "" ? "انتخاب کنید..." : `عکس شماره ${avatarId + 1}`}
          {isDown ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        <div style={{ position: "relative" }}>
          <div
            className="row bg-white border rounded justify-content-center p-3"
            style={{
              position: "absolute",
              top: "-10px",
              display: isDown ? "flex" : "none",
            }}
          >
            {avatars.map((avatar, index) => {
              return (
                <div className="col-4 col-sm-3 col-lg-2" key={index}>
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                    }}
                    className={
                      index === avatarId ? "border border-danger rounded" : ""
                    }
                    onClick={() => {
                      setAvatarId(index);
                      setIsDown(false);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* end of avatar gallery mess */}
        <Field
          name="signup_password1"
          component={renderInputs}
          label="رمز عبور:"
          type="password"
        />
        <Field
          name="signup_password2"
          component={renderInputs}
          label="تکرار رمز عبور:"
          type="password"
        />
        <div className="text-center text-danger">
          {userMssg && <small>{userMssg}</small>}
        </div>
        <button
          className="btn btn-primary w-100 rounded-pill my-2"
          type="submit"
          disabled={userLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {userLoading && (
            <span className="spinner-border spinner-border-sm me-2"></span>
          )}
          ثـبت نـام
        </button>
        <Link
          to="/login"
          className={`btn btn-primary w-100 rounded-pill ${
            userLoading && "disabled"
          }`}
          onClick={() => userMssg && setMssg()}
        >
          صـفحه ورود
        </Link>
      </form>
    </div>
  );
};

const renderInputs = ({ input, label, type, meta, lan }) => {
  //
  const inValidClass = meta.error && meta.touched ? "is-invalid" : "mb-3";

  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        {...input}
        className={`form-control text-center rounded-pill  ${inValidClass}`}
        autoComplete="off"
        style={{
          fontFamily: lan === "fa" ? "Yekan" : "sans-serif",
          direction: lan === "fa" ? "rtl" : "ltr",
        }}
      />
      {meta.error && meta.touched && (
        <div className="text-danger mb-3 ps-3">
          <small>{meta.error}</small>
        </div>
      )}
    </div>
  );
};

const validate = (formValues) => {
  //
  const errors = {};

  if (!formValues.signup_fullname || formValues.signup_fullname.length < 4) {
    errors.signup_fullname = "نام وارد شده بسیار کوتاه است.  >=4";
  }

  if (!formValues.signup_username || formValues.signup_username.length < 5) {
    errors.signup_username = "نام کاربری بسیار کوتاه است.  >=5";
  }

  if (!checkIfEnglish(formValues.signup_username)) {
    errors.signup_username = "نام کاربری نامعتبر است.";
  }

  if (!formValues.signup_password1 || formValues.signup_password1.length < 8) {
    errors.signup_password1 = "رمز عبور بسیار کوتاه است.  >=8";
  }

  if (!checkIfEnglish(formValues.signup_password1)) {
    errors.signup_password1 = "رمز عبور نامعتبر است.";
  }

  if (formValues.signup_password1 !== formValues.signup_password2) {
    errors.signup_password2 = "تکرار رمز با خود رمز مطابقت ندارد!";
  }

  return errors;
};

const mapStateToProps = ({ user }) => {
  const mssg =
    user.userMssg.isMssg && user.userMssg.mssgPlace === "signupForm"
      ? user.userMssg.mssgBody
      : "";
  return { userLoading: user.userLoading, userMssg: mssg };
};

const formWrapper = reduxForm({ form: "signupForm", validate })(SignupForm);

export default connect(mapStateToProps, { signup, setMssg })(formWrapper);
