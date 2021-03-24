import React from "react";
import { avatars } from "../utils/data";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setMailModal } from "../actions";

const UserBox = ({ userProfile, setMailModal }) => {
  //
  return (
    <div className="border border-primary bg-light py-1 mb-2 rounded">
      <div className="row align-items-center">
        <div className="col-3 col-sm-2 text-center">
          <img
            src={avatars[userProfile.avatarId]}
            alt="user"
            style={{ width: "40px" }}
          />
        </div>
        <div className="col-5 col-sm-4 text-center">
          <Link
            to={`/users/${userProfile.userUnqId}`}
            className="text-decoration-none"
          >
            <h6 className="mb-0">{userProfile.fullname}</h6>
          </Link>
        </div>
        <div className="d-none d-sm-block col-sm-3 text-center">
          <small className="fw-bold" style={{ fontFamily: "sans-serif" }}>
            {userProfile.username}
          </small>
        </div>
        <div className="col-4 col-sm-3 text-center">
          <button
            className="btn btn-sm btn-primary rounded-pill py-0"
            onClick={() =>
              setMailModal(true, {
                name: userProfile.fullname,
                id: userProfile.userUnqId,
              })
            }
          >
            ارسال پیام
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setMailModal })(UserBox);
