import React from "react";
import Player from "./Player";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Player} />
      <Route exact path="/:activeVideo" component={Player} />
    </Switch>
    <GlobalStyle />
  </BrowserRouter>
);
export default App;
//"activeVideo" gets video id , and routes us to its url (in same Video  view)
//TODO : Not foud component ..App..when routs are false or dont find anything !
