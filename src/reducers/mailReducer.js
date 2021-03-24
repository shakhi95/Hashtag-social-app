//
import {
  SET_SENDMAIL_LOADING,
  SET_MAIL_MSSG,
  SET_MAILS,
  SET_MAILS_LOADING,
  SET_ACTIVE_MAIL,
} from "../actions/types";

const INITIAL_STATE = {
  sendMailLoading: false,
  mailMssg: { isShown: false, mssgBody: "", mssgPlace: "", mssgClass: "" },
  allMails: [],
  allMailsLoading: false,
  activeMail: {},
};

const mailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SENDMAIL_LOADING:
      return { ...state, sendMailLoading: action.payload };

    case SET_MAIL_MSSG:
      return { ...state, mailMssg: action.payload };

    case SET_MAILS_LOADING:
      return { ...state, allMailsLoading: action.payload };

    case SET_MAILS:
      return { ...state, allMails: action.payload };

    case SET_ACTIVE_MAIL:
      return { ...state, activeMail: action.payload };

    default:
      return state;
  }
};

export default mailReducer;
