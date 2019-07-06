import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
const searchParams = ["/", "/:searchText/:category"];

const Routes = () => (
  <Switch>
    <Route exact path={searchParams} component={HomePage} />
  </Switch>
);
export default Routes;