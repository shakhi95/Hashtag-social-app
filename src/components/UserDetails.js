import React from "react";
import coverImg from "../assets/cover.png";
import { avatars } from "../utils/data";
import { getFarsiDate } from "../utils/helpers";
import unknown from "../assets/avatars/unknown.png";

const UserDetails = ({ loading, profile }) => {
  //
  const showSpinner = loading || Object.keys(profile).length === 0;

  return (
    <div
      className="border border-primary border-2 mb-3"
      style={{ borderRadius: "1rem" }}
    >
      <div>
        <img
          src={coverImg}
          alt="cover"
          style={{
            width: "100%",
            objectFit: "contain",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        />
      </div>
      <div
        className="bg-light py-2 px-3"
        style={{
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
          position: "relative",
        }}
      >
        <div
          className="col-2"
          style={{
            position: "absolute",
            left: "1.5rem",
            top: "0",
            transform: "translateY(-50%)",
          }}
        >
          <img
            src={showSpinner ? unknown : avatars[profile.avatarId]}
            alt="user"
            className="bg-dark rounded-circle w-100"
          />
        </div>
        <h3 className="fw-bold mt-2 text-capitalize">
          {showSpinner ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            profile.fullname
          )}
        </h3>
        <div className="mt-2">
          <small
            className="rounded-pill bg-dark text-white text-uppercase px-3"
            style={{
              fontFamily: "sans-serif",
            }}
          >
            {showSpinner ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              profile.username
            )}
          </small>
        </div>
        <small className="mt-2">
          عضویت:{" "}
          {showSpinner ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            getFarsiDate(profile.timeStamp)
          )}
        </small>
      </div>
    </div>
  );
};

export default UserDetails;
