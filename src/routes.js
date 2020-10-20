import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Components/login';
import Dashboard from './Components/dashboard';


export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
