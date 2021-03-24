//
import { v4 as uuid4 } from "uuid";
import history from "../navigation/history";

import {
  LOG_IN,
  LOG_OUT,
  SET_LOADING,
  SET_MSSG,
  FETCH_USER,
  SET_SIDEBAR,
  SET_POST_LOADING,
  SET_POST_MSSG,
  SET_POSTS_LOADING,
  SET_ALL_POSTS,
  SET_DEL_MODAL,
  SET_USERS_LOADING,
  FETCH_USERS,
  SET_MAIL_MODAL,
  SET_SENDMAIL_LOADING,
  SET_MAIL_MSSG,
  SET_MAILS,
  SET_MAILS_LOADING,
  SET_ACTIVE_MAIL,
} from "./types";

import myApi from "../api/myApi";

export const logIn = (userProfile) => {
  return { type: LOG_IN, payload: userProfile };
};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const signup = (formValues) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setMssg());
    try {
      const { data } = await myApi.post("/users", {
        ...formValues,
        userUnqId: uuid4(),
        timeStamp: new Date().getTime(),
      });
      dispatch(logIn(data));
      history.push("/");
    } catch (error) {
      dispatch(
        setMssg(true, "ارتباط با API برقرار نشد.", "signupForm", "danger")
      );
    }
    dispatch(setLoading(false));
  };
};

export const signin = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setMssg());
    try {
      const url = `/users?username=${username}&password=${password}`;
      const { data } = await myApi.get(url);
      if (data.length === 0) {
        dispatch(
          setMssg(true, "کاربری با این مشخصات یافت نشد.", "loginForm", "danger")
        );
      } else if (data.length === 1) {
        dispatch(logIn(data[0]));
        history.push("/");
      }
    } catch (error) {
      dispatch(
        setMssg(true, "ارتباط با API برقرار نشد.", "loginForm", "danger")
      );
    }
    dispatch(setLoading(false));
  };
};

export const setMssg = (
  isMssg = false,
  mssgBody = "",
  mssgPlace = "",
  mssgClass = ""
) => {
  //
  return {
    type: SET_MSSG,
    payload: { isMssg, mssgBody, mssgPlace, mssgClass },
  };
};

export const setLoading = (isLoading) => {
  return { type: SET_LOADING, payload: isLoading };
};

export const fetchUser = (userUnqId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const url = `/users?userUnqId=${userUnqId}`;
    const { data } = await myApi.get(url);
    if (data.length === 0) {
      history.push("/nodata404");
    } else if (data.length === 1) {
      dispatch({ type: FETCH_USER, payload: data[0] });
    }
  } catch (error) {
    history.push("/noapi404");
  }

  dispatch(setLoading(false));
};

export const setSidebar = (isShown) => {
  return { type: SET_SIDEBAR, payload: isShown };
};

export const createPost = (formValues, reset) => async (dispatch, getState) => {
  const {
    user: {
      userProfile: { avatarId, fullname, userUnqId },
    },
  } = getState();

  const dataToSend = {
    ...formValues,
    postUnqId: uuid4(),
    likes: [],
    timeStamp: new Date().getTime(),
    authorProfile: { avatarId, fullname, userUnqId },
  };

  dispatch({ type: SET_POST_LOADING, payload: true });
  try {
    await myApi.post("/posts", dataToSend);
    reset();
    dispatch(
      setPostMssg(
        true,
        "ارسال پست با موفقیت انجام شد.",
        "createForm",
        "success"
      )
    );
  } catch (error) {
    dispatch(
      setPostMssg(true, "ارتباط با API برقرار نشد.", "createForm", "danger")
    );
  }
  setTimeout(() => {
    dispatch(fetchPosts());
  }, 2000);
  dispatch({ type: SET_POST_LOADING, payload: false });
};

export const setPostMssg = (
  isMssg = false,
  mssgBody = "",
  mssgPlace = "",
  mssgClass = ""
) => {
  //
  return {
    type: SET_POST_MSSG,
    payload: { isMssg, mssgBody, mssgPlace, mssgClass },
  };
};

export const fetchPosts = () => async (dispatch) => {
  dispatch({ type: SET_POSTS_LOADING, payload: true });
  dispatch({ type: SET_ALL_POSTS, payload: [] });
  dispatch(setPostMssg());
  try {
    const { data } = await myApi.get("/posts");
    dispatch({ type: SET_ALL_POSTS, payload: data });
  } catch (error) {
    dispatch(
      setPostMssg(true, "ارتباط با API برقرار نشد.", "postList", "danger")
    );
  }
  dispatch({ type: SET_POSTS_LOADING, payload: false });
};

export const setDeleteModal = (
  isShown = false,
  title = "",
  body = "",
  deleteUrl = ""
) => {
  return { type: SET_DEL_MODAL, payload: { isShown, title, body, deleteUrl } };
};

export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: SET_USERS_LOADING, payload: true });
  dispatch(setMssg());
  try {
    const { data } = await myApi.get("/users");
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    dispatch(
      setMssg(true, "ارتباط با API برقرار نشد.", "fetchUsers", "danger")
    );
  }
  dispatch({ type: SET_USERS_LOADING, payload: false });
};

export const setMailModal = (
  isShown = false,
  receiver = { name: "", id: "" }
) => {
  //
  return { type: SET_MAIL_MODAL, payload: { isShown, receiver } };
};

export const sendMail = (formValues, reset) => async (dispatch) => {
  dispatch({ type: SET_SENDMAIL_LOADING, payload: true });
  dispatch(setMailMssg());
  try {
    await myApi.post("/messages", {
      ...formValues,
      timeStamp: new Date().getTime(),
      mailUnqId: uuid4(),
    });
    dispatch(setMailMssg(true, "با موفقیت ارسال شد", "sendMail", "success"));
  } catch (error) {
    dispatch(
      setMailMssg(true, "ارتباط با API برقرار نشد.", "sendMail", "danger")
    );
  }

  setTimeout(() => {
    dispatch(setMailMssg());
    dispatch(setMailModal());
    dispatch(fetchMails());
    dispatch(setActiveMail({}));
    reset();
  }, 2000);

  dispatch({ type: SET_SENDMAIL_LOADING, payload: false });
};

export const setMailMssg = (
  isShown = false,
  mssgBody = "",
  mssgPlace = "",
  mssgClass = ""
) => {
  return {
    type: SET_MAIL_MSSG,
    payload: { isShown, mssgBody, mssgPlace, mssgClass },
  };
};

export const fetchMails = () => async (dispatch) => {
  dispatch({ type: SET_MAILS_LOADING, payload: true });
  dispatch(setMailMssg());
  try {
    const { data } = await myApi.get("/messages");
    dispatch({ type: SET_MAILS, payload: data });
  } catch (error) {
    dispatch(
      setMailMssg(true, "ارتباط با API برقرار نشد.", "fetchMails", "danger")
    );
  }
  dispatch({ type: SET_MAILS_LOADING, payload: false });
};

export const setActiveMail = (mail) => {
  return { type: SET_ACTIVE_MAIL, payload: mail };
};
