//
import {
  SET_POST_LOADING,
  SET_POST_MSSG,
  SET_POSTS_LOADING,
  SET_ALL_POSTS,
} from "../actions/types";

const INITIAL_STATE = {
  allPosts: [],
  allPostsLoading: false,
  postLoading: false,
  postMssg: { isMssg: false, mssgBody: "", mssgPlace: "", mssgClass: "" },
};

const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_POST_LOADING:
      return { ...state, postLoading: action.payload };

    case SET_POST_MSSG:
      return { ...state, postMssg: action.payload };

    case SET_POSTS_LOADING:
      return { ...state, allPostsLoading: action.payload };

    case SET_ALL_POSTS:
      return { ...state, allPosts: action.payload };

    default:
      return state;
  }
};

export default postReducer;
