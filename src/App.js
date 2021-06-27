import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import TimeLine from './components/TimeLine'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <PrivateRoute path='/timeline' component={TimeLine} />
      </Switch>
    </div>
  );
}

export default App;
