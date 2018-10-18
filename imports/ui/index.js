import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}
