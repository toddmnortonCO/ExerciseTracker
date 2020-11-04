import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard.js';
import About from "./Components/About/About";
import Donate from './Components/Donate/Donate';
import Landing from './Components/Landing/Landing';


export default (    
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/About" component={About} />
    <Route path="/Donate" component={Donate} />
=  </Switch>
);
