import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import SendMssgForm from "./SendMssgForm";

const SendMssgModal = ({ modal, sender }) => {
  //
  return ReactDOM.createPortal(
    <div
      className={`modal ${modal.isShown ? "d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(7, 0, 10, 0.63)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header py-1 bg-light">
            <h5 className="modal-title fw-bold text-success">ارسال پیام</h5>
          </div>
          <div className="modal-body">
            <SendMssgForm sender={sender} receiver={modal.receiver} />
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#mailModal")
  );
};

const mapStateToProps = ({ ui, user }) => {
  //
  return {
    modal: ui.mailModal,
    sender: { name: user.userProfile.fullname, id: user.userProfile.userUnqId },
  };
};

export default connect(mapStateToProps)(SendMssgModal);
