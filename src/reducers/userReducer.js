//
import {
  LOG_IN,
  LOG_OUT,
  SET_LOADING,
  SET_MSSG,
  FETCH_USER,
  FETCH_USERS,
  SET_USERS_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  userLog: JSON.parse(localStorage.getItem("hashtag-userLog")) || {
    isLogedIn: false,
    userUnqId: null,
  },
  userProfile: {},
  userLoading: false,
  userMssg: { isMssg: false, mssgBody: "", mssgPlace: "", mssgClass: "" },
  allUsers: [],
  allUsersLoading: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      const { userUnqId } = action.payload;
      localStorage.setItem(
        "hashtag-userLog",
        JSON.stringify({ isLogedIn: true, userUnqId })
      );
      return {
        ...state,
        userProfile: action.payload,
        userLog: { isLogedIn: true, userUnqId },
      };

    case LOG_OUT:
      localStorage.setItem(
        "hashtag-userLog",
        JSON.stringify({ isLogedIn: false, userUnqId: null })
      );
      return {
        ...state,
        userProfile: {},
        userLog: { isLogedIn: false, userUnqId: null },
      };

    case SET_LOADING:
      return { ...state, userLoading: action.payload };

    case SET_MSSG:
      const { isMssg, mssgBody, mssgPlace, mssgClass } = action.payload;
      return { ...state, userMssg: { isMssg, mssgBody, mssgClass, mssgPlace } };

    case FETCH_USER:
      return {
        ...state,
        userProfile: action.payload,
      };

    case SET_USERS_LOADING:
      return { ...state, allUsersLoading: action.payload };

    case FETCH_USERS:
      return { ...state, allUsers: action.payload };

    default:
      return state;
  }
};

export default userReducer;
