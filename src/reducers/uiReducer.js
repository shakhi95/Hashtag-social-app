//
import { SET_DEL_MODAL, SET_SIDEBAR, SET_MAIL_MODAL } from "../actions/types";

const INITIAL_STATE = {
  deleteModal: { isShown: false, title: "", body: "", deleteUrl: "" },
  mailModal: { isShown: false, receiver: { name: "", id: "" } },
  showSidebar: false,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEL_MODAL:
      return { ...state, deleteModal: action.payload };

    case SET_MAIL_MODAL:
      return { ...state, mailModal: action.payload };

    case SET_SIDEBAR:
      return { ...state, showSidebar: action.payload };

    default:
      return state;
  }
};

export default uiReducer;
