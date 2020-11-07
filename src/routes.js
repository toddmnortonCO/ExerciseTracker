import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard.js';
import About from "./Components/About/About";
import Landing from './Components/Landing/Landing';
import Donate from './Components/Donate/Donate';
import Contact from './Components/Contact/Contact'


export default (    
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/About" component={About} />
    <Route path="/Donate" component={Donate} />
    <Route path="/Contact" component={Contact} />
=  </Switch>
);
