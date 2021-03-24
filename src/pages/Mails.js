import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMails, setActiveMail } from "../actions";
import noMailsImg from "../assets/noMails.png";
import { MailBox, MailPreview } from "../components";

const MailsList = ({
  fetchMails,
  loading,
  mails,
  mailMssg,
  userUnqId,
  setActiveMail,
}) => {
  //
  useEffect(() => {
    setActiveMail({});
    fetchMails();
  }, []);

  const renderListContent = () => {
    if (loading) {
      return (
        <div className="py-5 text-center">
          <span className="spinner-border"></span>
        </div>
      );
    }

    if (mailMssg.isShown) {
      return (
        <div className="py-5 text-center text-danger">
          <h6>{mailMssg.mssgBody}</h6>
        </div>
      );
    }

    let toMeMails = mails.filter((mail) => mail.receiver.id === userUnqId);
    let toOthersMails = mails.filter((mail) => mail.sender.id === userUnqId);

    if (toMeMails.length + toOthersMails.length === 0) {
      return (
        <div className="py-5 text-center">
          <div className="col-9 col-sm-7 col-md-6 col-lg-4 mx-auto text-center">
            <img
              src={noMailsImg}
              alt="no mail"
              style={{ width: "100%", objectFit: "contain" }}
            />
          </div>
          <h6>پیامی برای نمایش وجود ندارد.</h6>
        </div>
      );
    }

    toMeMails = toMeMails.map((mail) => {
      return { ...mail, type: "toMe" };
    });
    toOthersMails = toOthersMails.map((mail) => {
      return { ...mail, type: "toOthers" };
    });

    const mailsToShow = toMeMails
      .concat(...toOthersMails)
      .sort((a, b) => b.timeStamp - a.timeStamp);

    return mailsToShow.map((mail) => {
      return <MailBox key={mail.mailUnqId} mail={mail} />;
    });
  };

  return (
    <div>
      <h5>لیست پیام ها:</h5>
      <hr />
      {renderListContent()}
      <MailPreview />
    </div>
  );
};

const mapStateToProps = ({ mail, user }) => {
  //
  const mailMssg =
    mail.mailMssg.isShown && mail.mailMssg.mssgPlace === "fetchMails"
      ? mail.mailMssg
      : "";
  return {
    loading: mail.allMailsLoading,
    mails: mail.allMails,
    mailMssg,
    userUnqId: user.userProfile.userUnqId,
  };
};

export default connect(mapStateToProps, { fetchMails, setActiveMail })(
  MailsList
);
