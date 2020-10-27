import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import About from "./Components/About/About";
import Donate from './Components/Donate/Donate';
import Header from "./Components/Header/Header";
// import Contact from "./Components/Contact/contact";


export default (    
  <Switch>
    <Route exact path="/" component={Landing} />
    <Header />
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/About" component={About} />
    <Route path="/Donate" component={Donate} />
    {/* <Route path='/contact' component={Contact} /> */}
  </Switch>
);
