import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Overview from "./Overview";
import Calendar from "./Calendar";
import Tasks from "./Tasks";


class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Tasks} />
        <Route path="/Overview" component={Overview} />
        <Route path="/Calendar" component={Calendar} />
        <Route path="/Tasks" component={Tasks} />
      </Switch>
    );
  }
}

export default Routes;
