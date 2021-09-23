import './App.css';
import Wrapper from './component/Wrapper';
import EventIndex from './page/EventIndex';
import EventDetail from './page/EventDetail';
import EventAdd from './page/EventAdd';
import EventUpdate from './page/EventUpdate';
import ThemeIndex from './page/ThemeIndex';
import ThemeAdd from './page/ThemeAdd';
import ThemeUpdate from './page/ThemeUpdate';
import UserIndex from './page/UserIndex';
import UserAdd from './page/UserAdd';
import UserUpdate from './page/UserUpdate';
import Login from './page/Login';
import {HashRouter,Route,Switch} from "react-router-dom";
import React, { useState, useEffect, useCallback} from 'react';

function App() {
  

  return (
    <HashRouter>
      <Switch>
        <Wrapper>
          <Route exact={true} path="/" component={EventIndex}/>
          <Route exact={true} path="/EventAdd" component={EventAdd}/>
          <Route exact={true} path="/EventUpdate/:id" component={EventUpdate}/>
          <Route exact={true} path="/EventDetail/:id" component={EventDetail}/>
          <Route exact={true} path="/Theme" component={ThemeIndex}/>
          <Route exact={true} path="/Theme/Add" component={ThemeAdd}/>
          <Route exact={true} path="/Theme/Update/:id" component={ThemeUpdate}/>
          <Route exact={true} path="/User" component={UserIndex}/>
          <Route exact={true} path="/User/Add" component={UserAdd}/>
          <Route exact={true} path="/User/Update/:id" component={UserUpdate}/>
          <Route exact={true} path="/Login" component={Login}/>
        </Wrapper>
      </Switch>
    </HashRouter>
  );
}

export default App;