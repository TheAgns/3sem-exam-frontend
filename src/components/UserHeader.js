import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  NavLink,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import GetAllAssistants from "./GetAllAssistants";
import MyBookings from "./MyBookings";
import CreateAssistant from "./CreateAssistant";
import FetchParallel from "./CreateAssistant";
import NoMatch from "./NoMatch";
import DeleteBooking from "./DeleteBooking";

function UserHeader(props) {
  const { loggedIn, logout, validateAccess } = props;
  return (
    <div>
      <Header
        validateAccess={validateAccess}
        logout={logout}
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/GetAllAssistants">
          <GetAllAssistants />
        </Route>

        {validateAccess === "user" ? (
          <Route path="/MyBookings">
            <MyBookings />
          </Route>
        ) : (
          ""
        )}
        {validateAccess === "admin" ? (
          <Route path="/createAssistant">
            <CreateAssistant />
          </Route>
        ) : (
          ""
        )}
         {validateAccess === "admin" ? (
          <Route path="/deleteBooking">
            <DeleteBooking />
          </Route>
       ) : (
          ""
        )}
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default UserHeader;
