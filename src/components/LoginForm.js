import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signin, setMssg } from "../actions";

const LoginForm = ({
  handleSubmit,
  signin,
  userLoading,
  userMssg,
  setMssg,
}) => {
  //
  const onSubmit = (formValues) => {
    signin({
      username: formValues.login_username,
      password: formValues.login_password,
    });
  };

  return (
    <div
      className="border border-primary border-2 py-4 px-3 "
      style={{ borderRadius: "1.5rem" }}
    >
      <h3 className="fw-bold mb-4 text-center">ورود کـاربر</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="login_username"
          component={renderInputs}
          label="نام کاربری:"
          type="text"
        />
        <Field
          name="login_password"
          component={renderInputs}
          label="رمز عبور:"
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
          ورود
        </button>
        <Link
          to="/signup"
          className={`btn btn-primary w-100 rounded-pill ${
            userLoading && "disabled"
          }`}
          onClick={() => userMssg && setMssg()}
        >
          ثـبت نـام
        </Link>
      </form>
    </div>
  );
};

const renderInputs = ({ input, label, type, meta }) => {
  //
  const inValidClass = meta.error && meta.touched ? "is-invalid" : "";

  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        {...input}
        className={`form-control text-center rounded-pill mb-3 ${inValidClass}`}
        autoComplete="off"
        style={{ fontFamily: "sans-serif", direction: "ltr" }}
      />
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.login_username) {
    errors.login_username = "no username";
  }

  if (!formValues.login_password) {
    errors.login_password = "no password";
  }

  return errors;
};

const mapStateToProps = ({ user }) => {
  const mssg =
    user.userMssg.isMssg && user.userMssg.mssgPlace === "loginForm"
      ? user.userMssg.mssgBody
      : "";
  return { userLoading: user.userLoading, userMssg: mssg };
};

const formWrapper = reduxForm({ form: "loginForm", validate })(LoginForm);

export default connect(mapStateToProps, { signin, setMssg })(formWrapper);
