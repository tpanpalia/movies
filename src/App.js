import React from "react";
import "./App.css";
import Search from "./components/Search/Search";
import MyRatings from "./components/RatingsPage/MyRatings";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/movies" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/myratings" component={MyRatings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
