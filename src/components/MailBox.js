import React from "react";
import { FaEnvelope, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { howLongAgo } from "../utils/helpers";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveMail } from "../actions";

const MailBox = ({ mail, setActiveMail }) => {
  return (
    <div className="bg-light py-1 border border-primary rounded mb-2">
      <div className="row align-items-center text-center">
        <div className="col-2 col-lg-1">
          <div className="d-flex justify-content-center">
            <FaEnvelope
              className="text-warning"
              style={{ transform: "translateX(-70%)" }}
            />
            {mail.type === "toOthers" ? (
              <FaArrowUp className="position-absolute text-success" />
            ) : (
              <FaArrowDown className="position-absolute text-danger" />
            )}
          </div>
        </div>
        <div className="col-3 px-0 col-lg-3">
          <small>{mail.title}</small>
        </div>
        <div className="col-3 col-lg-3">
          <small className="text-muted me-1">
            {mail.type === "toOthers" ? "به:" : "از:"}
          </small>
          <Link
            to={`/users/${
              mail.type === "toOthers" ? mail.receiver.id : mail.sender.id
            }`}
            className="text-decoration-none"
          >
            <small>
              {mail.type === "toOthers" ? mail.receiver.name : mail.sender.name}
            </small>
          </Link>
        </div>
        <div className="d-none d-lg-block col-lg-3">
          <small>{howLongAgo(mail.timeStamp)}</small>
        </div>
        <div className="col-3 col-lg-2">
          <div>
            <button
              className="btn btn-sm btn-primary py-0 rounded-pill"
              onClick={() => setActiveMail(mail)}
            >
              مشاهده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setActiveMail })(MailBox);
