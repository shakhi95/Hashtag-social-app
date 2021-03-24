import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./navigation/history";

import "./style/bootstrap.rtl.min.css";
import "./style/style.css";

//pages
import {
  Page404,
  Home,
  Login,
  Mails,
  Posts,
  Search,
  Signup,
  PrivateRoute,
  Users,
  User,
} from "./pages";

//components
import {
  Navbar,
  Footer,
  DeleteModal,
  ScrollToTop,
  SendMssgModal,
} from "./components";

const App = () => {
  //
  return (
    <Router history={history}>
      <ScrollToTop />
      <Navbar />
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/users/:id" exact component={User} />
        <PrivateRoute path="/posts" exact component={Posts} />
        <PrivateRoute path="/mails" exact component={Mails} />
        <PrivateRoute path="/search" exact component={Search} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="*" exact component={Page404} />
      </Switch>
      <DeleteModal />
      <SendMssgModal />
      <Footer />
    </Router>
  );
};

export default App;
