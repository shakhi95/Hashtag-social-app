import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  setDeleteModal,
  fetchPosts,
  fetchMails,
  setActiveMail,
} from "../actions";
import myApi from "../api/myApi";

const DeleteModal = ({
  modal,
  setDeleteModal,
  fetchPosts,
  fetchMails,
  setActiveMail,
}) => {
  //
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    setLoading(true);
    try {
      await myApi.delete(modal.deleteUrl);
      setDeleteModal();
      fetchPosts();
      fetchMails();
      setActiveMail({});
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return ReactDOM.createPortal(
    <div
      className={`modal ${modal.isShown ? "d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(7, 0, 10, 0.63)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header py-1 bg-light">
            <h5 className="modal-title fw-bold text-danger">{modal.title}</h5>
          </div>
          <div className="modal-body">{modal.body}</div>
          <div className="modal-footer py-1 bg-light">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              disabled={loading}
              onClick={() => setDeleteModal()}
            >
              انصراف
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={deleteItem}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              حـذف
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#deleteModal")
  );
};

const mapStateToModal = ({ ui }) => {
  //
  return { modal: ui.deleteModal };
};

export default connect(mapStateToModal, {
  setDeleteModal,
  fetchPosts,
  fetchMails,
  setActiveMail,
})(DeleteModal);
