import React from "react";
import { connect } from "react-redux";
import { setActiveMail, setDeleteModal, setMailModal } from "../actions";
import { getFarsiDate } from "../utils/helpers";

const MailPreview = ({ mail, setActiveMail, setDeleteModal, setMailModal }) => {
  //
  if (Object.keys(mail).length === 0) {
    return <div></div>;
  }

  const renderDeleteModalBody = () => {
    return (
      <>
        <small className="text-muted d-block">
          آیا از حذف این پیام مطمئن هستید؟
        </small>
        <small className="text-muted d-block mb-2">
          پیام برای فرستنده و گیرنده حذف خواهد شد.
        </small>
        <small className="text-muted d-block">عنوان پیام:</small>
        <small>{mail.title}</small>
      </>
    );
  };

  return (
    <div className="mt-5">
      <h6 className="mb-0">نمایش پیام</h6>
      <hr className="mt-2" />
      <div className="row">
        <div className="col-sm-3 mb-2">
          <small className="text-muted">نام فرستنده:</small>
        </div>
        <div className="col-sm-9">
          <small>{mail.sender.name}</small>
        </div>
        <div className="col-sm-3 mb-2">
          <small className="text-muted">نام گیرنده:</small>
        </div>
        <div className="col-sm-9">
          <small>{mail.receiver.name}</small>
        </div>
        <div className="col-sm-3 mb-2">
          <small className="text-muted">تاریخ ارسال:</small>
        </div>
        <div className="col-sm-9">
          <small>{getFarsiDate(mail.timeStamp)}</small>
        </div>
        <div className="col-sm-3 mb-2">
          <small className="text-muted">عنوان پیام:</small>
        </div>
        <div className="col-sm-9">
          <small>{mail.title}</small>
        </div>
        <div className="col-sm-3 mb-2">
          <small className="text-muted">متن پیام:</small>
        </div>
        <div className="col-sm-9">
          <h6 className="mb-0">{mail.body}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5 mb-3">
        {mail.type === "toMe" && (
          <button
            className="btn btn-sm btn-success py-0 rounded-pill"
            onClick={() => setMailModal(true, mail.sender)}
          >
            ارسال پاسخ
          </button>
        )}
        <button
          className="btn btn-sm btn-danger mx-2 py-0 rounded-pill"
          onClick={() =>
            setDeleteModal(
              true,
              "حذف پیام",
              renderDeleteModalBody(),
              `/messages/${mail.id}`
            )
          }
        >
          حذف پیام
        </button>
        <button
          className="btn btn-sm btn-primary py-0 rounded-pill"
          onClick={() => setActiveMail({})}
        >
          بستن نمایش
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ mail }) => {
  //
  return { mail: mail.activeMail };
};

export default connect(mapStateToProps, {
  setActiveMail,
  setDeleteModal,
  setMailModal,
})(MailPreview);
