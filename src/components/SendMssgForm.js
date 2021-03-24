import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { setMailModal, sendMail } from "../actions";

const SendMssgForm = ({
  handleSubmit,
  receiver,
  sender,
  setMailModal,
  reset,
  sendMail,
  loading,
  mailMssg,
}) => {
  //
  const onSubmit = (formValues) => {
    if (Object.keys(formValues).length !== 0) {
      sendMail(
        {
          sender,
          receiver,
          title: formValues.sendMail_title,
          body: formValues.sendMail_body,
        },
        reset
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label mb-1">ارسال کننده:</label>
        <input
          type="text"
          className="form-control"
          disabled={true}
          defaultValue={sender.name}
        />
      </div>
      <div className="mb-3">
        <label className="form-label mb-1">دریافت کننده:</label>
        <input
          type="text"
          className="form-control"
          disabled={true}
          defaultValue={receiver.name}
        />
      </div>
      <div className="mb-3">
        <label className="form-label mb-1">عنوان پیام:</label>
        <Field
          name="sendMail_title"
          type="text"
          component="input"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label mb-1">متن پیام:</label>
        <Field
          name="sendMail_body"
          type="text"
          component="textarea"
          className="form-control"
          style={{ height: "80px", maxHeight: "120px" }}
        />
      </div>
      <div>
        <Field name="forErrors" component={renderErrors} />
        {mailMssg.isShown && (
          <small className={`text-${mailMssg.mssgClass}`}>
            {mailMssg.mssgBody}
          </small>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-sm btn-secondary me-1"
          disabled={loading || mailMssg.isShown}
          onClick={() => {
            reset();
            setMailModal();
          }}
        >
          انصراف
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-success"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading || mailMssg.isShown}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2"></span>
          )}
          ارسال
        </button>
      </div>
    </form>
  );
};

const renderErrors = ({ meta }) => {
  return (
    <small className="text-danger d-block">{meta.touched && meta.error}</small>
  );
};

const validate = (formValues) => {
  let errors = {};

  if (!formValues.sendMail_body || formValues.sendMail_body.length < 10) {
    errors.forErrors = "متن پیام کوتاه است. >=10";
  }

  if (!formValues.sendMail_title || formValues.sendMail_title.length < 6) {
    errors.forErrors = "متن عنوان کوتاه است. >=6";
  }

  return errors;
};

const mapStateToProps = ({ mail }) => {
  //
  const mailMssg =
    mail.mailMssg.isShown && mail.mailMssg.mssgPlace === "sendMail"
      ? mail.mailMssg
      : "";

  return { loading: mail.sendMailLoading, mailMssg };
};

const formWrapper = reduxForm({ form: "sendMailForm", validate })(SendMssgForm);

export default connect(mapStateToProps, { setMailModal, sendMail })(
  formWrapper
);
