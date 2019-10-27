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
//if app is hosted at root you dont need attribute basename="react_videoplayer" in <BrowserRouter> component
//also add "homepage:"https://www..." attribute to package.json !!

//than npm run build ---> react creates build folder
//than copy build folder files to hosting server

//this goes in .hd access in folder where you host app(it will always route to index.html route on server becuse we want our react app to handle routing)
/*
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.*) index.html
*/

//https://www.youtube.com/watch?v=iVRO0toVdYM (useCallback at thee 1:50)
//"activeVideo" gets video id , and routes us to its url (in same Video  view)
//TODO : Not foud component ..App..when routs are false or dont find anything !
