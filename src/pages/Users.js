import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
import { UserBox } from "../components";
import noUsersImg from "../assets/noUsers.png";

const Users = ({ fetchUsers, usersMssg, loading, allUsers, userUnqId }) => {
  //

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderListContent = () => {
    if (loading) {
      return (
        <div className="py-5 text-center">
          <span className="spinner-border"></span>
        </div>
      );
    }

    if (usersMssg.isMssg) {
      return (
        <div className="py-5 text-center text-danger">
          <h6>{usersMssg.mssgBody}</h6>
        </div>
      );
    }

    const usersToShow = allUsers.filter((user) => user.userUnqId !== userUnqId);

    if (usersToShow.length === 0) {
      return (
        <div className="py-5 text-center">
          <div className="col-9 col-sm-7 col-md-6 col-lg-4 mx-auto text-center">
            <img
              src={noUsersImg}
              alt="no user"
              style={{ width: "100%", objectFit: "contain" }}
            />
          </div>
          <h6>کاربری برای نمایش وجود ندارد.</h6>
        </div>
      );
    }

    return usersToShow.map((user) => {
      return <UserBox key={user.userUnqId} userProfile={user} />;
    });
  };

  return (
    <div>
      <h5>لیست کاربران:</h5>
      <hr />
      {renderListContent()}
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  //
  const usersMssg =
    user.userMssg.isMssg && user.userMssg.mssgPlace === "fetchUsers"
      ? user.userMssg
      : "";

  return {
    loading: user.allUsersLoading,
    allUsers: user.allUsers,
    usersMssg,
    userUnqId: user.userProfile.userUnqId,
  };
};

export default connect(mapStateToProps, { fetchUsers })(Users);
