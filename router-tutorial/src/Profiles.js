import React from "react";
import Profile from "./Profile";
import { Link, Route } from "react-router-dom";

const Profiles = () => {
  return (
    <>
      <h1>PROFILES</h1>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong</Link>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해주세요</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </>
  );
};

export default Profiles;
