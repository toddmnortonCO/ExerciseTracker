import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './Components/Landing/landing';
import Dashboard from "./Components/Dashboard/dashboard";
import About from "./Components/About/about";
import Donate from './Components/Donate/donate';
import Header from "./Components/Header/header";
import Contact from "./Components/Contact/contact";


export default (    
  <Switch>
    <Route exact path="/" component={Landing} />
    <Header />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/about" component={About} />
    <Route path="/donate" component={Donate} />
    <Route path='/contactme' component={Contact} />
  </Switch>
);
