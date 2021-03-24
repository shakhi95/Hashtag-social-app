import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PostsList, UserDetails } from "../components";
import myApi from "../api/myApi";

const User = () => {
  //
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(false);

  const { id } = useParams();

  const fetchUser = async () => {
    setError(false);
    setLoading(true);
    try {
      const { data } = await myApi.get(`/users?userUnqId=${id}`);
      if (data.length === 0) {
        setError(true);
      } else {
        setUserProfile(data[0]);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) {
    return (
      <div className="py-5 text-center">
        <h6>خطایی رخ داد. دوباره تلاش کنید.</h6>
        <Link to="/users" className="btn btn-primary rounded-pill mt-3">
          لیست کاربران
        </Link>
      </div>
    );
  }

  return (
    <>
      <UserDetails loading={loading} profile={userProfile} />
      <PostsList author={id} />
    </>
  );
};

export default User;
