import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from '../Pages/Landing';
import Editor from "../Pages/Editor";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/editor/:gameName?" component={Editor} />
    </Switch>
  );
}

export default Routes;
