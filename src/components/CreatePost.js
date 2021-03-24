import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createPost } from "../actions";

const CreatePost = ({
  handleSubmit,
  createPost,
  reset,
  postLoading,
  postMssg,
}) => {
  //

  const onSubmit = (formValues) => {
    const hashtags = [
      formValues.create_hashtag1,
      formValues.create_hashtag2,
      formValues.create_hashtag3,
      formValues.create_hashtag4,
      formValues.create_hashtag5,
    ];

    createPost(
      {
        body: formValues.create_text,
        hashtags: hashtags.filter((item) => item !== undefined),
      },
      reset
    );
  };

  return (
    <div
      className="border border-primary border-2 bg-light py-3 px-2 px-sm-4 mb-3"
      style={{ borderRadius: "1rem" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>ارسال پست:</h5>
        <Field
          name="create_text"
          label="متن خود را بنویسید..."
          component={renderTextarea}
          type="text"
        />
        <div className="row justify-content-center px-1">
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <small>هشتگ ها:</small>
          </div>
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <Field
              name="create_hashtag1"
              label="#"
              type="text"
              component={renderInputs}
            />
          </div>
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <Field
              name="create_hashtag2"
              label="#"
              type="text"
              component={renderInputs}
            />
          </div>
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <Field
              name="create_hashtag3"
              label="#"
              type="text"
              component={renderInputs}
            />
          </div>
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <Field
              name="create_hashtag4"
              label="#"
              type="text"
              component={renderInputs}
            />
          </div>
          <div className="col-4 col-md-3 col-lg-2 mt-2">
            <Field
              name="create_hashtag5"
              label="#"
              type="text"
              component={renderInputs}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <div>
            <Field name="forErrors" component={renderErrors} />
            {postMssg.isMssg && (
              <small className={`text-${postMssg.mssgClass}`}>
                {postMssg.mssgBody}
              </small>
            )}
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={postLoading || postMssg.isMssg}
            >
              {postLoading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              پست کن !
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const renderTextarea = ({ input, label }) => {
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder={label}
        id="createFormText"
        {...input}
        style={{ height: "100px", borderRadius: "1rem" }}
      ></textarea>
      <label htmlFor="createFormText">{label}</label>
    </div>
  );
};

const renderInputs = ({ input, label }) => {
  return (
    <input
      className="form-control form-control-sm"
      placeholder={label}
      autoComplete="off"
      {...input}
    />
  );
};

const renderErrors = ({ meta }) => {
  return (
    <small className="text-danger">{meta.submitFailed && meta.error}</small>
  );
};

const validate = (formValues) => {
  let errors = {};
  const hashtags = [
    formValues.create_hashtag1,
    formValues.create_hashtag2,
    formValues.create_hashtag3,
    formValues.create_hashtag4,
    formValues.create_hashtag5,
  ];
  const emptyHashtagInput = hashtags.filter((item) => item === undefined);

  if (emptyHashtagInput.length > 3) {
    errors.forErrors = "حداقل دو هشتگ لازم است";
  }

  if (!formValues.create_text || formValues.create_text.length < 10) {
    errors.forErrors = "متن پست کوتاه است. >=10";
  }

  return errors;
};

const mapStateToProps = ({ post }) => {
  const postMssg =
    post.postMssg.isMssg && post.postMssg.mssgPlace === "createForm"
      ? post.postMssg
      : "";
  return { postLoading: post.postLoading, postMssg };
};

const formWrapper = reduxForm({ form: "createForm", validate })(CreatePost);

export default connect(mapStateToProps, { createPost })(formWrapper);
