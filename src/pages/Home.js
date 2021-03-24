import React from "react";
import { connect } from "react-redux";

import { PostsList, UserDetails } from "../components";

const Home = ({ userUnqId, userLoading, userProfile }) => {
  //
  return (
    <>
      <UserDetails loading={userLoading} profile={userProfile} />
      <PostsList author={userUnqId} />
    </>
  );
};

const mapStateToProps = ({
  user: {
    userLog: { userUnqId },
    userProfile,
    userLoading,
  },
}) => {
  //
  return { userUnqId, userLoading, userProfile };
};

export default connect(mapStateToProps)(Home);
