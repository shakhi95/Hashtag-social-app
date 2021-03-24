import React from "react";
import { CreatePost, PostsList } from "../components";

const Posts = () => {
  //
  return (
    <>
      <CreatePost />
      <PostsList author="all" />
    </>
  );
};

export default Posts;
