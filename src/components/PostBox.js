import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaTrashAlt } from "react-icons/fa";
import { avatars } from "../utils/data";
import { howLongAgo } from "../utils/helpers";
import { connect } from "react-redux";
import myApi from "../api/myApi";
import { setDeleteModal } from "../actions";

const PostBox = ({ postDetails, userUnqId, setDeleteModal }) => {
  //
  const [likeLoading, setLikeLoading] = useState(false);

  const like = async () => {
    setLikeLoading(true);
    try {
      await myApi.patch(`/posts/${postDetails.id}`, {
        likes: postDetails.likes.concat(userUnqId),
      });
      postDetails.likes.push(userUnqId);
    } catch (error) {
      console.log(error);
    }
    setLikeLoading(false);
  };

  const disLike = async () => {
    setLikeLoading(true);
    try {
      await myApi.patch(`/posts/${postDetails.id}`, {
        likes: postDetails.likes.filter((likerId) => likerId !== userUnqId),
      });
      postDetails.likes = postDetails.likes.filter(
        (likerId) => likerId !== userUnqId
      );
    } catch (error) {
      console.log(error);
    }
    setLikeLoading(false);
  };

  const renderLikeBotton = () => {
    if (likeLoading) {
      return <FaHeart className="text-muted" />;
    }

    if (postDetails.likes.includes(userUnqId)) {
      return (
        <FaHeart
          className="text-danger like-btn"
          onClick={disLike}
          style={{ cursor: "pointer" }}
        />
      );
    } else {
      return (
        <FaRegHeart
          className="text-danger like-btn"
          onClick={like}
          style={{ cursor: "pointer" }}
        />
      );
    }
  };

  const renderModalBody = () => {
    return (
      <>
        <small className="text-muted d-block">
          آیا از حذف این پست مطمئن هستید؟
        </small>
        <small className="text-muted d-block">متن پست:</small>
        <small>{postDetails.body}</small>
      </>
    );
  };

  return (
    <div className="bg-light border border-primary rounded mb-3">
      <div className=" d-flex align-items-center py-1 px-3">
        <img
          src={avatars[postDetails.authorProfile.avatarId]}
          alt="user avatar"
          className="me-2"
          style={{ width: "30px", objectFit: "contain" }}
        />
        <Link
          to={
            userUnqId === postDetails.authorProfile.userUnqId
              ? "/"
              : `/users/${postDetails.authorProfile.userUnqId}`
          }
          className="text-decoration-none"
          title="مشاهده پروفایل"
        >
          <h6 className="m-0">{postDetails.authorProfile.fullname}</h6>
        </Link>
        <small className="text-muted ms-auto">
          {howLongAgo(postDetails.timeStamp)}
        </small>
      </div>
      <hr className="mt-0" />
      <div className="px-4">
        <h6>{postDetails.body}</h6>
        <br />
        {postDetails.hashtags.map((hash, inx) => {
          return (
            <small key={hash + inx} className="text-primary d-block">
              #{hash}
            </small>
          );
        })}
      </div>
      <hr className="mb-0" />
      <div className="d-flex justify-content-start align-items-center px-3 py-1">
        <div className="d-flex align-items-center">
          {renderLikeBotton()}
          <small className="ms-1">{postDetails.likes.length}</small>
        </div>
        {userUnqId === postDetails.authorProfile.userUnqId && (
          <div className="d-flex align-items-center ms-auto">
            <FaTrashAlt
              className="icon-delete text-muted"
              title="حذف این پست"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setDeleteModal(
                  true,
                  "حذف پست",
                  renderModalBody(),
                  `/posts/${postDetails.id}`
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return { userUnqId: user.userProfile.userUnqId };
};

export default connect(mapStateToProps, { setDeleteModal })(PostBox);
