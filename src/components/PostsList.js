import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FaSyncAlt } from "react-icons/fa";
import { fetchPosts } from "../actions";
import PostBox from "./PostBox";

const PostsList = ({ author, posts, loading, fetchPosts, postMssg }) => {
  //
  const [sort, setSort] = useState("new");

  useEffect(() => {
    fetchPosts();
  }, []);

  let postToShow = [];

  if (author === "all") {
    postToShow = posts;
  } else {
    postToShow = posts.filter(
      (post) => post.authorProfile.userUnqId === author
    );
  }

  if (sort === "new") {
    postToShow.sort((a, b) => b.timeStamp - a.timeStamp);
  } else if (sort === "old") {
    postToShow.sort((a, b) => a.timeStamp - b.timeStamp);
  } else if (sort === "fav") {
    postToShow.sort((a, b) => b.likes.length - a.likes.length);
  }

  const renderListContent = () => {
    if (loading) {
      return (
        <div className="py-5 text-center">
          <span className="spinner-border"></span>
        </div>
      );
    }

    if (postMssg.isMssg) {
      return (
        <div className="py-5 text-center text-danger">
          <h6>{postMssg.mssgBody}</h6>
        </div>
      );
    }

    if (postToShow.length === 0) {
      return (
        <div className="py-5 text-center">
          <h6>پستی برای نمایش وجود ندارد.</h6>
        </div>
      );
    }

    return postToShow.map((post) => (
      <PostBox key={post.postUnqId} postDetails={post} />
    ));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-1 px-3 mb-3">
        <button
          className="btn btn-sm btn-primary rounded-circle"
          onClick={fetchPosts}
          disabled={loading}
        >
          <FaSyncAlt />
        </button>
        <hr className="w-100 mx-2 d-none d-sm-block" />
        <select
          className="form-select form-select-sm w-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="new">جدیدترین</option>
          <option value="old">قدیمی ترین</option>
          <option value="fav">محبوب ترین</option>
        </select>
      </div>
      {renderListContent()}
    </div>
  );
};

const mapStateToProps = ({ post }) => {
  //
  const postMssg =
    post.postMssg.isMssg && post.postMssg.mssgPlace === "postList"
      ? post.postMssg
      : "";
  return { posts: post.allPosts, loading: post.allPostsLoading, postMssg };
};

export default connect(mapStateToProps, { fetchPosts })(PostsList);
