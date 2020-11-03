import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import About from "./Components/About/About";
import Donate from './Components/Donate/Donate';


export default (    
  <Switch>
    <Route path="/" component={Landing} />
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/About" component={About} />
    <Route path="/Donate" component={Donate} />
  </Switch>
);
