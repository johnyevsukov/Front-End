import './App.css';
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import TimeLine from './components/TimeLine'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="app">
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
        <PrivateRoute path='/profile/:id' component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
