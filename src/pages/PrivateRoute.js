import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Sidebar } from "../components";

const PrivateRoute = ({
  component: Component,
  exact,
  path,
  isLogedIn,
  showSidebar,
}) => {
  //

  const renderOutput = () => {
    return (
      <div className="container">
        <div className="row min-vh-100 py-4">
          <div className={`sidebar col-md-4 col-lg-3 ${showSidebar && "show"}`}>
            <Sidebar />
          </div>
          <div className="col-md-8 col-lg-9">
            <Component />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return isLogedIn ? renderOutput() : <Redirect to="/login" />;
      }}
    />
  );
};

const mapStateToProps = ({ user, ui }) => {
  return { isLogedIn: user.userLog.isLogedIn, showSidebar: ui.showSidebar };
};

export default connect(mapStateToProps)(PrivateRoute);
